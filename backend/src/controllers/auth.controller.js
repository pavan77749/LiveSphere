import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from '../lib/stream.js';

export async function signup (req, res) {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }


        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
         return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const idx = Math.floor(Math.random() * 100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
            profilePicture: randomAvatar,
        });
        
        // Todo : create the user in steam as well
        try {
            await upsertStreamUser({
                id: newUser._id.toString(), // Ensure it's a string
                name: newUser.fullName,
                image: newUser.profilePicture || ""
            });
            console.log("Stream user created successfully");
        } catch (streamError) {
            console.error('Error creating Stream user:', streamError.message);
            // Do not fail the whole signup just for this
        }
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    
}

export async function login (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function logout (req, res) {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
    });
    res.status(200).json({ success:true , message: 'Logout successful' });
}

export async function onboard (req, res) {
  try {
    const userId = req.user._id;
    const {fullName,bio,nativeLanguage,learningLanguage,location} = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
        return res.status(400).json({
          message: "All fields are required",
          missingFields: [
            !fullName && "fullName",
            !bio && "bio",
            !nativeLanguage && "nativeLanguage",
            !learningLanguage && "learningLanguage",
            !location && "location",
          ].filter(Boolean),
        });
      }
  
    
    const updatedUser = await User.findByIdAndUpdate(userId, {
        ...req.body,
        isOnboarded: true
        }, { new: true });

    if(!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    //ToDo: Update the Stream user with the new data 
    try{

        await upsertStreamUser({
            id: updatedUser._id.toString(), // Ensure it's a string
            name: updatedUser.fullName,
            image: updatedUser.profilePicture || ""
        });
        console.log("Stream user updated successfully");
    }
    catch (streamError) {
        console.error('Error creating Stream user:', streamError.message);
        // Do not fail the whole signup just for this
    }


    res.status(200).json({
        success: true,
        message: 'User onboarded successfully',
        user: updatedUser,
    });
}
catch (error) {
    console.error('Error during onboarding:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
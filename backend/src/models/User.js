import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true, 
        trim: true, 
        minlength: 3, 
        maxlength: 100
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
       
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6,
        maxlength: 1024
    },
    bio: { 
        type: String, 
        default: '',
    },
    profilePicture: { 
        type: String, 
        default: '',
    },
    nativeLanguage: { 
        type: String, 
        default: '',
    },
    learningLanguage: { 
        type: String, 
        default: '',
    },
    location: { 
        type: String, 
        default: '',
    },
    isOnboarded: { 
        type: Boolean, 
        default: false,
    },
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

//pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) { 
    next(error);
  }
});

export default User;
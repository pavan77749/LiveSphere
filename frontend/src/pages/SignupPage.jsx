import { useMutation } from '@tanstack/react-query';
import { Axe, OrbitIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';


const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

const queryClient = useQueryClient()

  const {mutate:signupMutation ,isPending,error}  = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['authUser']}),
  })

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData)
  }



  return (
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8' data-theme="night">
     <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
     {/* // Signup form- left Side  */}
     <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
     {/*logo  */}
    <div className='mb-4 flex items-center justify-start gap-2'>
    <OrbitIcon className='text-primary w-9 h-9' />
    <span className='text-2xl font-bold text-primary font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>LiveSphere</span>
    </div>

    {/* Errors */}
    {error &&
    <div className='alert alert-error shadow-lg mb-4'>
      <span>{error.response.data.message}</span>
    </div>
}

    <div className='w-full'>
    <form onSubmit={handleSignup}>
  <div className="space-y-4">
    <div>
      <h2 className='text-xl font-semibold'>Create an Account</h2>
      <p className='text-sm opacity-70'>Join us and start your journey!</p>
    </div>

    {/* FULL NAME */}
    <div className="form-control w-full">
      <label className='label'>
        <span className='label-text'>Full Name</span>
      </label>
      <input
        type="text"
        placeholder='Enter your full name'
        className='input input-bordered w-full'
        value={signupData.fullName}
        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
        required
      />
    </div>

    {/* EMAIL */}
    <div className="form-control w-full">
      <label className='label'>
        <span className='label-text'>Email</span>
      </label>
      <input
        type="email"
        placeholder='example@gmail.com'
        className='input input-bordered w-full'
        value={signupData.email}
        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        required
      />
    </div>

    {/* PASSWORD */}
    <div className="form-control w-full">
      <label className='label'>
        <span className='label-text'>Password</span>
      </label>
      <input
        type="password"
        placeholder='*********'
        className='input input-bordered w-full'
        value={signupData.password}
        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        required
      />
      <p className='text-xs opacity-70 mt-1'>Password must be at least 6 characters long</p>
    </div>

    {/* TERMS */}
    <div className='form-control'>
      <label className='label cursor-pointer justify-start gap-2'>
        <input type="checkbox" className='checkbox checkbox-sm' required />
        <span className='text-xs leading-tight'>
          I agree to the <span className='text-primary font-semibold hover:underline'>Terms of Service</span> and{' '}
          <span className='text-primary font-semibold hover:underline'>Privacy Policy</span>
        </span>
      </label>
    </div>

    {/* SUBMIT BUTTON */}
    <button type='submit' className='btn btn-primary w-full'>{isPending ? "signing up..." : "Create Account"}</button>

    {/* LINK TO LOGIN */}
    <div className="text-center mt-4">
      <p className='text-sm opacity-70'>
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">Sign In</Link>
      </p>
    </div>
  </div>
</form>

    </div>


     </div>
      {/* Image - Right Side */}
     <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center ">
     <div className="max-w-md p-8">
      <div className="relative aspect-square max-w-sm mx-auto">
      <img src="/VideoCall.png" alt="home image" className='w-full h-full' />
      </div>
     
     <div className='text-center space-y-3 mt-6'>
      <h2>Connect with Language partners worldwide</h2>
      <p className='text-sm opacity-70'>Join our community and start learning today!</p>
     </div>
     </div>
     </div>
     </div>
    </div>
  )
}

export default SignupPage

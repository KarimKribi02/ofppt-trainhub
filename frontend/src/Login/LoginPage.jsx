import React from "react";
export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <p className="text-gray-600 text-center mb-4">Welcome back! Please log in to access your account.</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="text-orange-500 text-sm">Forgot Password?</a>
            </div>
            
            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
              Login
            </button>
          </form>
          
          <div className="my-4 text-center text-gray-500">OR</div>
          
          <button className="w-full flex items-center justify-center border py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </button>
          
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a href="#" className="text-orange-500">Sign Up</a>
          </p>
        </div>
        
      </div>
    );
  }
  
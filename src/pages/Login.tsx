import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import img1 from "../assets/purple-circle.svg";
import toast, { Toaster } from "react-hot-toast";

interface User {
    name: string;
    email: string;
    password: string;
}

const Login = () => {
    let navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] =useState("");
    const [fullName, setFullName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("")
    const [reenterPassword, setReenterPassword] = useState("")
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    const handleLogin = (event: React.FormEvent) => {
    
        event?.preventDefault();
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Find the user with matching email and password
    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);
    
    if (!user) {
        console.error('Invalid email or password!');

        toast.error('Invalid email or password!', {
          duration: 3000,
        })
        return;
    }

    // Save the logged-in user's data in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));

    setCurrentUser(getCurrentUser());

    navigate('/dashboard');

    toast.success(`Welcome, ${user.name}!`, {
      duration: 3000,
    })

    console.log(`Welcome, ${user.name}!`);
        
      }
    
      const handleSignup = (event: React.FormEvent) =>{

        event.preventDefault();
        console.log(fullName, signupEmail, signupPassword)
        
        let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if the email already exists
        if (users.some(user => user.email === signupEmail)) {
            console.error('User already exists!');

            toast.error('User already exists!', {
            duration: 3000,
            })
            return;
        }
    
        // Add the new user to the users array
        const newUser: User = { name: fullName, email: signupEmail, password: signupPassword };
        users.push(newUser);
    
        // Save the updated users array back to local storage
        localStorage.setItem('users', JSON.stringify(users));


        toast.success('User registered successfully!', {
          duration: 3000,
        })

        setToggle(!toggle);
    
        console.log('User registered successfully!');
        
      }

      function getCurrentUser(): User | null {
        // Get the current user from local storage
        const user = localStorage.getItem('currentUser');
        if (user) {
            // Parse and return the user object
            return JSON.parse(user) as User;
        }
        // Return null if no user is logged in
        return null;
    }



  return (
    <div className="flex bg-fuchsia-700 items-center justify-center min-h-screen">

          <div
            className={` bg-white h-3/4 flex items-center w-3/4 fixed rounded-full transition-all duration-500 ease-linear border-2 border-white`}
          >
            {/* Login form positioned on the right inside the outer div */}
            <div
              className={`absolute right-0 w-1/2 h-full flex items-center justify-center flex-col ${
                toggle ? "hidden" : "block"
              } `}
              >
              <h1 className="text-fuchsia-700 text-3xl font-bold mb-8">Log in</h1>
              <form className="space-y-6 w-1/2">
                <div>
                  <label className="text-fuchsia-700 block text-sm font-medium leading-6">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="eg. abc@gmail.com"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-fuchsia-700">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="eg. nkdP@45"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                      }}
                      required
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-fuchsia-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <span
                  className="font-semibold leading-6 text-fuchsia-300 hover:text-fuchsia-500 cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                >
                  &nbsp; Sign up Now
                </span>
              </p>
              
               
              
            </div>

            {/* Signup form positioned on the left inside the outer div */}
            <div
              className={`absolute left-0 w-1/2 h-full flex items-center justify-center flex-col ${
                toggle ? "block" : "hidden"
              }`}
            >
              <h1 className="text-fuchsia-700 text-3xl font-bold mb-3">Sign up</h1>
              <form className="space-y-4 w-1/2">
              <div>
                  <label className="block text-sm font-medium leading-6 text-fuchsia-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="eg. John Doe"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-fuchsia-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="eg. abc@gmail.com"
                      required
                      value={signupEmail}
                      onChange={(e) => {
                        setSignupEmail(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-fuchsia-700">
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="eg. nkdP@45"
                      required
                      value={signupPassword}
                      onChange={(e) => {
                        setSignupPassword(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-fuchsia-700">
                      Re-Enter Password &nbsp;
                      {signupPassword ? (
                        signupPassword === reenterPassword ? (
                          <span className="text-green-300 text-xs">
                            Passwords match!
                          </span>
                        ) : (
                          <span className="text-red-300 text-xs">
                            Does not match
                          </span>
                        )
                      ) : null}
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="reenterpassword"
                      name="reenterpassword"
                      type="password"
                      placeholder="eg. nkdP@45"
                      required
                      value={reenterPassword}
                      onChange={(e) => {
                        setReenterPassword(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                      signupPassword === reenterPassword &&
                      signupPassword !== ""
                        ? "bg-fuchsia-700 hover:bg-fuchsia-500"
                        : "bg-fuchsia-200 cursor-not-allowed"
                    }`}
                    onClick={handleSignup}
                    disabled={
                      signupPassword !== reenterPassword ||
                      signupPassword === ""
                    }
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-2 text-center text-sm text-gray-500">
                Already have an account?
                <span
                  className="font-semibold leading-6 text-fuchsia-300 hover:text-fuchsia-500 cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                >
                  &nbsp; Login
                </span>
              </p>
              
            </div>

            {/* div that moves */}
            <div
              className={`h-full w-1/2 rounded-full transition-transform duration-500 ease-in-out z-30`}
              style={{
                transform: toggle ? "translateX(100%)" : "translateX(0)",
              }}
            >
              <img
                src={img1}
                alt="login"
                className="h-full w-full z-30 cursor-move"
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </div>
        </div>
  );
};

export default Login;
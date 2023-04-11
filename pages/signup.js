import MyContext from "../src/myContext";
import { useContext } from "react";
import { useState } from "react";
import NavBar from "@/src/NavBar";
import Link from "next/link"; // for next js

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Signup() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //POST request to database
  }

  return (
    <div>
      <NavBar />

      <label className="flex justify-center py-2 text-xl font-bold text-gray-600">Sign Up</label>
      
      <div className="flex justify-center">
      <br />
      <form onSubmit={handleSubmit}  className="w-full max-w-md flex flex-col items-center">
      <input
        type="email"
        id="email"
        name="email"
        className="rounded-md  bg-gray-100 border-gray-400 border p-1 "
        value={inputs.email || ""} 
        onChange={handleChange}
        required placeholder="Email"
      />
      <br />
      
      <input
        type="tel"
        id="phone"
        name="phone"
        className="rounded-md  bg-gray-100 border-gray-400 border p-1 "
        value={inputs.phone || ""} 
        onChange={handleChange}
        required placeholder="Phone Number"
      />
      <br />

      <input
        type="text"
        id="username"
        name="username"
        className="rounded-md  bg-gray-100 border-gray-400 border p-1 "
        value={inputs.username || ""} 
        onChange={handleChange}
        required placeholder="Username"
      />
      <br />

      
      <input
        type="password"
        id="password"
        name="password"
        className="rounded-md  bg-gray-100 border-gray-400 border p-1 "
        value={inputs.password || ""} 
        onChange={handleChange}
        required placeholder="Password"
      />
      <br />

      <button type="submit" className="mx-10 cursor-pointer bg-green-600 text-white  px-4 py-2 hover:bg-green-700 rounded-full  text-lg font-medium lg:text-xl lg:px-20  ">Sign Up</button>

    </form>
    </div>

    <div className="text-center py-4">
    Already have an account?

    <Link
      href="../login"
      className="mx-1 cursor-pointer text-green-600  text-md font-medium "
      >
      Log-In
    </Link>
    </div>
    
    </div>

  );

  
}

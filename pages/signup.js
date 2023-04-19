import MyContext from "../src/myContext";
import { useContext } from "react";
import { useState } from "react";
import NavBar from "@/src/NavBar";
import Link from "next/link"; // for next js
// import axios from "axios";

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Signup() {
  const { userName, updateUserName } = useContext(MyContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username: inputs.username,
        password: inputs.password,
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // POST request to database to http://localhost:8080/register
    // include body with username and password
    let p = await postData();
    if (p) {
      console.log("success");
      await updateUserName(inputs.username);
      console.log("username: " + userName);
      ///window.location.href = "http://localhost:3000/main";
    }
  };

  return (
    <div>
      <NavBar />

      <label className="flex justify-center py-5 text-3xl font-bold text-gray-600">
        Sign Up
      </label>

      <div className="flex justify-center">
        <br />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex-col items-center"
        >
          <input
            type="email"
            id="email"
            name="email"
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-1"
            value={inputs.email || ""}
            onChange={handleChange}
            required
            placeholder=" Email"
          />
          <br />

          <input
            type="tel"
            id="phone"
            name="phone"
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-1"
            value={inputs.phone || ""}
            onChange={handleChange}
            required
            placeholder=" Phone Number"
          />
          <br />

          <input
            type="text"
            id="username"
            name="username"
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-1"
            value={inputs.username || ""}
            onChange={handleChange}
            required
            placeholder=" Username"
          />
          <br />

          <input
            type="password"
            id="password"
            name="password"
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-1"
            value={inputs.password || ""}
            onChange={handleChange}
            required
            placeholder=" Password"
          />
          <br />

          <button
            type="submit"
            className="items-center w-60 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl lg:px-20 "
          >
            SIGN UP
          </button>
        </form>
      </div>

      <div className="text-center py-4">
        Already have an account?
        <Link
          href="../login"
          className="mx-1 font-bold cursor-pointer text-green-600 underline text-md font-medium"
        >
          Log-In
        </Link>
      </div>
    </div>
  );
}

import MyContext from "../src/myContext";
import { useContext } from "react";
import { useState } from "react";
import NavBar from "@/src/NavBar";
// import axios from "axios";

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Login() {
  const { userName, updateUserName } = useContext(MyContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const postData = async (event) => {
    // prevent default
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          updateUserName(data.userId);
          window.location.href = "http://localhost:3000/main";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Incorrect Password Or User Name");
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <NavBar />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <h1 className="flex justify-center py-5 text-3xl font-bold text-gray-600">
          Log in
        </h1>

        <form onSubmit={postData}>
          <input
            type="text"
            id="username"
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-4"
            name="username"
            placeholder="Username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          ></input>

          <input
            className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-4"
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          ></input>

          {/* <h4 className="font-bold">Forgot Password?</h4> */}
          <button
            className="w-60 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl lg:px-20 "
            type="submit"
          >
            LOG IN
          </button>
        </form>
        <br />
        <div>
          New to KitchenConscious?&nbsp;
          <a
            className="text-decoration-line: underline text-green-600 font-bold"
            href="../signup"
          >
            Sign-up
          </a>
        </div>
      </div>
    </div>
  );
}

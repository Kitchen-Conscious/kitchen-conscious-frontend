import MyContext from "../src/myContext";
import { useContext } from "react";
import { useState } from "react";
import NavBar from "@/src/NavBar";
import axios from "axios";

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Login() {
  const { userName, updateUserName } = useContext(MyContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });


  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/main", {
        username: inputs.username,
        password: inputs.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error caused at send: " + error);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // POST request to database to http://localhost:8080/register
    // include body with username and password

    console.log(inputs.username);
    console.log(inputs.password);

    let p = postData();
    if (p) {
      console.log("success");
      updateUserName(inputs.username);
      console.log("username: " + userName);
      window.location.href = "http://localhost:3000/main";
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <h1 className="font-bold mb-8 text-3xl text-center mt-16">Log in</h1>
        
        <form onSubmit={handleSubmit}>
        
          <input
            type="text"
            id="username"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          ></input>

        <input
          className="block border border-grey-light w-full p-3 rounded mb-4"
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
          className="mx-10 cursor-pointer bg-green-600 text-white  px-4 py-2 hover:bg-green-700 rounded-full  text-lg font-medium lg:text-xl lg:px-20 "
          type="submit"
        >
          Log In
        </button>
        
        </form>
        <br/>
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

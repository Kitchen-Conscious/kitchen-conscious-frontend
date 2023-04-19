import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Login() {
  const { userName, updateUserName } = useContext(MyContext);

  return (
    <div>
      <NavBar />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <h1 className="flex justify-center py-5 text-3xl font-bold text-gray-600">Log in</h1>
        <input
          className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-4"
          name="username"
          placeholder="Username"
        ></input>
        <input
          className="block border w-full p-3 rounded-xl  bg-gray-100 border-gray-400 mb-4"
          name="password"
          placeholder="Password"
        ></input>
        {/* <h4 className="font-bold">Forgot Password?</h4> */}
        <br></br>
        <button
          className="mx-10 cursor-pointer bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700 rounded-full  text-lg font-medium lg:text-xl lg:px-20 shadow-lg shadow-green -500/50"
          onClick={() => {
            updateUserName("john");
            window.location.href = "http://localhost:3000/main";
          }}
        >
          LOG IN
        </button>
        <br></br>
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

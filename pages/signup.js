import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";

// when the user is signed up, set the state of the userName to the new user's name
// Then redirect to the main page

export default function Signup() {
  const { userName, updateUserName } = useContext(MyContext);

  return (
    <div>
      <NavBar />
      Sign Up
    </div>
  );
}

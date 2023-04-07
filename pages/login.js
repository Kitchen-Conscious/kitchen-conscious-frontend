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
            Log In
            <button onClick={() => {updateUserName("john")}}>login to john</button>
        </div>
    )}


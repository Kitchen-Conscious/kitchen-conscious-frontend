import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";


export default function Main() {

    const { userName, updateUserName } = useContext(MyContext);

    return (
        <div>
            <NavBar />
            Main Page
        </div>
    )}


import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";


export default function Main() {

    const { userName, updateUserName } = useContext(MyContext);

    return (
        <div>
            <NavBar />
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600">Your Kitchens</label>
        </div>
    )
}


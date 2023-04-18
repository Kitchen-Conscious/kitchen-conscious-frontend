import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import Items from "@/src/Items";

export default function Main() {

    const { userName, updateUserName } = useContext(MyContext);

    return (
        <div>
            <NavBar />
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600">Kitchen1</label>
            <div className=''>

                <Items />
                <Items />

            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className=" w-60 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl  "
                >
                    Add Item
                </button>
            </div>
        </div>


    )

}




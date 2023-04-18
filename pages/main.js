import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import KitchenIcon from "@/src/KitchenIcon";
import InviteKitchen from "@/src/InviteKitchen"


export default function Main() {

    const { userName, updateUserName } = useContext(MyContext);

    return (
        <div>
            <NavBar />
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600">Your Kitchens</label>
            <div className='flex flex-row'>
                <KitchenIcon />
                <KitchenIcon />
                <button >
                    <img src="./addKitchen.png" className="content-center w-34 h-24"></img>
                </button>

            </div>
            <br></br>
            <hr></hr>
            <br></br>

            <label className="px-10 py-12 text-2xl font-bold text-black">Kitchen Invitations</label>
            <div className='flex flex-row pt-10'>
                <InviteKitchen />
                <InviteKitchen />
            </div>
        </div>


    )

}




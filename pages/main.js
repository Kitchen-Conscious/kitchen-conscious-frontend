import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import KitchenIcon from "@/src/KitchenIcon";
import { useState } from "react";

import InviteKitchen from "@/src/InviteKitchen";


export default function Main() {

    const { userName, updateUserName } = useContext(MyContext);

    const [newKitchenInfo, setNewKitchenInfo] = useState({
        name: "",
        details: "",
        members: "0",
    });

    const handleNewKitchen = (props) => {
        const name = props.n;
        const details = props.d;
        console.log( name + " " + details);
        setNewKitchenInfo(() => ({["name"]: name, ["details"]: details, ["members"]: [0]}));
    };

    const postNewKitchen = async () => {
        fetch("http://localhost:8080/kitchens", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(newKitchenInfo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    };

    const createKitchen = () => {

        let p = postNewKitchen();
        if (p) {
            console.log(p);
            console.log(newKitchenInfo)

        }
    };

    const addKitchen = (event) => {
        event.preventDefault();
       
        var n = prompt("Kitchen Name:", " ");
        var d = prompt("Kitchen Details:", " ");

        handleNewKitchen({n, d});

        createKitchen();
        
    };

    return (
        <div>
            <NavBar />
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600">Your Kitchens</label>
            <div className='flex flex-row'>
                <KitchenIcon />
                <KitchenIcon />
                <button onClick={addKitchen} >
                    <img src="./addKitchen.png" className="content-center w-32 h-24"></img>
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
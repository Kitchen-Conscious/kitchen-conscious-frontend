import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import KitchenIcon from "@/src/KitchenIcon";
import { useState } from "react";

import InviteKitchen from "@/src/InviteKitchen";


export default function Main() {
  const { userName, updateUserName } = useContext(MyContext);

    const postNewKitchen = async () => {
        try {
            const response = await axios.post("http://localhost:8080/kitchens", {
                username: userName,
                details: "",
                members: [0]
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error caused at send: " + error);
        }
    };

    const addKitchen = (event) => {
        event.preventDefault();
        //currently getting a 403
        let p = postNewKitchen();
        if (p) {
            console.log("success");
            console.log("username: " + userName);
        }
    };

  return (
    <div>
      <NavBar />
      <label className="flex justify-center py-12 text-4xl font-bold text-gray-600">
        Your Kitchens
      </label>
      <div className="flex flex-row">
        <KitchenIcon />
        <KitchenIcon />
        <button onClick={addKitchen}>
          <img
            src="./addKitchen.png"
            className="content-center w-32 h-24"
          ></img>
        </button>
      </div>
      <br></br>
      <hr></hr>
      <br></br>

      <label className="px-10 py-12 text-2xl font-bold text-black">
        Kitchen Invitations
      </label>
      <div className="flex flex-row pt-10">
        <InviteKitchen />
        <InviteKitchen />
      </div>
    </div>
  );
}




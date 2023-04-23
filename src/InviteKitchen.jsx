import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";


function InviteKitchen({ name, kitchenId }) {
    
    const { userName, updateUserName } = useContext(MyContext);
    
    //currently getting error 400 ¯\_(ツ)_/¯
    const handleAdd = () => {
        fetch(`http://localhost:8080/users/${userName}/kitchens/${kitchenId}/accept`, {
            credentials: "include",
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accept: true }),
        })
          .catch((error) => {
            console.error(error);
          });
      };
      //only shows changes after leaving the page and coming back?
      //technically an error 500 until you leave anc come back
      const handleDelete = () => {
        fetch(`http://localhost:8080/kitchens/${kitchenId}/members/${userName}`, {
            credentials: "include",
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json",
          },
        })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <div className=" place-content-center mb-10 text-center w-44 l-44 shadow-black-lg mx-10 cursor-pointer bg-neutral-300 text-black  py-2 rounded-xl font-medium lg:text-xl px:60">
            {name}
            <div className='flex flex-row'>
                <button onClick={handleAdd}>
                    <img src="./add.png" className="content-center "></img>
                </button>
                <button onClick={handleDelete}>
                    <img src="./delete.png" className="content-center "></img>
                </button>

            </div>
        </div >
    );
}

export default InviteKitchen;

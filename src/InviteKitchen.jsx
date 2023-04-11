import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";


function InviteKitchen() {
    return (
        <div className=" place-content-center mb-10 text-center w-44 l-44 shadow-black-lg mx-10 cursor-pointer bg-neutral-300 text-black  py-2 rounded-xl font-medium lg:text-xl px:60">
            Kitchen3
            <div className='flex flex-row'>
                <button>
                    <img src="./add.png" className="content-center "></img>
                </button>
                <button>
                    <img src="./delete.png" className="content-center "></img>
                </button>

            </div>
        </div >
    );
}

export default InviteKitchen;

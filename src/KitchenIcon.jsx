import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

function KitchenIcon() {
    return (
        <div>
            <button type="submit" className=" place-content-center w-44 l-80 shadow-black-lg mx-10 cursor-pointer bg-neutral-100 text-black  py-2 hover:bg-green-500/75 rounded-xl font-medium lg:text-xl px:60">
                <img src="./kitchen1.png" className="content-center w-40 h-48"></img>
                Kitchen1

            </button>
        </div>
    );
}

export default KitchenIcon;
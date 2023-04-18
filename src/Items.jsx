import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";


function Items() {
    return (


        <div className='flex flex-row pb-10'>
            <button>
                <img src="./trash.png" className="content-center pl-5 w-28 l-24"></img>
            </button>
            <div className="flex flex-row w-full l-44 border-l-8  border-l-green-600 solid shadow-black-lg mx-10 cursor-pointer bg-neutral-100 text-black  py-2 rounded-xl px:60">
                <div>
                    <h1 className="px-10 pt-2 text-3xl">Oranges</h1>

                    <div className='flex flex-row'>
                        <h2 className="px-10 pt-10 "><b>ID#:</b>132</h2>
                        <h2 className="px-20 pt-10 "><b>Owner:</b>Lynn</h2>
                        <h2 className="px-20 pt-10 "><b>Expires:</b>4/26/2023</h2>
                    </div>
                </div>
                <div className=" w-24 rounded-xl l-44 center pr-1 bg-white">
                    <h1 className="pt-2 text-center text-5xl">3</h1>
                    <h2 className="text-center pt-3 ">left</h2>
                </div>

            </div>

        </div>

    );
}

export default Items;
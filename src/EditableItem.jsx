import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

function EditableItem() {
  return (
    <div className="flex flex-row pb-10">
      <button className="ml-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
      <div className="flex flex-row w-full l-44 border-l-8  border-l-green-600 solid shadow-black-lg mx-10 cursor-pointer bg-neutral-100 text-black  py-2 rounded-xl px:60">
        <div>
          <h1 className="px-10 pt-2 text-3xl">Oranges</h1>

          <div className="flex flex-row">
            <h2 className="px-10 pt-10 ">
              <b>ID#:</b>132
            </h2>
            <h2 className="px-20 pt-10 ">
              <b>Owner:</b>Lynn
            </h2>
            <h2 className="px-20 pt-10 ">
              <b>Expires:</b>4/26/2023
            </h2>
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

export default EditableItem;

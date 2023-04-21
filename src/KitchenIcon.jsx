import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

function KitchenIcon({ name, kitchenId }) {
  return (
    <div>
      <Link href={`../kitchens/${kitchenId}`}>
        <button
          type="submit"
          className=" place-content-center w-44 l-80 shadow-black-lg mx-10 cursor-pointer bg-neutral-100 text-black  py-2 hover:bg-green-500/75 rounded-xl font-medium lg:text-xl px:60"
        >
          <img
            src="./kitchen1.png"
            className="content-center pl-3 w-40 h-48"
          ></img>
          {name}
        </button>
      </Link>
    </div>
  );
}

export default KitchenIcon;

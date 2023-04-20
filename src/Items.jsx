import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

function Items(props) {
  return (
    <div className="flex flex-row pb-10">
      <div className="flex flex-row w-full l-44 border-l-8  border-l-green-600 solid shadow-black-lg mx-10 bg-neutral-100 text-black  py-2 rounded-xl px:60">
        <div className="mx-auto w-full">
          <h1 className="px-10 pt-2 text-3xl">{props.name}</h1>

          <div className="flex flex-row mt-3 justify-center gap-32 text-lg">
            <h2 className=" ">
              <b>ID#: </b>{props.itemId}
            </h2>
            <h2 className="">
              <b>Owner: </b>{props.owner}
            </h2>
            <h2 className="">
              <b>Expires: </b>{props.expires}
            </h2>
          </div>
        </div>
        <div className=" w-24 rounded-xl l-44 center pr-1 bg-white mr-6">
          <h1 className="pt-2 text-center text-5xl">3</h1>
          <h2 className="text-center pt-3 ">left</h2>
        </div>
      </div>
    </div>
  );
}

export default Items;

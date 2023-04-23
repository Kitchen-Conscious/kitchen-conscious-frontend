import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

function KitchenIcon({ name, kitchenId }) {
  return (
    <div>
      <Link href={`../kitchens/${kitchenId}`}>

        <div
          className="flex flex-col place-content-center w-44 l-80 shadow-black-lg mx-10 cursor-pointer bg-neutral-100 text-black  py-2 hover:bg-green-500/75 rounded-xl font-medium lg:text-xl px:60 pr-4"
        >   
          <button
          type="submit">
          <img
            src="./kitchen1.png"
            className="content-center pl-3 w-40 h-48"
          ></img>
          {name}
          </button>
          <button
            onClick={deleteKitchen}
            type="button"
            className="content-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
           <svg 
              width="21" 
              height="24" 
              viewBox="0 0 21 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7143 0C13.325 0 14.6429 1.31786 14.6429 2.92857H17.5714C19.1821 2.92857 20.5 4.24643 20.5 5.85714H-2.38419e-07C-2.38419e-07 4.24643 1.31786 2.92857 2.92857 2.92857H5.85714C5.85714 1.31786 7.175 0 8.78571 0H11.7143ZM17.5714 8.78571V22.8721C17.5714 23.1943 17.3371 23.4286 17.015 23.4286H3.45571C3.13357 23.4286 2.89928 23.1943 2.89928 22.8721V8.78571H5.82786V19.0357C5.82786 19.8557 6.47214 20.5 7.29214 20.5C8.11214 20.5 8.75643 19.8557 8.75643 19.0357V8.78571H11.685V19.0357C11.685 19.8557 12.3293 20.5 13.1493 20.5C13.9693 20.5 14.6136 19.8557 14.6136 19.0357V8.78571H17.5421H17.5714Z" fill="#6C6B6B"/>

            </svg>
            <span className="sr-only">Close form</span>
          </button>     
        </div>
      </Link>
    </div>
  );
}

const deleteKitchen = async (event) => {
  event.preventDefault();

  const response = await fetch(
    `http://localhost:8080/kitchens/${kitchenId}`,
    {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.kitchenId),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  updateKitchen(!kitchenUpdated);
};


export default KitchenIcon;

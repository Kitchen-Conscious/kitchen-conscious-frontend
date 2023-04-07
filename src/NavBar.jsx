import React, { useState } from "react";
import Link from "next/link"; // for next js
import Image from "next/image";
import MyContext from "./myContext";
import { useContext } from "react";

// import { Link } from "react-scroll"; // Alternate for a tag. In next js we use Link for ref

function NavBar() {
  const { userName, updateUserName } = useContext(MyContext);

  // Log out function
  function logout() {
    updateUserName("");
    window.location.href = "http://localhost:3000";
  }

  return (
    <div>
      {/* for main nav container */}
      <nav className="fixed w-full z-10 sticky">
        <div className="w-full">
          <div className="flex items-center h-24 w-full">
            {/* first block section, outter part */}
            <div className="flex items-center mx-4 justify-between w-full sm:mx-6 lg:mx-10">
              <div className="sm:flex sm:justify-center sm:items-center sm:flex-shrink-0 text-3xl font-semibold">
                {/* Kitchen Conscious Logo */}
                <Link href="../" className="cursor-pointer mr-3 flex flex-row ">
                  <Image src="/logo.png" width={70} height={70} />
                  <div className="text-center my-auto">Kitchen Conscious</div>
                </Link>
              </div>

              <div className=" md:block">
                {/* If user is logged in, display Go To App and Log Out */}
                {/* Otherwise display LogIn and Sign Up */}
                {userName === "" ? (
                  <div className="ml-10 flex items-baseline space-x-4 font-sans lg:px-6">
                    <Link
                      href="../login"
                      className="mx-10 cursor-pointer bg-green-600 text-white  px-4 py-2 hover:bg-green-700 rounded-full  text-lg font-medium lg:text-xl lg:px-6 "
                    >
                      Log In
                    </Link>
                    <Link
                      href="../signup"
                      className="cursor-pointer bg-gray-500 text-white  px-4 py-2 hover:bg-gray-600 rounded-full  text-lg font-medium lg:text-xl lg:px-6 "
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="ml-10 flex items-baseline space-x-4 font-sans lg:px-6">
                    <Link
                      href="../main"
                      className="mx-10 cursor-pointer bg-green-600 text-white  px-4 py-2 hover:bg-green-700 rounded-full  text-lg font-medium lg:text-xl lg:px-6  "
                    >
                      Go to App
                    </Link>
                    <button
                      onClick={logout}
                      className="cursor-pointer bg-gray-500 text-white  px-4 py-2 hover:bg-gray-600 rounded-full  text-lg font-medium lg:text-xl lg:px-6  "
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

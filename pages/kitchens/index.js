import MyContext from "@/src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import KitchenIcon from "@/src/KitchenIcon";
import InviteKitchen from "@/src/InviteKitchen";
import axios from "axios";

export default function Main() {

  return (
    <div>
      <NavBar />

      <div className="flex flex-row">Enter a kitchen name in url!</div>
    </div>
  );
}

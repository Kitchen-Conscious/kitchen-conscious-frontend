import MyContext from "../src/myContext";
import { useContext } from "react";
import NavBar from "@/src/NavBar";
import KitchenIcon from "@/src/KitchenIcon";
import { useState } from "react";
import { useEffect } from "react";

import InviteKitchen from "@/src/InviteKitchen";

export default function Main() {
  const { userName, updateUserName } = useContext(MyContext);
  const { kitchenUpdated, updateKitchen } = useContext(MyContext);
  const [kitchens, setKitchens] = useState([]);

  
  const postNewKitchen = async (data) => {
    fetch("http://localhost:8080/kitchens", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //fetchKitchens();
      })
      .catch((error) => console.error(error));
  };

  const addKitchen = (event) => {
    event.preventDefault();
    const name = prompt("Kitchen Name:", " ");
    const details = prompt("Kitchen Details:", " ");
    const members = [];

    postNewKitchen({ name, details, members });
  };

  useEffect(() => {
    const fetchKitchens = () => {
      fetch(`http://localhost:8080/users/${userName}/kitchens`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setKitchens(data);
        })
        .catch((error) => console.error(error));
    };

    fetchKitchens();
  }, [postNewKitchen]);

  return (
    <div>
      <NavBar />
      <label className="flex justify-center py-12 text-4xl font-bold text-gray-600 gap-5">
        Your Kitchens
      </label>
      
      <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
        <div style={{ width: "max-content" }}>  
          <div className="flex flex-row">
            {kitchens &&
              kitchens.filter &&
              kitchens
                .filter((kitchen) => !kitchen.pending)
                .map((kitchen) => (
                  <KitchenIcon
                    key={kitchen.kitchenId}
                    name={kitchen.kitchen.name}
                    kitchenId={kitchen.kitchen.kitchenId}
                  />
                ))}
            <button onClick={addKitchen}>
              <img
                src="./addKitchen.png"
                className="content-center w-32 h-24"
              ></img>
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <hr></hr>
      <br></br>

      <label className="px-10 py-12 text-2xl font-bold text-black">
        Kitchen Invitations
      </label>
      <div className="flex flex-row pt-10">
        {kitchens &&
          kitchens.filter &&
          kitchens
            .filter((kitchen) => kitchen.pending)
            .map((kitchen) => (
              <InviteKitchen
                key={kitchen.kitchenId}
                name={kitchen.kitchen.name}
                kitchenId={kitchen.kitchen.kitchenId}
              />
            ))}
      </div>
    </div>
  );
}

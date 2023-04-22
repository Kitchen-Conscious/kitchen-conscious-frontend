import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/src/myContext";
import NavBar from "@/src/NavBar";
import Items from "@/src/Items";

//be able to share with users that are registred
//not tested yet
const shareHandler = async (data) => {
  const router = useRouter();
  const { kitchenId } = router.query;
  fetch(`http://localhost:8080/kitchens/${kitchenId}/members`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

//currently getting 403
const shareWithMembers = async (event) => {
  
  event.preventDefault();
  const uName = prompt("Username you wish to share with:", "");
  const type = prompt("User Type (VIEWER or EDITOR):", " ");
  console.log(uName);
  const response = await fetch(
    `http://localhost:8080/users?username=${uName}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    shareHandler({ uID: data.userId, type });
  } else {
    console.error("Failed to fetch user data");
  }
};


function kitchenDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { userName } = useContext(MyContext);
  const [kitchenData, setKitchenData] = useState({
    name: "Kitchen 1",
    members: [],
    items: [
      {
        name: "Oranges",
        quantity: 3,
        owner: "Lynn",
        expires: "4/26/2023",
        itemId: 132,
      },
    ],
  });

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      //const res = await fetch(`http://localhost:8080/kitchens/${id}`, { credentials: "include" });
      const member = await fetch(
        `http://localhost:8080/kitchens/${id}/members`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            return [];
          } else {
            console.log("members: " + data);
            return data;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching members");
        });

      const itemIds = await fetch(
        `http://localhost:8080/kitchens/${id}/items`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            return [];
          } else {
            console.log("itemIds: " + data);
            return data;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching item ids");
        });

      // get all item data and store in array
      let items = [];
      for (let i = 0; i < itemIds.length; i++) {
        const item = await fetch(`http://localhost:8080/items/${itemIds[i]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
              return [];
            } else {
              console.log("item: " + data);
              items.push(data);
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Error fetching item");
          });
      }
      // check to see items array is correct
      console.log("items: " + items);

      // get kitchen name and description

      const name = await fetch(`http://localhost:8080/kitechens/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            return;
          } else {
            console.log("name: " + data);
            return data;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching item");
        });

      // set kitchen data
      // first see what these return and then set the state
      // setKitchenData({
      //     name: name,
      //     members: member,
      //     items: items,
      // });
    }
    fetchData();
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link Copied to Clipboard");
  }

  async function isMember() {
    return kitchenData.members.includes(userName);
  }

  if (userName == "" || userName == null || !isMember()) {
    // Display the kitchens view page
    return (
      <div className="flex flex-col">
        <NavBar />
        <button
          onClick={copyLink}
          className="w-40 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl mt-12 "
        >
          Share
        </button>
        <div>
          <div className="flex flex-row items-center align-middle justify-center">
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600 mr-8">
              {kitchenData.name}
            </label>
            
            {/* edit icon */}
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0L25 5L35 15L40 10L30 0ZM20 10L0 30V40H10L30 20L20 10Z" fill="black"/>
            </svg>

            {/* view only icon */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg> */}
          </div>

          <div className="">
            {kitchenData.items.map((item) => (
              <Items
                name={item.name}
                quantity={item.quantity}
                owner={item.owner}
                expires={item.expires}
                itemId={item.itemId}
                key={item.itemId}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // Display the kitchens edit page
    return (
      <div className="flex flex-col">
        <NavBar />
        <div classname="flex flex-row">
          <button
            onClick={copyLink}
            className="w-50 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl mt-12 "
          >
            Share as a Link
          </button>
          <button
            onClick={shareWithMembers}
            className="w-50 shadow-black-lg mx-1 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl mt-12 "
          >
            Share to Other Members
          </button>
        </div>
        <div>
          <div className="flex flex-row items-center align-middle justify-center">
            <label className="flex justify-center py-12 text-4xl font-bold text-gray-600 mr-8">
              {kitchenData.name}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div className="">
            {kitchenData.items.map((item) => (
              <Items
                name={item.name}
                quantity={item.quantity}
                owner={item.owner}
                expires={item.expires}
                itemId={item.itemId}
                key={item.itemId}
              />
            ))}
          </div>
          
        </div>
      </div>
    );
  }
}

export default kitchenDetails;

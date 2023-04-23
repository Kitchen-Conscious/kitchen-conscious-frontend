import React from "react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/src/myContext";
import NavBar from "@/src/NavBar";
import Items from "@/src/Items";
import { Modal, Button } from "react-bootstrap";
import EditableItem from "@/src/EditableItem";

function kitchenDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { userName, itemUpdated, setItemUpdated } = useContext(MyContext);
  const { isMember, setIsMember } = useState(false);
  const [kitchenData, setKitchenData] = useState({
    name: "",
    details: "",
    members: [],
    items: [
      {
        itemId: 0,
        kitchenId: 0,
        version: 0,
        name: "",
        count: 0,
        details: "",
        expirationDate: "",
      },
    ],
  });
  const [show, setShow] = useState(false);
  const [inputName, setInputName] = useState("");
  const handleAddButtonClick = () => {
    // const newItem = {
    //   name: "inputName",
    //   quantity: 3,
    //   owner: "Lynn",
    //   expires: "4/26/2023",
    //   itemId: 132,
    // };
    // const old = Object.values(kitchenData.items || []);
    // const newItems = [...old, newItem];

    // setKitchenData(
    //   "Kitchen1", [], newItems
    // );
    // setInputName('');
    // handleClose();

    setKitchenData(newItems);
    setInputName("");
  };

  const handleClose = async (event) => {
    event.preventDefault();

    setShow(false);

    const response = await fetch(`http://localhost:8080/kitchens/${id}/items`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemInputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setItemUpdated(!itemUpdated);
  };

  useEffect(() => {
    console.log(router);
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
            let result = [];
            console.log("members: " + data[0]);
            console.log(data[0]);
            for (let i = 0; i < data.length; i++) {
              if (data[i].type === "OWNER") {
                result.push(data[i].userId);
              }
            }
            return result;
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
        const item = await fetch(
          `http://localhost:8080/items/${itemIds[i].itemId}`,
          {
            //credentials should not be included... keep this in mind
            credentials: "include",
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

      const name = await fetch(`http://localhost:8080/kitchens/${id}`, {
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
            console.log("name: " + data.name);
            return data;
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching item");
        });

      console.log("pre load ln 166");
      console.log(name);
      console.log(member);
      console.log(items);

      // set kitchen data
      // first see what these return and then set the state
      setKitchenData({
        name: name.name,
        details: name.details,
        members: member,
        items: items,
      });
    }
    if (id) {
      fetchData();
    }
  }, [router, itemUpdated]);

  const shareHandler = async (data) => {
    //const router = useRouter();
    //const { kitchenId } = router.query;
    console.log(id);
    fetch(`http://localhost:8080/kitchens/${id}/members`, {
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

  const shareWithMembers = async (event) => {
    event.preventDefault();
    const uId = prompt("UserId you wish to share with:", "");
    const type = prompt("User Type (VIEWER or EDITOR):", " ");
    console.log(uId);
    const response = await fetch(
      `http://localhost:8080/kitchens/${id}/members`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: uId, type: type }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link Copied to Clipboard");
  }

  //const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItemInputs((values) => ({ ...values, [name]: value }));
  };

  const [itemInputs, setItemInputs] = useState({
    name: "",
    count: "",
    detail: "",
    expirationDate: "",
  });

  if (userName == "" || userName == null) {
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
          <div className="flex flex-row items-center align-middle justify-center pt-12 pb-5">
            <label className="flex justify-center text-4xl font-bold text-gray-600 mr-8">
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
          <label className="flex justify-center pb-10 text-xl  text-gray-600 mr-8">
            {kitchenData.details}
          </label>
          <div className="">
            {kitchenData.items.map((item) => (
              <Items
                name={item.name}
                quantity={item.count}
                owner={item.details}
                expires={item.expirationDate}
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
          <div className="flex flex-row items-center align-middle justify-center pt-12 pb-5">
            <label className="flex justify-center text-4xl font-bold text-gray-600 mr-8">
              {kitchenData.name}
            </label>
            <button>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 0L25 5L35 15L40 10L30 0ZM20 10L0 30V40H10L30 20L20 10Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
          <label className="flex justify-center pb-10 text-xl  text-gray-600 mr-8">
            {kitchenData.details}
          </label>
          <div className="">
            {kitchenData.items.map((item, index) => (
              <>
                <EditableItem
                  name={item.name}
                  quantity={item.count}
                  owner={item.details}
                  expires={item.expirationDate}
                  itemId={item.itemId}
                  key={item.itemId}
                />
              </>
            ))}
          </div>

          <div className="flex justify-center align-middle">
            <Button
              variant="primary"
              onClick={handleShow}
              className="w-50 shadow-black-lg mx-10 cursor-pointer bg-green-600/95 text-white  px-4 py-2 hover:bg-green-700 rounded-xl  text-lg font-medium lg:text-xl mt-12 "
              type="button"
            >
              Add Item
            </Button>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}
            >
              <Modal.Body>
                <div className="relative justify-center w-full max-w-md max-h-full mx-auto mt-6">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <Button
                      onClick={handleClose}
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="addItem"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close form</span>
                    </Button>
                    <div className="px-6 py-6 lg:px-8 flex flex-col justify-center align-middle">
                      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Add An Item
                      </h3>
                      <form className="space-y-6" action="#">
                        <div>
                          <label
                            value={inputName}
                            onChange={(event) =>
                              setInputName(event.target.value)
                            }
                            for="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Item Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="count"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Item Count
                          </label>
                          <input
                            type="number"
                            name="count"
                            id="count"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="detail"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Sharing Details
                          </label>
                          <input
                            type="text"
                            name="detail"
                            id="detail"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="expirationDate"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Expiration Date
                          </label>
                          <input
                            type="date"
                            name="expirationDate"
                            id="expirationDate"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          onClick={handleClose}
                          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Add
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default kitchenDetails;

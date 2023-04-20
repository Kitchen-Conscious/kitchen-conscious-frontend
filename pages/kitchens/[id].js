import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MyContext from "@/src/myContext";
import NavBar from "@/src/NavBar";

function kitchenDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { userName } = useContext(MyContext);
  const [kitchenData, setKitchenData] = useState({
    name: "",
    members: [],
    items: [
      {
        name: "",
        quantity: 0,
        owner: "",
        expires: "",
        id: 0,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
        const res = await fetch(`http://localhost:8080/kitchens/${id}`, { credentials: "include" });
        const json = await res.json();
        setKitchenData(json);
    }
    fetchData();
    }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link Copied to Clipboard");
  }

  if (userName == "" || userName == null) {
    // Display the kitchens view page
    return (
      <div className="flex flex-col">
        <NavBar />
        <button onclick={copyLink}>Share</button>
        <div>
          {kitchenData.name}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
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
      </div>
    );
  } else {
    // Display the kitchens edit page
    return {};
  }
}

export default kitchenDetails;

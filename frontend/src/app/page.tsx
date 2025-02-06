"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const response = await fetch("http://localhost:5292");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchHomePage().then((resp) => {
      setApiResponse(resp.message);
    });
  }, []);

  return (
    <div className="col-span-4 col-start-3 2xl:col-span-6 2xl:col-start-3 lg:col-span-7 lg:col-start-2 ">
      <h1 className="my-4">Setup initial configuration of Daisy</h1>
      <form className="flex flex-col justify-between gap-2 w-full">
        <label className="flex justify-between gap-2">
          <span>Party name</span>
          <input type="text" />
        </label>
        <label className="flex justify-between gap-2">
          <span>Super admin username</span>
          <input type="text" />
        </label>
        <label className="flex justify-between gap-2">
          <span>Super admin password</span>
          <input type="password" />
        </label>
        <button type="submit" className="mt-8 bg-indigo-500 mx-auto">
          Submit
        </button>
        <p>{apiResponse}</p>
      </form>
    </div>
  );
}

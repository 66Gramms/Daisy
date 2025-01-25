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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {apiResponse}
      </main>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function GlobalNotFoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/");
    }, 4900);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page not found</h1> <br />
        <p>
          You will be redirected to the home page in {countdown}{" "}
          {countdown === 1 ? "second" : "seconds"}.
        </p>
      </div>
    </div>
  );
}

export default GlobalNotFoundPage;

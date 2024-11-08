"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Verify({ params }) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/user/verify/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        });
        const { message, isVerified } = await res.json();
        if (res.ok) {
          // console.log("UI isVerified", isVerified);
          setIsVerified(isVerified);
          toast(message);
        } else {
          toast(message);
        }
      } catch (error) {
        toast("Something went wrong. Please try again later.");
      }
    };
    verifyToken();
  }, []);

  return (
    <div>
      {isVerified ? (
        <p className="text-success">Verified successfully</p>
      ) : (
        <p className="text-error">The token is expired</p>
      )}
      <a href="/">Start Using</a>
    </div>
  );
}

import Link from "next/link";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function LogIn({ id, updateLoginStatus }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const loginUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username_or_email: formData.get("username_or_email"),
      password: formData.get("password"),
    };
    if (data.username_or_email && data.password) {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { msg } = await res.json();
      if (res.ok) {
        await updateLoginStatus();
      }

      toast(msg);
    } else {
      toast("Please fill in all the fields");
    }
  };
  return (
    <div className=" py-20 px-24">
      <p className="text-center font-bold text-3xl mb-10">Imagination</p>
      <form className="grid grid-cols-1" onSubmit={loginUser}>
        <Input
          id="username_or_email"
          label="Username or Email"
          type="text"
          value={username}
          controller={setUsername}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          controller={setPassword}
        />
        <p>Forgot your password?</p>
        <input
          type="submit"
          value="Log in"
          onClick={() => document.getElementById(id).close()}
          className="border rounded-3xl text-white bg-red-500 py-2 mt-3 cursor-pointer"
        />
      </form>
    </div>
  );
}

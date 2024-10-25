import { useState } from "react";
import Input from "./Input";
import { toast } from "sonner";

export default function Register({ id }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.username && data.email && data.password && data.confirmPassword) {
      if (data.password === data.confirmPassword) {
        try {
          const res = await fetch("/api/user/register/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const { message, user } = await res.json();
          if (res.ok) {
            toast(message);
          } else {
            toast(message);
          }
        } catch (error) {
          toast("Something went wrong. Please try again later.");
        }
      } else {
        toast("Confirm Password field much equal with the Password field.");
      }
    } else {
      toast("Please fill in all the fields");
    }
  };

  return (
    <div className=" py-20 px-32">
      <p className="text-center font-bold text-3xl mb-10">Imagination</p>
      <form className="grid grid-cols-1" onSubmit={registerUser}>
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          controller={setUsername}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          controller={setEmail}
        />
        <Input
          id="password"
          label="Create a password"
          type="password"
          value={password}
          controller={setPassword}
        />
        <Input
          id="confirmPassword"
          label="ConfirmPassword"
          type="password"
          value={confirmPassword}
          controller={setConfirmPassword}
        />

        <input
          type="submit"
          value="Continue"
          onClick={() => document.getElementById(id).close()}
          className="border rounded-3xl text-white bg-red-500 py-2 mt-3 cursor-pointer"
        />
      </form>
    </div>
  );
}

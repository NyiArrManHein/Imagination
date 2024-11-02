"use client";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Register from "./Register";
import LogIn from "./LogIn";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const { push } = useRouter();

  const updateLoginStatus = async () => {
    const res = await fetch("/api/auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { isLoggedIn, user } = await res.json();
    setIsLogIn(isLoggedIn);
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const logoutUser = async () => {
    let msg = "";
    const res = await fetch("/api/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message } = await res.json();
    msg = message;
    if (res.ok) {
      setIsLogIn(false);
      push("/");
      console.log(msg);
    } else {
      setIsLogIn(true);
    }
  };

  return (
    <div className="flex flex-row justify-evenly items-center p-4">
      {isLogIn ? (
        <div className="grid grid-cols-2 gap-2">
          <span>Home</span>{" "}
          <span
            onClick={() => push("/create/")}
            className="me-2 cursor-pointer"
          >
            Create
          </span>
        </div>
      ) : (
        <span className="me-2">Imagination</span>
      )}

      <div className="relative flex flex-row flex-1 items-center me-2">
        <FaSearch className="absolute ml-2 text-gray-400" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 w-full"
        ></input>
      </div>
      {isLogIn ? (
        <div className="grid grid-cols-2 gap-2">
          <CgProfile size={30} />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer dropdown-toggle">
              <MdKeyboardArrowDown size={30} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={logoutUser}>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => document.getElementById("login_modal").showModal()}
            className="rounded-full bg-gray-100 p-4 me-2"
          >
            Log in
          </button>
          <button
            onClick={() =>
              document.getElementById("register_modal").showModal()
            }
            className="rounded-full bg-black text-white p-4 me-2"
          >
            Sign up
          </button>
        </div>
      )}
      <Modal id="register_modal">
        <Register id="register_modal" />
      </Modal>

      <Modal id="login_modal">
        <LogIn id="login_modal" updateLoginStatus={updateLoginStatus} />
      </Modal>
    </div>
  );
}

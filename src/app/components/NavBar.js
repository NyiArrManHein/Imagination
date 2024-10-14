import { FaSearch } from "react-icons/fa";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-evenly items-center p-4">
      <span className="me-2">Imagination</span>

      <div className="relative flex flex-row flex-1 items-center me-2">
        <FaSearch className="absolute ml-2 text-gray-400" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 w-full"
        ></input>
      </div>
      <button className="rounded-full bg-gray-100 p-4 me-2">Log in</button>
      <button className="rounded-full bg-red-500 text-white p-4 me-2">
        Sign up
      </button>
    </div>
  );
}

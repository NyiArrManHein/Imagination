import Image from "next/image";
import ImageCard from "./components/ImageCard";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <ImageCard />
    </div>
  );
}

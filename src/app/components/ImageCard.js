import Image from "next/image";

export default function ImageCard() {
  return (
    <div className="">
      <Image src="/naruto.jpg" width={250} height={250} />
    </div>
  );
}

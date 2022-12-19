import Image from "next/image";
import home from "../../public/assets/Home.svg";

export default function NutClosed() {
  return <Image src={home} height={60} width={60} alt="pen to edit"></Image>;
}

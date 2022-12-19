import Image from "next/image";
import nutOpen from "../../public/assets/nuss-offen.svg";

export default function NutClosed() {
  return <Image src={nutOpen} height={200} width={200} alt="nut"></Image>;
}

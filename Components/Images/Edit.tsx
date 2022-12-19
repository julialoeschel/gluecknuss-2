import Image from "next/image";
import edit from "../../public/assets/edit.svg";

export default function NutClosed() {
  return <Image src={edit} height={60} width={60} alt="pen to edit"></Image>;
}

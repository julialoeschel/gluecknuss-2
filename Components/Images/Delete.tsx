import Image from "next/image";
import Deletee from "../../public/assets/delete.svg";

export default function Delete() {
  return <Image src={Deletee} height={20} width={20} alt="pen to edit"></Image>;
}

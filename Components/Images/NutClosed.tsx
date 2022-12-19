import Image from "next/image";

import nutClosed from "../../public/assets/nuss-zu.svg";

export default function NutClosed(): JSX.Element {
  return <Image src={nutClosed} height={200} width={200} alt="nut"></Image>;
}

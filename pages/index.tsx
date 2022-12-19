import styled from "styled-components";
import { Inter } from "@next/font/google";
import NutClosed from "../Components/Images/NutClosed";
import NutOpen from "../Components/Images/NutOpen";
import Edit from "../Components/Images/Edit";
import { useEffect, useState } from "react";
import { keyframes } from "styled-components";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
type Nut = { animation: boolean };

export default function Home() {
  const [randomQuote, setRandomQuote] = useState({
    _id: undefined,
    verdict: "",
    tags: [""],
  });
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  async function getOneVerdict() {
    const response = await fetch("/api/verdicts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "random" }),
    });
    const data = await response.json();
    setRandomQuote(data);
  }

  useEffect(() => {
    getOneVerdict();
  }, []);

  function handleNutClick() {
    setAnimation(true);
    setTimeout(() => {
      setIsClicked(true);
      setAnimation(false);
    }, 3000);
  }

  return (
    <>
      <Title>Glücksnuss für Martina</Title>
      {isClicked ? (
        <OpenNut>
          <NutOpen></NutOpen>
          <Div>
            <p>{randomQuote?.verdict}</p>
          </Div>
        </OpenNut>
      ) : (
        <ClosedNut onClick={handleNutClick}>
          <Test animation={animation}>
            <NutClosed></NutClosed>
          </Test>
          {animation ? null : <p>click me</p>}
        </ClosedNut>
      )}
      <StyledLink href="/edit">
        <Edit></Edit>
      </StyledLink>
    </>
  );
}

const Title = styled.h1`
  color: #e66000;
  text-align: center;
`;

const animations = keyframes`
0%{ transform: scale(1)}
 10%{  transform: scale(2)  }
 50%{transform: scale(0.8) }
 80%{transform: scale(1.2) }
100%   {  transform: scale(1) }

`;

const ClosedNut = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const OpenNut = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Test = styled.div<Nut>`
  animation: ${(props) => props.animation && animations} 3s;
`;

const Div = styled.div`
  padding: 20px;
  margin-top: 40px;
  min-width: 400px;
  text-align: center;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const StyledLink = styled(Link)`
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`;

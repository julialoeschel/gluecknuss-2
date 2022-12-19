import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewQuote from "../Components/AddNewQuote";

export default function EditPage() {
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  console.log(passwordCorrect);
  async function handlePWSubmit(
    event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) {
    event.preventDefault();
    const userTyped = event.target as HTMLFormElement;
    const value = userTyped.passwort.value;

    const response = await fetch("/api/passwords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();
    if (data.status === "ok") {
      setPasswordCorrect(true);
    } else {
      toast.error("passwort incorrect", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    event.target.passwort.value = "";
  }

  return (
    <>
      <Heading>want to add some new Content?</Heading>

      <div>
        {passwordCorrect ? (
          <AddNewQuote onLogOut={() => setPasswordCorrect(false)}></AddNewQuote>
        ) : (
          <Form onSubmit={handlePWSubmit}>
            <label htmlFor="passwort">Passwort</label>
            <input
              type="password"
              id="passwort"
              name="passwort"
              autoComplete="off"
            />
            <button>check me in</button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Form>
        )}
      </div>
    </>
  );
}

const Heading = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  button {
    border: none;
    background-color: #e66000;
    padding: 10px 14px;
    border-radius: 1em;
  }
`;

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Images/Home";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListOfQuotes from "./ListOfQuotes";

type PropTypes = {
  onLogOut: () => void;
};

type Quote = {
  _id: string;
  verdict: string;
  tags: [string];
};

export default function AddNewQuote({ onLogOut }: PropTypes): JSX.Element {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    getAllVerdicts();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { verdict, tags } = event.target as HTMLFormElement;
    const verdictValue = verdict.value;
    const tagsArray = tags.value.split(",");

    const response = await fetch("/api/verdicts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verdict: verdictValue, tags: tagsArray }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      toast.success("cool, danke!", {
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
    event.target.verdict.value = "";
    event.target.tags.value = "";
    getAllVerdicts();
  }

  async function getAllVerdicts() {
    const response = await fetch("/api/verdicts");
    const data = await response.json();
    setQuotes(data);
  }

  async function handleDelete(id: string) {
    const response = await fetch("/api/verdicts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const status = await response.json();
    console.log(status);
    getAllVerdicts();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Div>
          <label htmlFor="verdict">Spruch</label>
          <textarea type="text" id="verdict" name="verdict" required />
        </Div>
        <Div>
          <label htmlFor="tags">Tags mit Komma</label>
          <input type="text" id="tags" name="tags" />
        </Div>
        <Button>Add</Button>
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
          theme="dark"
        />
      </Form>
      <UList>
        {quotes?.map((quote: Quote) => {
          return (
            <ListOfQuotes
              key={quote._id}
              quote={quote}
              onDelete={handleDelete}
            ></ListOfQuotes>
          );
        })}
      </UList>
      <StyledLink href="/" onClick={onLogOut}>
        <Home></Home>
      </StyledLink>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Div = styled.div`
  display: grid;
  width: 50vw;
`;

const Button = styled.button`
  border: none;
  background-color: #e66000;
  padding: 10px 14px;
  border-radius: 1em;
`;

const StyledLink = styled(Link)`
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`;

const UList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0 2rem;
  height: 60vh;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

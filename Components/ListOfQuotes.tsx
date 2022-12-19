import styled from "styled-components";
import DeletePic from "./Images/Delete";

type Quote = {
  onDelete: (id) => void;
  quote: {
    _id: string;
    verdict: string;
    tags: [string];
  };
};

export default function ListOfQuotes({ quote, onDelete }: Quote) {
  async function handleDelete(id: string) {
    onDelete(id);
  }

  return (
    <ListItem>
      <p>{quote.verdict}</p>
      <button onClick={() => handleDelete(quote._id)}>
        <DeletePic />
      </button>
    </ListItem>
  );
}

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 40px;

  button {
    background-color: transparent;
    border: none;
    border-radius: 1rem;
  }

  button:hover {
    background-color: #e66000;
  }
`;

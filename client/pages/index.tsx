import { useState } from "react";
import styled from "styled-components";

const calcColor = (length: number): string => {
  return `hsl(${Math.min(length * 12, 120)},100%,50%)`;
};

const Container = styled.div`
  display: grid;
  width: 100vw;
  justify-content: center;
  align-content: center;
  row-gap: 1em;
`;

const SubmitButton = styled.button`
  background-color: #00092e;
  color: gold;
  height: 2em;
  margin-top: 3em;
  border: ${(props) => (props ? "2px solid gold" : "2px solid black")};
`;

const InputField = styled.input`
  background-color: ${(props) => calcColor(props.value.length)};
  color: white;
  height: 2em;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }

  return (
    <>
      <Container>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputField
            value={passwordName}
            onChange={(event) => setPasswordName(event.target.value)}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
        {passwordDoc && (
          <>
            {passwordDoc.name} {passwordDoc.value}
          </>
        )}
      </Container>
    </>
  );
}

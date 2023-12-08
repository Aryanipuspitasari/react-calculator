import styled from "styled-components";

import "./App.css";
import { useState } from "react";

const ContainerCalculator = styled.div`
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const InputField = styled.input`
  width:86%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid grey;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;

const Button = styled.button`
  width:  ${props => props.$clear? '92%' : '48px'};;
  height: 48px;
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
  display: grid;
  place-items: center;
`;


function App() {
  const [input, setInput] = useState("");

  const handleClear = () => {
    setInput("");
  };

  const handleButton = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const result = new Function(`return ${input}`)(); // IIFE function, immediately invoked
      setInput(result.toString())
    } catch{
      setInput('error')
    }
    
  };
  return (
    <>
      <ContainerCalculator>
        <InputField type="text" readOnly value={input} />

        <ButtonContainer>
          {[7, 8, 9, "/"].map((value) => (
            <Button key={value} onClick={() => handleButton(value)}>
              {value}
            </Button>
          ))}

          {[4, 5, 6, "*"].map((value) => (
            <Button key={value} onClick={() => handleButton(value)}>
              {value}
            </Button>
          ))}

          {[1, 2, 3, "+"].map((value) => (
            <Button key={value} onClick={() => handleButton(value)}>
              {value}
            </Button>
          ))}

          {[0, '.', '=', "-"].map((value) => (
            <Button key={value} onClick={() => 
            (value === '=' ? handleCalculate() : handleButton(value))
            }>
              {value}
            </Button>
          ))}
        </ButtonContainer>

        <Button onClick={handleClear} $clear>C</Button>
      </ContainerCalculator>
    </>
  );
}

export default App;

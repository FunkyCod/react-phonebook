import styled from "styled-components";

export const Form = styled.form`
  border: 1px solid;
  width: 500px;
  padding: 20px;
`;
export const FormLabelBox = styled.div``;
export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  height: 25px;
  margin-top: 3px;

  font-weight: 400;
  font-size: 13px;

  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(206, 205, 205);

  &:focus {
    border: 4px solid #99c2f8;
  }
`;

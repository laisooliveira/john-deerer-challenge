import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  padding: 10px;
  background-color: green;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 5px;
  }
`;

export const Container = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 16px;
  }
`;

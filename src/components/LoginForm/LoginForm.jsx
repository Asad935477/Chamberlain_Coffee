import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <form className="form" action>
          <p className="title">Login Form</p>
          <input
            placeholder="Username"
            className="username input"
            type="text"
          />
          <input
            placeholder="Password"
            className="password input"
            type="password"
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ::selection {
    background-color: gray;
  }

  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .form {
    width: 400px;
    height: 400px;
    background-image: linear-gradient(to bottom, #7b4a3a, #3b1f1b);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 0.5rem;
  }

  .title {
    color: wheat;
    margin: 3rem 0;
    font-size: 2rem;
  }

  .input {
    margin: 0.5rem 0;
    padding: 1rem 0.5rem;
    width: 20rem;
    background-color: inherit;
    color: wheat;
    border: none;
    outline: none;
    border-bottom: 1px solid wheat;
    transition: all 400ms;
  }
  .input:hover {
    background-color: #3b1f1b;
    border: none;
    border-radius: 0.5rem;
  }
  .btn {
    height: 3rem;
    width: 20rem;
    margin-top: 3rem;
    background-color: wheat;
    border-radius: 0.5rem;
    border: none;
    font-size: 1.2rem;
    transition: all 400ms;
    cursor: pointer;
    box-shadow: 0 0 10px antiquewhite, 0 0 10px antiquewhite;
  }
  .btn:hover {
    background-color: antiquewhite;
    box-shadow: none;
  }
`;

export default Form;

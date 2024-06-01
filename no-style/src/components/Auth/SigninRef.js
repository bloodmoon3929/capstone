import React, { useEffect, useState } from "react";
import { startLogin } from "../../modules/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

const SignInWarrper = styled.div`
   h1 {
      font-weight: bold;
      margin: 0;
   }
   a {
      color: #333;
      font-size: 14px;
      text-decoration: none;
      margin: 15px 0;
   }
   button {
      border-radius: 20px;
      border: 1px solid #ff4b2b;
      background-color: #ff4b2b;
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
   }
   
   button:active {
      transform: scale(0.95);
   }
   
   button:focus {
      outline: none;
   }
   
   button.ghost {
      background-color: transparent;
      border-color: #ffffff;
   }
   form {
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      //////////
      
      padding: 0 50px;
      height: 100%;
      text-align: center;

      @media ${({ theme }) => theme.device.tablet} {
         padding: 1rem;
      }
   }
   input {
      background-color: #eee;
      border: none;
      padding: 12px 15px;
      margin: 8px 0;
      width: 100%;
   }
   .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
   }
   
   .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
   }

   .container.right-panel-active .sign-in-container {
      transform: translateX(100%);
   }
   @keyframes show {
      0%,
      49.99% {
      opacity: 0;
      z-index: 1;
      }
   
      50%,
      100% {
      opacity: 1;
      z-index: 5;
      }
   }
   .social-container {
      margin: 20px 0;
   }
`;

function SignInForm() {
   const dispatch = useDispatch();
   const navigator = useNavigate();
   const loading = useSelector((state) => state.loading.login);

   const [loginInfo, setLoginInfo] = useState({
      email: "",
      password: ""
   });
   const handleChange = evt => {
      const value = evt.target.value;
      setLoginInfo((state) => ({
         ...state,
         [evt.target.name]: value
      }));
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      if(loginInfo.email === "") {
         alert('아이디를 입력하세요');
         return;
      } else if(loginInfo.password === "") {
         alert('비밀번호를 입력하세요');
         return;
      }
      dispatch(startLogin(loginInfo));
   };

   useEffect(() => {
   if(loading === false) {
      const token = localStorage.getItem('token');
      if(token) {
         navigator('/', {replace : false});
      } 
      }
   }, [loading]);

  return (
   <SignInWarrper>
      <div className="form-container sign-in-container">
         <form onSubmit={handleOnSubmit}>
         <h1>언제볼까?</h1>
         <div className="social-container">
            
         </div>
         <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
         />
         <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
         />
         <a href="#">비밀번호를 잊었니?</a>
         <button>로그인</button>
         </form>
      </div>
   </SignInWarrper>
    
  );
}

export default SignInForm;

import React, { useState } from "react";
import "./style.css";
import SignInForm from "./SigninRef";
import SignUpForm from "./SignupRef";
import styled from "styled-components";

const LoginRefWrapper = styled.div`
.container {
   background-color: #fff;
   border-radius: 10px;
   box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
   position: relative;
   overflow: hidden;

   @media ${({ theme }) => theme.device.tablet} {
      width: 100vw;
  }

   width: 768px;
   max-width: 100%;
   min-height: 480px;
 }

 .container.right-panel-active .sign-up-container {
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
   animation: show 0.6s;
 }

 .container.right-panel-active .sign-in-container {
   transform: translateX(100%);
 }

 .overlay-container {
   position: absolute;
   top: 0;
   left: 50%;
   width: 50%;
   height: 100%;
   overflow: hidden;
   transition: transform 0.6s ease-in-out;
   z-index: 100;
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

 .container.right-panel-active .overlay-container {
   transform: translateX(-100%);
 }
 .overlay {
   background: #ff416c;
   background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
   background: linear-gradient(to right, #ff4b2b, #ff416c);
   background-repeat: no-repeat;
   background-size: cover;
   background-position: 0 0;
   color: #ffffff;
   position: relative;
   left: -100%;
   height: 100%;
   width: 200%;
   transform: translateX(0);
   transition: transform 0.6s ease-in-out;
 }
 
 .container.right-panel-active .overlay {
   transform: translateX(50%);
 }
 .overlay-panel {
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   padding: 0 40px;
   text-align: center;
   top: 0;
   height: 100%;
   width: 50%;
   transform: translateX(0);
   transition: transform 0.6s ease-in-out;
   @media ${({ theme }) => theme.device.tablet} {
         padding: 1rem;
  }
 }
 
 .overlay-left {
   transform: translateX(-20%);
 }
 
 .container.right-panel-active .overlay-left {
   transform: translateX(0);
 }
 
 .overlay-right {
   right: 0;
   transform: translateX(0);
 }
 
 .container.right-panel-active .overlay-right {
   transform: translateX(20%);
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

   @media ${({ theme }) => theme.device.tablet} {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
  }
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
`

const LoginRef = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <LoginRefWrapper>
      <div className="App">
        <div className={containerClass} id="container">


          <SignUpForm />
          <SignInForm />


          
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>새로운 친구는 언제나 환영</h2>
                <em style={
                {
                    marginBottom: '1rem'
                }
                }>
                "꿈에 날짜를 더하면 목표가 되고, 목표를 쪼개면 계획이 되고, 계획을 실천하면 현실이 된다."
                </em>

                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  로그인
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>무엇을 하나요?</h1>
                <h5>언제볼까는 사용자의 미팅일정관리 및 시간표관리를 도와주는 앱입니다</h5>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginRefWrapper>
    
  );
}


export default LoginRef;
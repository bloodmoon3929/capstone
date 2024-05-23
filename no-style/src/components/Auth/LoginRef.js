import React, { useState } from "react";
import "./style.css";
import SignInForm from "./SigninRef";
import SignUpForm from "./SignupRef";

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
  );
}


export default LoginRef;
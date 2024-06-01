import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { usereffect } from "../../modules/login";
import { useNavigate } from "react-router";
import styled from "styled-components";

const SignUpWrapper = styled.div`
 h2 {
   text-align: center;
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
 .sign-up-container {
   left: 0;
   width: 50%;
   opacity: 0;
   z-index: 1;
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
 }.social-container {
   margin: 20px 0;
 }
`;

const SignUpForm = () => {
  const [signupInfo, setSignupInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    password2: ""
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleChange = e => {
    const value = e.target.value;
    setSignupInfo((state) => ({
      ...state,
      [e.target.name]: value
    }));
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const { displayName, email, password, password2 } = signupInfo;
    if(displayName === "") {
      alert('학번을 입력하세요');
      return;
    } else if(email === "") {
      alert('아이디를 입력하세요');
      return;
    } else if(password === "") {
      alert('비밀번호를 입력하세요');
      return;
    } else if(password2 === "") {
      alert('비밀번호 확인을 입력하세요');
      return;
    }

    if(password !== password2) {
      alert('비밀번호 두개가 다릅니다');
      return;
    }

    const onSignUp = async () => {
      const body = {
         email, password, uid: displayName
      };

      try {
         const res = await axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/signup', body);

         if (res.status === 200) { /// 정상적으로 회원가입이 진행된 경우
            const { token } = res.data;
            localStorage.setItem('token', token);
            
            const decodedToken = jwtDecode(token);
            localStorage.setItem('user', decodedToken);

            await dispatch(usereffect({
               email: decodedToken.email,
               uid: decodedToken.uid
            }));
            navigator('/', {replace : false});
         }
      } catch (e) {
         if (e.response) {

            if (e.response.status === 401) {

               alert('이미 존재하는 이메일입니다.');

            } else {

               alert('이미 존재하는 학번입니다.');

            }

         } else {
            console.error(e);
            alert('회원가입 중 오류가 발생했습니다.');
         }
      }
    }

    onSignUp();
  };

  return (
    <SignUpWrapper>
      <div className="form-container sign-up-container">
        <form onSubmit={handleOnSubmit}>
          <h2>언제볼까</h2>
          <div className="social-container">
          </div>
          <input
            type="text"
            name="displayName"
            value={signupInfo.displayName}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="password2"
            value={signupInfo.password2}
            onChange={handleChange}
            placeholder="Password2"
          />
          <button onClick={handleOnSubmit}>회원가입</button>
        </form>
      </div>
    </SignUpWrapper>
    
  );
}

export default SignUpForm;

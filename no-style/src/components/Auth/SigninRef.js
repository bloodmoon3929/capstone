import React, { useEffect, useState } from "react";
import { startLogin } from "../../modules/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


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
  );
}

export default SignInForm;

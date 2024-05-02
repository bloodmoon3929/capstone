import styled from "styled-components";

const SigninBlock = styled.div`
   .form {
      display: flex;
      padding: 30px;
      flex-direction: column;
   }
   .background {
      width: 60vw;
      background-color: white;
      height: auto;
      width: 90%;
      max-width: 450px;
      padding: 10px;
      margin: 0 auto;
      border-radius: 5px;
      box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
      text-align: center;
   }

   .login:active,
   .login:focus,
   .login:hover {
      outline: none;
      border-bottom-color: rgb(68, 112, 67);
   }

   .login {
      border: none;
      border-bottom: 2px solid #D1D1D4;
      background: none;
      padding: 10px;
      font-weight: 700;
      transition: .2s;
      width: 75%;
   }

   button{
      border-radius: 3px;
      background: rgb(68, 112, 67);
      color:#fff;
      border:none;
      position:relative;
      height:30px;
      font-size:1.2em;
      padding:0 2em;
      cursor:pointer;
      transition:800ms ease all;
      outline:none;
   }
   button:hover{
      border-radius: 3px;
      background:#fff;
      color:#1AAB8A;
   }
   button:before,button:after{
      content:'';
      position:absolute;
      top:0;
      right:0;
      height:1px;
      width:0;
      background: #1AAB8A;
      transition:400ms ease all;
   }
   button:after{
      right:inherit;
      top:inherit;
      left:0;
      bottom:0;
   }
   button:hover:before,button:hover:after{
      width:100%;
      transition:800ms ease all;
   }
`;

const Signin = ({
   onChange,
   onClick,
   onGoBack
}) => {
   return(
      <SigninBlock>
         <div className="background">
            <h2>회원가입</h2>
            <div className="form">
            <p><input className="login" type="text" name="email" placeholder="아이디" onChange={onChange} /></p>
            <p><input className="login" type="password" name="password" placeholder="비밀번호" onChange={onChange} /></p>
            <p><input className="login" type="password" name="password2" placeholder="비밀번호 확인" onChange={onChange} /></p>
            <p><input className="login" type="text" name="displayName" placeholder="학번" onChange={onChange} /></p>

            <p><button  type="submit" onClick={onClick}>회원가입</button></p>
            </div>

            <p>로그인화면으로 돌아가기  <button onClick={onGoBack}>로그인</button></p>
         </div>
      </SigninBlock>
   )
}

export default Signin;
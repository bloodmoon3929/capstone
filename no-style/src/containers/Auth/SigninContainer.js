import React, { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Signin from '../../components/Auth/Signin';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usereffect } from '../../modules/login';
import { jwtDecode } from 'jwt-decode';

function SigninContainer() {
   const dispatch = useDispatch();
   const [signinInfo, setSigninInfo] = useState({
      email: '',
      password: '',
      password2: '',
      displayName: '',
   });

   const onChange = useCallback((e) => {
      setSigninInfo((state) => ({
         ...state,
         [e.target.name]: e.target.value
      }))
   }, []);

   const navigator = useNavigate();

   const onClick = async (e) => {
      e.preventDefault();
      const { email, password, password2, displayName: uid } = signinInfo;
      const body = {
         email, password, uid
      };

      if (password !== password2) {
         alert('비밀번호 두개가 다릅니다.');
         return;
      } else {
         try {
            const res = await axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/signup', body);

            if (res.status === 200) {
            const { token } = res.data;
            console.log(res);

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('token', token);
            

            // 상태 업데이트
            const decodedToken = jwtDecode(token); // 만약 필요하다면 디코드
            localStorage.setItem('user', decodedToken);

            dispatch(usereffect({
               email: decodedToken.email,
               uid: decodedToken.uid
            }));

            // 리디렉션
            navigator('/');

            // const userDocRef = doc(collection(db, 'user'), data.user.uid);
            // setDoc(userDocRef, { displayName: displayName, table: [] });
            }
         } catch (e) {
            if (e.response) {
            // 서버 응답이 있는 경우
            if (e.response.status === 401) {
               alert('이미 존재하는 이메일입니다.');
            } else {
               alert('이미 존재하는 학번입니다.');
            }
            } else {
            // 서버 응답이 없는 경우
            console.error(e);
            alert('회원가입 중 오류가 발생했습니다.');
            }
         }
      }
   }

    

   const onGoBack = useCallback(() => {
      navigator('/login', {replace: true})
   }, []);
 
   return (
      <Signin onChange={onChange} onGoBack={onGoBack} onClick={onClick}></Signin>
   )
}

export default SigninContainer;
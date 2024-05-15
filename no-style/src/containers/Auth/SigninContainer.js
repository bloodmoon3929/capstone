import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { authService, db } from '../../fbInstance';
import { useNavigate } from 'react-router';
import { collection, doc, setDoc } from 'firebase/firestore';
import Signin from '../../components/Auth/Signin';
import axios from 'axios';

function SigninContainer() {
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

   const onClick = async () => {
      const {email, password, password2, displayName: uid} = signinInfo;
      const body = {
         email, password, uid
      };
      if(password !== password2) {
         alert('비밀번호 두개가 다름');
         return;
      } else {
         try {
            const res = await axios.post('http://localhost:3001/signup', body);
            console.log(res);
            
            // const userDocRef = doc(collection(db, 'user'), data.user.uid);
            // setDoc(userDocRef, {displayName: displayName, table: []});
         } catch(e) {
            console.log(e);
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
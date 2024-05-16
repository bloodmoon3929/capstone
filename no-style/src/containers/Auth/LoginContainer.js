import React, { useCallback, useEffect } from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../modules/login';
import Login from '../../components/Auth/Login';




const LoginContainer = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading.login);

  const onChange = useCallback((e) => {
  setLoginInfo((state) => ({
    ...state,
    [e.target.name]: e.target.value
  }))
  }, []);


  const onSignIn = useCallback(() => {
    navigator('/signIn', {replace: true});
  }, []);


  const onLogin = useCallback((e) => {
    e.preventDefault();
    dispatch(startLogin(loginInfo));
    // const token = localStorage.getItem('token');
    // if(token) {
      
    //   navigator('/');
    // } else {
    //   console.log(123);
    // }
  }, [loginInfo]);

  useEffect(() => {
    if(loading === false) {
      const token = localStorage.getItem('token');
      if(token) {
        navigator('/');
      } 
    }
  }, [loading]);
  


  return (
  <Login onChange={onChange} onLogin={onLogin} onSignIn={onSignIn}></Login>
  )
}

export default LoginContainer;
import React, { useCallback } from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../modules/login';
import Login from '../../components/Auth/Login';




const LoginContainer = () => {
  const [loginInfo, setLoginInfo] = useState({
  email: '',
  password: ''
  });
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const onChange = useCallback((e) => {
  setLoginInfo((state) => ({
    ...state,
    [e.target.name]: e.target.value
  }))
  }, []);


  const onSignIn = useCallback(() => {
    navigator('/signIn', {replace: true});
  }, []);

  const onLogin = useCallback(() => {
    dispatch(startLogin(loginInfo));
  }, [loginInfo]);


  return (
  <Login onChange={onChange} onLogin={onLogin} onSignIn={onSignIn}></Login>
  )
}

export default LoginContainer;
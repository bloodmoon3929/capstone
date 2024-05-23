import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../modules/loading';
import { usereffect } from '../../modules/login';



const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token === null) {
      navigate('/loginRefine');
    }
    console.log('check auth');

    const checkAuth = async () => {
      dispatch(startLoading('auth-check'));

      if (!token) {
        dispatch(finishLoading('auth-check'));
        navigate('/loginRefine');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/auth-check', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const restoken  = response.data;      
         
        if (response.status === 200) {
            dispatch(usereffect({
               email : restoken.email,
               uid: restoken.uid
            }));
        } else {
          dispatch(finishLoading('auth-check'));
          navigate('/loginRefine');
          return;
        }

      } catch (error) {
        console.log('Authentication check failed', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(finishLoading('auth-check'));
        navigate('/loginRefine');
        return;
      }
    };

    checkAuth();
  }, [navigate, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet></Outlet>
};

export default PrivateRoute;

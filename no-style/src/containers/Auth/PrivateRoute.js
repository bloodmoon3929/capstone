import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../modules/loading';
import { usereffect } from '../../modules/login';
import {jwtDecode} from 'jwt-decode';


const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('check auth');

    const checkAuth = async () => {
      dispatch(startLoading('auth-check'));

      if (!token) {
        dispatch(finishLoading('auth-check'));
        navigate('/login');
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
          navigate('/login');
          return;
        }

      } catch (error) {
        console.error('Authentication check failed', error);
        setIsAuthenticated(false);
      } finally {
        dispatch(finishLoading('auth-check'));
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

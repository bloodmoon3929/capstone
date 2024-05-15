import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../modules/loading';
import { usereffect } from '../../modules/login';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const naviagtor = useNavigate();
  const loading = useSelector((state) => state.loading.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('check auth');

    const checkAuth = async () => {
      dispatch(startLoading('login'));

      if (!token) {
        dispatch(finishLoading('auth-check'));
        navigator('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/auth-check', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { restoken } = response.data;      
         const decodedToken = jwtDecode(restoken);
         
        if (response.status === 200) {
            dispatch(usereffect({
               email : decodedToken.email,
               uid: decodedToken.uid
            }));
        } else {
          setIsAuthenticated(false);
        }

      } catch (error) {
        console.error('Authentication check failed', error);
        setIsAuthenticated(false);
      } finally {
        dispatch(finishLoading('login'));
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet></Outlet>
};

export default PrivateRoute;

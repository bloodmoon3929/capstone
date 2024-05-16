import './App.css';
import React, { useEffect, useState } from 'react';

import LoginContainer from './containers/Auth/LoginContainer';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import NotFound from './containers/NotFound';

import WelcomeContainer from './containers/WelcomContainer';
import LayOutContainer from './containers/LayOutContainer';
import SetTimeTableContainer from './containers/setTimeTable/SetTimeTableContainer';
import LessonDetailContainer from './containers/setTimeTable/LessonDetailContainer';
import SigninContainer from './containers/Auth/SigninContainer';
import { authService } from './fbInstance';
import { useDispatch, useSelector } from 'react-redux';
import useAuthStateChanged from './modules/useAuthStateChanged';
import ArrangeMeetingContainer from './containers/arrangeMeeting/ArranageMeetingContainer';
import Sample from './Sample';
import { finishLoading, startLoading } from './modules/loading';
import axios from 'axios';
import PrivateRoute from './containers/Auth/PrivateRoute';

function App() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  
  return (
    <>
        <Routes>
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signIn' element={<SigninContainer />} />
          <Route path='/' element={<LayOutContainer />}>
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route index element={<WelcomeContainer />} />
            </Route>
            
            <Route path='/setTimeTable' element={<PrivateRoute />}>
              <Route path='/setTimeTable' element={<SetTimeTableContainer />}>
                <Route path=':index' element={<LessonDetailContainer />} />
              </Route>
            </Route>
            <Route path='/arrangeMeeting' element={<PrivateRoute />}>
              <Route index element={<ArrangeMeetingContainer />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      
    </>
  );
}

export default App;
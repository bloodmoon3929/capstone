import './App.css';
import React from 'react';

import LoginContainer from './containers/Auth/LoginContainer';
import { Route, Routes} from 'react-router';
import NotFound from './containers/NotFound';

import WelcomeContainer from './containers/WelcomContainer';
import LayOutContainer from './containers/LayOutContainer';
import SetTimeTableContainer from './containers/setTimeTable/SetTimeTableContainer';
import LessonDetailContainer from './containers/setTimeTable/LessonDetailContainer';
import SigninContainer from './containers/Auth/SigninContainer';
import ArrangeMeetingContainer from './containers/arrangeMeeting/ArranageMeetingContainer';
import PrivateRoute from './containers/Auth/PrivateRoute';
import ArrangeMeetingSchedule from './components/ArrangeMeeting/ArrangeMeetingSchedule';
import UserListContainer from './containers/arrangeMeeting/UserListContainer';

function App() {

  
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
                <Route index element={<ArrangeMeetingContainer></ArrangeMeetingContainer>}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      
    </>
  );
}

export default App;
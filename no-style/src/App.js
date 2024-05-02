import './App.css';
import LoginContainer from './containers/Auth/LoginContainer';
import { Route, Routes, useNavigate } from 'react-router';
import NotFound from './containers/NotFound';

import WelcomeContainer from './containers/WelcomContainer';
import LayOutContainer from './containers/LayOutContainer';
import SetTimeTableContainer from './containers/setTimeTable/SetTimeTableContainer';
import LessonDetailContainer from './containers/setTimeTable/LessonDetailContainer';
import SigninContainer from './containers/Auth/SigninContainer';
import { authService } from './fbInstance';
import { useDispatch } from 'react-redux';
import useAuthStateChanged from './modules/useAuthStateChanged';
import ArrangeMeetingContainer from './containers/arrangeMeeting/ArranageMeetingContainer';
import Sample from './Sample';

function App() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  useAuthStateChanged(authService, navigator, dispatch);
  
  return (
    <>
        <Routes>
          <Route path='/login' element={<LoginContainer></LoginContainer>}></Route>
          <Route path='signIn' element={<SigninContainer></SigninContainer>}></Route>
          <Route path='/' element={<LayOutContainer></LayOutContainer>}>
            <Route index element={<WelcomeContainer></WelcomeContainer>}></Route>
            <Route path='/setTimeTable' element={<SetTimeTableContainer></SetTimeTableContainer>}>
              <Route path=':index' element={<LessonDetailContainer></LessonDetailContainer>}></Route>
            </Route>
            <Route path='/arrageMeeting' element={<ArrangeMeetingContainer></ArrangeMeetingContainer>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Route>
        </Routes>
      
    </>
  );
}

export default App;
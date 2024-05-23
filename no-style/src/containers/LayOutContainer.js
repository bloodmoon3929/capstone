import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router";
import { deleteLesson, saveLesson} from '../modules/lesson'
import { useCallback } from "react";

const LayOutContainer = () => {
   const dispatch = useDispatch();
   const {lessons} = useSelector((state) => state.lessons);
   const navigator = useNavigate();
   const currentLocation = useLocation();


   const onLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigator('/loginRefine');
   }
   
   const onGoback = useCallback(() => {
      navigator(-1);
   }, []);

   const onDelete = useCallback((lesson) => {
      dispatch(deleteLesson(lesson));
   }, []);

   const onSave = useCallback(() => {
      dispatch(saveLesson());
   }, []);

   const onGoHome = useCallback(() => {
      navigator('/');
   }, [])

   const { uid: displayName } = useSelector((state) => state.login);
   

   return (
      <Layout lessons={lessons} 
      currentLocation={currentLocation.pathname.replace(/\/\d+/g, '')} 
      displayName={displayName} 
      onGoback={onGoback} 
      onLogout={onLogout}
      deleteLesson={deleteLesson}
      saveLesson={saveLesson}
      onDelete={onDelete}
      onSave={onSave}
      onGoHome={onGoHome}
      ></Layout>
   )
}

export default LayOutContainer;
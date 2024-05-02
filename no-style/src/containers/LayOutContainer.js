import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useLocation, useNavigate } from "react-router";
import { startLogout } from "../modules/login";
import {clearSelect, deleteLesson, initLesson, saveLesson} from '../modules/lesson'
import { useCallback, useEffect } from "react";
import { authService, db } from "../fbInstance";
import useAuthStateChanged from "../modules/useAuthStateChanged";
import { doc, getDoc } from "firebase/firestore";
const LayOutContainer = () => {
   const dispatch = useDispatch();
   const {lessons} = useSelector((state) => state.lessons);
   const navigate = useNavigate();
   const currentLocation = useLocation();
   const onLogout = () => {
      dispatch(startLogout());
   }
   
   const onGoback = useCallback(() => {
      navigate(-1);
   }, []);

   const onDelete = useCallback((lesson) => {
      dispatch(deleteLesson(lesson));
   }, []);

   const onSave = useCallback(() => {
      dispatch(saveLesson());
   }, []);

   const onGoHome = useCallback(() => {
      navigate('/');
   }, [])

   const { email } = useSelector((state) => state.login);
   

   return (
      <Layout lessons={lessons} 
      currentLocation={currentLocation.pathname.replace(/\/\d+/g, '')} 
      email={email} 
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
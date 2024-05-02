import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import Welcome from "../components/Welcome";
import { useDispatch } from "react-redux";
import { authService } from "../fbInstance";
import useAuthStateChanged from "../modules/useAuthStateChanged";

const WelcomeContainer = () => {
   const dispatch = useDispatch();
   const navigator = useNavigate();

   const onGotoTimeTable = useCallback(() => {
      navigator('/setTimeTable')
   }, []);

   const onGotoArrangeMeeting = useCallback(() => {
      navigator('/arrageMeeting')
   }, []);

   useAuthStateChanged(authService, navigator, dispatch);
   return (
   <Welcome onGotoTimeTable={onGotoTimeTable} onGotoArrangeMeeting={onGotoArrangeMeeting}></Welcome>
   )
}

export default WelcomeContainer;
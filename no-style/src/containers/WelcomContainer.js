import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import Welcome from "../components/Welcome";

const WelcomeContainer = () => {
   const navigator = useNavigate();

   const onGotoTimeTable = useCallback(() => {
      navigator('/setTimeTable')
   }, []);

   const onGotoArrangeMeeting = useCallback(() => {
      navigator('/arrangeMeeting')
   }, []);

   return (
   <Welcome onGotoTimeTable={onGotoTimeTable} onGotoArrangeMeeting={onGotoArrangeMeeting}></Welcome>
   )
}

export default WelcomeContainer;
import { Outlet } from "react-router";
import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

import CartList from "./setTimeTable/CartList";
import Schedule from "./Schedule";
import ArrangeMeetingSchedule from "./ArrangeMeeting/ArrangeMeetingSchedule";

const LayoutWrapper = styled.div`
   display: flex;
   justify-content: center;
`

const LayoutBlock = styled.div`
   /* border: 1px solid black; */
   background-color: white;
   width: ${props => props.size}vw;
   height: 100%;
   padding: 10px;
   margin: 0 1rem;
   border-radius: 5px;
   box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
   text-align: center;

   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;

   .nav {
      width: 94%;
      height: 10vh;
      /* border: 1px solid black; */

      display: flex;
      justify-content: space-between;
      align-items: center;

      .logout {
         font-size: 40px;
         transition: .2s;
         color: rgb(68, 112, 67);

         &:hover {
            color: rgb(49, 82, 48);
         }
      }

      .back {
         font-size: 40px;
         transition: .2s;
         color: rgb(68, 112, 67);

         &:hover {
            color: rgb(49, 82, 48);
         }
      }
      .home {
         font-size: 40px;
         transition: .2s;
         color: rgb(68, 112, 67);

         &:hover {
            color: rgb(49, 82, 48);
         }
      }
   }
`

const page = {
   welcome: 40,
   setTimetable: {
      search: 25,
      cart : 20,
      table: 40,
   },
   arrangeMeeting : {
      search: 25,
      table: 50,
   }
};

const LayoutBlockCustome = styled.div`
   /* border: 1px solid black; */
   background-color: white;
   width: ${(props) => props.size}vw;
   height: 100%;
   padding: 10px;
   margin: 0 1rem;
   border-radius: 5px;
   box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
   text-align: center;


   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;

   &.timetable {
      height: 90vh;
   }

`


const Layout = ({onGoback, onLogout, displayName, currentLocation,
   onDelete,
   lessons,
   onSave,
   onGoHome
}) => {
   let size;
   if(currentLocation === '/setTimeTable') {
      size = page['setTimetable'].search;
   } else if(currentLocation === '/') {
      size = page['welcome'];
   } else if(currentLocation === '/arrangeMeeting') {
      size = page['arrangeMeeting'].search;
   }
   
   return(
      <LayoutWrapper>
         <LayoutBlock size={size}>
            <div className="nav">
               <IoArrowBackOutline className="back" onClick={onGoback} />  
               <IoHomeOutline className="home" onClick={onGoHome} />
               <RiLogoutBoxRLine className="logout" onClick={onLogout}/>
            </div>
            <p style={
               {
                  margin: 0,
                  padding: 0,
               }
            }>{displayName}</p>
            <Outlet></Outlet>
         </LayoutBlock>
         <>
            {
               currentLocation === '/setTimeTable' ? 
               <>
                  <LayoutBlockCustome size={page['setTimetable'].cart}>
                     <CartList
               onDelete={onDelete}
               lessons={lessons}
               onSave={onSave}></CartList>
                  </LayoutBlockCustome>
                  
                  <LayoutBlockCustome className="timetable" size={page['setTimetable'].table}>
                     <Schedule></Schedule>
                  </LayoutBlockCustome>
               </>
               
               : null
            }
         </>

         {
            currentLocation === '/arrangeMeeting' ? (
               <>
                  <LayoutBlockCustome className="timetable" size={page['arrangeMeeting'].table}>
                     <ArrangeMeetingSchedule></ArrangeMeetingSchedule>
                  </LayoutBlockCustome>
               </> 
            ) : null

         }
         
         
      </LayoutWrapper>
      
   )
}

export default Layout;
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
`

const LayoutBlock = styled.div`
   /* border: 1px solid black; */
   background-color: white;
   width: 30vw;
   height: 100%;
   padding: 10px;
   margin: 0 auto;
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

const LayoutBlock2 = styled.div`
   /* border: 1px solid black; */
   background-color: white;
   width: 30vw;
   height: 100%;
   padding: 10px;
   margin: 0 auto;
   border-radius: 5px;
   box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
   text-align: center;


   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;

   &.timetable {
      height: 80vh;
   }

`

const Layout = ({onGoback, onLogout, email, currentLocation,
   onDelete,
   lessons,
   onSave,
   onGoHome
}) => {
   
   return(
      <LayoutWrapper>
         <LayoutBlock>
            <div className="nav">
               <IoArrowBackOutline className="back" onClick={onGoback} />  
               <IoHomeOutline className="home" onClick={onGoHome} />
               <RiLogoutBoxRLine className="logout" onClick={onLogout}/>
            </div>
            <h3 style={
               {
                  margin: 0,
                  padding: 0
               }
            }>{email}</h3>
            <Outlet></Outlet>
         </LayoutBlock>
         <>
            {
               currentLocation === '/setTimeTable' ? 
               <>
                  <LayoutBlock2>
                     <CartList
               onDelete={onDelete}
               lessons={lessons}
               onSave={onSave}></CartList>
                  </LayoutBlock2>
                  
                  <LayoutBlock2 className="timetable">
                     <Schedule></Schedule>
                  </LayoutBlock2>
               </>
               
               : null
            }
         </>

         {
            currentLocation === '/arrageMeeting' ? (
               <>
                  <LayoutBlock2 className="timetable">
                     <ArrangeMeetingSchedule></ArrangeMeetingSchedule>
                  </LayoutBlock2>
               </> 
            ) : null

         }
         
         
      </LayoutWrapper>
      
   )
}

export default Layout;
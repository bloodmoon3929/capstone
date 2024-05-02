import styled from "styled-components"
import { MdCancelPresentation } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";

const CartListBlock = styled.div`
   /* border: 1px solid black; */
   width: 100%;

   .save {
      font-size: 40px;
      transition: .2s;
      color: rgb(68, 112, 67);

      &:hover {
         color: rgb(49, 82, 48);
      }
   }
`;

const CartListItemBlock = styled.div`
   display: flex;
   width: 100%;
   
   justify-content: space-around;
   align-items: center;
   /* border: 1px solid black; */

   .delete {
      font-size: 40px;
      transition: .2s;
      color: rgb(68, 112, 67);

      &:hover {
         color: rgb(49, 82, 48);
      }
   }

   h2, p {
      /* border: 1px solid black; */
      width: 160px;
   }

   
`

const CartListItem = ({data, onDelete}) => {
   return (
      <CartListItemBlock>
         <MdCancelPresentation className="delete" onClick={() => onDelete(data)} />
         <h2>{data.subject}</h2>
         <p>{data.professor}</p>
         <p>{data.number}</p>
      </CartListItemBlock>
   )
}

const CartList = ({onSave, lessons, onDelete}) => {
   return (
      <CartListBlock>
            {  lessons ? 
               (lessons.map(e => (<CartListItem data={e} onDelete={onDelete} key={e.index}></CartListItem>)))
               : null
            }
            <MdSaveAlt className="save" onClick={onSave} />
      </CartListBlock>
   )
}

export default CartList;
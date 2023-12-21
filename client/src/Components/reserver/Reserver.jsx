import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import './reserver.css';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Reserver = ({setOpen , hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const {dates} = useContext(SearchContext);
   
    const getDatesInRange = (startDate, endDate) => {

      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());

      let list = [];

      while(date <= end){
        list.push(new Date(date).getTime())
        date.setDate(date.getDate() + 1)
      }

      return list;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNum) =>{
        const isFound = roomNum.unavailableDates.some((date)=>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) =>{
      const checked = e.target.checked;
      const value = e.target.value;
      setSelectedRooms(
        checked ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
      );
    };

    const navigate = useNavigate();


   const handleClick = async() =>{
     try{
      await Promise.all(
        selectedRooms.map((roomId)=>{
        const res = axios.put(`/rooms/availability/${roomId}` , {dates: alldates});
        return res.data;
      }));
      setOpen(false);
      navigate("/");

     }catch(err){
     }
  };

  return (
    <div className='reserver'>
        <div className='rContainer'>
            <FontAwesomeIcon 
            icon={faCircleXmark}
            className='rClose'
            onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data.map((item)=>(
               <div className="rItem" key={item._id}>
               <div className="rItemInfo">
                 <div className="rTitle">{item.title}</div>
                 <div className="rDesc">{item.desc}</div>
                 <div className="rMax">
                   Max people: <b>{item.maxPeople}</b>
                 </div>
                 <div className="rPrice">{item.price}</div>
               </div>
               <div className="rSelectRooms">
                 {item.roomNumber.map((roomNum) => (
                   <div className="room">
                     <label>{roomNum.number}</label>
                     <input
                       type="checkbox"
                       value={roomNum._id}
                       onChange={handleSelect}
                       disabled={!isAvailable(roomNum)}
                     />
                   </div>
                 ))}
               </div>
             </div>
            ))}
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    </div>
  )
}



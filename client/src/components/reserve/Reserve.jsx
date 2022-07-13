import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reserve.css'
import axios from 'axios'
const Reserve = ({setOpen, hotelId}) => {

  const {data} = useFetch(`/hotels/rooms/${hotelId}`)

  const {dates} = useContext(SearchContext)

  const [selectedRooms, setSelectedRooms] = useState([])

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, value]: selectedRooms.filter(item => item !== value))
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const navigate = useNavigate()


  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  }
  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />

        <span>Select your rooms:</span>
        {data.map((room, i) => (
          <div className="rItem" key={i}>
            <div className="rItemInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.desc}</div>
              <div className="rMax">Max People: <b>{room.maxPeople}</b></div>
              <div className="rPrice">{room.price}</div>
            </div>
              {room.roomNumbers.map((roomNumber, i) => (
                <div className="room" key={i}>
                  <label htmlFor="">{roomNumber.number}</label>
                  <input type='checkbox' value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}/>
                </div>
              ))}
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve
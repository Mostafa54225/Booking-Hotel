import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import './hotels.css'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from'../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
const Hotels = () => {

  const location = useLocation()

  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDate] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const [openDate, setOpenDate] = useState(false)


  const handleSearch = () => {
    reFetch()
  }

  const { data, loading, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className='hotelTitle'>Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange 
                onChange={item => setDate([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />   }        
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Min Price <small>per night</small></span>
                  <input type="number" onChange={e => setMin(e.target.value)} className='lsOptionInput'/>
                </div>
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Max Price <small>per night</small></span>
                  <input type="number" onChange={e => setMax(e.target.value)} className='lsOptionInput'/>
                </div>
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Adult</span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.adult}/>
                </div>
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Children</span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={options.children}/>
                </div>
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Room</span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.room}/>
                </div>
              </div>
              
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? <div>Loading...</div>: <>
                {data.map(item => <SearchItem key={item._id} item={item} />)}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels
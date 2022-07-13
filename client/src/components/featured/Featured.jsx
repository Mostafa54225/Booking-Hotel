import React from 'react'
import useFetch from '../../hooks/useFetch'
import './featured.css'
const Featured = () => {

  const { data, loading, error} = useFetch("/hotels/countByCity?cities=Egypt,berlin,madrid") 

  return (
    <div className='featured'>
      {loading ? "Loading..." : <><div className="featuredItem">
        <img src="https://media.radissonhotels.net/image/metropolitan-hotel-sofia-a-member-of-radisson-individuals/exteriorview/16256-145921-f72742573_3xl.jpg?impolicy=Card&gravity=North" alt="" className='featuredImg' />
        <div className="featuredTitles">
          <h1>Egypt</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg" alt="" className='featuredImg' />
        <div className="featuredTitles">
          <h1>berlin</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="https://media.radissonhotels.net/image/metropolitan-hotel-sofia-a-member-of-radisson-individuals/exteriorview/16256-145921-f72742573_3xl.jpg?impolicy=Card&gravity=North" alt="" className='featuredImg' />
        <div className="featuredTitles">
          <h1>madrid</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>}
    </div>
  )
}

export default Featured
import React from 'react'
import './propertyList.css'

const PropertyList = () => {
  return (
    <div className='pList'>
        <div className="pListItem">
            <img src="https://www.princehotels.com/wp-content/uploads/2019/04/aboutslider2-1.jpg" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Hotels</h1>
                <h2>233 hotels</h2>
            </div>
        </div>
        <div className="pListItem">
            <img src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/68/11/6811894_v3.jpeg" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Appartments</h1>
                <h2>213 appartments</h2>
            </div>
        </div>
        <div className="pListItem">
            <img src="https://worldtouristspots.com/wp-content/uploads/2022/03/Resorts.jpg" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Resorts</h1>
                <h2>31 resorts</h2>
            </div>
        </div>
        <div className="pListItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/306027131.jpg?k=9bb7b6bfeab68dafed1919b814c007658b002eb2c94d65b59cc15bec83e04bfe&o=&hp=1" alt="" className="pListImg" />
            <div className="pListTitles">
                <h1>Villas</h1>
                <h2>12 villas</h2>
            </div>
        </div>
    </div>
  )
}

export default PropertyList
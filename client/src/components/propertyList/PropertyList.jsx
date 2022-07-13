import React from 'react'
import useFetch from '../../hooks/useFetch'
import './propertyList.css'

const PropertyList = () => {

    const { data, loading, error } = useFetch("/hotels/countByType")
    const images = [
        "https://www.princehotels.com/wp-content/uploads/2019/04/aboutslider2-1.jpg",
        "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/68/11/6811894_v3.jpeg",
        "https://worldtouristspots.com/wp-content/uploads/2022/03/Resorts.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/306027131.jpg?k=9bb7b6bfeab68dafed1919b814c007658b002eb2c94d65b59cc15bec83e04bfe&o=&hp=1",
        "https://media.istockphoto.com/photos/photo-of-a-rustic-house-on-the-woods-picture-id135565559?k=20&m=135565559&s=612x612&w=0&h=rBpgKGaPehNMmxInNMOXoHreSDtEoV5RNzlkxKeyX1c="
    ]

  return (
    <div className='pList'>
        {loading ? ("Loading...") :( <>
            {data && images.map((img, i) => (
                
                <div key={i} className="pListItem">
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
            </div>
            ))}
        </>)}
    </div>
  )
}

export default PropertyList
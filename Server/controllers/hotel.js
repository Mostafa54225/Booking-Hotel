import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        next()
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res) => {
    const { min, max, ...others } = req.query
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gte: min || 1, $lte: max || 9999}}).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const CountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")   // string of cities we need to transform this string into array

    try {
        const list = await Promise.all(cities.map(city => Hotel.countDocuments({city: city})))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const CountByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const appartmentCount = await Hotel.countDocuments({type: "appartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
    
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: appartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount}
        ])
    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const rooms = await Promise.all(hotel.rooms.map(room => Room.findById(room)))
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}
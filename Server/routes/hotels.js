import express from 'express'
import { CountByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel, CountByType, getHotelRooms } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js'


const router = express.Router()


// CREATE
router.post("/", verifyAdmin, createHotel)

// UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

// GET

router.get("/find/:id", getHotel)

// GET ALL
router.get("/", getHotels)

router.get("/countByCity", CountByCity)
router.get("/countByType", CountByType)
router.get('/rooms/:id', getHotelRooms)

export default router
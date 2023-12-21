import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/errors.js";

export const createRoom = async(req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId , {
                $push: {rooms: savedRoom._id},
            })
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoom = async(req,res ,next)=>{
   
    try{
        const updatedRoom = await Hotel.findByIdAndUpdate(req.params.id , { $set: req.body},{ new: true}) ;
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoomAvailability = async(req,res ,next)=>{
   console.log("this is inside update room");
    try{
        await Room.updateOne(
            {"roomNumber._id": req.params.id} , 
            {
                $push: {
                    "roomNumber.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room Status has been updated");
        console.log(req.body.dates);
    }catch(err){
        next(err);
    }
};

export const deleteRoom = async(req,res,next) =>{
    const hotelId = req.params.hotelid;
  
    try{
        await Room.findByIdAndDelete(req.params.id) ;
        try{
            await Hotel.findByIdAndUpdate(hotelId , {
                $pull: {roomms: req.params.id},
            })
        }catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted");
    }catch(err){
        // throw err;
        next(err);
    }
}

export const getRoom = async(req,res,next) =>{
    try{
        const room = await Room.findById(req.params.id) ;
        res.status(200).json(room);
    }catch(err){
        // throw err;
        next(err);
    }
};

export const getRooms = async(req,res , next)=>{

    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        // throw err;
        next(err);
    }
};

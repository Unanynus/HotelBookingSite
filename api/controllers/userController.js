import User from "../models/User.js";


export const updateUser = async(req,res ,next)=>{
   
    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id , { $set: req.body},{ new: true}) ;
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

export const deleteUser = async(req,res)=>{
  
  
    try{
        await User.findByIdAndDelete(req.params.id) ;
        res.status(200).json("user has been deleted");
    }catch(err){
        // throw err;
        next(err);
    }
}

export const getUser = async(req,res)=>{
  
    try{
        const user = await User.findById(req.params.id) ;
        res.status(200).json(user);
    }catch(err){
        // throw err;
        next(err);
    }
};

export const getUsers = async(req,res , next)=>{
   console.log('inside get users');
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        // throw err;
        next(err);
    }
};
import entertainmentModel from "../model/entertainmentModel.js";
import mongoose from "mongoose";


export const AddMovie = async(req,res)=>{

    try{
           const reqBody = req.body;
         const user_id= req.headers.user_id;
           reqBody.user_id = user_id;
          const data =  await entertainmentModel.create(reqBody);
           return res.json({status:"success",message:data})
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }
}




export const deleteMovie = async (req,res)=>{
    try{
        const reqBody = req.body;
        const user_id = req.headers.user_id;
        await entertainmentModel.deleteOne({_id:reqBody.id,user_id:user_id})
        return res.json({status:"success",message:"Movie delete successfully"})
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }
}




export  const viewMovieByNo_watch = async (req,res)=>{
    try{
        const user_id= req.headers.user_id;
        const data = await entertainmentModel.find({
            user_id: new mongoose.Types.ObjectId(user_id),
            status: "no_watch",
        });

        return res.json({ status: "success", data });
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }

}



export  const viewMovieByWatch = async (req,res)=>{
    try{
        const user_id= req.headers.user_id;
        const data = await entertainmentModel.find({
            user_id: new mongoose.Types.ObjectId(user_id),
            status: "watched",
        });

        return res.json({ status: "success", data });
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }

}



export const updateStatus = async (req,res)=>{
   try{
       const id = req.body.id;
       await entertainmentModel.updateOne(
           {_id:id},
           {$set:{status:"watched"}},
       )
       return res.json({status:"success",message:"Movie updated successfully"})
   }catch (e) {
       return res.json({status:"error",message:e.toString()})
   }
}
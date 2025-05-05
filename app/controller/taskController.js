import taskModel from "../model/taskModel.js";

export const CreateTask=async(req,res)=>{

   try{
       const reqBody = req.body;
       const user_id= req.headers.user_id;
       reqBody.user_id=user_id;
       await taskModel.create(reqBody)
       return res.json({"status":"success", message:"Task Created successfully"})
   }catch (e) {
       return res.json({status:"error",message:e.toString()})
   }

}


export const ShowTask=async(req,res)=>{
   try{
       const user_id = req.headers.user_id;
       const data = await taskModel.find({"user_id": user_id});
       return res.json({"status":"success",message:data})
   } catch (e) {
       return res.json({status:"error",message:e.toString()})
   }



}

export const DeleteTask=async(req,res)=>{
    try{

         const reqBody = req.body;
         await taskModel.deleteOne({"_id":reqBody.id})
        return res.json({status:"success",message:"Task delete successfully"})
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }
}


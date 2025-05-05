import noteModel from "../model/noteModel.js";

export const CreateNote=async(req,res)=>{

    try{
        const reqBody = req.body;
        const user_id= req.headers.user_id;
        reqBody.user_id=user_id;
        await noteModel.create(reqBody)
        return res.json({"status":"success", message:"Note Created successfully"})
    }catch (e) {
        return res.json({status:"error",message:e.toString()})
    }

}



export const ShowNote=async(req,res)=>{
    try{
        const user_id = req.headers.user_id;
        const data = await noteModel.find({"user_id": user_id});
        return res.json({"status":"success",message:data})
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }


}


export const DeleteNote=async(req,res)=>{
    try{

        const reqBody = req.body;
        await noteModel.deleteOne({"_id":reqBody.id})
        return res.json({status:"success",message:"Note delete successfully"})
    } catch (e) {
        return res.json({status:"error",message:e.toString()})
    }
}
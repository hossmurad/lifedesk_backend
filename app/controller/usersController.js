import UsersModel from "../model/UsersModel.js";
import {tokenEncode} from "../utility/tokenUtility.js";
import bcrypt from 'bcrypt'
import SendEmail from "../utility/emailUtility.js";

export const Registration = async (req, res)=>{

    try{
        let reqBody = req.body;
        //hash password
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(reqBody.password, saltRounds);
        //replace it murad
        reqBody.password = hashedPassword;

        await UsersModel.create(reqBody)
        return res.json({status: "success","message":"message send successfully"})
    }catch (e) {
        return res.json({status: "fail"})
    }


}




export const Login = async (req, res)=>{

    try{
        const reqBody = req.body;
        const data = await UsersModel.findOne({ email: reqBody.email })
        if(!data){
            return res.json({status: "fail",message:"email not found"})
        }
    //hashedPassword compair
        const isMatch = await bcrypt.compare(reqBody.password, data.password);
        if(!isMatch){
            return res.json({status: "no User","message":" wrong password"})
        }
        else{

            const token =await tokenEncode(data.email, data._id)
            return res.json({status:"success","Message":"User login successfully",data:{token:token}})
  }
 }catch (e) {
        return res.json({status: "fail", message:e.toString()})
    }

}






export const ProfileDetails = async (req, res)=> {
    try{
        const user_id = req.headers.user_id;
        const data = await UsersModel.findOne({_id:user_id});
        if(!data){
            return res.json({status: "fail",message:"user data not found"})
        } else {
            return res.json({status:"success",data:data})
        }
    }catch (e) {
         return res.json({status: "fail",message:e.toString()})
    }
}






export const EmailVerify = async (req, res) => {
    try{
        let email = req.body.email;
        let data = await  UsersModel.findOne({email:email})
        if (data==null){
            return res.json({status:"fail","Message":"User does not exist"})
        } else {


            let code = Math.floor(100000+ Math.random()*900000)
            let EmailTo = data['email'];
            let EmailText = "Your LifeDesk code is "+ code+ " \n LifeDesk is a smart personal assistant web application developed to integrate and simplify the daily lives "
            let EmailSubject = "LifeDesk  Verification code"

            await  SendEmail(EmailTo, EmailText, EmailSubject)
            await UsersModel.updateOne({email:email},{otp:code})
            return res.json({status:"success","Message":"Email verified successfully,check your email"})
        }
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}







export const CodeVerify = async (req, res)=>{
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody.email,otp:reqBody.otp})
        if(!data){
            return res.json({status:"fail","Message":false})
        }
        else {
            return res.json({status:"success","Message":true})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}






export const ResetPassword = async (req, res)=>{
    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody.email,otp:reqBody.otp})
        if(!data){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {
           //new password hashing
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(reqBody.password, saltRounds);
            //replace password
            reqBody.password = hashedPassword;

            await UsersModel.updateOne({email: reqBody.email},{
                otp:reqBody.otp, password:reqBody.password,
            })
            return res.json({status:"success",Message:"Password Reset successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}


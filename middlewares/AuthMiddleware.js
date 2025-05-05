import {tokenDecode} from "../app/utility/tokenUtility.js";


export default (req,res,next)=>{

 const token = req.headers['token']
    const decoded = tokenDecode(token)
    if(!decoded){
        return res.status(401).json({message:"Unauthorized"})
    } else{
        const email = decoded.email
        const user_id = decoded.user_id

        req.headers.email = email
        req.headers.user_id = user_id
        next()
    }


    
}
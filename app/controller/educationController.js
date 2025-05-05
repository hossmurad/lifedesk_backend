import educationModel from "../model/educationModel.js";





export const viewPDF = async (req, res) => {

    try{
        const user_id = req.headers.user_id;
        const data = await  educationModel.find({user_id:user_id})
        return res.json({status: "success",data:data});
    } catch (e) {
        return res.json({status: "error",data:e.toString()});

    }

}


export const downloadPDF = async (req, res) => {

    try{
        const id = req.body.id;
        const data = await  educationModel.findOne({_id:id})
        return res.json({status: "success",data:data.file});
    } catch (e) {
        return res.json({status: "error",data:e.toString()});

    }

}



export const addPDF = async (req, res) => {

        try {
            const reqBody = req.body;
            const user_id = req.headers.user_id;
            reqBody.user_id = user_id;
            const data = await educationModel.create(reqBody);
            return res.json({ status: 'success', data: data });
        } catch (e) {
            return res.json({ status: 'error', data: e.toString() });
        }
    }

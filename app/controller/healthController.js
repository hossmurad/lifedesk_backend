import healthModel from "../model/healthModel.js";

export  const viewArticles = async (req, res) => {
    try{
        const data = await healthModel.find({})
        return res.json({status: "success",data:data});
    }catch (e) {
        return res.json({status: "error", data: e.toString()});
    }
}





export const viewArticle = async(req, res) => {
    try{
        const id = req.body.id
        const data = await healthModel.findOne({_id:id})
        return res.json({status: "success",data:data});
    }catch (e) {
        return res.json({status: "error", data: e.toString()});
    }
}





export const BMI = async (req, res) => {
    try {
        const { height, weight } = req.body;

        if (!height || !weight) {
            return res.status(400).json({
                status: "error",
                data: "Height (in feet) and weight (in kg) are required"
            });
        }


        const heightInMeters = height * 0.3048;

        const bmi = weight / (heightInMeters * heightInMeters);
        let category = "";

        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi < 24.9) {
            category = "Normal weight";
        } else if (bmi < 29.9) {
            category = "Overweight";
        } else {
            category = "Obese";
        }

        return res.json({
            status: "success",
            data: {
                bmi: bmi.toFixed(2),
                category
            }
        });
    } catch (e) {
        return res.status(500).json({
            status: "error",
            data: e.toString()
        });
    }
};

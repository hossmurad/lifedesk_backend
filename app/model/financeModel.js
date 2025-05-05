import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema(
    {
        balance: { type: Number, default: 0 },
        user_id :{type: mongoose.Schema.Types.ObjectId, required: true},
        expenditures: [
            {
                title: { type: String, required: true },
                amount: { type: Number, required: true },
                category: { type: String, default: null },
                date: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true, versionKey: false }
);

const Finance = mongoose.model('finances', financeSchema);
export default Finance;

import Finance from '../model/financeModel.js';

// Add Balance
export const addBalance = async (req, res) => {
    try {
        const { amount } = req.body;
        const user_id = req.headers.user_id;

        if (!user_id) {
            return res.status(400).json({ status: 'error', data: 'Missing user_id in headers' });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ status: 'error', data: 'Invalid amount' });
        }

        let finance = await Finance.findOne({ user_id });
        if (!finance) {
            finance = new Finance({ user_id, balance: 0, expenditures: [] });
        }

        finance.balance += amount;
        await finance.save();

        return res.json({ status: 'success', data: finance });
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.toString() });
    }
};

// Add Expenditure
export const addExpenditure = async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const user_id = req.headers.user_id;

        if (!user_id) {
            return res.status(400).json({ status: 'error', data: 'Missing user_id in headers' });
        }

        if (!title || !amount ) {
            return res.status(400).json({ status: 'error', data: 'Title, amount, and category are required' });
        }

        const finance = await Finance.findOne({ user_id });
        if (!finance) {
            return res.status(404).json({ status: 'error', data: 'Finance record not found for user' });
        }

        finance.expenditures.push({ title, amount, category });
        finance.balance -= amount;

        await finance.save();

        return res.json({ status: 'success', data: finance });
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.toString() });
    }
};

// Get Current Balance
export const getBalance = async (req, res) => {
    try {
        const user_id = req.headers.user_id;

        if (!user_id) {
            return res.status(400).json({ status: 'error', data: 'Missing user_id in headers' });
        }

        const finance = await Finance.findOne({ user_id });
        if (!finance) {
            return res.status(404).json({ status: 'error', data: 'Finance record not found for user' });
        }

        return res.json({ status: 'success', data: { balance: finance.balance } });
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.toString() });
    }
};

// Get All Expenditures
export const getExpenditures = async (req, res) => {
    try {
        const user_id = req.headers.user_id;

        if (!user_id) {
            return res.status(400).json({ status: 'error', data: 'Missing user_id in headers' });
        }

        const finance = await Finance.findOne({ user_id });
        if (!finance) {
            return res.status(404).json({ status: 'error', data: 'Finance record not found for user' });
        }

        return res.json({ status: 'success', data: finance.expenditures });
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.toString() });
    }
};

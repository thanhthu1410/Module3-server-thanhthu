import receiptModel from '../models/receipt.model';
export default {
    findReceipt: async function (req, res) {
        try {
            let modelRes = await receiptModel.findReceipt(Number(req.params.user_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            console.log("🚀 ~ file: receipt.controller.js:8 ~ err:", err)
            return res.status(500).json({
                message: "Lỗi controller!"
            })
        }
    }
}
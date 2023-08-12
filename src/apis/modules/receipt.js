import express from 'express'
const router = express.Router()

import receiptController from '../../controllers/receipt.controller';


router.get('/:user_id', receiptController.findReceipt)

export default router;
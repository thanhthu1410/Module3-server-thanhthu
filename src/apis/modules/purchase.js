import express from 'express'
import purchaseController from '../../controllers/purchase.controller';
import authencation from "../../middlewares/authencation"
const router = express.Router()

// ,authencation.checkToken
router.post('/order', purchaseController.createReceipt)
router.post('/zalo-create', purchaseController.zaloCreate)
router.get('/zalo-confirm/:tradeId', purchaseController.zaloCheck)

router.post('/:user_id',authencation.checkToken,purchaseController.addToCart);
router.get('/:user_id',authencation.checkToken,purchaseController.findCart);
router.delete('/:product_id', purchaseController.deleteProduct);
router.patch('/:user_id', purchaseController.updateCart);
export default router;
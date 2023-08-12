/* Create Express Router */
import express from 'express'
const router = express.Router()

import userModule from './modules/user';
router.use('/users', userModule);
import productModel from './modules/product';
router.use('/products', productModel);
import categoryModel from './modules/category';
router.use('/category', categoryModel);
// router.use('/categories', categoryModel);
import purchaseModel from './modules/purchase';
router.use('/purchase', purchaseModel);

import receiptModule from './modules/receipt';
router.use('/receipts', receiptModule);

export default router;
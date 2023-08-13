import express from 'express'
import productController from '../../controllers/product.controller';
const router = express.Router()

import multer from "multer";

const imgProductStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, `product_${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
  }
})

const productUpload = multer({ storage: imgProductStorage })
router.get('/:id', productController.readProductById);
router.get("/",productController.findAll)
router.post("/",productUpload.array('imgs'),productController.create)
router.patch("/:productId",productUpload.single("avatar"),productController.update)


export default router;
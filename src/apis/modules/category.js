import express from 'express'
import categoryController from '../../controllers/category.controller';
const router = express.Router()
// router.get('/categories/:id', categoryController.readCategoryById);
router.get('/:categoryid', categoryController.readMany);
router.get('/', categoryController.findAllCategories);
router.post('/', categoryController.create);


export default router;
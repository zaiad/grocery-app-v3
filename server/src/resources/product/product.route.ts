import { Router } from 'express';
import { ProductController } from './product.controller';
import validateBody from './product.validation';

const router = Router();
const productController = new ProductController();

router.get('/product', productController.getAllProducts);
router.post('/product/add', validateBody, productController.addProduct);
router.delete('/product/:id', productController.deleteProduct);
router.patch('/product/:id', productController.updateProduct);


export default router;

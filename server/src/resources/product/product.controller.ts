import { ProductInterface } from './../../utils/interface/product.interface';
import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';

export class ProductController {
    private productService = new ProductService();

    public getAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const products = await this.productService.getAllProducts(next);
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    public addProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title, price, image } = req.body;

            const product = await this.productService.addProduct(
                title,
                price,
                image,
                next
            );
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const product = await this.productService.deleteProduct(id, next);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };


    public updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id = req.params.id;
            const updatedProduct: ProductInterface = req.body;
            const product = await this.productService.updateProduct(id, updatedProduct, next);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };
}

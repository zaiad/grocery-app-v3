import { ProductInterface } from './../../utils/interface/product.interface';
import { NextFunction } from 'express';
import ProductModel from './product.model';

export class ProductService {
    private Product = ProductModel;



    public async getAllProducts(next: NextFunction) {
        try {
            const products = await this.Product.find({});
            return products;
        } catch (error) {
            next(error)
        }
    }

    public async addProduct(title: string, price: number, image: string, next: NextFunction) {
        try {
            const product = new this.Product({ title, price, image });
            await product.save();
            return product;
        } catch (error) {
            next(error)
        }
    }

    public async deleteProduct(id: string, next: NextFunction) {
        try {
            const product = await this.Product.findByIdAndDelete(id);
            return product;
        } catch (error) {
            next(error)
        }
    }

    public async updateProduct(id: string, updatedProduct: ProductInterface, next: NextFunction) {
        try {
            const product = await this.Product.findByIdAndUpdate(id, updatedProduct, { new: true });
            return product;
        } catch (error) {
            next(error)
        }
    }
}

import { Document } from 'mongoose';


export interface ProductInterface extends Document {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
}
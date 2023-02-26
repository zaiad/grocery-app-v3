import { Document } from 'mongoose';


export interface ProductInterface extends Document {
    id: string;
    title: string;
    price: number;
    image: string;
}
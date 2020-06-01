import {Users } from './users'

export interface Shoes {
    ShoeId: number;
    BothShoes: boolean;
    Manufacter: string;
    Model: string;
    Color: string;
    RightSize?: number;
    leftSize?: number;
    UserId: number;
}
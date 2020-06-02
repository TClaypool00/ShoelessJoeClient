export interface Shoes {
    shoeId: number;
    bothShoes: boolean;
    manufacter: string;
    model: string;
    color: string;
    rightSize?: number;
    leftSize?: number;
    isSold: boolean;

    userId: number;
}
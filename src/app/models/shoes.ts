export interface Shoes {
    ShoeId: number;
    BothShoes: boolean;
    Manufacter: string;
    Model: string;
    Color: string;
    RightSize?: number;
    leftSize?: number;
    isSold: boolean;

    UserId: number;
}
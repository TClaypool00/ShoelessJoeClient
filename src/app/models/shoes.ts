export interface Shoes {
    shoeId?: number;
    bothShoes: boolean;
    manufacter: string;
    model: string;
    color: string;
    rightSize?: number;
    leftSize?: number;
    description:string;
    isSold: boolean;
    gender:boolean;

    userId: number;
    userFirstName: string;
    userLastName: string;
}
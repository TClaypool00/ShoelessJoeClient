export interface Comments {
    commentId?: number;
    messageHead:string;
    messageBody:string;
    commentDate:Date;

    userId:number;
    userFirstName:string;
    userLastName:string;

    shoeId:number;
    shoeManufacter:string;
    shoeModel:string;
    rightSize:number;
    leftSize:number;
    shoeUserId:number;
    shoeFirstName:string;
    shoeLastName:string;
}
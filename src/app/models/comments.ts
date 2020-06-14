export interface Comments {
    CommentId: number;
    MessageHead:string;
    MessageBody:string;
    CommentDate:Date;

    userId:number;
    userFistName:string;
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
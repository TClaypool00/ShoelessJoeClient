export interface Comments {
    commentId?: number;
    messageHead:string;
    messageBody:string;
    commentDate:Date;

    userId:number;
    userFirstName:string;
    userLastName:string;

    shoeId:number;
    shoeUserId:number;
}
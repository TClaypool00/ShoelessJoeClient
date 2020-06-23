export interface Reply {
    replyId?:number;
    replyBody:string;
    replyDate:Date;

    commentId:number;
    commentHead:string;

    replyUserId:number
    replyUserFirstName:string;
    replyUserLastName:string;
}
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuidv4} from "uuid";



@Schema({timestamps:true})
export class Transactions{
    @Prop({
        required:true,
        unique:true,
        default:uuidv4
    })
    id:string;

    @Prop({
        required:true
    })
    userId:string;

    @Prop({
        required:true
    })
    accountId:string;

    @Prop({
        required:true
    })
    payeeId:string;

    @Prop({
        required:true,
        enum:["debit","credit"]
    })
    type:string;


    @Prop({
        required:true,

    })
    amount:number;

    @Prop({
        required:true,
    })
     balanceAfter:number;


    @Prop({
        required:true
    })
     description:string;


     @Prop({
        required:true,
     })
     category:string;

     @Prop({
        required:true
     })
     referenceNumber:string;
}

export const TransactionsSchema=SchemaFactory.createForClass(Transactions)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Account {
    @Prop({
        unique: true,
        required: true,
        default: uuidv4,
    })
    id: string;

    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        enum: ['Savings', 'Current'],
        required: true,
    })
    type: string;

    @Prop({
        required: true,
        unique: true,
        select: false,
    })
    accountNumber: string;

    @Prop({
        required: true,
        unique: true,
    })
    maskedNumber: string;

    @Prop({
        required: true,
        min: 0,
        default: 0,
    })
    balance: number;

    @Prop({
        default: 'INR',
        required: true,
    })
    currency: string;

    @Prop({
        required: true,
        min: 0,
    })
    dailyLimit: number;

    @Prop({
        type: Boolean,
        default: false,
    })
    isFrozen: boolean;

    @Prop({required:true})
    createdById:string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from "uuid"
import { HydratedDocument } from 'mongoose';

export type PayeeDocument = HydratedDocument<Payees>;

@Schema({ timestamps: true })
export class Payees {
    @Prop({
        required: true,
        default: uuidv4,
        unique: true,
    })
    id: string;

    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: true,
        trim: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    accountNumber: string;

    @Prop({
        required: true,
        uppercase: true,
        trim: true,
    })
    ifsc: string;

    @Prop({
        type: String,
        trim: true,
        default: '',
    })
    nickname: string;

    @Prop({
        type: Boolean,
        default: false,
    })
    isVerified: boolean;
}

export const PayeesSchema = SchemaFactory.createForClass(Payees);

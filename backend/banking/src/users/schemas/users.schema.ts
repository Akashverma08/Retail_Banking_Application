import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";


@Schema({ timestamps: true })
export class Users {
    @Prop({
        required: true,
        unique: true,
        default: uuidv4
    })
    id: string;

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({
        required: true,
        enum: ["Customer", "Admin"]
    })
    role: string;

    @Prop({
        default:false
    })
    isLocked: boolean;

    @Prop({ required: true })
    userId: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
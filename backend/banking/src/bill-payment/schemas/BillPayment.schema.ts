
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";

@Schema({ timestamps: true })
export class BillPayment {
  @Prop({
    required: true,
    unique: true,
    default: uuidv4,
  })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  billerCode: string;

  @Prop({ required: true })
  consumerNumber: string;

  @Prop({
    required: true,
    min: 1,
  })
  amount: number;

  @Prop({
    required: true,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  })
  status: string;

  @Prop({
    required: true,
    unique: true,
    default: uuidv4,
  })
  refNumber: string;
}

export const BillsSchema =SchemaFactory.createForClass(BillPayment);

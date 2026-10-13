
import * as Yup from "yup";

export const billValidationSchema = Yup.object({
  accountNumber: Yup.string()
    .required("Account number is required"),

  billerCode: Yup.string()
    .required("Please select a biller"),

  consumerNumber: Yup.string()
    .required("Consumer number is required"),

  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),
});

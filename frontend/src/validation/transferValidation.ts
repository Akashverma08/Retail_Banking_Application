
import * as Yup from "yup";

export const transferValidationSchema = Yup.object({
  accountNumber: Yup.string()
    .required("Please enter your account number"),

  payeeId: Yup.string()
    .required("Please select a verified payee"),

  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),

  description: Yup.string().max(
    200,
    "Description cannot exceed 200 characters"
  ),

  category: Yup.string().required("Please select a category"),
});

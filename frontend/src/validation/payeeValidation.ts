import * as Yup from "yup";

export const payeeValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Payee name is required"),

  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^\d{9,18}$/, "Enter a valid account number"),

  ifsc: Yup.string()
    .trim()
    .uppercase()
    .required("IFSC code is required")
    .matches(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      "Enter a valid 11-character IFSC code"
    ),

  nickname: Yup.string()
    .trim()
    .required("Nickname is required"),
});
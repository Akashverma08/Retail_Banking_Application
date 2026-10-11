import* as Yup from "yup";
export const accountFormSchema = Yup.object({
    type: Yup.string()
        .oneOf(["Savings", "Current"], "Select a valid account type")
        .required("Account type is required"),

    balance: Yup.number()
        .typeError("Balance must be a number")
        .min(0, "Balance cannot be negative")
        .required("Initial balance is required"),

    currency: Yup.string()
        .required("Currency is required"),

    dailyLimit: Yup.number()
        .typeError("Daily limit must be a number")
        .min(0, "Daily limit cannot be negative")
        .required("Daily limit is required"),
});
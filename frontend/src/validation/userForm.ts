import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required("Name is required"),

    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});
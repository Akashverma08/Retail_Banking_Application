import* as Yup from "yup";

export const loginValidationSchema=Yup.object({
    email:Yup.string()
           .email("Enter a valid emial")
           .required("Email is Required"),
    
    password:Yup.string()
              .required("Password is required")
})
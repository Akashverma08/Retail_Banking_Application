import* as Yup from "yup";

export const signupValidation=Yup.object({
    name:Yup.string()
         .required("Name is Required"),

    email:Yup.string()
           .email("Enter the valid email")
           .required("Email is required"),
    
    password:Yup.string()
             .min(6,"Enter at least 6 character")
             .required("Password is required")
        

})
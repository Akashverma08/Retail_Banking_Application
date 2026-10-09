
import {signupValidation} from "../validation/signupValidation";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {signUpApi} from "../services/authService"
import {Link, useNavigate} from "react-router";
import type{Sign} from "../types/sign"
import {useState} from "react";
import {toast} from "react-toastify";

export default function SignUp() {
    const [error,setError]=useState("")

    const navigate=useNavigate();

    const handleSubmit=(async(values :{name:string,email:string,password:string})=>{

        const newUser:Sign={
            name:values.name,
            email:values.email,
            password:values.password
        }

        try{
             const result=await signUpApi(newUser);
             if(result){
                toast.success("Registration Successful");
                navigate("/login");
             }


        }catch(err:any){
            
            console.log(err);
            toast.error(
                err.response?.data?.message || 'registration Failed'

            )

            setError( err.response?.data?.message || 'Something went wrong')
        }
    })
    
    return (
        
        <div className="login-page">
            <div className="login-card">
                <h1>Sign Up</h1>

                {error && <div className="error">{error}</div>}

                <Formik 
                   initialValues={{
                    name:"",
                    email:"",
                    password:""
                   }}

                   validationSchema=
                   {signupValidation}
                   onSubmit={handleSubmit}  
                >
                    <Form>

                        <div className="login-field">
                            <label>Name:</label>
                            <Field
                              type="text"
                              name="name"
                              placeholder="enter the name"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="error"
                            />

                            <label>Email:</label>
                            <Field
                               name="email"
                               type="email"
                               placeholder="enter the email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                            


                            <label>Password:</label>
                            <Field
                              type="password"
                              name="password"
                              placeholder="Enter the password"
                            />
                            <ErrorMessage
                               name="password"
                               component="div"
                               className="error"
                            />

                        </div>

                        <button type="submit">Sign Up</button>
                        <Link to="/login" className="signup-link">Back</Link>

                    </Form> 

                </Formik>




            </div>
        </div>
    );


}
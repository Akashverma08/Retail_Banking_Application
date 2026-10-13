import {  useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../validation/loginValidation";
import { loginUser } from "../services/authService";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit=async (values:{email:string,password:string})=>{
        const result=await loginUser(values.email,values.password);
        console.log(result);

        localStorage.setItem("accessToken",result.accessToken);
        localStorage.setItem("role",result.role);

        if(result.role==="Admin"){
            navigate("/users");

        }else if(result.role==="Customer"){
            navigate("/customerDashboard");
        }

        
    }


    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>

                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}

                    validationSchema={loginValidationSchema}

                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="login-field">
                            <label>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter the email"
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

                        <button type="submit">Login</button>

                    </Form>

                </Formik>
            </div>

        </div>
    );

}

import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema} from '@/validation/userForm';

type UserFormData = {
    name: string;
    email: string;
    password: string;
    role: "Customer";
};

type UserFormProps = {
    userForm: UserFormData;
    setUserForm: React.Dispatch<React.SetStateAction<UserFormData>>;
    onNext: () => void;
};



export default function UserForm({userForm,setUserForm,onNext,}: UserFormProps) {
    return (
        <Formik
            initialValues={userForm}
            validationSchema={userSchema}
            onSubmit={(values) => {
                setUserForm({
                    ...values,
                    role: "Customer",
                });
                onNext();
            }}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <h2>Step 1: Customer Details</h2>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <Field id="name" name="name" type="text" />
                        <ErrorMessage name="name" component="div" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field id="email" name="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field id="password" name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <button type="submit" disabled={!isValid || !dirty}>
                        Next
                    </button>
                </Form>
            )}
        </Formik>
    );
}

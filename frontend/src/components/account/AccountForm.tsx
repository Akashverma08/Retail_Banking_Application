
import { Formik, Form, Field, ErrorMessage } from "formik";
import { accountFormSchema } from "@/validation/accountFormSchema";

type AccountFormData = {
    type: "Savings" | "Current" | "";
    balance: number | "";
    currency: string;
    dailyLimit: number | "";
};

type AccountFormProps = {
    accountForm: AccountFormData;
    setAccountForm: React.Dispatch<React.SetStateAction<AccountFormData>>;
    onNext: () => void;
    onBack:()=>void;
};

export default function AccountForm({ accountForm, setAccountForm, onNext,onBack }: AccountFormProps) {
    return (
        <Formik
            initialValues={accountForm}
            validationSchema={accountFormSchema}
            enableReinitialize
            onSubmit={(values) => {
                setAccountForm(values);
                onNext();
            }}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <h2>Step 2: Account Details</h2>

                    <div>
                        <label htmlFor="type">Account Type:</label>
                        <Field as="select" id="type" name="type">
                            <option value="">Select account type</option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                        </Field>
                        <ErrorMessage name="type" component="div" />
                    </div>

                    <div>
                        <label htmlFor="balance">Initial Balance:</label>
                        <Field
                            id="balance"
                            name="balance"
                            type="number"
                            min="0"
                        />
                        <ErrorMessage name="balance" component="div" />
                    </div>

                    <div>
                        <label htmlFor="currency">Currency:</label>
                        <Field as="select" id="currency" name="currency">
                            <option value="INR">INR</option>
                        </Field>
                        <ErrorMessage name="currency" component="div" />
                    </div>

                    <div>
                        <label htmlFor="dailyLimit">Daily Limit:</label>
                        <Field
                            id="dailyLimit"
                            name="dailyLimit"
                            type="number"
                            min="0"
                        />
                        <ErrorMessage name="dailyLimit" component="div" />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="back-button"
                            onClick={onBack}
                        >
                            Back
                        </button>

                        <button type="submit" disabled={!isValid || !dirty}>
                            Next
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}


import { Formik, Form, Field, ErrorMessage } from "formik";
import { createBillPayment } from "../services/billPaymentService";
import { billValidationSchema } from "@/validation/billValidation";
import { toast } from "react-toastify";

export default function Bills() {
    return (
        <div className="bill-container">
            <h2>Pay Bills</h2>

            <Formik
                initialValues={{
                    accountNumber: "",
                    billerCode: "",
                    consumerNumber: "",
                    amount: "",
                }}
                validationSchema={billValidationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const payment = await createBillPayment({ ...values, amount: Number(values.amount), });

                        
                        toast.success(
                            `Payment successful! Reference: ${payment.refNumber}`
                        );

                        resetForm();
                    } catch (error: any) {
                        toast.error(
                            error.response?.data?.message ||
                            "Bill payment failed. Please try again."
                        );
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <div className="bill-field">
                            <label>Account Number</label>
                            <Field
                                name="accountNumber"
                                placeholder="Enter account number"
                            />
                            <ErrorMessage
                                name="accountNumber"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="bill-field">
                            <label>Biller Code</label>
                            <Field
                                as="select"
                                name="billerCode"
                            >
                                <option value="">Select biller</option>
                                <option value="ELECTRICITY">Electricity</option>
                                <option value="WATER">Water</option>
                                <option value="GAS">Gas</option>
                                <option value="MOBILE">Mobile</option>
                            </Field>
                            <ErrorMessage
                                name="billerCode"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="bill-field">
                            <label>Consumer Number</label>
                            <Field
                                name="consumerNumber"
                                placeholder="Enter consumer number"
                            />
                            <ErrorMessage
                                name="consumerNumber"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="bill-field">
                            <label>Amount (₹)</label>
                            <Field
                                name="amount"
                                type="number"
                                min="1"
                                placeholder="Enter amount"
                            />
                            <ErrorMessage
                                name="amount"
                                component="div"
                                className="error"
                            />
                        </div>

                        {status?.success && (
                            <p style={{ color: "green" }}>{status.success}</p>
                        )}

                        {status?.error && (
                            <p style={{ color: "red" }}>{status.error}</p>
                        )}

                        <button
                            type="submit"
                            className="bill-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : "Pay Bill"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

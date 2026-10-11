
import { useState } from "react";
import AccountForm from "../components/account/AccountForm";
import ReviewForm from "../components/account/ReviewForm";
import UserForm from "../components/account/UserForm";

export default function CreateAccount() {
    const [step, setStep] = useState(1);

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Customer" as const,
    });

    const [accountForm, setAccountForm] = useState({
        type: "" as "Savings" | "Current" | "",
        balance: 0 as number | "",
        currency: "INR",
        dailyLimit: 5000 as number | "",
    });

    return (
        <div className="create-account-page">
            <div className="create-account-card">
                <h1>Create New Account</h1>
                <p className="create-account-subtitle">
                    Enter customer and account details
                </p>

                <div className="step-indicator">
                    <span className={step >= 1 ? "active" : ""}>1. Customer</span>
                    <span className={step >= 2 ? "active" : ""}>2. Account</span>
                    <span className={step >= 3 ? "active" : ""}>3. Review</span>
                </div>

                {step === 1 && (
                    <UserForm
                        userForm={userForm}
                        setUserForm={setUserForm}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <AccountForm
                        accountForm={accountForm}
                        setAccountForm={setAccountForm}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <ReviewForm
                        userForm={userForm}
                        accountForm={accountForm}
                        onBack={() => setStep(2)}
                    />
                )}

            </div>
        </div>
    );
}

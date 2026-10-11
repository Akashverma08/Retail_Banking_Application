import type { CreateUser } from "@/types/task";
import { useState } from "react";
import { createUser, createAccount } from "@/services/taskService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type AccountFormData = {
    type: "Savings" | "Current" | "";
    balance: number | "";
    currency: string;
    dailyLimit: number | "";
};

type ReviewFormProps = {
    userForm: CreateUser;
    accountForm: AccountFormData;
    onBack: () => void;
}

export default function ReviewForm({ userForm, accountForm, onBack }: ReviewFormProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");
            const createdUser = await createUser(userForm);


            await createAccount({
                userId: createdUser.id,
                type: accountForm.type as "Savings" | "Current",
                balance: Number(accountForm.balance),
                currency: accountForm.currency,
                dailyLimit: Number(accountForm.dailyLimit),
            });

            toast.success("Customer and account created successfully!");
            navigate("/users")
        } catch (err) {
            console.error("Account creation failed:", err);
            toast.error("Account creation failed. Please try again.");
            setError("Account creation failed. Please check the error and try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <h2>Step 3: Review Details</h2>

            <h3>Customer Details</h3>
            <p>Name: {userForm.name}</p>
            <p>Email: {userForm.email}</p>
            <p>Role: {userForm.role}</p>

            <h3>Account Details</h3>
            <p>Account Type: {accountForm.type}</p>
            <p>Initial Balance: {accountForm.balance} {accountForm.currency}</p>
            <p>Daily Limit: {accountForm.dailyLimit} {accountForm.currency}</p>

            {error && <p>{error}</p>}

            <div className="form-actions">
                <button type="button" className="back-button" onClick={onBack}>
                    Back
                </button>

                <button type="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating..." : "Submit"}
                </button>
            </div>
        </div>
    )
}
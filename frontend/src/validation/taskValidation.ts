import * as Yup from "yup";

export const taskValidationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),

    description: Yup.string()
        .required("Description is required"),

    status: Yup.string()
        .oneOf(
            ["pending", "in-progress", "completed"],
            "Invalid status"
        )
        .required("Status is required"),

    priority: Yup.string()
        .oneOf(
            ["low", "medium", "high"],
            "Invalid priority"
        )
        .required("Priority is required"),
});
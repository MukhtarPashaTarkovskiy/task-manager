function clearValidationErrors() {
    document.querySelectorAll(".field-error").forEach(element => {
        element.textContent = "";
    });
}

function showValidationErrors(errors) {
    clearValidationErrors();

    Object.entries(errors).forEach(([field, messages]) => {
        const errorElement = document.getElementById(field + "-error");

        if (errorElement) {
            errorElement.textContent = messages.join(". ");
        }
    });
}
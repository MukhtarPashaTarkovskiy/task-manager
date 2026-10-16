
const pathParts = window.location.pathname.split("/");
const taskId = pathParts[2];

const form = document.getElementById("edit-task-form");
const errorElement = document.getElementById("form-error");

let isSubmitting = false;
let isTaskLoaded = false;

function loadTask() {
    fetch(`/api/tasks/${taskId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Не удалось загрузить задачу");
            }
            return response.json();
        })
        .then(task => {
            document.getElementById("title").value = task.title;
            document.getElementById("description").value = task.description ?? "";
            document.getElementById("status").value = task.status;
            document.getElementById("priority").value = task.priority;
            document.getElementById("deadline").value = task.deadline ?? "";

            isTaskLoaded = true;
        })
        .catch(error => {
            console.error(error);

            errorElement.textContent =
                "Не удалось загрузить задачу. Вернитесь к списку задач.";
            errorElement.hidden = false;

            form.querySelectorAll("input, textarea, select, button")
                .forEach(element => element.disabled = true);
        });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isSubmitting || !isTaskLoaded) return;
    isSubmitting = true;

    errorElement.textContent = "";
    errorElement.hidden = true;

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        deadline: document.getElementById("deadline").value || null
    };

    fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
        .then(async response => {
            clearValidationErrors();

            if (!response.ok) {
                if (response.status === 400) {
                    const data = await response.json();

                    if (data.errors) {
                        showValidationErrors(data.errors);
                        return null;
                    }
                }

                throw new Error("Не удалось обновить задачу");
            }

            return response.json();
        })
        .then(updatedTask => {
            if (updatedTask === null) return;

            window.location.href = "/tasks";
        })
        .catch(error => {
            console.error(error);

            errorElement.textContent =
                "Не удалось сохранить изменения. Попробуйте ещё раз.";
            errorElement.hidden = false;
        })
        .finally(() => {
            isSubmitting = false;
        });
});

loadTask();


async function loadTasks() {
    const tableBody = document.getElementById("tasks-table-body");
    tableBody.replaceChildren();

    try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
            throw new Error("Ошибка загрузки задач");
        }

        const tasks = await response.json();

        if (tasks.length === 0) {
            showTableMessage("У вас пока нет задач. Создайте первую!");
            return;
        }

        tasks.forEach(task => {
            const row = document.createElement("tr");

            addCell(row, task.id);
            addCell(row, task.title);
            addCell(row, task.description || "—");

            addBadgeCell(row, task.status, {
                TODO: "К выполнению",
                IN_PROGRESS: "В работе",
                DONE: "Выполнено"
            }, "status");

            addBadgeCell(row, task.priority, {
                LOW: "Низкий",
                MEDIUM: "Средний",
                HIGH: "Высокий"
            }, "priority");

            addCell(row, task.deadline || "Не указан");

            const actionsCell = document.createElement("td");
            actionsCell.className = "task-actions";

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-secondary btn-small";
            editButton.textContent = "Редактировать";
            editButton.addEventListener("click", () => editTask(task.id));

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-danger-outline btn-small";
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", () => {
                deleteTask(task.id, deleteButton);
            });

            actionsCell.append(editButton, deleteButton);
            row.appendChild(actionsCell);
            tableBody.appendChild(row);
        });

    } catch (error) {
        showTableMessage("Не удалось загрузить задачи. Обновите страницу.");
    }
}

function addCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value == null ? "—" : String(value);
    row.appendChild(cell);
}

function addBadgeCell(row, value, labels, type) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");

    const allowedValues = Object.keys(labels);
    const safeValue = allowedValues.includes(value) ? value : "UNKNOWN";

    badge.className = `task-badge ${type}-${safeValue.toLowerCase()}`;
    badge.textContent = labels[value] || value || "—";

    cell.appendChild(badge);
    row.appendChild(cell);
}

function showTableMessage(message) {
    const tableBody = document.getElementById("tasks-table-body");
    tableBody.replaceChildren();

    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 7;
    cell.className = "empty-state";
    cell.textContent = message;

    row.appendChild(cell);
    tableBody.appendChild(row);
}


async function deleteTask(id, button) {
    const modal = document.getElementById("delete-task-modal");
    const cancelButton = document.getElementById("cancel-delete-task");
    const confirmButton = document.getElementById("confirm-delete-task");

    modal.hidden = false;
    cancelButton.focus();

    return new Promise(resolve => {
        function closeModal() {
            modal.hidden = true;
            cancelButton.removeEventListener("click", cancel);
            confirmButton.removeEventListener("click", confirmDelete);
            modal.removeEventListener("click", outsideClick);
            document.removeEventListener("keydown", escapeKey);
            button.focus();
            resolve();
        }

       function cancel() {
           if (confirmButton.disabled) return;

           closeModal();
       }

        function outsideClick(event) {
            if (confirmButton.disabled) return;

            if (event.target === modal) {
                closeModal();
            }
        }

        function escapeKey(event) {
            if (confirmButton.disabled) return;

            if (event.key === "Escape") {
                closeModal();
            }
        }

        async function confirmDelete() {
            confirmButton.disabled = true;
            cancelButton.disabled = true;
            confirmButton.textContent = "Удаление...";
            button.disabled = true;

            try {
                const response = await fetch(`/api/tasks/${id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Ошибка удаления задачи");
                }

                closeModal();
                await loadTasks();

            } catch (error) {
               closeModal();
               const errorElement = document.getElementById("page-error");
               errorElement.textContent = "Не удалось удалить задачу. Попробуйте ещё раз.";
               errorElement.hidden = false;
            } finally {
                confirmButton.disabled = false;
                confirmButton.textContent = "Удалить задачу";
                button.disabled = false;
                cancelButton.disabled = false;
            }
        }

        cancelButton.addEventListener("click", cancel);
        confirmButton.addEventListener("click", confirmDelete);
        modal.addEventListener("click", outsideClick);
        document.addEventListener("keydown", escapeKey);
    });
}


function editTask(id) {
    window.location.href = `/tasks/${id}/edit`;
}

loadTasks();

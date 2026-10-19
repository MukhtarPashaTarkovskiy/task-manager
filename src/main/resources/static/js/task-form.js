const form = document.getElementById("task-form");
let isSubmitting = false;

form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const errorElement = document.getElementById("form-error");
    errorElement.textContent = "";
    errorElement.hidden = true;

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        deadline: document.getElementById("deadline").value || null
    };

    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

    fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             [csrfHeader]: csrfToken
        },
        body: JSON.stringify(task)
    })
      .then(async response => {

          clearValidationErrors();

          if (!response.ok) {
              const data = await response.json();

              if (response.status === 400 && data.errors) {
                showValidationErrors(data.errors);
                  return null;
              }

              throw new Error("Не удалось создать задачу");
          }

          return response.json();
      })
      .then(task => {
          if (task === null) return;

          window.location.href = "/tasks";
      })
    .catch(error => {
        console.error(error);

        const errorElement = document.getElementById("form-error");
        errorElement.textContent = "Не удалось создать задачу. Попробуйте ещё раз.";
        errorElement.hidden = false;
    })
      .finally(() => {
          isSubmitting = false;
      });

    });
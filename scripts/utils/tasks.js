import { displayTasksNumber, handleSelectedLi } from "../pages/to-do.js";

export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function renderTasks(selectedTask) {

    renderTasksGrid(selectedTask);
    checkDoneTasks();
    handleDone();
    handleRemove();
    
    function renderTasksGrid(selectedTask) {
        const tasksgrid = document.querySelector('.tasks-area');
        let tasksHtml = '';

        selectedTask.forEach(task => {
            tasksHtml += `
                <div class="task">
                    <div class="top-section">
                        <div class="task-info">
                            <div class="task-name" data-id="${task.id}">
                                ${task.name}
                                <div class="line-through"></div>
                            </div>
                            <div class="task-description">
                                ${task.description}
                                <div class="line-through"></div>
                            </div>
                        </div>
                        <div class="task-buttons">
                            <button class="task-done-button" data-id="${task.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fca311" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" style="fill: rgb(0, 128, 0);"></path></svg>
                            </button>
                            <button class="remove-task-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#008000" d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75M4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.75 1.75 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15M6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25" style="fill: rgb(213, 0, 0);"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="bottom-section">
                        <b>Deadline:</b> ${task.deadline}
                    </div>
                </div>
            `;
        });

        tasksgrid.innerHTML = tasksHtml;
    }

    function handleDone() {

        const taskDoneButton = document.querySelectorAll('.task-done-button');
        taskDoneButton.forEach(button => {
            button.addEventListener('click', () => {
                const buttonId = button.dataset.id;
                
                tasks.forEach(task => {
                    if (task.id === buttonId) task.done = true;
                });

                localStorage.setItem('tasks', JSON.stringify(tasks));
                handleSelectedLi();
                displayTasksNumber();
            });
        });
        
    }

    function handleRemove() {
        const removeButtons = document.querySelectorAll('.remove-task-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (value, index) => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                handleSelectedLi();
                displayTasksNumber();
            });
        });
    }

    function checkDoneTasks() {
        const taskNames = document.querySelectorAll('.task-name');
        taskNames.forEach(taskName => {
            const taskNameId = taskName.dataset.id;
            tasks.forEach(task => {
                if (task.id === taskNameId) {
                    if (task.done === false) {
                        taskName.style.textDecoration = 'none';
                    } else {
                        taskName.style.textDecoration = 'line-through';
                    }
                }
            })
        })
    }
}
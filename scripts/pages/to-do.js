import { handleDarkMode } from '../utils/darkMode.js';
import { tasks, renderTasks } from '../utils/tasks.js';

renderTasks();
handleDarkMode();

handleNewTask();


function handleNewTask() {

    const taskNameInput = document.querySelector('#task-name');
    const taskDescriptionInput = document.querySelector('#task-description');
    const taskDateInput = document.querySelector('#task-date');

    const addTaskButton = document.querySelector('.add-task-button');
    addTaskButton.addEventListener('click', (e) => {
        if (taskDateInput.value === '' ||
            taskDescriptionInput.value === '' ||
            taskDateInput.value === ''
        ) e.preventDefault();
        else {

            tasks.push({
                name: taskNameInput.value,
                description: taskDescriptionInput.value,
                deadline: dayjs(taskDateInput.value).format('MMMM DD, YYYY')
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();

            taskNameInput.value === '';
            taskDescriptionInput.value === '';
            taskDateInput.value === '';
        }
    });
}
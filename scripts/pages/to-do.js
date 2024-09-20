import { handleDarkMode } from '../utils/darkMode.js';
import { tasks, renderTasks } from '../utils/tasks.js';
import { randomId } from '../utils/randomId.js';

renderTasks();
displayTasksNumber();
handleDarkMode();

handleNewTask();
handleSelectedLi();


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
                id: randomId(),
                done: false,
                deadline: dayjs(taskDateInput.value).format('MMMM DD, YYYY')
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            displayTasksNumber();

            taskNameInput.value = '';
            taskDescriptionInput.value = '';
            taskDateInput.value = '';
        }
    });
}

function handleSelectedLi() {
    const lis = document.querySelectorAll('ul.navigation li');

    let status = localStorage.getItem('status') ||'all';
    lis.forEach(li => {
        if (li.dataset.status === status) li.classList.add('selected');
    });

    lis.forEach(li => {
        li.addEventListener('click', () => {
            lis.forEach(item => {
                item.classList.remove('selected');
            });
            li.classList.add('selected');
            status = li.dataset.status;
            localStorage.setItem('status', status);
        });
    })
}

export function displayTasksNumber() {

    const allTasks = document.querySelector('.all span');
    const pendingTasks = document.querySelector('.pending span');
    const doneTasks = document.querySelector('.done span');

    let all = tasks.length;
    let pending = 0;
    let done = 0;
    tasks.forEach(task => {
        if (task.done === false) pending++;
        else done++;
    });

    allTasks.innerText = `(${all})`;
    pendingTasks.innerText = `(${pending})`;
    doneTasks.innerText = `(${done})`;
}
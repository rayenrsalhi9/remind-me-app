import { handleDarkMode } from '../utils/darkMode.js';
import { notes, classifyNotes } from '../utils/notesBase.js';
import { randomId } from '../utils/randomId.js';

handleDarkMode();
handleSelectedNavigation();
handleNewNote();

function handleSelectedNavigation() {

    let selectedType = localStorage.getItem('type') || 'general';

    const navigationLis = document.querySelectorAll('ul.navigation li');
    navigationLis.forEach(li => {
        if (li.dataset.type === selectedType) li.classList.add('selected');
    });

    navigationLis.forEach(li => {
        li.addEventListener('click', () => {
            navigationLis.forEach(item => {
                item.classList.remove('selected');
            });
            li.classList.add('selected');
            selectedType = li.dataset.type;
            localStorage.setItem('type', selectedType);
        });
    });
}

function handleNewNote() {

    const taskContent = document.querySelector('#note-content');
    const taskType = document.querySelector('#note-type');

    const addButton = document.querySelector('.add-note-button');

    addButton.addEventListener('click', (e) => {
        if (taskContent.value === '') e.preventDefault();
        else {
            notes.push({
                id: randomId(),
                content: taskContent.value,
                type: taskType.value
            });

            localStorage.setItem('notes', JSON.stringify(notes));

            taskContent.value = '';
            taskType.value = 'general';

            classifyNotes();
        }
    });
}
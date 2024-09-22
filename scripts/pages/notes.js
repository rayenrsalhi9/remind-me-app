import { handleDarkMode } from '../utils/darkMode.js';
import { notes, classifyNotes, renderNotes, important, education, business, finance, entertainment } from '../utils/notesBase.js';
import { randomId } from '../utils/randomId.js';

handleDarkMode();
handleSelectedNavigation();

function handleSelectedNavigation() {

    let selectedType = localStorage.getItem('type') || 'general';

    renderNoteType(selectedType);
    handleNewNote();
    handleRemove();

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
            renderNoteType(selectedType);
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

            handleSelectedNavigation();
        }
    });
}

function renderNoteType(selectedType) {

    classifyNotes();

    switch (selectedType) {
        case 'important' :
            renderNotes(important, '#d62828');
            break;
        case 'education' :
            renderNotes(education, '#8ecae6');
            break;
        case 'business' :
            renderNotes(business, '#8d99ae');
            break;
        case 'finance' :
            renderNotes(finance, '#a1c181');
            break;
        case 'entertainment' :
            renderNotes(entertainment, '#fcbf49');
            break;
        default:
            renderNotes(notes, '#9a8c98');
    }
}

function handleRemove() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        
    })
}
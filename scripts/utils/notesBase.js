export let notes = JSON.parse(localStorage.getItem('notes')) || [];

export let important = [];
export let education = [];
export let business = [];
export let finance = [];
export let entertainment = [];

export function renderNotes(selectedType, seletedBg) {

    const notesGrid = document.querySelector('.notes-grid');
    let notesHtml = '';

    selectedType.forEach(item => {
        const addedDate = dayjs().format('MMMM DD, YYYY | HH:mm');
        notesHtml += `
            <div class="note-container" style="background: ${seletedBg}">
                <div class="note-body">${item.content}</div>
                <div class="note-added-date"><b>Added on :</b> ${addedDate}</div>
                <div class="note-type"><b>Type :</b> ${item.type}</div>
                <svg class="remove-button" data-id="${item.id}" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#000000" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </div>
        `;
    });

    notesGrid.innerHTML = notesHtml;
}

export function classifyNotes() {

    important = [];
    education = [];
    business = [];
    finance = [];
    entertainment = [];

    notes.forEach(note => {
        switch(note.type) {
            case 'important':
                important.push(note);
                break;
            case 'education':
                education.push(note);
                break;
            case 'business':
                business.push(note);
                break;
            case 'finance':
                finance.push(note);
                break;
            case 'entertainment':
                entertainment.push(note);
                break;
        }
    });
}

export function handleRemove(renderNoteType, selectedType) {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (value, index) => {
            let newNotes = [];
            notes.forEach(note => {
                if (note.id !== button.dataset.id) {
                    newNotes.push(note);  
                }
            });
            notes = newNotes;
            localStorage.setItem('notes', JSON.stringify(newNotes));
            renderNoteType(selectedType);
        });
    });
}
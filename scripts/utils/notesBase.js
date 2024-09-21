export let notes = JSON.parse(localStorage.getItem('notes')) || [];

export function renderNotes(selectedType) {

}

export function classifyNotes() {
    
    let important = [];
    let education = [];
    let business = [];
    let finance = [];
    let entertainment = [];

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
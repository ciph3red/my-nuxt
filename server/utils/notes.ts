export let notes: {id: number, text: string}[] = [
    {id: 1, text: "Learn Nuxt"},
    {id: 2, text: "Build a REST API"},
    {id: 3, text: "Deploy to production"}
];
export let nextId = 4;

export function addNote(text: string) {
    const note = { id: nextId++, text };
    notes.push(note)
    return note
}
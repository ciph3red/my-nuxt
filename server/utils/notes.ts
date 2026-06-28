// Shared in-memory notes store.
// `server/utils/` is auto-scanned by Nitro — anything exported here
// can be imported from any other server file.
//
// Note: this lives in process memory only. Every server restart wipes it.
// Persisting to disk/DB is a separate exercise.

export const notes: { id: number, text: string }[] = [
    { id: 1, text: 'Learn Nuxt' },
    { id: 2, text: 'Build a REST API' },
    { id: 3, text: 'Deploy to production' }
]

export let nextId = 4

export function addNote(text: string) {
    const note = { id: nextId++, text }
    notes.push(note)
    return note
}
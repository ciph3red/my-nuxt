import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const DATA_DIR = join(process.cwd(), '.data')
const DB_FILE = join(DATA_DIR, 'notes.sqlite')


mkdirSync(DATA_DIR, { recursive: true })

const db = new Database(DB_FILE)

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
)
`)

const insertNote = db.prepare('INSERT INTO notes (text) VALUES (?)')
const selectAllNotes = db.prepare('SELECT * FROM notes ORDER BY id')
const deleteNoteStmt = db.prepare('DELETE FROM notes WHERE id = ?')
const updateNoteStmt = db.prepare('UPDATE notes SET text = ? WHERE id = ?')

export type Note = {
    id: number
    text: string
}

export function addNote(text: string): Note {
    const result = insertNote.run(text)
    return { id: Number(result.lastInsertRowid), text }
}

export function getAllNotes(): Note[] {
    return selectAllNotes.all() as Note[]
}

export function deleteNote(id: number): boolean {
    const result = deleteNoteStmt.run(id)
    return Boolean(result.changes > 0)
}

export function updateNote(id: number, text: string): Note | null {
    const result = updateNoteStmt.run(text, id)
    if (result.changes === 0) return null
    return {id, text}
}

import { nextId } from './notes.post'
import { notes } from './notes.get'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const note = { id: nextId++, text: body.text }
    return note
})
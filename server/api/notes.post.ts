import {addNote} from '../utils/notes'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return addNote(body.text)
})
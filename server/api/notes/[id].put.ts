import { updateNote } from '../../utils/notes'

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id')
    const id = Number(idParam)
    
    if (!Number.isInteger(id) || id < 1) {
        setResponseStatus(event, 400)
        return { error: 'Invalid note ID' }
    }

    const body = await readBody(event)
    if (typeof body.text !== 'string' || body.text.trim() === '') {
        setResponseStatus(event, 400)
        return { error: 'Text is required'}
    }


    const updated = updateNote(id, body.text)
    if (!updated) {
        setResponseStatus(event, 404)
        return { error: 'Note not found' }
    }
    return updated
})

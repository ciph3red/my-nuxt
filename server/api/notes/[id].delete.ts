import {deleteNote} from '../../utils/notes'

export default defineEventHandler((event) => {

    const idParam = getRouterParam(event, 'id')
    const id = Number(idParam)

    if (!Number.isInteger(id) || id < 1){
        setResponseStatus(event, 400)
        return { error: 'Invalid note ID' }
    }

    const deleted = deleteNote(id)
    if (!deleted) {
        setResponseStatus(event, 404)
        return { error: 'Note not found' }
    }

    setResponseStatus(event, 204)
    return null
})
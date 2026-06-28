let nextId = 3

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const note = { id: nextId++, text: body.text }
    return note
})
import { getAllNotes } from '../utils/notes';

export default defineEventHandler(() => {
    return getAllNotes()
});
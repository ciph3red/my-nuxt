<script setup lang="ts">
const { data: notes, refresh } = await useFetch('/api/notes/')

const draft = ref('')
const editingId = ref<number | null>(null)
const editDraft = ref('')

async function addNote() {
    if (!draft.value.trim()) return
    await $fetch('/api/notes',{
        method: 'POST',
        body: { text: draft.value }
    })
    draft.value = ''
    await refresh()
}

async function deleteNote(id: number){
     if(!confirm('Are you sure you want to delete this note?')) 
    return 0;

    await $fetch('/api/notes/' + id, {method: 'DELETE'})
    await refresh()

    
}
function clearDraft(){
    draft.value = ''
}

function startEdit(id: number, text: string) {
    editingId.value = id
    editDraft.value = text
}

function cancelEdit() {
    editingId.value = null
    editDraft.value = ''
}

async function saveEdit(id: number){
    if (!editDraft.value.trim()) return
    await $fetch('/api/notes/' + id, {
        method: 'PUT',
        body: { text: editDraft.value }
    })
    cancelEdit()
    await refresh()
}


</script>

<template>
    <main>
    <h1>Notes</h1>
    <p>{{ notes?.length ?? 0 }} notes</p>
    <ul>
        <li v-for="note in notes" :key="note.id">
        <template v-if='editingId === note.id'>
            <input v-model="editDraft" />
            <button type="button"@click="saveEdit(note.id)">Save</button>
            <button type="button" @click="cancelEdit">Cancel</button>
            </template>
        <template v-else>{{ note.text }}
        <button type="button" @click="startEdit(note.id, note.text)">Edit</button>
        <button type="button" @click="deleteNote(note.id)">Delete</button>
    </template>
        
        
        </li>
    </ul>
    <form @submit.prevent="addNote">
        <input v-model="draft" placeholder="New note..." />
        <button type="submit">Add</button>
        <button type="button" @click="clearDraft">Clear</button>
    </form>
    <p><NuxtLink to="/">Home</NuxtLink></p>
    </main>
</template>
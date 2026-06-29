<script setup lang="ts">
const { data: notes, refresh } = await useFetch('/api/notes/')

const draft = ref('')

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
</script>

<template>
    <main>
    <h1>Notes</h1>
    <p>{{ notes?.length ?? 0 }} notes</p>
    <ul>
        <li v-for="note in notes" :key="note.id">{{ note.text }}
        <button type='button' @click="deleteNote(note.id)">Delete</button></li>
    </ul>
    <form @submit.prevent="addNote">
        <input v-model="draft" placeholder="New note..." />
        <button type="submit">Add</button>
        <button type="button" @click="clearDraft">Clear</button>
    </form>
    <p><NuxtLink to="/">Home</NuxtLink></p>
    </main>
</template>
<script setup lang="ts">
const hobbies = ['coding','coding','cats']
</script>

<template>
    <div>
    <h1>About me</h1>
    <ul>
        <li v-for="hobby in hobbies" :key="hobby">{{ hobby }}</li>
    </ul>
    <NuxtLink to="/">Back home</NuxtLink>
    </div>
</template>
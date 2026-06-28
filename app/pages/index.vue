<script setup lang='ts'>
const {data} = await useFetch('/api/hello')
</script>


<template>
    <main>
    <h1>Home</h1>
    <p>Backend says: {{ data?.message }}</p>
    </main>
</template>
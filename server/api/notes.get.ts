let notes: {id: number, text: string}[] = [
    {id: 1, text: "Learn Nuxt"},
    {id: 2, text: "Build a REST API"},
    {id: 3, text: "Deploy to production"}
];

export default defineEventHandler(() => {
    return notes;
});
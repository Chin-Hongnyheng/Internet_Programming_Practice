<template>
    <span class="section1">This is Section 1 of </span>
    <router-view />
</template>
<script>
export default{
    name: 'Page1',
}
</script>
<style scoped>
.page1{
    border: 1px solid black;
    display:flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: bold;
    width: 100%;
}
</style>
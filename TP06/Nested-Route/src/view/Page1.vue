<template>
    <span class="page1">Welcome to Page 1</span>
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
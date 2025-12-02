<template>
    <span class="page2">Welcome to Page 2</span>
    <router-view />
</template>
<script>
export default{
    name: 'Page2',
}
</script>
<style scoped>
.page2{
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
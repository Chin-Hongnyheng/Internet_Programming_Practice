<template>
    <span class="page3">Welcome to Page 3</span>
    <router-view />
</template>
<script>
export default{
    name: 'Page3',
}
</script>
<style scoped>
.page3{
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
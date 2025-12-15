<template>
    <div class="container">
        <h1 class="Header">Header</h1>
        <div class="page">
            <router-link to="/page1" class="mini-header">Page 1</router-link>
            <router-link to="/page2" class="mini-header">Page 2</router-link>
            <router-link to="/page3" class="mini-header">Page 3</router-link>
        </div>
    </div>
</template>
<script>
export default{
    name: 'HeaderComponent',
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 200px;
    border: 2px solid black;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    box-sizing: border-box;
}
.Header{
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
}
.page{
    display:flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 50px;
    gap: 50px;
}
.mini-header{
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: black;
    text-decoration: none;
}
.router-link-active{
    color: green;
}
</style>
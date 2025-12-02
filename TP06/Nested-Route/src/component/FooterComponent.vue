<template>
    <div class="container">
        <h1 class="Header">Footer</h1>
    </div>
</template>
<script>
export default{
    name: 'FooterComponent',
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 200px;
    border: 2px solid black;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;
}
.Header{
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: bold;
}
</style>
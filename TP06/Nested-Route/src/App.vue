<template>
  <div id="App">
    <HeaderComponent />
    <div class="page">
      <SidebarMenuComponent class="left-container"/>
      <router-view class="right-container"/>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './component/FooterComponent.vue';
import HeaderComponent from './component/HeaderComponent.vue';
import SidebarMenuComponent from './component/SidebarMenuComponent.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarMenuComponent,
  }
}
</script>

<style scoped>
#App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.content{
  display:flex;
  flex-direction: row;
}
.page{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left-container{
  width:20%;
  box-sizing: border-box;
}
.right-container{
  width:80%;
  box-sizing: border-box;
}
</style>

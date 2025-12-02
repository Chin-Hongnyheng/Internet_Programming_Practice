<template>
    <div class="sidebar">
        <div class="section-container">
            <div class="Menu">Menu</div>
            <router-link to="/section1" class="section">Section 1</router-link>
            <router-link to="/section2" class="section">Section 2</router-link>
            <router-link to="/section3" class="section">Section 3</router-link>
            <router-link to="/section4" class="section">Section 4</router-link>
        </div>

    </div>
</template>
<script>
import SectionComponent from '@/component/SectionComponent.vue'
    export default{
        name: 'SidebarMenuComponent',
        method:{
            toSelection(sectionId: number) {
                this.$router.push('/page1/sections/' +  sectionId);
            }
            isActive(sectionId: number){
                return Number(this.$route.params.sectionId) == sectionId;
            }
        },
        components:{
            SectionComponent,
        }
    }
</script>
<style scoped>
.sidebar{
    display:flex;
    flex-direction: column;
    border: 1px solid black;
    width: 300px;
    height: 500px;
}
.Menu{
    border: 1px solid black;
    font-size: 24px;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    color: black;
    text-decoration: none;
    height: 60px;
        display: flex;
    justify-content: center;
    align-items: center;
}
.section{
    border: 1px solid black;
    font-size: 24px;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    color: black;
    text-decoration: none;
    height: 60px;
        display: flex;
    justify-content: center;
    align-items: center;
}
.section-container{
    display:flex;
    flex-direction: column;
}
</style>
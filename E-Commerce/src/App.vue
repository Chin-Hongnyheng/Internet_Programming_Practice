<script>
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'

const burgerImage = new URL('@/assets/Burger.png', import.meta.url).href
const peachImage = new URL('@/assets/Peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/Kiwi.png', import.meta.url).href
const appleImage = new URL('@/assets/Apple.png', import.meta.url).href
const snackImage = new URL('@/assets/Snack.png', import.meta.url).href
const black_plumImage = new URL('@/assets/Black_Plum.png', import.meta.url).href
const vegetablesImage = new URL('@/assets/Vegetables.png', import.meta.url).href
const headphoneImage = new URL('@/assets/Headphone.png', import.meta.url).href
const cakeAndmilkImage = new URL('@/assets/Cake_Milk.png', import.meta.url).href
const orangeImage = new URL('@/assets/Orange.png', import.meta.url).href
const onionImage = new URL('@/assets/Onion.png', import.meta.url).href
const strawberryImage = new URL('@/assets/Strawberry.png', import.meta.url).href
const vegetable_BasketImage = new URL('@/assets/Vegetable_Basket.png', import.meta.url).href
export default {
  name: 'App',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
      appleImage,
      snackImage,
      black_plumImage,
      vegetablesImage,
      headphoneImage,
      cakeAndmilkImage,
      orangeImage,
      onionImage,
      strawberryImage,
      vegetable_BasketImage,
    }
  },
  components: {
    CategoryComponent,
    PromotionComponent,
  },
}
</script>

<template>
  <div class="category-wrapper">
    <CategoryComponent
      title="Burger"
      :product-count="14"
      :image="burgerImage"
      background="#c5aa0f99"
    />
    <CategoryComponent
      title="Peach"
      :product-count="17"
      :image="peachImage"
      background="#3cff0065"
    />
    <CategoryComponent
      title="Organic kiwi"
      :product-count="21"
      :image="kiwiImage"
      background="#e5ff0065"
    />
    <CategoryComponent
      title="Red Apple"
      :product-count="68"
      :image="appleImage"
      background="#8a0bf165"
    />
    <CategoryComponent
      title="Snack"
      :product-count="34"
      :image="snackImage"
      background="#ca161665"
    />
    <CategoryComponent
      title="Black plum"
      :product-count="25"
      :image="black_plumImage"
      background="#1e5f7965"
    />
    <CategoryComponent
      title="Vegetables"
      :product-count="65"
      :image="vegetablesImage"
      background="#da9c1765"
    />
    <CategoryComponent
      title="Headphone"
      :product-count="33"
      :image="headphoneImage"
      background="#6854af65"
    />
    <CategoryComponent
      title="Cake & Milk"
      :product-count="54"
      :image="cakeAndmilkImage"
      background="#912b2b65"
    />
    <CategoryComponent
      title="Orange"
      :product-count="63"
      :image="orangeImage"
      background="#e7eec165"
    />
  </div>
  <div class="Promotion-wrapper">
    <PromotionComponent
      title="EveryDay Fresh and Clean with Our Products"
      background="#912b2b65"
      button="#54f124"
      :image="onionImage"
    />
    <PromotionComponent
      title="Make your Breakfast Healthy and Easy"
      background="#ca161665"
      button="#54f124"
      :image="strawberryImage"
    />
    <PromotionComponent
      title="The best Organic Products Online"
      background="#e7eec165"
      button="#f1d224"
      :image="vegetable_BasketImage"
    />
  </div>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.Promotion-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>

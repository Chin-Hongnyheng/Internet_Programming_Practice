<template>
  <div class="page-container">
    <div>
      <MenuComponent title="Featured Categories" :groups="productStore.groups" />
    </div>
    <div class="Category-container">
      <CategoryComponent
        v-for="category in productStore.categories"
        :key="category['id']"
        :name="category['name']"
        :product-count="category['productCount']"
        :color="category['color']"
        :image="'http://localhost:3000/' + category['image']"
      />
    </div>
    <div class="Promotion-container">
      <PromotionComponent
        v-for="promotion in productStore.promotions"
        :key="promotion['id']"
        :title="promotion['title']"
        :color="promotion['color']"
        :image="'http://localhost:3000/' + promotion['image']"
        :buttonColor="promotion['buttonColor']"
      />
    </div>
    <div>
      <MenuComponent title="Popular Products" :groups="productStore.groups" />
    </div>
    <div class="Product-container">
      <ProductComponent
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        :name="product.name"
        :group="product.group"
        :price="product.price"
        :original-price="product.originalPrice"
        :rating="product.rating"
        :size="product.size"
        :image="'http://localhost:3000/' + product.image"
        :badge="product.badge"
        :badge-type="product.badgeType"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createPinia } from 'pinia'
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
import ProductComponent from './components/ProductComponent.vue'
import MenuComponent from './components/MenuComponent.vue'
import { useProductStore } from './stores/product'
export default {
  name: 'App',
  setup() {
    const productStore = useProductStore()
    return {
      productStore,
    }
  },
  async mounted() {
    await this.productStore.fetchCategories()
    await this.productStore.fetchPromotions()
    await this.productStore.fetchProducts()
    await this.productStore.fetchGroups()
  },
  components: {
    CategoryComponent,
    PromotionComponent,
    ProductComponent,
    MenuComponent,
  },
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.Category-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: flex-start;
}

.Promotion-container {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.Product-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 50px;
}
</style>

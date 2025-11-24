// the state management library for vue
import { defineStore } from 'pinia'
// The library use to make HTTPS request to fetch API
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    groups: [],
    promotions: [],
    sections: [
      {
        id: 1,
        name: 'Featured Categories',
        activeFilter: 'All',
      },
      {
        id: 2,
        name: 'Popular Products',
        activeFilter: 'All',
      },
    ],
  }),

  getters: {
    // Convert groups array to filter format
    filterOptions: (state) => {
      return ['All', ...state.groups]
    },
    // Transform products to match component expectations
    transformedProducts: (state) => {
      return state.products.map((product) => {
        // Parse image path (remove the stringified array format)
        let imagePath = product.image
        try {
          const parsed = JSON.parse(imagePath)
          imagePath = Array.isArray(parsed) ? parsed[0] : imagePath
        } catch {
          // If parsing fails, use as is
        }
        // Remove escaped backslashes
        imagePath = imagePath.replace(/\\\\/g, '/')

        // Calculate original price from promotion percentage
        const originalPrice = product.promotionAsPercentage
          ? product.price / (1 - product.promotionAsPercentage / 100)
          : product.price

        // Generate badge text and type based on business logic
        let badge = null
        let badgeType = null

        // Priority 1: High discount (>= 15%) = Green discount badge
        if (product.promotionAsPercentage && product.promotionAsPercentage >= 15) {
          badge = `-${product.promotionAsPercentage}%`
          badgeType = 'discount'
        }
        // Priority 2: Hot badge (high sales >= 200)
        else if (product.countSold && product.countSold >= 200) {
          badge = 'Hot'
          badgeType = 'hot'
        }
        // Priority 3: Sale badge (low discount 1-14% OR moderate sales 100-199)
        else if (
          (product.promotionAsPercentage &&
            product.promotionAsPercentage > 0 &&
            product.promotionAsPercentage < 15) ||
          (product.countSold && product.countSold >= 100 && product.countSold < 200)
        ) {
          badge = 'Sale'
          badgeType = 'sale'
        }

        return {
          name: product.name,
          group: product.group || 'Hodo Foods',
          price: product.price,
          originalPrice: originalPrice,
          rating: product.rating || 0,
          ratingCount: product.countSold || 0,
          size: product.size || '500 gram',
          image: imagePath,
          badge: badge,
          badgeType: badgeType,
          inStock: product.instock !== false,
        }
      })
    },
    // Filter products based on active filter
    filteredProducts(state) {
      const activeFilter = state.sections[1].activeFilter
      if (activeFilter === 'All') {
        return this.transformedProducts
      }
      return this.transformedProducts.filter((product) => product.category === activeFilter)
    },
  },

  actions: {
    async fetchCategories() {
      const response = await axios.get('http://localhost:3000/api/categories').then((res) => {
        this.categories = res.data
        console.log('Success Category')
      })
      return response
    },
    async fetchPromotions() {
      const response = await axios.get('http://localhost:3000/api/promotions').then((res) => {
        this.promotions = res.data
        console.log('Success Promotion')
      })
      return response
    },
    async fetchProducts() {
      const response = await axios.get('http://localhost:3000/api/products').then((res) => {
        this.products = res.data
        console.log('Success Product')
      })
      return response
    },
    async fetchGroups() {
      const response = await axios.get('http://localhost:3000/api/groups')
      this.groups = response.data
      console.log('Success Groups:', this.groups)
      return response
    },
  },
})

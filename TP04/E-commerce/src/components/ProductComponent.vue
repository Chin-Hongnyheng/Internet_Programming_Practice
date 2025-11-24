<template>
  <div class="product-card">
    <!-- Badge -->
    <div v-if="badge" :class="['badge', badgeClass]">
      {{ badge }}
    </div>

    <!-- Product Image -->
    <div class="product-image">
      <img :src="image" :alt="name" />
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <!-- Category -->
      <p class="category">{{ group }}</p>

      <!-- Product Name -->
      <h3 class="product-name">{{ name }}</h3>

      <!-- Rating -->
      <div class="rating">
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            :class="['star', { filled: star <= Math.round(rating) }]"
          >
            ★
          </span>
        </div>
        <span class="rating-text">({{ ratingCount || rating }})</span>
      </div>

      <!-- Weight -->
      <p class="weight">{{ size }} grams</p>

      <!-- Price and Add Button -->
      <div class="product-footer">
        <div class="price-container">
          <span class="current-price">${{ price.toFixed(2) }}</span>
          <span v-if="originalPrice > price" class="original-price"
            >${{ originalPrice.toFixed(2) }}</span
          >
        </div>
        <button class="add-btn" @click="handleAddToCart">
          <span>Add</span>
          <span class="plus-icon">+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: null,
    },
    badgeType: {
      type: String,
      default: null,
    },
  },
  computed: {
    badgeClass() {
      return this.badgeType || 'default'
    },
  },
  methods: {
    handleAddToCart() {
      this.$emit('add-to-cart', this.id)
      console.log('Added to cart:', this.name)
    },
  },
}
</script>

<style scoped>
.product-card {
  width: 298px;
  height: 402px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 15px;
  padding: 8px;
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Quicksand', sans-serif;
  box-sizing: border-box;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.Product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  transform: translateY(-6px);
  cursor: pointer;
}
/* Badge Styles */
.badge {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 4px 12px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  z-index: 1;
}

.badge.discount {
  background-color: #3bb77e;
}

.badge.hot {
  background-color: #f74b81;
}

.badge.sale {
  background-color: #fdc040;
  color: #253d4e;
}

.badge.new {
  background-color: #3bb77e;
}

/* Product Image */
.product-image {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category {
  font-size: 12px;
  color: #adadad;
  margin: 0;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #253d4e;
  margin: 0;
  line-height: 1.4;
  min-height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Rating */
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #e0e0e0;
  font-size: 14px;
}

.star.filled {
  color: #ffc107;
}

.rating-text {
  font-size: 12px;
  color: #b6b6b6;
}

/* Weight */
.weight {
  font-size: 14px;
  color: #7e7e7e;
  margin: 0;
}

/* Product Footer */
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #3bb77e;
  white-space: nowrap;
}

.original-price {
  font-size: 15px;
  color: #adadad;
  text-decoration: line-through;
  white-space: nowrap;
}

/* Add Button */
.add-btn {
  background-color: #def9ec;
  color: #3bb77e;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background-color: #3bb77e;
  color: #fff;
}

.plus-icon {
  font-size: 16px;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .product-card {
    width: 180px;
    padding: 15px;
  }

  .product-image {
    height: 140px;
  }

  .product-name {
    font-size: 14px;
    min-height: 40px;
  }

  .current-price {
    font-size: 16px;
  }
}
</style>

Vue.component('product', {
    template: ` <div>
    <div class="welcomebox"></div><slot></slot>
    <div class="heading"><h1>Milkshakes</h1></div>
    <div class="section2">
    <div class="itemdetails">
        <h2>Chocolate Milkshake</h2>
        <p>$3.50</p>
        <p v-if="itemQuantity > 0">InStock</p>
        <p v-else>Out Of Stock</p>
       <p>Chocholate Milshake is gurateened to make your taste buds dance with joy</p>
       <button @click="addToBasket" :disabled="itemQuantity == 0" style="background-color: #18A0FB; color: #020351;border-radius: 40px;">Add to Basket</button>
    </div>
   </div>
   <div class="section2" style="margin-top:20px;">
    <h2 style="margin-top: 140px;">How our Chocolate Milkshakes are made !</h2>
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/DjBfsMO3qOw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>
   <div>
    <h2 class="heading">Reviews</h2>
    <div class="sectionreviews">
    <p v-if="reviews.length == 0">There are no reviews for this product.</p>
    <ol v-else>
    <li v-for="(review, index) in reviews" :key="index">
    <div class="row">
    <p class="column">{{ review.name }}</p>
    <p class="column">Rating:{{ review.rating }}</p>
    <p class="column">{{ review.feedback }}</p>
    </div>
    </li>
    </ol>
    </div>
    </div>
         
    <productReview @newreview="addReview"></productReview>
      
    </div>
     `,
    data() {
      return {
          reviews: [],
          itemname: 'ChocholateMilkshake',
          itemid: 123,
          itemQuantity: 10
      }
    },
      methods: {
        addToBasket() {
            this.$emit('add-to-basket', this.itemname),
            this.itemQuantity -= 1
        },
        addReview(productreview) {
          this.reviews.push(productreview)
        }
      }
  })


  Vue.component('productReview', {
    template: `
    <div class="section4">
      <form @submit.prevent="submit">
        <p class="mistake" v-if="mistakes.length">
          <b>Please correct the following mistake(s):</b>
          <ul>
            <li v-for="mistake in mistakes">{{ mistake }}</li>
          </ul>
        </p>
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        <p>
          <label for="review">Comment:</label>      
          <textarea id="review" v-model="feedback"></textarea>
        </p>
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <p>
          <input style="background-color: #18A0FB; color: #020351;border-radius: 40px;" type="submit" value="Submit">  
        </p>    
        </div>      
    </form>
    </div>
    `,
    data() {
      return {
        name: null,
        feedback: null,
        rating: null,
        mistakes: []
      }
    },
    methods: {
      submit() {
        this.mistakes = []
        if(this.name && this.feedback && this.rating) {
          let productreview = {
            name: this.name,
            feedback: this.feedback,
            rating: this.rating,
          }
          this.$emit('newreview', productreview)
          this.name = null
          this.feedback = null
          this.rating = null
        } else {
          if(!this.name) this.mistakes.push("Name required.")
          if(!this.feedback) this.mistakes.push("Comment required.")
          if(!this.rating) this.mistakes.push("Rating required.")
        }
      }
    }
  })
  
  var app = new Vue({
      el: '#app',
      data: {
        basket: [],
        showBasket: false
      },
      methods: {
        updateBasket(itemname) {
          this.basket.push(itemname)
        }
      }
  })
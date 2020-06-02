<template>
<q-page class="bg-grey-4 q-pa-lg">
  <div class="q-pa-md row items-start q-gutter-md flex flex-center bg-grey-4">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-h q-mb-lg text-center">CATEGORIAS</div>
        <q-select class="q-mb-lg" outlined color="amber-10" v-model="selected_category" :options="categories" label="Categorias"/>
        
      </q-card-section>
    </q-card>

    <q-card class="my-card1" v-for="n in images" :key="n.id">
        <q-card-section>
            <q-img :src="n.url" class="q-mb-md imgsize"/>
            <div class="text-subtitle q-mt-lg text-center">MIAUW</div>
        </q-card-section>
    </q-card>

  </div>
</q-page>
</template>

<script>
export default {
  data () {
    return {
        categories: [],
        selected_category:{},
        images: [],
        order:'Desc',
        page: 1,
        limit: 3,
        pagination_count: 0, //default until we get a result with the 'Pagination-Count' header in the response
    }
  },
  created () {
      this.getCategories();
  },
  watch: {
    // if the user changes any of these values, then make a new request to the API
    page: function() {
        this.getImages(); 
    },
    limit: function()
    {
        this.getImages();
    },
    order: function()
    {
        this.getImages();
    },
    selected_category: function()
    {
        console.log(this.selected_category)
        this.getImages();
    }
  },
  computed: {
    getNumPages: function()
    {
        return Math.floor(this.pagination_count / this.limit) | 0;
    }
  },
  methods: {
    async nextBtn () {
        this.page++;
        await this.getImages();
    },
    async getCategories () {
        try{
            this.$axios.defaults.headers.common['d9abbb1b-f94a-4ebf-b592-b2466f57d815'] = "d9abbb1b-f94a-4ebf-b592-b2466f57d815" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
                    
            let response = await this.$axios.get('https://api.thecatapi.com/v1/categories/' ) 
            this.categories = response.data;
            console.log("-- ("+this.categories.length +") Categories from TheCatAPI.com")
                    
            // pick one to display initially
            this.selected_category = this.categories[2]
        }catch(err){
            console.log(err)
        }
    },
    async getImages () {
        try{
            this.$axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key
                    
            let query_params = {
                limit: this.limit,
                order: this.order,
                page: this.page-1,
                category_ids: this.selected_category.id
        }

            let response = await this.$axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params } ) 
                    
            this.pagination_count = response.headers['pagination-count'];
            this.images = response.data 

            console.log("-- ("+this.images.length +") Images from TheCatAPI.com")
            console.log( this.pagination_count ,'images available for this query.')
                    
        }catch(err){
            console.log(err)
        }
    }
  },
}
</script>

<style lang="sass">
  .my-card 
    width: 100%
    max-width: 1250px
    background-color: #fff
  .my-card1
    width: 100%
    max-width: 405px
    background-color: #fff
    height: 380px
  .imgsize 
    height: 300px
</style>

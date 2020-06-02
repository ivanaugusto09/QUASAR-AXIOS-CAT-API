<template>
<q-page class="bg-grey-4 q-pa-lg">
  <div class="q-pa-md row items-start q-gutter-md flex flex-center bg-grey-4">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-h q-mb-lg text-center">FAVORITAR O GATOS</div>
        <div class="row justify-center">
          <q-btn
          color="amber-10" @click="getImages"
          class="q-mb-lg"
          >CAT IT
        </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card1" v-for="n in images" :key="n.id">
        <q-card-section>
            <q-img :src="n.url" class="q-mb-md imgsize"/>
        </q-card-section>
        <q-card-actions>
            <div class="justify-center">
            <q-btn
                color="green" @click="favouriteImage(n.id)"
                class="q-ml-sm"
                >Favoritar
            </q-btn>
            </div>
        </q-card-actions>
    </q-card>
    <q-card class="my-card">
        <div class="text-h6 text-h q-mb-lg q-mt-lg text-center">SEUS GATOS FAVORITOS</div>
        <q-card-section>
            <q-pagination
                class="justify-center"
                v-model="page"
                color="amber-10"
                :max="getNumPages"
                :max-pages="6"
                :boundary-numbers="true"
            /> 
        </q-card-section>
    </q-card>
    <q-card class="my-card1" v-for="n in favourites" :key="n.id">
        <q-card-section >
            <q-img :src="n.image.url" class="q-mb-md imgsize"/>
        </q-card-section>
        <q-card-actions>
            <q-btn color="red"  @click="deleteFavouriteImage(n.id)">Deletar</q-btn>
        </q-card-actions>
    </q-card>
  </div>
</q-page>
</template>

<script>
export default {
  data () {
    return {
        images: [],
        favourites:[],
        page: 1,
        error_message:null,
        limit: 3,
        pagination_count: 0, 
    }
  },
  created () {
    this.getImages();
    this.getFavourites();
  },
  watch: {
    page: function() {
        this.getFavourites();
    },
    limit: function()
    {
        this.getFavourites();
    },
  },
  computed: {
    getNumPages: function() {
        return Math.floor(this.pagination_count / this.limit) | 0;
    }
  },
  methods: {
    async getImages () {
      try {

          let query_params = {
              limit: this.limit
          }
          this.$axios.defaults.headers.common['x-api-key'] = "d9abbb1b-f94a-4ebf-b592-b2466f57d815"
          let response = await this.$axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params } )
          this.images = response.data 

      }catch(err){
          console.log(err)
      }
    },
    async getFavourites () {
        try{
            this.$axios.defaults.headers.common['x-api-key'] = "d9abbb1b-f94a-4ebf-b592-b2466f57d815"
                    
            let query_params = {
                limit: this.limit,
                order: 'DESC',
                page:  this.page-1,
        }
            let response = await this.$axios.get('https://api.thecatapi.com/v1/favourites', { params: query_params } ) 
            this.favourites = response.data 
            this.pagination_count = response.headers['pagination-count'];
            this.clearError();
        }catch(err){
            console.log(err)
        }
    },
    async favouriteImage (image_id) {
        try{
            let post_body = {
                image_id: image_id,
                sub_id:"User-123"
            }
            let response = await this.$axios.post('https://api.thecatapi.com/v1/favourites', post_body ) 
            this.page = 1;
            this.getFavourites()
        }catch(error){
            console.log(error)
            this.error_message = error.response.data.message
        }
},
    async deleteFavouriteImage (favourite_id) {
        try{
            let response = await this.$axios.delete('https://api.thecatapi.com/v1/favourites/'+favourite_id ) 
            this.favourites = response.data 
            this.page = 1;
            this.getFavourites()

        }catch(err){
            console.log(err)
        }
    },
    async clearError () {
        this.error_message = null
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
    height: 450px
  .imgsize 
    height: 300px

</style>

<template>
<q-page class="bg-grey-4 q-pa-lg">
  <div class="q-pa-md row items-start q-gutter-md flex flex-center bg-grey-4">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-h q-mb-lg text-center">GERAR GATO ALEATORIO</div>
        <div class="row justify-center">
          <q-btn
          color="amber-10" @click="getImage"
          class="q-mb-lg"
          >CAT IT
        </q-btn>
        </div>
        <q-img :src="image.url" />
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
      image: {url: ""},
    }
  },
  created () {
    this.getImage();

  },
  methods: {
    async getImage () {
      try {
      this.$axios.defaults.headers.common['d9abbb1b-f94a-4ebf-b592-b2466f57d815'] = "d9abbb1b-f94a-4ebf-b592-b2466f57d815"

      let response = await this.$axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )

      this.image = response.data[0]

      console.log("-- Image from TheCatAPI.com")
      console.log("id:", this.image.id)
      console.log("url:", this.image.url)

      }catch(err){
        console.log(err)
      }
    },
  },
}
</script>

<style lang="sass">
  .my-card 
    width: 100%
    max-width: 750px
    background-color: #fff

</style>

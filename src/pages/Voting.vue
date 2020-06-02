<template>
<q-page class="bg-grey-4 q-pa-lg">
  <div class="q-pa-md row items-start q-gutter-md flex flex-center bg-grey-4">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-h q-mb-lg text-center">VOTAÇÃO DE GATINHOS</div>
        <div class="row justify-center q-mb-lg">
          <q-input 
          class="col-6"
          label="sub_id"
          placeholder=""
          v-model="sub_id"/>
        </div>
        <div class="row justify-center q-gutter-md">
          <q-btn
          color="green" @click="voteUp"
          class="q-mb-lg"
          size="lg"
          >LOVE IT
        </q-btn>
        <q-btn
          color="red" @click="voteDown"
          class="q-mb-lg"
          size="lg"
          >NOPE IT
        </q-btn>
        </div>
        <q-img :src="image.url"/>
        <div class="text-subtitle q-mt-lg text-center">MIAUW</div>
      </q-card-section>
    </q-card>
  </div>
  <!-- <div class="row justify-center">
        <q-table
            title="Votos"
            :data="votes"
            :columns="headers"
            row-key="name"
            
        />
    </div> -->
</q-page>
</template>

<script>
export default {
  data () {
    return {
      image: {url: ""},
      sub_id: "d9abbb1b-f94a-4ebf-b592-b2466f57d815",
      image:{},
      votes:[],
        headers: [
            { name: 'date', label: 'Date' },
            { name: 'image_id', label: 'Image-ID' },
            { name: 'value', label: 'Valor' },
            { name: 'sub_id', label: 'Sub-ID' },
            { name: 'country', label: 'PAÍS' }
          ],
    }
  },
  created () {
    this.getImage();
    this.getVotes();
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
    async voteUp () {

      let body = {
        image_id: this.image.id,
        sub_id: this.sub_id,
        value: 1 // Voting up (you like it) so send 1
      }
      let response = await this.$axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
        await this.getImage();
        await this.getVotes();
      },
    async voteDown () {

      let body = {
        image_id: this.image.id,
        sub_id: this.sub_id,
        value: 0 // Voting down (you don't like) so send 0
      }
      let response = await this.$axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
        await this.getImage();
        await this.getVotes();
      },
    async getVotes () {

      let response = await this.$axios.get('https://api.thecatapi.com/v1/votes', { params: { order:"DESC", limit:25 } } ) // Get the last 25 votes

      response.data.forEach(element => {
        //element.created_at = new Date(element.created_at).toString();// full time string including timezone
        element.created_at = new Date(element.created_at).toJSON().slice(0,10)// just use the date for now
      });

      this.votes = response.data;

    }
  },
}
</script>

<style lang="sass">
  .my-card 
    width: 100%
    max-width: 750px
    background-color: #fff

</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="row bg-amber-10 text-white">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        :width="270"
        :breakpoint="1024"
        class="hide-me"
        @click="leftDrawerOpen = !leftDrawerOpen"
          
      />
      <q-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer; font-family: 'Kaushan Script', cursive;">CAT LOVERS</router-link>
      </q-toolbar-title>
      <q-space></q-space>
      <q-btn :to="item.link" v-for="item in menuItems" :key="item.title" flat dense :icon="item.icon" class="q-mr-xs hide-btn">{{ item.title }}</q-btn>

    </q-toolbar>

    <q-drawer v-model="leftDrawerOpen" bordered :breakpoint="890" content-class="bg-grey-1 hide-me">
      <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item v-for="item in menuItems" :key="item.title" :to="item.link" clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                {{ item.title }}
              </q-item-section>
            </q-item>          
        
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
  
    }
  },
  computed: {
    menuItems () {
      let menuItems = [ 
        { icon: 'pets', title: 'CATS', link: '/'},      
        { icon: 'how_to_vote', title: 'VOTAR', link: '/voting'},
        { icon: 'category', title: 'CATEGORIA', link: '/category'},
        { icon: 'waves', title: 'RAÇAS', link: '/login'},
      ]
      return  menuItems     
    }
    
  }
}
</script>

<style lang="sass" scoped>
.q-header
  padding-top: 5px
  padding-bottom: 5px
.hide-me
  display: none
.hide-btn
  display: flex

.menu-list .q-item
  border-radius: 0 32px 32px 0
@media (max-width: 890px)
  .hide-me
    display: flex
  .hide-btn
    display: none
  .q-toolbar
    padding-right: 5px
</style>


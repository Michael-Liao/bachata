<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main>
      <MainPage/>
    </v-main>
  </v-app>
</template>

<script>
import MainPage from './components/MainPage';

export default {
  name: 'App',

  components: {
    MainPage,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
    <div id="main">
      <navbar></navbar>
      <div id="main-content">
        <router-view/>
      </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
};

</script>

<style scoped>
#main {
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
}

#main-content {
  height: 100vh;
  overflow: auto;
  flex-grow: 1;
}
</style>

<template>
    <div id="main">
      <navbar></navbar>
      <router-view/>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};

</script>

<style scoped>
#main {
  max-height: 100vh;
  max-width: 100vw;
}
</style>

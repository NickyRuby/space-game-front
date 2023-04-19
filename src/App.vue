<template>
  <router-view />
</template>

<script>

import router from '@/router';
import store from '@/store'

export default {
  inject: ["store"],
  mounted() {
    if (store.isLoggedIn) {
      router.push('/start')
    } else {
      router.push('/login');
    }
}
}

</script>

<style>

/* .v-field__field {
  background-color: aqua !important;
  border-radius: 8px !important;
  outline: 0px;
  height: 1.5rem;
}

.v-field--active {
  padding: 16px 24px I !important;
} */

html {
  font-family: Georgia, 'Times New Roman', Times, serif;
}

</style>
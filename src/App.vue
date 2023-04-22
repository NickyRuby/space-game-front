<template>
  <router-view />
  <Header /> 
</template>

<script>

import router from '@/router';
import store from '@/store'

export default {
  inject: ["store"],
  mounted() {
    // if (store.isLoggedIn) {
    //   router.push('/start')
    // } else {
    //   router.push('/login');
    // }
}
}

</script>

<style>

body {
  background: linear-gradient(236.62deg, #F3F5F9 15.21%, rgba(249, 255, 251, 0.50457) 54.37%, rgba(224, 224, 224, 0) 93.52%) !important;
  font-family: 'Rubik', sans-serif;
  font-weight: 500; 
}

.v-application {
  background: none !important;
}

.v-card {
  border-radius: 16px !important;
  padding: 40px 32px !important;;  
  box-shadow: 0px 24px 48px rgba(209, 209, 209, 0.5) !important;
  border: 1px solid #F9F9F9 !important;
}

.v-card-item {
  padding: 16px 0px 16px 0px !important;
}

.v-card-title {
  font-size: 24px !important;
}

.v-field__outline {
  --v-field-border-opacity: 0.15 !important;
  border-radius: 8px !important;
}

/* .v-field__outline__start, .v-field__outline__notch, .v-field__outline__end { */

.v-input__details {
  padding: 4px 0px 16px 0px !important;
}

.v-btn--size-large {
    --v-btn-size: 1rem;
    --v-btn-height: 56px !important;
    border-radius: 8px !important;
    box-shadow: none !important;
}

.v-field--variant-solo { 
  background: #FAFAFA !important;
  border: 1px solid #E7E7E7 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

:root {
  --arc-palette-background:  #3668fef4 !important;
  --arc-palette-backgroundExtra: #000 !important;
}

</style>
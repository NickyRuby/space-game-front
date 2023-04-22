<template>
  <v-toolbar class="elevation-4">
    <v-icon end icon="mdi-saturn"></v-icon>
    <v-toolbar-title>Космічна гра</v-toolbar-title>
     <!-- <div v-if="store.isLoggedIn" style="width: 100%; height: 40px;  line-height: 24px; text-align: left; margin-right: 16px;" @click="logOut">Log out</div> -->
  </v-toolbar>
</template>

<script>

import store from '@/store'
import router from '@/router';

export default {
    data() {
        return {
            isLoggedIn: store.isLoggedIn
        }
    },
    methods: {
        logOut() {
            console.log('want to log out')
            fetch('https://spacegame-377714.lm.r.appspot.com//api/me/sessions', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store.auth),
            mode: 'cors',
            credentials: 'include'
            }).then(response => response.json()).then(response => {
            if (response.message) {
                store.auth = {}
                router.push('/login');
            }
            }).catch(err => console.error(err));
        },
    },
    mounted() {
        console.log(store);
    }
}

</script>

<style>
.v-toolbar {
    background-color: white !important;

}

.v-toolbar-title {
    font-size: 16px !important;
}

</style>
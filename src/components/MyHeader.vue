<template>
  <v-toolbar>
    <v-toolbar-title>🪐 </v-toolbar-title>
     <v-btn class="ma-2" style="font-size: 24px;" variant="text">{{patronus}}</v-btn>
     <div v-if="isLoggedIn"  @click="logOut">
        <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-exit-to-app"
        color="gray"
        ></v-btn>
    </div>
  </v-toolbar>
</template>

<script>

import store from '@/store'
import router from '@/router';

export default {
    props: {
        patronus: String,
        isLoggedIn: Boolean
    },
    data() {
        return {
            date: new Date().toISOString().slice(0, 10),
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
        console.log('from header:')
        console.log(store);
    },
    watch : {
        store(){
            this.patronus = store.auth.patronus;
            this.isLoggedIn = store.isLoggedIn;
        }
    }
}

</script>

<style>
.v-toolbar {
    background-color: white !important;

}

.v-toolbar-title {
    font-size: 24px !important;
}

</style>
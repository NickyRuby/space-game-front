<template>
    <v-toolbar>
        <v-icon end icon="mdi-earth"></v-icon>
        <v-toolbar-title>Космічна гра</v-toolbar-title>
    </v-toolbar>
    <div v-if="!response">
        <div class="d-flex align-center flex-column" style="margin-top: 240px;">
            <v-card title="👾 Привіт" width="800" style="padding: 24px 24px;">
                <v-form @submit.prevent="sendData">
                    <v-text-field label="Користувач" v-model="username" required>
                    </v-text-field>
                    <v-text-field label="Пароль" v-model="password" required>
                    </v-text-field>
                    <v-btn type="submit" class="mt-2" size="large" color="blue">🚀 залогінитись</v-btn>
                </v-form>
                <div style="width:100%; text-align: center; margin-top: 16px; color: red;" v-if="errors">Oops!
                    {{ apiAnswerMessage }}</div>
            </v-card>
        </div>
    </div>
</template> 
    
<script>
import router from '@/router';
import store from '@/store'

export default {
    inject: ["store"],
    data() {
        return {
            username: '',
            password: '',
            errors: false,
            apiAnswerMessage: '',
            response: null
        }
    },
    methods: {
        handleSubmit() {
            // router.push('/finish')

        },
        async sendData() {
            console.log('logging user...');
            const data = {
                username: this.username,
                password: this.password
            }
            fetch('https://spacegame-377714.lm.r.appspot.com//api/me/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'cors',
                credentials: 'include'
            }).then(response => response.json()).then(response => {
                console.log(response)
                if (response.error) {
                    this.isLoggedIn = false;
                    this.errors = true;
                    this.apiAnswerMessage = response.error;

                } else {
                    store.isLoggedIn = true;
                    console.log(store);
                    store.auth = data;
                    router.push('/start');
                }
            }
            ).catch(err => console.log(err));

        }
    },
}
</script>

<style></style>

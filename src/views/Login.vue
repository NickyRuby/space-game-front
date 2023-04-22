<template>
    <MyHeader />
    <div v-if="!response">
        <div class="d-flex align-center flex-column justify-center h-screen">
            <v-card title="Привіт" width="640" style="padding: 24px 24px;">
                <v-form @submit.prevent="sendData">
                    <v-text-field label="Користувач" v-model="username" variant="solo" required>
                    </v-text-field>
                    <v-text-field label="Пароль" v-model="password" variant="solo" required>
                    </v-text-field>
                    <v-btn type="submit" :loading="loading" block class="mt-2 rounded-lg" size="large" color="blue">{{ loading ? 'Loading...' : '🚀 залогінитись' }}</v-btn>
                </v-form>
                <div style="width:100%; text-align: center; margin-top: 16px; color: red;" v-if="errors">Oops!
                    {{ apiAnswerMessage }}</div>
            </v-card>
        </div>
    </div>
</template> 
    
<script>
import MyHeader from '@/components/MyHeader.vue';
import router from '@/router';
import store from '@/store';

export default {
    inject: ["store"],
    data() {
        return {
            loading: false,
            username: "",
            password: "",
            errors: false,
            apiAnswerMessage: "",
            response: null
        };
    },
    methods: {
        handleSubmit() {
            // router.push('/finish')
        },
        async sendData() {
            this.loading = true;
            console.log("logging user...");
            const data = {
                username: this.username,
                password: this.password
            };
            fetch("https://spacegame-377714.lm.r.appspot.com//api/me/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                mode: "cors",
                credentials: "include"
            }).then(response => response.json()).then(response => {
                console.log(response);
                if (response.error) {
                    this.loading = false;
                    this.isLoggedIn = false;
                    this.errors = true;
                    this.apiAnswerMessage = response.error;
                }
                else {
                    store.isLoggedIn = true;
                    console.log(store);
                    store.auth = data;
                    router.push("/start");
                }
            }).catch(err => console.log(err));
        }
    },
    mounted() {
        console.log("store state:");
        console.log(store);
        document.title = "Космічна гра";
    },
    components: { MyHeader }
}
</script>

<style></style>

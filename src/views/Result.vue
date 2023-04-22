<template>
    <div v-if="response">
        <div class="d-flex align-center flex-column justify-center" style="margin-top: 240px;">
            <v-card title="Як результати?" width="640" style="padding: 24px 24px;">
                <v-form @submit.prevent="handleSubmit">
                    <v-text-field v-for="question in response.questions.finish " :label=question.ua
                        v-model="answers.answers[question.id]" variant="solo" :error-messages="validationErrors.answers ? validationErrors.answers[question.id] : ''" required>
                    </v-text-field>
                    <v-container>
                        <v-row cols="12" md="4" style="display: inline-block;">
                            <div v-for="item, index in response.fields.finish">
                                <div v-if="item.schema.type == 'enum' || item.schema.type == 'radio'">
                                    {{ item.title.ua }}
                                    <v-row cols="12" md="4">
                                        <div v-for="option in item.schema.values">
                                            <v-checkbox v-model="answers.data[item.id]" :label="option" :value="option" :error-messages="validationErrors.data ? validationErrors.data[item.id] : ''"></v-checkbox>
                                        </div>
                                    </v-row>
                                </div>
                                <div v-else-if="item.schema.type">
                                    <v-text-field :label=item.title.ua v-model="answers.data[item.id]" 
                                        :class="{ 'non-first': index != 0 }" variant="solo" :error-messages="validationErrors.data ? validationErrors.data[item.id] : ''" ></v-text-field>
                                </div>
                            </div>
                        </v-row>
                    </v-container>
                    <v-btn type="submit" block class="mt-2" size="large" color="blue">🚀 Полетіли</v-btn>
                </v-form>
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
            validationErrors: {},
            response: null,
            answers: {
                answers: {},
                data: {}
            }
        }
    },
    methods: {
        async handleSubmit() {
            console.log(this.answers);
            fetch('https://spacegame-377714.lm.r.appspot.com//api/flights/finish', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.answers),
                mode: 'cors',
                credentials: 'include'
            }).then(response => response.json()).then(response => {
                if (response.errors) {
                    console.log(response.errors);
                    console.log('there are errors')
                    this.validationErrors = response.errors;
                    console.log(this.validationErrors);
                }
                else if (response.message) {
                    console.log('all good');
                    console.log(response.message);
                    this.validationErrors = {}
                    router.push('/start');
                }
            }).catch(err => console.error(err));
        },
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
        }
    },
    mounted() {
        console.log('store state at result:');
        console.log(store);

        fetch('https://spacegame-377714.lm.r.appspot.com//api/me', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            console.log(data);
            this.response = data;
            store.isLoggedIn = true;
        }).catch(err => console.error(err));
    }
}
</script>
    
<style>
.non-first {
    margin-left: 16px;
}
</style>
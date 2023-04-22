<template>
  <div v-if="response">
    <MyHeader :patronus="store.auth.patronus" :isLoggedIn="store.isLoggedIn"/>
    <div class="d-flex align-center flex-column justify-center h-screen">
      <v-card :title="store.test.enterTitle" width="640" style="padding: 24px 24px; font-size: 40px ;">
        <div v-if="!hasStarted">
        <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field v-for="question in response.questions.start " :label=question.ua
            v-model="answers.answers[question.id]" variant="solo" :error-messages="validationErrors.answers ? validationErrors.answers[question.id] : ''">
          </v-text-field>
          <v-container>
            <v-row cols="12" md="4">
              <v-text-field v-for="item, index in response.fields.start" :label=item.title.ua variant="solo"
              v-model="answers.data[item.id]" :class="{ 'non-first': index != 0 }" :error-messages="validationErrors.data ? validationErrors.data[item.id] : ''"></v-text-field>
              <v-btn type="submit" block class="mt-2" size="large" color="blue">🚀 Полетіли</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </div> 
      <div v-else-if="hasStarted">
           <Timer /> 
      </div>
      </v-card>
    </div>
</div>

</template>

<script>
import router from '@/router';
import store from '@/store'
import Timer from '@/components/Timer.vue'
import MyHeader from '@/components/MyHeader.vue';


export default {
  inject: ["store"],
  data() {
    return {
      hasStarted: false,
      response: null,
      valid: false,
      validationErrors: {},
      answers: {
        answers: {},
        data: {}
      }
    }
  },
  methods: {
    async handleSubmit() {
      console.log(this.answers);
      fetch('https://spacegame-377714.lm.r.appspot.com//api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.answers),
        mode: 'cors',
        credentials: 'include'
      }).then(response => response.json()).then(response => {
        console.log('response:')
        console.log(response);
        if (response.errors) {
          console.log(response.errors);
          console.log('there are errors')
          this.validationErrors = response.errors;
          console.log(this.validationErrors);
        } else {
          console.log('showing timer');
          this.hasStarted = true;
          store.test.enterTitle = this.answers.answers.Q1;
          this.validationErrors = {}
          // router.push('/finish');
        }
        console.log(response);
      }).catch(err => {
        console.log('catching error');
      });
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
    document.title = 'Виліт'
    console.log('store state at start:');
    console.log(store);
    console.log('mounting');
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
      store.auth = data;
    }).catch(err => console.error(err));
  }
}
</script>

<style>
.non-first {
  /* Add margin to non-first elements */
  margin-left: 16px;
}

</style>

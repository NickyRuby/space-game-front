<template>
  <v-toolbar>
    <v-icon end icon="mdi-saturn"></v-icon>
    <v-toolbar-title>Космічна гра
    </v-toolbar-title>
    <div v-if="response">
      <div @click="logOut" style="width: 100%; line-height: 24px; text-align: left; margin-right: 16px;">Log out</div>
    </div>
  </v-toolbar>
  <div v-if="response">
    <div class="d-flex align-center flex-column" style="margin-top: 240px;">
      <v-card :title="response.patronus" width="800" style="padding: 24px 24px; font-size: ;">
        <v-form @submit.prevent="handleSubmit">
          <v-text-field v-for="question in response.questions.start " :label=question.ua
            v-model="answers.answers[question.id]" required>
          </v-text-field>
          <v-container>
            <v-row cols="12" md="4">
              <v-text-field v-for="item, index in response.fields.start" :label=item.title.ua
              v-model="answers.data[item.id]" :class="{ 'non-first': index != 0 }" required></v-text-field>
              <v-btn type="submit" block class="mt-2" size="large" color="blue">🚀 Полетіли</v-btn>
            </v-row>
          </v-container>
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
      fetch('https://spacegame-377714.lm.r.appspot.com//api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.answers),
        mode: 'cors',
        credentials: 'include'
      }).then(response => response.json()).then(response => {
        console.log(response);
        console.log('going to finish');
        router.push('/finish');
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

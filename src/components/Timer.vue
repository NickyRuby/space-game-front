<template>
    <div class="timer">
      <v-progress-circular
          :size="280"
          :width="8"
          :model-value="progress"
          color="primary"
          >
        <h1>{{ minutes }}:{{ seconds }}</h1>
        <div class="actions">
        <v-btn @click="startTimer" v-if="!isRunning && !isPaused">Start</v-btn>
        <v-btn @click="pauseTimer" v-if="isRunning && !isPaused">Pause</v-btn>
        <v-btn @click="resumeTimer" v-if="!isRunning && isPaused">Resume</v-btn>
        <v-btn @click="resetTimer" v-if="!isRunning && isPaused">Reset</v-btn>
      </div>
      </v-progress-circular>
      <v-btn @click="finishEnter" style="margin-top: 48px !important;" type="submit" block class="mt-2" size="large" color="blue">🚀 Закінчити виліт</v-btn>
      </div>
</template>
  
<script>
import  store from '@/store';
import router from '@/router';

export default {
    data() {
      return {
        progress: 0,
        timer: null,
        secondsLeft: 25 * 60,
        isRunning: false,
        isPaused: false,
      };
    },
    computed: {
      minutes() {
        return Math.floor(this.secondsLeft / 60).toString().padStart(2, '0');
      },
      seconds() {
        return (this.secondsLeft % 60).toString().padStart(2, '0');
      },
    },
    methods: {
      startTimer() {
        this.isRunning = true;
        this.timer = setInterval(() => {
          if (this.secondsLeft > 0) {
            this.secondsLeft--;
            this.progress =  Math.floor(100 - (this.secondsLeft / 15));
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.isRunning = false;
          }
        }, 1000);
      },
      pauseTimer() {
        clearInterval(this.timer);
        this.timer = null;
        this.isPaused = true;
        this.isRunning = false;
      },
      resumeTimer() {
        this.startTimer();
        this.isPaused = false;
        this.isRunning = true;
      },
      resetTimer() {
        this.secondsLeft = 25 * 60;
        this.isPaused = false;
        this.isRunning = false;
      },
      // todo: it pushes but not updating, just route change 
      finishEnter() {
        console.log('finishing');
        router.push('/finish');
      },
    },
    watch : {
      secondsLeft() {
      document.title = '' + this.minutes + ":" + this.seconds + ' · ' + store.test.enterTitle;
  }
    },
    mounted() {
        console.log('store state at timer:');
        console.log(store);
        this.startTimer();
    }
  };
  </script>
  
  <style scoped>
  .timer {
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-items: center;
    align-items: center;
    padding-top: 32px;
  }
  
  .v-progress-circular__content {
    margin-top: 40px !important;
  }

  h1 {
    font-size: 48px;
  }
  
  .v-btn {

    font-size: 14px;
    padding: 10px;
    margin-top: 24px;
  }
  </style>
  
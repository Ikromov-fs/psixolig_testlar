<template>
  <div>0{{ minutes }} : {{ seconds > 9 ? seconds : `0${seconds}` }}</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const minutes = ref(1);
const seconds = ref(60);

function updateTime() {
  seconds.value--;
  if (seconds.value === 0) {
    minutes.value--;
    seconds.value = 60;
  }
}

function timrFunc() {
  const time = setInterval(() => {
    updateTime();
    if (minutes.value === 0 && seconds.value <= 1) {
      seconds.value -= 1;
      clearInterval(time);
      emit("endTime", true);
    }
  }, 1000);
}

function expFunction() {
  minutes.value = 1;
  seconds.value = 60;
  timrFunc();
}

defineExpose({
  expFunction,
});

onMounted(() => {
  timrFunc();
});
const emit = defineEmits(["endTime"]);
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BasicNetwork from '../components/BasicNetwork.vue';
import TalentPoints from '../components/TalentPoints.vue';

const talentPoints = ref(10);
const talentsTaken = new Set();

var toggle = (id: number) => {
  talentsTaken.has(id) ? talentsTaken.delete(id) : talentsTaken.add(id)
  console.log(talentsTaken);
  talentPoints.value = 10 - talentsTaken.size;
}

</script>

<template>
  <main>
    <TalentPoints v-bind:points="talentPoints" />
    <BasicNetwork @node-toggled="toggle" :width=1080 :height=720 />
  </main>
</template>

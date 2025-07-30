<script setup lang="ts">
import BasicNetwork from '../components/BasicNetwork.vue';
import TalentPoints from '../components/TalentPoints.vue';

const talentPoints = 10;
</script>

<template>
  <main>
    <TalentPoints :points=talentPoints />
    <BasicNetwork/>
  </main>
</template>

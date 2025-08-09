<script setup lang="ts">
import { ref } from 'vue';
import TalentWeb from '../components/TalentWeb.vue';
import TalentPoints from '../components/TalentPoints.vue';
import SkillPannel from '@/components/SkillPannel.vue';

const talentPoints = ref(10);
const talentsTaken = new Set<number>();

var toggle = (id: number) => {
  talentsTaken.has(id) ? talentsTaken.delete(id) : talentsTaken.add(id)
  talentPoints.value = 10 - talentsTaken.size;
}

</script>

<template>
  <main>
    <TalentPoints v-bind:points="talentPoints" />
    <div class="flex-container">
      <div class="skills-pannel">
        <SkillPannel :talents="talentsTaken" :key="talentPoints"/>
      </div>
      <div class="talents-diagram">
        <TalentWeb @node-toggled="toggle" :height=720 />
      </div>
    </div>
  </main>
</template>

<style>
.skills-pannel {
  width: 25%;
}

.talents-diagram {
  width: 75%;
}
</style>

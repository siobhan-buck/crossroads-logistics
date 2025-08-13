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
    <div class="flex-container">
      <div class="talents-diagram">
        <TalentPoints v-bind:points="talentPoints" />
        <TalentWeb @node-toggled="toggle" :height=790 />
      </div>
      <div class="skills-pannel">
        <SkillPannel :talents="talentsTaken" :key="talentPoints"/>
      </div>
    </div>
  </main>
</template>

<style>
.skills-pannel {
  width: 34%;
}

.talents-diagram {
  width: 66%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import TalentWeb from '../components/TalentWeb.vue';
import BuildPoints from '../components/BuildPoints.vue';
import SkillPannel from '@/components/SkillPannel.vue';

const talentPoints = ref(3);
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
        <BuildPoints v-bind:points="talentPoints" type="talent" />
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

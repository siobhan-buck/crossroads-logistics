<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TalentWeb from '../components/TalentWeb.vue';
import BuildPoints from '../components/BuildPoints.vue';
import SkillPannel from '@/components/SkillPannel.vue';
import type {PointsData} from '../stores/builder.types';
import pointsData from '../assets/build_points.json';
import { useCharacterStore } from '@/stores/character';

const data: Array<PointsData> = pointsData;
const character = useCharacterStore();

const talentPoints = ref(0);
const skillPoints = ref(0);

const talentsTaken = new Set<number>();

var toggle = (id: number) => {
  talentsTaken.has(id) ? talentsTaken.delete(id) : talentsTaken.add(id)
  talentPoints.value = 10 - talentsTaken.size;
}

onMounted(() => {
    pointsData.forEach((d) => {
        if (d.episode <= character.episodes) {
            talentPoints.value += d.talents;
            skillPoints.value += d.skills;
        }
    });
});

</script>

<template>
  <main>
    <div class="flex-container">
      <div class="talents-diagram">
        <BuildPoints v-bind:points="talentPoints" type="talent"/>
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TalentWeb from '../components/TalentWeb.vue';
import BuildPoints from '../components/BuildPoints.vue';
import SkillPannel from '@/components/SkillPannel.vue';
import SimpleCounter from './SimpleCounter.vue';
import pointsData from '../assets/build_points.json';
import { useCharacterStore } from '@/stores/character';

const character = useCharacterStore();

const talentPoints = ref(0);
const skillPoints = ref(0);

var toggle = (id: number) => {
  if (character.talentsTaken.has(id)) {
    talentPoints.value++;
    character.talentsTaken.delete(id);
  } else {
    talentPoints.value--;
    character.talentsTaken.add(id);
  }
}

var skillTransaction = (points: number) => {
  skillPoints.value += points;
}

var episodeTransaction = (points: number) => {
  character.episodes += points;
  refreshPoints();
}

var refreshPoints = () => {
  talentPoints.value = 0;
  skillPoints.value = 0;
  pointsData.forEach((d) => {
      if (d.episode <= character.episodes) {
          talentPoints.value += d.talents;
          skillPoints.value += d.skills;
      }
  });
  let epilogues = character.episodes - pointsData.length + 1
  if (epilogues > 0) {
    pointsData.sort((a, b) => {
      return b.episode - a.episode;
    })
    let endingEpisode = pointsData[0];
    talentPoints.value += epilogues * endingEpisode.talents;
    skillPoints.value += epilogues * endingEpisode.skills;
  }
}

onMounted(() => {
  refreshPoints();
});

</script>

<template>
  <main>
    <SimpleCounter @diff="episodeTransaction" title="episodes" :value="character.episodes"></SimpleCounter>
    <div class="flex-container">
      <div class="talents-diagram">
        <BuildPoints v-bind:points="talentPoints" type="talent"/>
        <TalentWeb @node-toggled="toggle" :height=790 />
      </div>
      <div class="skills-pannel">
        <SkillPannel @skill-transaction="skillTransaction" v-bind:skill-points="skillPoints" :key="talentPoints"/>
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

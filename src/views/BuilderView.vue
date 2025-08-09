<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from 'vue';
import TalentWeb from '../components/TalentWeb.vue';
import TalentPoints from '../components/TalentPoints.vue';
import SkillPannel from '@/components/SkillPannel.vue';

const templateRef = useTemplateRef('my-diagram');
const talentPoints = ref(10);
const talentsTaken = new Set();

var toggle = (id: number) => {
  talentsTaken.has(id) ? talentsTaken.delete(id) : talentsTaken.add(id)
  console.log(talentsTaken);
  talentPoints.value = 10 - talentsTaken.size;
}

onMounted(() => {
  console.log(templateRef.value?.offsetWidth);
})

</script>

<template>
  <main>
    <div class="flex-container">
      <div class="skills-pannel">
        <SkillPannel />
      </div>
      <div class="talents-diagram" ref="my-diagram">
        <TalentPoints v-bind:points="talentPoints" />
        <TalentWeb @node-toggled="toggle" :width=1080 :height=720 />
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

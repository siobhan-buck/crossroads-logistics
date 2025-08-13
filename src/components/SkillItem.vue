<script setup lang="ts">
import type { SkillData } from '@/stores/builder.types';
import { ref } from 'vue';

const props = defineProps<{
  skill: SkillData,
}>()
const emit = defineEmits(['skillTransaction']);

var purchases = ref(0);

const addSkill = () => {
  purchases.value++;
  emit('skillTransaction', -1* props.skill.cost);
}

const removeSkill = () => {
  purchases.value--;
  emit('skillTransaction', props.skill.cost);
}
</script>

<template>
  <div class="skill-item">
    <div>
      {{ purchases }}
      <button @click="addSkill()">+1</button>
      <button @click="removeSkill()">-1</button>
      <h3>
        {{ props.skill.name }} ({{ props.skill.cost }})
      </h3>
    </div>
    {{ props.skill.description }}
  </div>
</template>

<style>
.skill-item {
  margin-left: 10px;
}

</style>
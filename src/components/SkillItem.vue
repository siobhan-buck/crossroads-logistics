<script setup lang="ts">
import type { SkillData } from '@/stores/builder.types';

const props = defineProps<{
  skill: SkillData,
  purchases: number
}>()
const emit = defineEmits(['addSkill', 'removeSkill']);

const addSkill = () => {
  emit('addSkill', props.skill.id, props.skill.cost);
}

const removeSkill = () => {
  emit('removeSkill', props.skill.id, props.skill.cost);
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
<script setup lang="ts">
import type { SkillData } from '@/stores/builder.types';

const props = defineProps<{
  skill: SkillData,
  purchases: number
  freePoints: number
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
  <div class="skill-button-block">
    <div class="skill-purchases-value">
      <span v-if="purchases > 0" class="orange-soft">{{ purchases }}</span>
      <span v-else>{{ purchases }}</span>
      {{ props.skill.name }} ({{ props.skill.cost }})
    </div>
  </div>
  <button :disabled="freePoints < skill.cost" @click="addSkill()">+1</button>
  <button :disabled="purchases == 0" @click="removeSkill()">-1</button>
  <br/>
  {{ props.skill.description }}
</template>

<style>
.orange-soft {
  color: var(--vt-c-orange-soft);
}

.skill-button-block {
  display: inline-flex;
}

.skill-purchases-value {
  font-size: 18px;
  margin: auto;
  padding-right: 10px;
}

</style>
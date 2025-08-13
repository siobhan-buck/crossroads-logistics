<script setup lang='ts'>
import { ref } from 'vue';
import BuildPoints from '../components/BuildPoints.vue';
import SkillItem from './SkillItem.vue';
import type { SkillData } from '../stores/builder.types';
import skillList from '../assets/skill_list.json';

const data: Array<SkillData> = skillList;
const props = defineProps<{talents: Set<number>}>();
defineEmits(['skillTransaction']);

const skillPoints = ref(10);

var skillTransaction = (points: number) => {
  console.log('emitted')
  skillPoints.value = skillPoints.value + points;
}

const prereqSatisfied = (skill: SkillData) => {
    var found = false;
    skill.talents.forEach( (id) => {
        if (props.talents.has(id)) {
            found = true;
        }
    })
    return found;
};
</script>

<template>
    <BuildPoints v-bind:points="skillPoints" type="skill" />
    <div v-for="skill in data">
        <SkillItem @skill-transaction="skillTransaction" v-if="prereqSatisfied(skill)" :skill="skill" />
    </div>
</template>
<script setup lang='ts'>
import SkillItem from './SkillItem.vue';
import type { SkillData } from '../stores/builder.types';
import skillList from '../assets/skill_list.json';

const data: Array<SkillData> = skillList;
const props = defineProps<{talents: Set<number>}>();

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
    <div v-for="skill in data">
        <SkillItem v-if="prereqSatisfied(skill)">
            <template #heading>{{ skill.name }}</template>
            {{ skill.description }}
        </SkillItem>
    </div>
</template>
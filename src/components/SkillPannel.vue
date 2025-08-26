<script setup lang='ts'>
import { ref } from 'vue';
import BuildPoints from '../components/BuildPoints.vue';
import SkillItem from './SkillItem.vue';
import type { SkillData } from '../stores/builder.types';
import skillList from '../assets/skill_list.json';
import { useCharacterStore } from '@/stores/character';

const props = defineProps<{skillPoints: number}>();
const emit = defineEmits(['skillTransaction']);
const data: Array<SkillData> = skillList;

const character = useCharacterStore();

var addSkill = (id: number, points: number) => {
    character.addSkill(id);
    emit('skillTransaction', -1 * points);
};

var removeSkill = (id: number, points: number) => {
    character.removeSkill(id);
    emit('skillTransaction', points);
};

const prereqSatisfied = (skill: SkillData) => {
    var found = false;
    skill.talents.forEach( (id) => {
        if (character.talentsTaken.has(id)) {
            found = true;
        }
    })
    return found;
};
</script>

<template>
    <div class="skill-item" v-for="skill in data">
        <SkillItem v-if="prereqSatisfied(skill)" @add-skill="addSkill" @remove-skill="removeSkill" :skill="skill" :purchases="character.skillsTaken.get(skill.id) ?? 0" :free-points="skillPoints" />
    </div>
</template>

<style>
.skill-item {
    padding-bottom: 4px;
}
</style>
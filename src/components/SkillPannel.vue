<script setup lang='ts'>
import SkillItem from './SkillItem.vue';
import CommunityIcon from './icons/IconCommunity.vue'
import type { SkillData } from '../stores/builder.types';
import skillList from '../assets/skill_list.json';

const data: Array<SkillData> = skillList;
</script>

<template>
    <div>
        <SkillItem v-for="skill in data">
            <template #icon>
                <CommunityIcon />
            </template>
            <template #heading>{{ skill.name }}</template>
            {{ skill.description }}
        </SkillItem>
    </div>
</template>
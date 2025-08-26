<script setup lang="ts">
defineProps<{
  points: number,
  type: string,
  mild: boolean
}>()
</script>

<template>
    <div class="build-points-block">
        {{ type }} points
        <div v-if="mild" class="build-points-value-mild">{{ points }}</div>
        <div v-else class="build-points-value">{{ points }}</div>
    </div>
</template>

<style scoped>
.build-points-block{
    display: block;
    margin: auto;
    text-align: center;
}
.build-points-value{
  color: var(--vt-c-orange-soft);
}
.build-points-value-mild{
  color: var(--vt-c-yellow-soft);
}
</style>
<script setup lang="ts">
defineProps<{
  points: number,
  type: string
}>()
</script>

<template>
    <div class="build-points-block">
        {{ type }} points
        <div class="build-points-value">{{ points }}</div>
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
</style>
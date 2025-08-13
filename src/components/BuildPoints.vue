<script setup lang="ts">
defineProps<{
  points: number,
  type: string
}>()
</script>

<template>
    <div class="build-points-total">
        {{ points }} {{ type }} points to spend
    </div>
</template>

<style scoped>
.build-points-total{
    display: block;
    margin: auto;
    text-align: center;
}
</style>
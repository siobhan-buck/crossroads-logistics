<script setup lang="ts">
defineProps<{
  points: number
}>()
</script>

<template>
    <div class="talent-points-total">
        {{ points }} talent points to spend
    </div>
</template>

<style scoped>
.talent-points-total{
    display: block;
    margin: auto;
    text-align: center;
}
</style>
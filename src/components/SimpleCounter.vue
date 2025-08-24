<script setup lang="ts">
const props = defineProps<{
  title: string,
  value: number
}>()
const emit = defineEmits(['diff']);

const add = () => {
  emit('diff', 1);
}

const remove = () => {
  emit('diff', -1);
}
</script>

<template>
  <div class="simple-counter">
    <h3>{{ title }}</h3>
    {{ value }}
    <button @click="add()">+1</button>
    <button :disabled="value == 0" @click="remove()">-1</button>
  </div>
</template>

<style>
.simple-counter {
    display: block;
    margin: auto;
    text-align: center;
}
</style>
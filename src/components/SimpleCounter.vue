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
    <div class="simple-counter-button-block">
      <button @click="add()">+1</button>
      <div class="points-value">{{ value }}</div>
      <button :disabled="value == 0" @click="remove()">-1</button>
    </div>
  </div>
</template>

<style>
.simple-counter {
  display: block;
  margin: auto;
  text-align: center;
}

.simple-counter-button-block {
  display: inline-flex;
}

.points-value {
  font-size: 18px;
  color: var(--vt-c-orange-soft);
  margin: auto;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
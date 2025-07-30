<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="token">
      <img alt="Crossroads logo" class="logo" src="@/assets/no.jpg" width="124" height="124" />
      <h1 class="green">{{ msg }}</h1>
      <h3>A Live Action Roleplaying Game optimized for collaborative story telling</h3>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  display: inline;
  color: #bf9049;
}

h3 {
  font-size: 1.2rem;
}

.token {
  position: absolute;
  bottom: 0;
  left: 0; 
  right: 0; 
  margin-inline: auto; 
  width: fit-content;
}

.greetings {
  display: flex;
  align-items: center;
  --minHeight: 20vh;
  min-height: var(--minHeight);
  width:100%;
  position:relative;
}

.greetings h1 {
  text-align: center;
}

.token img {
  border:5px solid #bf9049;
}
</style>

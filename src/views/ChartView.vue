<script setup lang="ts">
import BarChart from '../components/BarChart.vue';

const chartData = [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 }
      ];
</script>

<template>
  <main>
    <BarChart :data="chartData"/>
  </main>
</template>

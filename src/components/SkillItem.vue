<template>
  <div class="item">
    <h3>
      <slot name="heading"></slot>
    </h3>
    <slot></slot>
  </div>
</template>

<style>
.item {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
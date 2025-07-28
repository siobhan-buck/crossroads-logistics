<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Work in Progress</template>

    We are in the very early stages of development. Please be gentle.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Want to get involved? Say hi to us on
    <a href="https://discord.gg/4HrWZUugah" target="_blank" rel="noopener">our Discord server</a>.
  </WelcomeItem>
</template>

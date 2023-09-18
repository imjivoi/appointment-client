<template>
  <n-button v-bind="$attrs" :tag="nuxtLink">
    <slot />
  </n-button>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'

const nuxtLink = defineNuxtLink({}) as unknown as string
</script>

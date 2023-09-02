<template>
  <n-tabs @update:value="activeTab = $event" type="line">
    <n-tab name="1">Riders On the Storm</n-tab>
    <n-tab name="2">Light My Fire</n-tab>
    <n-tab name="3">Berak On Through</n-tab>
  </n-tabs>
</template>
<script setup lang="ts">
import { NButton, NTabs, NTab } from 'naive-ui'

const activeTab = ref("1")
</script>

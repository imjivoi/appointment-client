<template>
  <NConfigProvider :locale="esAR" :date-locale="dateEsAR" inline-theme-disabled :theme-overrides="themeOverrides" preflight-style-disabled>
    <NMessageProvider placement="top">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ModalsContainer />
    </NMessageProvider>
  </NConfigProvider>
  <NuxtLoadingIndicator />
</template>
<script setup>
import { NConfigProvider, NMessageProvider, esAR, dateEsAR } from 'naive-ui'
import { ModalsContainer } from 'vue-final-modal'

import { themeOverrides } from '@/lib'

useHead({})
</script>

<template>
  <modal>
    <u-tabs :items="TABS">
      <template #info="{ item }">
        <component :is="item.component" @update:modelValue="$emit('update:modelValue')" />
      </template>
      <template #time="{ item }">
        <component :is="item.component" @update:modelValue="$emit('update:modelValue')" />
      </template>
      <!-- <div class="text-center">
        <ui-tabs-list>
          <ui-tabs-trigger v-for="(tab, idx) in TABS" :key="idx" :value="tab.value">
            <span>{{ tab.label }}</span>
          </ui-tabs-trigger>
        </ui-tabs-list>
      </div>
      <ui-tabs-content v-for="(tab, idx) in TABS" :key="idx" :value="tab.value">
      </ui-tabs-content> -->
    </u-tabs>
  </modal>
</template>
<script lang="ts" setup>
import LazyUpdateInfoForm from './UpdateInfoForm.vue'
import LazyTimeSlotsForm from './time-slot/CreateForm.vue'

const TABS = [
  {
    label: 'Información basica',
    slot: 'info',
    component: LazyUpdateInfoForm,
  },
  {
    label: 'Horarios',
    slot: 'time',
    component: LazyTimeSlotsForm,
  },
]
</script>

<template>
  <modal>
    <ui-tabs :default-value="TABS[0].value">
      <div class="text-center">
        <ui-tabs-list>
          <ui-tabs-trigger v-for="(tab, idx) in TABS" :key="idx" :value="tab.value">
            <span>{{ tab.label }}</span>
          </ui-tabs-trigger>
        </ui-tabs-list>
      </div>
      <ui-tabs-content v-for="(tab, idx) in TABS" :key="idx" :value="tab.value">
        <component :is="tab.component" @update:modelValue="$emit('update:modelValue')" />
      </ui-tabs-content>
    </ui-tabs>
  </modal>
</template>
<script lang="ts" setup>
import LazyUpdateInfoForm from './UpdateInfoForm.vue'
import LazyTimeSlotsForm from './time-slot/CreateForm.vue'

const TABS = [
  {
    value: 'info',
    label: 'Información basica',
    component: LazyUpdateInfoForm,
  },
  {
    value: 'time-slots',
    label: 'Horarios',
    component: LazyTimeSlotsForm,
  },
]
</script>

<template>
  <vue-final-modal
    :content-class="
      cn(
        'modal-box w-full max-w-full sm:w-fit sm:max-w-[700px] min-w-[320px] mx-auto bg-white mt-16 py-6 sm:px-4 sm:px-8 overflow-hidden',
        props.class ?? '',
      )
    "
    :lock-scroll="true"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    teleport-to="#__nuxt"
  >
    <button class="absolute top-4 right-4" @click="$emit('update:modelValue', false)">
      <Icon name="ic:outline-close" class="w-6 h-6" />
    </button>
    <div v-if="$slots.header" class="mb-8 mt-2 px-2 sm:px-auto">
      <slot name="header"></slot>
    </div>

    <div v-if="$slots.default" class="modal__content max-h-[75vh] overflow-auto sm:h-full px-2 sm:px-auto">
      <slot />
    </div>
    <div v-if="$slots.footer" class="modal__footer mt-8">
      <slot name="footer" />
    </div>
  </vue-final-modal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'
import 'vue-final-modal/style.css'

import { cn } from '#shared/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<style lang="scss">
.vfm--fixed {
  height: 100vh;
}
.modal {
  &-container {
    display: flex;
    justify-content: center;
    overflow-y: auto;

    @media (max-width: 640px) {
      align-items: end;
    }
  }

  &-box {
    height: fit-content;
    position: relative;
    background: white;
    border-radius: 10px;

    @media (max-width: 640px) {
      transform: none;
      max-height: 90vh;
      border-radius: 0;
    }
  }
}
</style>

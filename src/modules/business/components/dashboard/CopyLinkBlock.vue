<template>
  <div>
    <div class="p-4 rounded-xl border-gray-300 border-2 border-solid">
      <h4 class="font-bold mb-4">Link a la página de programación</h4>
      <div class="flex mb-2">
        <a class="underline decoration-black underline-offset-4 truncate leading-8">
          https://sdfsfas/asfasdfsadffffffffffffffsssssssssssssssssssssssssss
        </a>
      </div>
      <ui-button size="sm" @click="copyLink">
        <Icon name="ic:round-content-copy" class="mr-2" />
        {{ isCopied ? 'Copiado!' : 'Copiar' }}
      </ui-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
// import { NButton, useMessage } from 'naive-ui'

const props = defineProps<{
  link: string
}>()

const isCopied = ref(false)
// const message = useMessage()

const { copy, copied } = useClipboard()

const copyLink = async () => {
  await copy(props.link)
  if (copied.value) {
    isCopied.value = true
    await sleep(2000)
    isCopied.value = false
    // message.success('Copiado al portapapeles')
  }
}
</script>

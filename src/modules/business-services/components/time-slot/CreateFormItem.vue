<template>
  <div class="flex gap-4 justify-center">
    <div class="w-24 mt-2 font-medium">
      {{ weekDay.label }}
    </div>
    <div class="mt-2">
      <u-toggle v-model="active"></u-toggle>
    </div>
    <div class="grid ml-10 gap-2">
      <div v-for="(timeItem, timeItemIdx) in time" :key="timeItemIdx" class="flex gap-4">
        <div class="w-32 block">
          <u-input v-model="timeItem.startAt" :disabled="!active" type="time" />
        </div>
        <span
          class="mt-2"
          :class="{
            'text-gray-400': !active,
          }"
        >
          hasta
        </span>
        <div class="w-32">
          <u-form-group>
            <u-input v-model="timeItem.endAt" :disabled="!active" type="time" />
            <template v-if="$v.time.$each.$response.$errors?.[timeItemIdx].endAt[0]">
              <div
                v-if="$v.time.$each.$response.$errors[timeItemIdx].endAt.required?.$invalid"
                class="text-red-500 mt-1"
              >
                Campo requerido
              </div>
              <div
                v-else-if="$v.time.$each.$response.$errors[timeItemIdx].endAt[0].$validator === 'isGreaterThanStartAt'"
                class="text-red-500 mt-1"
              >
                Hora de inicio debe ser menor a la hora de fin
              </div>
            </template>
          </u-form-group>
        </div>
        <div class="mt-1">
          <u-button
            v-if="timeItemIdx === 0"
            size="sm"
            variant="ghost"
            :disabled="!active"
            icon="i-heroicons-plus"
            @click="addTime"
          ></u-button>
          <u-button
            v-if="timeItemIdx !== 0"
            color="red"
            size="sm"
            variant="ghost"
            :disabled="!active"
            icon="i-heroicons-trash"
            @click="removeTime(timeItemIdx)"
          ></u-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { setHours, startOfDay, setSeconds } from 'date-fns/esm'

const props = defineProps<{
  idx: number
  weekDay: {
    label: string
    value: string
  }
}>()

const active = defineModel<boolean>('active')
const time = defineModel<{ startAt: number; endAt: number }[]>('time')

const rules = {
  time: {
    $each: helpers.forEach({
      startAt: {
        required,
        isLessThanEndAt: function (value, siblings) {
          return transformTime(value) < transformTime(siblings.endAt)
        },
      },
      endAt: {
        required,
        isGreaterThanStartAt: function (value, siblings) {
          return transformTime(value) > transformTime(siblings.startAt)
        },
      },
    }),
  },
}

const $v = useVuelidate(rules, { time })

const START_AT_DEFAULT = formatDate(setHours(startOfDay(Date.now()), 9), 'HH:mm')
const END_AT_DEFAULT = formatDate(setHours(startOfDay(Date.now()), 17), 'HH:mm')

function addTime() {
  time.value!.push({
    startAt: START_AT_DEFAULT,
    endAt: END_AT_DEFAULT,
  })
}

function removeTime(idx: number) {
  time.value!.splice(idx, 1)
}

function transformTime(time: string) {
  const toSeconds = () => {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60
  }
  return setSeconds(startOfDay(Date.now()), toSeconds()).getTime()
}

watch(
  () => time.value,
  () => {
    $v.value.$reset()
  },
)
</script>

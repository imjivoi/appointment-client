<template>
  <aside class="min-h-screen w-[230px] px-8 py-4 flex flex-col justify-between">
    <div class="mt-[30vh] w-full">
      <UVerticalNavigation
        :links="links"
        :ui="{
          wrapper: 'flex flex-col gap-2',
          base: 'transition-all',
          rounded: 'dark:before:rounded-full',
          active: 'dark:before:bg-gray-800',
          inactive: 'hover:dark:before:bg-gray-800',
          padding: 'py-4 px-8',
          icon: {
            active: 'dark:text-primary ',
          },
        }"
      />
    </div>
    <div class="">
      <u-button
        icon="i-heroicons-arrow-right-on-rectangle"
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
        block
        color="primary"
        variant="solid"
        label="Sign Out"
        :trailing="false"
      />
    </div>
  </aside>
</template>
<script lang="ts" setup>
const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/dashboard',
  },
  {
    label: 'Turnos',
    icon: 'i-heroicons-table-cells',
    to: '/dashboard/appointments',
  },
  {
    label: 'Servicios',
    icon: 'i-heroicons-cube',
    to: '/dashboard/services',
  },
  {
    label: 'Calendar',
    icon: 'i-heroicons-calendar',
    to: '/calendar',
  },
]
</script>

<template>
  <aside class="w-50 h-[92vh] flex items-center justify-center ">
    <div class="px-4">
      <ul class="grid gap-2">
        <li v-for="item in menuItems" :key="item.to">
          <nuxt-link
            :to="item.to"
            class="flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-all hover:bg-slate-100"
          >
            <Icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script lang="ts" setup>
const menuItems = [
  {
    label: 'Dashboard',
    icon: 'ic:outline-dashboard',
    to: '/dashboard',
  },
  {
    label: 'Turnos',
    icon: 'ic:outline-event',
    to: '/dashboard/appointments',
  },
  // {
  //   label: 'Clientes',
  //   icon: 'ic:outline-people',
  //   to: '/dashboard/clients',
  // },
  {
    label: 'Servicios',
    icon: 'material-symbols:cleaning-services',
    to: '/dashboard/services',
  },
  // {
  //   label: 'Configuración',
  //   icon: 'ic:outline-settings',
  //   to: '/dashboard/settings',
  // },
]
</script>
<style lang="postcss" scoped>
.router-link-active {
  @apply bg-slate-100;
}
</style>

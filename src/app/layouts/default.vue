<template>
  <app-header />
  <div class="flex gap-10">
    <app-sidebar />
    <main class="h-full flex-auto">
      <div class="container px-4 lg:max-w-5xl py-16 mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup></script>

<template>
  <div class="flex dark:bg-gray-950">
    <app-sidebar />
    <main class="flex-1 dark:bg-gray-800">
      <div class="container px-10 py-16 mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup></script>

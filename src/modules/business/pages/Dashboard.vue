<template>
  <div>
    <div class="mb-10 flex justify-between items-center">
      <h2 class="text-2xl font-bold">Dashboard</h2>
    </div>
    <div class="grid grid-cols-2 gap-10">
      <business-dashboard-next-appointment-block />
      <business-dashboard-copy-link-block link="testlink" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>

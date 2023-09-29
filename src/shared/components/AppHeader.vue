<template>
  <header>
    <div class="container mx-auto flex justify-between items-center h-[8vh] px-10">
      <div class="logo text-xl">
        <!-- <nuxt-link :to="getHomeLink()">liny</nuxt-link> -->
      </div>
      <!-- <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
          </li>
          <li v-if="user">
            <nuxt-link to="/dashboard">{{ $t('dashboard') }}</nuxt-link>
          </li>
        </ul>
      </div> -->
      <div>
        <u-button
          size="md"
          :as="defineNuxtLink({})"
          :ui="{
            rounded: 'rounded-full',
            padding: {
              md: 'px-8',
            },
          }"
          to="/auth/login"
        >
          Ingresar
        </u-button>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup></script>
<style scoped>
.logo {
  font-family: 'Fredoka One', cursive;
  letter-spacing: 4px;
}
</style>

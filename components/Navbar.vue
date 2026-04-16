<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <nav class="fixed w-full z-50 bg-gray-900/50 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">

      <!-- Logo -->
      <h1 class="text-2xl font-bold text-blue-400">
        Bagas Tricahya
      </h1>

      <!-- Menu -->
      <ul class="flex gap-1">

        <li>
          <NuxtLink
            to="/"
            class="group px-5 py-2 rounded-md text-base font-medium transition flex items-center"
            :class="route.path === '/' && !route.hash
              ? 'bg-gray-800/90 text-white ' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="house" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
          Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#about"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
            :class="route.hash === '#about' 
              ? 'bg-gray-800/90 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="user" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            About
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#experience"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
            :class="route.hash === '#experience' 
              ? 'bg-gray-800/90 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="briefcase" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Experience
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#projects"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
            :class="route.hash === '#projects' 
              ? 'bg-gray-800/90 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="archive" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Projects
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#skills"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
            :class="route.hash === '#skills' 
              ? 'bg-gray-800/90 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="gear-six" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Skills
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#contact"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
            :class="route.hash === '#contact' 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'"
          >
          <PhosphorIcon name="address-book" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Contact
          </NuxtLink>
        </li>

      </ul>

    </div>
  </nav>
</template>
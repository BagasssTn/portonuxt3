<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const colorMode = useColorMode()
const route = useRoute()
const activeSection = ref ('home')

onMounted(() => {
  const sections = document.querySelectorAll('section')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      threshold: 0.3
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})

const toggleDark = () => {
  colorMode.preference =
  colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
<nav class="fixed top-0 left-0 w-full z-50 backdrop-blur-md
  bg-white/80 dark:bg-gray-900/80
  text-white dark:text-white shadow-md transition-colors duration-300">

    <div class="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold dark:text-blue-400 text-blue-950
      ">
        Bagas Tricahya
      </h1>
      <ul class="flex gap-1">
        <li>
          <NuxtLink
            to="/"
            class="group px-5 py-2 rounded-md text-base font-medium transition flex items-center"
              :class="activeSection === 'home'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
          <PhosphorIcon name="house" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
          Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#about"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
              :class="activeSection === 'about'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
        <PhosphorIcon name="user" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            About
        </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#experience"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
              :class="activeSection === 'experience'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
          <PhosphorIcon name="briefcase" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Experience
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#projects"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
              :class="activeSection === 'projects'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
          <PhosphorIcon name="archive" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Projects
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#skills"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
              :class="activeSection === 'skills'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
          <PhosphorIcon name="gear-six" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Skills
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/#contact"
            class="group flex items-center px-5 py-2 rounded-md text-base font-medium transition"
              :class="activeSection === 'contact'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white'
                : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'"
          >
          <PhosphorIcon name="address-book" class="mr-1 size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"/>
            Contact
          </NuxtLink>
        </li>
      </ul>

      <button
      @click="toggleDark"
      class="p-2 rounded-md flex items-center transition
             bg-gray-200 dark:bg-gray-800
             text-gray-800 dark:text-white"
      >
      <PhosphorIcon 
        :name="colorMode.value === 'dark' ? 'moon' : 'sun'"
        class="size-5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.07]"
      />
      </button>
    </div>
  </nav>
</template>
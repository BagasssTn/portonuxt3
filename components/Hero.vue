<script setup>
import { ref, onMounted } from 'vue'
import profile from '@/assets/foto profil.png'

const texts = [
  "Frontend Developer",
  "UI/UX Oriented Developer",
  "Digital Creative",
  "Web Developer"
]

const displayText = ref("")
let index = 0
let charIndex = 0

function typeEffect() {
  if (charIndex < texts[index].length) {
    displayText.value += texts[index][charIndex]
    charIndex++
    setTimeout(typeEffect, 50)
  } else {
    setTimeout(() => {
      displayText.value = ""
      charIndex = 0
      index = (index + 1) % texts.length
      typeEffect()
    }, 1500)
  }
}

onMounted(() => {
  typeEffect()
})
</script>

<template>
  <section id="home" class="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white flex items-center pt-24 pb-10 px-6 relative">

    <!-- Background Glow -->
    <div class="absolute w-96 h-96 dark:bg-blue-200/20 bg-indigo-400/40  rounded-full blur-3xl top-20 -left-20"></div>
    <div class="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-30"></div>

    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

      <!-- LEFT SIDE -->
      <div>
        <p class="dark:text-blue-400 text-blue-800 mb-1 text-lg">
          Hello, I'm
        </p>

        <h1 class="text-5xl font-bold mb-6 leading-normal dark:text-blue-400 text-blue-800">
          Bagas Tricahya Nugraha
        </h1>

        <!-- Typing Text -->
        <h2 class="text-2xl md:text-3xl text-gray-900 dark:text-gray-300 font-semibold">
          {{ displayText }}
        </h2>

        <p class="dark:text-gray-400 text-gray-800 mt-6 mb-8 leading-relaxed max-w-lg">
          I am a Fresh Graduate in Information Technology Education with a strong passion for digital creativity, front-end development, and user experience design.
        </p>

        <div class="flex gap-4">
          <a
            href="#projects"
            class="bg-blue-800 dark:bg-blue-600 hover:bg-blue-600 text-gray-100 dark:text-gray-900 px-6 py-3 rounded-md transition duration-500 transform hover:scale-[1.05]"
          >
            View Projects
          </a>

          <a
            href="#contact"
            class=" border-blue-600 text-blue-600 border-2  dark:text-blue-400 px-6 py-3 rounded-md hover:scale-[1.05] hover:bg-blue-500 hover:text-white transition duration-500"
          >
            Contact Me
          </a>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex justify-center relative">

        <!-- Glow -->
        <div class="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

        <!-- Circle -->
        <div class="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 dark:bg-transparent bg-blue-200 border-blue-500">
          <img
            :src="profile"
            alt="Bagas Profile"
            class="w-full h-full object-contain"
          />
        </div>
      </div>

    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// state
const selectedProject = ref(null)
const activeImage = ref(0)

// ESC close
const handleEsc = (e) => {
  if (e.key === 'Escape') {
    selectedProject.value = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
})

// disable scroll saat modal buka
watch(selectedProject, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

// IMPORT GAMBAR (pakai alias Nuxt @)
import lms1 from '@/assets/lms1.png'
import lms2 from '@/assets/lms2.png'
import lms3 from '@/assets/lms3.png'
import lms4 from '@/assets/lms4.png'
import lms5 from '@/assets/lms5.png'

import company1 from '@/assets/company1.png'
import company2 from '@/assets/company2.png'
import company3 from '@/assets/company3.png'
import company4 from '@/assets/company4.png'
import company5 from '@/assets/company5.png'
import company6 from '@/assets/company6.png'
import company7 from '@/assets/company7.png'

import feed1 from '@/assets/feed1.png'
import feed2 from '@/assets/feed2.png'
import feed3 from '@/assets/feed3.png'
import feed4 from '@/assets/feed4.png'
import feed5 from '@/assets/feed5.png'
import feed6 from '@/assets/feed6.png'

import free1 from '@/assets/free1.png'
import free2 from '@/assets/free2.png'
import free3 from '@/assets/free3.png'
import free4 from '@/assets/free4.png'
import free5 from '@/assets/free5.jpg'
import free6 from '@/assets/free6.png'
import free7 from '@/assets/free7.jpg'

// data
const projects = [
  {
    title: "LMS WeCodTry",
    description: "A modern Learning Management System focused on structured learning and user experience.",
    fullDescription: "This LMS was developed to enhance student learning...",
    tech: ["Moodle", "HTML", "CSS"],
    screenshots: [lms1, lms4, lms2, lms3, lms5],
  },
  {
    title: "Company Profile Website",
    description: "Responsive company website with clean UI.",
    fullDescription: "Designed and developed a responsive company website...",
    tech: ["React", "Tailwind"],
    screenshots: [company1, company7, company3, company2, company4, company5, company6],
  },
  {
    title: "Instagram Feed Design Strategy",
    description: "Creative Instagram feed design.",
    fullDescription: "Created a cohesive and strategic Instagram feed...",
    tech: ["Canva", "Branding"],
    screenshots: [feed1, feed3, feed2, feed4, feed5, feed6],
  },
  {
    title: "Freelance Creative Designer",
    description: "Strategic visual design solutions.",
    fullDescription: "Delivered strategic design solutions...",
    tech: ["Canva", "Content Planning"],
    screenshots: [free4, free2, free3, free5, free6, free7, free1],
  },
]
</script>

<template>
  <section id="projects" class="bg-gray-950 text-white py-28 px-6">
    <div class="max-w-6xl mx-auto">

      <h2 class="text-4xl font-bold mb-16 text-center">
        Featured <span class="text-blue-400">Projects</span>
      </h2>

      <!-- GRID -->
      <div class="grid md:grid-cols-3 gap-10">
        <div
          v-for="(project, index) in projects"
          :key="index"
          @click="() => { selectedProject = project; activeImage = 0 }"
          class="cursor-pointer group bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition duration-500"
        >
          <div class="bg-gray-800 flex items-center justify-center h-56">
            <img
              :src="project.screenshots[0]"
              class="max-h-full object-contain group-hover:scale-105 transition"
            />
          </div>

          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 text-sm">
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
      @click="selectedProject = null"
    >
      <div
        class="bg-gray-900 rounded-2xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
        @click.stop
      >

        <!-- CLOSE -->
        <button
          @click="selectedProject = null"
          class="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <!-- IMAGE -->
        <img
          :src="selectedProject.screenshots[activeImage]"
          class="w-full max-h-[70vh] object-contain mb-4"
        />

        <!-- THUMBNAILS -->
        <div class="flex gap-3 mb-6 overflow-x-auto">
          <img
            v-for="(img, i) in selectedProject.screenshots"
            :key="i"
            :src="img"
            @click="activeImage = i"
            class="w-24 h-16 object-cover rounded cursor-pointer border-2"
            :class="activeImage === i ? 'border-blue-500' : 'border-transparent'"
          />
        </div>

        <!-- TEXT -->
        <h3 class="text-3xl font-bold mb-4">
          {{ selectedProject.title }}
        </h3>

        <p class="text-gray-400 mb-6">
          {{ selectedProject.fullDescription }}
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tech, i) in selectedProject.tech"
            :key="i"
            class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs"
          >
            {{ tech }}
          </span>
        </div>

      </div>
    </div>

  </section>
</template>
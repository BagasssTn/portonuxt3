<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const selectedProject = ref(null)
const activeImage = ref(0)

const config = useRuntimeConfig()

function imageUrl(path) {
  if (!path) return ''
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('blob:')
  ) {
    return path
  }
  return `${config.public.apiBase}${path}`
}

const { data: projects, pending, error } = await useFetch('/api/projects', {
  baseURL: config.public.apiBase
})

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

watch(selectedProject, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <section id="projects" class="dark:bg-gray-950 bg-gray-50 py-28 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold mb-16 text-center text-blue-800 dark:text-gray-100">
        Featured <span class="text-gray-900 dark:text-blue-400">Projects</span>
      </h2>

      <div v-if="pending" class="text-center text-gray-700 dark:text-gray-300">
        Loading projects...
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        Gagal mengambil data project.
      </div>

      <div v-else class="grid md:grid-cols-3 gap-10">
        <div
          v-for="(project, index) in projects"
          :key="project.id || index"
          @click="() => { selectedProject = project; activeImage = 0 }"
          class="cursor-pointer group bg-gray-300 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition duration-500"
        >
          <div class="bg-gray-200 dark:bg-gray-800 flex items-center justify-center h-60">
            <img
              :src="imageUrl(project.thumbnail || project.screenshots?.[0])"
              class="max-h-full object-contain group-hover:scale-105 transition"
            />
          </div>

          <div class="p-6">
            <h3 class="text-2xl text-gray-900 dark:text-gray-50 font-semibold mb-3">
              {{ project.title }}
            </h3>
            <p class="text-gray-700 dark:text-gray-200 text-sm">
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedProject"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
      @click="selectedProject = null"
    >
      <div
        class="bg-gray-900 rounded-2xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <button
          @click="selectedProject = null"
          class="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <img
          :src="imageUrl(selectedProject.screenshots[activeImage])"
          class="w-full max-h-[70vh] object-contain mb-4"
        />

        <div class="flex gap-3 mb-6 overflow-x-auto">
          <img
            v-for="(img, i) in selectedProject.screenshots"
            :key="i"
            :src="imageUrl(img)"
            @click="activeImage = i"
            class="w-24 h-16 object-cover rounded cursor-pointer border-2"
            :class="activeImage === i ? 'border-blue-500' : 'border-transparent'"
          />
        </div>

        <h3 class="text-3xl font-bold mb-4 text-white">
          {{ selectedProject.title }}
        </h3>

        <p class="text-gray-400 mb-6">
          {{ selectedProject.full_description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="(tech, i) in selectedProject.tech"
            :key="i"
            class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs"
          >
            {{ tech }}
          </span>
        </div>

        <a
          v-if="selectedProject.live_url"
          :href="selectedProject.live_url"
          target="_blank"
          class="inline-block text-blue-400 hover:underline"
        >
          Live Demo
        </a>
      </div>
    </div>
  </section>
</template>
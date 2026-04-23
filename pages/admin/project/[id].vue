<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: 'admin-auth'
})

type ProjectItem = {
  id: number
  title: string
  slug: string
  description: string
  fulldescription: string
  tech: string[]
  screenshots: string[]
  live_url: string
}

const route = useRoute()
const config = useRuntimeConfig()

const projectId = computed(() => Number(route.params.id))

const form = ref({
  title: '',
  slug: '',
  description: '',
  fulldescription: '',
  tech: '',
  screenshots: '',
  live_url: ''
})

const loading = ref(false)
const errorMessage = ref('')

function joinLines(items: string[] | null | undefined) {
  if (!items?.length) return ''

  return items.join('\n')
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const {
  data: selectedProject,
  pending,
  error
} = await useFetch<ProjectItem>(`/api/admin/projects/${projectId.value}`, {
  baseURL: config.public.apiBase
})

watchEffect(() => {
  if (!selectedProject.value) return

  form.value = {
    title: selectedProject.value.title,
    slug: selectedProject.value.slug,
    description: selectedProject.value.description,
    fulldescription: selectedProject.value.fulldescription,
    tech: joinLines(selectedProject.value.tech),
    screenshots: joinLines(selectedProject.value.screenshots),
    live_url: selectedProject.value.live_url || ''
  }
})

async function handleSubmit() {
  errorMessage.value = ''
  loading.value = true

  try {
    await $fetch(`/api/admin/projects/${projectId.value}`, {
      method: 'PUT',
      baseURL: config.public.apiBase,
      body: {
        title: form.value.title,
        slug: form.value.slug,
        description: form.value.description,
        fulldescription: form.value.fulldescription,
        tech: splitLines(form.value.tech),
        screenshots: splitLines(form.value.screenshots),
        live_url: form.value.live_url
      }
    })

    await navigateTo('/admin/project?success=updated')
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update project'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
    <div class="mx-auto max-w-4xl">
      <div class="mb-8 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30">
        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
          Admin Panel
        </p>
        <h1 class="mt-2 text-3xl font-bold font-yatra text-slate-950">
          Edit Project
        </h1>
        <p class="mt-2 text-sm text-slate-600">
          Update the selected project entry using the form below.
        </p>
      </div>

      <div
        v-if="pending"
        class="rounded-xl bg-white p-8 text-center shadow-xl shadow-slate-300/30"
      >
        <p class="text-sm text-slate-600">Loading...</p>
      </div>

      <div
        v-else-if="error || !selectedProject"
        class="rounded-xl bg-white p-8 text-center shadow-xl shadow-slate-300/30"
      >
        <PhosphorIcon name="warning-circle" class="mx-auto size-10 text-amber-500" />
        <h2 class="mt-4 text-lg font-semibold text-slate-900">
          Project not found
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          The selected project ID does not match any available data.
        </p>
        <NuxtLink
          to="/admin/project"
          class="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
        >
          Back to Project List
        </NuxtLink>
      </div>

      <form
        v-else
        class="space-y-6 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30"
        @submit.prevent="handleSubmit"
      >
        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="title" class="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              v-model="form.title"
              required
              type="text"
              placeholder="Enter project title"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
          </div>

          <div>
            <label for="slug" class="mb-2 block text-sm font-medium text-slate-700">
              Slug
            </label>
            <input
              id="slug"
              v-model="form.slug"
              required
              type="text"
              placeholder="example-project"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
          </div>
        </div>

        <div>
          <label for="description" class="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="4"
            placeholder="Write a short project description"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label for="fulldescription" class="mb-2 block text-sm font-medium text-slate-700">
            Full Description
          </label>
          <textarea
            id="fulldescription"
            v-model="form.fulldescription"
            required
            rows="6"
            placeholder="Write the full project story, features, and context"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="tech" class="mb-2 block text-sm font-medium text-slate-700">
              Tech Stack
            </label>
            <textarea
              id="tech"
              v-model="form.tech"
              required
              rows="6"
              placeholder="Enter one technology per line"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
            <p class="mt-2 text-xs text-slate-500">
              Use a new line for each technology.
            </p>
          </div>

          <div>
            <label for="screenshots" class="mb-2 block text-sm font-medium text-slate-700">
              Screenshots
            </label>
            <textarea
              id="screenshots"
              v-model="form.screenshots"
              required
              rows="6"
              placeholder="Enter one image URL per line"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
            <p class="mt-2 text-xs text-slate-500">
              Use a new line for each screenshot URL.
            </p>
          </div>
        </div>

        <div>
          <label for="live_url" class="mb-2 block text-sm font-medium text-slate-700">
            Live URL
          </label>
          <input
            id="live_url"
            v-model="form.live_url"
            type="url"
            placeholder="https://your-project-demo.com"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <NuxtLink
            to="/admin/project"
            class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? 'Updating...' : 'Update Project' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

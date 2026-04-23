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

const config = useRuntimeConfig()
const route = useRoute()
const isDeleteModalOpen = ref(false)
const selectedProject = ref<ProjectItem | null>(null)
const deleteErrorMessage = ref('')
const isDeleting = ref(false)
let successNotificationTimeout: ReturnType<typeof setTimeout> | null = null
const notificationMessage = ref<{ title: string; description: string } | null>(null)

const successMessage = computed(() => {
  if (notificationMessage.value) {
    return notificationMessage.value
  }

  if (route.query.success === 'created') {
    return {
      title: 'Project added successfully.',
      description: 'The new entry has been added to the project list.'
    }
  }

  if (route.query.success === 'updated') {
    return {
      title: 'Project updated successfully.',
      description: 'Your changes have been saved to the project list.'
    }
  }

  return null
})

const {
  data: projects,
  pending,
  error,
  refresh
} = await useFetch<ProjectItem[]>('/api/admin/projects', {
  baseURL: config.public.apiBase
})

function truncateText(text: string, maxLength = 180) {
  if (!text) return '-'
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength).trimEnd()}...`
}

function openDeleteModal(item: ProjectItem) {
  selectedProject.value = item
  deleteErrorMessage.value = ''
  isDeleteModalOpen.value = true
}

function closeDeleteModal() {
  if (isDeleting.value) return

  isDeleteModalOpen.value = false
  selectedProject.value = null
  deleteErrorMessage.value = ''
}

async function handleDeleteProject() {
  if (!selectedProject.value) return

  deleteErrorMessage.value = ''
  isDeleting.value = true

  try {
    await $fetch(`/api/admin/projects/${selectedProject.value.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase
    })

    await refresh()
    isDeleting.value = false
    closeDeleteModal()
    notificationMessage.value = {
      title: 'Project deleted successfully.',
      description: 'The selected entry has been removed from the project list.'
    }
  } catch (error: any) {
    deleteErrorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Failed to delete the project.'
  } finally {
    if (isDeleting.value) {
      isDeleting.value = false
    }
  }
}

function handleCloseNotification() {
  notificationMessage.value = null

  if (route.query.success) {
    navigateTo('/admin/project', { replace: true })
  }
}

watch(successMessage, (value) => {
  if (successNotificationTimeout) {
    clearTimeout(successNotificationTimeout)
    successNotificationTimeout = null
  }

  if (!value) return

  successNotificationTimeout = setTimeout(() => {
    handleCloseNotification()
  }, 3000)
}, { immediate: true })

onBeforeUnmount(() => {
  if (!successNotificationTimeout) return

  clearTimeout(successNotificationTimeout)
})
</script>

<template>
  <section class="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
    <div class="mx-auto max-w-6xl">
      <div
        v-if="successMessage"
        class="fixed left-1/2 top-6 z-50 w-full max-w-md -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 shadow-lg"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3">
            <PhosphorIcon name="check-circle" class="mt-0.5 size-5 shrink-0" />
            <div>
              <p class="text-sm font-semibold">
                {{ successMessage.title }}
              </p>
              <p class="mt-1 text-sm text-emerald-700">
                {{ successMessage.description }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex items-center rounded-md p-1 text-emerald-700 transition hover:bg-emerald-100"
            @click="handleCloseNotification"
          >
            <PhosphorIcon name="x" class="size-4" />
          </button>
        </div>
      </div>

      <div class="mb-8 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            Admin Panel
          </p>
          <h1 class="mt-2 text-3xl font-bold font-yatra text-slate-950">
            Manage Projects
          </h1>
          <p class="mt-2 text-sm text-slate-600">
            Manage the portfolio project list, including technology, screenshots, and live URL.
          </p>
        </div>

        <NuxtLink
          to="/admin/project/add"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <PhosphorIcon name="plus-circle" class="size-5" />
          Add Project
        </NuxtLink>
      </div>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/30">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">
            Project List
          </h2>
        </div>

        <div v-if="pending" class="px-6 py-12 text-center">
          <p class="text-sm text-slate-500">Loading project data...</p>
        </div>

        <div v-else-if="error" class="px-6 py-12 text-center">
          <p class="text-sm font-semibold text-red-600">
            Gagal mengambil data project.
          </p>
        </div>

        <div v-else-if="projects?.length" class="divide-y divide-slate-200">
          <article
            v-for="item in projects"
            :key="item.id"
            class="flex flex-col gap-5 px-6 py-5"
          >
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div class="min-w-0 flex-1">
                <div class="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-3">
                      <h3 class="text-xl font-semibold text-slate-950">
                        {{ item.title }}
                      </h3>
                      <span class="inline-flex w-fit rounded-sm bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        #{{ item.id }}
                      </span>
                    </div>

                    <p class="mt-2 text-sm text-slate-500">
                      /{{ item.slug }}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <PhosphorIcon name="code" class="size-4" />
                      {{ item.tech?.length || 0 }} tech
                    </span>
                    <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <PhosphorIcon name="image" class="size-4" />
                      {{ item.screenshots?.length || 0 }} screenshots
                    </span>
                    <span
                      class="inline-flex items-center gap-2 rounded-full px-3 py-1"
                      :class="item.live_url ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
                    >
                      <PhosphorIcon :name="item.live_url ? 'link' : 'link-break'" class="size-4" />
                      {{ item.live_url ? 'Live URL available' : 'No Live URL' }}
                    </span>
                  </div>
                </div>

                <p class="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
                  {{ truncateText(item.description, 220) }}
                </p>

                <p class="mt-3 max-w-4xl text-sm leading-6 text-slate-500">
                  {{ truncateText(item.fulldescription, 280) }}
                </p>

                <div v-if="item.tech?.length" class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="techItem in item.tech"
                    :key="techItem"
                    class="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white"
                  >
                    {{ techItem }}
                  </span>
                </div>

                <a
                  v-if="item.live_url"
                  :href="item.live_url"
                  target="_blank"
                  rel="noreferrer"
                  class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  <PhosphorIcon name="arrow-square-out" class="size-4" />
                  Visit live project
                </a>
              </div>

              <div class="flex flex-wrap gap-3">
                <NuxtLink
                  :to="`/admin/project/${item.id}`"
                  class="inline-flex items-center gap-2 rounded-lg border border-amber-600 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
                >
                  <PhosphorIcon name="pencil-simple" class="size-4" />
                  Edit
                </NuxtLink>

                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border border-red-600 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
                  @click="openDeleteModal(item)"
                >
                  <PhosphorIcon name="trash" class="size-4" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="px-6 py-12 text-center">
          <PhosphorIcon name="folders" class="mx-auto size-10 text-slate-300" />
          <p class="mt-4 text-base font-semibold text-slate-700">
            No project data yet
          </p>
          <p class="mt-2 text-sm text-slate-500">
            Add your first project entry to display it in the portfolio.
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-6 backdrop-blur-sm"
      @click="closeDeleteModal"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        @click.stop
      >
        <div class="flex items-start gap-3">
          <div class="flex size-11 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <PhosphorIcon name="warning" class="size-6" />
          </div>

          <div class="min-w-0 flex-1">
            <h2 class="text-lg font-semibold text-slate-900">
              Delete this project?
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Project
              <span class="font-semibold text-slate-800">
                {{ selectedProject?.title }}
              </span>
              will be removed from the project list.
            </p>
          </div>
        </div>

        <p
          v-if="deleteErrorMessage"
          class="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {{ deleteErrorMessage }}
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            :disabled="isDeleting"
            @click="closeDeleteModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isDeleting"
            @click="handleDeleteProject"
          >
            {{ isDeleting ? 'Deleting...' : 'Yes, Delete' }}
          </button>
        </div>
      </div>
    </div>
          <div class="flex flex-col gap-3 sm:flex-row pt-10 pl-[90px]">
        <NuxtLink
        to="/admin/dashboard"
         class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-9 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </NuxtLink>
      </div>
  </section>
</template>

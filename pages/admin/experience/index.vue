<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: 'admin-auth'
})

type ExperienceItem = {
  id: number
  role: string
  company: string
  start_date: string
  end_date: string | null
  description: string
  points: string[]
}

const config = useRuntimeConfig()
const route = useRoute()
const isDeleteModalOpen = ref(false)
const selectedExperience = ref<ExperienceItem | null>(null)
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
      title: 'Experience added successfully.',
      description: 'The new entry has been added to the experience list.'
    }
  }

  if (route.query.success === 'updated') {
    return {
      title: 'Experience updated successfully.',
      description: 'Your changes have been saved to the experience list.'
    }
  }

  return null
})

const {
  data: experiences,
  pending,
  error,
  refresh
} = await useFetch<ExperienceItem[]>('/api/admin/experiences', {
  baseURL: config.public.apiBase
})

function formatPeriod(start: string, end: string | null) {
  return `${start} - ${end || 'Present'}`
}

function openDeleteModal(item: ExperienceItem) {
  selectedExperience.value = item
  deleteErrorMessage.value = ''
  isDeleteModalOpen.value = true
}

function closeDeleteModal() {
  if (isDeleting.value) return

  isDeleteModalOpen.value = false
  selectedExperience.value = null
  deleteErrorMessage.value = ''
}

async function handleDeleteExperience() {
  if (!selectedExperience.value) return

  deleteErrorMessage.value = ''
  isDeleting.value = true

  try {
    await $fetch(`/api/admin/experiences/${selectedExperience.value.id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase
    })

    await refresh()
    isDeleting.value = false
    closeDeleteModal()
    notificationMessage.value = {
      title: 'Experience deleted successfully.',
      description: 'The selected entry has been removed from the experience list.'
    }
  } catch (error: any) {
    deleteErrorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Failed to delete the experience.'
  } finally {
    if (isDeleting.value) {
      isDeleting.value = false
    }
  }
}

function handleCloseNotification() {
  notificationMessage.value = null

  if (route.query.success) {
    navigateTo('/admin/experience', { replace: true })
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
            Manage Experience
          </h1>
          <p class="mt-2 text-sm text-slate-600">
            Manage the list of work experience or organizations that appear in the portfolio.
          </p>
        </div>

        <NuxtLink
          to="/admin/experience/add"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <PhosphorIcon name="plus-circle" class="size-5" />
          Add Experience
        </NuxtLink>
      </div>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/30">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">
            Experience List
          </h2>
        </div>

        <div v-if="pending" class="px-6 py-12 text-center">
          <p class="text-sm text-slate-500">Loading experience data...</p>
        </div>

        <div v-else-if="error" class="px-6 py-12 text-center">
          <p class="text-sm font-semibold text-red-600">
            Gagal mengambil data experience.
          </p>
        </div>

        <div v-else-if="experiences?.length" class="divide-y divide-slate-200">
          <article
            v-for="item in experiences"
            :key="item.id"
            class="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-start lg:justify-between"
          >
            <div class="min-w-0 flex-1">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-xl font-semibold text-slate-950">
                  {{ item.role }}
                </h3>
                <span class="inline-flex w-fit rounded-sm bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {{ formatPeriod(item.start_date, item.end_date) }}
                </span>
              </div>

              <p class="mt-1 text-sm font-medium text-slate-700">
                {{ item.company }}
              </p>

              <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {{ item.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <NuxtLink
                :to="`/admin/experience/${item.id}`"
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
          </article>
        </div>

        <div v-else class="px-6 py-12 text-center">
          <PhosphorIcon name="briefcase" class="mx-auto size-10 text-slate-300" />
          <p class="mt-4 text-base font-semibold text-slate-700">
            No experience data yet
          </p>
          <p class="mt-2 text-sm text-slate-500">
            Add your first experience entry to display it on the portfolio.
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
              Delete this experience?
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              The experience
              <span class="font-semibold text-slate-800">
                {{ selectedExperience?.role }}
              </span>
              at
              <span class="font-semibold text-slate-800">
                {{ selectedExperience?.company }}
              </span>
              will be removed from the list.
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
            @click="handleDeleteExperience"
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

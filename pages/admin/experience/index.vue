<script lang="ts" setup>

definePageMeta({
  layout: false,
  middleware: 'admin-auth'
})

type ExperienceItem = {
  id: number
  role: string
  company: string
  period: string
  description: string
}

const experiences = ref<ExperienceItem[]>([
  {
    id: 1,
    role: 'Application Developer Intern',
    company: 'Metrodata Academy',
    period: 'Feb 2024 - Jun 2024',
    description: 'Focused on modern UI development, REST API integration, and website performance optimization.'
  },
  {
    id: 2,
    role: 'Media and Communication Director',
    company: 'Campus Organization',
    period: '2023 - 2024',
    description: 'Managed digital content strategy, publication coordination, and stronger organizational brand communication.'
  }
])

function handleAddExperience() {
  console.log('Add experience placeholder')
}

function handleEditExperience(id: number) {
  console.log('Edit experience placeholder', id)
}

function handleDeleteExperience(id: number) {
  console.log('Delete experience placeholder', id)
}
</script>

<template>
  <section class="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
    <div class="mx-auto max-w-6xl">
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

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
          @click="handleAddExperience"
        >
          <PhosphorIcon name="plus-circle" class="size-5" />
          Add Experience
        </button>
      </div>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/30">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">
            Experience List
          </h2>
        </div>

        <div v-if="experiences.length" class="divide-y divide-slate-200">
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
                  {{ item.period }}
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
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg border border-green-600 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
                @click="handleEditExperience(item.id)"
              >
                <PhosphorIcon name="pencil-simple" class="size-4" />
                Edit
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg border border-red-600 bg-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
                @click="handleDeleteExperience(item.id)"
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
  </section>
</template>

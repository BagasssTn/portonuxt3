<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: 'admin-auth'
})

const form = ref({
  role: '',
  company: '',
  start_date: '',
  end_date: '',
  description: '',
  points: ''
})

function handleSubmit() {
  console.log('Add experience placeholder', {
    ...form.value,
    points: form.value.points
      .split('\n')
      .map((point) => point.trim())
      .filter(Boolean)
  })
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
          Add Experience
        </h1>
        <p class="mt-2 text-sm text-slate-600">
          Fill out the form below to create a new experience entry for your portfolio.
        </p>
      </div>

      <form
        class="space-y-6 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="role" class="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>
            <input
              id="role"
              v-model="form.role"
              type="text"
              placeholder="Enter role"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
          </div>

          <div>
            <label for="company" class="mb-2 block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              id="company"
              v-model="form.company"
              type="text"
              placeholder="Enter company name"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="start_date" class="mb-2 block text-sm font-medium text-slate-700">
              Start Date
            </label>
            <input
              id="start_date"
              v-model="form.start_date"
              type="date"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
          </div>

          <div>
            <label for="end_date" class="mb-2 block text-sm font-medium text-slate-700">
              End Date
            </label>
            <input
              id="end_date"
              v-model="form.end_date"
              type="date"
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
            rows="4"
            placeholder="Write a short description"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label for="points" class="mb-2 block text-sm font-medium text-slate-700">
            Points
          </label>
          <textarea
            id="points"
            v-model="form.points"
            rows="6"
            placeholder="Enter one point per line"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
          <p class="mt-2 text-xs text-slate-500">
            Use a new line for each bullet point.
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <NuxtLink
            to="/admin/experience"
            class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Save Experience
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

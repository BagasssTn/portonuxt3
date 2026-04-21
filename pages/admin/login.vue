<script lang="ts" setup>
definePageMeta({
  layout: false
})

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const config = useRuntimeConfig()
const router = useRouter()

interface LoginResponse {
  token: string
}

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await $fetch<LoginResponse>('/api/admin/login', {
      method: 'POST',
      baseURL: config.public.apiBase,
      body: {
        username: username.value,
        password: password.value
      }
    })

    localStorage.setItem('admin_token', response.token)
    await router.push('/admin/experience')
  } catch (error: any) {
    errorMessage.value = error?.data?.message || 'Login gagal'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen bg-gradient-to-r from-blue-700 to-purple-800 px-6 py-10 text-slate-950">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
      <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/40 sm:p-10">
        <div class="mb-8 text-center">
          <h1 class="mt-3 text-5xl font-bold font-yatra text-slate-950">
            Welcome Back!
          </h1>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <PhosphorIcon name="user" class="size-5" />
              </span>
              <input
                id="username"
                v-model="username"
                type="text"
                autocomplete="username"
                placeholder="Enter username"
                class="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
            </div>
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <PhosphorIcon name="lock" class="size-5" />
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Enter password"
                class="w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition hover:text-blue-700 focus:outline-none"
                :aria-label="showPassword ? 'Hide Password' : 'Show Password'"
                @click="showPassword = !showPassword"
              >
                <PhosphorIcon
                  :name="showPassword ? 'eye-slash' : 'eye'"
                  class="size-5"
                />
              </button>
            </div>
          </div>

        <p v-if="errorMessage" class="text-sm text-red-600">
            {{ errorMessage }}
        </p>
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow shadow-black"
          >
          {{ loading ? 'Loading...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

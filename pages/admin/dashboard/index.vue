<script lang="ts" setup>
definePageMeta({
    layout: false,
})
</script>

<template>
<section class="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
    <div class="mx-auto max-w-4xl">
        <div class="mb-8 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                Admin panel
            </p>
            <h1 class="mt-2 text-3xl font-bold font-yatra text-slate-950">
                Dashboard
            </h1>
            <p class="mt-2 text-sm text-slate-600">
                Admin can update data for project & experience
            </p>
        </div>

        <div class="mb-8 grid gap-5 rounded-xl bg-white p-6 shadow-xl shadow-slate-300/30 md:grid-cols-2">
            <NuxtLink to="/admin/experience" class="relative flex min-h-[180px] flex-col items-center justify-center rounded-xl bg-gray-200 px-6 py-8 text-center transition hover:bg-gray-300">
                <div class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white">
                    <PhosphorIcon name="arrow-up-right" class="size-5"/>
                </div>

                <PhosphorIcon name="briefcase" class="mb-4 size-14 text-blue-950"/>
                <p class="text-xl font-semibold text-slate-900">
                    Work Experience
                </p>
            </NuxtLink>

            <NuxtLink to="/admin/project" class="relative flex min-h-[180px] flex-col items-center justify-center rounded-xl bg-gray-200 px-6 py-8 text-center transition hover:bg-gray-300">
                <div class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white">
                    <PhosphorIcon name="arrow-up-right" class="size-5"/>
                </div>

                <PhosphorIcon name="archive" class="mb-4 size-14 text-blue-950"/>
                <p class="text-xl font-semibold text-slate-900">
                    Project
                </p>
            </NuxtLink>

            <div class="flex justify-center md:col-span-2">
                <NuxtLink to="/" class="flex min-h-[100px] w-full max-w-md items-center justify-center rounded-xl bg-red-300 px-6 py-6 text-center transition hover:bg-red-400">
                    <PhosphorIcon name="arrow-elbow-down-left" class="mr-3 size-6"/>
                    <p class="text-lg font-semibold text-slate-900">
                        Back To Portofolio
                    </p>
                </NuxtLink>
            </div>
        </div>
    </div>
</section>
</template>

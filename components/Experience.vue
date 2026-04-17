<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)

let observer = null

onMounted(() => {
  const elements = containerRef.value.querySelectorAll('.exp-item')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 0.2}s`
          entry.target.classList.add('animate-fadeUp')
        }
      })
    },
    { threshold: 0.2 }
  )

  elements.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer && containerRef.value) {
    const elements = containerRef.value.querySelectorAll('.exp-item')
    elements.forEach((el) => observer.unobserve(el))
  }
})

const experiences = [
  {
    role: "Application Developer Intern",
    company: "Metrodata Academy",
    period: "Feb 2024 - Jun 2024",
    description:
      "Worked as part of a development team focusing on frontend implementation using modern web technologies.",
    points: [
      "Developed responsive UI components using React and Tailwind CSS.",
      "Integrated REST APIs from backend services.",
      "Improved website performance and optimized loading speed.",
      "Collaborated with designers to maintain consistent UI/UX standards.",
    ],
  },
]
</script>

<template>
  <section id="experience" class="bg-gray-100 dark:bg-gray-950 text-white py-28 px-6">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold mb-16 text-center text-gray-950  dark:text-white">
        Work <span class="text-blue-900 dark:text-blue-400">Experience</span>
      </h2>

      <div
        ref="containerRef"
        class="relative border-l border-blue-900 dark:border-gray-700"
      >
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="exp-item opacity-1 animate-fadeUp mb-12 ml-6"
        >
          <span class="absolute -left-3 w-6 h-6 bg-blue-800 dark:bg-blue-500 rounded-full border-4 dark:border-gray-90 border-gray-100"></span>

          <div class="bg-gray-200 text-gray-950 dark:text-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition duration-500">
            <h3 class="text-xl font-semibold">
              {{ exp.role }}
            </h3>

            <p class="text-blue-800 dark:text-blue-400 text-sm mb-3">
              {{ exp.company }} • {{ exp.period }}
            </p>

            <p class="text-gray-800 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {{ exp.description }}
            </p>

            <!-- Bullet Points -->
            <ul class="text-gray-800 dark:text-gray-400 text-sm leading-relaxed space-y-2">
              <li
                v-for="(point, i) in exp.points"
                :key="i"
                class="flex items-start gap-2"
              >
                <span class="text-blue-800 dark:text-blue-400">•</span>
                <span>{{ point }}</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
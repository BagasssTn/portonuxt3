<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-950 text-white pt-24 pb-12 px-6 border-t border-gray-800">
    <div class="max-w-5xl mx-auto text-center">

      <h2 class="text-4xl font-bold text-blue-400 mb-12">
        Bagas Tricahya Nugraha
      </h2>

      <div class="bg-gray-900 border border-gray-800 p-10 rounded-3xl shadow-lg max-w-2xl mx-auto">

        <h3 class="text-xl font-semibold mb-8">
          Get In Touch
        </h3>

        <div class="space-y-6 text-gray-400">

          <!-- EMAIL -->
          <a
            href="mailto:bagas.nugrah201@email.com?subject=Let's Work Together&body=Hi Bagas,"
            class="group flex items-center justify-center gap-4 hover:text-blue-400 transition"
          >
            <PhosphorIcon 
              name="envelope"
              class="transition-transform duration-300 group-hover:-rotate-12"
            />
            bagas.nugrah201@gmail.com
          </a>

          <!-- WHATSAPP -->
          <a
            href="https://wa.me/6283893885871"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center gap-4 hover:text-blue-400 transition"
          >
            <PhosphorIcon 
              name="phone"
              class="transition-transform duration-300 group-hover:-rotate-12"
            />
            +62 838-9388-5871
          </a>

          <!-- LINKEDIN -->
          <a
            href="https://linkedin.com/in/bagassstn"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center gap-4 hover:text-blue-400 transition"
          >
            <PhosphorIcon 
              name="linkedin-logo"
              class="transition-transform duration-300 group-hover:-rotate-12"
            />
            linkedin.com/in/bagassstn
          </a>

        </div>
      </div>

      <div class="border-t border-gray-800 my-12"></div>

      <p class="text-gray-500 text-sm">
        © {{ year }}
        <span class="text-blue-400 font-medium">
          Bagas Tricahya Nugraha
        </span>
        All rights reserved.
      </p>

    </div>
  </footer>
</template>
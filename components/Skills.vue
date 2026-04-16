<script setup>
import html from '@/assets/HTML.svg'
import css from '@/assets/CSS.svg'
import js from '@/assets/JavaScript.svg'
import react from '@/assets/react.svg'
import tailwind from '@/assets/Tailwind.svg'
import mysql from '@/assets/MySQL.svg'
import canva from '@/assets/Canva.svg'
import figma from '@/assets/Figma.svg'
import nuxt from '@/assets/Nuxt.svg'


const skills = [
    { name: "HTML", icon: html },
    { name: "CSS", icon: css },
    { name: "JavaScript", icon: js },
    { name: "React", icon: react },
    { name: "Tailwind", icon: tailwind },
    { name: "MySQL", icon: mysql },
    { name: "Canva", icon: canva },
    { name: "Figma", icon: figma },
    { name: "Nuxt", icon: nuxt },

]
</script>

<template>
  <section id="skills" class="bg-gray-900 text-white py-24 overflow-hidden">
    
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold">
        My <span class="text-blue-400">Skills</span>
      </h2>
    </div>

    <div class="relative w-full overflow-hidden">
      <div class="flex animate-scroll gap-20 w-max">

        <div
          v-for="(skill, index) in [...skills, ...skills,]"
          :key="index"
          class="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 transition duration-300 px-10 py-8 rounded-2xl shadow-lg min-w-[180px]"
        >
          
          <!-- ICON -->
          <img 
            :src="skill.icon"
            alt="skill"
            class="size-14 text-blue-400 transition duration-300 hover:scale-110"
          />

          <span class="mt-4 text-lg font-semibold">
            {{ skill.name }}
          </span>

        </div>

      </div>
    </div>

  </section>
</template>
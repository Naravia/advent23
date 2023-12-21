<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const days = ref([
  { day: 1, title: 'Day 1', link: '/day1', available: true },
  { day: 2, title: 'Day 2', link: '/day2', available: false },
  { day: 3, title: 'Day 3', link: '/day3', available: false },
  { day: 4, title: 'Day 4', link: '/day4', available: false },
  { day: 5, title: 'Day 5', link: '/day5', available: false },
  { day: 6, title: 'Day 6', link: '/day6', available: false },
  { day: 7, title: 'Day 7', link: '/day7', available: false },
  { day: 8, title: 'Day 8', link: '/day8', available: false },
  { day: 9, title: 'Day 9', link: '/day9', available: false },
  { day: 10, title: 'Day 10', link: '/day10', available: false },
  { day: 11, title: 'Day 11', link: '/day11', available: false },
  { day: 12, title: 'Day 12', link: '/day12', available: false },
  { day: 13, title: 'Day 13', link: '/day13', available: false },
  { day: 14, title: 'Day 14', link: '/day14', available: false },
  { day: 15, title: 'Day 15', link: '/day15', available: false },
  { day: 16, title: 'Day 16', link: '/day16', available: false },
  { day: 17, title: 'Day 17', link: '/day17', available: false },
  { day: 18, title: 'Day 18', link: '/day18', available: false },
  { day: 19, title: 'Day 19', link: '/day19', available: false },
  { day: 20, title: 'Day 20', link: '/day20', available: false },
  { day: 21, title: 'Day 21', link: '/day21', available: false },
  { day: 22, title: 'Day 22', link: '/day22', available: false },
  { day: 23, title: 'Day 23', link: '/day23', available: false },
  { day: 24, title: 'Day 24', link: '/day24', available: false }
])
</script>

<template>
  <div class="my-8">
    <main class="container bg-gray-100 rounded-3xl mx-auto p-4 px-8">
      <div class="mx-auto w-max">
        <h1 class="text-4xl">Advent of Code 2023</h1>
      </div>

      <div class="justify-center grid grid-cols-2 pt-4">
        <RouterLink to="/" class="nav-button w-80"> Home </RouterLink>
        <a href="https://adventofcode.com/2023" class="nav-button w-80"> Advent of Code 2023 </a>
      </div>

      <div class="justify-center grid grid-cols-8 pt-4">
        <div v-for="day in days" :key="day.day" class="py-1">
          <RouterLink :to="day.link" class="nav-button w-28" v-if="day.available">
            {{ day.title }}
          </RouterLink>
          <div class="nav-button w-28 bg-gray-200 cursor-not-allowed opacity-50" v-else>
            {{ day.title }}
          </div>
        </div>
      </div>

      <div class="pt-4">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply border-green-400;
}

.nav-button {
  @apply bg-gray-200 hover:bg-gray-300 p-2 px-4 mx-auto text-center border-2 inline-block rounded-md;
}
</style>

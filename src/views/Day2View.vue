<script setup>
import { ref, computed } from 'vue'

const puzzleInput = ref('')
const day1Solution = computed(() => {
  if (!puzzleInput.value) {
    return 'Waiting for puzzle input...'
  }
  let output = ''
  const lines = puzzleInput.value.split('\n').filter((l) => !!l)
  output += `Scanning ${lines.length} lines for valid games...<br>`

  // Map the lines into an easier format to work with
  const games = lines.map((l) => {
    const game = {
      id: null,
      rolls: []
    }
    const lineMatches = /^Game (\d+): (.*)/.exec(l)
    if (!lineMatches) {
      return null
    }
    game.id = parseInt(lineMatches[1])
    const rolls = lineMatches[2] + ';'
    const rollsRegex = /([\d\s\w,]+);/g
    const rollsMatches = rolls
      .match(rollsRegex)
      .map((roll) => roll.replace(';', '').trim())
      .map((roll) => {
        const diceRegex = /(\d+)\s(\w+)/g
        const diceMatches = roll.match(diceRegex).map((dice) => dice.trim())
        const dice = diceMatches.map((dice) => {
          const diceParts = dice.split(' ')
          return {
            number: parseInt(diceParts[0]),
            color: diceParts[1]
          }
        })
        return dice
      })
    game.rolls = rollsMatches
    return game
  })
  const validGames = games.filter((game) => {
    const maxCubes = {
      red: 12,
      green: 13,
      blue: 14
    }
    for (const roll of game.rolls) {
      for (const die of roll) {
        if (die.number > maxCubes[die.color]) {
          return false
        }
      }
    }
    return true
  })
  output += `Found ${validGames.length} valid games.<br>`
  const sum = validGames.reduce((sum, game) => sum + game.id, 0)
  output += `Sum of valid game IDs: ${sum}<br>`
  return output
})
const day2Solution = computed(() => {
  if (!puzzleInput.value) {
    return 'Waiting for puzzle input...'
  }
  let output = ''
  const lines = puzzleInput.value.split('\n').filter((l) => !!l)
  output += `Scanning ${lines.length} lines for games...<br>`

  // Map the lines into an easier format to work with
  const games = lines.map((l) => {
    const game = {
      id: null,
      rolls: []
    }
    const lineMatches = /^Game (\d+): (.*)/.exec(l)
    if (!lineMatches) {
      return null
    }
    game.id = parseInt(lineMatches[1])
    const rolls = lineMatches[2] + ';'
    const rollsRegex = /([\d\s\w,]+);/g
    const rollsMatches = rolls
      .match(rollsRegex)
      .map((roll) => roll.replace(';', '').trim())
      .map((roll) => {
        const diceRegex = /(\d+)\s(\w+)/g
        const diceMatches = roll.match(diceRegex).map((dice) => dice.trim())
        const dice = diceMatches.map((dice) => {
          const diceParts = dice.split(' ')
          return {
            number: parseInt(diceParts[0]),
            color: diceParts[1]
          }
        })
        return dice
      })
    game.rolls = rollsMatches
    return game
  })
  const minimumDiceRequired = games.map((game) => {
    const diceRequired = {
      red: 0,
      green: 0,
      blue: 0
    }
    for (const roll of game.rolls) {
      for (const die of roll) {
        diceRequired[die.color] = Math.max(diceRequired[die.color], die.number)
      }
    }
    return { ...diceRequired, total: diceRequired.red * diceRequired.green * diceRequired.blue }
  })
  const sum = minimumDiceRequired.reduce((sum, game) => sum + game.total, 0)
  output += `Sum of minimum dice required: ${sum}<br>`
  return output
})
</script>

<template>
  <main>
    <hr class="py-2" />
    <h1 class="text-3xl text-center">Day 2: Cube Conundrum</h1>
    <div class="grid grid-cols-3 space-x-4">
      <div class="space-y-2">
        <h1 class="text-xl">Input:</h1>
        <textarea class="min-h-64 w-full bg-red-100 resize-none" v-model="puzzleInput"></textarea>
      </div>
      <div class="space-y-2">
        <h1 class="text-xl">Part 1:</h1>
        <div class="code min-h-64 w-full" v-html="day1Solution"></div>
      </div>
      <div class="space-y-2">
        <h1 class="text-xl">Part 2:</h1>
        <div class="code min-h-64 w-full" v-html="day2Solution"></div>
      </div>
    </div>
  </main>
</template>

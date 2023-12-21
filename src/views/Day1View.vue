<script setup>
import { ref, computed } from 'vue'
import StoryPrompt from '@/components/StoryPrompt.vue'

const puzzleInput = ref('')
const day1Solution = computed(() => {
  if (!puzzleInput.value) {
    return 'Waiting for puzzle input...'
  }
  let output = ''
  const lines = puzzleInput.value.split('\n').filter((l) => !!l)
  output += `Scanning for digits in ${lines.length} lines of input...<br>`
  let sum = 0
  const digitRegex = /(\d)/g

  let lineNumber = 0
  for (const line of lines) {
    lineNumber++
    const matches = line.match(digitRegex)
    if (!matches || matches.length === 0) {
      output += `<span class="text-red-600">Failed to locate any digits in line ${lineNumber}.</span><br>`
      continue
    }
    if (matches.length === 1) {
      matches.push(matches[0])
    }

    const first = matches[0]
    const last = matches[matches.length - 1]
    const result = parseInt(`${first}${last}}`)
    if (isNaN(result)) {
      continue
    }
    sum += result
  }
  output += `<div class="text-green-600">Sum of all digits: ${sum}</div>`
  return output
})
const day2Solution = computed(() => {
  if (!puzzleInput.value) {
    return 'Waiting for puzzle input...'
  }
  let output = ''
  const lines = puzzleInput.value.split('\n').filter((l) => !!l)
  output += `Scanning for digits in ${lines.length} lines of input...<br>`
  const digitRegex = /(\d)/g
  const numbers = ['invalid_number', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  let lineNumber = 0
  let sum = 0
  for (const line of lines) {
    lineNumber++
    let firstDigit = {
      pos: 9999,
      number: -1
    }
    let lastDigit = {
      pos: -1,
      number: -1
    }
    for (const number of numbers) {
      let position = line.indexOf(number)
      if (position === -1) {
        continue
      }
      if (position < firstDigit.pos) {
        firstDigit.pos = position
        firstDigit.number = numbers.indexOf(number)
      }
    }
    for (const number of numbers) {
      let position = line.lastIndexOf(number)
      if (position === -1) {
        continue
      }
      if (position > lastDigit.pos) {
        lastDigit.pos = position
        lastDigit.number = numbers.lastIndexOf(number)
      }
    }
    const matches = line.match(digitRegex)
    if (matches) {
      if (matches.length === 1) {
        matches.push(matches[0])
      }
      const first = matches[0]
      const last = matches[matches.length - 1]
      const firstPosition = line.indexOf(first)
      const lastPosition = line.lastIndexOf(last)
      if (firstPosition < firstDigit.pos) {
        firstDigit.pos = firstPosition
        firstDigit.number = parseInt(first)
      }
      if (lastPosition > lastDigit.pos) {
        lastDigit.pos = lastPosition
        lastDigit.number = parseInt(last)
      }
    }
    sum += parseInt(`${firstDigit.number}${lastDigit.number}`)
  }
  output += `<div class="text-green-600">Sum of all digits: ${sum}</div>`
  return output
})
</script>

<template>
  <main>
    <hr class="py-2" />
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
    <StoryPrompt
      title="Day 1: Trebuchet?!"
      v-if="false && 'This seemed like a good idea at the time but I changed my mind'"
    >
      <div>
        Something is wrong with global snow production, and you've been selected to take a look. The
        Elves have even given you a map; on it, they've used stars to mark the top fifty locations
        that are likely to be having problems.
      </div>
      <div>
        You've been doing this long enough to know that to restore snow operations, you need to
        check all fifty stars by December 25th.
      </div>

      <div>
        Collect stars by solving puzzles. Two puzzles will be made available on each day in the
        Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle
        grants one star. Good luck!
      </div>
      <div>
        You try to ask why they can't just use a weather machine ("not powerful enough") and where
        they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a
        lot of questions") and hang on did you just say the sky ("of course, where do you think snow
        comes from") when you realize that the Elves are already loading you into a trebuchet
        ("please hold still, we need to strap you in").
      </div>
      <div>
        As they're making the final adjustments, they discover that their calibration document (your
        puzzle input) has been amended by a very young Elf who was apparently just excited to show
        off her art skills. Consequently, the Elves are having trouble reading the values on the
        document.
      </div>
      <div>
        The newly-improved calibration document consists of lines of text; each line originally
        contained a specific calibration value that the Elves now need to recover. On each line, the
        calibration value can be found by combining the first digit and the last digit (in that
        order) to form a single two-digit number.
      </div>
      <div>For example:</div>

      <div>
        <pre class="code">
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet</pre
        >
      </div>

      <div>
        In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding
        these together produces 142.
      </div>

      <div>
        Consider your entire calibration document. What is the sum of all of the calibration values?
      </div>
    </StoryPrompt>
  </main>
</template>

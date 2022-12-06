# Advent of Code 2022

[![Build Status](https://github.com/jonahsnider/aoc-2022/workflows/CI/badge.svg)](https://github.com/jonahsnider/aoc-2022/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![codecov](https://codecov.io/gh/jonahsnider/aoc-2022/branch/main/graph/badge.svg)](https://codecov.io/jonahsnider/aoc-2022)

My Advent of Code 2022 solutions in TypeScript.

## Usage

### Initial setup

0. Install Node.js v18 or higher
1. Run `yarn`
2. Run `yarn build`

### Running the programs

Run `yarn start` to run all programs and print their results to the console.

You can also run `yarn start [...days]` to run only the specified days.

### Benchmarking the programs

Run `yarn start benchmark` to benchmark all programs and print their median execution times to the console.

You can also run `yarn start benchmark [...days]` to benchmark only the specified days.

### Solving a new day

1. Generate a new template by running `yarn template <day>`
2. Paste the puzzle input into the `<day>.txt` file printed to the console
3. Open the `<day>/index.ts` file printed to the console
4. Run `yarn build:dev` to build the project in watch mode
5. Run `yarn test:dev` to run the tests in watch mode

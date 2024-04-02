# Calculator project

This is the repository for my calculator project, made using HTML, SCSS and TypeScript.

## Getting started

Instructions:

1. Clone this repository
2. use npm install to install any required packages
3. Use npm run dev to use the web app.

## Calculator functionality

This calculator can do the basic operations (+, -, \* and /), and can also do some more advanced operations such as square and square root. Calculations can be continued from previous answers also.

It will follow the correct order of operations, so it will first do any exponents (squares and square roots), then will work left to right on multiplications and divisions, and then left to right on addition/subtractions.

The calculator is also able to handle certain special cases such a square root of a negative (will alert user of a Math error).

## Tips

1. In order to use the square/square root or change the sign of a number, the user must first type a number and then apply the operation.
2. The random() button will generate a random number between 0 and 1 (rounded to 5dp)

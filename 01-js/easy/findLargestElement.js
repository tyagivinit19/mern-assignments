/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let max = -99999999999;
    numbers.forEach(element => {
        if (element > max) {
            max = element;
        }
    });

    return numbers.length == 0 ? undefined: max;
}

module.exports = findLargestElement;
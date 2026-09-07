//         ARRAYS

// // creating array
// const arr = [1, "hello"];
// console.log(arr);

// // accessing elements
// console.log(arr[0]);
// console.log(arr[1]);

// // adding elements to array
// arr.push(5);
// console.log(arr);

// // removing elements from array
// arr.pop(5);
// console.log(arr);

// // updating elements in array
// arr[0] = "Orange";
// console.log(arr);

// // printing array length
// console.log("Array length: ", arr.length);

// const arr = [1, 2, 3, 4, 5, 6];

// arr.forEach((elem, index) => {
//   if(elem % 2 === 0){
//     console.log(elem);
//   }
// });

// Map
// const transformedArray = arr.map((elem) => elem * 2)
// console.log(transformedArray)

// Filter
// const evenArray = arr.filter(elem => elem % 2 === 0)
// console.log(evenArray)

// Find
// const value = arr.find(elem => elem % 2 !== 0);
// console.log(value);

// Some
// const isMatched = arr.some(elem => elem % 2 === 0);
// console.log(isMatched);

// Every
// const allMatched = arr.every((elem) => elem % 2 === 0);
// console.log(allMatched);

// Sort
// const sortedDesc = arr.sort((a, b) => b - a);
// console.log(sortedDesc);

// Reduce
// const sum = arr.reduce((sum, elem) => sum + elem, 0);
// console.log(sum);

//              FUNCTIONS

//addition
// function add(a, b){
//   console.log(a + b);
// }

// add(2, 3);

// Substraction
// function sub(a, b){
//   console.log(a - b);
// }

// sub(4, 3);

// Multiplication
// function mult(a, b){
//   console.log(a * b);
// }

// mult(4, 3);

// Division
// function div(a, b){
//   if(b === 0){
//     console.error("Number cant be divides by 0");
//     return;
//   }
//   console.log(a / b);
// }

// div(4, 0);

// Largest number
// function findLargest(a, b) {
//   if (a > b) {
//     console.log(a);
//     return;
//   }
//   console.log(b);
//   return;
// }

// findLargest(5, 4);

// Odd or Even
// function checkOddOrEven(n) {
//   if (n % 2 === 0) {
//     console.log("Number is even");
//     return;
//   }
//   console.log("Number is odd");
// }

// checkOddOrEven(4);

//            LOOPS
// print 1 to 100
// for (let i = 1; i <= 100; i++) {
//   console.log(i);
// }

// print even numbers
// for (let i = 1; i <= 20; i++) {
//   if (i % 2 === 0) {
//     console.log(i);
//   }
// }

// print odd numbers
// for (let i = 1; i <= 20; i++) {
//   if (i % 2 !== 0) {
//     console.log(i);
//   }
// }

// calculate Sum of numbers
// let sum = 0;
// for (let i = 1; i <= 10; i++) {
//   sum += i;
// }
// console.log(sum);

// Multiplication table
// function tables(n) {
//   for (let i = 1; i <= 10; i++) {
//     console.log(`${n} X ${i} = ${n * i}`);
//   }
// }

// tables(2);

// const day = 0;

// switch (day) {
//   case 1:
//     console.log("Monday");
//     break;

//   case 2:
//     console.log("Tuesday");
//     break;

//   case 3:
//     console.log("Wednesday");
//     break;

//   default:
//     console.log("Invalid day");
//     break;
// }

//           OBJECTS
// const employee = {
//   id: 1,
//   name: "John",
//   department: "Development",
//   salary: 50000,
// };

// // Accessing
// console.log(employee.name);

// // Updating
// employee.name = "Daksh";
// console.log(employee);

// // Adding properties
// employee.age = 21;
// console.log(employee);

// // Nested objects
// employee.address = {
//   city: "Ahmedabad",
//   postal: 380024,
// };

// console.log(employee)

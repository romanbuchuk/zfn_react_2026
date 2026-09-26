// var
// let
// const
// console.log('==========================');
// console.log(c);
// f();
// f2();
// console.log('==========================');

// const a = 5;
// let b = 10;
// var c = 15;

// console.log('==========================');
// console.log(a + 10);
// console.log('==========================');

// function f() {
//     console.log('Hello world!');
//     // return undefined;
//     return 10;
// }

// var f2 = function() {
//     console.log('Hello world 2!');
//     // return undefined;
// }
// const f3 = () => 4;
// const f3 = () => {
//     return 4;
//
//     // return undefined;
// }
// const f4 = a => a + 5;

// const f4 = (a) => {
//     return a + 5;
// };
// const f4 = function (a) {
//     return a + 5;
// };


// console.log(f4(10));


let arr = [1, 2, 3]; //     []
const arr2 = arr;

arr = [5, 6, 7];

arr2.push(2); // [1,2,3] <- 2. ==> [1,2,3,2]
// arr2.unshift(2) 2 -> [1,2,3] ==> [2,1,2,3];
// const a = 5;
// const b = a;

function f(props) {
    props.a = 100;
}

const o = {a: 5};
console.log(o);

f(o);

console.log(o);
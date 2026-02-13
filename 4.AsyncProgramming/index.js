//Callbacks

const { log } = require("console")

// setTimeout(() => {
//     console.log("hello");
// }, 1000);


//PROMISEs
const promise = new Promise((resolve, reject) => {
    console.log("promise is created");

    resolve("promise is resolved");
    // reject("promise is rejected");
});
    
promise.then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

//Async Await 
/**
 * This function is an example of an async/await function.
 * It simply returns a string.
 * @returns {string} The string returned by the function.
 */
async function asyncFunction() {
    //This function returns a string
    //It is an example of an async/await function
    return "this is async function";
}

asyncFunction().then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

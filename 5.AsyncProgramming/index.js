//priority queue
//callbacks 
//event loop
//promise
//async await   

//Example for all the events loop
setImmediate(() => {
    console.log("immediate");
});



process.nextTick(() => {
    console.log("next tick");
});



setTimeout(() => {
    console.log("setTimeout");
}, 0);



setInterval(() => {
    console.log("setInterval");
}, 1000);

// Problem : process.nextTick() is executed before setImmediate() and setTimeout() even if they are scheduled to execute after 0 milliseconds. This is because process.nextTick() is executed immediately after the current operation completes, while setImmediate() and setTimeout() are executed in the next iteration of the event loop.

//Solution : use setImmediate() instead of process.nextTick()

//starvation problem : if we have a long running process that is scheduled to execute in the next iteration of the event loop, it will never get executed because process.nextTick() will always be executed before it. This can lead to a situation where the long running process is never executed and the application becomes unresponsive.


//exponential backoff : it is a strategy to handle retries in case of failures. It is a technique where the time between retries increases exponentially with each failure. This is useful to avoid overwhelming the server with too many requests in case of failures. For example, if we have a retry mechanism that retries after 1 second, then after 2 seconds, then after 4 seconds, and so on. This way, we can avoid overwhelming the server with too many requests in case of failures.


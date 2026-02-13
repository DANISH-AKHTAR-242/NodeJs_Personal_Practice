//clusters
//means that we can create multiple processes to handle the load of our application

const cluster = require('cluster'); //cluster module is used to create multiple processes to handle the load of our application
const os = require('os'); //os module is used to get the number of CPUs in the system

if (cluster.isMaster) {
    const numCPUs = os.cpus().length; //get the number of CPUs in the system
    console.log(`Master process is running with PID ${process.pid}`); //log the master process ID
    console.log(`Number of CPUs: ${numCPUs}`); //log the number of CPUs
    for (let i = 0; i < numCPUs; i++) { //fork a new process for each CPU
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => { //listen for exit event of worker processes
        console.log(`Worker ${worker.process.pid} has exited with code ${code} and signal ${signal}`);
    });
} else {
    //slave process
    console.log(`Worker process is running with PID ${process.pid}`); //log the worker process ID   
    require('./index'); //require the index.js file to start the server in each worker process
}
//In this example, we are using the cluster module to create multiple processes to handle the load of our application. The master process will fork a new process for each CPU in the system, and each worker process will run the index.js file to start the server. The master process will also listen for the exit event of worker processes and log the exit information.

//scheduling policy
//round robin : it is the default scheduling policy in Node.js. In this policy, the master process will distribute the incoming requests to the worker processes in a round-robin manner. This means that the first request will be handled by the first worker process, the second request will be handled by the second worker process, and so on. This policy is simple and works well for most applications.
//load balancing : it is a scheduling policy where the master process will distribute the incoming requests to the worker processes based on the current load of each worker process. This means that the master process will send more requests to the worker processes that are less loaded and fewer requests to the worker processes that are more loaded. This policy is useful for applications that have varying workloads and can help to improve the performance of the application.   


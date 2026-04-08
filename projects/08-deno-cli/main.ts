// export function helloWorld() {
//   console.log('Main?', import.meta.main)
//   return "Hi Mom!"
// }

// if (import.meta.main) {
//   console.log(helloWorld());
// }

const numbers = [10, 15, 20, 10, 15]; 

numbers.forEach((n) => {
  const worker = new Worker(
    new URL("./worker.ts", import.meta.url).href,
    {
      type: "module",
    }
  );
// 1a. send data to worker to start 
  worker.postMessage({ n });

 // 2b. Receive completed work from worker
  worker.onmessage = (e) => {
    console.log(`Main Thread (n=${n}):`, e.data);
    worker.terminate();
  };
});
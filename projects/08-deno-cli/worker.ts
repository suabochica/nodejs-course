// @ts-nocheck no types available

function fibonacci(num) {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

 // 1b. Receive initial work from main thread
self.onmessage = (e) => {
  const { n } = e.data;
  const result = fibonacci(n);
  
  // 2a. Send the result back to the main thread
  self.postMessage(result);
  self.close();
};
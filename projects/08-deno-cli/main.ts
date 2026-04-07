export function helloWorld() {
  console.log('Main?', import.meta.main)
  return "Hi Mom!"
}

if (import.meta.main) {
  console.log(helloWorld());
}
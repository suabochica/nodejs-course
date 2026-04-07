function sumUsingForEach(arr: number[]): number {
  let sum = 0;

  arr.forEach((num) => {
    sum += num;
  })

  return sum;
}

function sumUsingReduce(arr: number[]): number {
  return arr.reduce((acc, num) => acc + num, 0);
}

function sumUsingForOf(arr: number[]): number {
  let sum = 0;

  for (const num of arr) {
    sum += num;
  }

  return sum;
}

function sumUsingForLoop(arr: number[]): number {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

function sumUsingWhileLoop(arr: number[]): number {
  let sum = 0;
  let i = 0;

  while (i < arr.length) {
    sum += arr[i];
    i++;
  }

  return sum;
}

const largeArray = Array.from({ length: 100000}, (_, i) => i );

Deno.bench({
    name: "Array forEach",
    fn: () => {
        sumUsingForEach(largeArray);
    }
});

Deno.bench({
    name: "Array reduce",
    fn: () => {
        sumUsingReduce(largeArray);
    }
});

Deno.bench({
    name: "Array for...of",
    fn: () => {
        sumUsingForOf(largeArray);
    }
});

Deno.bench({
    name: "Array for loop",
    baseline: true,
    fn: () => {
        sumUsingForLoop(largeArray);
    }
});

Deno.bench({
    name: "Array while loop",
    fn: () => {
        sumUsingWhileLoop(largeArray);
    }
});

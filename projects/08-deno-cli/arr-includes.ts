function generateTestData(size:number) {
  // Generate userIds (e.g., "user_123")
  const userIds = Array.from(
    { length: size },
    (_, i) => `user_${(i + 1000).toString(36)}`
  )

  // Generate productIds (e.g., "PROD-ABC123")
  const productIds = Array.from(
    { length: size },
    () => `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  )

  // Generate email addresses (e.g., user12@example.com")
  const emails = Array.from(
    { length: size },
    (_, i) => `user${i}@${['gmail.com', 'yahoo.com', 'example.com'][i % 3]}`
  )

  return [ ...userIds, ...productIds, ...emails ];
}

function generateLookupValues(data: any, lookupSize: number, hitRatio= 0.7 ) {
  const lookupValues = [];
  const hits = Math.floor(lookupSize * hitRatio);
  const misses = lookupSize - hits;

  // Add hits
  for (let i = 0; i < hits; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    lookupValues.push(data[randomIndex]);
  }

  // Add misses
  for (let i = 0; i < misses; i++) {
    lookupValues.push(`miss-${i}`);
  }

  // Shuffle the lookup values to mix hits and misses
  return lookupValues.sort(() => Math.random() - 0.5);
}

const testData = generateTestData(30000);
const lookupValues = generateLookupValues(testData, 1000);
const testSet = new Set(testData);

console.log(`Lookup size: ${lookupValues.length}`);
console.log(`Sample of test data (first 5):`, testData.slice(0, 5));
console.log(`Sample of lookup values (first 5):`, lookupValues.slice(0, 5));


Deno.bench({
  name: "Array includes",
  fn: () => {
    for (const value of lookupValues) {
      testData.includes(value);
    }
  }
})

Deno.bench({
  name: "Set lookup",
  fn: () => {
    for (const value of lookupValues) {
      testSet.has(value);
    }
  }
})
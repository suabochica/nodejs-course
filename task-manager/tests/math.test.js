const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math");

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .4);

    if (total !== 14) {
        throw new Error(`Total tip should be 14. Got {$total}`);
    }
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);

    expect(total).toBe(13);
});


test('Should calculate from 32 F to 0 C', () => {
    const convertion = fahrenheitToCelsius(32);

    expect(convertion).toBe(0);
});

test('Should calculate from 60 C to 140 F', () => {
    const convertion = celsiusToFahrenheit(60);

    expect(convertion).toBe(140);
});

const { calculateTip } = require("../src/math");

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


const calculateTip = (total, tipPercent = .3) => total + (total * tipPercent);

module.exports = {
    calculateTip
};

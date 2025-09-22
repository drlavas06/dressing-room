
const getInchToFeetInch = (value) => {
    const feet = Math.floor(value/ 12)
    const inches = Math.floor(value % 12)
    return [feet, inches]
}
const getInchToFeetInchString = (value) => {
    const [feet, inches] = getInchToFeetInch(value)
    return `${feet}'${inches}"`;
}
const getSliderDisplayValue = (min, max, DMin, DMax, value, name="", unit) => {
    const realDelta = max - min
    const displayDelta = DMax - DMin
    const displayDeltaValue = (value * displayDelta) / realDelta
    const roundedDeltaValue = displayDeltaValue
    if (name === "height" && unit === "in") {
        const roundedValue = DMax + displayDeltaValue
        return getInchToFeetInchString(roundedValue);
    }

    if(min<0){
        return Math.round((DMax + roundedDeltaValue)*10) /10
    }
    return Math.round((DMin + roundedDeltaValue)*10) /10
}

export { getSliderDisplayValue, getInchToFeetInch, getInchToFeetInchString}
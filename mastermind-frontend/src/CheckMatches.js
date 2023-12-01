function CheckExacts(generateCopy, guessCopy) {
    let i = 0;
    let exact = 0;
    while (i < 4) {
        //When a match is made, cross out the matched elements in both guess and secret.
        if (generateCopy[i] === guessCopy[i]) {
            exact = exact + 1;
            generateCopy[i] = "white";
            guessCopy[i] = "black";
        }
        i++;
    }
    return exact;
}

function CheckPartials(generateCopy, guessCopy) {
    let i = 0;
    let partial = 0;
    while (i < 4) {
        let j = 0;
        while (j < 4) {
        //When a match is made, cross out the matched elements in both guess and secret.
            if (generateCopy[i] === guessCopy[j]) {
                partial = partial + 1;
                generateCopy[i]= "white";
                guessCopy[j] = "black";
            }
        j++;
        }
            i++;
        }
    return partial;
}

function CheckMatches(generateColors, guessColors) {
    let generateCopy = generateColors.slice();
    let guessCopy = guessColors.slice();
    const exact = CheckExacts(generateCopy, guessCopy);
    const partial = CheckPartials(generateCopy, guessCopy);
    return [exact, partial];
}

export default CheckMatches;
/*
1. User Deposits Money
2. Determine number of lines to bet on
3. Collect a bet amount        
4. Spin the Slot Machine
5. Check if the user won
6. Give the user their winning/take their bet
7. Play Again?/User Out of Money
*/

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

/*
FUNCTION: deposit()
PURPOSE:
    1) Prompt the user to insert money to play slots
    2) Input validation for NaNs and negative numbers
INPUTS: 
    NONE
OUTPUTS:
    1) numberDepositAmount - The amount of money the user insert (INT)
*/
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: "); // Prompt user to input starting Money
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again.")
        } else if (numberDepositAmount < 1){
            console.log("Amount Entered too low to spin, Please deposit 1 or more.")
        } else {
            return numberDepositAmount;
        }
    }
};

/*
FUNCTION: getNumberOfLines()
PURPOSE:
    1) Prompt the user to input how many lines they are betting on.
    2) Input validation for NaNs and negative numbers
INPUTS: 
    NONE
OUTPUTS:
    1) numberOfLines - The number of lines the user is betting on (between 1-ROWS) (INT)
*/
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-" + ROWS + "): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines < 1){
            console.log("Invalid number of lines, try again.")
        } else if (Number.isInteger(numberOfLines) != true){
            console.log("Please select a whole number (1-" + ROWS + ") lines to bet on.")
        }else if (numberOfLines > ROWS){
            console.log("Amount Entered too many to spin, Please select (1-" + ROWS + ") lines.")  
        } else {
            return numberOfLines;
        }
    }
};

/*
FUNCTION: getBet()
PURPOSE:
    1) Prompt the user to input their bet for each line
    2) Input validation for NaNs, negative numbers, and out of balance bets
INPUTS: 
    balance - User's balance (to make sure they don't overbet)
    lines - Num. lines the user is betting on. Max bet is balace/lines
OUTPUTS:
    1) numberOfLines - The number of lines the user is betting on (between 1-3) (INT)
*/
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0){
            console.log("Invalid bet, try again.")
        } else if (Number.isInteger(numberBet) != true){
            console.log("Please select a whole number for your bet.")
        }else if (numberBet > (balance / lines)){
            console.log("Amount Entered exceedes balance. Please decrease your bet and try again.")  
        } else {
            return numberBet;
        }
    }
};

/*
FUNCTION: spin()
PURPOSE:
    1) "Spin" the slot machine for the user
    2) Create an array w/ length equal to the sum of all counts
        from the SYMBOL_COUNT array. The array will contain the symbols 
        from SYMBOL_COUNT with each letter appearing a number of times
        equal to said letter's count number. 
    3) Make a selection w/o replacement for each reel randomly and assign to
        a reels array with entries representing each reel value.
        The output may look like the following:
        [[A B C], [D D A], [D D D]] The sub-arrays are the columns, which
        means we must transpose the sub arrays to be:
        line 1 -> [A D D] 
        line 2 -> [B D D]
        line 3 -> [C A D]
INPUTS: 
    SYMBOLS_COUNT (global) - Symbols in the slot machine w/ quantity of symbols (Key/Value pair dict)
    ROWS (global) - Number of Rows in slot machine (INT)
    COLS (global) - Number of Columns in the slot machine (INT)
OUTPUTS:
    1) reels - Array of length (COLS-1) with indexes occupied by sub-arrays
        representing the columns corresponding to each line of the reel (array)
*/

const spin = () => {
    const symbols = [];
    // Iterate through the symbols
    // symbol will be the letter from SYMBOLS_COUNT
    // count will be the value from SYMBOLS_COUNT
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLS; i++){ //For each reel
        reels.push([]);
        const reelSymbols = [...symbols]; //Generate available symbols
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex]; // Select symbol at index
            reels[i].push(selectedSymbol);  // Move the symbol to the reel
            reelSymbols.splice(randomIndex, 1);  // remove the symbol from randomIndex
        }
    }
    return reels;
};

/*
FUNCTION: transpose()
PURPOSE:
    1) Transpose the matrix reels
INPUTS: 
    reels - 
OUTPUTS:
    1) rows - The transpose of reels (array)
*/

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

// Iterate through every row inside of rows, which is just an array representing the symbols
// inside of said row.
const printRows = (rows) => {
   for (const row of rows){
        let rowString = ""; //"A | B | C"
        for (const [i, symbol] of row.entries()){ // iterate the index and symbol in each row (row comes from rows)
            rowString += symbol
            if (i != row.length - 1){
                rowString += " | " // If last element, don't put a pipe separator
            }
        }
        console.log(rowString)
   } 
};

/*
FUNCTION: getWinnings()
PURPOSE:
    1) Calculate the winnings based off the rows (symbol value), the user's bet, and the lines.
    2) Take the user's bet if they lose and give the user their winnings if they win.
INPUTS: 
    rows (array) - array of arrays.
    bet (INT) - user's bet
OUTPUTS:
    1) winnings (INT) - Added to the user's balance if they win.
*/

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

let balance = deposit();
console.log("You input: " + balance + "$");
const numberOfLines = getNumberOfLines();
console.log("You input: " + numberOfLines + "\nMay your Spins be most fortuitous!");
const bet = getBet(balance, numberOfLines);
console.log("Your bet: " + bet);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
console.log("You won, $" + winnings.toString())
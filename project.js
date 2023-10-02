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

let balance = deposit();
console.log("You input: " + balance + "$");
const numberOfLines = getNumberOfLines();
console.log("You input: " + numberOfLines + "\nMay your Spins be most fortuitous!");
const bet = getBet(balance, numberOfLines);
console.log("Your bet: " + bet);
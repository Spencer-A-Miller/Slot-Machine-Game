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
const depositAmount = deposit();
console.log("You input: " + depositAmount + "$");

/*
FUNCTION: getNumberOfLines()
PURPOSE:
    1) Prompt the user to input how many lines they are betting on.
    2) Input validation for NaNs and negative numbers
INPUTS: 
    NONE
OUTPUTS:
    1) numberOfLines - The number of lines the user is betting on (between 1-3) (INT)
*/

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines < 1){
            console.log("Invalid number of lines, try again.")
        } else if (Number.isInteger(numberOfLines) != true){
            console.log("Please select a whole number (1-3) lines to bet on.")
        }else if (numberOfLines > 3){
            console.log("Amount Entered too many to spin, Please select (1-3) lines.")  
        } else {
            return numberOfLines;
        }
    }
}
const numberOfLines = getNumberOfLines();
console.log("You input: " + numberOfLines + "\nMay your Spins be most fortuitous!");
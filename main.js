const RPSGame = require("./RPSGame");
const { generateKey, generateHMAC } = require("./gameLogic");
const displayHelpTable = require("./displayTable");

function main() {
    if (process.argv.length < 4 || process.argv.length % 2 === 0) {
        console.log(
            "Invalid number of arguments. Please provide an odd number of non-repeating moves."
        );
        console.log("Example: node main.js Rock Paper Scissors");
        process.exit(1);
    }

    const moves = process.argv.slice(2);
    const game = new RPSGame(moves);

    console.log("\nWelcome to the Rock-Paper-Scissors Game!");
    console.log(`\nKey: ${game.key}`);

    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function promptUser() {
        console.log("\nAvailable moves:\n");
        moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log("0 - Exit");
        console.log("? - Help");

        readline.question("\nYour choice: ", (userChoice) => {
            if (userChoice === "0") {
                readline.close();
                process.exit(0);
            } else if (userChoice.toLowerCase() === "?") {
                displayHelpTable(moves, game.determineWinner.bind(game));
                promptUser();
            } else if (
                !isNaN(userChoice) &&
                parseInt(userChoice) >= 1 &&
                parseInt(userChoice) <= moves.length
            ) {
                const userMove = moves[parseInt(userChoice) - 1];
                const compMove =
                    moves[Math.floor(Math.random() * moves.length)];
                const hmac = generateHMAC(game.key, compMove);

                console.log(`\nComputer's move: ${compMove}`);
                console.log(`\nHMAC: ${hmac}\n`);

                const result = game.determineWinner(userMove, compMove);
                console.log(result);
                console.log(`\nKey: ${game.key}`);

                promptUser();
            } else {
                console.log("\nInvalid choice. Please try again.");
                promptUser();
            }
        });
    }

    promptUser();
}

if (require.main === module) {
    main();
}

const crypto = require("crypto");

class RPSGame {
    constructor(moves) {
        this.moves = moves;
        this.key = this.generateKey();
    }

    generateKey() {
        return crypto.randomBytes(32).toString("hex");
    }

    generateHMAC(move) {
        const hmac = crypto.createHmac("sha256", this.key);
        hmac.update(move);
        return hmac.digest("hex");
    }

    determineWinner(userMove, compMove) {
        const totalMoves = this.moves.length;
        const half = Math.floor(totalMoves / 2);

        const userIndex = this.moves.indexOf(userMove);
        const compIndex = this.moves.indexOf(compMove);

        if ((userIndex + 1) % totalMoves === compIndex) {
            return "You lose!";
        } else if ((compIndex + 1) % totalMoves === userIndex) {
            return "You win!";
        } else {
            return "It's a draw!";
        }
    }

    getRules() {
        return "Rock wins scissors, scissors win paper, and paper wins rock.";
    }
}

module.exports = RPSGame;

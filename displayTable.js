function displayHelpTable(moves, determineWinner) {
    const headerRow = [" PC / User >", ...moves];
    const table = [headerRow];

    for (const move of moves) {
        const row = [move];
        for (const opponentMove of moves) {
            const result = determineWinner(move, opponentMove);
            row.push(result);
        }
        table.push(row);
    }

    const maxLengths = headerRow.map((_, colIndex) =>
        Math.max(...table.map((row) => row[colIndex].length))
    );

    const separator = maxLengths.map((length) => "-".repeat(length + 2));

    const formatRow = (row) =>
        "| " +
        row
            .map((cell, colIndex) => cell.padEnd(maxLengths[colIndex]))
            .join(" | ") +
        " |";

    console.log(`+${separator.join("+")}+`);
    table.forEach((row, rowIndex) => {
        console.log(formatRow(row));
        if (rowIndex === 0) {
            console.log(`+${separator.join("+")}+`);
        }
    });
    console.log(`+${separator.join("+")}+\n`);
}

module.exports = displayHelpTable;

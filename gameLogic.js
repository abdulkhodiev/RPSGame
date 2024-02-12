const crypto = require("crypto");

function generateKey() {
    return crypto.randomBytes(32).toString("hex");
}

function generateHMAC(key, move) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(move);
    return hmac.digest("hex");
}

module.exports = {
    generateKey,
    generateHMAC,
};

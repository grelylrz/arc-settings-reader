# дополнение к основному коду позволяющее прочитать данные игроков
const playerBytes = result["player-data"];

if (Buffer.isBuffer(playerBytes)) {
    fs.writeFileSync("player-data.raw", playerBytes);
    console.log(`Bytes saved: ${playerBytes.length}`);
} else {
    console.log("player-data not found or not a byte array.");
}

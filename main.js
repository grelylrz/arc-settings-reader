const fs = require("fs");

const file = fs.readFileSync("settings.bin");
let offset = 0;

function readInt() {
    const value = file.readInt32BE(offset);
    offset += 4;
    return value;
}

function readLong() {
    const high = file.readInt32BE(offset);
    const low = file.readInt32BE(offset + 4);
    offset += 8;
    return high * 2 ** 32 + low;
}

function readFloat() {
    const value = file.readFloatBE(offset);
    offset += 4;
    return value;
}

function readBoolean() {
    const value = file.readUInt8(offset);
    offset += 1;
    return value !== 0;
}

function readByte() {
    return file.readUInt8(offset++);
}

function readUTF() {
    const length = file.readUInt16BE(offset);
    offset += 2;
    const value = file.slice(offset, offset + length).toString("utf8");
    offset += length;
    return value;
}

function readBytes() {
    const length = readInt();
    const value = file.slice(offset, offset + length);
    offset += length;
    return value;
}

const result = {};

const count = readInt();

for (let i = 0; i < count; i++) {
    const key = readUTF();
    const type = readByte();
    let value;

    switch (type) {
        case 0: value = readBoolean(); break;
        case 1: value = readInt(); break;
        case 2: value = readLong(); break;
        case 3: value = readFloat(); break;
        case 4: value = readUTF(); break;
        case 5: value = readBytes(); break;
        default: value = null; break;
    }

    result[key] = value;
}

for (const [key, val] of Object.entries(result)) {
    console.log(`${key} = ${Buffer.isBuffer(val) ? '[bytes]' : val}`);
}

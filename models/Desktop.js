const mongoose = require('mongoose');
const Schema = mongoose.Schema();

var DesktopSchema = new mongoose.Schema({
    connectionName: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
    poolId: {
        type: String,
        required: true,
    },
    poolName: {
        type: String,
        required: true,
    },
});

var Desktop = mongoose.model('Desktop', DesktopSchema);
module.exports = Desktop;
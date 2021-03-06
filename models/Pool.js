const mongoose = require('mongoose');
const Schema = mongoose.Schema();


var PoolSchema = new mongoose.Schema({
    connectionName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    poolName: {
        type: String,
        required: true,
    },
    poolId: {
        type: String,
        required: true,
    },
    cloud: {
        type: String,
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    vmType: {
        type: String,
        required: true,
    },
    poolType: {
        type: String,
        required: true,
    },
});

var Pool = mongoose.model('Pool', PoolSchema);
module.exports = Pool;
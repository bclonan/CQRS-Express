const mongoose = require('mongoose');

const sessionReadSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    loanOffers: [{ amount: Number, interestRate: Number, accepted: Boolean }],
    pageMeta: mongoose.Schema.Types.Mixed,
    config: mongoose.Schema.Types.Mixed,
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SessionRead', sessionReadSchema, 'sessions');

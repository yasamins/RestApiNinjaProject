const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
    // add in geo location
});
// it gonna create a collection in db called ninja
const Ninja = mongoose.model('ninja', NinjaSchema);
// export this module so we can use it in other files
module.exports = Ninja;

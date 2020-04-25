const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({

    username:{
        type: String,
        minlength: 1
    },

    message:{
        type: String,
        minlength : 1
    }

})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
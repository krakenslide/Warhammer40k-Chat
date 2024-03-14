const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customTimestamp: {
      type: Date,
      default: () => {
        // Manually add the offset (5 hours and 30 minutes) to UTC time for IST
        const now = new Date();
        const offset = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
        return new Date(now.getTime() + offset);
      },
    },
  },
  { 
    timestamps:true
  }
);

module.exports = mongoose.model('Messages', messageSchema);

const { Schema, model, Types } = require("mongoose");

// Utilized to format timestamp
const moment = require("moment");

// Reaction (SCHEMA ONLY)
const reactionSchema = new Schema(
  {
    // REQUIREMENTS: Use Mogoose's ObjectId data type and the Default value is set to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // REQUIREMENTS: String, Required and has a 280 character maximum
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // REQUIREMENTS: String and is Required
    username: {
      type: String,
      required: true,
    },
    // REQUIREMENTS: Date, set default balue to the current timestamp and uses a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// thought schema
const thoughtSchema = new Schema(
  {
    // REQUIREMENTS: String, Required and must be between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 279,
    },
    // REQUIREMENTS: Date, Set default value to the current timestamp and use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    // REQUIREMENTS:(The user that created this thought) - String and is required
    username: {
      type: String,
      required: true,
    },
    // REQUIREMENTS: (These are like replies) - Array of nested document created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the model
const Thought = model("Thought", thoughtSchema);

// Export the model
module.exports = Thought;
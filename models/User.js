const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    // REQUIREMENTS: String, Unique Required and Trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // REQUIREMENTS: String, Required, Unique and Matches a valid email address (look into Mongoose's matching validation)
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // REQUIREMENTS: Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // REQUIREMENTS: Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// REQUIREMENTS:  Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the model
const User = model('User', userSchema);

// Export the model
module.exports = User;
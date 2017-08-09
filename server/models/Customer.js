let mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let Todo = mongoose.model('Todo', {
  _id: {
		type: ObjectId,
		required: true
	},
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
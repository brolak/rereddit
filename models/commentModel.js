var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
	text: String,
	author: {type: Schema.Types.ObjectId, ref: 'user'},
	upvotes: Number
}, {
    versionKey: false
});

var Comment = mongoose.model('comment',CommentSchema);

module.exports = Comment;
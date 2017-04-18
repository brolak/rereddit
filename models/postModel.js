var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
	text: String,
	author: {type: Schema.Types.ObjectId, ref: 'user'},
	upvotes: Number,
	comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
}, {
    versionKey: false
});

var Post = mongoose.model('post',PostSchema);

module.exports = Post;
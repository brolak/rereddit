app.factory('postFactory', function() {

  var postFactory = {};

  postFactory.posts = [
  { author:"man",text:"example",upvotes:0},
  { author:"other man",text:"example2",upvotes:2}
  ];
    //todo
    //add post
    //up/down vote post
    //add comment (to post)
    //up/down vote comment (belonging to post)
    //extension: admin can delete post
    //extension: admin can delete comment (from post)
  return postFactory;
});

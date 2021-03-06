////////// Todos //////////

Template.todos.any_list_selected = function () {
  return !Session.equals('list_id', null);
};

Template.todos.list = function() {
	return Lists.findOne({'_id': Session.get('list_id')});
}

/*
Templates.todos.list_users = function() {
	var list =  Lists.findOne({'_id': Session.get('list_id')});
	var users_ids = list.users;

	var users = Users.find({'_id' : {$in: user_ids}});
	console.log(users);
	var r = "";
	return r;
}
*/

Template.todos.events = {};

Template.todos.events[ okcancel_events('#new-todo') ] =
  make_okcancel_handler({
    ok: function (text, evt) {
      var tag = Session.get('tag_filter');
      Todos.insert({
        text: text,
        list_id: Session.get('list_id'),
        done: false,
        timestamp: (new Date()).getTime(),
        tags: tag ? [tag] : []
      });
      evt.target.value = '';
    }
  });

Template.todos.todos = function () {
  // Determine which todos to display in main pane,
  // selected based on list_id and tag_filter.

  var list_id = Session.get('list_id');
  if (!list_id)
    return {};

  var sel = {list_id: list_id};
  var tag_filter = Session.get('tag_filter');
  if (tag_filter)
    sel.tags = tag_filter;

  return Todos.find(sel, {sort: {timestamp: 1}});
};

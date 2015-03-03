$(function(){
  $('div.toDo section.list form input').change( function (){
    if ($(this).prop("checked")) {
      $.ajax({
        url     : "/todos/" + listItem_id +"/complete",
        is_done : true,
        method  : 'PUT'
      });
    }
    if ($(this).prop(null)){
      $.ajax({
        url     : "todos" + listItem_id + "/uncomplete"
      });
    }
  });
  $('div.toDo section.list form button').on('click', function (){
    $.ajax({
      url  : "/todos/" + listItem_id,
      type : "POST"
    });
  });
});

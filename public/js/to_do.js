$(function(){
  $('div.toDo section.list input[type=checkbox]').change( function (){
    var doc_id = $(this).data('list');
    if ($(this).prop("checked")) {
      $.ajax({
        url     : "/todos/"+ doc_id + "/complete",
        method  : 'PUT',
        // data: {
        //   is_done: true
        // },
      });
      // alert('sent PUT request to '+'/todos/' +'/complete');
    }else{
      $.ajax({
        url     : "/todos/" + doc_id + "/uncomplete",
        method  : 'PUT',
        // data : {
        //   is_done : true
        // }
      });
      // alert('sent PUT request to '+'/todos/' +'/uncomplete');
    }
  });
  $('div.toDo section.list form button').on('click', function (){
    $.ajax({
      url  : "/todos/" + listItem_id,
      type : "POST"
    });
  });
  $('div.listEdit button').on('click', function (){
    var doc_id = $(this).data('list');
    $.ajax({
      url  : "/todos/" + doc_id + "/edit",
      type : 'PUT'
    });
  });
});

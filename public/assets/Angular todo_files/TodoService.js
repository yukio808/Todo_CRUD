angular
  /**
  * Todo app Module
  *
  * Description
  */
  .module('TodoApp')
  .service('TodoService', ['$http', function($http){
    this.list = function (){
      return $http.get('/api');
    };
    this.create= function(todo){
      return $http.post('/api', todo);
    };
    this.complete = function (todo_id){
      return $http.put('/api/' + todo_id + '/complete');
    };
    this.uncomplete = function (todo_id){
      return $http.put('/api/' + todo_id + '/uncomplete');
    };
  }]);
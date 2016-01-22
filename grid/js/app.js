$(document).ready(function(){
  var App = {};
  
  var page = {
    1: [1,3],
    2: [2,2]
  }
  
  console.log(page);

  App.grid = function(maxwidth,columns,gutters, rows) {
    var container = document.createElement('div');
    var colWidth = maxwidth / columns;
    container.className = "container";
    $(container).css({
      maxWidth: maxwidth,
    });
    var rows_array = [];
    var row = document.createElement('div');
      row.className = 'row';
    
    for(var ro = 1; ro <= rows; ro++){
      rows_array.push(row);
    }
    
    console.log(rows_array);
    var col = document.createElement('div');
    col.className = 'col';
    var cols = [];
    //Стили для колонок
    $(col).css({
      width: colWidth
    });
    //Массив для колонок
    for(var column = 1; column <= columns; column++){
      cols.push(col);
    }
    //Строки
    rows_array.forEach(function(ro, i) {
      //document.getElementsByTagName('body')[0].appendChild(ro);
      $('body').append(ro.outerHTML);
    });
    
    cols.forEach(function(col) {
        $('.row').append(col.outerHTML);
      });
    
  }
  App.grid(1200, 4, 0, 6);
});


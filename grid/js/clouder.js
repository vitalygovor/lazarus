var Clouder = (function() {
  //var basket = []; // приватная переменная
    return { // методы доступные извне
        create: function(params) {
            if (params.class) var Class = params.class;
            if (params.id) var id = params.id;
            var block = document.createElement('div');
            block.className = Class;
        },
        remove: function() {
            return basket.length;
        },
        location: function() {
           var q = this.getItemCount(),p=0;
            while(q--){
                p+= basket[q].price;
            }
            return p;
        }
    }
}());
var Clouder = {
    init: function(){
        console.log("Initialization...");
    },
    events: {
        selectBlock: {
            select: function(){

                console.log('selectBlock');
                // Выбираем все блоки с классом block
                var blocks = document.getElementsByClassName('block');
                // Цикл по всем block

                Clouder.each(blocks, function(key, block){
                    block.className = "block";
                    block.style.cursor = "pointer";
                    block.setAttribute("bid", key);

                    block.addEventListener('click', function(event){
                        var bIDs = Clouder.buffer.selectedBlocks;
                        if(bIDs.length == 0){
                            block.className = "block";
                            block.className += " selected";
                            console.log('Click!');

                            // for (var i = 0; i < blocks.length; i++) {
                            //     if(i != )
                            //     // var element = document.querySelectorAll( 'div[bid="'+i+'"]' );
                            //     document.querySelectorAll('div[bid="'+i+'"]' ).className = "block";
                            //     // element.className += " selected";   
                            // }
                        }

                        if(event.shiftKey){
                            var bIDs = Clouder.buffer.selectedBlocks;
                            var index = bIDs.indexOf(key);

                            console.log(index);

                            if (index > -1) {
                                bIDs.splice(index, 1);
                            } else {
                                Clouder.buffer.selectedBlocks = bIDs;
                                Clouder.buffer.selectedBlocks.push(key);
                                Clouder.events.selectBlockStyle(this);
                            }
                        } else {
                            Clouder.buffer.selectedBlocks = [];
                            Clouder.events.selectBlockStyle(this, key);  
                        }
                        console.log(Clouder.buffer.selectedBlocks);
                    });
                });
            }
        },
        selectBlockStyle: function(element, key){

            var bIDs = Clouder.buffer.selectedBlocks;

            function resetStyles(element){
                for (var i = 1; i <= bIDs.length; i++) {
                    console.log(i);
                }
            }
            console.log(bIDs.length);

            if(bIDs.length > 1){
               element.className = "block";
               element.className += " selected";
            } else {
                for (var i = 0; i < bIDs.length; i++) {
                    // var element = document.querySelectorAll( 'div[bid="'+i+'"]' );
                    document.querySelectorAll('div[bid="'+i+'"]' ).className = "block";
                    // element.className += " selected";   
                }
            }

            resetStyles(element);
        }
    },
    buffer: {
        selectedBlocks: [],
        selectBlock: [],
    },
    each: function each(data, callback){
        for(var key in data){
            if(data.hasOwnProperty(key)){
                callback(key, data[key]);
            }
        }
    },
    getChar: function(event){
        if (event.which == null) { // IE
            //if (event.keyCode < 32) return null; // спец. символ
            console.log(String.fromCharCode(event.keyCode));
            console.log(event);
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            //if (event.which < 32) return null; // спец. символ
            console.log(String.fromCharCode(event.which));
            console.log(event.charCode);
        }

        return null; // спец. символ
    },
    run: function run(){
        Clouder.events.selectBlock.select();
    }
};
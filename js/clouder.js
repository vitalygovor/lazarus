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
                    block.addEventListener('click', function(){
                        // Выбранный элемент
                        Clouder.events.selectBlock.buffer.SelectedBlock = this;
                        Clouder.events.selectBlock.selected();
                    });
                });

            },
            selected: function(){
                // this.className += " selected";
                var blocks = document.getElementsByClassName('block');
                Clouder.each(blocks, function(key, block){
                    block.className = "block";
                    block.style.cursor = "pointer";
                });
                if(Clouder.events.selectBlock.buffer.SelectedBlock != undefined){
                    Clouder.events.selectBlock.buffer.SelectedBlock.className += " selected";
                }
            },
            buffer: {
                SelectedBlock: undefined,
                SelectedBlocks: undefined,
            }
        }
    },
    each: function each(data, callback){
        for(var key in data){
            if(data.hasOwnProperty(key)){
                callback(key, data[key]);
            }
        }
    },
    run: function run(){
        Clouder.events.selectBlock.select();
    }
};

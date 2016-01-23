var Clouder = {
    BUFFER: {
        block: {
            select: {
                blocks: []
            }
        }
    },
    ui: {
        block: {
            select: function(){

                // Установка переменных буфера
                var BUFFER = Clouder.BUFFER.block.select;
                // Массив для блоков
                var BIDS = BUFFER.blocks;

                // Добавляем нужные функции
                var Each = Clouder.func.each;
                var ChangeClasses = Clouder.func.ChangeClasses;
                var WinSelectOff = Clouder.func.clearSelection;

                // Выбираем все блоки с классом block
                var BLOCKS = document.getElementsByClassName('block');
                
                // Цикл по всем нужным элементам
                Clouder.func.each(BLOCKS, function(key, block){
                    WinSelectOff();
                    block.style.cursor = "pointer";
                    block.setAttribute("bid", key);
                    // Прослушиваем действие
                    block.addEventListener('click', function(event){
                        var CleckedBlock = this.getAttribute('bid');
                        
                        if(event.shiftKey){
                            GroupSelect(this, key);
                        } else {
                            resetStylesForNotSelectedBlocks();
                            // Clouder.func.block.style(this, key);  
                        }

                        function GroupSelect(block, key){
                            var index = BIDS.indexOf(key);

                            if (index > -1) {
                                BIDS.splice(index, 1);
                            } else {
                                BIDS.push(key);
                                Clouder.ui.block.style(block, key); 
                            }
                        }

                        function resetStylesForNotSelectedBlocks(key, block) {
                            Each(BLOCKS, function(key, block){
                                ChangeClasses(block, '', "block");
                                if(key == CleckedBlock) ChangeClasses(block, 'selected', "block");
                            });
                        }
                        
                    });
                });

                console.log(Clouder.BUFFER.block.select);

            },
            style: function(element, key){

                // Установка переменных буфера
                var BUFFER = Clouder.BUFFER.block.select;
                // Массив для блоков
                var BIDS = BUFFER.blocks;

                if(BIDS.length > 0){
                   element.className = "block";
                   element.className += " selected";
                }

            }
        }
    },
    func: {
        ChangeClasses: function (block, addClass, defaultClass){
            // block - блок, с которым манипуляции проходят
            // addClass - название класса, который нужно добавить к блоку
            // defaultClass - главный первый класс. Например, block
            if(block) block.className = ""+defaultClass+" "+addClass+"";
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
        clearSelection: function clearSelection() {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else { // старый IE
                document.selection.empty();
            }
        }
    },
    run: function run(){
        Clouder.ui.block.select();
    }
};
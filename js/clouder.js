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
                                block.className = 'block';
                            } else {
                                BIDS.push(key);
                                StyleForSelectedBlocks(block, key); 
                            }
                        }

                        function resetStylesForNotSelectedBlocks(key, block) {
                            BIDS = [];
                            Each(BLOCKS, function(key, block){
                                ChangeClasses(block, '', "block");
                                if(key == CleckedBlock) {
                                    BIDS.push(key);
                                    console.log(BIDS);
                                    ChangeClasses(block, 'selected', "block");
                                }
                            });
                        }

                        function StyleForSelectedBlocks(element, key){

                            if(BIDS.length > 0){
                               element.className = "block";
                               element.className += " selected";
                            }

                        }

                        
                    });
                });
            
                var el = document.getElementById('animate');

                if(el){
                  el.addEventListener('click', function(){
                    wow = new WOW({
                        boxClass:     'animation',      // default
                        animateClass: 'animated', // default
                        offset:       0,          // default
                        mobile:       true,       // default
                        live:         true        // default
                    });

                    // node.getAttribute(attribute)

                    for (var i = 0; i < BIDS.length; i++) {
                        Each(BLOCKS, function(key, block){
                           if(block.getAttribute("bid") == BIDS[i]) block.className += " animation swing";
                        });   
                    }

                    wow.init();
                  }, false);
                } else {
                    alert("No...");
                }

                var cr = document.getElementById('create');
                


                if(cr){
                    cr.addEventListener('click', function(){
                        var block = document.createElement("div");
                        block.className = "block";
                        var attr = document.createAttribute("bid");
                        console.log(BIDS);
                        var maxBID = BLOCKS.length;
                        attr.value = maxBID;
                        block.setAttributeNode(attr);
                        var blocks = document.getElementById("blocks");
                        blocks.appendChild(block); 
                        BLOCKS = document.getElementsByClassName('block');
                        console.log(BLOCKS.length);
                    })
                }


                function getAllElementsWithAttribute(attribute)
                {
                  var matchingElements = [];
                  var allElements = document.getElementsByTagName('*');
                  for (var i = 0, n = allElements.length; i < n; i++)
                  {
                    if (allElements[i].getAttribute(attribute) !== null)
                    {
                      // Element exists with attribute. Add to array.
                      matchingElements.push(allElements[i]);
                    }
                  }
                  return matchingElements;
                }

                console.log(BIDS);

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
var Animation = {
    init: function(){
        wow = new WOW({
            boxClass:     'animation',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        });
        wow.init();
    },
    blocks: [],
    type: "",
    setType: function(type){

    },
    setBlocks: function(blocks){

    },
    run: function(){
        this.init();
    },
    info: function(){
        console.log('Animation type: '+this.type+'; This animation work with blocks:'+this.blocks);
    }
}


var el = document.getElementById('animate');
if(el){
  el.addEventListener('click', function(){
    console.log(Clouder.BUFFER.block.select.blocks);
  }, false);
} else {
    alert("No...");
}
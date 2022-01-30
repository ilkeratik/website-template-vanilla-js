let processScroll = () => {
    let docElem = document.documentElement, 
      docBody = document.body,
      scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
      scrollPercent = scrollTop / scrollBottom * 100 + '%';
    
    // console.log(scrollTop + ' / ' + scrollBottom + ' / ' + scrollPercent);
    
      document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent); 
  }
  
  document.addEventListener('scroll', processScroll);

  $(window).on("load",function() {
    function fade() {
        var animation_height = $(window).innerHeight() * 0.25;
        var ratio = Math.round( (1 / animation_height) * 10000 ) / 10000;

        $('.fade').each(function() {
            
            var objectTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();
            
            if ( objectTop < windowBottom ) {
                    $(this).css( {
                        transition: 'opacity 0.5s linear',
                        opacity: 1
                    } );

            } else {
                $(this).css( 'opacity', 0 );
            }
        });
    }
    $('.fade').css( 'opacity', 0 );
    fade();
    $(window).scroll(function() {fade();});
});

/*$('.single-prj').hover( ()=>{
        console.log($(this));
        $(this).find('.details').css({
            color: 'red',
            transform: 'perspective(2000px) rotateY(0deg)'
        })
    },
    ()=>{
        $(this).find('.details').css({
            color: 'red',
            transform: 'perspective(2000px) rotateY(0deg)'
        })
    }
    );
*/

let fetchProjectData= ()=>{
    
    $.getJSON("projects_data.json", function(data){
        $.each(data, function(propName, propVal) {
            propVal.forEach((el)=>{
                $("#projects").append(
                `<div class="fade single-prj clearfix">\
                    <a href="https://picsum.photos/320/320">\
                        <img src="https://picsum.photos/320/320" alt="cv">\
                        </a><div class="prj-name">\
                            <h1> ${el.title}</h1>\
                        </div><div class="details">\
                            ${el.stack.map(function (key) {
                                return `<i class=\"tech\">${key}</i>`           
                            }).join("")} \
                        </div>\
                </div>`);
            })
          });
          hoverPos();
        });
}
fetchProjectData();

let hoverPos = ()=>{
    $(".single-prj").hover(function (){
        let $this = $(this);
        
        $this.find(".prj-name").css({
            bottom: `${$this.find(".details").height()+20}px`
        })

        console.log($this.find(".prj-name").css("bottom"))
    },function (){
        let $this = $(this);
            
        $this.find(".prj-name").css({
            bottom: 0
        })
    })

}

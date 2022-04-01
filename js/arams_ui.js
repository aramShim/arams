/*buger*/
$(function(){
    "use strict";
    menuClickFunctionStop();
    scrollUp();
    linkScroll();

    //init
    const header = $('#header');
    const bugerBtn = $('#js-toggle');
    const gnb = $('#gnb');
    

    // menu
    function menuClickFunctionStop(){
        $('#js-toggle').click(function(){
            header.toggleClass('open');
            $(this).toggleClass('on');
        });        
    }

    // scrollUp
    function scrollUp(){
        $('body').on('click', '.js-top', function(e){
            e.preventDefault();
            $('html, body').animate({scrollTop : 0}, 500);
			return false;
        })
    }
    const hashTag = window.location.hash; //#introduce
    const gnbLink = $('.gnb').find('a').attr('href');
    if(hashTag == gnbLink){
        $('.gnb').find('a').toggleClass('on');
    }

    // link scroll;
    function linkScroll(){
        $('.js-link').each(function(){
            $(this).click(function(){
                var sectionId = $(this).attr('href');
                $('html, body').animate({
                    scrollTop: $(sectionId).offset().top
                },500);                
            })
        })        
    }
    // music
    const play = $('.play');
    play.click(function(){
        if(play.hasClass('play')){
            document.getElementById('bgm').play();
            $(this).removeClass('play');
            $(this).addClass('pause');
            $(this).find('i').attr("class","fas fa-pause");
        }else {
            document.getElementById('bgm').pause();
            $(this).addClass('play');
            $(this).removeClass('pause');
            $(this).find('i').attr("class","fas fa-play");
        }
    })

   
    // animation text
    $(window).scroll( function(){

        fadeInOnScroll($('.scroll-animation'));
		// scrollBtn();

        $('.hello-text .txt-en').each( function(){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},1000);
                $(this).siblings('.ko').animate({'opacity':'0'},1000)
            }
        }); 
    });

	function scrollBtn() {
		$('.scroll-gray').each(function(){
			const eleTop = $(this).offset().top;
			const eleHeight = $(this).innerHeight();
			const scrollTop = $(window).scrollTop();
			const winHeight = $(window).height();
			
			if ((eleTop - winHeight) < scrollTop && scrollTop < (eleTop + eleHeight - winHeight))
			{
				console.log(11)
			} else if (scrollTop > (eleTop + eleHeight - winHeight))
			{
				$('#top').removeClass('bggray');
			}
			
		})
	}
	// scrollBtn()

    function isElementUnderBottom(elem, triggerDiff) {
        var _elem$getBoundingClie = elem.getBoundingClientRect();

        var top = _elem$getBoundingClie.top;
        var _window = window;
        var innerHeight = _window.innerHeight;

        return top > innerHeight + (triggerDiff || 0);
      
    }

    function fadeInOnScroll() {
        var elems = document.querySelectorAll('.scroll-animation');
        elems.forEach(function (elem) {
            if (isElementUnderBottom(elem, -20)) {
                elem.style.opacity = "0";
                elem.style.transform = 'translateY(70px)';
            } else {
                elem.style.opacity = "1";
                elem.style.transform = 'translateY(0px)';
                // console.log(elem.dataset.page)
            }
        });
    }

    const option = {
        root: null,
        threshold: 0.5
      };
      
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
            $('.txt-number').text("0"+entry.target.dataset.page)
          } else {
            entry.target.classList.remove('visible');
          }
        });                            
      }, option);
      
      document.querySelectorAll('.pageNum').forEach((wrapper) => io.observe(wrapper));

});
//scroll-action
(() => {
	const actions = {
		birdFlies(key){
			if (key)
			{
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
			}else {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
			}
			
		},
		birdFlies2(key){
			if (key)
			{
				document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
			}else {
				document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
			}
			
		}
	}
	const stepElems = document.querySelectorAll('.step');
	const graphicsElems = document.querySelectorAll('.graphic-item');
	let currentItem = graphicsElems[0]; //현재 활성화된 .graphic-item 을 지정
	let ioIndex;

	const io = new IntersectionObserver((entries, observer)=> {
		ioIndex = entries[0].target.dataset.index * 1; //숫자로 바꾸기 *1;
	});

	for (let i = 0; i < stepElems.length ; i++)
	{
		io.observe(stepElems[i]);
//			stepElems[i].setAttribute('data-index', i) 이것도 같은 뜻
		stepElems[i].dataset.index = i
		graphicsElems[i].dataset.index = i
	}
	
	function activate(action){
		currentItem.classList.add('visible');
		if (action)
		{
			actions[action](true);
		}
	}

	function inactivate(action){
		currentItem.classList.remove('visible');
		if (action)
		{
			actions[action](false);
		}
	}
	
	window.addEventListener('scroll', () => {
		let step;
		let boundingRect;

//			for (let i = 0; i < stepElems.length ;i++ )
		for (let i = ioIndex - 1; i < ioIndex + 2 ;i++ )
		{
			step=stepElems[i];
			if (!step) continue;

			boundingRect = step.getBoundingClientRect();
			
			
			if (boundingRect.top > window.innerHeight * 0.1 &&
				boundingRect.top < window.innerHeight * 0.8)
			{
				inactivate(currentItem.dataset.action);				
				currentItem = graphicsElems[step.dataset.index];
				activate(currentItem.dataset.action);
			}

		}

	});
	
	window.addEventListener('load', ()=>{
		setTimeout(()=>scrollTo(0,0), 100);
	});

	activate();
	
});




//必须遵从AMD规范
define([ "jquery", "jquery-cookie"], function ($) {
  function banner() {
    var index = 0;
    var nextindex = 0;
    var timer = null;
    autoPlay();
    function animationPlay() {
      $(".banner>li").eq(index).stop().fadeOut(1000);
      $(".banner>li").eq(nextindex).stop().fadeIn(1000);
      $(".banner-ol>li")
        .eq(nextindex)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
    function autoPlay() {
      timer = setInterval(function () {
        if (nextindex >= 4) {
          nextindex = 0;
        } else {
          nextindex++;
        }
        animationPlay();
        index = nextindex;
      }, 3000);
    }
    $(".banner>li").mouseenter(function(){
      clearInterval(timer);
    }).mouseleave(function(){
      autoPlay()
    })
    $(".banner-ol>li")
      .mouseenter(function () {
        clearInterval(timer);
        nextindex = $(this).index();
        animationPlay();
        index = nextindex;
      })
      .mouseleave(function () {
        autoPlay();
      });
    $(".btn-left").click(function () {
      if (nextindex <= 0) {
        nextindex = 4;
      } else {
        nextindex--;
      }
      animationPlay();
      index = nextindex;
    }).mouseenter(function(){
      clearInterval(timer);
    }).mouseleave(function(){
      autoPlay()
    })
    $(".btn-right").click(function () {
      if (nextindex >= 4) {
        nextindex = 0;
      } else {
        nextindex++;
      }
      animationPlay();
      index = nextindex;
     
    }).mouseenter(function(){
      clearInterval(timer);
    }).mouseleave(function(){
      autoPlay()
    })
    $(".btn-wrap").click(function () {
      return false;
    });
  }
  return{
    banner:banner,
  }
});

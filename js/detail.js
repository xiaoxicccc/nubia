define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
    sc_num()
    function style(){
        $(".share1,.shareall").mouseenter(function(){
            $(".shareall").show()
        }).mouseleave(function(){
            $(".shareall").hide()
        })
        $(document).scroll(function(){
            if($(".con_left").offset().top=190){
                $(".con_left").css({
                        "position":"relative",
                        "left":0,
                        "top":0
                })
            }

            if($(".con_left").offset().top - $(window).scrollTop()<=0){
                $(".con_left").css({
                        "position":"fixed",
                        "left":"18.5%",
                        "top":0,
                        "z-index":99
                })
            }
            if($(window).scrollTop()>=750){
                $(".con_left").css({
                        "position":"relative",
                        "left":"0",
                        "top":"555px"
                })
            }
            
        })

        $(".detail").on("click","li",function(){
            $(".detail li").css({
                "border": "1px solid #e0e0e0"
            })
            $(this).css({
                "border": "1px #de634f solid"
            })
        })
    $(".con_left>ul").on("click","li",function(){
        $("#bigimg").attr("src",$(this).find("img").attr("src"))
        $("#zoom_img").attr("src",$(this).find("img").attr("src"))
    })
    $(".RAM").on("click","li",function(){
        $("#phone-RAM").html($(this).find("span").eq(0).html())
        $("#phone-price").html($(this).find("span").eq(1).html());


    })
    $(".phone-type1").on("click","li",function(){
        $("#phone-type").html($(this).html())
    })
  
    
    }
    //放大镜
    function zoom(){
        $(".zoom-wrap").mouseenter(function(){
            $("#zoom").show()
            $("#zoomBox").show()
          }).mouseleave(function(){
            $("#zoom").hide()
            $("#zoomBox").hide()
          }).mousemove(function(ev){
            let x = $(".zoom-wrap").width()-$("#zoom").width();
            let y = $(".zoom-wrap").height()-$("#zoom").height();
            let offsetX = ev.clientX-$(this).offset().left-$("#zoom").width()/2;
            let offsetY = ev.clientY-$(this).offset().top-$("#zoom").height()/2+$(window).scrollTop();
            if (offsetX <= 0) {
              offsetX = 0;
            }
            if (offsetX >= x) {
              offsetX = x;
            }
            if (offsetY <= 0) {
              offsetY = 0;
            }
            if (offsetY >= y) {
              offsetY = y;
            }
            $("#zoom").css({
              left:offsetX,
              top:offsetY
            });
            $("#zoomBox img").css({
              left:-2*offsetX,
              top:-2*offsetY
            })
          })
    }
    function refresh(){
        $("#min-list li").eq(1).attr("class","selected")
        var cookieStr = $.cookie("detail")
        $(".addShopCar").attr("id",cookieStr);
        $.ajax({
            url:"./data/detail.json",
            success:function(arr){
                var str =``
                var str1 =``
                var str2=``
                var str3=``
                var str4=``

                for(var i=0; i<arr.length;i++){
                    if(arr[i].id==cookieStr){
                        var info=` <div><span>${arr[i].info}</span></div>
                        <p> <span>${arr[i].info2}</span></p>`
                        var Rtitle=`
                        <span>  ${arr[i].title}
                        <span id="phone-type">${arr[i].titleType}</span> 
                        <span id="phone-RAM">${arr[i].titleRAM}</span> 
                         </span>
                        `
                        $(".con_right_title").html(Rtitle)
                        $(".con_right_info").html( info)
                        $("#phone-price").html(arr[i].price)
                        $(".huabei3").html("￥"+Math.floor(arr[i].price/3)+"*3")
                        $(".huabei6").html("￥"+Math.floor(arr[i].price/6)+"*6")
                        $(".huabei12").html("￥"+Math.floor(arr[i].price/12)+"*12")
                        $(".versions-p").html(arr[i].versions)
                        $(".setMeal-p").html(arr[i].setMeal)
                        $(".accident-p").html(arr[i].accident)
                        // $(".setMeal-wrap p").html(arr[i].setMeal)
                        //循环添加颜色
                        for(var j=0;j<arr[i].listColor.length;j++){
                            str1+=`
                            <li>${arr[i].listColor[j]}</li>
                            `
                        }
                        $(".phone-type1").html(str1)
                        //判断有没有版本
                        if(arr[i].listVersions){
                           //循环添加版本与价格
                            for(var j=0;j<arr[i].listVersions.length;j++){
                                str2+=`
                                <li > <span> ${arr[i].listVersions[j].ver}</span><span class="increase">${arr[i].listVersions[j].pic}</span></li>
                                `
                            }
                            $(".RAM").html(str2)
                        }
                        //判断有没有套餐
                        if(arr[i].listSetMeal){
                            //循环添加套餐
                             for(var j=0;j<arr[i].listVersions.length;j++){
                                 str3+=`
                                 <li class="setMeal">
                                <span>${arr[i].listSetMeal[j].set}</span>
                                <p>${arr[i].listSetMeal[j].pic}</p>
                                 `
                             }
                             $("#setMeal-con").html(str3)
                         }
                         //判断有没有保险
                         if(arr[i].listAccident){
                            //循环添加套餐
                             for(var j=0;j<arr[i].listAccident.length;j++){
                                 str4+=`
                                 <li><span>${arr[i].listAccident[j].acc}</span><p>
                                 ${arr[i].listAccident[j].pic}
                            </p></li>
                                 `
                             }
                             $(".accident-ul").html(str4)
                         }
                        
                        
                        $("#bigimg").attr("src",arr[i].listimg[0])
                        $("#zoom_img").attr("src",arr[i].listimg[0])
                       for(var j=0;j<arr[i].listimg.length;j++){
                        str+=`
                        <li ><img src="${arr[i].listimg[j]}" alt=""></li>
                        `
                       }
                    }
                    $("#min-list").html(str)
                }
               
            }
            
        })
        $("#min-list li").eq(1).attr("class","selected")
    }
    function shoppingCar(){
        $(".addShopCar").click(function(){
            var id = this.id;
            var first = $.cookie("goods") == null? true:false;
            if(first){
                var arr=[{id:id, num:1}];
                $.cookie("goods",JSON.stringify(arr),{
                    expires:7
                })
            }else{
                var cookieArr = JSON.parse($.cookie("goods"));
                var index = cookieArr.findIndex(item =>item.id ==id);
                if(index >= 0){
                    cookieArr[index].num++;
                }else{
                    cookieArr.push({id:id,num:1});
                }
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            obj.show(this)
            sc_num()
            miniCar()
        })

    }  

    var obj = {
        show:antiShake(function ballMove(oBtn){
            $("#ball").show().css({
                "top": "-20px",
                "left": "150px"
            })
    
            var X = $(".head_shopping_car").offset().left - $(oBtn).offset().left-150;
            var Y = $(".head_shopping_car").offset().top - $(oBtn).offset().top+50;
    
            var bool = new Parabola({
                el: "#ball",
                offset: [X, Y],
                duration: 1500,
                curvature: 0.005,
                callback: function(){
                    $("#ball").hide();
                }
            });
            bool.start();
        },500)
    }

    function antiShake(func,delay){
        var timer = null;
        // console.log(timer);
          return function(...arguments){
            //   console.log(timer);
              clearTimeout(timer);
              if(timer== null) {
                func.apply(this,arguments);
                timer = "调用一次";
                // console.log(timer);
              }else{
                timer = setTimeout(()=>{
                  func.apply(this,arguments);
              },delay)
              }
             
              
          }
      }
    // function ballMove(oBtn){

    //     $("#ball").show().css({
    //         "top": "-20px",
    //         "left": "150px"
    //     })

    //     var X = $(".head_shopping_car").offset().left - $(oBtn).offset().left-150;
    //     var Y = $(".head_shopping_car").offset().top - $(oBtn).offset().top+50;

    //     var bool = new Parabola({
    //         el: "#ball",
    //         offset: [X, Y],
    //         duration: 1500,
    //         curvature: 0.005,
    //         callback: function(){
    //             $("#ball").hide();
    //         }
    //     });
    //     bool.start();
    // } 
    function sc_num(){
        var cookieStr = $.cookie("goods")
          if(!cookieStr){
            $(".sc_num").html(0)
          }else{
              var cookieArr = JSON.parse(cookieStr);
              var sum = 0;
            
              for(var i=0;i<cookieArr.length;i++){
                  sum += cookieArr[i].num
                  
                  
              }
              
          }
          $(".car_num").html(sum) 
          $(".rich-sum").html(sum)
        }

    function miniCar(){
        $.ajax({
            url:"./data/detail.json",
            success:function(arr){
                var cookieStr = $.cookie("goods");
                
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = []; //符合条件数据
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                  
                    var str =``;
                    var sumPrice=0;
                    for(var i=0;i<newArr.length;i++){
                        str += `
                        <li class="shop-card">
                                            <div class="shop-img">
                                                <img src="${newArr[i].listimg[0]}" alt="" class="shop-img">
                                            </div>
                                            <div class="shop-detail">
                                                <p class="shop-name">
                                                    <span>${newArr[i].title}（${newArr[i].titleType} ${newArr[i].titleRAM}）</span>
                                                </p>
                                                <p class="shop-price shop-newPrice">
                                                    ¥${newArr[i].price}
                                                    <span class="shop-oldPrice">¥${newArr[i].price}</span>
                                                    <i class="shop-count">×${newArr[i].num}</i>

                                                </p>
                                            </div>
                                        </li>
                        `
                        
                            sumPrice+=newArr[i].num*newArr[i].price
                        $(".minitotal").html(sumPrice)
                        
                       
                    }
                    
                    $(".rich-con-ul").html(str);                     
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
   return{
       style:style,
       zoom:zoom,
       refresh:refresh,
       shoppingCar:shoppingCar,
   }
    
});
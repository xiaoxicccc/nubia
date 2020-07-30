define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
    sc_num()
    miniCar()
   function download(){
       $.ajax({
        url:"./data/topnav.json",
        success:function(arr){
            for(var i=0;i<arr.length;i++){
                var str =``
                for(var j=0;j<arr[i].list.length;j++){
                    if(arr[i].id<4){
                            str+=`
                            <a href="" id="${arr[i].list[j].id}" class="detail_pages">
                            <li>
                            <img src="${arr[i].list[j].img}" alt="">
                            <p>${arr[i].list[j].title}</p>
                            </li>
                        </a>`
                        $(".content_con>ul").eq(i).html(str);
                    }
                    if(arr[i].id==4){
                        str+=`
                        <li  >
                            <span>${arr[i].list[j].listName}</span>
                            <div class="content_con" id="fansile">
                                <ul>

                                </ul>
                                </div>
                            </li>`
                        $(".content_list>ul").eq(i).html(str);

                    }
                    
                        
                }
                       
                    
                }
                for(var i=0;i<arr[3].list.length;i++){
                    var str1 =``
                    for(var j = 0;j<arr[3].list[i].listarr.length;j++){
                       

                        str1+=`                    
                        <a href="" >
                            <li id="${arr[3].list[i].listarr[j].id}" class="detail_pages" >
                                <img src="${arr[3].list[i].listarr[j].img}" alt=""> 
                                    <p>${arr[3].list[i].listarr[j].title}</p> 
                                    <p class="new_tag">${arr[3].list[i].listarr[j].isNew}</p>
                            </li>
                            </a>
                        `
 
                        $("#fansile ul").eq(i).html(str1);
                    }
                   
                   
                }
                
                
                
                $("#content_list1").on("mouseenter","span",function(){
                    $(this).next().css("display","block")
                }).on("mouseleave","span",function(){
                    $(this).next().css("display","none")
                })
                $(".nav-ul-content").mouseenter(function(){
                    $("#content_list1>ul>li>div").eq(0).css("display","block")
                })
               
                $("#content_list1 li").on("mouseenter","div",function(){
                    this.style.display="block"
                }).on("mouseleave","div",function(){
                    this.style.display="none"
                })
                $("#user_content").hide()
                $(".user").hover(function(){
                    $("#user_content").show()
                },function(){
                    $("#user_content").hide()
                })
                $("#shopping_car").hide()
                $(".head_shopping_car").hover(function(){
                    $("#shopping_car").show()
                },function(){
                    $("#shopping_car").hide()
                })
            
        },
        error:function(msg){
            console.log(msg)
        }
    })
   }

   function other(){
    $(".tb-content").on("click",".table-ac",function(){
        sc_num()
        miniCar()
        
    })
    $(".tb-content").on("click",".close",function(){
        sc_num()
        miniCar()
        location.reload()
    })

}
   function sc_num(){
    var cookieStr = $.cookie("goods")
      if(!cookieStr){
        $(".car_num").html(0)
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
       download:download,
       other:other,
       miniCar:miniCar
   }
    
});
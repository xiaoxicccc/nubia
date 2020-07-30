define([ "jquery", "jquery-cookie"], function ($) {
    function showPhone(){
        $(".show-web").css("color","red")
        $(".show-phone").click(function(){
            $(".input-web").hide()
            $(".input-phone").show()
            $(this).css("color","red")
            $(".show-web").css("color","black")
        })
        $(".show-web").click(function(){
            $(".input-web").show()
            $(".input-phone").hide()
            $(".show-phone").css("color","black")
            $(this).css("color","red")
        })

        $(".prompt_close,.prompt_btn").click(function(){
            $(".prompt_box").hide()
            $(".shadow").hide()
        })
            $(".nav_tab>a").click(function (e) {
                e.preventDefault();//取消默认行为，没有这句话的话，会跳转到baidu网站上
            });
        
        
    }
    function download(){
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var oBtn = document.getElementById("login_btn_id");
        oBtn.onclick=function(){
            $.ajax({
                type:"post",
                url:"../php/login.php",
                data:{
                    username: username.value,
                    password: password.value,
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    // console.log(obj)
                    if(obj.code){
                        $(".prompt_box").show(250);
                        $(".shadow").show();
                        $(".prompt_box_content").html(obj.message)
                    }else{
                        $(".info").html("登录成功！1s后跳转至首页")
                        setTimeout(function () {
                            location.href = "index.html";
                          }, 2000);
                    }
                },
                error:function(msg){
                    console.log(msg)
                }
            })

        }
       
    }
    return{
        showPhone:showPhone,
        download:download
      }
});
define([ "jquery", "jquery-cookie"], function ($) {
    function showPrompt(){
        $(".prompt_close,.prompt_btn").click(function(){
            $(".prompt_box").hide()
            $(".shadow").hide()
        })
        var boolean = true;
        $("#agreement").click(function(){
            if(boolean){
                $("#login_btn_id").attr("disabled",true)
                $("#login_btn_id").css("opacity","0.6")
                boolean = false
            }else{
                $("#login_btn_id").attr("disabled",false)
                $("#login_btn_id").css("opacity","1")
                boolean = true;
            }
        })
       
    }
    function download(){
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        var repassword = document.getElementById("repassword")
        var oBtn = document.getElementById("login_btn_id");
        oBtn.onclick=function(){
            $.ajax({
                method:"post",
                url:"../php/register.php",
                data:{
                    username: username.value,
                    password: password.value,
                    repassword:repassword.value,
                    addTime: new Date().getTime(),
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".prompt_box").show(250);
                        $(".shadow").show();
                        $(".prompt_box_content").html(obj.message)
                    }else{
                        $(".info").html("注册成功！1s后跳转至登录页面")
                        setTimeout(function () {
                            location.href = "login.html";
                          }, 1000);
                    }
                },
                error:function(msg){
                    console.log(msg)
                }
            })

        }
       
    }
    return{
        showPrompt:showPrompt,
        download:download
      }
});
define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
   function download(){
       $.ajax({
        url:"./data/bottomlist.json",
        success:function(arr){
            var str=``;
            for(var i=0;i<arr.length;i++){
                str+=`
                <div class="btm_list">
                <div>
                    <a href=""><img src="${arr[i].img}" alt=""></a>
                </div>
                <div>
                    <p>${arr[i].title}</p>
                    <p>${arr[i].info}</p>
                    <a href="${arr[i].href}" class="more" >了解更多&gt;</a>
                </div>
            </div> `
            }
            $(".bottom_list").html(str);
        },
        error:function(msg){
            console.log(msg)
        }
    })
   }
   return{
       download:download,
   }
    
});
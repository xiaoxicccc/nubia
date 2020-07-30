define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
   function download(){
       $.ajax({
        url:"./data/listdata.json",
        success:function(arr){
            var str=``;
            for(var i=0;i<arr.length;i++){
                str+=`
                <div class="Glist">
                <a href=""><img src="${arr[i].img}" alt=""></a>
                <div>
                    <div class="black">
                        <h3>${arr[i].title}</h3>
                        <p>${arr[i].info}</p>
                    </div>
                </div>
            </div> `
            }
            $(".goods_list").html(str);
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
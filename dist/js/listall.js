define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
   function download(){
       $.ajax({
        url:"./data/listall.json",
        success:function(arr){
            var str=``;
            for(var i=0;i<arr.length;i++){
                str+=`
                <a href="" id="${arr[i].id}" class="detail_pages">
                <dl>
                    <dt><img src="${arr[i].img}" alt=""></dt>
                    <dd>${arr[i].title}</dd>
                    <dd style="font-weight: 600;">${arr[i].price}</dd>
                </dl>
            </a> `
            }
            $(".list_all").html(str);
        },
        error:function(msg){
            console.log(msg)
        }
    })
   }
   function detailPages(){
       $(document).on("click",".detail_pages",function(){
           
           $.cookie("detail",$(this).attr("id"),{
               expires:20,
               raw:false
           })
           this.href="detail.html"
       })
   }
   return{
       download:download,
       detailPages:detailPages
   }
    
});
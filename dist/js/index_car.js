define([
    "parabola",
    "jquery",
    "jquery-cookie"
], function(parabola, $) {
    function download(){
        $.ajax({
         url:"./data/listall.json",
         success:function(arr){
                $.cookie("detail")
             
           
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
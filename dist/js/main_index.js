// console.log("加载成功");
//引入所有模块
//配置路径
require.config({
    paths:{
        jquery:"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        parabola:"parabola",//抛物线方程不支持AMD规范
        banner:"banner",
        listdata:"listdata",
        bottomlist:"bottomlist",
        topnav:"topnav",
        listall:"listall",
        detail:"detail",
        shoppingCart:"shoppingCart",
        index_car:"index_car",
        

    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"],
        "topnav":["shoppingCart"],
        //设置某一个模块，不遵从AMD。‘
        parabola:{
            exports:"_"
        },
    },
   
});

//调用模块
require(["banner"],function(banner){
    banner.banner();
})
require(["listdata"],function(listdata){
    listdata.download()
})
require(["bottomlist"],function(bottomlist){
    bottomlist.download()
})
require(["topnav"],function(topnav){
    topnav.download()
    topnav.other()
    topnav.miniCar()

})
require(["listall"],function(listall){
    listall.download()
    listall.detailPages()
})
require(["detail"],function(detail){
    detail.style()
    detail.zoom()
    detail.refresh()
    detail.shoppingCar()
    // detail.miniCar()
})
require(["shoppingCart"],function(shoppingCart){
    shoppingCart.download()
    shoppingCart.sc_num()
    shoppingCart.sc_msg()
    shoppingCart.other()
})
require(["index_car"],function(index_car){
    index_car.download()
})
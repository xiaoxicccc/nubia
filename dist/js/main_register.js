// console.log("加载成功");
//引入所有模块
//配置路径
require.config({
    paths:{
        jquery:"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        parabola:"parabola",//抛物线方程不支持AMD规范
        register:"register"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"],
        //设置某一个模块，不遵从AMD。‘
        parabola:{
            exports:"_"
        },
    },
   
});

//调用模块
require(["register"],function(register){
    register.showPrompt(),
    register.download()
})
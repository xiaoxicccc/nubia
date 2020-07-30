define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
  sc_num();
  sc_msg();

  function sc_msg() {
    $.ajax({
      url: "./data/detail.json",
      success: function (arr) {
        var cookieStr = $.cookie("goods");

        if (cookieStr) {
          var cookieArr = JSON.parse(cookieStr);
          var newArr = []; //符合条件数据
          for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < cookieArr.length; j++) {
              if (arr[i].id == cookieArr[j].id) {
                arr[i].num = cookieArr[j].num;
                newArr.push(arr[i]);
                break;
              }
            }
          }

          var str = ``;
          var sumPrice = 0;
          for (var i = 0; i < newArr.length; i++) {
            str += `
                        <tr id="${newArr[i].id}">
                        <td class="firstTd"><input type="checkbox" class="Input"></td>
                            <td class="productImage"><img src="${newArr[i].listimg[0]}" alt=""></td>
                            <td valign="top" class="productname">
                                <a target="_blank" href="" class="pdt-title">${newArr[i].title}（${newArr[i].titleType} ${newArr[i].titleRAM}）</a> 
                                <ul>
                                    
                                </ul>
                            </td>
                            <td class="productPrice"> ￥<span id="price1">${newArr[i].price}</span></td>
                            <td>
                                <div class="btn-cnts">
                                    <span class="table-cut table-ac">-</span> 
                                    <input type="text" maxlength="2" readonly="readonly" class="num cart-cnt" value="${newArr[i].num}"> 
                                    <span class="table-add table-ac">+</span>
                                </div>
                            </td>
                            <td><a title="删除" class="close">×</a></td>
                        </tr>
                        `;

            sumPrice += newArr[i].num * newArr[i].price;
          }
          $(".totalPrice").html(sumPrice);
          $(".tb-content").html(str);
        }

        var cks,all;
        init();
        function init(){
          cks = document.getElementsByClassName("Input")
          cks=Array.from(cks);
          for(var i=0;i<cks.length;i++){
            cks[i].onclick = clickHandler;
          }
          all = cks.pop()
        }
        function clickHandler(){
          if(this===all){
            cks.forEach(function(item){
              item.checked = all.checked;
            })
          }else{
            all.checked = cks.every(function(item){
              return item.checked;
            })
          }
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }
  function sc_num() {
    var cookieStr = $.cookie("goods");
    if (!cookieStr) {
      $(".sc_num").html(0);
    } else {
      var cookieArr = JSON.parse(cookieStr);
      var sum = 0;

      for (var i = 0; i < cookieArr.length; i++) {
        sum += cookieArr[i].num;
      }
    }
    $("#number").html(sum);
  }
  function other() {
    //删除
    $(".tb-content").on("click", ".close", function () {
      var id = $(this).closest("td").closest("tr").remove().attr("id");
      var cookieArr = JSON.parse($.cookie("goods"));
      cookieArr = cookieArr.filter((item) => item.id != id);
      cookieArr.length
        ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 })
        : $.cookie("goods", null);
      sc_num();
      sc_msg();
      location.reload()
    });

    $(".tb-content").on("click", ".table-ac", function () {
      var id = $(this).closest("td").closest("tr").attr("id");
      var cookieArr = JSON.parse($.cookie("goods"));
      var res = cookieArr.find((item) => item.id == id);
      if ($(this).html() == "+") {
        res.num++;
      } else {
        res.num == 1 ? alert("客官，再减就木有了！") : res.num--;
      }
      $(this).siblings("input").val(res.num);

      $.cookie("goods", JSON.stringify(cookieArr), {
        expires: 7,
      });
      sc_num();
      sc_msg();
    });

  }

  function download() {
    $.ajax({
      url: "./data/listall.json",
      success: function (arr) {
        var str = ``;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id <= 15) {
            str += `
                    <li>
                    <a href=""><img src="${arr[i].img}" alt=""></a>
                    <div class="hot-title">
                        <div class="sku02">
                            <div class="sku02-name">${arr[i].title}</div> 
                            <div>${arr[i].price}</div>
                        </div> 
                        <div class="buy-btns">
                        加入购物车
                        </div>
                    </div>
                </li>`;
          }
        }
        $(".pdt-hot-list").html(str);
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }

  return {
    download: download,
    sc_num: sc_num,
    sc_msg: sc_msg,
    other: other,
  };
});

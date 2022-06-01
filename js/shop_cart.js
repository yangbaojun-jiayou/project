class Cart{
    constructor(){
this.getCartGoods();
// 3.2.1 给.table_list绑定点击事件,实现事件的委托;
this.$('.table_list').addEventListener('click',this.dispatch);
// 3.3.0 给全选按钮绑定点击事件;
this.$('.cart-checkbox input').addEventListener('click',this.checkAll);
// this.oneCheckBox();
// this.jiaGoodsNum();
// 3.8.0 给.sp_Operation绑定点击事件,实现事件委托;
this.$('.sp_Operation').addEventListener('click',this.assign);
}
// 3.8.1 .sp_Operation点击事件委托分发;
assign = (eve) =>{
    let target =eve.target;
// 3.8.2 判断当前点击的是否为删除选中的标签;
    if(target.nodeName == 'A' && target.classList.contains('send')) this.delCheckGoods(target);
}
// 3.2.2 事件委托的分发;
dispatch = (eve) =>{
    // console.log(this);
// 3.2.3 获取事件源
let target = eve.target;
// console.log(target.classList.contains('del1'),target.nodeName == 'A');
// 3.2.4 判断当前点击的是否为删除的A标签
if(target.nodeName == 'A' && target.classList.contains('del1')) this.delGoodsData(target);
// 3.6.0 判断当前点击是否为 + 标签
// console.log(target.nodeName == 'A' && target.classList.contains('jia'));
if(target.nodeName == 'A' && target.classList.contains('jia')) this.jiaGoodsNum(target);
// 3.7.0 判断当前点击的是否为 - 标签;
if(target.nodeName == 'A' && target.classList.contains('jian')) this.jianGoodsNum(target);

}
// 3.7 数量减少的方法;
jianGoodsNum = (tar) =>{
// console.log(tar);
// 3.7.1 获取数量,单价,小计;
let tr = tar.parentNode.parentNode.parentNode;
// console.log(tr);
let num = tr.querySelector('.number_text');
let sum = tr.querySelector('#price_item_1');
let price = tr.querySelector('#Original_Price_1').innerHTML - 0;
// console.log(num,sum,price);
// 3.7.2 获取数量对数量-1;
let numVal = num.value;
numVal--;
// console.log(numVal);
// 3.7.3 给服务器发送ajax请求,减少数量;
const AUTH_TOKEN = localStorage.getItem('token')
axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
let uId = localStorage.getItem('user_id');
let gId = tr.dataset.id;
let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
axios.post('http://localhost:8888/cart/number',param).then(res=>{
// console.log(res);
// 3.7.4 判断请求是否成功
let {status,data} = res;
if(status == 200 && data.code == 1){
// 3.7.5 将更新后的数量设置回去;
num.value = numVal;
sum.innerHTML = (parseInt(numVal * price * 100) / 100);

}
// 3.7.6 调用统计数量和价格的方法,将数据追加到底部
this.countSumPrice();
});
}

// 3.6 数量增加的方法;
jiaGoodsNum = (tar) =>{
    // console.log(tar);

// 3.6.1 获取数量,单价,小计;
let tr = tar.parentNode.parentNode.parentNode;
// console.log(tr);
let num = tr.querySelector('.number_text');
let sum = tr.querySelector('#price_item_1');
let price = tr.querySelector('#Original_Price_1').innerHTML - 0;
// console.log(num,sum,price);
// 3.6.2 获取数量,对数量+1;
let numVal = num.value;
numVal++;
// console.log(typeof(numVal));
// console.log(num);
// console.log(numVal);
// 3.6.3 给服务器发送ajax请求,增加数量;
// 发送请求需要携带用户id;商品id;要修改的购买数量;
const AUTH_TOKEN = localStorage.getItem('token')
axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
let uId = localStorage.getItem('user_id');
let gId = tr.dataset.id;
let param = `id=${uId}&goodsId=${gId}&number=${numVal}`
axios.post('http://localhost:8888/cart/number',param).then(res=>{
// console.log(res);
// 3.6.4 判断请求是否成功
let {status,data} = res;
if(status == 200 && data.code == 1){
// 3.6.5 将更新后的数量设置回去;
num.value = numVal;
sum.innerHTML = (parseInt(numVal * price * 100) / 100);

}
// 3.6.6 调用统计数量和价格的方法,将数据追加到底部
this.countSumPrice();
});
}
// 

// !删除选中功能的实现; 
// 3.8 删除选中商品功能的实现;
delCheckGoods(){
    // console.log(tar);
    this.$('.table_list tr').forEach(tr =>{
        // console.log(tr);
    let gId =tr.dataset.id;
    let uId =localStorage.getItem('user_id');
    console.log(gId,uId); 
    // if(allStatus){
    // const AUTH_TOKEN = localStorage.getItem('token')
    // axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
    // axios.get('http://localhost:8888/cart/remove', {
    // params: {
    //       id: uId,
    //      goodsId: gId
    //    }
    //   }).then(res => {
    //      console.log(res);
    //     tr.remove();
    //   })  
    // }
    
    });
  
    
}
// 3.3 全选的实现
checkAll = (eve) => {
// console.log(eve.target);
// 3.3.1 点击全选的时候,单个商品的选中框的状态跟随全选;
let allStatus=eve.target.checked;
// console.log(allStatus);
this.oneCheckGoods(allStatus);
  
// 3.5.1调用统计数量和价格的方法;
this.countSumPrice();

// this.delCheckGoods()  
}
// 3.4.8让单个商品的状态跟随全选的状态;
oneCheckGoods(status){
// 3.4.9 遍历单选框,改变其status;
this.$('.checkbox input').forEach(input => {
    input.checked = status;
    // console.log(input.checked);
    
})

}

// 3.4 单选的实现;
oneCheckBox(){
// console.log(this.$('.checkbox'));
// 3.4.0 给每个单选按钮绑定点击事件;
this.$('.checkbox input').forEach(input =>{

// 3.4.1 保存this指向;
let self = this;
// console.log(input);
input.onclick = function(){
// 3.4.2 获取当前的点击状态;
// console.log(this.checked);

// 3.4.3 判断当前商品的input点击的是取消,则此时取消全选;
if(!this.checked){
    self.$('.cart-checkbox input').checked = false;
    // console.log(self.$('.cart-checkbox input'));
}
// 3.4.4 点击选中时,判断页面中是否有其他未选中,如果都选中,则全选中;
if(this.checked){
    let status = self.getoneCheckBoxStatus();
    // console.log(status);
    self.$('.cart-checkbox input').checked = status;
}
//3.5.1调用统计数量和价格的方法;
    self.countSumPrice();
}
})

}
// 3.3.5 获取单个商品的选中状态
getoneCheckBoxStatus(){
// 3.2.6 寻找是否有没选中的,如果页面都选中res则为空数组;
let res = Array.from(this.$('.checkbox input')).find(input=>{
// console.log(!input.checked);
return !input.checked
})
//  console.log(res);
// 3.2.7 如果res有值,则页面中有没被选中的,页面中都被选中,则返回true;
return !res;
}

// 3.5 统计价格和数量的方法
countSumPrice(){
    let sum = 0;
    let num = 0;
    let jfnum=0;
// 3.5.0 统计选中商品的价格和数量;  
this.$('.checkbox input').forEach(input =>{
    // console.log(input);
if(input.checked){//判断input是否选中
// 3.5.2 通过input获取节点.tr;
let tr = input.parentNode.parentNode;
// console.log(tr);
// 3.5.3 获取数量和价格;
let gNum = tr.querySelector('.number_text').value - 0;
let gSum = tr.querySelector('#price_item_1').innerHTML-0;
sum += gSum;
num += gNum;

}

});
// 3.5.4 保留价格小数点后两位,获取积分;
sum = parseInt(sum * 100)/100;
jfnum = Math.round(sum);
// console.log(sum,num);
// 3.5.5 将数量和价格追加到页面中;
this.$('#Total_price').innerHTML=sum;
this.$('#Preferential_price').innerHTML=num;
this.$('#total_points').innerHTML=jfnum;

}

// 3.2 删除购物车中商品

delGoodsData(tar){
    // console.log(tar);
// 3.2.5 设置弹出框,询问是否删除;
let index=layer.confirm('是否删除商品',{
title:"删除提示框"
},function(){
// 3.2.0 删除功能需要用户id 和goods-id;
let tr=tar.parentNode.parentNode.parentNode;
// console.log(tbody);
let gId = tr.dataset.id;
//  console.log(gId);
let uId = localStorage.getItem('user_id');
// console.log(gId,uId);
// 3.2.6 调用ajax进行后台验证需要携带token;
const AUTH_TOKEN=localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
let res = axios.get('http://localhost:8888/cart/remove',{
    params:{
        id:uId,
        goodsId:gId
    }
}).then(res=>{
    // console.log(res);
// 3.2.7 无刷新删除,关闭删除弹出框,且删除对应ul;
layer.close(index)
tr.remove();
})

}
)

}

// 3.1取出商品信息;
async getCartGoods(){
// console.log(this);
// 3.1.0 发送ajax请求,获取商品数据;
const AUTH_TOKEN=localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
let {data,status} =await axios.get('http://localhost:8888/cart/list',{
    params:{
        id:localStorage.getItem('user_id')
    }
});
// console.log(data);
// 3.1.1 判断ajax请求状态;
if(status == 200 && data.code == 1){
    // console.log('ok');
// console.log(data.cart);
// 3.1.2 将商品数据拼接并追加到页面当中;
let html = '';
// 3.1.3 循环遍历取出商品信息;
data.cart.forEach(goods => {
    // console.log(goods);
html +=`<tr class="tr" data-id=${goods.goods_id}>
<td class="checkbox"><input name="checkitems" type="checkbox" value="" ></td>
 <td class="name">
   <div class="img"><a href="#"><img src="${goods.img_small_logo}" /></a></div>
   <div class="p_name"><a href="#">${goods.title}</a></div>
 </td>
 <td class="scj sp"><span id="Original_Price_1">${goods.price}</span></td>
 <td class="bgj sp" ><span id="price_item_1">${goods.price * goods.cart_number }</span></td>
 <td class="sl">
     <div class="Numbers">
       <a  href="#none" class="jian">-</a>
       <input type="text" name="qty_item_" value="${goods.cart_number}" id="qty_item_1" onkeyup="setAmount.modify('#qty_item_1')" class="number_text">
       <a  href="#none" class="jia">+</a>
      </div>
 </td>
 <td class="xj" ><span id="total_item_1"></span><input type="hidden" name="total_price" id="total_price" value=""></td>
 <td class="cz">
  <p><a href="#none" class="del1">删除</a><P>
  <p><a href="#">收藏该商品</a></p>
 </td>
</tr>`
});
// console.log(html);
// 3.1.4 将拼接好的字符串追加到页面中;
this.$('.table_list').innerHTML+= html;
this.oneCheckBox();
}

/!跳转登录的实现!/ 
//  登录过期的处理
 if (status == 200 && data.code == 401) {  // 如果登录过期,则重新登录
     // 清除 local中存的token和userid
     localStorage.removeItem('token');
     localStorage.removeItem('user_id');
     // 跳转到登录页面
     location.assign('./login.html?returnUrl=shop_cart.html')
   }
}


// 封装获取事件的方法;
    $(ele){
        let res=document.querySelectorAll(ele);
           
        return res.length==1? res[0]:res;
        }
}
new Cart;
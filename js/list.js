class List{
constructor(){
this.getData();
this.bindEve();
}

// 1.4.1 绑定添加购物车的方法;并给ul绑定点击事件;
bindEve(){
    this.$('.p_list ul').addEventListener('click',this.addCart.bind(this));
}

// 1.0 获取数据;
async getData(){
// console.log(1111);
// 1.1发送ajax请求,获取数据;

let {data,status} = await axios.get('http://localhost:8888/goods/list');
// console.log(goodsData);
// 1.2判断获取的status和dtCode,来查看ajax请求是否成功;
// console.log(status,dtCode);
// 1.2.1如果status,dtCode不等于获取值则请求不成功丢出错误;
if(status !== 200 && data.code !== 1) throw new Error("获取数据失败");
// 1.3 循环遍历数据
let html='';
data.list.forEach(goods => {
    // console.log(goods);
html +=`<li class="gl-item" data-id="${goods.goods_id}">
<div class="Borders">
 <div class="img"><a href="#"><img src="${goods.img_big_logo}" style="width:220px;height:220px"/></a></div>
 <div class="Price"><b>¥${goods.price}</b><span>[¥${goods.current_price}]</span></div>
 <div class="name"><a href="#">${goods.title}</a></div>
 <div class="Review">已有<a href="#">2345</a>评论</div>
 <div class="p-operate">
  <a href="#" class="p-o-btn Collect"><em></em>收藏</a>
  <a href="#" class="p-o-btn shop_cart"><em></em>加入购物车</a>
 </div>
 </div>
</li>`
    
});
// console.log(html);
// console.log(this);
// 1.3.2 将拼接好的字符串追加到页面当中;
// console.log(this.$('.p_list ul'));
this.$('.p_list ul').innerHTML+=html;

}
// 1.4 添加到购物车的方法;
addCart(eve){
    // console.log(this);
// 1.4.2 获取事件源,判断点击的是否为a标签
// console.log(eve.target.className);
if(eve.target.nodeName !=='A' && eve.target.className !=='shop_cart') return ;
// console.log(eve.target);
// 1.4.3 判断用户是否登录;如果登录local中有token;如果登录则没有;
// console.log(localStorage.getItem('token'));
let token = localStorage.getItem('token');
if (!token) location.replace("./login.html");

// 1.4.4 如果用户已经登录,就需要将商品加入到购物车;
// 1.4.5 需要获取商品和用户的id;但是li 标签中没有商品id,需要手动设置id;
// console.log(eve.target.parentNode.parentNode.parentNode.dataset.id)
let goodsId = eve.target.parentNode.parentNode.parentNode.dataset.id
let userId = localStorage.getItem('user_id');
// console.log(goodsId,userId);

this.addCartGoods(goodsId,userId);
}
addCartGoods(gId,uId){
    // console.log(gId,uId);
// 1.5 给购物车发送请求
// 1.5.1 调用购物车接口,后台需要验证是否为登录状态;
// 1.5.2 设置'authorization' 字段;
const AUTH_TOKEN=localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 1.5.3 设置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
let param = `id=${uId}&goodsId=${gId}`;
axios.post('http://localhost:8888/cart/add',param).then(res=>{
    console.log(res);
// 1.5.4 判断添加购物车是否成功;
let status = res.status;
let data_code = res.data.code;
if(status == 200 && data_code == 1){
// console.log(1111);
// 1.5.7 引入layer插件
layer.open({
    title: '郭德纲'
    ,content: '耍朋友?'
    ,btn:['耍','不耍']
    ,btn2:function(index,layero){
        // console.log('ok!');
    location.assign('./shop_cart.html');
    }
  });
// 1.5.5 如果登录过期,需要重新登录,清除local中存的token和userid;

}else if(status == 200 && data_code == 401){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
// 1.5.6 跳转到登录页面,重新登录;
if(!token) location.assige('login.html?ReturnUrl=list.html');

// 1.5.8 如果添加购物车失败,弹出模态框提醒;
}else{
    layer.open({
        title: '添加购物车'
        ,content: '失败!!!'
        ,time:3000
})

}

})

}

// 1.3.1 封装获取节点的方法;
$(ele){
    let res = document.querySelectorAll(ele);
    return res.length == 1 ? res[0]:res;
}
}
new List;
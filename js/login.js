class Login{
    constructor(){
// 2.1给登录按钮绑定点击事件;
this.$('.btn_login').addEventListener('click',this.islogin);
    }
// 2.0登录的实现
islogin=()=>{
    // console.log(this);
// 2.2 获取登录页面的input框
let inputName = document.querySelector('.item-fore1 input');

let inputPwd = document.querySelector('.item-fore2 input');
// console.log(inputName,inputPwd );
// 2.2.1获取登录页面的input框中的值;
let loginName = inputName.value;
let loginPwd = inputPwd.value;
// console.log(loginName,loginPwd);
// 2.2.2 对获取的值进行非空验证
if(!loginName || !loginPwd) throw new Error('用户名和密码不能为空...');
// 2.3 发送ajax请求,实现登录;
// 2.3.1 设置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 2.3.2 将需要传递的参数进行拼接;
let param=`username=${loginName}&password=${loginPwd}`;
axios.post('http://localhost:8888/users/login',param).then(res=>{
    // console.log(res);
// 2.3.3 判断登录状态,将用户的信息进行保存;
if(res.status == 200 && res.data.code ==1){
// 2.3.4 将token 和user_id保存到local中;
// console.log(res.data.token,res.data.user.id);
localStorage.setItem('token',res.data.token);
localStorage.setItem('user_id',res.data.user.id);
// console.log('token',res.data.token);

// 2.3.5 如果有回调地址,则跳转到回调地址;
if(this.url){
    location.href=this.url;
}
}
})
}
$(ele){
    let res=document.querySelectorAll(ele);
        // 如果获取到的是单个节点集合,就返回单个节点,如果是多个节点集合,就返回整个集合;
    return res.length==1? res[0]:res;
    }
}

new Login;
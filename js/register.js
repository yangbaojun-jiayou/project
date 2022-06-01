class Register{
constructor(){
// 4.0 给注册按钮绑定点击事件;
this.$('.btn_rgister').addEventListener('click',this.ispost);
}

// 4.1.0 注册的实现;
ispost=()=>{

    // console.log(this);
//4.1.1 获取输入框中的值;
let from =document.querySelectorAll('.form input');
//  console.log(from);
let username =from[0].value.trim();
// console.log(useName);
let password =from[1].value.trim();
let rpassword=from[2].value.trim();
let nickname = from[3].value.trim();
let varCode = from[4].value.trim();
// console.log(username,password,rpassword,nickname,varCode);
// 4.1.2 对获取的值,进行非空验证;
if(!username ||!password ||!rpassword ||!nickname ||!varCode) throw new Error('输入的值不能为空!!');
// 4.1.3 发送ajax请求实现用户注册;
// 将参数进行拼接;
let param =`username=${username}&password=${password}&rpassword=${rpassword}&nickname=${nickname}`;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.post('http://localhost:8888/users/register',param).then(res=>{
    console.log(res);

let {status ,data} =res;
// 4.1.5 弹出提示框提示注册失败,用户已注册;请登录,并跳转到登录页面;
if(status == 200 && data.code == 0){
    layer.open({
        title: '注册失败!'
        , content: '用户已注册,请登录!'
        , time: 2500
        ,btn:['确定']
        ,btn1:function(){
        location.assign('./login.html')   
        }
      }    
      );  
} 
// 4.1.4 弹出提示框提示注册成功,并跳转到登录页面;
// console.log(status,data);
if(status == 200 && data.code ==1){
        layer.open({
            title: '注册成功!'
            , content: '这是个人的一小步,却是人类的一大步'
            , time: 2500
            ,btn:['确定']
            ,btn1:function(){
            location.assign('./login.html')   
            }
          }
         
          );  
    }
})

}
$(ele) {
    let res = document.querySelectorAll(ele);
    // 如果获取到的是,当个节点集合,就返回单个节点,如果是多个节点集合,就返回整个集合.
    return res.length == 1 ? res[0] : res;
  }
}
new Register;
// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
window.onload=function () {  
    //show();
    var oin=document.getElementById("email-input");
    var timer=null;
    oin.onfocus=function(){
        show();
        oin.onkeyup=function(){
            uodate(oin.value);
        }
    }

    oin.onblur=function(){
        oin.style.background="#fff";
        killShow();
    }
    
    function uodate(str){
        var oul=document.getElementById("email-sug-wrapper");
        var ali=oul.getElementsByTagName("li");
        for(var i=0;i<ali.length;i++){
            ali[i].innerHTML=str+"@"+postfixList[i];
        }
    }

    function show(){
        killShow();
        var oul=document.getElementById("email-sug-wrapper");
        oul.className="gray-border";
        for(var i=0;i<postfixList.length;i++){
            var oli=document.createElement("li");
            oli.innerHTML=postfixList[i];
            oli.className="email-tag";
            oul.appendChild(oli);
        }
    }
    function killShow(){
        clearInterval(timer);
        var oul=document.getElementById("email-sug-wrapper");
        oul.className="";
        while(oul.children.length)oul.removeChild(oul.children[0]);
    }
}
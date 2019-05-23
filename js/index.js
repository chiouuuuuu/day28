 // 邮箱后缀List参考
 var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
 window.onload = function () {
     createLi();
     var oul = document.getElementById("email-sug-wrapper");
     var oin = document.getElementById("email-input");
     oin.oninput = function () {
        update(oin.value);
     }

     oin.onblur = function () {
        document.getElementById("email-sug-wrapper").style.display="none";
     }

     function update(str) {
        if (oin.value != "") {
            var flag=true;
            var ali = oul.getElementsByTagName("li");
            for (var i = 0; i < ali.length; i++) {
                ali[i].innerHTML = str + "@" + postfixList[i];
                if(ali[i].scrollWidth>ali[i].clientWidth){
                    oin.value="";
                    alert("长度过长");
                    flag=false;
                }
            }
            if(flag)oul.style.display="block";
            else oul.style.display="none";
        }
        else{
            oul.style.display="none";
        }
     }

     function createLi() {
         var oul = document.getElementById("email-sug-wrapper");
         oul.className = "gray-border";
         for (var i = 0; i < postfixList.length; i++) {
             var oli = document.createElement("li");
             oli.innerHTML = postfixList[i];
             oli.className = "email-tag";
             oul.appendChild(oli);
         }
         oul.style.display="none";
     }
     document.getElementById("001").onclick=function () {
        console.log(trim(oin.value));
     }
 }

 function trim(str){
    let l=0,r=str.length-1;
    while(str[l]==' ')l++;
    while(str[r]==' ')r--;
    return str.substring(l,r+1);
 }
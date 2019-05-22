 // 邮箱后缀List参考
 var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
 window.onload = function () {
     createLi();
     var oin = document.getElementById("email-input");
     oin.onfocus = function () {
        if (oin.value != "") {
            update(oin.value);
        }
        oin.onkeyup = function () {
            update(oin.value);
        }
     }

     oin.onblur = function () {
        document.getElementById("email-sug-wrapper").style.display="none";
     }

     function update(str) {
         var oul = document.getElementById("email-sug-wrapper");
         var ali = oul.getElementsByTagName("li");
         for (var i = 0; i < ali.length; i++) {
             ali[i].innerHTML = str + "@" + postfixList[i];
             if(ali[i].scrollWidth>ali[i].clientWidth){
                 alert("长度过长");
             }
         }
         oul.style.display="block";
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
        console.log(deleteSpace(oin.value));
     }
 }

 function deleteSpace(str){
    let l=0,r=str.length-1;
    while(str[l]==' ')l++;
    while(str[r]==' ')r--;
    return str.substring(l,r+1);
 }
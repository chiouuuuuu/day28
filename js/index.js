 // 邮箱后缀List参考
 var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
 window.onload = function () {
     createLi();
     var oul = document.getElementById("email-sug-wrapper");
     var oin = document.getElementById("email-input");
     oin.oninput = function () {
         var str = trim(oin.value);
         update(str);
     }

     oin.onblur = function () {
         document.getElementById("email-sug-wrapper").style.display = "none";
     }
    
     function update(str) {
         if (str != "") {
             var flag = true;//if the flag is true the oul will display
             var numMatched=0;
             var ali = oul.getElementsByTagName("li");
             for(var i=0;i<ali.length;i++){
                ali[i].style.display="block";
             }
             for (var i = 0; i < ali.length; i++) {
                 ali[i].innerHTML = preAt(str) + "@" + postfixList[i];
                 ali[i].flag=isMatch(str,postfixList[i]);
                 if(ali[i].flag)numMatched++;
                 console.log(ali[i].flag);
                 /****判断用户名长度是否过长****/
                 if (ali[i].scrollWidth > ali[i].clientWidth) {
                     oin.value = "";
                     alert("长度过长");
                     flag = false;
                 }
             }
             if (flag) oul.style.display = "block";
             else oul.style.display = "none";
             for(var i=0;i<ali.length && numMatched>0;i++){
                if(ali[i].flag==false){
                    ali[i].style.display="none";
                }
             }
         } else {
             oul.style.display = "none";
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
         oul.style.display = "none";
     }
     document.getElementById("001").onclick = function () {
         console.log(isMatch(oin.value,postfixList[0]));
     }

     function isMatch(str,arrElement){
        var l=isHaveAt(str); 
        var flag=true;
        if(l!=-1){
             var ss=str.substring(l+1,str.length);
             console.log(ss);
             console.log(arrElement);
             for(var i=0;i<ss.length;i++){
                 if(ss[i]!=arrElement[i]){
                    flag=false;
                    break;
                 }
             }
         }else{
             flag=false;
         }
         return flag;
     }
 }

 function trim(str) {//delete the the space before and after the string that unnecessary
     let l = 0,
         r = str.length - 1;
     while (str[l] == ' ') l++;
     while (str[r] == ' ') r--;
     if (l <= r)
         return str.substring(l, r + 1);
     else
         return "";
 }

 function isHaveAt(str) {//if string has a '@' return the position of '@' else return -1
     var l = 0;
     var pos=-1;
     while (str[l] != "@" && l < str.length) l++;
     if (l != str.length) pos=l;
     return pos;
 }

 function preAt(str) {//return the string before '@'(if the string haven't '@' return the string)
     var l=isHaveAt(str);
     if (l==-1) return str;
     else return str.substring(0, l);
 }
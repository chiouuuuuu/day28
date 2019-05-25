 // 邮箱后缀List参考
 var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
 var numMatched=0;

 var HtmlUnit={
    Encode:function(str){
        var tmp=document.createElement("div");
        (tmp.innerText==undefined)?(tmp.innerText=str):(tmp.textContent=str);
        var output=tmp.innerHTML;
        tmp=null;
        return output;
    },
    Decode:function(html) {
        var tmp=document.createElement("div");
        tmp.innerHTML=html;
        var output=tmp.innerText||tmp.textContent;
        tmp=null;
        return output;
    }
}

 window.onload = function () {
     createLi();
     var oul = document.getElementById("email-sug-wrapper");
     var oin = document.getElementById("email-input");
     var index=0;
     var arr=[];

     oin.oninput = function () {
         var str = HtmlUnit.Encode(trim(oin.value));
         update(str);
         console.log(arr.length);
     }
     oin.onkeydown=function(event){
        var e=event||window.event
        
        if(e.keyCode==13){
            // console.log("key 13");
            oin.value=arr[index].innerHTML;
            oul.style.display="none";
        }
        else if(e.keyCode==38 || e.keyCode==40){
            initArrBackground();
            e.preventDefault();
            if(e.keyCode==38){
                index=(index==0)?numMatched-1:index-1;
                // console.log("key 38");
            }
            if(e.keyCode==40){
                index=(index+1)%numMatched;
                // console.log("key 40");
            }
            console.log(index);
            arr[index].style.background="blue";
            for(var i=0;i<arr.length;i++){
                if(i==index)continue;
                arr[i].style.background=arr[i].lastColor;
            }
        }
     }

     function initArrBackground(){
        for(var i=0;i<arr.length;i++){
            if(i==index)continue;
            arr[i].lastColor=arr[i].style.background;
        }
    }
    
    var lastColor="";
     //the chosen change color
     oul.onmouseover=function(event){
         var e=event || window.event;
         var target=e.target || e.srcElement;
         if(target.nodeName.toLowerCase()=="li"){
             lastColor=target.style.background;
             target.style.background="pink";
         }
     }
    
     //the chosen moveout
     oul.onmouseout=function(event){
        var e=event || window.event;
        var target=e.target || e.srcElement;
        if(target.nodeName.toLowerCase()=="li"){
            target.style.background=lastColor;
        }
    }

    //click make the chosen show in input
    oul.onmousedown=function(event){
        var e=event || window.event;
        var target=e.target || e.srcElement;
        if(target.nodeName.toLowerCase()=="li"){
            oin.value=HtmlUnit.Decode(target.innerHTML);
        }
        oul.style.display="none";
    }

    //the focus move out
    oin.onblur=function(){
        oul.style.display="none";
    }

     function update(str) {
         arr=[];
         if (str != "") {
             var flag = true;//if the flag is true the oul will display
             numMatched=0;
             var ali = oul.getElementsByTagName("li");
             index=0;
             initArrBackground();
             for(var i=0;i<ali.length;i++){
                ali[i].style.display="block";
             }
             for (var i = 0; i < ali.length; i++) {
                 ali[i].innerHTML = preAt(str) + "@" + postfixList[i];
                 ali[i].flag=isMatch(str,postfixList[i]);
                 if(ali[i].flag)numMatched++;
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
             for(var i=0;i<ali.length;i++){
                 if(ali[i].flag)arr.push(ali[i]);
             }
             if(arr.length==0)arr=oul.getElementsByTagName("li");;
             numMatched=arr.length;
             console.log(arr);
             arr[index].style.background="blue";
            arr[0].lastColor="#fff";
             for(var i=0;i<arr.length;i++){
                 if(i==index)continue;
                 arr[i].style.background=arr[i].lastColor;
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
             oli.style.background="#fff";
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
            //  console.log(ss);
            //  console.log(arrElement);
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
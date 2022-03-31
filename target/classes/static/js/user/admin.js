//
// var listLink = document.querySelectorAll('#kt_aside_menu_wrapper .menu-item');
// var nodeContent = document.getElementById('kt_content');
//
// for(var node of listLink){
//     node.onclick = function(e){
//         e.preventDefault();
//
//         var nodeLink = this.querySelector('a.menu-link');
//         if(nodeLink != null){
//             var nodeActive = document.querySelectorAll('#kt_aside_menu_wrapper .menu-item a.menu-link.active');
//             for(var nActive of nodeActive){
//                 nActive.classList.remove('active');
//             }
//             nodeLink.classList.add('active');
//             var url = nodeLink.href;
//             console.log(url);
//             let data = "";
//             let xhr = new XMLHttpRequest();
//             xhr.withCredentials = true;
//
//             xhr.addEventListener("readystatechange", function() {
//                 if(this.readyState === 4) {
//                     var url = new URL(this.responseURL);
//
//                     if(this.status === 404){
//                         window.location.replace("/404");
//                     }else{
//                         if(url.href.indexOf('ogin') != -1){
//                             window.location.replace("/admin");
//                         }else{
//                             // window.location.replace(this.responseURL);
//                             document.clear();
//                             document.write(this.responseText);
//                             document.close();
//                         }
//                     }
//                 }
//             });
//
//             xhr.open("GET", url);
//             xhr.send(data);
//         }
//
//     }
// }

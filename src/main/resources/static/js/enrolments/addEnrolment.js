'use strict';
var table = document.getElementById('add_user');
var model = document.getElementById('add_user');
var checkbox = table.querySelectorAll('[type=checkbox]');
var courseID = document.getElementById('courseID').value;
checkbox.forEach((t)=>{
    t.onclick = function(){
        var check = false;
        checkbox.forEach((node)=>{
            if(node.checked) check = true;
        });
        var action = document.querySelector('[data-kt-search-element="action"]');
        if(!check)
            action.classList.add('d-none');
        else
            action.classList.remove('d-none');
    }
})
$('#kt_modal_users_search').on('hidden.bs.modal', function () {
   checkbox.forEach(t =>{
       t.checked = false;
   })
    document.querySelector('[data-kt-search-element="action"]').classList.add('d-none');
})
var btnAdd = document.getElementById('kt_modal_users_search_submit');
btnAdd.onclick = function (){
    Swal.fire({
        text: 'Bạn chắc chắn thêm những thành viên đã chọn?',
        icon: 'warning',
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: 'Chắc chắn, thêm!',
        cancelButtonText: 'Không, hủy bỏ',
        customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary'
        }
    }).then((function (t) {
        if(t.value){
            var listUsername = [];
            checkbox.forEach(t=>{
                if(t.checked){
                    listUsername.push(t.value);
                }
            })
            var data = JSON.stringify(listUsername);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                    if(this.status === 200){
                        Swal.fire({
                            text: 'Bạn đã thêm tất cả thành viên đã chọn!.',
                            icon: 'success',
                            buttonsStyling: !1,
                            confirmButtonText: 'Ok!',
                            customClass: {
                                confirmButton: 'btn fw-bold btn-primary'
                            }
                        }).then((function () {
                           window.location.reload();
                        })).then((function () {
                            l(),
                                c()
                        }))
                    }
                }
            });
            xhr.open("POST", `/teacher/member?id=${courseID}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        } else{
            if('cancel' === t.dismiss){
                Swal.fire({
                    text: 'Bạn đã hủy thêm thành viên đã chọn.',
                    icon: 'error',
                    buttonsStyling: !1,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                        confirmButton: 'btn fw-bold btn-primary'
                    }
                })
            }
        }
    }))

}

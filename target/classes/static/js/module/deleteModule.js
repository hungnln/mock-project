document.getElementsByClassName('btn-dl').forEach((btn)=>{
    btn.onclick = function(e){
        var id = this.getAttribute('data');
        var name = this.getAttribute('data-title');
        Swal.fire({
            text: `Confirm to delete ${name} ?`,
            title: 'Message',
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Delete",
            cancelButtonText: "Get Back",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-primary"
            }
        }).then((function (e) {
            if(e.value){
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                        if(this.status === 200){
                            Swal.fire({
                                text: `Delete ${name} successfully!`,
                                title: 'Message',

                                buttonsStyling: !1,
                                confirmButtonText: "Ok",
                                customClass: {confirmButton: "btn fw-bold btn-primary"}
                            }).then((function () {
                                window.location.reload();
                            }))
                        }
                    }
                });
                xhr.open("DELETE", `/teacher/module/${id}`);
                xhr.send();
            }else{
                if("cancel" === e.dismiss){
                    // Swal.fire({
                    //     text: `Bạn đã hủy xóa chủ đề`,
                    //     icon: "error",
                    //     buttonsStyling: !1,
                    //     confirmButtonText: "Ok!",
                    //     customClass: {confirmButton: "btn fw-bold btn-primary"}
                    // })
                }
            }
        }))


    }
})
var quizID = document.getElementById('quizID').value;
document.getElementsByClassName('btn-dl').forEach((btn)=>{
    btn.onclick = function(e){
        var id = this.getAttribute('data');
        var name = this.getAttribute('data-title');
        Swal.fire({
            text: `Bạn có muốn xóa ${name} ?`,
            icon: "warning",
            showCancelButton: !0,
            buttonsStyling: !1,
            confirmButtonText: "Có!",
            cancelButtonText: "Không, hủy bỏ",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
            }
        }).then((function (e) {
            if(e.value){
                var data = JSON.stringify(id);
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                        if(this.status === 200){
                            Swal.fire({
                                text: `Bạn đã xóa ${name} thành công!.`,
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok!",
                                customClass: {confirmButton: "btn fw-bold btn-primary"}
                            }).then((function () {
                                window.location.reload();
                            }))
                        }
                    }
                });

                xhr.open("DELETE", `/teacher/deleteQuestion/${quizID}`);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(data);
            }else{
                if("cancel" === e.dismiss){
                    Swal.fire({
                        text: `Bạn đã hủy xóa câu hỏi`,
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok!",
                        customClass: {confirmButton: "btn fw-bold btn-primary"}
                    })
                }
            }
        }))


    }
})
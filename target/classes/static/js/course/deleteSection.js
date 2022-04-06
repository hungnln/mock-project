"use strict";
var KTDeleteSection = function () {
    var t, e;
    return {
        init: function () {
            document.querySelectorAll('[data-kt-section="delete_section"]').forEach(e => {
                e.addEventListener("click", (function (e) {
                    e.preventDefault();
                    console.log(this);
                    var text = this.innerHTML;
                    var id = this.getAttribute('data');
                    Swal.fire({
                        text: `Bạn có muốn ${text} ?`,
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
                            var data = "";
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                                if(this.readyState === 4) {
                                    if(this.status === 200){
                                        Swal.fire({
                                            text: `Bạn đã ${text}!.`,
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
                            xhr.open("DELETE", `/teacher/section/${id}`);
                            xhr.send(data);
                        }else{
                            if("cancel" === e.dismiss){
                                Swal.fire({
                                    text: `Bạn đã hủy xóa chủ đề`,
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok!",
                                    customClass: {confirmButton: "btn fw-bold btn-primary"}
                                })
                            }
                        }
                    }))
                }))
            })

        }
    }
}();
KTDeleteSection.init();
//
// KTUtil.onDOMContentLoaded((function () {
//     KTDeleteSection.init()
// }));
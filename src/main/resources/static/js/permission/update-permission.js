"use strict";

var updateButtonDOM = document.getElementsByClassName('btn-update');
for(let btnUpdate of updateButtonDOM){
    btnUpdate.onclick = function (){
        let userChoice = this.getAttribute('data');
        let roleChoice = this.getAttribute('data-role');
        document.getElementById('roleUpdate').value = userChoice;
        document.querySelector(`[value=${roleChoice}]`).checked = true;
    }
}




var KTUsersUpdatePermission = function () {
    const t = document.getElementById("kt_modal_update_permission"),
        e = t.querySelector("#kt_modal_update_permission_form"), n = new bootstrap.Modal(t);
    console.log(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {user_role: {validators: {notEmpty: {message: "Vui lòng chọn một vai trò"}}}},
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });

                t.querySelector('[data-kt-permissions-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Bạn có chắc chắn muốn thoát?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Chắc chắn, tắt !",
                        cancelButtonText: "Không, trở lại",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                })), t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Bạn có chắc chắn muốn hủy bỏ?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Có, hủy bỏ!",
                        cancelButtonText: "Không, trở lại",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                }));
                const i = t.querySelector('[data-kt-permissions-modal-action="submit"]');
                i.addEventListener("click", (function (t) {
                    t.preventDefault(), o && o.validate().then((function (t) {
                        if('Valid' === t){
                            i.setAttribute('data-kt-indicator', 'on');
                            i.disabled = !0;
                            setTimeout(function () {
                                var radioNode =  document.getElementsByName("user_role");
                                var roleU, username = document.getElementById('roleUpdate').value;
                                for (const radioNodeElement of radioNode) {
                                    if(radioNodeElement.checked){
                                        roleU = radioNodeElement.value;
                                        break;
                                    }
                                }

                                var data = JSON.stringify({
                                    "username": username,
                                    "role": {
                                        "roleName": roleU
                                    }
                                });

                                var xhr = new XMLHttpRequest();
                                xhr.withCredentials = true;
                                xhr.addEventListener("readystatechange", function() {
                                    if(this.readyState === 4) {
                                        i.removeAttribute('data-kt-indicator');
                                        i.disabled = !1;
                                        let statusCode = this.status;
                                        if(statusCode === 200){
                                            Swal.fire({
                                                text: `Vai trò đã được cập nhật!`,
                                                icon: 'success',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok!',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            }).then(function () {
                                               window.location.reload();
                                            })
                                        }else{
                                            Swal.fire({
                                                text: `Xin lỗi, ${this.responseText}, vui lòng thử lại.`,
                                                icon: 'error',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok!',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            })
                                        }
                                    }
                                });
                                xhr.open("PUT", "/admin/permission");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(data);
                            }, 700);

                        }else{
                            Swal.fire({
                                text: 'Xin lỗi, bạn phải nhập hết thông tin, vui lòng thử lại.',
                                icon: 'error',
                                buttonsStyling: !1,
                                confirmButtonText: 'Ok!',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                }
                            })
                        }

                        // console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () {
                        //     i.removeAttribute("data-kt-indicator"), i.disabled = !1, Swal.fire({
                        //         text: "Vai trò đã được cập nhật!",
                        //         icon: "success",
                        //         buttonsStyling: !1,
                        //         confirmButtonText: "Ok, got it!",
                        //         customClass: {confirmButton: "btn btn-primary"}
                        //     }).then((function (t) {
                        //         t.isConfirmed && n.hide()
                        //     }))
                        // }), 2e3)) : Swal.fire({
                        //     text: "Xin lỗi, hình như bạn chưa nhập hết thông tin, vui lòng thử lại.",
                        //     icon: "error",
                        //     buttonsStyling: !1,
                        //     confirmButtonText: "Ok!",
                        //     customClass: {confirmButton: "btn btn-primary"}
                        // })




                    }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersUpdatePermission.init()
}));
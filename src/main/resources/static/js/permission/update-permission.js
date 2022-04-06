"use strict";
let username;
var updateButtonDOM = document.getElementsByClassName('btn-update');
for(let btnUpdate of updateButtonDOM){
    btnUpdate.onclick = function (){
        let userChoice = this.getAttribute('data');
        let roleChoice = this.getAttribute('data-role');
        document.getElementById('roleUpdate').value = userChoice;
        document.querySelector(`[value=${roleChoice}]`).checked = true;
    }
}


function getUsername(data) {
    console.log(data,'this')
    username = data.getAttribute('data');
}

var KTUsersUpdatePermission = function () {
    const t = document.getElementById("kt_modal_update_permission"),
        e = t.querySelector("#kt_modal_update_permission_form"), n = new bootstrap.Modal(t);
    console.log(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {user_role: {validators: {notEmpty: {message: "Choose role"}}}},
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
                        title:'Message',
                        text: "Want to quit ?",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Quit",
                        cancelButtonText: "Cancel",
                        customClass: {confirmButton: "btn btn-primary btn-shadow", cancelButton: "btn btn-danger btn-shadow"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                })), t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        title:'Message',
                        text: "Want to cancel ?",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Cancel",
                        cancelButtonText: "Get back",
                        customClass: {confirmButton: "btn btn-primary btn-shadow", cancelButton: "btn btn-danger btn-shadow"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && t.dismiss
                        // ({
                        //     text: "Your form has not been cancelled!.",
                        //     icon: "error",
                        //     buttonsStyling: !1,
                        //     confirmButtonText: "Ok, got it!",
                        //     customClass: {confirmButton: "btn btn-primary"}
                        // })
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
                                var roleU = document.getElementById('roleUpdate').value;
                               // var username = document.getElementById('btn-role').getAttribute('data');


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
                                console.log(username,roleU)

                                var xhr = new XMLHttpRequest();
                                xhr.withCredentials = true;
                                xhr.addEventListener("readystatechange", function() {
                                    if(this.readyState === 4) {
                                        i.removeAttribute('data-kt-indicator');
                                        i.disabled = !1;
                                        let statusCode = this.status;
                                        if(statusCode === 200){
                                            Swal.fire({
                                                title:'Message',
                                                text: `Role change successfuly`,
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary btn-shadow'
                                                }
                                            }).then(function () {
                                               window.location.reload();
                                            })
                                        }else{
                                            Swal.fire({
                                                title:'Message',
                                                text: `Something went wrong. Please try again`,
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Try again',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary btn-shadow'
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
                                title:'Message',
                                text: `Something went wrong. Please try again`,
                                buttonsStyling: !1,
                                confirmButtonText: 'Try again',
                                customClass: {
                                    confirmButton: 'btn btn-primary btn-shadow'
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
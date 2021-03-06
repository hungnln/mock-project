"use strict";

var updateButtonDOM = document.getElementsByClassName('btn-update');
for (let btnUpdate of updateButtonDOM) {
    btnUpdate.onclick = function () {
        document.getElementById('categoryUpdate').value = this.getAttribute('data');
        document.getElementsByName('update_category_name')[0].value = this.getAttribute('category-name');
        document.getElementsByName('update_description')[0].value = this.getAttribute('category-description');
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
                    fields: {update_category_name: {validators: {notEmpty: {message: "Please fill course name"}}}},
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
                        text: "Want to exit ?",
                        // icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Quit",
                        cancelButtonText: "Get Back",
                        customClass: {confirmButton: "btn btn-danger", cancelButton: "btn btn-primary"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                }))
                //     t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => {
                //     t.preventDefault(), Swal.fire({
                //         text: "B???n c?? ch???c ch???n mu???n h???y b????",
                //         icon: "warning",
                //         showCancelButton: !0,
                //         buttonsStyling: !1,
                //         confirmButtonText: "C??, h???y b???!",
                //         cancelButtonText: "Kh??ng, tr??? l???i",
                //         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                //     }).then((function (t) {
                //         t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                //             text: "Your form has not been cancelled!.",
                //             icon: "error",
                //             buttonsStyling: !1,
                //             confirmButtonText: "Ok, got it!",
                //             customClass: {confirmButton: "btn btn-primary"}
                //         })
                //     }))
                // }));
                const i = t.querySelector('[data-kt-permissions-modal-action="submit"]');
                i.addEventListener("click", (function (t) {
                    t.preventDefault(), o && o.validate().then((function (t) {
                        if ('Valid' === t) {
                            i.setAttribute('data-kt-indicator', 'on');
                            i.disabled = !0;
                            setTimeout(function () {
                                var id = document.getElementById('categoryUpdate').value;
                                var name = document.getElementsByName('update_category_name')[0].value;
                                var description = document.getElementsByName('update_description')[0].value;

                                var data = JSON.stringify({
                                    "categoryId": id,
                                    "categoryName": name,
                                    "categoryDescription": description
                                });

                                var xhr = new XMLHttpRequest();
                                xhr.withCredentials = true;
                                xhr.addEventListener("readystatechange", function () {
                                    if (this.readyState === 4) {
                                        i.removeAttribute('data-kt-indicator');
                                        i.disabled = !1;
                                        let statusCode = this.status;
                                        if (statusCode === 200) {
                                            Swal.fire({
                                                title:'Message',
                                                text: `Course update successfully`,
                                                icon: 'success',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'OK',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            }).then(function () {
                                                window.location.reload();
                                            })
                                        } else {
                                            Swal.fire({
                                                title:'Message',
                                                text: `Something went wrong. Please try again`,
                                                icon: 'error',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Try again',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            })
                                        }
                                    }
                                });
                                xhr.open("PUT", "/admin/courseCategory");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(data);
                            }, 700);

                        } else {
                            Swal.fire({
                                title: 'Message',
                                text: 'Something went wrong. Please try again',
                                icon: 'error',
                                buttonsStyling: !1,
                                confirmButtonText: 'Try again',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                }
                            })
                        }

                        // console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () {
                        //     i.removeAttribute("data-kt-indicator"), i.disabled = !1, Swal.fire({
                        //         text: "Vai tr?? ???? ???????c c???p nh???t!",
                        //         icon: "success",
                        //         buttonsStyling: !1,
                        //         confirmButtonText: "Ok, got it!",
                        //         customClass: {confirmButton: "btn btn-primary"}
                        //     }).then((function (t) {
                        //         t.isConfirmed && n.hide()
                        //     }))
                        // }), 2e3)) : Swal.fire({
                        //     text: "Xin l???i, h??nh nh?? b???n ch??a nh???p h???t th??ng tin, vui l??ng th??? l???i.",
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
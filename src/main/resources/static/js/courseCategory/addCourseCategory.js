"use strict";
var KTUsersAddPermission = function () {
    const t = document.getElementById("kt_modal_add_permission"), e = t.querySelector("#kt_modal_add_permission_form"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {course_category_name: {validators: {notEmpty: {message: "Tên danh mục không được để trống"}}}},

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
                        text: "Bạn có muốn tắt cửa sổ này?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Có, đóng cửa sổ này!",
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
                        confirmButtonText: "Chắc chắn, hủy bỏ!",
                        cancelButtonText: "Không, trở lại",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Bạn đã hủy thêm danh mục!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok!",
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
                                var courseCategoryName = document.querySelector('[name=course_category_name]').value;
                                var description = document.querySelector('[name=course_category_description]').value;
                                var data = JSON.stringify({
                                    "categoryName": courseCategoryName,
                                    "categoryDescription": description
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
                                                text: `Chúc mừng, ${this.responseText}.`,
                                                icon: 'success',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok!',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            }).then(function (t) {
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
                                xhr.open("POST", "/admin/courseCategory");
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
                        //         text: "Form has been successfully submitted!",
                        //         icon: "success",
                        //         buttonsStyling: !1,
                        //         confirmButtonText: "Ok, got it!",
                        //         customClass: {confirmButton: "btn btn-primary"}
                        //     }).then((function (t) {
                        //         t.isConfirmed && n.hide()
                        //     }))
                        // }), 2e3)) : Swal.fire({
                        //     text: "Xin lỗi, looks like there are some errors detected, please try again.",
                        //     icon: "error",
                        //     buttonsStyling: !1,
                        //     confirmButtonText: "Ok, got it!",
                        //     customClass: {confirmButton: "btn btn-primary"}
                        // })


                    }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersAddPermission.init()
}));
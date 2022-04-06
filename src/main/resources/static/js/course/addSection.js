"use strict";
var KTUsersAddSection = function () {
    const t = document.getElementById("kt_modal_add_section"), e = t.querySelector("#kt_modal_add_section_form"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {number_section: {validators: {notEmpty: {message: "Số lượng không được để trống và phải là số"}}}},

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
                                var courseID = document.getElementById('courseID').value;
                                var numberOfSection = document.querySelector('[name=number_section]').value;
                                var param = `?courseID=${courseID}&num=${numberOfSection}`;


                                var data ='';
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
                                xhr.open("POST", "/teacher/section" + param);
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
                    }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersAddSection.init()
}));
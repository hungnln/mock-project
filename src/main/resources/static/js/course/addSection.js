"use strict";
var KTUsersAddSection = function () {
    const t = document.getElementById("kt_modal_add_section"), e = t.querySelector("#kt_modal_add_section_form"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {number_section: {validators: {notEmpty: {message: "Please fill a valid number"}}}},

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
                        text: "Want to quit ?",
                        title:'Message',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Quit",
                        cancelButtonText: "Get Back",
                        customClass: {confirmButton: "btn btn-danger", cancelButton: "btn btn-primary"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                })), t.querySelector('[data-kt-permissions-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Want to quit ?",
                        title:'Message',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Quit",
                        cancelButtonText: "Get Back",
                        customClass: {confirmButton: "btn btn-danger", cancelButton: "btn btn-primary"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss &&  t.dismiss
                        //     Swal.fire({
                        //     text: "Bạn đã hủy thêm danh mục!.",
                        //     icon: "error",
                        //     buttonsStyling: !1,
                        //     confirmButtonText: "Ok!",
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
                                                text: `Add new topic successfully`,
                                                title:'Message',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            }).then(function (t) {
                                                window.location.reload();
                                            })
                                        }else{
                                            Swal.fire({
                                                text: `Something went wrong. Please try again !`,
                                                title:'Message',

                                                buttonsStyling: !1,
                                                confirmButtonText: 'Try again',
                                                customClass: {
                                                    confirmButton: 'btn btn-danger'
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
                                text: `Something went wrong. Please try again !`,
                                title:'Message',

                                buttonsStyling: !1,
                                confirmButtonText: 'Try again',
                                customClass: {
                                    confirmButton: 'btn btn-danger'
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
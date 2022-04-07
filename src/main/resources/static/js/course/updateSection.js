var allHeader = document.querySelectorAll('.card-header.border-0.pt-5');
for(let header of allHeader){
    var btn = header.querySelector('.btn.btn-sm');
    btn.onclick = function(){
        var sectionId = this.getAttribute('data');
        var name =  this.getAttribute('data-name');
        var summary =  this.getAttribute('data-summary');
        document.getElementById('idSection').value = sectionId;
        document.getElementById('nameSection').value = name;
        document.querySelector('[name=update_section_name]').value = name;
        document.querySelector('[name=update_description]').value = summary;
    }
}

document.querySelector('[name=customName]').onclick = function(){
    var check = document.querySelector('[name=customName]').checked;
    var input = document.querySelector('[name=update_section_name]');
    var name = document.getElementById('nameSection').value;
    if(check){
        input.disabled = false;
        input.classList.remove('bg-dark');
        input.value='';
    }else{
        input.disabled = true;
        input.classList.add('bg-dark');
        input.value = name;
    }
}


"use strict";

var KTUsersUpdatePermission = function () {
    const t = document.getElementById("kt_modal_update_section"),
        e = t.querySelector("#kt_modal_update_section_form"), n = new bootstrap.Modal(t);
    console.log(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {update_section_name: {validators: {notEmpty: {message: "Please fill topic name"}}}},
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
                        text: "Want to quit?",
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
                        text: "Want to quit?",
                        title:'Message',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Quit",
                        cancelButtonText: "Get Back",
                        customClass: {confirmButton: "btn btn-danger", cancelButton: "btn btn-primary"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && t.dismiss
                        //     Swal.fire({
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
                        if ('Valid' === t) {
                            i.setAttribute('data-kt-indicator', 'on');
                            i.disabled = !0;
                            setTimeout(function () {
                                var id = document.getElementById('idSection').value;
                                var name = document.querySelector('[name=update_section_name]').value;
                                var summary = document.querySelector('[name=update_description]').value;

                                var data = JSON.stringify({
                                    "courseSectionId": id,
                                    "courseSectionName": name,
                                    "courseSummary": summary
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
                                                text: `Topic update successfully`,
                                                title:'Message',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Ok',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            }).then(function () {
                                                window.location.reload();
                                            })
                                        } else {
                                            Swal.fire({
                                                text: `Something went wrong. Please try again`,
                                                title:'Message',
                                                buttonsStyling: !1,
                                                confirmButtonText: 'Try again',
                                                customClass: {
                                                    confirmButton: 'btn btn-primary'
                                                }
                                            })
                                        }
                                    }
                                });
                                xhr.open("PUT", "/teacher/section");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(data);
                            }, 700);

                        } else {
                            Swal.fire({
                                text: `Something went wrong. Please try again`,
                                title:'Message',
                                buttonsStyling: !1,
                                confirmButtonText: 'Try again',
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
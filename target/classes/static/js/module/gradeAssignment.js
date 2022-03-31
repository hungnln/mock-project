console.log("Grade Assignment");


"use strict";
var KTSubmitAss = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    grade: {validators: {notEmpty: {message: "Vui lòng nhập số điểm cho Assignment"},
                            numeric:{message: "Vui lòng nhập điểm bằng số"},
                        callback: {
                        callback: function () {
                            let gradeN = document.querySelector('[name=grade]').value;
                            let gradeNum = parseFloat(gradeN);
                            if(gradeNum >= 0) {
                                return {valid: true}
                            }
                            else {
                                return {valid: false, message: 'Số điểm phải lớn hơn hoặc bằng 0'}
                            }
                        }
                        }}},
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }
            i = document.querySelector("#kt_grade_form"), e = FormValidation.formValidation(i, valObj)


            t = document.getElementById("kt_grade_assignment")
            t.addEventListener("click", (function (i) {
                i.preventDefault();
                e && e.validate().then((function (e) {
                    if ('Valid' === e) {
                        t.setAttribute('data-kt-indicator', 'on');
                        t.disabled = !0;
                        setTimeout(function () {
                            let grade = document.querySelector('[name=grade]').value;
                            let username = document.querySelector('[name=username]').value;
                            let assignmentID = document.querySelector('[name=assignmentID]').value;
                            let assS = document.querySelector('[name=assS]') != null ? document.querySelector('[name=assS]').value : null;


                            var data = JSON.stringify(grade);

                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function () {
                                if (this.readyState === 4) {
                                    t.removeAttribute('data-kt-indicator');
                                    t.disabled = !1;
                                    let statusCode = this.status;
                                    if (statusCode === 200) {
                                        Swal.fire({
                                            text: `${this.responseText}!`,
                                            icon: "success",
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok!",
                                            customClass: {confirmButton: "btn btn-primary"}
                                        }).then((function (t) {
                                            // window.location.href = `/teacher/viewSubmission?id=${assignmentID}`;
                                        }))
                                    } else {
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
                            xhr.open("POST", `/teacher/grade?id=${assS}`);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.send(data);
                        }, 700);



                    }else{
                        Swal.fire({
                            text: `Xin lỗi, vui lòng nhập điểm chính xác!.`,
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
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTSubmitAss.init()
}));
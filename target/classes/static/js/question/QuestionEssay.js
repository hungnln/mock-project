console.log('Question Essay');

"use strict";
var KTEssayQuestion = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    name: {validators: {notEmpty: {message: "Vui lòng nhập tên câu hỏi"}}},
                    questionText: {validators: {notEmpty: {message: "Vui lòng nhập nôi dung câu hỏi"}}},
                    defaultMark: {validators: {notEmpty: {message: "Vui lòng nhập số điểm của câu hỏi"},
                            integer: {message: "Số điểm của câu hỏi phải là số nguyên"},
                            callback:{
                                callback : function () {
                                    let val = document.querySelector('[name=defaultMark]').value;
                                    if(val > 0){
                                        return {
                                            valid: true
                                        }
                                    }else return {valid : false , message: 'Điểm phải lớn hơn 0'}
                                }
                            }}}
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "hl-error",
                        eleValidClass: ""
                    })
                }
            }

            i = document.querySelector("#kt_add_question"), t = document.getElementById("kt_question_submit_button"), e = FormValidation.formValidation(i, valObj),
                t.addEventListener("click", (function (i) {
                    i.preventDefault(), e && e.validate().then((function (e) {
                        if ('Valid' === e) {
                            t.setAttribute('data-kt-indicator', 'on');
                            t.disabled = !0;
                            setTimeout(function () {
                                let moduleID = document.getElementById('moduleID').value;
                                let quizID = document.getElementById('quizID').value;
                                let questionID = document.querySelector('[name=questionID]') != null ? document.querySelector('[name=questionID]').value : null;
                                let questionName = document.querySelector('[name=name]').value;
                                let questionText = document.querySelector('[name=questionText]').value;
                                let defaultMark = document.querySelector('[name=defaultMark]').value;
                                let questionType = document.querySelector('[name=qType]').value;

                                let required = document.querySelector('[name=require]').value;
                                let inputSize = document.querySelector('[name=input_size]').value;
                                var objDT = {
                                    "question": {
                                        "questionId": questionID,
                                        "questionName": questionName,
                                        "questionText": questionText,
                                        "defaultMark": defaultMark,
                                        "questionType": questionType,
                                        "timeCreated": new Date(),
                                        "timeModified": new Date()
                                    },
                                    "questionEssay": {
                                        "required": required === '1',
                                        "inputBoxSize": inputSize,
                                        "minimumWordLimit": 0,
                                        "maximumWordLimit": 5000,
                                        "shortAnswer": false,
                                    }
                                };
                                if(questionID == null)  delete objDT.question.questionId;
                                var data = JSON.stringify(objDT);

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
                                                window.location.href = `/teacher/viewModule?id=${moduleID}`;
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
                                xhr.open("POST", `/teacher/addQuestion/${quizID}`);
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(data);
                            }, 700);

                        } else {
                            Swal.fire({
                                text: "Xin lỗi, bạn chưa nhập đầy đủ thông tin, vui lòng thử lại.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok!",
                                customClass: {confirmButton: "btn btn-primary"}
                            }).then((function (t) {
                                KTUtil.scrollTop()
                            }))
                        }


                    }))
                }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTEssayQuestion.init()
}));
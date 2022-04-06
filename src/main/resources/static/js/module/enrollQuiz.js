console.log("Enroll Quiz");

'use strict';
var KTEnrollQ = function () {
    var e, t, i;
    return {
        init: function () {
            e = document.querySelector('#kt_enroll_form'),
                t = document.querySelector('#kt_sign_in_submit'),
                i = FormValidation.formValidation(e, {
                    fields: {
                        'password': {
                            validators: {
                                notEmpty: {
                                    message: 'Bạn phải nhập mật khẩu'
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: '.fv-row',
                            eleInvalidClass: '',
                            eleValidClass: ''
                        })
                    }
                }),
                t.addEventListener('click', (function (n) {
                    n.preventDefault(),
                        i.validate().then((function (i) {
                                if ('Valid' == i) {
                                    t.setAttribute('data-kt-indicator', 'on');
                                    t.disabled = !0;
                                    setTimeout(function () {
                                        let username =document.querySelector('[name=username]').value;
                                        let courseID = document.querySelector('[name=courseID]').value;
                                        let password = document.querySelector('[name=password]') != null ? document.querySelector('[name=password]').value : null;
                                        let dtObj = {
                                            "quizId": courseID,
                                            "password": password
                                        }
                                        if(password == null)
                                            delete dtObj.password;
                                        var data = JSON.stringify(dtObj);
                                        var request = new XMLHttpRequest();
                                        request.withCredentials = true;
                                        request.addEventListener("readystatechange", function() {
                                            if(this.readyState === 4) {
                                                var url = this.responseText;
                                                t.removeAttribute('data-kt-indicator');
                                                t.disabled = !1;
                                                if(this.status === 200){
                                                    Swal.fire({
                                                        text: `Chúc bạn làm bài tốt!`,
                                                        icon: 'success',
                                                        buttonsStyling: !1,
                                                        confirmButtonText: 'Ok!',
                                                        customClass: {
                                                            confirmButton: 'btn btn-primary'
                                                        }
                                                    }).then(function () {
                                                        window.location.href = url;
                                                    })
                                                }else{
                                                    Swal.fire({
                                                        text: `Xin lỗi, ${this.responseText}!.`,
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
                                        request.open("POST", "/student/takeQuiz");
                                        request.setRequestHeader("Content-Type", "application/json");
                                        request.send(data);
                                    },700);
                                } else {
                                    Swal.fire({
                                        text: 'Xin lỗi, bạn phải nhập mật khẩu, vui lòng thử lại.',
                                        icon: 'error',
                                        buttonsStyling: !1,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary'
                                        }
                                    })
                                }
                            }
                        ))
                }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTEnrollQ.init()
}));

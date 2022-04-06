console.log('Enroll Course');

'use strict';
var KTEnrollC = function () {
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
                                            "user": {
                                                "username": username
                                            },
                                            "course": {
                                                "courseId": courseID,
                                                "password": password
                                            }
                                        }
                                        if(password == null)
                                            delete dtObj.course.password;
                                        var data = JSON.stringify(dtObj);
                                        var request = new XMLHttpRequest();
                                        request.withCredentials = true;
                                        request.addEventListener("readystatechange", function() {
                                            if(this.readyState === 4) {
                                                var url = new URL(this.responseURL);
                                                t.removeAttribute('data-kt-indicator');
                                                t.disabled = !1;
                                                if(this.status === 200){
                                                    Swal.fire({
                                                        text: 'Đăng ký khóa học thành công!',
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
                                                        text: `Xin lỗi,${this.responseText} , vui lòng thử lại.`,
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
                                        request.open("POST", "/student/enroll");
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
    KTEnrollC.init()
}));

'use strict';
var KTSigninGeneral = function () {
    var e, t, i;
    return {
        init: function () {
            e = document.querySelector('#kt_sign_in_form'),
                t = document.querySelector('#kt_sign_in_submit'),
                i = FormValidation.formValidation(e, {
                    fields: {
                        username: {
                            validators: {
                                notEmpty: {
                                    message: 'Bạn phải nhập tên đăng nhập'
                                }
                                //   emailAddress: {
                                //     message: 'The value is not a valid email address'
                                //   }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Bạn phải nhập mật khẩu'
                                }
                                // ,
                                // callback: {
                                //     message: 'Please enter valid password',
                                //     callback: function (e) {
                                //         if (e.value.length > 0) return _validatePassword()
                                //     }
                                // }
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
                                        let username = e.querySelector('[name="username"]').value;
                                        let password = e.querySelector('[name="password"]').value;
                                        var data = new FormData();
                                        data.append("username", username);
                                        data.append("password", password);
                                        var request = new XMLHttpRequest();
                                        request.withCredentials = true;
                                        request.addEventListener("readystatechange", function() {
                                            if(this.readyState === 4) {
                                                var url = new URL(this.responseURL);
                                                t.removeAttribute('data-kt-indicator');
                                                t.disabled = !1;
                                                if(url.href.indexOf('ogin') != -1){
                                                    Swal.fire({
                                                        text: 'Xin lỗi, tên tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.',
                                                        icon: 'error',
                                                        buttonsStyling: !1,
                                                        confirmButtonText: 'Ok!',
                                                        customClass: {
                                                            confirmButton: 'btn btn-primary'
                                                        }
                                                    })
                                                }else{
                                                    Swal.fire({
                                                        text: 'Đăng nhập thành công. . .',
                                                        icon: 'success',
                                                        buttonsStyling: !1,
                                                        confirmButtonText: 'Ok!',
                                                        customClass: {
                                                            confirmButton: 'btn btn-primary'
                                                        }
                                                    }).then(function () {
                                                        window.location.replace(url.href);
                                                    })
                                                }
                                            }
                                        });
                                        request.open("post", "/loginUrl");
                                        request.send(data);
                                    },700);
                                } else {
                                    Swal.fire({
                                        text: 'Xin lỗi, hình như có một vài lỗi, vui lòng thử lại.',
                                        icon: 'error',
                                        buttonsStyling: !1,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary'
                                        }
                                    })
                                }

                                // 'Valid' == i ? (t.setAttribute('data-kt-indicator', 'on'), t.disabled = !0, setTimeout((function () {
                                //     t.removeAttribute('data-kt-indicator'),
                                //         t.disabled = !1,
                                //         let username = e.querySelector('[name="username"]').value,
                                //         var password = e.querySelector('[name="password"]').value,
                                //         var csrf = e.querySelector('[name="_csrf"]').value,
                                //         var data = JSON.stringify({
                                //             "username": username,
                                //             "password": password,
                                //             "_csrf": csrf
                                //         }),
                                //         console.log(data);
                                //         Swal.fire({
                                //             text: 'Bạn đã đăng nhập thành công!',
                                //             icon: 'success',
                                //             buttonsStyling: !1,
                                //             confirmButtonText: 'Ok, got it!',
                                //             customClass: {
                                //                 confirmButton: 'btn btn-primary'
                                //             }
                                //         }).then((function (t) {
                                //             t.isConfirmed && (e.querySelector('[name="username"]').value = '', e.querySelector('[name="password"]').value = '')
                                //         }))
                                // }), 2000)) : Swal.fire({
                                //     text: 'Xin lỗi, hình như có một vài lỗi, vui lòng thử lại.',
                                //     icon: 'error',
                                //     buttonsStyling: !1,
                                //     confirmButtonText: 'Ok, got it!',
                                //     customClass: {
                                //         confirmButton: 'btn btn-primary'
                                //     }
                                // })
                            }
                        ))
                }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTSigninGeneral.init()
}));

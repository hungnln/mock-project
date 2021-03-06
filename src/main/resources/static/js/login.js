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
                                    message: 'Please enter username'
                                }
                                //   emailAddress: {
                                //     message: 'The value is not a valid email address'
                                //   }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'Please enter password'
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
                                                        title: 'Message',
                                                        text: 'Username or Password is wrong !',
                                                        buttonsStyling: !1,
                                                        confirmButtonText: 'Try again!',
                                                        customClass: {
                                                            confirmButton: 'btn btn-primary btn-shadow'
                                                        }
                                                    })

                                                }else{
                                                    // Swal.fire({
                                                    //     text: '',
                                                    //     buttonsStyling: !1,
                                                    //     confirmButtonText: 'Ok!',
                                                    //     customClass: {
                                                    //         confirmButton: 'btn btn-primary'
                                                    //     }
                                                    // }).then(function () {
                                                        window.location.replace(url.href);
                                                    // })
                                                }
                                            }
                                        });
                                        request.open("post", "/loginUrl");
                                        request.send(data);
                                    },700);
                                } else {
                                    Swal.fire({
                                        title: 'Message',
                                        text: 'Username or Password is wrong !',
                                        buttonsStyling: !1,
                                        confirmButtonText: 'Try again!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary btn-shadow'
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
                                //             text: 'B???n ???? ????ng nh???p th??nh c??ng!',
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
                                //     text: 'Xin l???i, h??nh nh?? c?? m???t v??i l???i, vui l??ng th??? l???i.',
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

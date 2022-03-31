'use strict';
var KTSignupGeneral = function () {
  var e,  t,  a,  s,  r = function () {
    return 100 === s.getScore()
  };
  return {
    init: function () {
      e = document.querySelector('#kt_sign_up_form'),
      t = document.querySelector('#kt_sign_up_submit'),
      s = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')),
      a = FormValidation.formValidation(e, {
        fields: {
          'last-name': {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập Họ'
              }
            }
          },
          'first-name': {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập Tên'
              }
            }
          },
          username: {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập tên đăng nhập'
              }
            //   emailAddress: {
            //     message: 'The value is not a valid email address'
            //   }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập mật khẩu'
              }
              // ,
              // callback: {
              //   message: 'Vui lòng nhập mật khẩu hợp lệ',
              //   callback: function (e) {
              //     if (e.value.length > 0) return r()
              //   }
              // }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Vui lòng nhập lại mật khẩu'
              },
              identical: {
                compare: function () {
                  return e.querySelector('[name="password"]').value
                },
                message: 'Mật khẩu và xác nhận không khớp'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger({
            event: {
              password: !1
            }
          }),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }),
      t.addEventListener('click', (function (r) {
        r.preventDefault(),
        a.revalidateField('password'),
        a.validate().then((function (a) {
          if('Valid' === a){
            t.setAttribute('data-kt-indicator', 'on');
            t.disabled = !0;
            setTimeout(function () {
              let lastName = e.querySelector('[name="last-name"]').value;
              let firstName = e.querySelector('[name="first-name"]').value;
              let username = e.querySelector('[name="username"]').value;
              let password = e.querySelector('[name="password"]').value;
              var data = JSON.stringify({
                "lastName": lastName,
                "firstName": firstName,
                "username": username,
                "password": password
              });
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                  t.removeAttribute('data-kt-indicator');
                  t.disabled = !1;
                  let statusCode = this.status;
                  if(statusCode === 200){
                    Swal.fire({
                      text: `Chúc mừng, ${this.responseText}, vui lòng đăng nhập.`,
                      icon: 'success',
                      buttonsStyling: !1,
                      confirmButtonText: 'Ok!',
                      customClass: {
                        confirmButton: 'btn btn-primary'
                      }
                    }).then(function () {
                      window.location.replace("/login");
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
              xhr.open("POST", "/register");
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send(data);
            }, 700);
            console.log('ok');
          }else{
            Swal.fire({
                text: 'Xin lỗi, bạn phải nhập hết thông tin, vui lòng thử lại.',
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Ok, got it!',
                customClass: {
                  confirmButton: 'btn btn-primary'
                }
              })
          }
        }))
      })),
      e.querySelector('input[name="password"]').addEventListener('input', (function () {
        this.value.length > 0 && a.updateFieldStatus('password', 'NotValidated')
      }))
    }
  }
}();
KTUtil.onDOMContentLoaded((function () {
  KTSignupGeneral.init()
}));

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
                message: 'Please enter Last Name'
              }
            }
          },
          'first-name': {
            validators: {
              notEmpty: {
                message: 'Please enter Last Name'
              }
            }
          },
          username: {
            validators: {
              notEmpty: {
                message: 'Please enter User Name'
              }
            //   emailAddress: {
            //     message: 'The value is not a valid email address'
            //   }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Please enter Password'
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
                message: 'Please enter Password'
              },
              identical: {
                compare: function () {
                  return e.querySelector('[name="password"]').value
                },
                message: "Password don't match"
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
                      title:'Message',
                      text: `Account successfully created. Please login`,
                      buttonsStyling: !1,
                      confirmButtonText: 'Ok',
                      customClass: {
                        confirmButton: 'btn btn-primary btn-shadow'
                      }
                    }).then(function () {
                      window.location.replace("/login");
                    })
                  }else{
                    Swal.fire({
                      title:'Message',
                      text: `Can't create account. Please try again`,
                      buttonsStyling: !1,
                      confirmButtonText: 'Try again',
                      customClass: {
                        confirmButton: 'btn btn-primary btn-shadow'
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
              title:'Message',
              text: 'Please fill all information',
                buttonsStyling: !1,
                confirmButtonText: 'Try again',
                customClass: {
                  confirmButton: 'btn btn-primary btn-shadow'
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

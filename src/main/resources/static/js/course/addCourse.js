document.getElementById('allowenddate').onclick = function () {
    var check = document.getElementById('allowenddate').checked;
    if (check) {
        document.getElementsByName('end_date')[0].disabled = !check;
        document.getElementsByName('end_date')[0].style.backgroundColor = '#f5f8fa'
    } else {
        document.getElementsByName('end_date')[0].disabled = !check;
        document.getElementsByName('end_date')[0].style.backgroundColor = '#3a3b3c'
    }
}

document.querySelector('.btn-visible').onclick = function() {
    var domPass = document.querySelector('[name=password]');
    if (domPass.type === 'password') {
        domPass.type = 'text';
        document.querySelector('.bi.bi-eye-slash').classList.add('d-none');
        document.querySelector('.bi.bi-eye').classList.remove('d-none');
    } else {
        domPass.type = 'password';
        document.querySelector('.bi.bi-eye-slash').classList.remove('d-none');
        document.querySelector('.bi.bi-eye').classList.add('d-none');
    }
}

"use strict";
var KTCareersApply = function () {
    var t, e, i;
    return {
        init: function () {
            var valObj = {
                fields: {
                    short_name: {validators: {notEmpty: {message: "Vui lòng nhập tên viết tắt"}}},
                    full_name: {validators: {notEmpty: {message: "Vui lòng nhập tên đầy đủ"}}},
                    salary: {validators: {notEmpty: {message: "Expected salary is required"}}},
                    category: {validators: {notEmpty: {message: "Bạn phải chọn danh mục khóa học"}}},
                    start_date: {validators: {notEmpty: {message: "Ngày bắt đầu là bắt buộc"}}},
                    end_date: {validators: {
                        notEmpty: {message: "Ngày kết thúc là bắt buộc"
                        },
                            identical: {
                                compare: function () {
                                    // return e.querySelector('[name="start_date"]').value
                                    var startDate = new Date(document.querySelector('[name=start_date]').value);
                                    var endDate = new Date(document.querySelector('[name=end_date]').value);
                                    if(endDate.getTime() - startDate.getTime()  >= 0)
                                        return document.querySelector('[name=end_date]').value;
                                    return -1;
                                },
                                message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                            }}}
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            start_date: !1
                        }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }

            i = document.querySelector("#kt_careers_form"), t = document.getElementById("kt_careers_submit_button"), e = FormValidation.formValidation(i, valObj),
                $(i.querySelector('#allowenddate')).on("click", (function () {
                    console.log('click');
                    if (document.getElementById('allowenddate').checked) {
                        e.addField("end_date", {validators: {notEmpty: {message: "Ngày kết thúc là bắt buộc"}
                        , identical: {
                                    compare: function () {
                                        // return e.querySelector('[name="start_date"]').value
                                        var startDate = new Date(document.querySelector('[name=start_date]').value);
                                        var endDate = new Date(document.querySelector('[name=end_date]').value);
                                        if(endDate.getTime() - startDate.getTime()  >= 0)
                                            return document.querySelector('[name=end_date]').value;
                                        return -1;
                                    },
                                    message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                                }}});
                    } else {
                        e.removeField('end_date');
                    }
                }))
                if(!document.getElementById('allowenddate').checked){
                    e.removeField('end_date');
                }
                 t.addEventListener("click", (function (i) {
                i.preventDefault(), e && e.validate().then((function (e) {

                    if ('Valid' === e) {
                        t.setAttribute('data-kt-indicator', 'on');
                        t.disabled = !0;
                        setTimeout(function () {
                            var courseId = document.getElementById('courseID').value;
                            var courseCategoryId = document.forms[0][0].value;
                            var short_name = document.forms[0][2].value;
                            var full_name = document.forms[0][3].value;
                            var allowVisible = document.forms[0][4].checked;
                            var start_date = document.forms[0][5].value == '' ? null : document.forms[0][5].value;
                            var end_date = document.forms[0][7].checked ? (document.forms[0][6].value == '' ? null : document.forms[0][6].value) : null;
                            var password = document.forms[0][8].value == '' ? null : document.forms[0][8].value;
                            var description = document.forms[0][9].value;
                            var username = document.getElementById('userLogin').value;
                            var img = document.querySelector('.image-input-wrapper').style.backgroundImage.search('blank') == -1 ? document.querySelector('.image-input-wrapper').style.backgroundImage : null;
                            console.log(end_date);
                            var objDT = {
                                "courseCategory": {
                                    "categoryId": courseCategoryId
                                },
                                "user": {
                                    "username": username
                                },
                                "shortName": short_name,
                                "fullName": full_name,
                                "startDate": new Date(start_date),

                                "password": password,
                                "description": description,
                                "image": img,
                                "active": true,
                                "visible": allowVisible
                            };
                            if(courseId != 0){
                                objDT['courseId'] = courseId;
                            }
                            if(end_date != null){
                                objDT['endDate'] = new Date(end_date);
                            }
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
                                            document.forms[0][2].value = document.forms[0][3].value = '';
                                                document.forms[0][8].value = document.forms[0][5].value = '';
                                            document.forms[0][9].value = document.querySelector('[name=end_date]').value = '';
                                            document.querySelector('span.btn.btn-icon.btn-circle.btn-active-color-primary.w-25px.h-25px.bg-white.shadow').click();
                                            window.location.replace('/teacher/course');
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
                            xhr.open("POST", "/teacher/addCourse");
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
    KTCareersApply.init()
}));
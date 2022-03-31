console.log("Add Quiz");
// on_off date
document.getElementById('allowstartdate').onclick = function () {
    var check = document.getElementById('allowstartdate').checked;
    if (check) {
        document.getElementsByName('start_date')[0].disabled = !check;
        document.getElementsByName('start_date')[0].style.backgroundColor = '#f5f8fa'
    } else {
        document.getElementsByName('start_date')[0].disabled = !check;
        document.getElementsByName('start_date')[0].style.backgroundColor = '#3a3b3c'
    }
}
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
document.getElementById('allowtimelimit').onclick = function () {
    var check = document.getElementById('allowtimelimit').checked;
    if (check) {
        document.getElementsByName('time_limit')[0].disabled = !check;
        document.getElementsByName('time_limit')[0].style.backgroundColor = '#f5f8fa'
    } else {
        document.getElementsByName('time_limit')[0].disabled = !check;
        document.getElementsByName('time_limit')[0].style.backgroundColor = '#3a3b3c'
    }
}
// hidden show pasword
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
function toDate(value) {
    if(value.length === 0) return null;
    let dateTime = value.split(' ');
    let dateObj = new Date();
    let date = dateTime[0].split('-');
    let time = dateTime[1].split(':');
    dateObj.setDate(date[0]);
    dateObj.setMonth(date[1]);
    dateObj.setFullYear(date[2]);
    dateObj.setHours(time[0]);
    dateObj.setMinutes(time[1]);
    return dateObj;
}
function toTime(value){
    if(value.length === 0) return null;
    let dateObj = new Date();
    let time = value.split(':');
    dateObj.setHours(time[0]);
    dateObj.setMinutes(time[1]);
    return dateObj;
}
"use strict";
var KTCareersApply = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    name: {validators: {notEmpty: {message: "Vui lòng nhập tên Quiz"}}},
                    "typeSubmit[]": {validators: {notEmpty: {message: "Vui lòng chọn một loại nộp bài"}}},
                    maxGrade: {
                        validators: {
                            notEmpty: {message: "Bạn phải nhập điểm cao nhất"}
                            , numeric: {message: "Vui lòng nhập số"}
                        }
                    },
                    start_date: {validators: {notEmpty: {message: "Vui lòng chọn thời gian bắt đầu"}}},
                    end_date: {
                        validators: {
                            notEmpty: {
                                message: "Vui lòng chọn thời gian kết thúc"
                            },
                            identical: {
                                compare: function () {
                                    var startDate = toDate(document.querySelector('[name=start_date]').value);
                                    var endDate =toDate(document.querySelector('[name=end_date]').value);
                                    if (endDate.getTime() - startDate.getTime() >= 0)
                                        return document.querySelector('[name=end_date]').value;
                                    return -1;
                                },
                                message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                            }
                        }
                    },
                    time_limit:{validators: {notEmpty: {message: "Vui lòng chọn thời gian giới hạn"}}}
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

            i = document.querySelector("#kt_careers_form"), t = document.getElementById("kt_module_submit_button"), e = FormValidation.formValidation(i, valObj),
                $(i.querySelector('#allowstartdate')).on("click", (function () {
                    console.log('click');
                    if (document.getElementById('allowstartdate').checked) {
                        e.addField("start_date", {validators: {notEmpty: {message: "Ngày bắt đầu là bắt buộc"}}});
                    } else {
                        e.removeField('start_date');
                    }
                })),
                $(i.querySelector('#allowenddate')).on("click", (function () {
                    console.log('click');
                    if (document.getElementById('allowenddate').checked) {
                        e.addField("end_date", {
                            validators: {
                                notEmpty: {message: "Ngày kết thúc là bắt buộc"}
                                , identical: {
                                    compare: function () {
                                        var startDate = toDate(document.querySelector('[name=start_date]').value);
                                        var endDate =toDate(document.querySelector('[name=end_date]').value);
                                        if (endDate.getTime() - startDate.getTime() >= 0)
                                            return document.querySelector('[name=end_date]').value;
                                        return -1;
                                    },
                                    message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu'
                                }
                            }
                        });
                    } else {
                        e.removeField('end_date');
                    }
                })),
                $(i.querySelector('#allowtimelimit')).on("click", (function () {
                    console.log('click');
                    if (document.getElementById('allowtimelimit').checked) {
                        e.addField("time_limit", {validators: {notEmpty: {message: "Vui lòng chọn thời gian giới hạn"}}});
                    } else {
                        e.removeField('time_limit');
                    }
                })),
                document.getElementsByName('start_date')[0].onchange = function () {
                    e.revalidateField('start_date');
                    e.revalidateField('end_date');
                }
            document.getElementsByName('end_date')[0].onchange = function () {
                e.revalidateField('start_date');
                e.revalidateField('end_date');
            }
            if (!document.getElementById('allowstartdate').checked) {
                e.removeField('start_date');
            }
            if (!document.getElementById('allowenddate').checked) {
                e.removeField('end_date');
            }
            if (!document.getElementById('allowtimelimit').checked) {
                e.removeField('time_limit');
            }
                 t.addEventListener("click", (function (i) {
                i.preventDefault(), e && e.validate().then((function (e) {
                    if ('Valid' === e) {
                        t.setAttribute('data-kt-indicator', 'on');
                        t.disabled = !0;
                        setTimeout(function () {
                            var moduleID = document.getElementById("courseModuleID") ? document.getElementById("courseModuleID").value : null;
                            let courseID = document.getElementById('courseID').value;
                            let sectionID = document.getElementById('sectionID').value;
                            let name = document.querySelector('[name=name]').value;
                            let description = document.querySelector('[name=description]').value;
                            let showDescription = document.getElementById('showDes').checked;

                            let startDate = toDate(document.querySelector('[name=start_date]').value);
                            let endDate = toDate(document.querySelector('[name=end_date]').value);
                            let timeLimit = toTime(document.querySelector('[name=time_limit]').value);
                            let typeName = document.getElementById('typeName').value;

                            let password = document.querySelector('[name=password]').value;
                            let gradeToPass = document.querySelector('[name=gradeToPass]').value;
                            let attempt = document.querySelector('[name=num_attempt]').value;
                            let shuffle = document.getElementById('shuffleQuestions').checked;
                            let review = document.getElementById('review').checked;
                            var objDT = {
                                "courseModules": {
                                    "courseModuleId": moduleID,
                                    "name": name,
                                    "description": description,
                                    "typeName": typeName,
                                    "visible": true,
                                    "showDescription": showDescription,
                                    "courseSections": {
                                        "courseSectionId": sectionID
                                    }
                                },
                                "quiz": {
                                    "timeOpen": startDate,
                                    "timeClose": endDate,
                                    "timeLimit": timeLimit,
                                    "gradeToPass": gradeToPass,
                                    "attempt": attempt,
                                    "review": review,
                                    "shuffleQuestions": shuffle,
                                    "password": password
                                }
                            };
                            if(!document.getElementById('allowstartdate').checked){
                                delete objDT.quiz.timeOpen;
                            }
                            if(!document.getElementById('allowenddate').checked){
                                delete  objDT.quiz.timeClose;
                            }
                            if(!document.getElementById('allowtimelimit').checked){
                                delete  objDT.quiz.timeLimit;
                            }
                            if(moduleID == null)  delete objDT.courseModules.courseModuleId;
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
                                            window.location.href = `/teacher/viewCourse?id=${courseID}`;
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
                            xhr.open("POST", "/teacher/addModule");
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


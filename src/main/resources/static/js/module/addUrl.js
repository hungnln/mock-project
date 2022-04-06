console.log("Add URL");

"use strict";
var KTCareersApply = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    name: {validators: {notEmpty: {message: "Vui lòng nhập tên Liên kết"}}},
                    "link": {validators: {notEmpty: {message: "Vui lòng nhập một liên kết"}}}
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
                                let typeName = document.getElementById('typeName').value;

                               let url = document.querySelector('[name=link]').value;
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
                                    "url": {
                                        "link": url
                                    }
                                };
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


console.log("Add File");
"use strict";
var KTCareersApply = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    name: {validators: {notEmpty: {message: "Please choose file"}}},
                    "filesUp": {validators: {notEmpty: {message: "Please choose file"}}}
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
                // upload
                document.querySelector('[type=file]').addEventListener('change', function () {
                    var reader = new FileReader();

                    const getSizeImage = this.files[0].size;
                    if(getSizeImage > 2*1024 * 1024) {
                        Swal.fire({
                            text: `File size less than 2MB.`,
                            title :'Message',
                            buttonsStyling: !1,
                            confirmButtonText: 'Try again',
                            customClass: {
                                confirmButton: 'btn btn-danger'
                            }
                        })
                    } else
                        reader.readAsArrayBuffer(this.files[0]);

                    var fileDT = [];
                    reader.onload = function () {
                        var arrayBuffer = this.result,
                            array = new Uint8Array(arrayBuffer);
                        for (let i = 0; i < array.length; i++) {
                            fileDT.push(array[i]);
                        }
                        file = fileDT;
                        console.log(file);
                        t.removeAttribute('data-kt-indicator');
                        t.disabled = !1;
                    }
                    reader.onprogress = function () {
                        console.log("load")
                        t.setAttribute('data-kt-indicator', 'on');
                        t.disabled = !0;
                    }
                })
                , t.addEventListener("click", (function (i) {
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

                            let fileName = document.getElementById('fileUp').files.length != 0 ? document.getElementById('fileUp').files[0].name : '';
                            let typeName = document.getElementById('typeName').value;


                            var objDT = {
                                "courseModules": {
                                    "courseModuleId": moduleID,
                                    "name": name,
                                    "description": description,
                                    "typeName": typeName,
                                    "showDescription": showDescription,
                                    "visible": true,
                                    "courseSections": {
                                        "courseSectionId": sectionID
                                    }
                                },
                                "fileModule": {
                                    "fileData": file,
                                    "fileName": fileName
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
                                            text: `Upload new file successfully`,
                                          title: 'Message',
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok",
                                            customClass: {confirmButton: "btn btn-primary"}
                                        }).then((function (t) {
                                            window.location.href = `/teacher/viewCourse?id=${courseID}`;
                                        }))
                                    } else {
                                        Swal.fire({
                                            text: `Something went wrong. Please try again !`,
                                            title: 'Message',
                                            buttonsStyling: !1,
                                            confirmButtonText: 'Try again',
                                            customClass: {
                                                confirmButton: 'btn btn-danger'
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
                            text: `Something went wrong. Please try again !`,
                            title: 'Message',
                            buttonsStyling: !1,
                            confirmButtonText: 'Try again',
                            customClass: {
                                confirmButton: 'btn btn-danger'
                            }
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
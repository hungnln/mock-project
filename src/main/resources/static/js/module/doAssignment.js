console.log("Do Assignment");
//coundDown
var time = document.querySelector('[name=timeLeft]') != null ? document.querySelector('[name=timeLeft]').value : null;
if (time != null) {
    var countDownDate = new Date().getTime() + Number.parseInt(time);
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let dayStr = days === 0 ? '' : `${days} ngày`;
        let hoursStr = hours === 0 ? '' : `${hours} giờ`;
        let minutesStr = minutes === 0 ? '' : `${minutes} phút`;
        document.getElementById("timeLeft").innerHTML = `${dayStr} ${hoursStr} ${minutesStr} ${seconds} giây`;
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('cTimeLeft').classList.remove('btn-info');
            document.getElementById('cTimeLeft').classList.add('btn-danger');
            document.querySelector('.spinner-border.spinner-border-sm.align-middle.ms-2').style.display = 'none';
            document.getElementById("timeLeft").innerHTML = "Đã hết thời gian";
            document.getElementById('kt_submit_assignment').click();
        }
    }, 1000);
}

"use strict";
var KTSubmitAss = function () {
    var t, e, i, file;
    return {
        init: function () {
            t = document.getElementById("kt_submit_assignment")
            // upload
            document.querySelector('[type=file]').addEventListener('change', function () {
                var reader = new FileReader();

                const getSizeImage = this.files[0].size;
                if (getSizeImage > 2 * 1024 * 1024) {
                    Swal.fire({
                        text: `Chỉ cho phép tải tệp tin nhỏ hơn 2MB.`,
                        icon: 'error',
                        buttonsStyling: !1,
                        confirmButtonText: 'Ok!',
                        customClass: {
                            confirmButton: 'btn btn-primary'
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
            t.addEventListener("click", (function (i) {
                i.preventDefault();

                t.setAttribute('data-kt-indicator', 'on');
                t.disabled = !0;
                setTimeout(function () {
                    let username = document.querySelector('[name=username]').value;
                    let assignmentID = document.querySelector('[name=assignmentID]').value;
                    let assS = document.querySelector('[name=assS]') != null ? document.querySelector('[name=assS]').value : null;
                    let textSubmission = document.getElementById('textSubmission');
                    let fileSubmission = document.getElementById('fileSubmission');

                    let fileName = document.getElementById('fileUp').files.length != 0 ? document.getElementById('fileUp').files[0].name : '';

                    let text = document.querySelector('.ql-editor') != null ? document.querySelector('.ql-editor').innerHTML : null;

                    var objDT = {
                        "assignmentSubmissionId":assS,
                        "grade": false,
                        "fileName": fileName,
                        "fileData": file,
                        "text": text,
                        "gradeScore" : -1,
                        "assignment": {
                            "assignmentId": assignmentID
                        },
                        "user": {
                            "username": username
                        }
                    }
                    if(assS == null) delete objDT.assignmentSubmissionId;
                    if(textSubmission == null){
                        delete objDT.text;
                    }
                    if(fileSubmission == null){
                        delete objDT.fileName;
                        delete objDT.fileData;
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
                                    window.location.href = `/student/viewModule?id=${assignmentID}`;
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
                    xhr.open("POST", "/student/submission");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(data);
                }, 700);


            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTSubmitAss.init()
}));
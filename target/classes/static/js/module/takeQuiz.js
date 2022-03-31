console.log("Take Quiz");
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
var KTSubmitQuiz = function () {
    var t, e, i, file;
    return {
        init: function () {
            //Init Table
            (e = document.querySelector("#kt_permissions_table")) && (e.querySelectorAll("tbody tr").forEach((t => {
                const e = t.querySelectorAll("td"), n = moment(e[2].innerHTML, "DD MMM YYYY, LT").format();
                e[2].setAttribute("data-order", n)
            })), t = $(e).DataTable({
                info: !1,
                order: [],
                columnDefs: [{orderable: !1, targets: 1}, {orderable: !1, targets: 3}]
            }))


            //Init Submit Quiz
            t = document.getElementById("kt_submit_assignment")
            t.addEventListener("click", (function (i) {
                i.preventDefault();

                t.setAttribute('data-kt-indicator', 'on');
                t.disabled = !0;
                setTimeout(function () {
                    let attemptAns = [];
                    var quizAttemptsID = document.getElementById('quizAttempsID').value
                    var quizID = document.getElementById('quizID').value;
                    let question = document.getElementsByClassName('question');
                    for (let questionElement of question) {
                        var questionID = questionElement.querySelector('.qid').getAttribute('data');
                        var questionType = questionElement.querySelector(`#qid${questionID}`).getAttribute('data-type');
                        var ans;
                        switch (questionType){
                            case 'QuestionMultichoice':
                                ans = document.querySelectorAll(`input[name=qid${questionID}]:checked`);
                                for (const an of ans) {
                                    let ansValue = an.value;
                                    let attempObj = {
                                        "questionAnswers":{
                                            "questionAnswersId": ansValue
                                        },
                                        "question":{
                                            "questionId": questionID
                                        },
                                        "quizAttempts":{
                                            "quizAttemptId":quizAttemptsID
                                        }
                                    }
                                    attemptAns.push(attempObj);
                                }
                                break;
                            case 'QuestionTrueFalse' :
                                ans = document.querySelector(`input[name=qid${questionID}]:checked`) != null ? document.querySelector('input[name=qid2]:checked').value : null ;
                                let aObj = {
                                    "answerTF": ans === '1',
                                    "question":{
                                        "questionId": questionID
                                    },
                                    "quizAttempts":{
                                        "quizAttemptId":quizAttemptsID
                                    }
                                }
                                if(ans == null) delete aObj.answerTF;
                                attemptAns.push(aObj);
                                break;
                            case 'QuestionEssay' :
                                let essay = document.querySelector('[name=qid3]').value;
                                let eObj = {
                                    "answerEssay": essay,
                                    "question":{
                                        "questionId": questionID
                                    },
                                    "quizAttempts":{
                                        "quizAttemptId":quizAttemptsID
                                    }
                                }
                                    attemptAns.push(eObj);
                                break;
                        }

                    }
                    var objDT = attemptAns;
                    console.log(objDT);
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
                                    window.location.href = `/student/viewModule?id=${quizID}`;
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
                    xhr.open("POST", `/student/submitQuiz/${quizAttemptsID}`);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(data);
                }, 700);


            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTSubmitQuiz.init()
}));
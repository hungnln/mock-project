console.log("Multichoice Question");
//init number of choice
function initNumberC(){
    document.querySelector('[name=singleAnswer]').onchange = function(){
        var value = document.querySelector('[name=singleAnswer]').value;
        var typeInput = value == 1 ? 'radio' : 'checkbox';
        document.getElementsByName('c_ans[]').forEach(cb =>{
            cb.type = typeInput;
        })
    }
}
initNumberC();
function initClickCheck(e){
    document.getElementsByName('ans[]').forEach(ans=>{
        ans.onkeyup = function () {
            e.revalidateField('ans[]');
        }
    })
}
function blockClick(){
    var question = document.getElementsByName('ans[]');
    var check = document.getElementsByName('c_ans[]')
    for(let i = 0; i<question.length;i++){
        check[i].onclick = function (e){
            if(question[i].value == '') {
                e.preventDefault();
                Swal.fire({
                    text: "Xin lỗi, bạn phải nhập câu hỏi trước khi đánh dấu, vui lòng thử lại.",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok!",
                    customClass: {confirmButton: "btn btn-primary"}
                })
            }
        }
        question[i].onchange = function (){
            if(question[i].value == '') check[i].checked = false;
        }
    }
}
blockClick();
// init number add answer
var numOfAns = document.querySelector('[name=numOfQuestion]').value;
"use strict";
var KTMultichoiceQuestion = function () {
    var t, e, i, file;
    return {
        init: function () {
            var valObj = {
                fields: {
                    name: {validators: {notEmpty: {message: "Vui lòng nhập tên câu hỏi"}}},
                    questionText: {validators: {notEmpty: {message: "Vui lòng nhập nôi dung câu hỏi"}}},
                    defaultMark: {validators: {notEmpty: {message: "Vui lòng nhập số điểm của câu hỏi"},
                        integer: {message: "Số điểm của câu hỏi phải là số nguyên"},
                        callback:{
                        callback : function () {
                            let val = document.querySelector('[name=defaultMark]').value;
                            if(val > 0){
                                return {
                                    valid: true
                                }
                            }else return {valid : false , message: 'Điểm phải lớn hơn 0'}
                        }
                        }}},
                    "c_ans[]": {validators: {notEmpty: {message: "Vui lòng chọn tối thiểu một đáp án đúng"}}},
                    "ans[]": {validators: {
                        callback:{
                            callback: function (){
                             var num = 0;
                             document.getElementsByName('ans[]').forEach(ans=>{
                                 if(ans.value != '') num++;
                             })
                                if(num >= 2){
                                    return {
                                        valid :true
                                    }
                                }else{
                                    return {
                                        valid : false,
                                        message: "Bạn phải nhập tối thiểu 2 đáp án"
                                    }
                                }
                            }
                        }}}
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "hl-error",
                        eleValidClass: ""
                    })
                }
            }

            i = document.querySelector("#kt_add_question"), t = document.getElementById("kt_question_submit_button"), e = FormValidation.formValidation(i, valObj),
                initClickCheck(e),
                document.getElementById('btn-add-answer').onclick = function (event){
                    event.preventDefault();
                    var ans_container = document.querySelector('.wrapper-choice');
                    numOfAns++;
                    var ans = document.getElementsByClassName('ans')[0].cloneNode(true);
                    var title = ans.childNodes[1].childNodes[1].childNodes[3].childNodes[1];
                    title.innerHTML = `Lựa chọn ${numOfAns}`;
                    ans.childNodes[1].childNodes[1].childNodes[7].childNodes[1].value = '';
                    ans.childNodes[1].childNodes[3].childNodes[9].childNodes[1].value = '';
                    var check = ans.childNodes[3].childNodes[1].childNodes[1];
                    check.id = `c_ans${numOfAns}`;
                    var lable = ans.childNodes[3].childNodes[1].childNodes[3];
                    lable.setAttribute('for',`c_ans${numOfAns}`);
                    ans_container.appendChild(ans);
                    e.removeField('c_ans[]');
                    e.removeField('ans[]');
                    e.addField('c_ans[]',{validators: {notEmpty: {message: "Vui lòng chọn tối thiểu một đáp án đúng"}}});
                    e.addField('ans[]',{validators: {
                            callback:{
                                callback: function (){
                                    var num = 0;
                                    document.getElementsByName('ans[]').forEach(ans=>{
                                        if(ans.value != '') num++;
                                    })
                                    if(num >= 2){
                                        return {
                                            valid :true
                                        }
                                    }else{
                                        return {
                                            valid : false,
                                            message: "Bạn phải nhập tối thiểu 2 đáp án"
                                        }
                                    }
                                }
                            }}});
                initNumberC();
                initClickCheck(e);
                blockClick();
                }

            t.addEventListener("click", (function (i) {
                i.preventDefault(), e && e.validate().then((function (e) {
                    if ('Valid' === e) {
                        t.setAttribute('data-kt-indicator', 'on');
                        t.disabled = !0;
                        setTimeout(function () {
                            let moduleID = document.getElementById('moduleID').value;
                            let quizID = document.getElementById('quizID').value;
                            let questionID = document.querySelector('[name=questionID]') != null ? document.querySelector('[name=questionID]').value : null;
                            let questionName = document.querySelector('[name=name]').value;
                            let questionText = document.querySelector('[name=questionText]').value;
                            let defaultMark = document.querySelector('[name=defaultMark]').value;
                            let questionType = document.querySelector('[name=qType]').value;

                            let singleAns = document.querySelector('[name=singleAnswer]').value === '1';
                            let numOfChoice = document.querySelector('[name=numberTheChoice]').value === '1';
                            let ansID = document.getElementsByName('ansID[]');
                            let ansText = document.getElementsByName('ans[]');
                            let ansCheck = document.getElementsByName('c_ans[]');
                            let ansFeedback = document.getElementsByName('feedback[]');
                            let ansList = [];
                            for (let i = 0; i < ansText.length; i++) {
                                if (ansText[i].value.trim().length !== 0) {
                                    let ans = {
                                        "answer": ansText[i].value,
                                        "feedback": ansFeedback[i].value,
                                        "correct": ansCheck[i].checked
                                    }
                                    if(ansID.length !== 0)
                                        ans['questionAnswersId'] = ansID[i].value;
                                    ansList.push(ans);
                                }
                            }
                            var objDT = {
                                "question": {
                                    "questionId": questionID,
                                    "questionName": questionName,
                                    "questionText": questionText,
                                    "defaultMark": defaultMark,
                                    "questionType": questionType,
                                    "timeCreated": new Date(),
                                    "timeModified": new Date(),
                                    "answers": ansList
                                },
                                "questionMultichoice": {
                                    "singleAnswer": singleAns,
                                    "numberTheChoice": numOfChoice
                                }
                            };
                            if(questionID == null)  delete objDT.question.questionId;
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
                                            window.location.href = `/teacher/viewModule?id=${moduleID}`;
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
                            xhr.open("POST", `/teacher/addQuestion/${quizID}`);
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
    KTMultichoiceQuestion.init()
}));
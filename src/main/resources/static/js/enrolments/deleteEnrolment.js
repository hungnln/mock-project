'use strict';
var courseID = document.getElementById('courseID').value;
var KTUsersList = function () {
    var e, t, n, r, o = document.getElementById('kt_table_users'),
        c = () =>{
            const a = o.querySelectorAll('[type="checkbox"]');
            t = document.querySelector('[data-kt-user-table-toolbar="base"]'),
                n = document.querySelector('[data-kt-user-table-toolbar="selected"]'),
                r = document.querySelector('[data-kt-user-table-select="selected_count"]');
            const s = document.querySelector('[data-kt-user-table-select="delete_selected"]');
            a.forEach((e=>{
                e.addEventListener('click', (function () {
                    setTimeout((function () {
                        l()
                    }), 50)
                }))
            })),
                s.addEventListener('click', (function () {
                    Swal.fire({
                        text: 'Bạn chắc chắn xóa những thành viên đã chọn?',
                        icon: 'warning',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: 'Chắc chắn, xóa!',
                        cancelButtonText: 'Không, hủy bỏ',
                        customClass: {
                            confirmButton: 'btn fw-bold btn-danger',
                            cancelButton: 'btn fw-bold btn-active-light-primary'
                        }
                    }).then((function (t) {
                        if(t.value){
                            var listUsername = [];
                            a.forEach(t=>{
                                if(t.checked){
                                    listUsername.push(t.value);
                                }
                            })
                            var data = JSON.stringify(listUsername);
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                                if(this.readyState === 4) {
                                    console.log(this.responseText);
                                    if(this.status === 200){
                                        Swal.fire({
                                            text: 'Bạn đã xóa tất cả thành viên đã chọn!.',
                                            icon: 'success',
                                            buttonsStyling: !1,
                                            confirmButtonText: 'Ok!',
                                            customClass: {
                                                confirmButton: 'btn fw-bold btn-primary'
                                            }
                                        }).then((function () {
                                            // a.forEach((t=>{
                                            //     t.checked && e.row($(t.closest('tbody tr'))).remove().draw()
                                            // }));
                                            // o.querySelectorAll('[type="checkbox"]') [0].checked = !1
                                            window.location.reload();
                                        })).then((function () {
                                            l(),
                                                c()
                                        }))
                                    }
                                }
                            });
                            xhr.open("DELETE", `/teacher/member?id=${courseID}`);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.send(data);
                        } else{
                            if('cancel' === t.dismiss){
                                Swal.fire({
                                    text: 'Bạn đã hủy xóa thành viên đã chọn ra khỏi khóa học.',
                                    icon: 'error',
                                    buttonsStyling: !1,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn fw-bold btn-primary'
                                    }
                                })
                            }
                        }
                    }))
                }))
        };
    const l = () =>{
        const e = o.querySelectorAll('tbody [type="checkbox"]');
        let c = !1,
            l = 0;
        e.forEach((e=>{
            e.checked && (c = !0, l++)
        })),
            c ? (r.innerHTML = l, t.classList.add('d-none'), n.classList.remove('d-none')) : (t.classList.remove('d-none'), n.classList.add('d-none'))
    };
    return {
        init: function () {
            o && (o.querySelectorAll('tbody tr').forEach((e=>{
                const t = e.querySelectorAll('td'),
                    n = t[3].innerText.toLowerCase();
                let r = 0,
                    o = 'minutes';
                n.includes('yesterday') ? (r = 1, o = 'days') : n.includes('mins') ? (r = parseInt(n.replace(/\D/g, '')), o = 'minutes') : n.includes('hours') ? (r = parseInt(n.replace(/\D/g, '')), o = 'hours') : n.includes('days') ? (r = parseInt(n.replace(/\D/g, '')), o = 'days') : n.includes('weeks') && (r = parseInt(n.replace(/\D/g, '')), o = 'weeks');
                const c = moment().subtract(r, o).format();
                t[3].setAttribute('data-order', c);
                const l = moment(t[5].innerHTML, 'DD MMM YYYY, LT').format();
                t[5].setAttribute('data-order', l)
            })), e = $(o).DataTable({
                info: !1,
                order: [
                ],
                pageLength: 10,
                lengthChange: !1,
                columnDefs: [
                    {
                        orderable: !1,
                        targets: 0
                    },
                    {
                        orderable: !1,
                        targets: 6
                    }
                ]
            }), c(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener('keyup', (function (t) {
                e.search(t.target.value).draw()
            })), document.querySelector('[data-kt-user-table-filter="reset"]').addEventListener('click', (function () {
                document.querySelector('[data-kt-user-table-filter="form"]').querySelectorAll('select').forEach((e=>{
                    $(e).val('').trigger('change')
                })),
                    e.search('').draw()
            })), o.querySelectorAll('[data-kt-users-table-filter="delete_row"]').forEach((t=>{
                t.addEventListener('click', (function (t) {
                    t.preventDefault();
                    const n = t.target.closest('tr'),
                        r = n.querySelectorAll('td') [1].querySelectorAll('a') [1].innerText;
                    var username = n.querySelectorAll('td') [0].querySelector('[type=checkbox]').value;
                    console.log(username)
                    Swal.fire({
                        text: 'Bạn chắc chắn muốn xóa ' + r + '?',
                        icon: 'warning',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: 'Chắc chắn, xóa!',
                        cancelButtonText: 'Không, hủy bỏ',
                        customClass: {
                            confirmButton: 'btn fw-bold btn-danger',
                            cancelButton: 'btn fw-bold btn-active-light-primary'
                        }
                    }).then((function (t) {

                        if(t.value){
                            let listUsername = [];
                            listUsername.push(username);
                            let data = JSON.stringify(listUsername);
                            let xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                                if(this.readyState === 4) {
                                    console.log(this.responseText);
                                    if(this.status === 200){
                                        Swal.fire({
                                            text: 'Bạn đã xóa ' + r +' khỏi khóa học!.',
                                            icon: 'success',
                                            buttonsStyling: !1,
                                            confirmButtonText: 'Ok!',
                                            customClass: {
                                                confirmButton: 'btn fw-bold btn-primary'
                                            }
                                        }).then((function () {
                                            e.row($(n)).remove().draw()
                                        })).then((function () {
                                            l()
                                        }))
                                    }
                                }
                            });
                            xhr.open("DELETE", `/teacher/member?id=${courseID}`);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.send(data);
                        } else{
                            if('cancel' === t.dismiss){
                                Swal.fire({
                                    text: 'Bạn đã hủy xóa '+ r +'.',
                                    icon: 'error',
                                    buttonsStyling: !1,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn fw-bold btn-primary'
                                    }
                                })
                            }
                        }

                    }))
                }))
            })), (() =>{
                const t = document.querySelector('[data-kt-user-table-filter="form"]'),
                    n = t.querySelector('[data-kt-user-table-filter="filter"]'),
                    r = t.querySelectorAll('select');
                n.addEventListener('click', (function () {
                    var t = '';
                    r.forEach(((e, n) =>{
                        e.value && '' !== e.value && (0 !== n && (t += ' '), t += e.value)
                    })),
                        e.search(t).draw()
                }))
            }) ())
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersList.init()
}));

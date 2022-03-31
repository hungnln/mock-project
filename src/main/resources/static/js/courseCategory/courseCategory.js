"use strict";
var KTUsersPermissionsList = function () {
    var t, e;
    return {
        init: function () {
            (e = document.querySelector("#kt_permissions_table")) && (e.querySelectorAll("tbody tr").forEach((t => {
                const e = t.querySelectorAll("td"), n = moment(e[2].innerHTML, "DD MMM YYYY, LT").format();
                e[2].setAttribute("data-order", n)
            })), t = $(e).DataTable({
                info: !1,
                order: [],
                columnDefs: [{orderable: !1, targets: 1}, {orderable: !1, targets: 3}]
            }), document.querySelector('[data-kt-permissions-table-filter="search"]').addEventListener("keyup", (function (e) {
                t.search(e.target.value).draw()
            })), e.querySelectorAll('[data-kt-permissions-table-filter="delete_row"]').forEach((e => {
                e.addEventListener("click", (function (e) {
                    e.preventDefault();
                    const n = e.target.closest("tr"), o = n.querySelectorAll("td")[0].innerText;
                    var id = n.querySelector('.btn-update').getAttribute('data');
                    console.log(id);
                    Swal.fire({
                        text: "Bạn có muốn xóa danh mục " + o + "?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Có, xóa!",
                        cancelButtonText: "Không, hủy bỏ",
                        customClass: {
                            confirmButton: "btn fw-bold btn-danger",
                            cancelButton: "btn fw-bold btn-active-light-primary"
                        }
                    }).then((function (e) {
                        if(e.value){
                            var data = JSON.stringify({
                                "categoryId": id
                            });
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                                if(this.readyState === 4) {
                                   if(this.status === 200){
                                       Swal.fire({
                                           text: "Bạn đã xóa " + o + "!.",
                                           icon: "success",
                                           buttonsStyling: !1,
                                           confirmButtonText: "Ok!",
                                           customClass: {confirmButton: "btn fw-bold btn-primary"}
                                       }).then((function () {
                                           t.row($(n)).remove().draw()
                                       }))
                                   }
                                }
                            });
                            xhr.open("DELETE", "/admin/courseCategory");
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.send(data);
                        }else{
                            if("cancel" === e.dismiss){
                                Swal.fire({
                                    text: `Bạn đã hủy xóa ${o}`,
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok!",
                                    customClass: {confirmButton: "btn fw-bold btn-primary"}
                                })
                            }
                        }



                    }))
                }))
            })))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersPermissionsList.init()
}));
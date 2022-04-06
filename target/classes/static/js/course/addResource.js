document.querySelectorAll('[data-bs-target="#kt_modal_add_resource"]').forEach(t=>{
    t.onclick = function(e){
        var id = t.getAttribute('data');
        document.getElementById('courseSectionID').value = id;
        var modal = document.getElementById('kt_modal_add_resource');
        var link = modal.getElementsByTagName('a');
        link.forEach(l =>{
            l.onclick = function(e){
                e.preventDefault();
                var type = l.getAttribute('data-type');
                var url = `/teacher/addModule?type=${type}&id=${id}`;
                window.location.href = url;
            }
        })
    }
})
"use strict";
var KTUsersAddResource = function () {
    const t = document.getElementById("kt_modal_add_resource"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                t.querySelector('[data-kt-permissions-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Bạn có muốn tắt cửa sổ này?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Có, đóng cửa sổ này!",
                        cancelButtonText: "Không, trở lại",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersAddResource.init()
}));
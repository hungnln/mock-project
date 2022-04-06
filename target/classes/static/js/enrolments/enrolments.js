"use strict";
var KTModalUserSearch = function () {
    var e, t, n, s,table, dt ,a, r = function (e) {
        setTimeout((function () {
            var a = KTUtil.getRandomInt(1, 3);
            var searchValue = e.inputElement.value;
            dt.search(searchValue).draw();
            e.complete();
            // 3 === a ? (n.classList.add("d-none"), s.classList.remove("d-none")) : (n.classList.remove("d-none"), s.classList.add("d-none")), e.complete()
        }), 500)
    },
        o = function (e) {
            dt.search('').draw();
         // n.classList.add("d-none"), s.classList.add("d-none")
    };
    return {
        init: function () {
            (e = document.querySelector("#kt_modal_users_search_handler")) && (e.querySelector('[data-kt-search-element="wrapper"]'),
                n = e.querySelector('[data-kt-search-element="results"]'),
                s = e.querySelector('[data-kt-search-element="empty"]'),
                (a = new KTSearch(e)).on("kt.search.process", r),
                a.on("kt.search.clear", o))
            table = document.querySelector('#add_user');
            dt = $(table).DataTable({
                info: !1,
                order: [],
                columnDefs: [{orderable: !1, targets: 1}, {orderable: !1, targets: 3}]
            });
            // n.classList.add("d-none");
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTModalUserSearch.init()
}));
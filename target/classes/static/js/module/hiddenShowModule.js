document.getElementsByClassName('btn-hs').forEach((btn)=>{
    btn.onclick = function(){
        var id = this.getAttribute('data');

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if(this.status === 200){
                    Swal.fire({
                        text: `Bạn đã ${this.responseText}!.`,
                        icon: "success",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok!",
                        customClass: {confirmButton: "btn fw-bold btn-primary"}
                    }).then((function () {
                        window.location.reload();
                    }))
                }
            }
        });

        xhr.open("POST", `/teacher/hiddenShowModule/${id}`);
        xhr.send();
    }
})
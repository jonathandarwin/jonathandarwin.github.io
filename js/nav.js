document.addEventListener("DOMContentLoaded", function() {
    // Load Nav    
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);    
    loadNav()

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
     
                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan evenwt listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }


    // Load Content    
    var page = window.location.hash.substr(1);
    console.log(page);
    if (page == "") page = "home";        
    loadPage(page);    
    
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");

                if(page === `home`){
                    getTeamList();
                }
                else if(page === `saved`) {                    
                    getAllSavedTeam();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = `
                        <div class="row m-top-50">
                            <div class="col s12 center">
                                <img width="80" src="./images/notfound.png" />
                            </div>
                        </div>
                    `;
                } else {
                    content.innerHTML = `
                        <div class="row m-top-50">
                            <div class="col s12 center">
                                <img width="80" src="./images/noaccess.png" />
                            </div>
                        </div>
                    `;
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
})
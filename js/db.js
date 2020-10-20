let dbPromised = idb.open("football", 2, (upgradeDb) => {
  let teamObjectStore = upgradeDb.createObjectStore("team", { keyPath: "id", autoIncrement: false });
  teamObjectStore.createIndex("id", "id", { unique: false });
});

function saveTeam(team) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("team", "readwrite");
      let store = tx.objectStore("team");
      
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      alert("Team berhasil disimpan.");
    });
}

function getAllTeam() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("team");
        let store = tx.objectStore("team");
        
        return store.getAll();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
}

function getAllSavedTeam() {
  getAllTeam().then((list) => {
    let content = '';
    console.log(list);
    
    if(list != null && list.length > 0){
      list.forEach(e => {      
        content += `
                          <div class="row m-top-20 card-list">
                              <input value="${e.id}" hidden/>
                              <div class="col s2">
                                  <img width="100%" src="${e.crestUrl}" alt="Footbal Club Logo" />
                              </div>
                              <div class="col s10">
                                  <h5 class="no-margin bold">${e.name}</h5>                              
                                  <div class="m-top-10">
                                      <span><span class="bold">Address : </span>${e.address}</span>
                                  </div>
                                  <div class="m-top-10">
                                      <span><span class="bold">Website : </span><a href="${e.website}" target="_">${e.website}</a></span>
                                  </div>
                              </div>     
                          </div>
                      `;
          });
          document.querySelector("#body-content").innerHTML = content;
          document.querySelectorAll(".card-list").forEach((card) => {
            card.addEventListener("click", (e) => {
              const id = card.childNodes[1].value;
              window.location = `/team.html?id=${id}&saved=true`;
            });
          });      
    }
    else{
      document.querySelector("#body-content").innerHTML = `
        <div class="row m-top-20">
          <div class="col s12 center">
            <h4>No Team Saved</h4>
          </div>
        </div>
      `;
    }
  });  

}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getTeamById(idParam).then((article) => {
    articleHTML = "";
    var articleHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${article.cover}" />
        </div>
        <div class="card-content">
          <span class="card-title">${article.post_title}</span>
          ${snarkdown(article.post_content)}
        </div>
      </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

function getTeamById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.get(id);
      })
      .then((article) => {
        resolve(article);
      });
  });
}

function deleteTeam(id) {
  dbPromised.then((db) => {
      let tx = db.transaction("team", "readwrite");
      let store = tx.objectStore("team");

      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      alert("Team berhasil dibuang.");
    });
}

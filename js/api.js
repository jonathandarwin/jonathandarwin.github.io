const BASE_URL = "https://api.football-data.org";
const API_TEAM_LIST = "/v2/competitions/2001/teams";
const API_TEAM_DETAIL = "/v2/teams/";
const HEADERS = {
  headers: {
    "X-Auth-Token": "0d031af2ad7e444d87e6dbcbebca25af",
  },
};

function checkStatus(response) {
  if (response.status !== 200) {
    alert(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
}

function getJson(response) {
  return response.json();
}

function error(error) {
  console.log(`Error : ${error}`);
}

function getTeamList() {
  if ("caches" in window) {
    caches.match(`${BASE_URL}${API_TEAM_LIST}`).then((response) => {
      if (response) {
        response.json().then(function (data) {
          let content = ``;
          if (data.teams != null && data.teams.length > 0) {
            data.teams.forEach((e) => {
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
            document.querySelector("#team-list-container").innerHTML = content;
            document.querySelectorAll(".card-list").forEach((card) => {
              card.addEventListener("click", (e) => {
                const id = card.childNodes[1].value;
                window.location = `/team.html?id=${id}`;
              });
            });
          } else {
            // No Data
            document.querySelector("#team-list-container").innerHTML = `No Data`;
          }
        });
      }
    });
  }

  fetch(`${BASE_URL}${API_TEAM_LIST}`, HEADERS)
    .then(checkStatus)
    .then(getJson)
    .then(function (data) {
      let content = ``;
      if (data.teams != null && data.teams.length > 0) {
        data.teams.forEach((e) => {
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
        document.querySelector("#team-list-container").innerHTML = content;
        document.querySelectorAll(".card-list").forEach((card) => {
          card.addEventListener("click", (e) => {
            const id = card.childNodes[1].value;
            window.location = `/team.html?id=${id}`;
          });
        });
      } else {
        // No Data
        document.querySelector("#team-list-container").innerHTML = `No Data`;
      }
    })
    .catch(error);
}

function getTeamDetail(id, isSaved) {    
  return new Promise((resolve, reject) => {
    const SAVED = "saved";    
    let savedClass = "";
    let bookmark_logo = "../images/ic_bookmark.svg"
    if(isSaved) {
      savedClass = SAVED;
      bookmark_logo = '../images/ic_bookmark_filled.svg'
    }

    if ("caches" in window) {
      caches.match(`${BASE_URL}${API_TEAM_DETAIL}${id}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let content = ``;
            if (data != null) {
              content += `                    
                        <div class="row m-top-20">
                            <div class="col s12 center">
                            <img width="200" src="${data.crestUrl}" alt="Football Team Logo"/>
                            </div>
                        </div>
                    
                        <div class="row m-top-20">
                            <div class="col s12 center">
                                <h4 class="no-margin bold" style="display:inline-block;">${data.name}</h4>
                                <img id="bookmark" class="m-left-20 pointer ${savedClass}" src="${bookmark_logo}" width="30"/>
                            </div>
                        </div>
                    
                        <div class="row">
                            <div class="col s12 center">
                            <span class="text-grey">${data.shortName}</span>
                            </div>
                        </div>
                    
                        <hr />
                    
                        <div class="row">
                            <div class="col s12">
                            <table>
                                <tr>
                                <td>Address</td>
                                <td>${data.address}</td>
                                </tr>
                                <tr>
                                <td>Email</td>
                                <td>${data.email}</td>
                                </tr>
                                <tr>
                                <td>Website</td>
                                <td>${data.website}</td>
                                </tr>
                            </table>
                            </div>
                        </div>
                    
                        <div class="row">
                            <div class="col s12">
                            <h3>Active Competitions</h3>
                            </div>
                        </div>                                    
                    `;

              if (
                data.activeCompetitions != null &&
                data.activeCompetitions.length > 0
              ) {
                data.activeCompetitions.forEach((e) => {
                  content += `
                                <div class="row">
                                    <div class="col s6">
                                        <span>${e.name}</span>
                                    </div>
                                    <div class="col s6">
                                    <span>${convertDate(e.lastUpdated)}</span>
                                    </div>
                                </div>
                            `;
                });
              } else {
                content += `No Data`;
              }
              
              document.querySelector("#body-content").innerHTML = content;
              document.querySelector("#bookmark").addEventListener("click", (e) => {
                let saved = false;
                document.querySelector("#bookmark").classList.forEach((className) => {
                    if (className === SAVED) {
                      saved = true;
                    }
                  });

                if (saved) {
                  document.querySelector("#bookmark").src ="../images/ic_bookmark.svg";
                  document.querySelector("#bookmark").classList.remove(SAVED);
                  deleteTeam(data.id);
                } else {
                  document.querySelector("#bookmark").src = "../images/ic_bookmark_filled.svg";
                  document.querySelector("#bookmark").classList.add(SAVED);
                  saveTeam(data);
                }
              });
            } else {
              // No Data
              document.querySelector("#body-content").innerHTML = `No Data`;
            }
            resolve(data);
          });
        }
      });
    }

    fetch(`${BASE_URL}${API_TEAM_DETAIL}${id}`, HEADERS)
      .then(checkStatus)
      .then(getJson)
      .then((data) => {
        let content = ``;
        if (data != null) {
          content += `                    
                    <div class="row m-top-20">
                        <div class="col s12 center">
                        <img width="200" src="${data.crestUrl}" alt="Football Team Logo"/>
                        </div>
                    </div>
                
                    <div class="row m-top-20">
                        <div class="col s12 center">
                            <h4 class="no-margin bold" style="display:inline-block;">${data.name}</h4>
                            <img id="bookmark" class="m-left-20 pointer ${savedClass}" src="${bookmark_logo}" width="30"/>
                        </div>
                    </div>
                
                    <div class="row">
                        <div class="col s12 center">
                        <span class="text-grey">${data.shortName}</span>
                        </div>
                    </div>
                
                    <hr />
                
                    <div class="row">
                        <div class="col s12">
                        <table>
                            <tr>
                            <td>Address</td>
                            <td>${data.address}</td>
                            </tr>
                            <tr>
                            <td>Email</td>
                            <td>${data.email}</td>
                            </tr>
                            <tr>
                            <td>Website</td>
                            <td>${data.website}</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                
                    <div class="row">
                        <div class="col s12">
                        <h3>Active Competitions</h3>
                        </div>
                    </div>                                    
                `;

          if (
            data.activeCompetitions != null &&
            data.activeCompetitions.length > 0
          ) {
            data.activeCompetitions.forEach((e) => {
              content += `
                            <div class="row">
                                <div class="col s6">
                                    <span>${e.name}</span>
                                </div>
                                <div class="col s6">
                                <span>${convertDate(e.lastUpdated)}</span>
                                </div>
                            </div>
                        `;
            });
          } else {
            content += `No Data`;
          }
          
          document.querySelector("#body-content").innerHTML = content;
          document.querySelector("#bookmark").addEventListener("click", (e) => {
            let saved = false;
            document.querySelector("#bookmark").classList.forEach((className) => {
                if (className === SAVED) {
                  saved = true;
                }
              });

            if (saved) {
              document.querySelector("#bookmark").src ="../images/ic_bookmark.svg";
              document.querySelector("#bookmark").classList.remove(SAVED);
              deleteTeam(data.id);
            } else {
              document.querySelector("#bookmark").src = "../images/ic_bookmark_filled.svg";
              document.querySelector("#bookmark").classList.add(SAVED);
              saveTeam(data);
            }
          });
        } else {
          // No Data
          document.querySelector("#body-content").innerHTML = `No Data`;
        }
        resolve(data);
      })
      .catch(error);
  });
}

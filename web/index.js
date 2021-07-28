
function fetchData() {
    fetch('https://apfp-js-api.p0rtl.repl.co/ReqAll', { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
            let output = ""
            const datArray = Object.keys(data);
            datArray.forEach((datArray, index) => {
                output += "<div class='ResponseWrapper'>"
                output += `<p class="userId">${datArray}</p><button class='statusBar' id=${datArray}></button>`
                for (var property in data[datArray]) {
                    //console.log(datArray + property + data[datArray][property]);
                    output += `<img class="rqIMG" data-user-id="${datArray}" src='${data[datArray][property]}'></img>`
                }
                output += "</div>"
            });

            document.getElementById('myData').innerHTML = output;
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('myData').innerHTML = 'Error Loading Data'
        })
}

function getApproved() {
    appr = Array.from(document.getElementsByClassName('rqIMG'))
    appr.forEach((appr, index) => {
        src = appr.getAttribute("src")
        usrId = appr.getAttribute("data-user-id")
        statusBar = document.getElementById(usrId);
        switch (src) {
            case "0":
                getPreviousSiblings(appr, "0");
                statusBar.style.backgroundColor = "var(--pending)";
                break;
            case "1":
                getPreviousSiblings(appr, "1");
                statusBar.style.backgroundColor = "var(--accepted)";
                break;
            case "2":
                getPreviousSiblings(appr, "2");
                statusBar.style.backgroundColor = "var(--denied)";
                break;
        }
    });
};

function getPreviousSiblings(el, val) {
    var siblings = [];
    while (el = el.previousSibling) { siblings.push(el); }
    form = siblings[2];
    form.setAttribute("value", val);
}

document.addEventListener("DOMContentLoaded", function (event) {
    pageLoader();
});
function pageLoader() {
    setTimeout(showSite, 1500);
}
function showSite() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myData").style.display = "flex";
    getApproved();
}

window.onload = () => {
    const code = location.href.substring(location.href.indexOf("code")+5, location.href.length)

    if (location.href.indexOf("code") > -1) {
        const req = new XMLHttpRequest()
        req.open("POST", "https://APFP-JS-API.p0rtl.repl.co/Oauth2")
        req.send(code)
        req.onload = () => {
            
            console.log(req.response);
        }

    } else {
        console.log("no auth token")
    }
}

fetchData();

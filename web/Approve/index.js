
function fetchData() {
    fetch('https://apfp-js-api.p0rtl.repl.co/ReqAll')
        .then((res) => res.json())
        .then((data) => {
            let output = ""
            const datArray = Object.keys(data);
            datArray.forEach((datArray, index) => {
                output += "<div class='ResponseWrapper'>"
                output += `<p class="userId">${datArray}</p><button onclick="Approve(this)" class='statusBar' type='button' id=${datArray}></button>`
                output += `<input type="text" class="ApprForm" name="${datArray}" value="0">`
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
                appr = document.querySelector(`input[name='${usrId}']`);
                appr.setAttribute("value", "0");
                statusBar.style.backgroundColor = "var(--pending)";
                break;
            case "1":
                appr = document.querySelector(`input[name='${usrId}']`);
                appr.setAttribute("value", "1");
                statusBar.style.backgroundColor = "var(--accepted)";
                break;
            case "2":
                appr = document.querySelector(`input[name='${usrId}']`);
                appr.setAttribute("value", "2");
                statusBar.style.backgroundColor = "var(--denied)";
                break;
        }
    });
};

function Approve(elem) {
    //console.log(elem)
    var content = document.getElementById(elem.id);
    var contentCss = getComputedStyle(content);
    var contentFill = contentCss.backgroundColor;
    //console.log(contentFill);
    content.style.backgroundColor = "white";
    switch (contentFill) {
        case "rgb(233, 196, 106)":
            appr = document.querySelector(`input[name='${elem.id}']`);
            appr.setAttribute("value", "1");
            content.style.backgroundColor = "var(--accepted)";
            break;
        case "rgb(89, 128, 77)":
            appr = document.querySelector(`input[name='${elem.id}']`);
            appr.setAttribute("value", "2");
            content.style.backgroundColor = "var(--denied)";
            break;
        case "rgb(255, 51, 0)":
            appr = document.querySelector(`input[name='${elem.id}']`);
            appr.setAttribute("value", "0");
            content.style.backgroundColor = "var(--pending)";
            break;
        default:
            alert("Err: no status change match");
    }
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

fetchData();

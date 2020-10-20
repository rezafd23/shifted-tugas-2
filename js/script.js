var dataAll = [{
    name: "admin",
    email: "admin@admin.com",
    password: "admin",
    tglLahir: "21-10-2020",
    jenisKelamin: "L",
}]
var idnumber
var NameUser
var idUser
var dataAlbum = []
var newAlbum = []
var formLogin = document.getElementById("formLogin");
var formRegister = document.getElementById("formRegister");
var formBeranda = document.getElementById("formBeranda");
var formCall = document.getElementById("formCall");
var formAbout = document.getElementById("formAbout");
var navBar = document.getElementById("navBar");

var albumSearch=[]
hideComponent(formLogin)
hideComponent(formBeranda)
hideComponent(formCall)
hideComponent(formAbout)
hideComponent(navBar)

var getAll = function (attr) {
    return document.querySelectorAll(attr)
}
var get = function (attr) {
    return document.querySelector(attr)
}

function showAbout() {
    showComponent(formAbout)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formCall)
    hideComponent(formRegister)
}

function showCall() {
    showComponent(formCall)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formRegister)
}

function showBeranda() {
    showComponent(formBeranda)
    hideComponent(formLogin)
    showComponent(navBar)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
    showUserData()
}

var withoutLogin = async () => {
    showComponent(formBeranda)
    hideComponent(formLogin)
    showComponent(navBar)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
    idUser = ""
    showUserData()
}

function showLogin() {
    showComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
    hideComponent(navBar)
}

function showRegister() {
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    showComponent(formRegister)
    hideComponent(navBar)
}

function hideComponent(id) {
    id.hidden = true
}

function showComponent(id) {
    id.hidden = false
    // id.style.visibility='visible'
}

var saveDataUser = () => {
    let form = document.formRegister
    let nama = form.nameForm.value;
    let email = form.emailForm.value;
    let password = form.passwordForm.value;
    let tglLahir = form.birthdayForm.value;
    let jenisKelamin = form.gender.value;
    let idxUser = dataAll.length
    let saveData = false
    let id = form.id.value

    if (nama && email && password && tglLahir && jenisKelamin) {
        let used = false
        // Map
        // used=dataAll.map(obj=>{
        //     if (obj.email == email) return true
        //
        // })
        // find
        used = dataAll.find(obj => {
            if (obj.email == email) return true
        })

        if (id) used = false
        // for (i=0;i<dataAll.length;i++){
        //     let user = dataAll[i]
        //     if (email==user.email){
        //         used=true
        //         break
        //     }
        // }
        if (used) {
            alert("email telah digunakan")
            return
        }
        let registrasiData = {
            name: nama,
            email: email,
            password: password,
            tglLahir: tglLahir,
            jenisKelamin: jenisKelamin
        }
        if (id) {
            dataAll.splice(parseInt(id), 1, registrasiData)
        } else {
            dataAll.splice(idxUser, 1, registrasiData)
        }
        saveData = true
        form.reset()
    } else {
        alert("Mohon Lengkapi Data")
    }
    console.log(dataAll)

    return saveData;

}

function register() {
    if (saveDataUser()) {
        showComponent(formLogin)
        hideComponent(formRegister)
    }
}

function goRegister() {
    showComponent(formRegister)
    hideComponent(formLogin)
}

var doLogin = async () => {
    let form = document.formLogin
    email = form.emailForm.value
    password = form.passwordForm.value

    if (email && password) {
        let statusLogin = false
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => dataAll = json)
            .catch(err => console.warn("Error Fetching Data" + err))

        statusLogin = dataAll.find((data) => (data.username == email && password == '12345'))

        if (statusLogin) {
            idUser = statusLogin.id
            NameUser = statusLogin.name
            showComponent(formBeranda)
            showComponent(navBar)
            hideComponent(formLogin)
            showUserData()
            form.reset()
        } else {
            alert("Mohon Cek Email dan Password")
        }
    }
}

function saveEdit() {
    let nama = document.formEdit.nameForm.value;
    let email = document.formEdit.emailForm.value;
    let password = document.formEdit.passwordForm.value;
    let tglLahir = document.formEdit.birthdayForm.value;
    let jenisKelamin = document.formEdit.gender.value;
    let id = document.formEdit.id.value;
    id = parseInt(id)
    let dataArray = [nama, email, password, tglLahir, jenisKelamin]
    let i = dataAll.length
    // dataAll[i]=dataArray
    // console.log(dataAll)
    dataAll.splice(id, 1, dataArray);
    showData(dataAll)
    document.formEdit.reset()
}

var doSearch = () => {
    let tableData = document.getElementsByClassName("tableData")[0]
    let tr = tableData.children[0].children[0].outerHTML

    search = document.formSearch.search.value;
    if (idUser){
        dataAlbum.forEach((val, index) => {
            if (val.title.includes(search)) {
                tr += `
            <tr align="center"> 
                <td>${index + 1}</td>
                <td>${val.title}</td>
                <td>
                <button onclick="editData(${index})">Update</button>
                <button onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
        `
            }
        })
    } else {

        newAlbum.forEach((val,index)=>{
            if (val.album.includes(search)){
                let data={
                    name:val.name,
                    album:val.album,
                }
                albumSearch.splice(index,0,data)
            }
        })

        console.log("isi album search")
        console.log(albumSearch)

        var i=0
        var j=albumSearch.length
        var k

        (j<10)?k=j:k=10

        albumSearch.slice(i,k).forEach((val, index) => {
            if (val.album.includes(search)){
                tr += `
            <tr align="center">
                <td>${index + 1}</td>
                <td>${val.name}</td>
                <td>${val.album}</td>
                <td>
                <button onclick="editData(${index})">Update</button>
                <button onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
                `
            }

        })
        console.log("isi length")
        console.log(Math.ceil(j/10))
        for (i=1;i<=Math.ceil(j/10);i++){
            tr += `
                 <tr align="center">
                     <td colspan="4"><button onclick="getPage(${i})">${i}</button></td>
                 </tr>
                    `
        }
    }
    tableData.innerHTML = tr
}

var showUserData = async () => {
    console.log("isi ID USer " + idUser + "=====" + NameUser)
    let tableData = document.getElementsByClassName("tableData")[0]
    let page=get(".pageTable")
    let tr = tableData.children[0].children[0].outerHTML
    let th2 = get('.namealbum')
    // console.log("album")
    // console.log(th2)


    await fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => dataAlbum = json)
        .catch(err => console.warn("Error" + err))

    if (idUser) {
        let title = getAll(".title")[1]
        console.log(title)
        title.innerHTML = "Album " + NameUser
        dataAlbum.forEach((val, index) => {
            if (val.userId == idUser) {
                tr += `
            <tr align="center"> 
                <td>${index + 1}</td>
                <td>${val.title}</td>
                <td>
                <button onclick="editData(${index})">Update</button>
                <button onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
        `
            }
        })
    } else {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => dataAll = json)
            .catch(err => console.warn("Error Fetching Data" + err))
        // th2.style.display="block"
        // console.log("dataAll" + dataAll)

        var ind = 0
        for (i = 0; i < dataAll.length; i++) {
            for (j = 0; j < dataAlbum.length; j++) {
                if (dataAll[i].id == dataAlbum[j].userId) {
                    ind += 1
                    var newData = {
                        name: dataAll[i].name,
                        album: dataAlbum[j].title
                    }
                    newAlbum.splice(parseInt(ind), 1, newData)
                }
            }
        }
        newAlbum.splice(0,1)
        // console.log("isi new album")
        // console.log(newAlbum)
        // console.log("th" + th2)
        newAlbum.slice(0,10).forEach((val, index) => {
            tr += `
                        <tr align="center">
                            <td>${index + 1}</td>
                            <td>${val.name}</td>
                            <td>${val.album}</td>
                            <td>
                            <button onclick="editData(${index})">Update</button>
                            <button onclick="deleteData(${index})">Delete</button>
                            </td>
                        </tr>
                    `
        })

        console.log("isipage")
        console.log(page)
        // var docButton=document.createDocumentFragment()
        for (i=1;i<=parseInt(newAlbum.length/10);i++){
            tr += `
                        <tr align="right">
<!--                            <td></td>-->
<!--                            <td></td>-->
<!--                            <td></td>-->
                            <td colspan="4"><button onclick="getPage(${i})">${i}</button></td>
                        </tr>
                    `
            // var button = document.createElement('button');
            // button.setAttribute('text', i);
            // docButton.appendChild(button)
        }
        // page.appendChild(docButton)
    }
    tableData.innerHTML = tr

}
var getPage=i=>{
    let tableData = document.getElementsByClassName("tableData")[0]
    let page=get(".pageTable")
    let tr = tableData.children[0].children[0].outerHTML
    console.log("isi album")
    // console.log(tr)
    var j
    if (i>1){
        j=(i*10)-10
    } else {
        j=0
    }
    if (document.formSearch.search.value){
        console.log("isi===="+j+"==="+(i*10))
        console.log(albumSearch.slice(10,20))
              albumSearch.slice(j,(i*10)).forEach((val,index)=>{
                      tr += `
                        <tr align="center">
                            <td>${(i<=1)?index + 1:j+index+1}</td>
                            <td>${val.name}</td>
                            <td>${val.album}</td>
                            <td>
                            <button onclick="editData(${index})">Update</button>
                            <button onclick="deleteData(${index})">Delete</button>
                            </td>
                        </tr>
                    `
        })
        for (i=1;i<=Math.ceil(albumSearch.length/10);i++){
            tr += `
                 <tr align="center">
                     <td colspan="4"><button onclick="getPage(${i})">${i}</button></td>
                 </tr>
                    `
        }
        tableData.innerHTML = tr
    } else {
        newAlbum.slice(j,(i*10)).forEach((val, index) => {
            tr += `
                        <tr align="center">
                            <td>${(i<=1)?index + 1:j+index+1}</td>
                            <td>${val.name}</td>
                            <td>${val.album}</td>
                            <td>
                            <button onclick="editData(${index})">Update</button>
                            <button onclick="deleteData(${index})">Delete</button>
                            </td>
                        </tr>
                    `
        })
        for (i=1;i<=parseInt(newAlbum.length/10);i++){
            // var button = document.createElement('button');
            // button.innerHTML=i
            // button.className='btnPage'
            // button.style.marginRight='20px'
            // button.addEventListener("click",getPage(i))
            // button.onclick=getPage(i)
            // document.querySelector("div.pageTable").appendChild(button)
            tr += `
                        <tr align="center">
                            <td align="center" colspan="4"><button onclick="getPage(${i})">${i}</button></td>
                        </tr>
                    `
        }
    }
    tableData.innerHTML = tr
    console.log("cek Button")
    console.log(btnPage)
}
showUserData()

function showData(data) {

    let tableData = document.getElementsByClassName("tableData")[0]
    let tr = tableData.children[0].children[0].outerHTML
    for (i = 0; i < data.length; i++) {
        console.log("isi data " + data[i])
        tr += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i][0]}</td>
                <td>${data[i][1]}</td>
                <td>${data[i][2]}</td>
                <td>${data[i][3]}</td>
                <td>${data[i][4]}</td>
                <td>
                  <a onclick="editData(${i})" >update</a>
                  <a onclick="deleteData(${i})">hapus</a>
                </td>
            </tr>
        `
    }
    tableData.innerHTML = tr
}


var editData = idnumber => {
    showRegister()
    let form = document.formRegister
    form.nameForm.value = dataAll[idnumber].name
    form.emailForm.value = dataAll[idnumber].email
    form.passwordForm.value = dataAll[idnumber].password
    form.birthdayForm.value = dataAll[idnumber].tglLahir
    form.gender.value = dataAll[idnumber].jenisKelamin
    form.id.value = idnumber
}
var deleteData = id => {
    // dataAll=dataAll.slice(0);
    dataAll.splice(id - 1, 1);
    showData(dataAll)
}
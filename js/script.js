var userList = [{
    name: "admin",
    email: "admin@admin.com",
    password: "admin",
    tglLahir: "21-10-2020",
    jenisKelamin: "Laki-laki",
}]

var inputUser = []
var idnumber
var namaUser
var idUser

albumList = []

var getAll = function (attr){
    return document.querySelectorAll(attr)
}
var get = function (attr){
    return document.querySelector(attr)
}

function addInput() {
    let inputNama = document.formInput.name.value;
    let inputEmail = document.formInput.email.value;
    let inputPassword = document.formInput.password.value;
    let inputBirthdate = document.formInput.birthday.value;
    let inputGender = document.formInput.gender.value;
    let dataArray=[inputNama,inputEmail,inputPassword,inputBirthdate,inputGender];
    let i = inputUser.length
    inputUser[i]=dataArray
    console.log(inputUser);
    showInput(inputUser);
    document.formInput.reset();
    alert("Data telah tersimpan");
}

function showInput(datas) {
    let tableData = document.getElementsByClassName("tableData")[0]
    let tr = tableData.children[0].children[0].outerHTML
    for (i=0; i < datas.length; i++) {
        tr += `
            <tr>
                <td>${i + 1}</td>
                <td>${datas[i][0]}</td>
                <td>${datas[i][1]}</td>
                <td>${datas[i][2]}</td>
                <td>${datas[i][3]}</td>
                <td>${datas[i][4]}</td>
                <td style="background-color:green;"><button type="button" class="btn btn-link btnEdit" onclick="editInput()">Edit</button></td>
                <td style="background-color:red;"><button type="button" class="btn btn-link btnDelete" onclick="deleteInput()">Delete</button></td>
            </tr>
        `
    }
    tableData.innerHTML = tr;
}

function editInput() {
    // document.addEventListener('click', function(event) {
    //     if (event.target.className === 'btnEdit')
    //     var idnumber = event.target.
    // })
    $('tbody').on('click', '.btnEdit', function () {
        var idnumber = $(this).parent().siblings('td:first').text()
        document.formInput.name.value=inputUser[idnumber-1][0] //masih perlu di edit lagi pake global listener
        document.formInput.email.value=inputUser[idnumber-1][1]
        document.formInput.password.value=inputUser[idnumber-1][2]
        document.formInput.birthday.value=inputUser[idnumber-1][3]
        document.formInput.gender.value=inputUser[idnumber-1][4]
        inputUser.splice(idnumber-1,1);
        showInput(inputUser)
    })
}

function deleteInput() {
    $('tbody').on('click', '.btnDelete', function () {
        var id = $(this).parent().siblings('td:first').text()
        inputUser.splice(id-1,1);
        showInput(inputUser)
    })
}




var doLogin = async()=>{
    username = document.getElementById("inputNamaLogin").value
    password = document.getElementById("inputPasswordLogin").value

    console.log(username);
    console.log(password);

    if (username && password) {
        let statusLogin = false
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => userList = json)
            .catch(err => console.warn("Error Fetching Data" + err))
            .finally(() => console.info("finally"))

    statusLogin = userList.find((data) => (data.username == username && password == '12345'))

    if (statusLogin) {
        idUser=statusLogin.id
        namaUser=statusLogin.name
        window.alert("Sukses Login")
        showAlbum()
    } else {
        alert("Gagal")
    }
}
}
var doSearch=()=>{
    let tableData = document.getElementById("tableData1")
    let tr = tableData.children[0].children[0].outerHTML
    console.log(tr)

    
    search = document.getElementById("input").value;
    albumList.forEach((val,index)=>{
    
      if (val.title.includes(search)||val.userId==search){
            tr += `
            <tr> 
                <td>${val.id}</td>
                <td>${val.title}</td>
                <td>${val.userId}</td>
            </tr>
        `
        }
    }) 
    tableData.innerHTML = tr
}



 var paginationButton = page => {
    const rowPerPage = 3
    const totalUsers = albumList.length
    const totalButtonPage = Math.ceil(totalUsers / rowPerPage)
    let end
       if (page>1){
           end=((page+1)>totalButtonPage)?totalButtonPage:page+1
            get('.page-container').innerHTML = `<div class="page-no" onclick="pagination(1)">First</div>`
            
            for (let i = page-1; i <= end; i++) {
                if (i==page){
                    get('.page-container').innerHTML += `
                    <div class="page-no" style="background-color: grey" onclick="pagination(${i})">${i}</div>
                `
                } else {
                    get('.page-container').innerHTML += `
                    <div class="page-no" onclick="pagination(${i})">${i}</div>
                `
                }
            }
            get('.page-container').innerHTML += `<div class="page-no" onclick="pagination(${totalButtonPage})">Last</div>`
        } else {
            get('.page-container').innerHTML = `<div class="page-no" onclick="pagination(1)">First</div>`
            for (let i = 1; i <= rowPerPage; i++) {
                get('.page-container').innerHTML += `
            <div class="page-no" onclick="pagination(${i})">${i}</div>
        `
            }
            get('.page-container').innerHTML += `<div class="page-no" onclick="pagination(${totalButtonPage})">Last</div>`
           getAll('.page-no')[page].style.backgroundColor="grey"
        }
    console.log(getAll('.page-no'))
}
var pagination = (page) => {

    const rowPerPage = 3
    let header = get("table[data='user'] tr:first-child").innerHTML
    let table = get("table[data='user']")

    let no = ((page - 1) * 10)+1

    var newTr2 = albumList.slice(((page - 1)*rowPerPage), (page * rowPerPage)).map((user, index) => {
        return `
            <tr>
                <td>${user.id}</td>
                <td>${user.title}</td>
                <td>${user.userId}</td>
                </td>
            </tr>
        `
    })
    paginationButton(page)
    table.innerHTML = header + newTr2.join("")

}


var showAlbum = async()=> {
    let tableData = document.getElementById("tableData1")
    let tr = tableData.children[0].children[0].outerHTML
    await fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(json => albumList = json)
    if (idUser){
        albumList.forEach((val,index)=>{
            if (val.userId==idUser){
                tr += `
            <tr> 
                <td>${val.id}</td>
                <td>${namaUser}</td>
                <td>${val.title}</td>
            </tr>
            `
            }
        })
    } else {
        
        albumList.forEach((val,index)=>{
            tr += `
        <tr> 
            <td>${val.id}</td>
            <td>${val.title}</td>
            <td>${val.userId}</td>
        </tr>
        `
        })
    }
    paginationButton()
    pagination(1)
    tableData.innerHTML = tr
}
        
showAlbum()

//function navigasi
function klikBeranda() {
    document.getElementById("beranda").style.display = "";
    document.getElementById("tentang").style.display = "none";
    document.getElementById("hubungi").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("daftar").style.display = "none";

}

function klikTentang() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("tentang").style.display = "";
    document.getElementById("hubungi").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("daftar").style.display = "none";

}

function klikHubungi() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("tentang").style.display = "none";
    document.getElementById("hubungi").style.display = "";
    document.getElementById("login").style.display = "none";
    document.getElementById("daftar").style.display = "none";

}

function klikMasuk() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("tentang").style.display = "none";
    document.getElementById("hubungi").style.display = "none";
    document.getElementById("login").style.display = "";
    document.getElementById("daftar").style.display = "none";

}

function klikDaftar() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("tentang").style.display = "none";
    document.getElementById("hubungi").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("daftar").style.display = "";

}

var dataAll=[]
var idnumber
var formLogin=document.getElementById("formLogin");
var formRegister=document.getElementById("formRegister");
var formBeranda=document.getElementById("formBeranda");
var formCall=document.getElementById("formCall");
var formAbout=document.getElementById("formAbout");
var navBar=document.getElementById("navBar");
hideComponent(formLogin)
hideComponent(formBeranda)
hideComponent(formCall)
hideComponent(formAbout)
hideComponent(navBar)

function showAbout(){
    showComponent(formAbout)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formCall)
    hideComponent(formRegister)
}
function showCall(){
    showComponent(formCall)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formRegister)
}
function showBeranda(){
    showComponent(formBeranda)
    hideComponent(formLogin)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
}
function showLogin(){
    showComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
    hideComponent(navBar)
}
function showRegister(){
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    showComponent(formRegister)
    hideComponent(navBar)
}

function hideComponent(id){
    id.hidden=true
}
function showComponent(id){
    id.hidden=false
    // id.style.visibility='visible'
}
function saveData() {
    // let nama=document.formRegister.nameForm.value;
    let nama=document.formRegister.nameForm.value;
    let email=document.formRegister.emailForm.value;
    let password=document.formRegister.passwordForm.value;
    let tglLahir=document.formRegister.birthdayForm.value;
    let jenisKelamin=document.formRegister.gender.value;

    let dataArray=[nama,email,password,tglLahir,jenisKelamin]
    let i = dataAll.length
    dataAll[i]=dataArray
    // console.log(dataAll)

    // showData(dataAll)
}
function register(){
    showComponent(formLogin)
    hideComponent(formRegister)
    saveData()
}
function goRegister(){
    showComponent(formRegister)
    hideComponent(formLogin)
}
function login(){
    let email=document.formLogin.emailForm.value;
    let password=document.formLogin.passwordForm.value;
    for (i=0;i<dataAll.length;i++){
        // console.log("isi data "+data[i])
        if (email===dataAll[i][1]){
            if (password==dataAll[i][2]){
                showComponent(formBeranda)
                showComponent(navBar)
                hideComponent(formLogin)
                showData(dataAll)
            } else {
                console.log("ini1")
                alert("Mohon Periksa Kembali Email dan Password")
            }
        }else {
            console.log("ini2")
            alert("Mohon Periksa Kembali Email dan Password")

        }
        // tr += `
        //     <tr>
        //         <td>${i + 1}</td>
        //         <td>${data[i][0]}</td>
        //         <td>${data[i][1]}</td>
        //         <td>${data[i][2]}</td>
        //         <td>${data[i][3]}</td>
        //         <td>${data[i][4]}</td>
        //     </tr>
        // `
    }
}
function saveEdit(){
    let nama=document.formEdit.nameForm.value;
    let email=document.formEdit.emailForm.value;
    let password=document.formEdit.passwordForm.value;
    let tglLahir=document.formEdit.birthdayForm.value;
    let jenisKelamin=document.formEdit.gender.value;
    let id=document.formEdit.id.value;
    id=parseInt(id)
    let dataArray=[nama,email,password,tglLahir,jenisKelamin]
    let i = dataAll.length
    // dataAll[i]=dataArray
    // console.log(dataAll)
    dataAll.splice(id,1,dataArray);
    showData(dataAll)
}

function showData(data) {
    let tableData=document.getElementsByClassName("tableData")[0]
    let tr=tableData.children[0].children[0].outerHTML
    for (i=0;i<data.length;i++){
        console.log("isi data "+data[i])
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
    tableData.innerHTML=tr
}

function editData(idnumber){
    document.formEdit.nameForm.value=dataAll[idnumber][0]
    document.formEdit.emailForm.value=dataAll[idnumber][1]
    document.formEdit.passwordForm.value=dataAll[idnumber][2]
    document.formEdit.birthdayForm.value=dataAll[idnumber][3]
    document.formEdit.gender.value=dataAll[idnumber][4]
    document.formEdit.id.value=idnumber
}
function deleteData(id){
    // dataAll=dataAll.slice(0);
    dataAll.splice(id-1,1);
    showData(dataAll)
}
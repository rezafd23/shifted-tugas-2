var dataAll=[{
    name: "admin",
    email: "admin@admin.com",
    password: "admin",
    tglLahir: "21-10-2020",
    jenisKelamin: "L",
}]
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

var saveDataUser=()=>{
    let form=document.formRegister
    let nama=form.nameForm.value;
    let email=form.emailForm.value;
    let password=form.passwordForm.value;
    let tglLahir=form.birthdayForm.value;
    let jenisKelamin=form.gender.value;
    let idxUser=dataAll.length
    let saveData=false
    let id=form.id.value

    if (nama&&email&&password&&tglLahir&&jenisKelamin){
        let used=false
        // Map
        // used=dataAll.map(obj=>{
        //     if (obj.email == email) return true
        //
        // })
        // find
        used=dataAll.find(obj=>{
            if (obj.email==email) return true
        })

        if (id) used=false
        // for (i=0;i<dataAll.length;i++){
        //     let user = dataAll[i]
        //     if (email==user.email){
        //         used=true
        //         break
        //     }
        // }
        if (used){
            alert("email telah digunakan")
            return
        }
        let registrasiData={
            name:nama,
            email:email,
            password:password,
            tglLahir:tglLahir,
            jenisKelamin:jenisKelamin
        }
        if (id){
            dataAll.splice(parseInt(id),1,registrasiData)
        } else {
            dataAll.splice(idxUser,1,registrasiData)
        }
        saveData=true
        form.reset()
    } else {
        alert("Mohon Lengkapi Data")
    }
    console.log(dataAll)

    return saveData;

}
function register(){
    if (saveDataUser()){
        showComponent(formLogin)
        hideComponent(formRegister)
    }
}
function goRegister(){
    showComponent(formRegister)
    hideComponent(formLogin)
}
var doLogin=()=>{
    let form = document.formLogin
    email=form.emailForm.value
    password=form.passwordForm.value

    if (email&&password){
        let statusLogin=false
        statusLogin=dataAll.map((data)=>{
            if (data.email==email&&data.password==password) return true
        })
        // for (i=0;i<dataAll.length;i++){
        //     let data=dataAll[i]
        //     if (email==data.email&&password==data.password){
        //         statusLogin=true
        //         break
        //     }
        // }
        if (statusLogin){
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
    document.formEdit.reset()
}
var showUserData=()=>{
    let tableData=document.getElementsByClassName("tableData")[0]
    let tr=tableData.children[0].children[0].outerHTML

    for (i=0;i<dataAll.length;i++){
        let data=dataAll[i]
        tr += `
            <tr align="center">
                <td>${i + 1}</td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                <td>${data.tglLahir}</td>
                <td>${data.jenisKelamin}</td>
                <td>
                <button onclick="editData(${i})">Update</button>
                <button onclick="deleteData(${i})">Delete</button>
                </td>
            </tr>
        `
    }
    tableData.innerHTML=tr
}
showUserData()
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


var editData=idnumber=>{
    showRegister()
    let form = document.formRegister
    form.nameForm.value=dataAll[idnumber].name
    form.emailForm.value=dataAll[idnumber].email
    form.passwordForm.value=dataAll[idnumber].password
    form.birthdayForm.value=dataAll[idnumber].tglLahir
    form.gender.value=dataAll[idnumber].jenisKelamin
    form.id.value=idnumber
}
var deleteData=id=>{
    // dataAll=dataAll.slice(0);
    dataAll.splice(id-1,1);
    showData(dataAll)
}
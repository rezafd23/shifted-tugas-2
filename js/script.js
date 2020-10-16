var dataAll=[]
var idnumber
function saveData() {
    let nama=document.formRegister.nameForm.value;
    let email=document.formRegister.emailForm.value;
    let password=document.formRegister.passwordForm.value;
    let tglLahir=document.formRegister.birthdayForm.value;
    let jenisKelamin=document.formRegister.gender.value;

    // var data={
    //     "nama":nama,
    //     "email":email,
    //     "password":password,
    //     "tglLahir":tglLahir,
    //     "jenisKelamin":jenisKelamin,
    // }
    let dataArray=[nama,email,password,tglLahir,jenisKelamin]
    let i = dataAll.length
    dataAll[i]=dataArray
    // console.log(dataAll)

    showData(dataAll)
}
function saveEdit(){
    let nama=document.formRegister.nameForm.value;
    let email=document.formRegister.emailForm.value;
    let password=document.formRegister.passwordForm.value;
    let tglLahir=document.formRegister.birthdayForm.value;
    let jenisKelamin=document.formRegister.gender.value;

    let dataArray=[nama,email,password,tglLahir,jenisKelamin]
    let i = dataAll.length
    dataAll[i]=dataArray
    // console.log(dataAll)
    dataAll.splice(idnumber-1,1);
    showData(dataAll)
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
            </tr>
        `
    }
    tableData.innerHTML=tr
}
function editData(){
    idnumber=document.formEdit.nomorData.value;
    document.formRegister.nameForm.value=dataAll[idnumber-1][0]
    document.formRegister.emailForm.value=dataAll[idnumber-1][1]
    document.formRegister.passwordForm.value=dataAll[idnumber-1][2]
    document.formRegister.birthdayForm.value=dataAll[idnumber-1][3]
    document.formRegister.gender.value=dataAll[idnumber-1][4]
    

    // id=parseInt(id)-1
    // let nama=document.formRegister.nameForm.value;
    // let email=document.formRegister.emailForm.value;
    // let password=document.formRegister.passwordForm.value;
    // let tglLahir=document.formRegister.birthdayForm.value;
    // let jenisKelamin=document.formRegister.gender.value;
    // //
    // nama.value=dataAll[id][0]
    // email.value=dataAll[id][1]
    // password.value=dataAll[id][2]
    // tglLahir.value=dataAll[id][3]
    // jenisKelamin.value=dataAll[id][4]
}
function deleteData(){
    let id=document.formEdit.nomorData.value;
    // dataAll=dataAll.slice(0);
    dataAll.splice(id-1,1);
    showData(dataAll)
}
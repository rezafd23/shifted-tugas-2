//Global Var
var dataAll = [{
    name: "admin",
    email: "admin@admin.com",
    password: "admin",
    tglLahir: "21-10-2020",
    jenisKelamin: "L",
}]
var NameUser
var idUser
var dataAlbum = []
var newAlbum = []
var formLogin=get("#formLogin")
var formRegister = get("#formRegister");
var formBeranda = get("#formBeranda");
var formCall = get("#formCall");
var formAbout = get("#formAbout");
var navBar = get("#navBar");


hideComponent(formLogin)
hideComponent(formBeranda)
hideComponent(formCall)
hideComponent(formAbout)
hideComponent(navBar)


getAll = function (attr) {
    return document.querySelectorAll(attr)
}
function get(attr) {
    return document.querySelector(attr)
}
hideComponent=(id)=> {
    id.hidden = true
}

showComponent=(id)=> {
    id.hidden = false
}

saveDataUser = () => {
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

var showAbout=()=> {
    showComponent(formAbout)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formCall)
    hideComponent(formRegister)
}

var showCall=()=> {
    showComponent(formCall)
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formRegister)
}

var showBeranda=()=> {
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

var showLogin=()=> {
    showComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    hideComponent(formRegister)
    hideComponent(navBar)
}

var showRegister=()=> {
    hideComponent(formLogin)
    hideComponent(formBeranda)
    hideComponent(formAbout)
    hideComponent(formCall)
    showComponent(formRegister)
    hideComponent(navBar)
}
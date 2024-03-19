var form = document.getElementById('myForm'),
    imgInput = document.querySelector('.img'),
    file = document.getElementById('imgInput'),
    userName = document.getElementById('name'),
    age = document.getElementById('age'),
    city = document.getElementById('city'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone'),
    post = document.getElementById('post'),
    sDate = document.getElementById('sDate'),
    submitButton = document.querySelector('.submit'),
    userInfo = document.getElementById('data'),
    modal = document.getElementById('userForm'),
    modalTitle = document.querySelector('#userForm .modal-title')
    newUserButton = document.querySelector('.newUser')

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserButton.addEventListener('click', () => {

    submitButton.innerText = 'Submit',
    modalTitle.innerText = 'Fill The Form'
    
    isEdit = false
    imgInput.src = "./image/profileIcon.webp"
    form.reset()
})

file.onchange = function() {

    if (file.files[0].size < 1000000) { // 1-MB

        var fileReader = new FileReader()
        fileReader.onload = function(e) {

            imgUri = e.target.result
            imgInput.src = imgUri
        }

        fileReader.readAsDataURL(file.files[0])

    } else {

        alert('This file is too large!')
    }
}

function showInfo() {

    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    getData.forEach((element, index) => {
        
        let createEmployee = `
            <tr class="employeeDetails">

                <td>${index+1}</td>
                <td> <img src="${element.picture}" alt="" width="50" height="50"> </td>
                <td>${element.employeeName}</td>
                <td>${element.employeeAge}</td>
                <td>${element.employeeCity}</td>
                <td>${element.employeeEmail}</td>
                <td>${element.employeePhone}</td>
                <td>${element.employeePost}</td>
                <td>${element.startDate}</td>
                <td>

                    <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}',
                    '${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}',
                    '${element.employeePhone}', '${element.employeePost}','${element.startDate}')" data-bs-toggle="modal" 
                    data-bs-target="#readData"> <i class="bi bi-eye"></i> </button>

                    <button class="btn btn-primary" onclick="editInfo('${index}','${element.picture}',
                    '${element.employeeName}','${element.employeeAge}','${element.employeeCity}',
                    '${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.startDate}')"
                    data-bs-toggle="modal" data-bs-target="#userForm"> <i class="bi bi-pencil-square"></i> </button>

                    <button class="btn btn-danger" onclick="deleteInfo(${index})"> <i class="bi bi-trash"></i> </button>
                </td>
            </tr>
        `

        userInfo.innerHTML += createEmployee
    })
}


function readInfo(pic, name, age, city, email, phone, post, sDate) {

    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector('#showAge').value = age,
    document.querySelector('#showCity').value = city,
    document.querySelector('#showEmail').value = email,
    document.querySelector('#showPhone').value = phone,
    document.querySelector('#showPost').value = post,
    document.querySelector('#showsDate').value = sDate
}

function editInfo(index, pic, name, Age, City, Email, Phone, Post, sDATE) {

    isEdit = true
    editId = index
    
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value = City
    email.value = Email
    phone.value = Phone
    post.value = Post
    sDate.value = sDATE

    submitButton.innerText = 'Update'
    modalTitle.innerHTML = 'Update The Form'

}

function deleteInfo(index) {

    if (confirm('Are You Sure Want To Delete?')) {

        getData.splice(index, 1)
        localStorage.setItem('userProfile', JSON.stringify(getData))
        showInfo()
    }
}

form.addEventListener('submit', (e)=> {

    e.preventDefault()

    const information = {

        picture: imgInput.src == undefined ? "./image/profileIcon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value
    }

    if (!isEdit) {

        getData.push(information)

    } else {

        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitButton.innerHTML = 'Submit'
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/profileIcon.webp"
    modal.style.display = 'none'
    document.querySelector(".modal-backdrop").remove()
})

const inputFile = document.querySelector('#inputFile');
const button = document.querySelector('#button');
const inputUserId = document.querySelector('#userId');
const inputName = document.querySelector('#userName');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdDd5dmZ5eTAwMDBwbHBxYmI5c3cwbTAiLCJpYXQiOjE3MDkyNTU5ODMsImV4cCI6MTcwOTI1Njg4M30.ivYYB5hPeUVR8o0OWG30ESbjieHTv7PNvltjkPlKgVU";
const createUser = (user) => {
    const formData = new FormData();
    const headers = new Headers();

    formData.append("data", JSON.stringify({
        "name": user.name,
        "locks": user.locks
    }));
    formData.append("image", user.image);

    headers.append("Authorization", "Bearer " + token);

    const url = "http://localhost:3000/users";
    console.log(user);

    fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

}

const handleButton = () => {

    const user = {
        name: inputName.value,
        image: inputFile.files[0],
        locks: [
            {"id": "clt7z0m2n0003plpq4daxfdrm"},
            {"id": "clt7z19x20004plpq6gz0c7nv"},
        ]
    };

    createUser(user)

}

button.addEventListener("click", handleButton);

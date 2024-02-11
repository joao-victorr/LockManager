
const inputFile = document.querySelector('#inputFile');
const button = document.querySelector('#button');
const inputUserId = document.querySelector('#userId');
const inputName = document.querySelector('#userName');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsc2MzbGNqbTAwMDA3bTkzNjloY2hxdnkiLCJpYXQiOjE3MDc1MTk5MzQsImV4cCI6MTcwNzUyMzUzNH0.-tLDfSXyOTN2d1ho1j2ZXghj1PbMjg25mf3p3I9XxCk";
const createUser = (user) => {
    const formData = new FormData();
    const headers = new Headers();

    formData.append("data", JSON.stringify({
        "name": user.name,
        "unidade": user.unidade
    }));
    formData.append("image", user.image);

    headers.append("Authorization", "Bearer " + token);

    const url = "http://localhost:3000/access";
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
        unidade: [
            {
                id: "cls4tkk9u0001t22vola9jmdk",
                department: 2000
            }
        ]
    };

    createUser(user)

}

button.addEventListener("click", handleButton);
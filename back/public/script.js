
const inputFile = document.querySelector('#inputFile');
const button = document.querySelector('#button');
const inputUserId = document.querySelector('#userId');
const inputName = document.querySelector('#userName');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsc2h3ZzFkcDAwMDAxMmJubDNjM3ZjaGYiLCJpYXQiOjE3MDkwMDE5MzIsImV4cCI6MTcwOTAwMjgzMn0.LIVbPCruL-hlLbkBa7EyaJunFTqFazWQQJJx1H_Cg2k";
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
            {"id": "clsjgct090002hxaw2nb24th5"},
            {"id": "clshx75pp0000zq45n90zkcp8"}
        ]
    };

    createUser(user)

}

button.addEventListener("click", handleButton);
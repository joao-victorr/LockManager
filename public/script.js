
const inputFile = document.querySelector('#inputFile');
const button = document.querySelector('#button');
const inputUserId = document.querySelector('#userId');
const inputName = document.querySelector('#userName');


const ipAddress = {
    loja: "192.168.1.25",
    fabrica: "192.168.201.205"
}



const session = "twADAnt1EMTHPdIrrypXrHuQ"

async function createUser(user) {

    const url = `http://${ipAddress.loja}/create_objects.fcgi?session=${session}`;

    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            object: "users",
            values: [
                {
                    registration: "444",
                    name: user.name,
                    password: "",
                }
            ]
        })
    })
   .then(res => res.json())
   .then((data) => {

        user.id = data.ids[0];
        uploadImage(user);

   });

};

async function uploadImage(user) {

    const url = `http://${ipAddress.loja}/user_set_image.fcgi?user_id=${user.id}&match=0&timestamp=1624997578&session=${session}`
    

    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: user.imageBinary
    })
    .then(response => response.json())
    .then(data => console.log(data));


}


button.addEventListener('click', async () => {

    const user = {
        name: inputName.value.toUpperCase().trim(),
        id: null,
        imageBinary: inputFile.files[0]
    }

    createUser(user);
    console.log(user);



});


const teste = (userTeste) => {

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: {
            "imageBuffer": userTest.image,
            "name": userTest.name,
            "lock": userTest.lock
        }

    })

};




type UnitSession = Array<{
    name: String,
    session: String
}>;

type Units = Array<{
    name: string,
    ip: string
}>;

let sessionUnits: UnitSession;

export const loginControl = (units: Units) => {

    units.map(e => {
        const url =`http://${e.ip}/login.fcgi`

        fetch(url, {
            method: 'POST',
            headers: {
                "content-type":"aplication/json"
            },
            body: JSON.stringify({
                "login": "admin",
                "password": "Pd@1478#H"
            })
        })
        .then(res => res.json())
        .then((data: any) => {
            const newUnits = {name: e.name, session: data.session}
            sessionUnits.push(newUnits)
        })
    })
}

export { sessionUnits }

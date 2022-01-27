var contar_votos = false;
var animals = [
    "Ardilla",
    "Burro",
    "Caballo",
    "Delfin",
    "Elefante"
]
var carnets = [];
var votos = {
    "Ardilla": 0,
    "Burro": 0,
    "Caballo": 0,
    "Delfin": 0,
    "Elefante": 0

}

function d(campo) {
    return document.getElementById(campo);
}

function contarVotos() {
    contar_votos = true;
    let json_votos = JSON.parse(localStorage.getItem("votos"));
    let cantidad_ardilla = json_votos.Ardilla;
    let cantidad_burro = json_votos.Burro;
    let cantidad_caballo = json_votos.Caballo;
    let cantidad_delfin = json_votos.Delfin;
    let cantidad_elefante = json_votos.Elefante;
    console.log(cantidad_ardilla,
        cantidad_burro,
        cantidad_caballo,
        cantidad_delfin,
        cantidad_elefante,
    )
    d("lbl_Ardilla").innerHTML = "Ardilla " + cantidad_ardilla;
    d("lbl_Burro").innerHTML = "Burro " + cantidad_burro;
    d("lbl_Caballo").innerHTML = "Caballo " + cantidad_caballo;
    d("lbl_Delfin").innerHTML = "Delfin " + cantidad_delfin;
    d("lbl_Elefante").innerHTML = "Elefante " + cantidad_elefante;
    //d("div_conteo_votos").innerHTML = localStorage.getItem("votos")
}


function votar(animal) {
    let carnet = d("txt_carnet").value;
    if (carnet) {
        console.log(carnet, animal)

        d("txt_carnet").removeAttribute("style")
        Swal.fire({
            title: 'Seguro quieres Votar por: ' + animals[animal - 1],
            text: '',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Votar',
            denyButtonText: `No Votar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (carnets.indexOf(carnet) == -1) {
                    carnets.push(carnet)
                    votos[animals[animal - 1]] = votos[animals[animal - 1]] + 1;
                    localStorage.setItem("votos", JSON.stringify(votos));
                    Swal.fire('Tu voto se registro con exito!', '', 'success')
                    if (contar_votos)
                        contarVotos()
                } else {
                    Swal.fire('ya votaste!', '', 'error')
                    d("txt_carnet").setAttribute("style", "border-color:red")
                }

            } else if (result.isDenied) {

            }
        })
    } else {
        Swal.fire({
            title: 'Ups!',
            text: 'debes poner tu numero de carnet',
            icon: 'warn',
            confirmButtonText: 'Ok'
        })
        d("txt_carnet").setAttribute("style", "border-color:red")

    }

}
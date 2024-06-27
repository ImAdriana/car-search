// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};
// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar

    // Llena las opciones respecto al anio
    llenarSelect();
});

marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});
minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});
transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {
    limpiarHTML(); // Elimina el HTML previo
    // Recorre el objeto autos
    autos.forEach((auto) => {
        // De esta manera utilizar Destructuring para objetos
        const { marca, modelo, year, puertas, transmision, precio, color } =
            auto;
        const valor = document.createElement('p');
        valor.textContent = `${marca} - ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio $${precio} - Color: ${color}`;
        resultado.appendChild(valor);
    });
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones del año del selector
    }
}

// Función que filtra con base en la busqueda
// Filter funge como una función de alto nivel
function filtrarAuto() {
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    // Verifica si hay información rellenada en la marca
    if (marca) {
        // Retorna
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        // year viene como un string, pero autos.year es un int, entonces se hace
        // un casteo
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent =
        'No hay resultados para la búsqueda, intenta otras opciones';
    resultado.appendChild(noResultado);
}

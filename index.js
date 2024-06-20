// Inicialización de variables
let listaConcursante = [];

//objeto 
const objConcursante = {
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    opcion: '',
    transporte: []  //Array para la seleccion en el checkbox
}

let editando = false;

// Selección de elementos del DOM
const formulario = document.querySelector('#form');
const nombreInput = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const telefonoInput = document.querySelector('#telefono');
const bipInput = document.querySelector('#bip');
const tagInput = document.querySelector('#tag');
const automovilInput = document.querySelector('#automovil');
const bicicletaInput = document.querySelector('#bicicleta');
const transportePublicoInput = document.querySelector('#transportePublico');
const btnAgregarInput = document.querySelector('#btnAgregar');


// Event listener para el formulario
formulario.addEventListener('submit', validarFormulario);

// 1 Función para validar el email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// 2 Función para validar el formulario
function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    // Obtener opción seleccionada de radio buttons
    const opcionSeleccionada = document.querySelector('input[name="opcion"]:checked');
    if (!opcionSeleccionada) {
        alert('Debes elegir al menos una opción para el premio.');
        return;
    }

    // 1 Crea un array con los valores de los checkboxes de transporte seleccionados.
    const transportesSeleccionados = [];
    //Recorre cada checkbox de transporte seleccionado y agrega su valor al array transportesSeleccionados.
    document.querySelectorAll('input[name="transporte"]:checked').forEach((checkbox) => { 
        transportesSeleccionados.push(checkbox.value);
    });

    if (transportesSeleccionados.length === 0) {
        alert('Debes elegir al menos una opción de transporte.');
        return;
    }

// Si estamos editando un concursante, llama a la función editarconcursante con los valores seleccionados.
    if (editando) { 
        editarconcursante(opcionSeleccionada.value, transportesSeleccionados);
        editando = false;
    } else { //De lo contrario, asigna un ID único al objeto objConcursante y guarda los datos del nuevo concursante en la lista.
        objConcursante.id = Date.now();
        objConcursante.nombre = nombreInput.value;
        objConcursante.email = emailInput.value;
        objConcursante.telefono = telefonoInput.value;
        objConcursante.opcion = opcionSeleccionada.value;
        objConcursante.transporte = transportesSeleccionados;
        agregarConcursante();
    }
}

// 3 Función para agregar un concursante a la lista
function agregarConcursante() {
    listaConcursante.push({ ...objConcursante });
    mostrarConcursante();
    formulario.reset();
    limpiarObjeto();
}

// 4 Función para limpiar el objeto objConcursante
function limpiarObjeto() {
    objConcursante.id = '';
    objConcursante.nombre = '';
    objConcursante.email = '';
    objConcursante.telefono = '';
    objConcursante.bip = '';
    objConcursante.tag = '';
    objConcursante.automovil = '';
    objConcursante.bicicleta = '';
    objConcursante.transportePublico = '';
}

// 5 Función para mostrar la lista de concursantes en el HTML
function mostrarConcursante() {
    limpiarHTML(); // Limpia el contenido anterior del div de concursantes.

    const divConcursantes = document.querySelector('.div-concursantes'); // Obtiene el div de concursantes.

     // Itera sobre la lista de concursantes y crea un párrafo para cada uno.
    listaConcursante.forEach(concursante => {   // Obtiene los datos del concursante.
        const { id, nombre, email, telefono, opcion, transporte } = concursante;
        // Crea un párrafo con los datos del concursante.
        const parrafo = document.createElement('p'); 
        parrafo.textContent = `${id} - ${nombre} - ${email} - ${telefono} - ${opcion} - ${transporte.join(', ')}`;
        parrafo.dataset.id = id;
        // Crea un botón de editar para cada concursante y asigna la función cargarconcursante.
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarconcursante(concursante);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);
        // Crea un botón de eliminar para cada concursante y asigna la función eliminarconcursante.
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarconcursante(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');   // Crea una línea horizontal para separar cada concursante.
        // Agrega el párrafo y la línea horizontal al div de concursantes.
        divConcursantes.appendChild(parrafo);
        divConcursantes.appendChild(hr);
    });
}

// 6 Carga los datos del concursante en el formulario para su edición.
function cargarconcursante(concursante) {
    // Desestructura el objeto concursante para obtener los datos individuales.
    const {id, nombre, email, telefono, bip, tag, automovil, bicicleta, transportePublico} = concursante;
    // Asigna los valores de los campos del formulario con los datos del concursante.
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    bipInput.value = bip;
    tagInput.value = tag;
    automovilInput.value = automovil;
    bicicletaInput.value = bicicleta;
    transportePublicoInput.value = transportePublico;

    objConcursante.id = id;
    //Actualiza el texto del botón de envío del formulario a "Actualizar"
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}
// 7 funcion Actualiza los datos del objeto objConcursante con los valores de los campos del formulario.
function editarconcursante() {
    objConcursante.nombre = nombreInput.value;
    objConcursante.email = emailInput.value;
    objConcursante.telefono = telefonoInput.value;
    objConcursante.bip = bipInput.value;
    objConcursante.tag = tagInput.value;
    objConcursante.automovil = automovilInput.value;
    objConcursante.bicicleta = bicicletaInput.value;
    objConcursante.transportePublico = transportePublicoInput.value;

// 8 Funcion Actualiza los datos del concursante en la lista de concursantes.
    listaConcursante.map(concursante => {   //.map itera sobre cada elemento de listaConcursante
        if(concursante.id === objConcursante.id) {
            concursante.id = objConcursante.id;
            concursante.nombre = objConcursante.nombre;
            concursante.email = objConcursante.email;
            concursante.telefono = objConcursante.telefono;
            concursante.bip = objConcursante.bip;
            concursante.tag = objConcursante.tag;
            concursante.automovil = objConcursante.automovil;
            concursante.bicicleta = objConcursante.bicicleta;
            concursante.transportePublico = objConcursante.transportePublico;
        }

    });

    limpiarHTML();
    mostrarConcursante();
    formulario.reset();
    // Cambia el texto del botón de enviar del formulario a "Agregar" después de editar un concursante.
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}
// 9 Funcion elimina un concursante de la lista y actualiza la visualización.
function eliminarconcursante(id) {

    listaConcursante = listaConcursante.filter(concursante => concursante.id !== id);

    limpiarHTML();
    mostrarConcursante();
}
//10 funcion limpia el contenido HTML de un elemento eliminando todos sus hijos.
function limpiarHTML() {
    const divConcursantes = document.querySelector('.div-concursantes');
    while(divConcursantes.firstChild) {
        divConcursantes.removeChild(divConcursantes.firstChild);
    }
}

//11 funcion Se agrega alerta de politicas de privacidad, esto como un componente de mejora para esta web :)
function politicasPrivacidad() {
    alert('POLÍTICA DE PRIVACIDAD\n\
\nEl presente Política de Privacidad establece los términos en que Benefiviajes usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.\n\
Información que es recogida\n\
\nNuestro sitio web podrá recoger información personal por ejemplo: Nombre,  información de contacto como  su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.\n\
Uso de la información recogida\n\
\nNuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.\n\
\nBenefiviajes está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.\n\
Cookies\n\
\nUna cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.\n\
\nNuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente noticias. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.\n\
\nEnlaces a Terceros\n\
Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.\n\
Control de su información personal\n\
\nEn cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.  Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico.  En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.\n\
Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.\n\
\nBenefiviajes Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.');
}



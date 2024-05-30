/*Esta línea añade un evento al documento que se activa cuando el contenido HTML ha sido completamente cargado y parseado. En otras palabras, se ejecuta cuando el DOM está listo para ser manipulado.*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    /*Aquí se agrega un evento de escucha al formulario que se activa cuando se intenta enviar el formulario. */
    form.addEventListener('submit', (event) => {
        if (registro()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            event.preventDefault(); // Esta línea evita que el formulario se envíe si hay errores de validación
        } else {
            console.log('El formulario es válido. Enviar datos...');
            // Aquí puedes enviar los datos del formulario o realizar otras acciones
        }
    });

    const registro = () => {
        let isValid = true;

        //Validacion de campos
        isValid = validacampo('nombre', 'El nombre es obligatorio') && isValid;
        isValid = validacampo('apellido', 'El apellido es obligatorio') && isValid;
        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid;
        isValid = validacampo('password', 'La contraseña es obligatoria') && isValid;
        isValid = validacampo('fechaNacimiento', 'La fecha de nacimiento es obligatoria') && isValid;
        isValid = validacampo('pais', 'El país es obligatorio') && isValid;

        const terminos = document.getElementById('termYCond').checked;
        if (!terminos) {
            isValid = false;
            setErrorFor(document.getElementById('termYCond'), 'Debes aceptar los términos y condiciones');
        } else {
            setSuccessFor(document.getElementById('termYCond'));
        }

        return isValid;
    };

    const validacampo = (id, errorMessage) => {
        const field = document.getElement(id);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        if (email === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const formControl = input.closest('div');
        const errorText = formControl.querySelector('.texterror');
        formControl.classList.add('error');
        errorText.innerText = message;
        input.focus();
    };

    const setSuccessFor = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.texterror');
        errorText.innerText = '';
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
      // Agrega eventos para borrar las clases de error cuando se completa el input o se presiona Tab
      form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
            const value = input.value.trim();
            // Si el campo no está vacío, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });
     // Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
     form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            // Obtiene el valor seleccionado del campo de selección
            const value = select.value;
            // Si se selecciona una opción, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });
});
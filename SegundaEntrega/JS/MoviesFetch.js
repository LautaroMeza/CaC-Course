// URL de api
const API_SERVER = 'https://api.themoviedb.org/3'; //esto se cambiara por una api propia que tenga las peliculas en la base de mysql

// Opciones para las peticiones fetch a la API
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer bf267195b7fd26d1b6a159a695e44e67'
        //Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
        
    }
};

// Función para crear elementos HTML
const createElement = (tag, className, attributes = {}) => {
    // Creamos un nuevo elemento HTML del tipo especificado (tag)
    const element = document.createElement(tag);
    
    // Si se especificó una clase, la añadimos al elemento
    if (className) {
        element.classList.add(className);
    }
    
    // Iteramos sobre los atributos pasados como argumento y los añadimos al elemento
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    
    // Devolvemos el elemento creado
    return element;
};

// Función para cargar películas en la cuadrícula de tendencias
const fetchMoviesGrid = async (page = 1) => {
    // Realizamos una petición fetch a la API para obtener las películas populares
    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
    
    //extraigo las peliculas
    const movies = (await response.json()).results;
    

    // Seleccionamos el contenedor de películas de tendencia en el DOM
    const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');
    
    // Limpiamos el contenido previo del contenedor
    tendenciasContainer.innerHTML = '';

    // Iteramos sobre cada película obtenida
    movies.forEach(movie => {
        // Creamos los elementos HTML para mostrar la película
        const pelicula = createElement('div', 'pelicula');
        const anchor = createElement('a', '');
        anchor.href = './pages/detalle.html';
        const img = createElement('img', 'imgTendencia', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });
        const tituloPelicula = createElement('div', 'tituloPelicula');
        const titulo = createElement('h4', '');
        titulo.textContent = movie.title;
        
        // Agregamos los elementos al DOM
        
        tituloPelicula.appendChild(titulo); 
        pelicula.append(img, tituloPelicula);
        anchor.appendChild(pelicula); 
        const peliculaWrapper = createElement('div', 'peliculas'); 
        peliculaWrapper.appendChild(anchor); 
        tendenciasContainer.appendChild(peliculaWrapper);
    });

    // Actualizamos el atributo data-page con el número de página actual
    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

// Función para cargar películas en el carrusel de películas aclamadas
const fetchMoviesFlex = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
    
    // Convertimos la respuesta a JSON
    const movies = (await response.json()).results;


    // Seleccionamos el contenedor de películas aclamadas en el DOM
    const aclamadasContainer = document.querySelector('.aclamadas');
    
    // Iteramos sobre cada película obtenida
    movies.forEach(movie => {
        // Creamos los elementos HTML para mostrar la película
        const peliculaItem = createElement('div', 'peliculaItem');
        const img = createElement('img', 'imgAclamada', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });
        
        // Agregamos los elementos al DOM
        peliculaItem.appendChild(img); 
        aclamadasContainer.appendChild(peliculaItem); 
    });
};

//Boton Anterior
document.querySelector('.anterior').addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(document.querySelector('.peliculasTendencia').getAttribute('data-page'));
    // Si es la primera página, no hacemos nada
    if (currentPage <= 1) return;
    // Cargar las películas de la página anterior
    fetchMoviesGrid(currentPage - 1);
});

// Event listener para el botón "Siguiente"
document.querySelector('.siguiente').addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(document.querySelector('.peliculasTendencia').getAttribute('data-page'));
    // Cargar las películas de la página siguiente
    fetchMoviesGrid(currentPage + 1);
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en la cuadrícula de tendencias
    fetchMoviesGrid();
    // Cargamos las películas en el carrusel de películas aclamadas
    fetchMoviesFlex();
});

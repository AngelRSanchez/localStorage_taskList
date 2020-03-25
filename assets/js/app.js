// Variables
const listaTweets = document.getElementById('lista-tweets');


// Eventlistener

eventListeners();

function eventListeners() {
    // Al enviar el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweet
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


// Funciones

// Agregar tweet
function agregarTweet(e) {
    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.querySelector('#tweet').value;

    // crear boton de borrar tweet
    const btnBorrar = document.createElement('a');
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X';

    // Crear elemento li
    const li = document.createElement('li');
    li.innerText = tweet;
    // Añadir boton borrar
    li.appendChild(btnBorrar);

    // Añadir el tweet a la lista de tweets
    listaTweets.appendChild(li);

    // añadir a localStorage
    agregarTweetLS(tweet);

    // Reset formulario
    document.querySelector('#formulario').reset();
}

// borrar tweet del dom
function borrarTweet(e) {
    e.preventDefault();
    // seleccionar el elemento con la clase borrar-tweet
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();

        borrarTweetLocalStorage(e.target.parentElement.innerText);

        // TODO: Crear mensaje de alerta
        console.log('Tweet Borrado');
    }
}

// agrega tweet a localStorage
function agregarTweetLS(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    // Convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// comprueba si hay datos en localStorage
function obtenerTweetsLocalStorage() {
    let tweets;

    // Revisamos los valores en localStorage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

// Mostrar datos de localStorage de la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(tweet => {
        // crear boton de borrar tweet
        const btnBorrar = document.createElement('a');
        btnBorrar.classList = 'borrar-tweet';
        btnBorrar.innerText = 'X';

        // Crear elemento li
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añadir boton borrar
        li.appendChild(btnBorrar);

        // Añadir el tweet a la lista de tweets
        listaTweets.appendChild(li);
    });

}

// Borrar twwet de localStorage
function borrarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();
    // Elimina la X del string
    let tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets.forEach((tweet, index) => {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
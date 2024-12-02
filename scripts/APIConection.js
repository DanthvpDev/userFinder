async function APIConection() {
    try {
        let promesaAPI = await fetch('https://jsonplaceholder.typicode.com/users');
        //? Datos a JSON 
        const jsonDatos = await promesaAPI.json();
        return jsonDatos
    }
    catch (exc) {
        return exc;
    }
}
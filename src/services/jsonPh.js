const { default: axios } = require("axios")
const { apiURL } = require("../config")

module.exports = class JsonPhService{
    constructor(){
        this.url = apiURL
    }
    /**
     * 
     * @param {Text} param - Parámetro a obtener desde la api. Puede ser posts, users, comments, etc.
     * @returns {Promise} - Promesa con el resultado de la solicitud
     */
    async get(param = "/"){
        return axios.get(`${this.url}${param}`)
            .then(response => response.data)
            .catch(err => err)
    }
}
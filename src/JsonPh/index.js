const axios =require('axios'); 
const { apiURL } = require('../config');
async function callapiPH  (param){
     try {
        const response = await axios.get(`${apiURL}/${param}`);
        return response
        
    } catch (error) {
        console.log(error);
        return error
    }
}
module.exports = callapiPH
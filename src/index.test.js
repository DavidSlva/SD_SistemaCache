const { getData, API_URL } = require(".");



test('Llama a la api 100 veces', () => {
    for(let i = 0; i<40; i++){
        getData(API_URL)
    }
})
const { redis1, redis2, redis3 } = require("../loaders/redis");

module.exports = class RedisService{
    constructor(){
        this.client1 = redis1
        this.client2 = redis2
        this.client3 = redis3
    }

    /**
     * Cambiamos las políticas a LRU de todos los clientes
     */

    async setLRUPolitic(){
        try {
            this.client1.config("SET", "maxmemory-policy", "allkeys-lru");
            this.client2.config("SET", "maxmemory-policy", "allkeys-lru");
            this.client3.config("SET", "maxmemory-policy", "allkeys-lru");
        } catch (error) {
            throw error
        }
    }
    async setLFUPolitic(){
        try {
            this.client1.config("SET", "maxmemory-policy", "allkeys-lfu");
            this.client2.config("SET", "maxmemory-policy", "allkeys-lfu");
            this.client3.config("SET", "maxmemory-policy", "allkeys-lfu");
        } catch (error) {
            throw error
        }
    }

    async store(id, key, value){
     
            //  Lógica de almacenamiento 
            //Si quieres almacenar en el redis 1 debes colocar set(1,llave,valor)
            //Si quieres almacenar en el redis 2 debes colocar set(2,llave,valor)
            //Si quieres almacenar en el redis 3 debes colocar set(3,llave,valor)
            try {    
            // Obtener el índice del Redis en el que se debe almacenar este valor
            const cIndex = (Math.floor((id - 1) / 10) % 3) + 1;

            // Almacenar el valor en el Redis correspondiente
            switch (cIndex) {
                case 1:
                  return this.client1.set(key.toString(), value);
                case 2:
                  return this.client2.set(key.toString(), value);
                case 3:
                  return this.client3.set(key.toString(), value);
                default:
                  throw new Error('Indice del cliente no existe');
    }
        } catch (error) {
            throw error;

            
        }
    }
    /**
     * 
     * @param {Number} cIndex - Indicar número del redis en el cual se almacenará (1,2 o 3)
     * @param {Text} key - La llave con la que se almacenará el valor. String estricto valor.toString()
     * @param {Text} value - Valor que se almacenará. Se puede almacenar en formato JSON también.
     */

    set(cIndex, key, value){
        new Promise((resolve, reject) => {
            let client = null;
            let a;
            switch (cIndex) {
                case 1:
                    client = this.client1
                    break;
                case 2:
                    client = this.client2
                    break;
                case 3:
                    client = this.client3
                    a=2
                    break;
                default:
                    reject(new Error('Indice del cliente no existe'))
            }
            if(cIndex === 3){
                this.client3.set(key, value, (err, reply) => {
                    if(err)
                        reject(err)
                    resolve(reply)
                })
            }
        })
    }
}
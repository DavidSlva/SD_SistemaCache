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

    calcRedisIndex = (id) => {
        const cIndex = (Math.floor((id - 1) / 10) % 3) + 1;
        return cIndex
    }

    async store(id, key, value){
     
            //  Lógica de almacenamiento 
            // Obtener el índice del Redis en el que se debe almacenar este valor
            const cIndex = this.calcRedisIndex(id)

            // Almacenar el valor en el Redis correspondiente
            return this.set(cIndex,key.toString(), value)
    
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
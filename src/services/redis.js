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

    async get(key){
        const cIndex = this.calcRedisIndex(key)
        const client = this.getClient(cIndex)
        const value = await client.get(key)
        return value

    }

    getClient(cIndex){
        switch (cIndex) {
            case 1:
                return this.client1
            case 2:
                return this.client2
            case 3:
                return this.client3
            default:
                reject(new Error('Indice del cliente no existe'))
        }
    }

    async store(key, value){
            //  Lógica de almacenamiento 
            // Obtener el índice del Redis en el que se debe almacenar este valor
            const cIndex = this.calcRedisIndex(key)

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
            let client = this.getClient(cIndex);
            let a;
            client.set(key, value, (err, reply) => {
                if(err)
                    reject(err)
                resolve(reply)
            })
        })
    }
}
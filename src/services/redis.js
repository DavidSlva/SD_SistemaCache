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
            this.client1.configSet("SET", "maxmemory-policy", "allkeys-lru");
            this.client2.configSet("SET", "maxmemory-policy", "allkeys-lru");
            this.client3.configSet("SET", "maxmemory-policy", "allkeys-lru");
        } catch (error) {
            throw error
        }
    }
    /**
     * Cambiamos las políticas a LFU a todos los clientes
     */
    async setLFUPolitic(){
        try {
            this.client1.configSet("maxmemory-policy", "allkeys-lfu");
            this.client2.configSet("maxmemory-policy", "allkeys-lfu");
            this.client3.configSet("maxmemory-policy", "allkeys-lfu");
        } catch (error) {
            throw error
        }
    }
    /**
     * 
     * @param {Number} id - ID a calcular
     * @returns - Retorna el número del cliente al que pertenece el ID
     */
    calcRedisIndex = (id) => {
        const cIndex = (Math.floor((id - 1) / 10) % 3) + 1;
        return cIndex
    }

    /**
     * Obtiene los elementos del cliente 1 respecto a la llave key
     * @param {Text} key - ID del elemento que queremos obtener
     * @returns - Retorna el valor, si no lo encuentra, devuelve null
     */
    async getClient1(key){
        const value = await this.client1.get(key)
        return value
    }
    /**
     * 
     * @param {Text} key - ID del elemento que queremos obtener
     * @returns - Retorna el valor, si no lo encuentra, devuelve null
     */
    async get(key){
        const cIndex = this.calcRedisIndex(key)
        const client = this.getClient(cIndex)
        const value = await client.get(key)
        return value

    }

    /**
     * Elimina todos los elementos de mis redis
     */

    async flushRedis(){
        await this.client1.flushDb()
        await this.client2.flushDb()
        await this.client3.flushDb()
    }

    

    /**
     * 
     * @param {Number} cIndex - Indice del cliente que queremos obtener
     * @returns {RedisService} - Cliente obtenido
     */

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


    /**
     * 
     * @param {Text} key - Llave del elemento
     * @param {Text} value - Contenido
     * @param {Number} expire - TTL del elemento almacenado
     */
    async storeInClient1(key, value){
        return this.set(1, key.toString(), value)
    }

    /**
     * 
     * @param {Text} key - Llave del elemento
     * @param {Text} value - Contenido
     * @param {Number} expire - TTL del elemento almacenado
     */
    async store(key, value, expire = -1){
            // Obtener el índice del Redis en el que se debe almacenar este valor
            const cIndex = this.calcRedisIndex(key)
            // Almacenar el valor en el Redis correspondiente
            return this.set(cIndex,key.toString(), value, expire)
    }

    /**
     * 
     * @param {Number} cIndex - Indicar número del redis en el cual se almacenará (1,2 o 3)
     * @param {Text} key - La llave con la que se almacenará el valor. String estricto valor.toString()
     * @param {Text} value - Valor que se almacenará. Se puede almacenar en formato JSON también.
     * @param {Number} expire - TTL del elemento a almacenar
     */

    set(cIndex, key, value, expire){
        new Promise((resolve, reject) => {
            let client = this.getClient(cIndex);
            let a;
            client.set(key, value, (err, reply) => {
                if(err)
                    reject(err)
                client.expire('key', expire)
                resolve(reply)
            })
        })
    }
}
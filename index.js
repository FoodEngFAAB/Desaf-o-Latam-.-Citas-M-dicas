//Importar módulo dependencias
import http from 'http'
import { v1 as uuidv4 } from 'uuid'
import moment from 'moment'
import _ from 'lodash'
import chalk from 'chalk'
import axios from 'axios'

const port = 3000

//Crea arreglo para almacenamiento de datos
let userArray = []

//Levantar servidor
http
    .createServer((req, res) => {
        if (req.url.includes('/citapi')) {
            //Llama a la librería para el consumo de API REST
            axios
                // USar método get del módulo https para consultar la API
                .get('https://randomuser.me/api/')
                .then((data) => {
                    //Almacenamiento de datos solicitados y obtenidos de la API
                    const userName = data.data.results[0].name.first
                    const userLastName = data.data.results[0].name.last
                    const userId = uuidv4()
                    const timestamp = moment().format('MMMM Do YYYY, HH:MM:ss')

                    //Almacena los datos con formato
                    userArray.push(`Nombre: ${userName} - Apellido: ${userLastName} - ID: ${userId} - Timestamp: ${timestamp}`)

                    //Salida por consola de los registros obtenidos haciendo uso de Lodash
                    _.forEach(userArray, (data) => {
                        console.log(chalk.bgWhite.blue(data))
                        //   
                    })
                    //Mensaje de registro exitoso del usuario
                    console.log(chalk.bgGray.black.bold(`\nRegistro exitoso del usuario.\n`))
                })
                //Captura de errores
                .catch((err) => {
                    console.log(err)
                })
        }
        res.end()
    })
    .listen(`${port}`, () => { console.log(chalk.bgGray.black.italic.bold(`\nAcceso a puerto ${port}\n`)) })
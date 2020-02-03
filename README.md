
# Coding Dojo
## Mauro Andocilla | m.andocilla@me.com


### Instalar dependencias

`npm install`

### Iniciar proyecto

`npm start`

❯ API Ruta

| Ruta                   | Descripción | Método | Body - JSON | Resultado |
| ---------------------- | ----------- | ------ | ----------- | --------- |
| **/api/wizard/attack** | Obtener los ataques con las combinaciones que causen mayor daño | POST | {"red": number, "blue": number, "green": number, "yellow": number, "grey": number } | Ataques (posiones mezcladas y porcentaje de daño) y porcentaje de daño total => {"attacks":[{"quantity":number,"damage":number},...],"totalDamage":number} |


* Ejemplo

```sh
curl --location --request POST 'localhost:3000/api/wizard/attack' \
--header 'Content-Type: application/json' \
--data-raw '{
    "red": 2,
    "blue": 2,
    "green": 1,
    "yellow": 1,
    "grey": 1
}'
```

### Pruebas del proyecto

`npm test`

# Criterios de evaluación
![](docs/file1.jpeg?raw=true)
![](docs/file2.jpeg?raw=true)
![](docs/file3.jpeg?raw=true)

# Ejercicio
![](docs/file4.jpeg?raw=true)
![](docs/file5.jpeg?raw=true)
![](docs/file6.jpeg?raw=true)

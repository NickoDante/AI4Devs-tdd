-----
IDE Usado
-----

Cursor + Claude-3.7-sonnet

# PREPARACION DEL PROYECTO

-----
PROMPT #1
-----

Eres un Desarrollador senior full-stack experto en aplicaciones con tecnologias en frontEnd como React, y en backend en Express usando Prisma. Actualmente tenemos este proyecto llamado "LTI" que es una aplicacion ATS como sistema de seguimiento de Talento. Lee atentamente el @README.md  del proyecto para que tengas el contexto completo de todo el proyecto. No ejecutes nada aun.

-----
PROMPT #2
-----

Necesito preparar este proyecto para poder ejecutar test unitarios desde la consola, usando el comando "npm test". 

Como nuestro codigo esta escrito en Typescript,  me indican que la mejor opcion es usar "ts-jest", por lo que ejecute a mano 3 comandos para configurar el entorno: 

* npm i -D jest typescript
* npm i -D ts-jest @types/jest
* npx ts-jest config:init

Los 3 comandos de consola funcionaron sin problema. Ahora, quiero me indiques paso a paso, como prepararás este proyecto para empezar a hacer test unitarios con el comando "npm test", y si hace falta algo adicional para hacerlo. No programes nada aun, ni crees de momento tests unitarios, solo quiero que me expliques si falta algo de estructura, antes de comenzar a crear el primer test. Te recuerdo que nunca he hecho esto, por lo que necesito que me lo expliques de forma clara, como si fuese un estudiante que aprende.

-----
PROMPT #3
-----

Vamos a crear un primer test de prueba. Sera un test muy sencillo de la suma de dos numeros. Para ello: 

1) Crea el archivo en lenguaje typescript, donde se aloje la funcion de suma de dos numeros. su nombre sera "addNumbers.ts"
2) Crea la carpeta "test" dentro de la carpeta @src para guardar todos nuestros tests unitarios.
3) Crea el test unitario en typescript para la funcion del paso 1. Su nombre sera ""addNumbers.test.ts""

Manten el ejemplo lo mas sencillo posible para que pueda entenderlo. No es necesario que ejecutes el test unitario, tan solo deja todos los archivos listos para que yo ejecute el test unitario de manera manual. 

# TEST unitarios

-----
PROMPT #4
-----

El test funciono perfecto! Ya tenemos un entorno estable y funcional para pruebas unitarias. Ahora vamos a crear una suite de test unitarios en Jest para la funcionalidad de insertar candidatos en base de datos. 

Busca en donde se esta haciendo la funcionalidad en todo el proyecto, y lee y entiende la manera en que funciona. Explicamelo de forma clara. No ejecutes codigo aun.

-----
PROMPT #5
-----

Hay 2 familias principales de tests, recepción de los datos del formulario, y guardado en la base de datos.

Teniendo claro el flujo que se usa para la funcionalidad de añadir candidatos, podrias listarme 5 test unitarios que podriamos realizar para cada familia principal de test? Regresamelos en el siguiente formato:

FAMILIA #1: [Nombre de la familia]

1. Titulo: [Titulo del test]
Dificultad: [Dificultad de implementacion]
Explicacion: [Explica porque es importante hacerlo]
...

No incluyas test que necesiten Mock de la base de datos aun. No ejecutes codigo.

-----
PROMPT #6
-----

Con la lista, vamos a desarrollar las pruebas unitarias. Para la familia de Recepcion y datos de formulario, crea los test unitarios "Validacion de email con formato correcto", "Rechazo de email con formato incorrecto", y "Validacion de objeto de educacion". Para la creacion de estos test unitarios ten presente: 

CRITERIOS
1. Deben estar alojados en @tests-NNB.test.ts 
2. Usa nombres en Ingles para variables y funciones. Los comentarios dejalos en español para entender lo que se esta haciendo.
3. Utiliza nombres de funciones de prueba descriptivos que indiquen claramente lo que se esta haciendo.
4. Usa patron Arrange--Act-Assert para mejorar la legibilidad
5. Parametriza las pruebas que sigan un patron similar
6. Usa mensajes de afirmación, por si la prueba sale mal, para detectarla rapidamente.

Recuerda mantener el codigo lo mas sencillo y simple posible, y asegurarte de que las pruebas unitarias puedan pasar sin problema. 

-----
PROMPT #7
-----

Las pruebas unitarias nuevas funcionan! Continuamos con la familia de Guardado en la base de datos. Crea los test unitarios "Creacion correcta de instancia de Candidate", "Construccion de objeto Education a partir de datos brutos" y "Construccion de objeto WorkExperience con fechas correctas". Para ello 

1. Como estamos creando una familia distinta, organiza los test unitarios en el archivo. Usa un separador en el codigo de la siguiente manera, para saber donde esta agrupado cada grupo de pruebas.
```
//------------------------------------------------------------------------
//                          FAMILIA [Nombre de la familia]
//------------------------------------------------------------------------
```
2. Aplica al lista de criterios antes mencionada cuando creamos la lista de pruebas unitarias de la familia de Recepcion y datos del Formulario.

Recuerda mantener el codigo lo mas sencillo y simple posible, y asegurarte de que las pruebas unitarias puedan pasar sin problema. 

-----
PROMTP #8
-----

Aunque para este proyecto no es necesario aun, vamos a crear un solo test unitario modificando algo en la base de datos, usando la tecnica de Mock de datos. Revisa el proyecto completo, y listame 10 pruebas unitarias que puedan usar esta tecnica.  Estas pruebas tecnicas deben ser distintas a las que ya tenemos implementadas. No programes nada, solo quiero que listes las pruebas, con su dificultad y su explicacion.

-----
PROMPT #9
-----

Crea la prueba unitaria "Comprobar que la ruta POST /candidates llama al controlador correcto" usando el Mock de datos. Para esto: 

1. Debe estar alojado en @tests-NNB.test.ts 
2. Usa primero el separador
```
//------------------------------------------------------------------------
//                          BONUS: MOCK DE DATOS
//------------------------------------------------------------------------
```
3. Considera todos los criterios y parametros desde el punto 3 al 7, que aplicamos para las pruebas unitarias de la familia "Guardado en base de datos". 

Recuerda mantener el codigo lo mas sencillo y simple posible, y asegurarte de que la prueba unitaria pueda pasar sin problema.
Hola Nico del futuro, esto probablemente te sea util, pero te indicare como hice para que funcionara la tarea 1 de la sesion 7 paso a paso:

Recursos: 
- En Discord tienes el canal master-ai-4-devs. Ahi hay un separador para la sesion 7.

----------------------------
PASO 1: CLONAR EL PROYECTO
----------------------------

Hice Fork del proyecto de AI4Devs, y me lo traje a mi maquina local con SourceTree. El proyecto ya era un proyecto en teoria funcional en HTML y que conecta a una base de datos.

----------------------------
PASO 2: CONFIGURAR EL PROYECTO
----------------------------

Segun los prompts que hice en Discord, empece haciendo los pasos para

1. Hacer npm install del frontend
2. Hacer npm install del backend
3. Construir el backend
4. Iniciar el backend
5. Construir el frontend
6. Iniciar el frontend

----------------------------
PASO 2: INSTALAR DOCKER
----------------------------

Era la primera vez que veias Docker, asi que decidi lanzarme con toda para ver como funciona. Tenias tambien instrucciones claras en el Discord gracias a la IA, y eso fue lo que hicimos.

1. Descargamos Docker Desktop
2. Instalamos
3. Iniciamos... Aqui hubo un problema, por el que no lo usamos la vez pasada, y lo puedes ver aqui: 
https://claude.ai/chat/c1b5008c-5c11-4c62-b44d-82f6631066fa 

Lo que recomendaron fue un par de pasos, pero luego le pasaste todo el log, y ahi dio con el problema: Era la virtualizacion que tocaba activar en la BIOS.
Lo hiciste usando la tecla "Delete" y buscando la opcion SVM Mode para HABILITARLA. Luego de eso, y de reiniciar la maquina, Docker funciono.

4. Abrir Docker denuevo y hacer Update si es necesario.
5. En la raiz del proyecto, ejecutamos docker-compose up -d para iniciar
6. Entrar en Cursor, y modificar el archivo de "schema.prisma", con el URL que estaba en el ".env"
7. Ejecutar en el lugar donde este el schema.prisma el comando "npx prisma migrate dev"

----------------------------
PASO 3: PROBAR TODO EL FLUJO
----------------------------

En este punto, decidiste probar el frontend, incluyendo un candidato pormedio de web pero te decia que "la base de datos estaba desconectada".

Decidiste cerrarlo todo y volver a repetir: 
1. El PASO 2: CONFIGURAR EL PROYECTO completo
2. Ya como Docker estaba instalado, solo lo abriste
3. Luego de abierto, seguiste los pasos del README del proyecto dado por AI4Devs. Comenzaste con "docker-compose up -d"
4. Luego te fuiste con "npx prisma migrate dev" en el lugar donde estaba el schema.prisma
5. Con todo esto, te fuiste a la web de frontend y añadiste el ejemplo del README, añadiendo incluso el archivo PDF. 

Y HUBO EXITO!

6. Segun lo que dijo la IA en Discord, podemos ir a la carpeta backend y hacer "npx prisma studio" para ver la interfaz de las tablas creadas.
7. Detuvimos el docker con "docker-compose down"

----------------------------
PASO 4: INSTALAR JEST
----------------------------

Aqui venia el gran problema, porque aqui nos quedamos cuando lo intentamos hacer en TG. Segun el requerimiento, teniamos dos tutoriales para saber como prepararnos para los tests: 
-https://medium.com/@angelygranados/c%C3%B3mo-empezar-a-hacer-unit-testing-con-jest-gu%C3%ADa-b%C3%A1sica-ca6d9654672
-https://jestjs.io/es-ES/docs/getting-started

Pero como estamos en Typescript, teniamos este adicional:
- https://github.com/kulshekhar/ts-jest

Decidimos irnos por ese ultimo porque aparecian 4 comandos que no habias probado.

Prerequisites	---		npm i -D jest typescript	
Installing		---		npm i -D ts-jest @types/jest	
Creating config ---		npx ts-jest config:init
Running tests	---		npm test or npx jest

Asi que lo intentamos... Y fracasamos en el segundo jaja. Sin embargo, se lo preguntamos a Claude, https://claude.ai/chat/c1b5008c-5c11-4c62-b44d-82f6631066fa y nos dio el paso a paso: 

1. **Instalar Typescript primero** en carpeta backend
npm install -D typescript

2. **Instala Jest y sus tipos sin usar el paquete typings** en la carpeta raiz del proyecto
npm install -D jest ts-jest @types/jest

3. **Limpieza de caché (si es necesario)** en cualquier carpeta
npm cache clean --force

4. **Verificamos versiones** en cualquier carpeta
node -v
npm -v

Luego de eso, nos lanzamos directo a hacer el Creating Config.

----------------------------
PASO 5: ESTRUCTURA Y PRIMERA PRUEBA UNITARIA
----------------------------

Ya aqui, fue ir a Cursor: 
1. Darle el contexto primero del Readme.md
2. Decirle que ya estabamos configurando las pruebas unitarias y que revisara lo que nos hacia falta.
3. Creamos el ejemplo. 

Para mas info, aqui te puede ir a los prompts que enviaste. 

4. Cuando ya todos los archivos estuvieron listos, solo fue ir a la carpeta backend y ejecutar "npm test". 
Y FUNCIONO ! 

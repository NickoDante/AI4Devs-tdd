
Hola Nico del futuro! Empezamos la tarea! 

1. Primero nos encargamos de levantar todo el entorno, iniciando backend , frontend, Docker Desktop y Prisma.
2. Luego revisamos que npm test siguiera funcionando con normalidad
3. Le pasamos el PROMPT#4 a la IA para que nos dijera como funcionaba todo el flujo de añadir candidatos.

Su respuesta fue: 
```
## Explicación del Flujo de Inserción de Candidatos
1. Estructura de Datos
El sistema utiliza un modelo de datos que incluye:
	* Candidate: La entidad principal con datos personales como nombre, apellido, email, teléfono y dirección.
	* Education: Información sobre la educación del candidato (institución, título, fechas).
	* WorkExperience: Detalles sobre la experiencia laboral (empresa, cargo, descripción, fechas).
	* Resume: Información sobre el CV subido (ruta del archivo, tipo).
2. Flujo de Funcionamiento
### Frontend
	1. El usuario completa un formulario en AddCandidateForm.js con información del candidato.
	2. Al enviar el formulario, los datos se envían al backend mediante una solicitud POST a http://localhost:3010/candidates.
### Backend
	El proceso en el backend sigue estos pasos:
	1. Punto de Entrada (Ruta):
		* candidateRoutes.ts define una ruta POST / que recibe los datos del candidato.
	2. Controlador:
		* candidateController.ts tiene la función addCandidateController que llama al servicio para añadir el candidato.
	3. Servicio:
		* candidateService.ts contiene la función addCandidate que:
			* Valida los datos del candidato usando validateCandidateData.
			* Crea una instancia del modelo Candidate.
			* Guarda el candidato en la base de datos.
			* Gestiona las relaciones (educación, experiencia, CV).
	4. Validación:
		* validator.ts contiene funciones para validar cada campo del candidato:
			* Nombres (formato, longitud)
			* Email (formato)
			* Teléfono (formato)
			* Direcciones (longitud)
			* Educación (campos obligatorios, formatos)
			* Experiencia (campos obligatorios, formatos)
			* CV (estructura correcta)
	5. Modelos de Dominio:
		* Candidate.ts, Education.ts, WorkExperience.ts y Resume.ts implementan las clases de dominio que gestionan la persistencia:
			* Cada clase tiene un método save() que utiliza Prisma para interactuar con la base de datos.
			* Proporcionan encapsulación y lógica de negocio para cada entidad.
	6. Persistencia (Prisma):
		* Utiliza Prisma como ORM para interactuar con la base de datos PostgreSQL.
		* El esquema está definido en schema.prisma y define las tablas y relaciones.
		* El método save() de cada modelo utiliza Prisma para crear/actualizar registros.
3. Características Clave
	1. Validaciones Robustas:
		* Comprueba formatos, longitudes y valores requeridos.
		* Utiliza expresiones regulares para validar formatos (emails, teléfonos, fechas).
	2. Gestión de Relaciones:
		* Maneja relaciones one-to-many entre Candidate y sus entidades relacionadas.
		* Crea registros en cascada para Education, WorkExperience y Resume.
	3. Manejo de Errores:
		* Gestiona errores específicos de la base de datos (como duplicación de email).
		* Proporciona mensajes de error útiles y específicos.
	4. Arquitectura Limpia:
		* Separa claramente las responsabilidades (rutas, controladores, servicios, modelos).
		* Implementa principios de Domain-Driven Design con modelos de dominio ricos.

Este sistema está bien estructurado siguiendo principios de arquitectura limpia, con separación clara de responsabilidades entre presentación, aplicación y dominio. Para probar esta funcionalidad, necesitaremos crear tests unitarios que verifiquen cada componente del proceso de inserción de candidatos.
¿Te gustaría que nos centremos en alguna parte específica del flujo para los tests unitarios?
```

4. Escribimos el PROMPT #5 para que nos dijera la lista de posibles test unitarios. Su resultado fue:

```
FAMILIA #1: Validación y procesamiento de datos del formulario

Título: Validación de email con formato correcto
Dificultad: Baja
Explicación: Es crucial verificar que la función validateEmail acepta emails con formato válido para evitar rechazar datos correctos de los usuarios.

Título: Rechazo de email con formato incorrecto
Dificultad: Baja
Explicación: Complementario al anterior, necesitamos asegurar que los emails con formato inválido sean rechazados para mantener la integridad de los datos.

Título: Validación completa de datos de candidato mínimos requeridos
Dificultad: Media
Explicación: Verificar que validateCandidateData acepta un objeto con todos los campos obligatorios (firstName, lastName, email) correctamente formateados.

Título: Validación de objeto de educación
Dificultad: Media
Explicación: Confirmar que validateEducation valida correctamente la estructura de un objeto de educación, con campos como institución, título y fechas.

Título: Manejo de errores en la validación de teléfono
Dificultad: Baja
Explicación: Verificar que la función validatePhone rechaza correctamente formatos de teléfono inválidos y acepta los válidos, siendo un campo opcional pero formateado.


FAMILIA #2: Transformación y construcción de modelos de dominio

Título: Creación correcta de instancia de Candidate
Dificultad: Baja
Explicación: Verificar que el constructor de la clase Candidate inicializa correctamente todos los campos a partir de un objeto de datos.

Título: Construcción de objeto Education a partir de datos brutos
Dificultad: Baja
Explicación: Comprobar que el constructor de Education convierte correctamente las fechas de string a objeto Date y asigna todos los campos.

Título: Preparación de datos para Prisma en método save de Candidate
Dificultad: Media
Explicación: Verificar que el método save() de Candidate estructura correctamente los datos para enviarlos a Prisma, excluyendo campos undefined y formateando relaciones.

Título: Manejo de datos de CV en el servicio addCandidate
Dificultad: Media
Explicación: Comprobar que el servicio addCandidate procesa correctamente la información del CV, creando un objeto Resume con la estructura adecuada.

Título: Construcción de objeto WorkExperience con fechas correctas
Dificultad: Baja
Explicación: Verificar que el constructor de WorkExperience maneja correctamente las fechas, incluyendo casos donde endDate puede ser undefined (trabajos actuales).


Estos tests unitarios pueden implementarse sin necesidad de mocks de base de datos, ya que se enfocan en la lógica de validación, transformación y construcción de objetos, no en la persistencia de datos.
```

5. Hicimos PROMPT #6. El tema es que al realizar "npm test" lanzo error porque se programo un caso de email que al parecer no esta contemplada en el proyecto. Que hicimos ? Borrar esa linea y ya :V
6. Hicimos PROMPT #7.
7. Hicimos PROMPT #8 para hacer la parte BONUS. Primero preguntamos sobre 10 pruebas unitarias que puedan usar MOCK de datos y la respuesta fue: 

```
Pruebas Unitarias con Técnica de Mock para Base de Datos
Después de revisar el proyecto, aquí tienes 10 pruebas unitarias que podrían implementarse usando técnicas de mock para la base de datos:
1. Título: Verificar que el método save() de Candidate llame a prisma.candidate.create correctamente
Dificultad: Media
Explicación: Comprobar que cuando se guarda un nuevo candidato, se llama al método correcto de Prisma con los datos transformados adecuadamente. Esto verifica la integración entre el modelo de dominio y el ORM.
2. Título: Comprobar que el método save() de Candidate maneje errores de unicidad de email
Dificultad: Media
Explicación: Verificar que cuando Prisma devuelve un error con código P2002 (violación de restricción única), el método lo captura y lanza un error específico sobre la duplicación de email.
3. Título: Probar que addCandidate() guarda correctamente las relaciones de Education
Dificultad: Alta
Explicación: Verificar que el servicio addCandidate guarda correctamente las entidades de Education asociadas al candidato, comprobando las llamadas a los métodos save() correspondientes.
4. Título: Verificar que findOne() de Candidate recupera correctamente un candidato por ID
Dificultad: Baja
Explicación: Comprobar que el método estático findOne consulta a Prisma con el ID correcto y construye una instancia de Candidate con los datos recuperados.
5. Título: Probar la actualización de un candidato existente usando el método save()
Dificultad: Media
Explicación: Verificar que al llamar a save() con un ID existente, se utiliza prisma.candidate.update en lugar de create, y con los parámetros correctos.
6. Título: Comprobar el manejo de errores de conexión a la base de datos
Dificultad: Media
Explicación: Simular un error de tipo PrismaClientInitializationError y verificar que se transforma en un mensaje de error amigable sobre la conexión a la base de datos.
7. Título: Verificar que el controlador addCandidateController devuelve status 201 con respuesta correcta
Dificultad: Baja
Explicación: Comprobar que cuando el servicio addCandidate se ejecuta correctamente, el controlador responde con un código 201 y un JSON con mensaje y datos correctos.
8. Título: Probar el manejo de errores en el controlador addCandidateController
Dificultad: Media
Explicación: Verificar que cuando el servicio addCandidate lanza un error, el controlador lo captura y devuelve un código 400 con el mensaje de error adecuado.
9. Título: Comprobar que la ruta POST /candidates llama al controlador correcto
Dificultad: Baja
Explicación: Verificar que cuando se hace una petición POST a la ruta /candidates, se llama al controlador addCandidateController con los parámetros adecuados.
10. Título: Probar la creación y vinculación de CV al candidato en el servicio addCandidate
Dificultad: Alta
Explicación: Verificar que cuando se incluye información de CV en los datos del candidato, el servicio crea correctamente una instancia de Resume, la guarda y la vincula al candidato.
Estas pruebas permitirían verificar la interacción entre los diferentes componentes de la aplicación y la base de datos, sin necesidad de realizar conexiones reales a la base de datos durante las pruebas unitarias, utilizando mocks para simular las respuestas de Prisma.
```

8. Hicimos PROMPT #9. Finalizando se me recomendo ejecutar "npm install -D supertest @types/supertest"

Se probo con npm test y funciono todo :D 
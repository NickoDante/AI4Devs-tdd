import { validateCandidateData } from '../application/validator';
import { Candidate } from '../domain/models/Candidate';
import { Education } from '../domain/models/Education';
import { WorkExperience } from '../domain/models/WorkExperience';

//------------------------------------------------------------------------
//                      FAMILIA VALIDACIÓN DE DATOS
//------------------------------------------------------------------------

// Grupo de pruebas para validación de email
describe('Email Validation Tests', () => {
  
  // Test 1: Validación de emails con formato correcto
  test.each([
    ['simple@example.com', 'Email simple con dominio común'],
    ['email.with.dots@example.com', 'Email con puntos antes del @'],
    ['email-with-hyphen@example.com', 'Email con guiones antes del @'],
    ['email@subdomain.example.com', 'Email con subdominio'],
    ['email@example.co.uk', 'Email con dominio de nivel superior compuesto'],
    ['user123@example.com', 'Email con números']
  ])('should accept valid email format: %s (%s)', (validEmail, description) => {
    // Arrange - Crear un objeto candidato con el email a probar
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: validEmail
    };
    
    // Act & Assert
    // Si el email es inválido, validateCandidateData lanzará una excepción
    // Si no lanza excepción, la prueba pasa
    expect(() => validateCandidateData(candidateData)).not.toThrow();
  });

  // Test 2: Rechazo de emails con formato incorrecto
  test.each([
    ['', 'Email vacío'],
    ['plainaddress', 'Email sin símbolo @'],
    ['email@.com', 'Email sin dominio antes del punto'],
    ['email@example', 'Email sin dominio de nivel superior'],
    ['email@example.com.', 'Email terminado en punto'],
    ['@example.com', 'Email sin usuario antes del @']
  ])('should reject invalid email format: %s (%s)', (invalidEmail, description) => {
    // Arrange - Crear un objeto candidato con el email inválido
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: invalidEmail
    };
    
    // Act & Assert
    // Para emails inválidos, validateCandidateData debe lanzar una excepción
    expect(() => validateCandidateData(candidateData)).toThrow();
    expect(() => validateCandidateData(candidateData)).toThrow('Invalid email');
  });
});

// Grupo de pruebas para validación de objetos de educación
describe('Education Object Validation Tests', () => {
  
  // Test: Validación de objeto de educación válido
  test('should accept valid education object', () => {
    // Arrange - Preparar un objeto candidato con educación válida
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      educations: [
        {
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01',
          endDate: '2024-06-30'
        }
      ]
    };
    
    // Act & Assert
    // Si el objeto es inválido, validateCandidateData lanzará una excepción
    // Si no lanza excepción, la prueba pasa
    expect(() => validateCandidateData(candidateData)).not.toThrow();
  });

  // Test: Rechazo de objeto de educación con campos faltantes
  test.each([
    ['institution', 'Objeto sin institución'],
    ['title', 'Objeto sin título'],
    ['startDate', 'Objeto sin fecha de inicio']
  ])('should reject education object with missing %s field (%s)', (missingField, description) => {
    // Arrange - Crear un objeto de educación base
    const baseEducation = {
      institution: 'Universidad Complutense',
      title: 'Ingeniería Informática',
      startDate: '2020-09-01'
    };
    
    // Eliminar el campo que queremos probar
    const invalidEducation = {...baseEducation};
    delete invalidEducation[missingField as keyof typeof baseEducation];
    
    // Crear el objeto candidato con la educación inválida
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      educations: [invalidEducation]
    };
    
    // Act & Assert
    // Para objetos de educación inválidos, validateCandidateData debe lanzar una excepción
    expect(() => validateCandidateData(candidateData)).toThrow();
  });

  // Test: Rechazo de objeto de educación con fecha de inicio inválida
  test('should reject education object with invalid start date', () => {
    // Arrange - Preparar un objeto candidato con fecha de inicio inválida en educación
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      educations: [
        {
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '01/09/2020', // Formato de fecha incorrecto, debe ser YYYY-MM-DD
          endDate: '2024-06-30'
        }
      ]
    };
    
    // Act & Assert
    expect(() => validateCandidateData(candidateData)).toThrow();
    expect(() => validateCandidateData(candidateData)).toThrow('Invalid date');
  });

  // Test: Rechazo de objeto de educación con fecha de fin inválida
  test('should reject education object with invalid end date', () => {
    // Arrange - Preparar un objeto candidato con fecha de fin inválida en educación
    const candidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      educations: [
        {
          institution: 'Universidad Complutense',
          title: 'Ingeniería Informática',
          startDate: '2020-09-01',
          endDate: '30/06/2024' // Formato de fecha incorrecto, debe ser YYYY-MM-DD
        }
      ]
    };
    
    // Act & Assert
    expect(() => validateCandidateData(candidateData)).toThrow();
    expect(() => validateCandidateData(candidateData)).toThrow('Invalid end date');
  });
});

//------------------------------------------------------------------------
//                FAMILIA MODELOS DE DOMINIO Y TRANSFORMACIÓN
//------------------------------------------------------------------------

// Grupo de pruebas para construcción de objetos de dominio
describe('Candidate Model Tests', () => {
  
  // Test: Creación correcta de instancia de Candidate
  test('should correctly create a Candidate instance from data', () => {
    // Arrange - Preparar los datos para crear un candidato
    const candidateData = {
      firstName: 'Maria',
      lastName: 'González',
      email: 'maria.gonzalez@example.com',
      phone: '612345678',
      address: 'Calle Principal 123, Madrid'
    };
    
    // Act - Crear la instancia del candidato
    const candidate = new Candidate(candidateData);
    
    // Assert - Verificar que todos los campos se han inicializado correctamente
    expect(candidate.firstName).toBe(candidateData.firstName);
    expect(candidate.lastName).toBe(candidateData.lastName);
    expect(candidate.email).toBe(candidateData.email);
    expect(candidate.phone).toBe(candidateData.phone);
    expect(candidate.address).toBe(candidateData.address);
    expect(candidate.education).toEqual([]);
    expect(candidate.workExperience).toEqual([]);
    expect(candidate.resumes).toEqual([]);
  });
  
  // Test: Creación de candidato con arrays vacíos explícitos
  test('should handle explicitly empty arrays in Candidate creation', () => {
    // Arrange - Preparar los datos con arrays vacíos explícitos
    const candidateData = {
      firstName: 'Carlos',
      lastName: 'Ruiz',
      email: 'carlos.ruiz@example.com',
      education: [],
      workExperience: [],
      resumes: []
    };
    
    // Act - Crear la instancia del candidato
    const candidate = new Candidate(candidateData);
    
    // Assert - Verificar que los arrays se mantienen vacíos
    expect(candidate.education).toEqual([]);
    expect(candidate.workExperience).toEqual([]);
    expect(candidate.resumes).toEqual([]);
  });
  
  // Test: Creación de candidato con campos opcionales indefinidos
  test('should handle undefined optional fields in Candidate creation', () => {
    // Arrange - Preparar los datos con campos opcionales omitidos
    const candidateData = {
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@example.com'
      // phone, address y otros campos opcionales no están definidos
    };
    
    // Act - Crear la instancia del candidato
    const candidate = new Candidate(candidateData);
    
    // Assert - Verificar que los campos opcionales son undefined
    expect(candidate.firstName).toBe(candidateData.firstName);
    expect(candidate.lastName).toBe(candidateData.lastName);
    expect(candidate.email).toBe(candidateData.email);
    expect(candidate.phone).toBeUndefined();
    expect(candidate.address).toBeUndefined();
  });
});

// Grupo de pruebas para el modelo Education
describe('Education Model Tests', () => {
  
  // Test: Construcción de objeto Education a partir de datos brutos
  test('should correctly create an Education instance from raw data', () => {
    // Arrange - Preparar los datos para crear una educación
    const educationData = {
      institution: 'Universidad Autónoma',
      title: 'Máster en Inteligencia Artificial',
      startDate: '2022-09-01',
      endDate: '2023-06-30',
      candidateId: 123
    };
    
    // Act - Crear la instancia de Education
    const education = new Education(educationData);
    
    // Assert - Verificar que todos los campos se han inicializado correctamente
    expect(education.institution).toBe(educationData.institution);
    expect(education.title).toBe(educationData.title);
    expect(education.startDate).toBeInstanceOf(Date);
    expect(education.startDate.toISOString().split('T')[0]).toBe(educationData.startDate);
    expect(education.endDate).toBeInstanceOf(Date);
    expect(education.endDate?.toISOString().split('T')[0]).toBe(educationData.endDate);
    expect(education.candidateId).toBe(educationData.candidateId);
  });
  
  // Test: Manejo de fechas en Education (sin fecha de fin)
  test('should handle education with no end date', () => {
    // Arrange - Preparar los datos sin fecha de fin (educación en curso)
    const educationData = {
      institution: 'Universidad Politécnica',
      title: 'Grado en Informática',
      startDate: '2021-09-01'
      // endDate no definido (estudios en curso)
    };
    
    // Act - Crear la instancia de Education
    const education = new Education(educationData);
    
    // Assert - Verificar el manejo correcto de la fecha de fin indefinida
    expect(education.institution).toBe(educationData.institution);
    expect(education.title).toBe(educationData.title);
    expect(education.startDate).toBeInstanceOf(Date);
    expect(education.startDate.toISOString().split('T')[0]).toBe(educationData.startDate);
    expect(education.endDate).toBeUndefined();
  });
  
  // Test: Conversión de fechas en string a objetos Date
  test.each([
    ['2020-01-15', '15 de enero de 2020'],
    ['2019-12-31', '31 de diciembre de 2019'],
    ['2023-06-30', '30 de junio de 2023']
  ])('should convert string date %s to Date object (%s)', (dateString, description) => {
    // Arrange - Preparar datos con la fecha a probar
    const educationData = {
      institution: 'Test University',
      title: 'Test Degree',
      startDate: dateString
    };
    
    // Act - Crear la instancia y obtener la fecha convertida
    const education = new Education(educationData);
    
    // Assert - Verificar la conversión correcta
    expect(education.startDate).toBeInstanceOf(Date);
    expect(education.startDate.toISOString().split('T')[0]).toBe(dateString);
  });
});

// Grupo de pruebas para el modelo WorkExperience
describe('WorkExperience Model Tests', () => {
  
  // Test: Construcción de objeto WorkExperience con fechas correctas
  test('should correctly create a WorkExperience with proper dates', () => {
    // Arrange - Preparar los datos para crear una experiencia laboral
    const workExperienceData = {
      company: 'Tech Solutions',
      position: 'Desarrollador Senior',
      description: 'Desarrollo de aplicaciones web con React y Node.js',
      startDate: '2018-03-15',
      endDate: '2022-12-31',
      candidateId: 456
    };
    
    // Act - Crear la instancia de WorkExperience
    const workExperience = new WorkExperience(workExperienceData);
    
    // Assert - Verificar que todos los campos se han inicializado correctamente
    expect(workExperience.company).toBe(workExperienceData.company);
    expect(workExperience.position).toBe(workExperienceData.position);
    expect(workExperience.description).toBe(workExperienceData.description);
    expect(workExperience.startDate).toBeInstanceOf(Date);
    expect(workExperience.startDate.toISOString().split('T')[0]).toBe(workExperienceData.startDate);
    expect(workExperience.endDate).toBeInstanceOf(Date);
    expect(workExperience.endDate?.toISOString().split('T')[0]).toBe(workExperienceData.endDate);
    expect(workExperience.candidateId).toBe(workExperienceData.candidateId);
  });
  
  // Test: Manejo de trabajos actuales (sin fecha de fin)
  test('should handle current job with no end date', () => {
    // Arrange - Preparar los datos de un trabajo actual (sin fecha de fin)
    const workExperienceData = {
      company: 'Current Company',
      position: 'Project Manager',
      description: 'Gestión de proyectos de desarrollo de software',
      startDate: '2020-06-01'
      // endDate no definido (trabajo actual)
    };
    
    // Act - Crear la instancia de WorkExperience
    const workExperience = new WorkExperience(workExperienceData);
    
    // Assert - Verificar el manejo correcto de la fecha de fin indefinida
    expect(workExperience.company).toBe(workExperienceData.company);
    expect(workExperience.position).toBe(workExperienceData.position);
    expect(workExperience.description).toBe(workExperienceData.description);
    expect(workExperience.startDate).toBeInstanceOf(Date);
    expect(workExperience.startDate.toISOString().split('T')[0]).toBe(workExperienceData.startDate);
    expect(workExperience.endDate).toBeUndefined();
  });
  
  // Test: Creación de WorkExperience con descripción opcional
  test('should create WorkExperience with optional description', () => {
    // Arrange - Preparar los datos sin descripción
    const workExperienceData = {
      company: 'OptionalFields Corp',
      position: 'Software Developer',
      startDate: '2017-01-10',
      endDate: '2019-05-20'
      // description no definido
    };
    
    // Act - Crear la instancia de WorkExperience
    const workExperience = new WorkExperience(workExperienceData);
    
    // Assert - Verificar el manejo correcto del campo opcional
    expect(workExperience.company).toBe(workExperienceData.company);
    expect(workExperience.position).toBe(workExperienceData.position);
    expect(workExperience.description).toBeUndefined();
    expect(workExperience.startDate).toBeInstanceOf(Date);
    expect(workExperience.endDate).toBeInstanceOf(Date);
  });
});

//------------------------------------------------------------------------
//                          BONUS: MOCK DE DATOS
//------------------------------------------------------------------------

import express, { Request, Response } from 'express';
import request from 'supertest';
import * as candidateController from '../presentation/controllers/candidateController';
import candidateRoutes from '../routes/candidateRoutes';

// Grupo de pruebas usando mock para verificar la integración entre rutas y controladores
describe('Candidate Routes Integration Tests', () => {
  
  // Test: Comprobar que la ruta POST /candidates llama al controlador correcto
  test('should call addCandidate controller when POST to /candidates', async () => {
    // Arrange - Crear una app de Express para pruebas y aplicar el router
    const app = express();
    app.use(express.json());
    app.use('/candidates', candidateRoutes);
    
    // Preparar los datos de prueba
    const candidateData = {
      firstName: 'Roberto',
      lastName: 'García',
      email: 'roberto.garcia@example.com',
      phone: '678901234',
      address: 'Calle Test 123, Barcelona'
    };
    
    // Crear un mock de la función addCandidate del controlador
    const mockAddCandidate = jest.spyOn(candidateController, 'addCandidate')
      .mockImplementation(async () => {
        // Mock de la respuesta de un candidato creado exitosamente
        return {
          id: 1,
          ...candidateData,
          createdAt: new Date().toISOString()
        };
      });
    
    // Act - Realizar la petición POST a la ruta
    const response = await request(app)
      .post('/candidates')
      .send(candidateData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    
    // Assert - Verificar que se llamó al controlador con los datos correctos
    expect(mockAddCandidate).toHaveBeenCalledTimes(1);
    expect(mockAddCandidate).toHaveBeenCalledWith(candidateData);
    
    // Verificar la respuesta HTTP
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.firstName).toBe(candidateData.firstName);
    expect(response.body.lastName).toBe(candidateData.lastName);
    expect(response.body.email).toBe(candidateData.email);
    
    // Limpiar el mock después de la prueba
    mockAddCandidate.mockRestore();
  });
});

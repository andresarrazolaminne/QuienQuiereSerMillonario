import db from './db.js';

const preguntasPrueba = [
  {
    texto: '¿Cuál es la capital de Francia?',
    opcionA: 'Madrid',
    opcionB: 'París',
    opcionC: 'Roma',
    opcionD: 'Berlín',
    correcta: 'B',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿En qué año llegó el hombre a la Luna?',
    opcionA: '1967',
    opcionB: '1969',
    opcionC: '1971',
    opcionD: '1965',
    correcta: 'B',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Cuántos continentes hay en la Tierra?',
    opcionA: '5',
    opcionB: '6',
    opcionC: '7',
    opcionD: '8',
    correcta: 'C',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Qué planeta es conocido como el Planeta Rojo?',
    opcionA: 'Venus',
    opcionB: 'Júpiter',
    opcionC: 'Marte',
    opcionD: 'Saturno',
    correcta: 'C',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Cuál es el océano más grande del mundo?',
    opcionA: 'Atlántico',
    opcionB: 'Índico',
    opcionC: 'Pacífico',
    opcionD: 'Ártico',
    correcta: 'C',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Quién pintó la Mona Lisa?',
    opcionA: 'Miguel Ángel',
    opcionB: 'Vincent van Gogh',
    opcionC: 'Leonardo da Vinci',
    opcionD: 'Pablo Picasso',
    correcta: 'C',
    nivel: 2,
    valor: 500
  },
  {
    texto: '¿Cuál es el río más largo del mundo?',
    opcionA: 'Amazonas',
    opcionB: 'Nilo',
    opcionC: 'Misisipi',
    opcionD: 'Yangtsé',
    correcta: 'B',
    nivel: 2,
    valor: 500
  },
  {
    texto: '¿En qué país se encuentra la Torre Eiffel?',
    opcionA: 'Italia',
    opcionB: 'España',
    opcionC: 'Francia',
    opcionD: 'Alemania',
    correcta: 'C',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Cuántos lados tiene un hexágono?',
    opcionA: '5',
    opcionB: '6',
    opcionC: '7',
    opcionD: '8',
    correcta: 'B',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Qué elemento químico tiene el símbolo Au?',
    opcionA: 'Plata',
    opcionB: 'Oro',
    opcionC: 'Aluminio',
    opcionD: 'Argón',
    correcta: 'B',
    nivel: 2,
    valor: 500
  },
  {
    texto: '¿Cuál es el país más grande del mundo por superficie?',
    opcionA: 'China',
    opcionB: 'Estados Unidos',
    opcionC: 'Canadá',
    opcionD: 'Rusia',
    correcta: 'D',
    nivel: 2,
    valor: 500
  },
  {
    texto: '¿Qué planeta está más cerca del Sol?',
    opcionA: 'Venus',
    opcionB: 'Mercurio',
    opcionC: 'Tierra',
    opcionD: 'Marte',
    correcta: 'B',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿En qué continente se encuentra Egipto?',
    opcionA: 'Asia',
    opcionB: 'Europa',
    opcionC: 'África',
    opcionD: 'Oceanía',
    correcta: 'C',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Cuántas horas tiene un día?',
    opcionA: '20',
    opcionB: '24',
    opcionC: '12',
    opcionD: '48',
    correcta: 'B',
    nivel: 1,
    valor: 100
  },
  {
    texto: '¿Quién escribió "Don Quijote de la Mancha"?',
    opcionA: 'Gabriel García Márquez',
    opcionB: 'Miguel de Cervantes',
    opcionC: 'Federico García Lorca',
    opcionD: 'Pablo Neruda',
    correcta: 'B',
    nivel: 2,
    valor: 500
  }
];

const stmt = db.prepare(`
  INSERT INTO preguntas (texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

let count = 0;
for (const p of preguntasPrueba) {
  stmt.run(p.texto, p.opcionA, p.opcionB, p.opcionC, p.opcionD, p.correcta, p.nivel, p.valor ?? 100);
  count++;
}

console.log(`Se insertaron ${count} preguntas de prueba.`);

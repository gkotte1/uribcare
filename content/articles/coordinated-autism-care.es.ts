import type { Article } from './types';

/**
 * Spanish twin of `coordinated-autism-care.en.ts`: the same article, translated
 * in full. Slug, section ids and inline links are shared with the English
 * version, so the language switch keeps the reader on the same article and at
 * the same anchor.
 */
export const coordinatedAutismCareEs: Article = {
  slug: 'coordinated-autism-care-why-it-matters',
  category: 'Autismo',
  eyebrow: 'URiBCARE Ideas',
  title: 'Por qué la atención coordinada importa más en condiciones continuas como el autismo',
  description:
    'El cuidado del autismo suele involucrar a varios profesionales que acompañan a un mismo niño durante años. Le explicamos por qué la coordinación entre ellos importa, y cómo se ve la atención conectada en la práctica.',
  readingTime: '6 min de lectura',

  image: {
    src: '/images/blog-coordinated-autism-care.png',
    alt: 'Equipo de atención coordinada del autismo acompañando a un niño con servicios de salud conectados.',
    width: 1536,
    height: 1024,
  },

  sections: [
    {
      id: 'introduction',
      heading: 'Introducción: el autismo como un camino largo y con muchos profesionales',
      blocks: [
        {
          kind: 'p',
          text: 'Para la mayoría de las familias, el cuidado del autismo no es una sola cita ni un tratamiento breve. Es una relación de largo plazo con varios profesionales a la vez: con frecuencia un terapeuta del habla, un terapeuta ocupacional, un terapeuta conductual, un consejero y un pediatra del desarrollo, a quienes se visita de forma habitual, a veces durante años.',
        },
        {
          kind: 'p',
          text: 'Cada uno de estos profesionales aporta una experiencia especializada e imprescindible. Pero cada uno suele ver también solo una parte del panorama completo del niño. Un terapeuta del habla puede no enterarse automáticamente de lo que observó un terapeuta conductual la semana pasada. Un pediatra puede no tener a mano las últimas notas de avance de terapia ocupacional durante una consulta. Por separado, nada de esto es una falla de la atención: es sencillamente la forma en que están estructurados la mayoría de los sistemas de salud, profesional por profesional, expediente por expediente.',
        },
        {
          kind: 'p',
          text: 'El efecto de esa estructura, sin embargo, suele recaer en la familia. Alguien tiene que recordar el historial del desarrollo y repetirlo en cada nueva admisión. Alguien tiene que llevar los informes de una clínica a otra. Alguien tiene que notar cuándo toca un seguimiento y salir a buscarlo. Para familias que ya manejan horarios de terapia, la coordinación con la escuela y la vida diaria, esa carga administrativa adicional es considerable, y casi nunca aparece en las conversaciones sobre “el costo de la atención”, aunque es un costo real y constante de tiempo y de atención.',
        },
      ],
    },
    {
      id: 'coordination-gap',
      heading: 'Cómo se ve realmente una falta de coordinación',
      blocks: [
        {
          kind: 'p',
          text: 'En la práctica, la falta de coordinación aparece de maneras pequeñas pero acumulativas: una evaluación que hay que repetir porque los resultados no se compartieron, un objetivo terapéutico que un profesional desconoce que otro también está trabajando, una receta que no es visible para el terapeuta que sigue los síntomas relacionados, o un seguimiento que simplemente no ocurre porque nadie se hizo cargo de él.',
        },
        {
          kind: 'p',
          text: 'Ninguna de estas brechas es dramática por sí sola. Pero a lo largo de meses y años, que es el horizonte habitual del cuidado del autismo, se suman en trabajo duplicado, un seguimiento del progreso más lento y una familia que, en la práctica, está haciendo el trabajo de coordinación por su cuenta, sin formación ni compensación para ello.',
        },
      ],
    },
    {
      id: 'autism-care-team',
      heading: 'Quiénes suelen formar un equipo de atención del autismo',
      blocks: [
        {
          kind: 'p',
          text: 'Aunque las necesidades de cada niño son distintas y deben determinarlas su equipo clínico, el cuidado del autismo suele apoyarse en una combinación de:',
        },
        {
          kind: 'ul',
          items: [
            'Terapia conductual: apoyo conductual estructurado y guiado por objetivos',
            '[Terapia del habla](/services/speech-therapy): comunicación, lenguaje y, cuando hace falta, enfoques de comunicación alternativa',
            '[Terapia ocupacional](/services/occupational-therapy): regulación sensorial, motricidad fina y rutinas de la vida diaria',
            '[Fisioterapia](/services/physical-therapy): desarrollo motor grueso, coordinación y fuerza',
            '[Consejería](/ecosystem/therapists-counselors): apoyo para el niño y, con frecuencia, para toda la familia',
            '[Atención pediátrica y de especialistas](/ecosystem/doctors-specialists): pediatras del desarrollo y, cuando hace falta, neurólogos o psiquiatras infantiles',
          ],
        },
        {
          kind: 'p',
          text: 'La combinación exacta, y cuánto necesita un niño de cada una, es una decisión clínica que se toma con su equipo de atención, no algo que una plataforma o un artículo deba indicar. Lo que importa aquí es sencillamente que la mayoría de los niños involucra a varios de estos profesionales al mismo tiempo, durante un periodo prolongado.',
        },
      ],
    },
    {
      id: 'coordinated-care-plan',
      heading: 'Qué incluye realmente un plan de atención coordinado',
      blocks: [
        {
          kind: 'p',
          text: 'Un enfoque verdaderamente coordinado del cuidado del autismo suele incluir algunos elementos constantes:',
        },
        {
          kind: 'ol',
          items: [
            'Un historial compartido. Resultados de evaluaciones e historial del desarrollo que no haya que volver a explicar en cada nueva admisión.',
            'Objetivos alineados. Objetivos terapéuticos entre disciplinas, del habla, ocupacionales y conductuales, que trabajen hacia los mismos resultados en lugar de existir por separado.',
            'Progreso visible. El avance de cada sesión registrado y visible para todo el equipo, no guardado solo en las notas privadas de un profesional.',
            'Una sola agenda. Las citas de todos los profesionales en un mismo calendario, en lugar de varios sistemas de reserva separados.',
            'Continuidad. Un plan que sobrevive a un cambio de profesional, de clínica o de ciclo escolar, en vez de empezar de cero cada vez.',
          ],
        },
      ],
    },
    {
      id: 'family-role',
      heading: 'El papel de la familia: acompañar en lugar de organizar',
      blocks: [
        {
          kind: 'p',
          text: 'Uno de los efectos más ignorados de una mala coordinación es lo que le hace al papel de la familia. En lugar de concentrarse en reforzar las estrategias que se usan en terapia, un trabajo genuinamente valioso y respaldado por la evidencia que padres y cuidadores pueden hacer en casa, las familias terminan dedicando un tiempo desproporcionado a la logística: seguir citas, solicitar expedientes y volver a explicar el historial.',
        },
        {
          kind: 'p',
          text: 'Cuando la coordinación se maneja bien, las familias pueden dirigir más energía hacia lo que de verdad ayuda a su hijo en el día a día: reforzar las estrategias de terapia en casa, mantenerse al tanto del progreso y conservar una línea directa con el equipo de atención cuando surgen dudas entre una visita y otra, en vez de actuar como el tejido conectivo entre profesionales que de otro modo no se hablan entre sí.',
        },
      ],
    },
    {
      id: 'coordinated-approach',
      heading: 'Qué buscar en un enfoque coordinado',
      blocks: [
        {
          kind: 'p',
          text: 'Si está evaluando opciones de atención para su familia, vale la pena hacer algunas preguntas directas: ¿los profesionales involucrados comparten información entre ellos, o esa responsabilidad recae en usted? ¿Existe un solo lugar donde ver el historial completo y el plan actual, o son varios? ¿Las citas y los seguimientos se registran de forma centralizada, o necesita llevar su propio sistema para que nada se pierda? Las respuestas suelen decir tanto sobre la calidad de la experiencia de atención como las credenciales de cualquier profesional en particular.',
        },
      ],
    },
    {
      id: 'how-uribcare-approaches-this',
      heading: 'Cómo lo aborda Uribcare',
      blocks: [
        {
          kind: 'p',
          text: 'Este es el problema alrededor del cual se construyó [Uribcare](/), y [la atención del autismo](/autism-care) es el área en la que hemos profundizado más. En la plataforma de Uribcare, las evaluaciones, los objetivos terapéuticos, el avance de las sesiones, las recetas y los resultados de estudios se mantienen en un mismo expediente que puede consultar cada profesional del equipo de atención del niño, y las citas de todos ellos se ubican en un único calendario compartido. Las familias pueden ver las próximas citas, seguir el progreso registrado, escribir al equipo de atención entre visitas y controlar quién tiene acceso al expediente, mientras el trabajo de coordinación que conecta a los profesionales ocurre en la plataforma, en lugar de recaer en la familia.',
        },
        {
          kind: 'p',
          text: 'El criterio clínico siempre corresponde al equipo de atención. Lo que Uribcare busca eliminar es la carga administrativa de mantener unido a ese equipo.',
        },
      ],
    },
    {
      id: 'closing-thoughts',
      heading: 'Reflexiones finales',
      blocks: [
        {
          kind: 'p',
          text: 'El cuidado del autismo es, por naturaleza, una tarea de largo plazo y con muchos profesionales. Eso no es un defecto del sistema: refleja cómo funciona realmente un apoyo integral y eficaz para el autismo. Pero la coordinación entre esos profesionales no tiene por qué quedar en manos de las familias. Cuando la atención se estructura para que el equipo trabaje desde un mismo plan compartido, las familias quedan libres para concentrarse en lo que más importa: acompañar a su hijo.',
        },
      ],
    },
  ],

  cta: {
    heading: 'Descubra cómo Uribcare coordina la atención del autismo en todo el equipo de su hijo.',
    href: '/autism-care',
    action: 'Agendar una consulta',
    actionHref: '/#contact',
  },

  meta: {
    title: 'Atención coordinada del autismo: por qué importa y cómo funciona | Uribcare',
    description:
      'El cuidado del autismo suele implicar cinco o más profesionales que acompañan a un mismo niño durante años. Le explicamos por qué la coordinación entre ellos importa, y cómo se ve en la práctica.',
  },
};

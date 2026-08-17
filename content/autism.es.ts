import type { Detail } from './types';

/**
 * Spanish edition of the autism care page. Slugs, icon, photography and section
 * order match `autism.en.ts` exactly; only the copy differs.
 */
export const AUTISM_CARE_ES: Detail = {
  kind: 'page',
  slug: 'autism-care',
  name: 'Atención del autismo',
  shortDescription:
    'Atención del autismo coordinada, que mantiene a terapeutas, médicos, consejeros y familias trabajando desde un mismo plan compartido.',
  icon: 'therapists',
  eyebrow: 'Donde más a fondo llegamos',
  title: 'Atención del autismo conectada, construida alrededor de cada niño.',
  subtitle:
    'Uribcare reúne en una sola plataforma a los médicos, terapeutas, consejeros, personal de enfermería, laboratorios y farmacias que participan en la atención del autismo, para que todo el equipo trabaje desde el mismo plan y las familias dejen de ser quienes lo sostienen todo.',
  metaDescription:
    'Atención del autismo coordinada en Uribcare: evaluación, diagnóstico, plan personalizado, terapia, seguimiento de la evolución y apoyo a la familia, con cada profesional trabajando desde un mismo expediente compartido.',
  image: {
    src: '/images/autism-care-session.jpg',
    alt: 'Una terapeuta y un niño pequeño chocan las palmas sobre una mesa durante una sesión de juego, con aros apilables y bloques de colores frente a ellos y un cartel que dice “Potential, Progress, Possibilities” en la pared del fondo',
    caption: 'Atención que acompaña al niño: a través de cada profesional y durante años, no solo durante unas citas.',
    aspect: '16 / 9',
  },
  overview: {
    heading: 'La atención del autismo es un trabajo de equipo que dura años',
    paragraphs: [
      'Un niño dentro del espectro autista puede trabajar con un terapeuta del habla, uno ocupacional, uno conductual, un consejero y un pediatra del desarrollo, cada semana y durante mucho tiempo. Cada uno de ellos sostiene una parte del panorama.',
      'Cuando esas partes nunca se encuentran, la familia se convierte en el mensajero: repite la historia en cada admisión, lleva informes de una clínica a otra y persigue la siguiente cita. Ese trabajo de coordinación no se detiene, y recae con más fuerza sobre quienes tienen menos capacidad de absorberlo.',
      'Uribcare existe para cargar con eso en su lugar. Evaluaciones, metas de terapia, evolución de las sesiones, recetas y resultados de estudios viven en un solo expediente que lee todo el equipo, y las citas de todos los profesionales quedan en un mismo calendario.',
    ],
    highlights: [
      'Un equipo de atención, un plan compartido',
      'Terapia, diagnóstico y seguimiento en un calendario',
      'Apoyo a las familias entre una visita y otra',
    ],
  },
  process: {
    eyebrow: 'El recorrido de la atención del autismo',
    heading: 'De la primera inquietud al apoyo de largo plazo',
    intro:
      'Cada familia llega a este recorrido en un punto distinto. Uribcare lo retoma donde usted esté y mantiene cada paso visible para los profesionales que lo necesitan.',
    steps: [
      {
        label: 'Paso 1',
        title: 'Evaluación',
        text: 'Una primera conversación sobre sus inquietudes, la historia del desarrollo y sus prioridades, con asignación a un profesional con la experiencia adecuada, en línea o de forma presencial.',
      },
      {
        label: 'Paso 2',
        title: 'Diagnóstico y valoración',
        text: 'Valoración formal por profesionales calificados, con evaluaciones del habla, ocupacionales y del desarrollo coordinadas, en lugar de que la familia las agende por separado.',
      },
      {
        label: 'Paso 3',
        title: 'Plan de atención personalizado',
        text: 'El equipo acuerda las metas con la familia y las registra en un solo plan, para que cada profesional trabaje hacia los mismos resultados.',
      },
      {
        label: 'Paso 4',
        title: 'Terapia',
        text: 'Sesiones recurrentes de habla, ocupacional, física, conductual y de consejería, agendadas como serie y realizadas donde mejor funcione para la familia.',
      },
      {
        label: 'Paso 5',
        title: 'Seguimiento de la evolución',
        text: 'El avance en cada meta se registra sesión por sesión, para que el cambio sea visible a lo largo de meses y no dependa del recuerdo de cada cita.',
      },
      {
        label: 'Paso 6',
        title: 'Apoyo a la familia',
        text: 'A los cuidadores se les enseñan las estrategias detrás de la terapia y se les da una vía directa con el equipo entre visitas.',
      },
      {
        label: 'Paso 7',
        title: 'Seguimiento continuo',
        text: 'Las revisiones se programan en lugar de dejarse al azar, y el plan se ajusta conforme el niño crece y sus necesidades cambian.',
      },
    ],
  },
  provides: {
    eyebrow: 'Servicios para la atención del autismo',
    heading: 'Las áreas de atención que ayudamos a coordinar',
    intro:
      'Cuáles de estas necesita un niño, y en qué combinación, es una decisión clínica que se toma con su equipo de atención. Uribcare lo conecta con los profesionales y mantiene su trabajo articulado.',
    showcase: true,
    cards: [
      {
        title: 'Terapia conductual',
        text: 'Apoyo conductual estructurado y orientado a metas, a cargo de profesionales calificados, con los objetivos registrados en el plan compartido.',
        icon: 'behavioral',
        href: '/ecosystem/therapists-counselors',
        featured: true,
      },
      {
        title: 'Terapia del habla',
        text: 'Claridad del habla, lenguaje, comunicación social y, cuando hace falta, comunicación aumentativa y vías no verbales.',
        icon: 'speech',
        href: '/services/speech-therapy',
      },
      {
        title: 'Terapia ocupacional',
        text: 'Regulación sensorial, motricidad fina, rutinas de la vida diaria y los ajustes en casa o en el salón que las hacen viables.',
        icon: 'occupational',
        href: '/services/occupational-therapy',
      },
      {
        title: 'Fisioterapia',
        text: 'Desarrollo motor grueso, coordinación, equilibrio y fuerza, con programas para casa que los cuidadores pueden continuar.',
        icon: 'physical',
        href: '/services/physical-therapy',
      },
      {
        title: 'Consejería',
        text: 'Consejería individual, infantil y familiar: apoyo para todo el hogar, no solo para el niño.',
        icon: 'counseling',
        href: '/ecosystem/therapists-counselors',
      },
      {
        title: 'Atención pediátrica y de especialistas',
        text: 'Pediatras del desarrollo, neurólogos infantiles y psiquiatras, consultados en línea o de forma presencial con la historia completa a la mano.',
        icon: 'pediatric',
        href: '/ecosystem/doctors-specialists',
      },
      {
        title: 'Apoyo a la familia',
        text: 'Acompañamiento a madres, padres y cuidadores para que las estrategias usadas en sesión continúen durante una semana común.',
        icon: 'family',
      },
      {
        title: 'Seguimiento y evolución',
        text: 'Revisiones programadas y resultados registrados, para ajustar los planes con evidencia y no de memoria.',
        icon: 'progress',
        href: '/ecosystem/connected-record',
      },
    ],
  },
  audience: {
    eyebrow: 'Atención coordinada',
    heading: 'Un niño, un plan, un equipo',
    groups: [
      {
        tone: 'cool',
        tag: 'Cómo trabajan juntos los profesionales',
        title: 'Todos ven el mismo panorama',
        points: [
          'Las evaluaciones e informes se comparten en lugar de volver a solicitarse',
          'Las metas de habla, ocupacionales y conductuales se alinean, no compiten',
          'Las remisiones viajan con la historia del desarrollo adjunta',
          'Recetas y resultados de laboratorio llegan al mismo expediente',
          'Un cambio hecho por un profesional queda visible para el resto del equipo',
        ],
      },
      {
        tone: 'warm',
        tag: 'Lo que eso cambia para el niño',
        title: 'Menos huecos, menos repetición',
        points: [
          'No empezar de cero con cada nuevo profesional',
          'Tiempo de terapia dedicado a la terapia, no a reexplicar la historia',
          'Estrategias consistentes entre la casa, el consultorio y la escuela',
          'Continuidad cuando cambia un profesional o un entorno',
          'Un solo expediente que crece con el niño a lo largo de los años',
        ],
      },
    ],
  },
  benefits: {
    eyebrow: 'Por qué importa la coordinación',
    heading: 'Lo que las familias notan cuando la atención está articulada',
    intro: 'Las ganancias son prácticas: menos gestiones, menos huecos y más semana dedicada a la atención misma.',
    cards: [
      { title: 'Un solo calendario', text: 'Cada sesión de terapia, consulta y revisión en una misma agenda con recordatorios.' },
      { title: 'Una sola historia', text: 'Contada una vez y disponible para todos a quienes usted haya dado acceso.' },
      { title: 'Evolución visible', text: 'Metas y resultados registrados a lo largo de meses, no guardados en la memoria.' },
      { title: 'Continuidad', text: 'El plan sobrevive a un cambio de profesional, de clínica o de ciclo escolar.' },
    ],
  },
  support: {
    eyebrow: 'Apoyo a familias y cuidadores',
    heading: 'Las familias son parte del equipo de atención, no los mensajeros entre sus miembros',
    text: 'La mayor parte de la semana de un niño ocurre fuera del consultorio. Uribcare da a los cuidadores la visibilidad y el contacto directo que necesitan para sostener el plan durante ese tiempo, y les quita de encima el trabajo de coordinación.',
    points: [
      'Vea las próximas citas de todos los profesionales en un solo lugar',
      'Siga las metas de terapia y la evolución registrada conforme se actualizan',
      'Escriba al equipo de atención entre visitas, sin perseguir llamadas',
      'Aprenda las estrategias detrás de cada terapia para continuarlas en casa',
      'Controle quién puede acceder al expediente, y retire ese acceso cuando quiera',
      'Mantenga remisiones, recetas y resultados juntos en una sola historia',
    ],
    quote: 'Usted nunca debería ser quien mantiene unida la atención de su hijo. Ese es nuestro trabajo.',
    quoteWho: 'El equipo de atención de Uribcare',
  },
  cta: {
    heading: 'Comience el recorrido de atención de su familia',
    text: 'Cuéntenos en qué punto está: primeras inquietudes, un diagnóstico reciente o un equipo que ya trabaja pero necesita articularse. Lo conectaremos con los profesionales indicados, normalmente en menos de un día.',
    primary: { label: 'Agendar una consulta', href: '/#contact' },
    secondary: { label: 'Registrarme como paciente', href: '/register' },
    note: 'Preparado para HIPAA · Atención en línea y presencial · No se requiere tarjeta de crédito',
  },
};

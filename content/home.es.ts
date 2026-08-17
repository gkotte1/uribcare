import type { HomeContent } from './home.en';

/** Spanish edition of the home page copy. Typed against the English shape. */
export const homeEs: HomeContent = {
  hero: {
    eyebrow: 'Un ecosistema de atención conectado',
    titleBefore: 'Una sola plataforma para ',
    titleAccent: 'todo',
    titleAfter: ' el recorrido de salud.',
    lead: 'Uribcare conecta a los pacientes con los médicos, terapeutas, consejeros, enfermeras, farmacias y laboratorios que necesitan, coordinados en un solo lugar, en línea o de forma presencial. La atención del autismo es donde más a fondo llegamos.',
    ctaPrimary: 'Iniciar prueba gratuita',
    ctaSecondary: 'Ver cómo funciona',
    trust: ['Preparado para HIPAA y seguro', 'Atención en línea y presencial', 'Cada profesional, un expediente'],
    badge: 'Atención coordinada en tiempo real',
  },
  strip: {
    label: 'A quiénes conecta Uribcare',
    head: 'Un recorrido conectado a lo largo de toda la atención',
    chips: ['Médicos', 'Terapeutas', 'Consejeros', 'Enfermería', 'Farmacias', 'Laboratorios', 'Atención en casa y presencial'],
  },
  problem: {
    eyebrow: 'El problema',
    heading: 'La atención está dispersa. Las familias cargan con el peso de mantenerla unida.',
    lead: 'Un paciente ve a un médico aquí, a un terapeuta allá, recoge sus medicamentos en otro lugar y agenda un estudio por teléfono. Nadie comparte el panorama completo, así que las familias repiten su historia, persiguen citas y se pierden en los huecos. En necesidades continuas como la atención del autismo, esa fricción nunca se detiene.',
    compare: [
      { title: 'La salud hoy', text: 'Aplicaciones desconectadas, llamadas sin respuesta, expedientes perdidos y nadie coordinando el siguiente paso.' },
      { title: 'El paciente hace el trabajo', text: 'Repite su historia a cada profesional y lleva el control de sus propias remisiones y seguimientos.' },
      { title: 'La forma Uribcare', text: 'Una plataforma donde cada profesional colabora alrededor de un mismo recorrido de atención conectado.' },
    ],
  },
  ecosystem: {
    eyebrow: 'El ecosistema',
    heading: 'Cada parte de la atención, conectada en una sola plataforma',
    lead: 'Uribcare reúne a todo el equipo, para que la búsqueda, la agenda, las consultas, la terapia, el diagnóstico, los medicamentos y el seguimiento vivan en un mismo recorrido continuo.',
    plaque: 'ECOSISTEMA URIBCARE',
    items: [
      { title: 'Médicos y especialistas', body: 'Encuentre al médico indicado, consulte en línea o de forma presencial y mantenga cada diagnóstico y nota en un mismo expediente compartido.' },
      { title: 'Terapeutas y consejeros', body: 'Apoyo conductual, ocupacional, del habla y de salud mental: asignado, agendado y con seguimiento a lo largo del tiempo.' },
      { title: 'Enfermería y atención domiciliaria', body: 'Visitas a domicilio coordinadas y apoyo continuo que siempre permanecen conectados con el resto del equipo de atención.' },
      { title: 'Farmacias', body: 'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.' },
      { title: 'Laboratorios de diagnóstico', body: 'Solicite estudios, agende la toma de muestras y reciba los resultados en el expediente de forma automática para cada profesional.' },
      { title: 'Un expediente conectado', body: 'Todos trabajan desde la misma fuente de información, así nada se repite y nada se pierde.' },
    ],
  },
  services: {
    eyebrow: 'Nuestros servicios',
    heading: 'Terapia especializada para niños y adultos',
    lead: 'Fundada por profesionales con más de dos décadas de experiencia, ofrecemos terapia personalizada y basada en evidencia que mejora la movilidad, la comunicación y la independencia diaria, la atención que sostiene todo el recorrido Uribcare.',
    cta: 'Agendar evaluación',
    items: [
      {
        alt: 'Fisioterapeuta guiando a un paciente en un ejercicio con pelota de estabilidad',
        tag: 'Fisioterapia',
        title: 'Fisioterapia',
        body: 'Recupere la movilidad, reduzca el dolor, gane fuerza y vuelva a ser independiente con programas personalizados y orientados a objetivos, para todas las edades.',
      },
      {
        alt: 'Terapeutas ocupacionales acompañando a un adulto en su rehabilitación de movilidad',
        tag: 'Terapia ocupacional',
        title: 'Terapia ocupacional',
        body: 'Desarrolle las habilidades para la vida diaria, el aprendizaje y el trabajo, para que cada paciente participe con confianza en las actividades que le importan.',
      },
      {
        alt: 'Terapeuta del habla trabajando la articulación con un niño pequeño',
        tag: 'Terapia del habla',
        title: 'Terapia del habla',
        body: 'Mejore la comunicación, el lenguaje, la claridad del habla, las habilidades cognitivas y la deglución, tanto en niños como en adultos.',
      },
    ],
  },
  journey: {
    eyebrow: 'El recorrido del paciente',
    heading: 'Buscar, consultar, tratar y dar seguimiento sin salir nunca de la plataforma',
    lead: 'Un camino continuo en lugar de una docena de pasos desconectados.',
    steps: [
      { label: 'Buscar', title: 'Encuentre la atención indicada', body: 'Busque médicos, terapeutas, consejeros y laboratorios verificados, filtrados por necesidad, ubicación y disponibilidad.' },
      { label: 'Agendar', title: 'Reserve en pocos toques', body: 'Citas en línea o presenciales con disponibilidad en tiempo real y recordatorios automáticos.' },
      { label: 'Consultar', title: 'Vea a su profesional', body: 'Consultas por video seguro o en clínica, con notas y siguientes pasos registrados en el expediente compartido.' },
      { label: 'Terapia', title: 'Apoyo continuo', body: 'Sesiones recurrentes de terapia y consejería, con la evolución registrada y visible para todo el equipo.' },
      { label: 'Diagnóstico', title: 'Estudios y resultados', body: 'Solicite análisis, agende la toma de muestras y reciba los resultados enrutados de vuelta a cada profesional de forma automática.' },
      { label: 'Medicamentos', title: 'Recetas y resurtidos', body: 'Surta sus medicamentos en farmacias conectadas, con recordatorios y resurtidos sencillos.' },
      { label: 'Seguimiento', title: 'Atención continua', body: 'Los seguimientos coordinados mantienen el plan en marcha: sin huecos, sin perseguir a nadie, sin empezar de nuevo.' },
    ],
  },
  autism: {
    eyebrow: 'Donde más a fondo llegamos',
    heading: 'Atención del autismo que por fin funciona como un solo equipo',
    body: 'La atención del autismo implica que muchos profesionales avancen juntos durante años: terapeutas conductuales, del habla y ocupacionales, consejeros, médicos y familias. Uribcare los mantiene coordinados alrededor de un niño, un plan y un recorrido conectado.',
    points: [
      'Asignación a los especialistas indicados según las necesidades de cada niño',
      'Evolución compartida para que cada profesional vea la historia completa',
      'Terapia, consejería y seguimientos en un solo calendario',
      'Apoyo a las familias que continúa entre una visita y otra',
    ],
    photoAlt: 'Una terapeuta acompañando a un niño pequeño durante una sesión individual',
    quote: '“Usted nunca debería ser quien mantiene unida la atención de su hijo. Ese es nuestro trabajo.”',
  },
  principles: {
    srHeading: 'Principios de atención',
    items: [
      { num: '01', title: 'Integridad y responsabilidad', sub: 'Construir confianza con excelencia', body: 'Mantenemos los más altos estándares de honestidad, transparencia y atención profesional en cada interacción con el paciente.' },
      { num: '02', title: 'Técnicas avanzadas e innovación', sub: 'Atención moderna y basada en evidencia', body: 'Aplicamos las técnicas terapéuticas, tecnologías y estrategias de tratamiento más recientes para lograr los mejores resultados.' },
      { num: '03', title: 'Atención compasiva', sub: 'Servir con empatía y respeto', body: 'Construimos relaciones duraderas con atención genuina, acompañamiento personalizado y apoyo constante.' },
    ],
  },
  audience: {
    eyebrow: 'Pensado para ambos lados de la atención',
    heading: 'Una sola plataforma para pacientes y profesionales',
    patients: {
      tag: 'Para pacientes y familias',
      title: 'Atención que se articula para usted',
      points: [
        'Encuentre y agende al profesional indicado en minutos',
        'Un expediente que nunca tiene que volver a explicar',
        'Consulte en línea o de forma presencial, usted elige',
        'Atención accesible, coordinada y continua',
      ],
    },
    providers: {
      tag: 'Para profesionales y clínicas',
      title: 'Colabore sin fricción',
      points: [
        'Llegue a los pacientes que necesitan sus servicios',
        'Expedientes compartidos para una continuidad real de la atención',
        'Remisiones y resultados que fluyen automáticamente',
        'Menos administración, más tiempo con los pacientes',
      ],
    },
  },
  trust: {
    eyebrow: 'Seguridad y cumplimiento',
    heading: 'Confianza de nivel sanitario, incorporada desde el primer día',
    lead: 'El cumplimiento normativo es la base de todo lo que construimos, para que pacientes y profesionales colaboren con confianza.',
    cards: [
      { title: 'Preparado para HIPAA', body: 'Construido conforme a los estándares de privacidad y protección de datos en salud.' },
      { title: 'Cifrado de extremo a extremo', body: 'Datos protegidos en tránsito y en reposo, en cada paso del camino.' },
      { title: 'Consentimiento y control', body: 'Los pacientes deciden quién ve su expediente y cuándo.' },
      { title: 'Auditoría completa', body: 'Cada acceso y cada acción quedan registrados para rendir cuentas.' },
    ],
    stats: [
      { n: '172+', l: 'Familias y aliados atendidos' },
      { n: '98%', l: 'Recomendaría nuestra atención' },
      { n: '305+', l: 'Sesiones y talleres impartidos' },
      { n: '20+ años', l: 'De experiencia clínica que nos respalda' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas resueltas',
    heading: 'Lo que nos preguntan las familias y los profesionales',
    items: [
      {
        q: '¿Qué es exactamente Uribcare?',
        a: 'Uribcare es un ecosistema de salud conectado. Reúne en una sola plataforma a pacientes, médicos, terapeutas, consejeros, enfermería, farmacias y laboratorios de diagnóstico, para que la búsqueda, la agenda, las consultas, la terapia, los estudios, los medicamentos y el seguimiento ocurran en un mismo recorrido coordinado. La atención del autismo es nuestro enfoque principal, con una gama de servicios en crecimiento más allá de ella.',
      },
      {
        q: '¿Están seguros mis datos de salud?',
        a: 'Sí. Uribcare está construido conforme a estándares preparados para HIPAA, con cifrado en tránsito y en reposo, consentimiento controlado por el paciente y registro completo de auditoría. Usted decide qué profesionales pueden acceder a su expediente.',
      },
      {
        q: '¿Puedo recibir atención en línea y de forma presencial?',
        a: 'Ambas. Puede consultar por video seguro o agendar visitas presenciales, según lo que le convenga, y todo permanece en el mismo expediente conectado.',
      },
      {
        q: '¿Cómo ayuda Uribcare específicamente con la atención del autismo?',
        a: 'La atención del autismo implica coordinar a muchos profesionales durante mucho tiempo. Uribcare asigna a las familias los especialistas indicados, mantiene la terapia, la consejería y los seguimientos en un solo lugar y da a cada profesional visibilidad compartida de la evolución, para que las familias no tengan que sostenerlo todo solas.',
      },
      {
        q: 'Soy profesional de la salud. ¿Cómo me uno?',
        a: 'Profesionales y clínicas pueden unirse para llegar a nuevos pacientes, colaborar con expedientes compartidos y reducir el trabajo administrativo. Inicie una prueba gratuita o solicite una demo aquí abajo y nuestro equipo lo dejará listo.',
      },
    ],
  },
  contact: {
    eyebrow: 'Comience hoy',
    heading: 'Inicie su prueba gratuita',
    body: 'Cuéntenos un poco sobre lo que necesita y le dejaremos listo un recorrido de atención conectado, normalmente en menos de un día. Sin tarjeta de crédito y sin compromiso.',
    reassure: ['Comenzar es gratis, sin tarjeta', 'Listo en aproximadamente un día', 'Preparado para HIPAA y seguro por diseño'],
  },
  mbar: { trial: 'Prueba gratuita', call: 'Llamar a Uribcare' },
};

import type { Dict } from './en';

/**
 * Spanish landing-page dictionary (es-US).
 *
 * Register: formal "usted" throughout — the norm for US healthcare communication
 * addressed to patients and families.
 *
 * Two deliberate translation decisions worth knowing about:
 *  - "HIPAA-ready" → "Preparado para HIPAA", never "Conforme a HIPAA".
 *    "Conforme" asserts certified compliance, a stronger claim than the approved
 *    English makes. The hedge is preserved.
 *  - "record" (health record) → "expediente", the term US Spanish-language
 *    health materials use, rather than the calque "registro".
 *
 * Typed as `Dict`, so any key added to en.ts fails the build until translated.
 */
export const es: Dict = {
  meta: {
    title: 'Uribcare — Conectamos la atención, simplificamos la salud',
    description:
      'Uribcare es un ecosistema de salud conectado que une a los pacientes con médicos, terapeutas, consejeros, enfermeros, farmacias y laboratorios, en línea y en persona. La atención del autismo es nuestra área de mayor especialización.',
  },

  skipLink: 'Ir al contenido',

  nav: {
    ariaPrimary: 'Principal',
    ariaMobile: 'Móvil',
    brandHome: 'Inicio de URIBCARE',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    themeToggle: 'Cambiar entre tema claro y oscuro',
    links: {
      services: 'Servicios',
      ecosystem: 'Ecosistema',
      journey: 'Cómo funciona',
      autismCare: 'Atención del autismo',
      security: 'Seguridad',
    },
    allServices: 'Ver la sección de servicios',
    allEcosystem: 'Ver la sección del ecosistema',
    bookDemo: 'Agendar una demostración',
    registration: 'Registro',
    startTrial: 'Prueba gratis',
    language: {
      label: 'Idioma',
      en: 'English',
      es: 'Español',
    },
  },

  serviceNav: {
    'physical-therapy': {
      name: 'Terapia física',
      shortDescription:
        'Recupere la movilidad, reduzca el dolor, gane fuerza y vuelva a ser independiente con programas personalizados y orientados a metas para todas las edades.',
    },
    'occupational-therapy': {
      name: 'Terapia ocupacional',
      shortDescription:
        'Desarrolle las habilidades para la vida diaria, el aprendizaje y el trabajo, para que los pacientes participen con confianza en las actividades que les importan.',
    },
    'speech-therapy': {
      name: 'Terapia del habla',
      shortDescription:
        'Mejore la comunicación, el lenguaje, la claridad del habla, las habilidades cognitivas y la deglución, tanto en niños como en adultos.',
    },
  },

  ecosystemNav: {
    'doctors-specialists': {
      name: 'Médicos y especialistas',
      shortDescription:
        'Encuentre al médico adecuado, consulte en línea o en persona y conserve cada diagnóstico y nota en un solo expediente compartido.',
    },
    'therapists-counselors': {
      name: 'Terapeutas y consejeros',
      shortDescription:
        'Apoyo conductual, ocupacional, del habla y de salud mental: emparejado, programado y con seguimiento a lo largo del tiempo.',
    },
    'nurses-home-care': {
      name: 'Enfermería y atención en casa',
      shortDescription:
        'Visitas domiciliarias coordinadas y apoyo continuo que permanecen vinculados a todo el equipo de atención del paciente.',
    },
    pharmacies: {
      name: 'Farmacias',
      shortDescription:
        'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.',
    },
    'diagnostic-labs': {
      name: 'Laboratorios de diagnóstico',
      shortDescription:
        'Solicite análisis, programe la toma de muestras y vea los resultados llegar automáticamente al expediente de cada proveedor.',
    },
    'connected-record': {
      name: 'Un solo expediente conectado',
      shortDescription:
        'Todos trabajan con la misma fuente de información, así nada se repite y nada se pierde.',
    },
  },

  hero: {
    eyebrow: 'Un ecosistema de atención conectado',
    titleBefore: 'Una sola plataforma para ',
    titleAccent: 'todo',
    titleAfter: ' el recorrido de su atención médica.',
    lead:
      'Uribcare conecta a los pacientes con los médicos, terapeutas, consejeros, enfermeros, farmacias y laboratorios que necesitan, coordinados en un solo lugar, en línea o en persona. La atención del autismo es nuestra área de mayor especialización.',
    ctaPrimary: 'Comience una prueba gratis',
    ctaSecondary: 'Vea cómo funciona',
    trustHipaa: 'Preparado para HIPAA y seguro',
    trustOnline: 'Atención en línea y en persona',
    trustRecord: 'Todos los proveedores, un solo expediente',
    badge: 'Atención coordinada en tiempo real',
    // Kept deliberately short: canvas labels are drawn beside each node and
    // cannot wrap, so "Laboratorio" is shortened to "Lab." as it is in Spanish
    // clinical shorthand.
    constellation: {
      patient: 'Paciente',
      doctor: 'Médico',
      therapist: 'Terapeuta',
      counselor: 'Consejero',
      pharmacy: 'Farmacia',
      lab: 'Lab.',
      nurse: 'Enfermero',
    },
  },

  strip: {
    aria: 'A quiénes conecta Uribcare',
    head: 'Un recorrido conectado en cada parte de la atención',
    chips: [
      'Médicos',
      'Terapeutas',
      'Consejeros',
      'Enfermeros',
      'Farmacias',
      'Laboratorios de diagnóstico',
      'Atención en casa y en persona',
    ],
  },

  problem: {
    eyebrow: 'El problema',
    title: 'La atención está dispersa. Las familias cargan con el peso de mantenerla unida.',
    lead:
      'Un paciente ve a un médico aquí, a un terapeuta allá, recoge sus medicamentos en otro lugar y programa un análisis por teléfono. Nadie comparte el panorama completo, así que las familias repiten su historia, persiguen citas y se pierden entre los vacíos del sistema. Cuando la necesidad es continua, como en la atención del autismo, esa fricción nunca termina.',
    items: [
      {
        title: 'La salud hoy',
        body: 'Aplicaciones desconectadas, llamadas sin respuesta, expedientes perdidos y nadie que coordine el siguiente paso.',
      },
      {
        title: 'El paciente hace el trabajo',
        body: 'Repetir su historial ante cada proveedor y dar seguimiento por su cuenta a las referencias y los controles.',
      },
      {
        title: 'El enfoque de Uribcare',
        body: 'Una sola plataforma donde cada proveedor colabora en torno a un único recorrido de atención conectado.',
      },
    ],
  },

  ecosystem: {
    eyebrow: 'El ecosistema',
    title: 'Cada parte de la atención, conectada en una sola plataforma',
    lead:
      'Uribcare reúne a todo el equipo, para que la búsqueda, las citas, las consultas, la terapia, los diagnósticos, los medicamentos y el seguimiento vivan en un solo recorrido continuo.',
    wordmark: 'ECOSISTEMA URIBCARE',
    cards: [
      {
        title: 'Médicos y especialistas',
        body: 'Encuentre al médico adecuado, consulte en línea o en persona y conserve cada diagnóstico y nota en un solo expediente compartido.',
      },
      {
        title: 'Terapeutas y consejeros',
        body: 'Apoyo conductual, ocupacional, del habla y de salud mental: emparejado, programado y con seguimiento a lo largo del tiempo.',
      },
      {
        title: 'Enfermería y atención en casa',
        body: 'Visitas domiciliarias coordinadas y apoyo continuo que permanecen vinculados a todo el equipo de atención del paciente.',
      },
      {
        title: 'Farmacias',
        body: 'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.',
      },
      {
        title: 'Laboratorios de diagnóstico',
        body: 'Solicite análisis, programe la toma de muestras y vea los resultados llegar automáticamente al expediente de cada proveedor.',
      },
      {
        title: 'Un solo expediente conectado',
        body: 'Todos trabajan con la misma fuente de información, así nada se repite y nada se pierde.',
      },
    ],
  },

  services: {
    eyebrow: 'Nuestros servicios',
    title: 'Terapia especializada para niños y adultos',
    lead:
      'Fundada por clínicos con más de dos décadas de experiencia, ofrecemos terapia personalizada y basada en evidencia que mejora la movilidad, la comunicación y la independencia diaria: la atención que sostiene todo el recorrido de Uribcare.',
    cta: 'Agende una evaluación',
    cards: [
      {
        tag: 'Terapia física',
        title: 'Terapia física',
        body: 'Recupere la movilidad, reduzca el dolor, gane fuerza y vuelva a ser independiente con programas personalizados y orientados a metas para todas las edades.',
        alt: 'Fisioterapeuta guiando a una paciente en un ejercicio con pelota de estabilidad',
      },
      {
        tag: 'Terapia ocupacional',
        title: 'Terapia ocupacional',
        body: 'Desarrolle las habilidades para la vida diaria, el aprendizaje y el trabajo, para que los pacientes participen con confianza en las actividades que les importan.',
        alt: 'Terapeutas ocupacionales apoyando a un adulto en su rehabilitación de movilidad',
      },
      {
        tag: 'Terapia del habla',
        title: 'Terapia del habla',
        body: 'Mejore la comunicación, el lenguaje, la claridad del habla, las habilidades cognitivas y la deglución, tanto en niños como en adultos.',
        alt: 'Terapeuta del habla trabajando la articulación con un niño pequeño',
      },
    ],
  },

  journey: {
    eyebrow: 'El recorrido del paciente',
    title: 'Descubra, consulte, trate y dé seguimiento sin salir nunca de la plataforma',
    lead: 'Un solo camino continuo en lugar de una docena de pasos desconectados.',
    steps: [
      {
        label: 'Descubrir',
        title: 'Encuentre la atención adecuada',
        body: 'Busque médicos, terapeutas, consejeros y laboratorios verificados, filtrados por necesidad, ubicación y disponibilidad.',
      },
      {
        label: 'Programar',
        title: 'Reserve en unos cuantos toques',
        body: 'Citas en línea o en persona, con disponibilidad en tiempo real y recordatorios automáticos.',
      },
      {
        label: 'Consultar',
        title: 'Conozca a su proveedor',
        body: 'Videoconsultas seguras o visitas en la clínica, con las notas y los próximos pasos registrados en el expediente compartido.',
      },
      {
        label: 'Terapia',
        title: 'Apoyo continuo',
        body: 'Sesiones periódicas de terapia y consejería, con los avances registrados y visibles para todo el equipo de atención.',
      },
      {
        label: 'Diagnóstico',
        title: 'Análisis y resultados',
        body: 'Solicite análisis de laboratorio, programe la toma de muestras y reciba los resultados enviados automáticamente a cada proveedor.',
      },
      {
        label: 'Medicamentos',
        title: 'Recetas y resurtidos',
        body: 'Surta sus medicamentos en farmacias conectadas, con recordatorios y resurtidos fáciles.',
      },
      {
        label: 'Seguimiento',
        title: 'Atención continua',
        body: 'Los controles coordinados mantienen el plan en marcha: sin vacíos, sin perseguir a nadie, sin volver a empezar.',
      },
    ],
  },

  autism: {
    eyebrow: 'Donde vamos más a fondo',
    title: 'Atención del autismo que por fin funciona como un solo equipo',
    body:
      'La atención del autismo implica que muchos proveedores avancen juntos durante años: terapeutas conductuales, del habla y ocupacionales, consejeros, médicos y familias. Uribcare los mantiene coordinados en torno a un niño, un plan y un recorrido conectado.',
    list: [
      'Emparejamiento con los especialistas adecuados para las necesidades de cada niño',
      'Avances compartidos, para que cada proveedor vea el historial completo',
      'Terapia, consejería y controles en un solo calendario',
      'Apoyo para las familias que continúa entre visitas',
    ],
    quote:
      '«Usted nunca debería ser quien mantenga unida la atención de su hijo. Ese es nuestro trabajo.»',
    photoAlt: 'Una terapeuta apoyando a un niño pequeño durante una sesión individual',
  },

  principles: {
    heading: 'Principios de atención',
    cards: [
      {
        num: '01',
        title: 'Integridad y responsabilidad',
        sub: 'Construimos confianza con excelencia',
        body: 'Mantenemos los más altos estándares de honestidad, transparencia y atención profesional en cada interacción con el paciente.',
      },
      {
        num: '02',
        title: 'Técnicas avanzadas e innovación',
        sub: 'Atención moderna y basada en evidencia',
        body: 'Utilizamos las técnicas terapéuticas, las tecnologías y las estrategias de tratamiento más recientes para lograr los mejores resultados.',
      },
      {
        num: '03',
        title: 'Atención compasiva',
        sub: 'Servimos con empatía y respeto',
        body: 'Construimos relaciones duraderas con un cuidado genuino, atención personalizada y apoyo inquebrantable.',
      },
    ],
  },

  audience: {
    eyebrow: 'Diseñado para ambos lados de la atención',
    title: 'Una sola plataforma para pacientes y proveedores',
    patients: {
      tag: 'Para pacientes y familias',
      title: 'Atención que se une para usted',
      items: [
        'Encuentre y reserve al proveedor adecuado en minutos',
        'Un expediente que nunca tendrá que volver a explicar',
        'Consulte en línea o en persona: usted elige',
        'Atención accesible, coordinada y continua',
      ],
    },
    providers: {
      tag: 'Para proveedores y clínicas',
      title: 'Colabore sin fricción',
      items: [
        'Llegue a los pacientes que necesitan sus servicios',
        'Expedientes compartidos para una continuidad real de la atención',
        'Referencias y resultados que fluyen automáticamente',
        'Menos trámites, más tiempo con los pacientes',
      ],
    },
  },

  trust: {
    eyebrow: 'Seguridad y cumplimiento',
    title: 'Confianza de nivel clínico, integrada desde el primer día',
    lead:
      'El cumplimiento normativo es la base de todo lo que construimos, para que pacientes y proveedores colaboren con confianza.',
    cards: [
      {
        title: 'Preparado para HIPAA',
        body: 'Desarrollado para cumplir los estándares de privacidad y protección de datos en la atención de salud.',
      },
      {
        title: 'Cifrado de extremo a extremo',
        body: 'Datos protegidos en tránsito y en reposo, en cada paso del camino.',
      },
      {
        title: 'Consentimiento y control',
        body: 'Los pacientes deciden quién ve su expediente y cuándo.',
      },
      {
        title: 'Registro de auditoría completo',
        body: 'Cada acceso y cada acción quedan registrados para garantizar la rendición de cuentas.',
      },
    ],
    stats: [
      { n: '172+', l: 'Familias y socios atendidos' },
      { n: '98%', l: 'Recomendarían nuestra atención' },
      { n: '305+', l: 'Sesiones y talleres realizados' },
      { n: '20+ años', l: 'De experiencia clínica que nos respalda' },
    ],
  },

  faq: {
    eyebrow: 'Preguntas, respondidas',
    title: 'Lo que nos preguntan las familias y los proveedores',
    items: [
      {
        q: '¿Qué es exactamente Uribcare?',
        a: 'Uribcare es un ecosistema de salud conectado. Reúne en una sola plataforma a pacientes, médicos, terapeutas, consejeros, enfermeros, farmacias y laboratorios de diagnóstico, para que la búsqueda, las citas, las consultas, la terapia, los análisis, los medicamentos y el seguimiento ocurran en un solo recorrido coordinado. La atención del autismo es nuestro enfoque principal, con una gama creciente de servicios más allá de ella.',
      },
      {
        q: '¿Están seguros mis datos de salud?',
        a: 'Sí. Uribcare está desarrollado según estándares preparados para HIPAA, con cifrado en tránsito y en reposo, consentimiento controlado por el paciente y registro completo de auditoría. Usted decide qué proveedores pueden acceder a su expediente.',
      },
      {
        q: '¿Puedo recibir atención en línea y en persona?',
        a: 'Ambas. Puede consultar a los proveedores por video seguro o reservar visitas en persona, según lo que necesite, y todo permanece en el mismo expediente conectado.',
      },
      {
        q: '¿Cómo ayuda Uribcare específicamente con la atención del autismo?',
        a: 'La atención del autismo implica que muchos proveedores se coordinen durante mucho tiempo. Uribcare conecta a las familias con los especialistas adecuados, mantiene la terapia, la consejería y los controles en un solo lugar, y da a cada proveedor visibilidad compartida del progreso, para que las familias no tengan que sostenerlo todo solas.',
      },
      {
        q: 'Soy proveedor. ¿Cómo me uno?',
        a: 'Los proveedores y las clínicas pueden unirse para llegar a nuevos pacientes, colaborar mediante expedientes compartidos y reducir el tiempo administrativo. Comience una prueba gratis o agende una demostración a continuación y nuestro equipo lo dejará todo listo.',
      },
    ],
  },

  contact: {
    eyebrow: 'Comience hoy',
    title: 'Comience su prueba gratis',
    body:
      'Cuéntenos un poco sobre lo que necesita y le prepararemos un recorrido de atención conectado, normalmente en un día. Sin tarjeta de crédito y sin compromiso.',
    reassure: [
      'Gratis para comenzar: no se requiere tarjeta',
      'Todo listo en aproximadamente un día',
      'Preparado para HIPAA y seguro por diseño',
    ],
  },

  form: {
    heading: 'Solicite acceso',
    sub: 'Le responderemos personalmente, normalmente en uno o dos días.',
    required: 'obligatorio',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Su nombre',
    nameError: 'Por favor, ingrese su nombre.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'usted@correo.com',
    emailError: 'Por favor, ingrese un correo electrónico válido.',
    phoneLabel: 'Teléfono',
    phonePlaceholder: 'Opcional',
    roleLabel: 'Soy…',
    rolePlaceholder: 'Seleccione una opción',
    roleError: 'Por favor, elija una opción.',
    roleOptions: [
      'Paciente o familiar',
      'Padre o madre que busca atención para el autismo',
      'Médico o especialista',
      'Terapeuta o consejero',
      'Clínica, farmacia o laboratorio',
      'Otro',
    ],
    messageLabel: '¿En qué necesita ayuda?',
    messagePlaceholder: 'Opcional: cuéntenos qué tipo de atención está buscando.',
    submit: 'Solicitar mi prueba gratis',
    note: 'Al enviar, acepta que Uribcare se comunique con usted sobre su solicitud.',
    successTitle: 'Gracias, hemos recibido su solicitud.',
    successBefore:
      'Su aplicación de correo debería abrirse con la solicitud lista para enviar. Si no ocurrió, escríbanos directamente a ',
    successAfter: '.',
    mail: {
      subject: 'Solicitud de prueba gratis — ',
      intro: 'Nueva solicitud de prueba gratis desde el sitio de Uribcare:',
      name: 'Nombre',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      role: 'Soy',
      language: 'Idioma',
      needs: 'Lo que necesita:',
      empty: '—',
    },
  },

  footer: {
    tagline:
      'Conectamos la atención y simplificamos la salud. Una plataforma, múltiples servicios de salud, un recorrido conectado para cada paciente.',
    platformTitle: 'Plataforma',
    platformLinks: {
      ecosystem: 'Ecosistema',
      journey: 'Cómo funciona',
      audience: 'Para proveedores',
      trust: 'Seguridad',
    },
    careTitle: 'Atención',
    careLinks: {
      autism: 'Atención del autismo',
      therapy: 'Terapia y consejería',
      diagnostics: 'Diagnóstico',
      faq: 'Preguntas frecuentes',
    },
    contactTitle: 'Contáctenos',
    rights: 'URiBCare LLC. Todos los derechos reservados.',
    badge: 'Preparado para HIPAA · Atención en línea y en persona',
  },

  mbar: {
    cta: 'Prueba gratis',
    callAria: 'Llamar a Uribcare',
  },
};

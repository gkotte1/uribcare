import { SERVICE_NAV, summary } from './nav';
import type { Detail } from './types';

const shared = (slug: string) => summary(SERVICE_NAV.es, slug);

/**
 * Spanish edition of the three service pages. Slugs, icons, photography and
 * section order match `services.en.ts` exactly; only the copy differs, so both
 * languages render through the same `DetailPage`.
 */
export const SERVICES_ES: Detail[] = [
  {
    kind: 'service',
    ...shared('physical-therapy'),
    eyebrow: 'Nuestros servicios',
    title: 'Fisioterapia',
    subtitle:
      'Recupere la movilidad, reduzca el dolor, gane fuerza y vuelva a ser independiente con programas personalizados y orientados a objetivos, para todas las edades.',
    metaDescription:
      'Fisioterapia en Uribcare: programas personalizados y orientados a objetivos que devuelven la movilidad, reducen el dolor y recuperan la fuerza en niños y adultos.',
    image: {
      src: '/images/card-physical.jpg',
      alt: 'Fisioterapeuta guiando a un paciente en un ejercicio con pelota de estabilidad',
      caption: 'Cada programa parte de una evaluación completa del movimiento y de una meta que al paciente de verdad le importa.',
    },
    overview: {
      heading: 'El movimiento es la base sobre la que se construye todo lo demás',
      paragraphs: [
        'La fisioterapia en Uribcare se trata de la función, no solo de los ejercicios. Ya sea que un niño pequeño tarde en caminar, que un adulto se recupere de una cirugía o que una persona mayor pierda confianza en las escaleras, el trabajo comienza con la misma pregunta: ¿qué quiere volver a poder hacer esta persona?',
        'Nuestros fisioterapeutas son profesionales con más de dos décadas de experiencia clínica. Evalúan fuerza, equilibrio, coordinación, rango de movimiento y dolor, y luego construyen un programa que progresa semana a semana, enseñando a la familia o al cuidador exactamente cómo continuarlo en casa.',
        'Como la fisioterapia forma parte de la plataforma Uribcare, las notas de evolución, las metas de movilidad y los programas para casa quedan visibles para el médico que remite y para cualquier terapeuta que trabaje en paralelo. Nadie tiene que volver a explicar la historia en cada visita.',
      ],
      highlights: [
        'Atención pediátrica, de adultos y geriátrica',
        'En consultorio, a domicilio o guiada a distancia',
        'Evolución compartida con todo el equipo de atención',
      ],
    },
    provides: {
      eyebrow: 'Qué incluye el servicio',
      heading: 'Un programa completo de fisioterapia, no un conjunto de citas',
      intro:
        'Cada plan se arma con los mismos componentes esenciales y luego se ajusta al diagnóstico, la edad y las metas de cada paciente.',
      cards: [
        {
          title: 'Evaluación completa del movimiento',
          text: 'Fuerza, marcha, equilibrio, rango articular, postura y dolor se miden desde el inicio para poder demostrar la evolución en lugar de suponerla.',
        },
        {
          title: 'Desarrollo motor grueso',
          text: 'En niños: girar, gatear, ponerse de pie, caminar, correr, saltar y los hitos de coordinación que vienen después.',
        },
        {
          title: 'Rehabilitación de dolor y lesiones',
          text: 'Terapia manual, carga progresiva y adaptación de actividades para bajar el dolor y recuperar la función tras una lesión o cirugía.',
        },
        {
          title: 'Fuerza y acondicionamiento',
          text: 'Programas dirigidos que reconstruyen músculo, resistencia y estabilidad articular al ritmo que el cuerpo puede asimilar.',
        },
        {
          title: 'Equilibrio y prevención de caídas',
          text: 'Trabajo vestibular y de estabilidad para pacientes que han perdido confianza al moverse dentro de su propia casa.',
        },
        {
          title: 'Programas de ejercicio en casa',
          text: 'Un plan escrito y demostrado para los cuidadores, para que lo ganado en sesión se mantenga entre una visita y otra.',
        },
      ],
    },
    audience: {
      eyebrow: 'Para quién es',
      heading: 'La fisioterapia le sirve a más personas de las que las familias suelen imaginar',
      groups: [
        {
          tone: 'cool',
          tag: 'Niños y familias',
          title: 'Cuerpos en crecimiento y retraso del desarrollo',
          points: [
            'Niños que no alcanzan hitos motores gruesos o tardan en caminar',
            'Niños autistas que trabajan coordinación, postura y planificación motora',
            'Bajo tono muscular, hipermovilidad y dificultades de equilibrio',
            'Condiciones neurológicas como la parálisis cerebral',
            'Familias que quieren un programa para casa que de verdad puedan seguir',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adultos y adultos mayores',
          title: 'Recuperación, dolor e independencia',
          points: [
            'Rehabilitación después de una cirugía o una lesión',
            'Dolor crónico de espalda, cuello, hombro y rodilla',
            'Movilidad reducida, rigidez o pérdida de confianza al caminar',
            'Recuperación neurológica tras un accidente cerebrovascular o un diagnóstico',
            'Cualquier persona cuya actividad diaria se ha ido reduciendo en silencio',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios',
      heading: 'Lo que cambia cuando el programa se construye alrededor de la persona',
      intro: 'Función medible, no una mejoría vaga, revisada en cada reevaluación.',
      cards: [
        { title: 'Moverse con menos dolor', text: 'Carga progresiva y tolerable que reduce el dolor en lugar de provocarlo.' },
        { title: 'Independencia recuperada', text: 'Escaleras, autos, parques y lugares de trabajo vuelven a estar al alcance.' },
        { title: 'Menos retrocesos', text: 'La progresión se dosifica y se vigila, así lo ganado se mantiene en lugar de perderse.' },
        { title: 'Confianza para continuar', text: 'Pacientes y cuidadores saben exactamente qué hacer entre una sesión y otra.' },
      ],
    },
    support: {
      eyebrow: 'Cómo apoya Uribcare este servicio',
      heading: 'Fisioterapia que se mantiene conectada con el resto de la atención',
      text: 'Un fisioterapeuta que trabaja aislado solo ve una parte del panorama. En Uribcare, el plan, las notas y la evolución viajan con el paciente por cada profesional que participa en su atención.',
      points: [
        'Las remisiones médicas llegan con el diagnóstico y la historia ya adjuntos',
        'Las notas de sesión y las metas de movilidad quedan visibles para todo el equipo',
        'Terapia, consejería y citas de seguimiento viven en un solo calendario',
        'Los resultados de laboratorio e imagen llegan al mismo expediente que usa el terapeuta',
        'Las sesiones se realizan en consultorio, a domicilio o por video seguro cuando el traslado es difícil',
      ],
      quote: 'Usted nunca debería ser quien mantiene unida la atención de su hijo. Ese es nuestro trabajo.',
      quoteWho: 'El equipo de atención de Uribcare',
    },
    process: {
      eyebrow: 'El proceso de atención',
      heading: 'Cómo se desarrolla un tratamiento de fisioterapia',
      intro: 'Cinco pasos, cada uno visible para el paciente y para todo el equipo.',
      steps: [
        { label: 'Paso 1', title: 'Evaluación', text: 'Una valoración completa de movimiento, fuerza, dolor y función, con las mediciones iniciales registradas en el expediente compartido.' },
        { label: 'Paso 2', title: 'Definición de metas', text: 'El paciente y su familia acuerdan las metas que importan: un hito concreto, volver al trabajo, caminar sin dolor.' },
        { label: 'Paso 3', title: 'Terapia activa', text: 'Sesiones regulares en consultorio, a domicilio o en línea, con tratamiento manual y ejercicio progresivo.' },
        { label: 'Paso 4', title: 'Programa para casa', text: 'Un programa escrito y demostrado para los cuidadores, para que el trabajo continúe entre sesiones.' },
        { label: 'Paso 5', title: 'Reevaluación', text: 'Se repiten las mediciones, se ajusta el plan y la evolución se comparte con el médico que remitió al paciente.' },
      ],
    },
    cta: {
      heading: 'Agende una evaluación de fisioterapia',
      text: 'Cuéntenos qué movimiento se le ha vuelto difícil y lo conectaremos con el terapeuta indicado, en línea o de forma presencial, normalmente en menos de un día.',
      primary: { label: 'Agendar evaluación', href: '/#contact' },
      secondary: { label: 'Registrarme como paciente', href: '/register' },
      note: 'Preparado para HIPAA · Atención en línea y presencial · No se requiere tarjeta de crédito',
    },
  },
  {
    kind: 'service',
    ...shared('occupational-therapy'),
    eyebrow: 'Nuestros servicios',
    title: 'Terapia ocupacional',
    subtitle:
      'Desarrolle las habilidades para la vida diaria, el aprendizaje y el trabajo, para que cada paciente participe con confianza en las actividades que le importan.',
    metaDescription:
      'Terapia ocupacional en Uribcare: apoyo sensorial, motricidad fina y habilidades de la vida diaria que ayudan a niños y adultos a participar en su día a día.',
    image: {
      src: '/images/card-occupational.jpg',
      alt: 'Terapeutas ocupacionales acompañando a un adulto en su rehabilitación de movilidad',
      caption: 'La terapia se construye alrededor de las tareas reales de un día real: vestirse, escribir, comer, trabajar.',
    },
    overview: {
      heading: 'Las habilidades que hacen posible un día común',
      paragraphs: [
        'La terapia ocupacional es la menos comprendida y la más práctica de las terapias. Se trata de la ocupación en su sentido más amplio: vestirse, sostener un lápiz, tolerar un salón ruidoso, preparar una comida, sostener una rutina de trabajo.',
        'Nuestros terapeutas ocupacionales miran el panorama completo: procesamiento sensorial, control motor fino, atención, planificación y el entorno en el que la persona realmente vive. Después cambian lo que se puede cambiar: la habilidad, la tarea o el entorno que la rodea.',
        'En niños autistas este suele ser el servicio que destraba todo lo demás. La regulación sensorial y la planificación motora están por debajo del aprendizaje, la comunicación y la conducta, así que los avances aquí suelen notarse en todas las demás áreas de la semana del niño.',
      ],
      highlights: [
        'Procesamiento y regulación sensorial',
        'Motricidad fina, escritura y autocuidado',
        'Adaptación de la escuela, la casa y el trabajo',
      ],
    },
    provides: {
      eyebrow: 'Qué incluye el servicio',
      heading: 'Terapia práctica, centrada en tareas concretas',
      intro: 'Primero la evaluación y luego el trabajo dirigido a las habilidades puntuales que separan al paciente de la actividad que quiere realizar.',
      cards: [
        {
          title: 'Perfil sensorial y regulación',
          text: 'Identificar los detonantes sensoriales y construir un plan (dieta sensorial, cambios en el entorno, estrategias de calma) que funcione en casa y en la escuela.',
        },
        {
          title: 'Motricidad fina y escritura',
          text: 'Agarre, fuerza de la mano, manipulación dentro de la mano, uso de tijeras y una escritura legible y cómoda.',
        },
        {
          title: 'Habilidades de la vida diaria',
          text: 'Vestirse, alimentarse, ir al baño, el aseo personal y la secuencia que vuelve independiente cada una de estas tareas.',
        },
        {
          title: 'Apoyo en la alimentación',
          text: 'Trabajo con dietas restringidas, texturas y malestar en las comidas, junto con terapia del habla cuando hay deglución de por medio.',
        },
        {
          title: 'Atención y funciones ejecutivas',
          text: 'Planificar, secuenciar, hacer transiciones y terminar tareas: las habilidades que la escuela y el trabajo dan por supuestas.',
        },
        {
          title: 'Entorno y equipamiento',
          text: 'Mobiliario escolar, adaptación del puesto de trabajo, herramientas de apoyo y los pequeños cambios que eliminan un obstáculo diario.',
        },
      ],
    },
    audience: {
      eyebrow: 'Para quién es',
      heading: 'A quién ayuda la terapia ocupacional',
      groups: [
        {
          tone: 'cool',
          tag: 'Niños y familias',
          title: 'Aprendizaje, sensorialidad y autocuidado',
          points: [
            'Niños autistas que trabajan la regulación sensorial y las rutinas diarias',
            'Dificultades de procesamiento sensorial en casa o en el salón de clases',
            'Dificultades con la escritura, las tijeras y la motricidad fina',
            'Problemas para vestirse, alimentarse o lograr autonomía en el baño',
            'Retraso del desarrollo que afecta el juego y la participación',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adultos y entornos laborales',
          title: 'Función, recuperación y adaptación',
          points: [
            'Adultos que reaprenden tareas diarias tras una lesión, cirugía o accidente cerebrovascular',
            'Terapia de mano y rehabilitación de motricidad fina',
            'Manejo de fatiga, dolor o de una condición a lo largo de la jornada laboral',
            'Adaptación de la casa o del puesto de trabajo a la capacidad actual',
            'Adultos autistas que construyen rutinas acordes a cómo procesan el entorno',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios',
      heading: 'Lo que las familias notan primero',
      intro: 'Los logros en terapia ocupacional son concretos: una tarea que antes terminaba en llanto ahora se completa.',
      cards: [
        { title: 'Días más tranquilos', text: 'Menos sobrecargas sensoriales y transiciones más suaves entre actividades.' },
        { title: 'Autonomía real', text: 'Tareas de autocuidado completadas sin un adulto encima.' },
        { title: 'Participación escolar', text: 'Escribir, permanecer sentado y sostener la atención durante toda la jornada escolar.' },
        { title: 'Estrategias que se trasladan', text: 'Lo que funciona en sesión se enseña a familias, docentes y empleadores.' },
      ],
    },
    support: {
      eyebrow: 'Cómo apoya Uribcare este servicio',
      heading: 'Un solo plan compartido con todos los que trabajan con el paciente',
      text: 'La terapia ocupacional solo se sostiene si las estrategias salen del consultorio. Uribcare mantiene el plan, el perfil sensorial y la evolución visibles para el resto del equipo, de modo que todos refuercen el mismo enfoque.',
      points: [
        'Estrategias sensoriales y programas para casa compartidos con la familia y el equipo',
        'Coordinación directa con terapia del habla y apoyo conductual',
        'Las remisiones médicas llegan con la historia del desarrollo adjunta',
        'Sesiones en consultorio, a domicilio o por video seguro',
        'Evolución registrada durante años, sin perderse entre profesionales',
      ],
      quote: 'Cambiar la habilidad, cambiar la tarea o cambiar el entorno. Casi siempre es un poco de las tres.',
      quoteWho: 'El equipo de terapia ocupacional de Uribcare',
    },
    process: {
      eyebrow: 'El proceso de atención',
      heading: 'Cómo se desarrolla un tratamiento de terapia ocupacional',
      intro: 'De la primera evaluación a estrategias que sobreviven al bloque de terapia.',
      steps: [
        { label: 'Paso 1', title: 'Evaluación', text: 'Valoración estandarizada más observación del paciente realizando las tareas que de verdad le cuestan.' },
        { label: 'Paso 2', title: 'Perfil sensorial y de habilidades', text: 'Un panorama claro de los patrones de procesamiento, las habilidades motoras y los entornos implicados.' },
        { label: 'Paso 3', title: 'Sesiones dirigidas', text: 'Terapia regular enfocada en un número reducido de metas acordadas y significativas.' },
        { label: 'Paso 4', title: 'Transferencia', text: 'Se enseñan las estrategias, y el razonamiento detrás de ellas, a familias, docentes y cuidadores.' },
        { label: 'Paso 5', title: 'Revisión y ajuste', text: 'Las metas se vuelven a medir y el plan avanza conforme cambian las habilidades y los entornos.' },
      ],
    },
    cta: {
      heading: 'Agende una evaluación de terapia ocupacional',
      text: 'Cuéntenos qué momentos del día son los más difíciles y lo conectaremos con el terapeuta ocupacional indicado.',
      primary: { label: 'Agendar evaluación', href: '/#contact' },
      secondary: { label: 'Registrarme como paciente', href: '/register' },
      note: 'Preparado para HIPAA · Atención en línea y presencial · No se requiere tarjeta de crédito',
    },
  },
  {
    kind: 'service',
    ...shared('speech-therapy'),
    eyebrow: 'Nuestros servicios',
    title: 'Terapia del habla',
    subtitle:
      'Mejore la comunicación, el lenguaje, la claridad del habla, las habilidades cognitivas y la deglución, tanto en niños como en adultos.',
    metaDescription:
      'Terapia del habla en Uribcare: evaluación y tratamiento de la claridad del habla, el lenguaje, la comunicación social, los sistemas aumentativos y la deglución, en niños y adultos.',
    image: {
      src: '/images/card-speech.jpg',
      alt: 'Terapeuta del habla trabajando la articulación con un niño pequeño',
      caption: 'La comunicación cuenta ocurra como ocurra: hablada, con señas o a través de un dispositivo.',
    },
    overview: {
      heading: 'Que a uno lo entiendan lo cambia todo',
      paragraphs: [
        'La terapia del habla abarca mucho más que la pronunciación. Es el trabajo de comprender y de ser comprendido: vocabulario y gramática, claridad del habla, comunicación social, fluidez, voz y la seguridad al comer y beber.',
        'Nuestros fonoaudiólogos evalúan lo que la persona ya puede hacer, lo que está intentando hacer y qué se lo impide. Algunos pacientes trabajan hacia un habla más clara; otros trabajan hacia una comunicación confiable por cualquier vía, incluidos las señas, los símbolos o un dispositivo generador de voz.',
        'En niños y adultos autistas abordamos la comunicación en sus propios términos. La meta no es que alguien suene típico, sino darle una forma de ser comprendido en las situaciones que le importan.',
      ],
      highlights: [
        'Habla, lenguaje y comunicación social',
        'Comunicación aumentativa y no verbal',
        'Apoyo en alimentación y deglución',
      ],
    },
    provides: {
      eyebrow: 'Qué incluye el servicio',
      heading: 'Toda la gama de atención del habla y el lenguaje',
      intro: 'Cada plan parte de una evaluación detallada y se dirige a las áreas que abrirán más comunicación en menos tiempo.',
      cards: [
        {
          title: 'Claridad del habla y articulación',
          text: 'Producción de sonidos, patrones fonológicos e inteligibilidad ante interlocutores dentro y fuera de la familia.',
        },
        {
          title: 'Desarrollo del lenguaje',
          text: 'Comprender y usar vocabulario, gramática y estructura de oraciones, trabajando lenguaje receptivo y expresivo a la par.',
        },
        {
          title: 'Comunicación social',
          text: 'Conversación, turnos de habla, estrategias de reparación y manejo de las situaciones sociales que la persona realmente enfrenta.',
        },
        {
          title: 'Comunicación aumentativa',
          text: 'Evaluación, configuración y entrenamiento en señas, tableros de símbolos y dispositivos generadores de voz, con acompañamiento a la familia.',
        },
        {
          title: 'Fluidez y voz',
          text: 'Tartamudez y dificultades de voz, con estrategias para la escuela, el trabajo y la conversación cotidiana.',
        },
        {
          title: 'Alimentación y deglución',
          text: 'Comer y beber de forma segura, tolerancia a texturas y planes para la hora de comer, en coordinación con terapia ocupacional.',
        },
      ],
    },
    audience: {
      eyebrow: 'Para quién es',
      heading: 'A quién ayuda la terapia del habla',
      groups: [
        {
          tone: 'cool',
          tag: 'Niños y familias',
          title: 'De las primeras palabras a la comunicación escolar',
          points: [
            'Niños que tardan en hablar o presentan retraso del lenguaje',
            'Niños autistas, incluidos los no verbales o con lenguaje mínimo',
            'Habla poco clara que a las personas ajenas les cuesta entender',
            'Tartamudez y dificultades de fluidez',
            'Dificultades de alimentación, texturas y deglución',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adultos',
          title: 'Recuperación y comunicación cotidiana',
          points: [
            'Recuperación de la comunicación tras un accidente cerebrovascular o un evento neurológico',
            'Dificultades de voz y esfuerzo vocal',
            'Tartamudez en la adultez y confianza al hablar en público',
            'Dificultades de deglución que afectan comer y beber de forma segura',
            'Adultos autistas que construyen estrategias de comunicación acordes a su vida',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios',
      heading: 'Cómo se ve el avance',
      intro: 'El avance se mide en ser comprendido: en casa, en la escuela, en el trabajo y por personas ajenas a la familia.',
      cards: [
        { title: 'Comprendido por más personas', text: 'Claridad y lenguaje que trascienden a quienes ya conocen bien al paciente.' },
        { title: 'Menos frustración', text: 'Una vía confiable de comunicación reduce el malestar del paciente y de todo el hogar.' },
        { title: 'Comidas más seguras', text: 'Planes de deglución que bajan el riesgo y le quitan el miedo a comer.' },
        { title: 'Comunicación a la medida', text: 'Habla, señas o dispositivo: lo que le dé mayor alcance a esta persona.' },
      ],
    },
    support: {
      eyebrow: 'Cómo apoya Uribcare este servicio',
      heading: 'Terapia del habla articulada con el resto del equipo',
      text: 'Las metas de comunicación tocan la escuela, la casa, la conducta y la atención médica. Uribcare mantiene a todas esas partes trabajando desde el mismo plan y el mismo registro de evolución.',
      points: [
        'Metas y evolución compartidas con médicos, terapeutas y consejeros',
        'Coordinación con terapia ocupacional para el trabajo sensorial y de alimentación',
        'Las remisiones de pediatras y neurólogos llegan con la historia adjunta',
        'Sesiones en consultorio, a domicilio o por video seguro',
        'Años de evolución en un solo expediente, en lugar de dispersos entre profesionales',
      ],
      quote: 'La meta no es hablar por hablar. Es ser comprendido, por la vía que funcione.',
      quoteWho: 'El equipo de terapia del habla de Uribcare',
    },
    process: {
      eyebrow: 'El proceso de atención',
      heading: 'Cómo se desarrolla un tratamiento de terapia del habla',
      intro: 'Evaluación, terapia dirigida y estrategias que la familia puede usar todos los días.',
      steps: [
        { label: 'Paso 1', title: 'Evaluación', text: 'Valoración formal y por observación del habla, el lenguaje, la comunicación y, cuando corresponde, la deglución.' },
        { label: 'Paso 2', title: 'Plan de comunicación', text: 'Metas acordadas y la vía de comunicación (hablada, con señas, con símbolos o con dispositivo) que llegará más rápido a ellas.' },
        { label: 'Paso 3', title: 'Sesiones de terapia', text: 'Sesiones regulares construidas sobre actividades funcionales y motivadoras, no solo sobre ejercicios repetitivos.' },
        { label: 'Paso 4', title: 'Acompañamiento a la familia', text: 'Se enseñan las estrategias a familias y cuidadores para que la comunicación crezca entre sesiones.' },
        { label: 'Paso 5', title: 'Revisión', text: 'Las metas se vuelven a medir, el plan se actualiza y la evolución se comparte con todo el equipo.' },
      ],
    },
    cta: {
      heading: 'Agende una evaluación de terapia del habla',
      text: 'Cuéntenos qué aspecto de la comunicación resulta difícil hoy y lo conectaremos con el fonoaudiólogo indicado.',
      primary: { label: 'Agendar evaluación', href: '/#contact' },
      secondary: { label: 'Registrarme como paciente', href: '/register' },
      note: 'Preparado para HIPAA · Atención en línea y presencial · No se requiere tarjeta de crédito',
    },
  },
];

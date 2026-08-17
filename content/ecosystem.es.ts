import { ECOSYSTEM_NAV, summary } from './nav';
import type { Detail } from './types';

const shared = (slug: string) => summary(ECOSYSTEM_NAV.es, slug);

/**
 * Spanish edition of the six ecosystem pages. Slugs, icons and section order
 * match `ecosystem.en.ts` exactly; only the copy differs.
 */
export const ECOSYSTEM_ES: Detail[] = [
  {
    kind: 'ecosystem',
    ...shared('doctors-specialists'),
    eyebrow: 'El ecosistema',
    title: 'Médicos y especialistas',
    subtitle:
      'Encuentre al médico indicado, consulte en línea o de forma presencial y mantenga cada diagnóstico y nota en un mismo expediente compartido.',
    metaDescription:
      'Cómo trabajan los médicos y especialistas dentro del ecosistema Uribcare: perfiles verificados, consultas en línea y presenciales y un solo expediente compartido.',
    overview: {
      heading: 'El ancla médica del recorrido de atención',
      paragraphs: [
        'Casi todos los recorridos de atención empiezan con un médico y vuelven a él una y otra vez. El diagnóstico, las remisiones, los medicamentos y las citas de control pasan por el médico, y por eso resulta tan costoso que trabaje con una historia incompleta.',
        'En Uribcare, médicos y especialistas tienen perfiles verificados, atienden consultas en línea o presenciales y escriben en el mismo expediente que leen todos los demás profesionales. Un pediatra del desarrollo puede ver lo que registró el terapeuta del habla el mes pasado sin una llamada ni un resumen enviado por fax.',
        'Cada profesional que se une pasa por una revisión de credenciales antes de que su perfil se publique. La licencia, el NPI y las certificaciones se envían al registrarse y nuestro equipo los verifica. Nadie queda marcado como verificado de forma automática.',
      ],
      highlights: ['Perfiles médicos verificados', 'Consultas en línea o presenciales', 'Remisiones con la historia adjunta'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué hacen los médicos en la plataforma',
      intro: 'Los médicos y especialistas son el centro diagnóstico y de prescripción de la red.',
      cards: [
        { title: 'Diagnóstico y valoración', text: 'La evaluación clínica se registra una sola vez, en un expediente que puede leer cada profesional del caso.' },
        { title: 'Remisiones con contexto', text: 'Enviar a un paciente a terapia o a diagnóstico traslada la historia con él, en lugar de empezar de cero.' },
        { title: 'Prescripción', text: 'Las recetas llegan directo a una farmacia conectada, con resurtidos y recordatorios incluidos.' },
        { title: 'Solicitud de estudios', text: 'Los estudios se solicitan desde la misma pantalla y los resultados regresan al expediente de forma automática.' },
        { title: 'Revisión y seguimiento', text: 'Los controles programados mantienen en marcha los planes de largo plazo en lugar de dejarlos caer entre visitas.' },
        { title: 'Visión del equipo de atención', text: 'Visibilidad de la evolución en terapia, para que las decisiones médicas reflejen lo que ocurre semana a semana.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Un médico que ya tiene el panorama',
          points: [
            'Busque médicos verificados por especialidad, necesidad y disponibilidad',
            'Agende citas en línea o presenciales con disponibilidad en tiempo real',
            'No repita la historia clínica al inicio de cada cita',
            'Remisiones, recetas y resultados con seguimiento en un solo lugar',
            'Controles programados, en vez de dejarlos en manos de la familia',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para médicos y clínicas',
          title: 'Menos administración, más tiempo clínico',
          points: [
            'Llegue a pacientes que buscan activamente su especialidad',
            'Historia completa y notas de terapia disponibles antes de la consulta',
            'Remisiones y resultados que fluyen solos, sin llamadas',
            'Un solo calendario para consultas en línea y presenciales',
            'Registro completo de auditoría de cada acceso y cada acción',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Por qué importa que la atención médica pase por un solo expediente',
      intro: 'Las ganancias vienen sobre todo de eliminar el trabajo repetido y la información perdida.',
      cards: [
        { title: 'Decisiones más rápidas', text: 'La historia relevante ya está ahí cuando comienza la consulta.' },
        { title: 'Menos estudios duplicados', text: 'Los resultados son visibles para todos, así no se pide dos veces el mismo estudio.' },
        { title: 'Prescripción más segura', text: 'El historial de medicamentos y su dispensación viven en el mismo expediente.' },
        { title: 'Continuidad por años', text: 'Las condiciones de largo plazo conservan su historia completa aunque cambien los profesionales.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'La plataforma hace el seguimiento, no la familia',
      text: 'Uribcare se sitúa por debajo de la relación médico-paciente y asume el trabajo de coordinación que de otro modo recae en el paciente: enrutar remisiones, devolver resultados y mantener a todos los profesionales alineados.',
      points: [
        'Revisión de credenciales antes de publicar cualquier perfil médico',
        'Acceso al expediente controlado por consentimiento, decidido por el paciente',
        'Remisiones, recetas y solicitudes de laboratorio enrutadas automáticamente',
        'Cifrado en tránsito y en reposo, con registro completo de auditoría',
        'Video seguro y consultas presenciales en un mismo calendario',
      ],
      quote: 'Cada profesional trabaja desde la misma fuente de información, así nada se repite y nada se pierde.',
      quoteWho: 'El equipo de plataforma de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo transcurre una consulta médica en la plataforma',
      intro: 'De la búsqueda al seguimiento, con cada paso registrado una sola vez.',
      steps: [
        { label: 'Paso 1', title: 'Encontrar al médico indicado', text: 'Busque médicos y especialistas verificados, filtrados por necesidad, ubicación y disponibilidad.' },
        { label: 'Paso 2', title: 'Agendar la consulta', text: 'Disponibilidad en tiempo real para video seguro o consulta en clínica, con recordatorios automáticos.' },
        { label: 'Paso 3', title: 'Consultar con la historia completa', text: 'El médico abre el expediente compartido, con diagnósticos, notas de terapia y resultados previos ya disponibles.' },
        { label: 'Paso 4', title: 'Actuar sobre el plan', text: 'Se emiten remisiones, recetas y solicitudes de estudios, y se enrutan al profesional conectado.' },
        { label: 'Paso 5', title: 'Dar seguimiento', text: 'Los resultados vuelven al expediente, el equipo se actualiza y se agenda la siguiente revisión.' },
      ],
    },
    cta: {
      heading: 'Únase a Uribcare como médico o encuentre uno',
      text: 'Los médicos y especialistas pueden registrarse para la revisión de credenciales. Los pacientes pueden iniciar una prueba gratuita y buscar médicos verificados hoy mismo.',
      primary: { label: 'Registrarme como médico', href: '/register' },
      secondary: { label: 'Ver demo', href: '/#contact' },
      note: 'Las credenciales se revisan manualmente. Los perfiles permanecen sin verificar hasta completar esa revisión.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('therapists-counselors'),
    eyebrow: 'El ecosistema',
    title: 'Terapeutas y consejeros',
    subtitle:
      'Apoyo conductual, ocupacional, del habla y de salud mental: asignado, agendado y con seguimiento a lo largo del tiempo.',
    metaDescription:
      'Cómo trabajan los terapeutas y consejeros dentro del ecosistema Uribcare: asignados según la necesidad, agendados en un solo calendario y con la evolución compartida.',
    overview: {
      heading: 'Los profesionales que la familia ve con más frecuencia',
      paragraphs: [
        'La terapia es la parte de la salud que se mide en años, no en citas. Un niño en atención del autismo puede ver a un terapeuta del habla, uno ocupacional, uno conductual y a un consejero, cada semana y durante mucho tiempo.',
        'Eso convierte la coordinación en lo esencial. Uribcare asigna a las familias los especialistas indicados, mantiene cada sesión recurrente en un solo calendario y le da a cada terapeuta visibilidad de lo que están trabajando los demás.',
        'Los terapeutas se registran con su tipo de terapia, sus áreas de práctica, los datos de su licencia y su experiencia en autismo, de modo que la asignación se basa en la especialización real y no en un directorio genérico.',
      ],
      highlights: ['Asignación por especialización', 'Sesiones recurrentes en un calendario', 'Evolución compartida entre terapeutas'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué hacen los terapeutas y consejeros en la plataforma',
      intro: 'La capa de contacto frecuente y de largo plazo del recorrido de atención.',
      cards: [
        { title: 'Asignación de especialistas', text: 'Las familias se asignan por tipo de terapia y área de práctica: habla, ocupacional, física, conductual o consejería.' },
        { title: 'Agenda recurrente', text: 'Sesiones semanales o quincenales reservadas como serie, no una cita a la vez.' },
        { title: 'Seguimiento de la evolución', text: 'Metas y resultados registrados sesión por sesión y visibles para todo el equipo.' },
        { title: 'Metas coordinadas', text: 'Objetivos de habla, ocupacionales y conductuales alineados, en lugar de tirar en direcciones distintas.' },
        { title: 'Acompañamiento a la familia', text: 'Estrategias enseñadas a familias y cuidadores, y registradas para que todos refuercen el mismo enfoque.' },
        { title: 'Consejería y salud mental', text: 'Consejería individual, infantil y familiar dentro del mismo plan coordinado.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Un equipo en lugar de cuatro calendarios',
          points: [
            'Asignación a terapeutas que de verdad se especializan en la necesidad',
            'Todas las sesiones recurrentes en un solo calendario',
            'Evolución visible sin tener que preguntarle a cada terapeuta por separado',
            'Estrategias que concuerdan entre disciplinas',
            'Sesiones en línea o presenciales, según convenga esa semana',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para terapeutas y consejeros',
          title: 'Contexto desde la primera sesión',
          points: [
            'Las remisiones llegan con evaluaciones e historia adjuntas',
            'Vea en qué están trabajando los demás terapeutas del caso',
            'Menos administración de agenda y menos ausencias',
            'Llegue a familias que buscan su especialización',
            'Credenciales verificadas una vez y visibles para quienes remiten',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Lo que cambia con la coordinación',
      intro: 'La diferencia entre cuatro profesionales y un equipo es, sobre todo, información.',
      cards: [
        { title: 'Metas alineadas', text: 'Los terapeutas se refuerzan entre sí en lugar de trabajar con planes distintos.' },
        { title: 'Evolución visible', text: 'Las familias ven el avance a lo largo de meses, no solo recuerdan sesiones sueltas.' },
        { title: 'Menos repetición', text: 'La historia se cuenta una vez y queda disponible para quien la necesite.' },
        { title: 'Continuidad ante los cambios', text: 'Si cambia un terapeuta, el expediente y las metas se quedan con el paciente.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'Pensado para una atención que se mide en años',
      text: 'La atención del autismo implica que muchos profesionales avancen juntos durante mucho tiempo. Uribcare los mantiene coordinados alrededor de un paciente, un plan y un recorrido conectado.',
      points: [
        'Asignación a los especialistas indicados según la necesidad de cada paciente',
        'Evolución compartida para que cada profesional vea la historia completa',
        'Terapia, consejería y seguimientos en un solo calendario',
        'Revisión de licencias y certificaciones antes de publicar cualquier perfil',
        'Apoyo a las familias que continúa entre una visita y otra',
      ],
      quote: 'Usted nunca debería ser quien mantiene unida la atención de su hijo. Ese es nuestro trabajo.',
      quoteWho: 'El equipo de atención de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo funciona la terapia en la plataforma',
      intro: 'De la asignación a la revisión, con todo el equipo en sintonía.',
      steps: [
        { label: 'Paso 1', title: 'Asignación', text: 'La familia se asigna a terapeutas según el tipo de terapia, el área de práctica y la disponibilidad.' },
        { label: 'Paso 2', title: 'Evaluación', text: 'Cada terapeuta evalúa y registra las metas iniciales en el expediente compartido.' },
        { label: 'Paso 3', title: 'Agendar la serie', text: 'Las sesiones recurrentes se reservan en bloque y quedan en un solo calendario con recordatorios.' },
        { label: 'Paso 4', title: 'Atender y registrar', text: 'Las sesiones se realizan en línea o de forma presencial, con la evolución registrada frente a las metas acordadas.' },
        { label: 'Paso 5', title: 'Revisar en conjunto', text: 'Las metas se revisan entre disciplinas y el plan se ajusta como equipo.' },
      ],
    },
    cta: {
      heading: 'Únase como terapeuta o consejero',
      text: 'Regístrese para recibir familias que necesitan su especialización, o inicie una prueba gratuita para encontrar al terapeuta indicado.',
      primary: { label: 'Registrarme como profesional', href: '/register' },
      secondary: { label: 'Ver demo', href: '/#contact' },
      note: 'Los datos de licencia y certificación se revisan antes de publicar cualquier perfil.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('nurses-home-care'),
    eyebrow: 'El ecosistema',
    title: 'Enfermería y atención domiciliaria',
    subtitle:
      'Visitas a domicilio coordinadas y apoyo continuo que siempre permanecen conectados con el resto del equipo de atención.',
    metaDescription:
      'Cómo funciona la enfermería y la atención domiciliaria dentro del ecosistema Uribcare: visitas agendadas y registradas en el mismo expediente compartido.',
    overview: {
      heading: 'Atención que llega hasta el paciente',
      paragraphs: [
        'No todos los pacientes pueden trasladarse, y no toda necesidad cabe en un espacio de consulta. La atención domiciliaria cubre las visitas que ocurren donde el paciente realmente vive: controles postoperatorios, necesidades de enfermería continuas, apoyo con medicamentos y la ayuda práctica que mantiene estable a una persona en su casa.',
        'Históricamente, las visitas domiciliarias han sido la parte más desconectada de la salud: la enfermera ve al paciente, escribe una nota y esa nota no llega a ningún lado. En Uribcare la visita se agenda, se registra y queda visible para el médico y los terapeutas del mismo caso.',
        'Para las familias que manejan necesidades complejas o de largo plazo, esto suele ser lo que hace viable quedarse en casa en lugar de agotarse.',
      ],
      highlights: ['Visitas domiciliarias agendadas', 'Notas en el expediente compartido', 'Conectada con todo el equipo'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué cubre la atención domiciliaria',
      intro: 'La capa presencial que llega al paciente donde se encuentre.',
      cards: [
        { title: 'Visitas de enfermería a domicilio', text: 'Visitas agendadas para necesidades clínicas continuas, registradas en el mismo expediente que lee el médico.' },
        { title: 'Apoyo tras el alta', text: 'Seguimiento después de una cirugía o de una hospitalización, con rutas de escalamiento si algo cambia.' },
        { title: 'Apoyo con medicamentos', text: 'Administración, apoyo a la adherencia y recordatorios, conectados con la farmacia de la red.' },
        { title: 'Observación y signos vitales', text: 'Mediciones de rutina registradas en el expediente para que las tendencias sean visibles con el tiempo.' },
        { title: 'Formación a la familia', text: 'Acompañamiento práctico para que los cuidadores manejen con confianza el tiempo entre visitas.' },
        { title: 'Escalamiento al equipo', text: 'Una vía directa de vuelta al médico tratante cuando una visita detecta algo preocupante.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Apoyo en casa que sí está conectado',
          points: [
            'Visitas agendadas en torno al hogar, no a la clínica',
            'Atención para pacientes que no pueden trasladarse con facilidad',
            'Cada visita registrada donde el médico puede verla',
            'Cuidadores formados en qué observar y qué hacer',
            'Un solo punto de coordinación en lugar de varias agencias',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para enfermería y atención domiciliaria',
          title: 'Llegar conociendo el caso',
          points: [
            'Historia del paciente y plan vigente disponibles antes de la visita',
            'Notas capturadas una vez y compartidas con todo el equipo',
            'Ruta clara de escalamiento hacia el médico tratante',
            'Agenda y recordatorios gestionados por la plataforma',
            'Llegue a pacientes en las zonas que usted cubre',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Por qué importa una atención domiciliaria conectada',
      intro: 'Las visitas en casa dejan de ser un callejón sin salida para la información.',
      cards: [
        { title: 'Menos reingresos', text: 'Los problemas se detectan en casa y se escalan antes de volverse urgencias.' },
        { title: 'Acceso sin traslados', text: 'La atención llega a pacientes para quienes ir a la clínica es la barrera.' },
        { title: 'Cuidadores con confianza', text: 'Las familias saben qué hacer entre visitas y a quién contactar.' },
        { title: 'Expediente continuo', text: 'Las observaciones en casa conviven con las notas clínicas y de terapia.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'La visita es parte del plan, no algo aparte',
      text: 'Uribcare agenda las visitas domiciliarias en el mismo calendario que las consultas y la terapia, y enruta lo que observa la enfermera hacia los profesionales que lo necesitan.',
      points: [
        'Visitas domiciliarias agendadas junto con consultas y sesiones de terapia',
        'Notas de visita escritas en el expediente compartido del paciente',
        'Apoyo con medicamentos conectado con las farmacias de la red',
        'Acceso controlado por consentimiento, decidido por la familia',
        'Registro completo de auditoría de cada acceso al expediente',
      ],
      quote: 'Atención coordinada en tiempo real, incluida la que ocurre en la mesa de la cocina.',
      quoteWho: 'El equipo de atención de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo transcurre un episodio de atención domiciliaria',
      intro: 'Solicitado, agendado, realizado y devuelto al expediente.',
      steps: [
        { label: 'Paso 1', title: 'Solicitud o remisión', text: 'Un médico o la familia solicita apoyo domiciliario a través de la plataforma.' },
        { label: 'Paso 2', title: 'Asignación y agenda', text: 'Se asigna personal de enfermería o atención domiciliaria que cubre esa zona y se reservan las visitas.' },
        { label: 'Paso 3', title: 'Visita preparada', text: 'El profesional llega con la historia, el plan vigente y la lista de medicamentos ya a la mano.' },
        { label: 'Paso 4', title: 'Registro y escalamiento', text: 'Las observaciones se registran y cualquier hallazgo preocupante se escala al médico tratante.' },
        { label: 'Paso 5', title: 'Apoyo continuo', text: 'Las visitas recurrentes continúan con todo el equipo viendo el mismo panorama.' },
      ],
    },
    cta: {
      heading: 'Integre la atención domiciliaria al mismo plan',
      text: 'El personal de enfermería y los proveedores de atención domiciliaria pueden registrarse para unirse a la red. Las familias pueden iniciar una prueba gratuita para organizar apoyo coordinado en casa.',
      primary: { label: 'Registrarme como profesional', href: '/register' },
      secondary: { label: 'Ver demo', href: '/#contact' },
      note: 'Preparado para HIPAA · Atención en línea y presencial',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('pharmacies'),
    eyebrow: 'El ecosistema',
    title: 'Farmacias',
    subtitle: 'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.',
    metaDescription:
      'Cómo funcionan las farmacias dentro del ecosistema Uribcare: recetas enrutadas de la consulta a la dispensación, con resurtidos, recordatorios y opciones de entrega.',
    overview: {
      heading: 'El punto donde los tratamientos suelen perderse',
      paragraphs: [
        'Una receta solo sirve cuando se surte, se toma y se resurte a tiempo. Ese traspaso, de la consulta a la farmacia, al paciente y al resurtido, es donde falla en silencio una cantidad sorprendente de tratamientos.',
        'Las farmacias conectadas reciben las recetas directamente desde la consulta, así nada depende de que un papel cruce la ciudad. Los resurtidos y recordatorios quedan programados y el equipo de atención puede ver si el medicamento se está recogiendo.',
        'Las farmacias se registran con los datos de su licencia, su farmacéutico responsable y los servicios que ofrecen (dispensación, entrega, pedido por correo o medicamentos especializados) para que los pacientes se asignen a una farmacia que realmente pueda atender su necesidad.',
      ],
      highlights: ['Recetas enrutadas automáticamente', 'Resurtidos y recordatorios incluidos', 'Opciones de entrega y especializadas'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué hacen las farmacias conectadas',
      intro: 'La capa de dispensación que convierte un plan en medicamento en manos del paciente.',
      cards: [
        { title: 'Dispensación de recetas', text: 'Las recetas llegan directamente desde la consulta, sin que el paciente tenga que llevarlas.' },
        { title: 'Gestión de resurtidos', text: 'La medicación crónica se programa con antelación para que el tratamiento no se interrumpa entre pedidos.' },
        { title: 'Recordatorios', text: 'Avisos de recogida y de toma que llegan al paciente o a su cuidador.' },
        { title: 'Entrega y pedido por correo', text: 'Opciones para pacientes que no pueden trasladarse a recoger su medicamento.' },
        { title: 'Medicamentos especializados', text: 'Las farmacias habilitadas para dispensación especializada se asignan a los pacientes que las necesitan.' },
        { title: 'Visibilidad de la medicación', text: 'El equipo de atención puede ver en un solo lugar qué se recetó y qué se dispensó.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Medicamentos al ritmo del plan',
          points: [
            'Sin recetas en papel que llevar o perder',
            'Resurtidos programados antes de que se acabe el tratamiento',
            'Entrega a domicilio para hogares donde recoger es difícil',
            'Recordatorios para el paciente o para quien lo cuida',
            'Un solo historial de medicamentos para todos los prescriptores',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para farmacias',
          title: 'Demanda estable y conectada',
          points: [
            'Las recetas llegan en formato digital desde médicos conectados',
            'Llegue a pacientes que buscan entrega o dispensación especializada',
            'Menos llamadas de aclaración, porque la receta llega con contexto',
            'Registre una sola vez sus servicios, horarios y cobertura',
            'Datos de licencia verificados antes de publicar el perfil',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Por qué importa el enlace con la farmacia',
      intro: 'La adherencia mejora cuando la logística deja de ser problema del paciente.',
      cards: [
        { title: 'Menos dosis olvidadas', text: 'Los resurtidos y recordatorios mantienen en marcha los tratamientos largos.' },
        { title: 'Dispensación más rápida', text: 'La receta ya está en la farmacia antes de que llegue el paciente.' },
        { title: 'Historial más seguro', text: 'Todos los prescriptores ven la misma lista de medicamentos.' },
        { title: 'Acceso en casos difíciles', text: 'Entrega y vías especializadas para quienes las necesitan.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'De la consulta a la entrega, sin huecos',
      text: 'Uribcare traslada la receta a través del traspaso y mantiene el historial de medicamentos visible para todos los que atienden al paciente.',
      points: [
        'Recetas enrutadas directamente de la consulta a la farmacia elegida',
        'Calendarios de resurtido y recordatorios generados automáticamente',
        'Historial de medicamentos visible para todo el equipo de atención',
        'Licencia de la farmacia y datos del farmacéutico responsable revisados al registrarse',
        'Cifrado de extremo a extremo, con registro completo de auditoría',
      ],
      quote: 'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.',
      quoteWho: 'El equipo de plataforma de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo circula una receta',
      intro: 'Cuatro pasos, del consultorio al siguiente resurtido.',
      steps: [
        { label: 'Paso 1', title: 'Prescrita', text: 'El médico emite la receta dentro del expediente de la consulta.' },
        { label: 'Paso 2', title: 'Enrutada', text: 'Se envía de inmediato a la farmacia conectada que eligió el paciente.' },
        { label: 'Paso 3', title: 'Dispensada', text: 'La farmacia prepara el medicamento para recoger o entregar y marca el pedido como completado.' },
        { label: 'Paso 4', title: 'Resurtida', text: 'Los recordatorios de resurtido se activan con antelación para que el tratamiento no se interrumpa.' },
      ],
    },
    cta: {
      heading: 'Registre su farmacia',
      text: 'Únase a la red para recibir recetas directamente de los médicos conectados de todo el ecosistema Uribcare.',
      primary: { label: 'Registrar una farmacia', href: '/register' },
      secondary: { label: 'Ver demo', href: '/#contact' },
      note: 'Los datos de la licencia de farmacia se revisan antes de publicar el perfil.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('diagnostic-labs'),
    eyebrow: 'El ecosistema',
    title: 'Laboratorios de diagnóstico',
    subtitle:
      'Solicite estudios, agende la toma de muestras y reciba los resultados en el expediente de forma automática para cada profesional.',
    metaDescription:
      'Cómo funcionan los laboratorios de diagnóstico dentro del ecosistema Uribcare: solicitudes digitales, toma de muestras agendada y resultados enrutados al expediente compartido.',
    overview: {
      heading: 'Resultados que sí encuentran el camino de vuelta',
      paragraphs: [
        'El diagnóstico es donde la atención se detiene con más frecuencia. Se solicita un estudio, el paciente lo agenda en otro lado, el resultado le llega a un solo profesional y los demás esperan, o repiten el estudio porque no pueden verlo.',
        'Los laboratorios conectados reciben las solicitudes en formato digital, ofrecen atención sin cita, con cita o toma de muestras a domicilio, y devuelven los resultados directamente al expediente compartido. El médico que solicitó, el terapeuta y la familia ven el mismo resultado al mismo tiempo.',
        'Los laboratorios se registran con su número CLIA, el tipo de certificado y su acreditación, junto con cada sede que operan, para que los pacientes se asignen a un punto que de verdad les quede cerca.',
      ],
      highlights: ['Solicitud digital de estudios', 'Sin cita, con cita o a domicilio', 'Resultados devueltos automáticamente'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué hacen los laboratorios conectados',
      intro: 'La capa diagnóstica que alimenta con evidencia todas las demás decisiones.',
      cards: [
        { title: 'Solicitudes digitales', text: 'Las órdenes llegan desde la consulta con el contexto clínico ya adjunto.' },
        { title: 'Toma de muestras flexible', text: 'Sin cita, con cita previa o a domicilio, según lo que necesite el paciente.' },
        { title: 'Múltiples sedes', text: 'Los laboratorios registran cada punto de toma, para asignar al paciente el más conveniente.' },
        { title: 'Devolución automática', text: 'Los resultados llegan al expediente compartido para todos los profesionales del caso a la vez.' },
        { title: 'Amplia cobertura de estudios', text: 'Análisis de sangre, orina, pruebas diagnósticas y genéticas en toda la red conectada.' },
        { title: 'Credenciales verificadas', text: 'Número CLIA, tipo de certificado y acreditación revisados antes de la publicación.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Estudios sin llamadas de por medio',
          points: [
            'Agende la toma de muestras en la sede que le convenga, o en casa',
            'Sin perseguir a la clínica para saber si ya llegaron los resultados',
            'Resultados visibles para cada profesional que lo atiende',
            'Menos estudios repetidos porque nadie podía ver el anterior',
            'Historial de resultados previos reunido en un solo lugar',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para laboratorios',
          title: 'Solicitudes que llegan completas',
          points: [
            'Órdenes digitales con contexto clínico, no papeles escritos a mano',
            'Llegue a pacientes remitidos por médicos conectados',
            'Registre una sola vez cada sede, servicio y disponibilidad',
            'Resultados entregados automáticamente a todo el equipo',
            'Acreditación y datos CLIA verificados al registrarse',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Qué cambia cuando los resultados se comparten',
      intro: 'El diagnóstico deja de ser un cuello de botella a mitad del recorrido.',
      cards: [
        { title: 'Diagnóstico más rápido', text: 'Los resultados llegan al médico en cuanto están listos.' },
        { title: 'Sin estudios duplicados', text: 'Todos pueden ver lo que ya se realizó.' },
        { title: 'Más simple para el paciente', text: 'Toma de muestras agendada donde y como le convenga, incluso en casa.' },
        { title: 'Mejores decisiones', text: 'Terapeutas y médicos trabajan sobre la misma evidencia.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'Solicitud, toma de muestras y resultados en un mismo circuito',
      text: 'Uribcare cierra el circuito diagnóstico: la orden sale en formato digital, la toma de muestras se agenda y el resultado vuelve a todos los que lo necesitan sin una sola llamada.',
      points: [
        'Órdenes emitidas desde la consulta con el contexto adjunto',
        'Toma de muestras con cita, sin cita o a domicilio',
        'Resultados enrutados automáticamente al expediente compartido',
        'Revisión de CLIA, certificado y acreditación al registrarse',
        'Acceso controlado por consentimiento y registro completo de auditoría',
      ],
      quote: 'Solicite estudios, agende la toma de muestras y reciba los resultados en el expediente de forma automática para cada profesional.',
      quoteWho: 'El equipo de plataforma de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo circula un estudio',
      intro: 'Cuatro pasos, ninguno de los cuales depende de que el paciente cargue papeles.',
      steps: [
        { label: 'Paso 1', title: 'Solicitado', text: 'El médico solicita el estudio dentro del expediente de la consulta.' },
        { label: 'Paso 2', title: 'Toma agendada', text: 'El paciente elige atención sin cita, un horario reservado o toma de muestras a domicilio.' },
        { label: 'Paso 3', title: 'Procesado', text: 'El laboratorio conectado realiza el estudio y completa la orden.' },
        { label: 'Paso 4', title: 'Devuelto', text: 'Los resultados llegan al expediente compartido y el equipo recibe la notificación.' },
      ],
    },
    cta: {
      heading: 'Registre su laboratorio',
      text: 'Únase a la red para recibir solicitudes digitales y devolver resultados directamente al expediente compartido.',
      primary: { label: 'Registrar un laboratorio', href: '/register' },
      secondary: { label: 'Ver demo', href: '/#contact' },
      note: 'Los datos de CLIA y acreditación se revisan antes de publicar el laboratorio.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('connected-record'),
    eyebrow: 'El ecosistema',
    title: 'Un expediente conectado',
    subtitle: 'Todos trabajan desde la misma fuente de información, así nada se repite y nada se pierde.',
    metaDescription:
      'El expediente conectado en el centro del ecosistema Uribcare: una sola historia del paciente, controlada por consentimiento y compartida con cada profesional.',
    overview: {
      heading: 'La pieza que hace funcionar todo lo demás',
      paragraphs: [
        'Todas las demás categorías del ecosistema dependen de esta. Médicos, terapeutas, enfermería, farmacias y laboratorios solo se comportan como un equipo si leen y escriben en el mismo expediente.',
        'El expediente conectado guarda la historia una sola vez: diagnósticos, metas y evolución de terapia, medicamentos, resultados de estudios, notas de visitas domiciliarias y citas. Cada profesional ve la parte que le corresponde a su función, y la familia deja de ser el mensajero entre todos ellos.',
        'El control lo tiene el paciente. El consentimiento decide quién puede ver qué, cada acceso queda registrado y los datos se cifran en tránsito y en reposo conforme a estándares preparados para HIPAA.',
      ],
      highlights: ['Una historia, contada una vez', 'Consentimiento controlado por el paciente', 'Cifrado con auditoría completa'],
    },
    provides: {
      eyebrow: 'Su papel en el ecosistema Uribcare',
      heading: 'Qué contiene el expediente conectado',
      intro: 'Una sola historia continua, en lugar de una carpeta por profesional.',
      cards: [
        { title: 'Diagnósticos y notas clínicas', text: 'Valoraciones y decisiones médicas registradas una vez y legibles para todo el equipo.' },
        { title: 'Metas y evolución de terapia', text: 'Avance sesión por sesión en terapia del habla, ocupacional, física y conductual.' },
        { title: 'Historial de medicamentos', text: 'Qué se recetó, qué se dispensó y qué toca resurtir.' },
        { title: 'Resultados de estudios', text: 'Resultados de laboratorio devueltos automáticamente y conservados junto al panorama clínico.' },
        { title: 'Citas y seguimientos', text: 'Cada consulta, sesión de terapia y visita domiciliaria en una sola línea de tiempo.' },
        { title: 'Consentimiento y auditoría', text: 'Quién tiene acceso, qué consultó y cuándo: visible y revocable.' },
      ],
    },
    audience: {
      eyebrow: 'Cómo se conecta con los pacientes',
      heading: 'Lo que gana cada parte',
      groups: [
        {
          tone: 'cool',
          tag: 'Para pacientes y familias',
          title: 'Deje de ser el mensajero',
          points: [
            'Un expediente que nunca tiene que volver a explicar',
            'Decida qué profesionales pueden acceder, y revoque el acceso cuando quiera',
            'Vea citas, resultados y evolución en una sola línea de tiempo',
            'Nada se pierde cuando cambia un profesional',
            'Historia completa para condiciones de largo plazo, conservada durante años',
          ],
        },
        {
          tone: 'warm',
          tag: 'Para profesionales y clínicas',
          title: 'Continuidad real de la atención',
          points: [
            'Expedientes compartidos para una continuidad auténtica entre profesionales',
            'Remisiones y resultados que fluyen automáticamente',
            'Menos administración, más tiempo con los pacientes',
            'Registro completo de auditoría de cada acceso y cada acción',
            'Consentimiento gestionado por la plataforma, no en papel',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios clave',
      heading: 'Qué elimina una sola fuente de información',
      intro: 'Sobre todo elimina repetición, demoras y los huecos por donde se pierden los pacientes.',
      cards: [
        { title: 'Sin repetir la historia', text: 'Se cuenta una vez, no en cada cita.' },
        { title: 'Sin información perdida', text: 'Notas y resultados se quedan con el paciente, no con un profesional.' },
        { title: 'Menos huecos', text: 'Seguimientos y remisiones con trazabilidad, no dados por supuestos.' },
        { title: 'Confianza por diseño', text: 'Consentimiento, cifrado y auditoría incorporados desde el primer día.' },
      ],
    },
    support: {
      eyebrow: 'Cómo coordina Uribcare esta parte de la atención',
      heading: 'Confianza de nivel sanitario, incorporada desde el primer día',
      text: 'El cumplimiento normativo es la base sobre la que se construye el expediente, para que pacientes y profesionales colaboren con confianza.',
      points: [
        'Preparado para HIPAA, conforme a estándares de privacidad y protección de datos en salud',
        'Cifrado en tránsito y en reposo, en cada paso del camino',
        'Los pacientes deciden quién ve su expediente y cuándo',
        'Cada acceso y cada acción quedan registrados para rendir cuentas',
        'Un expediente que abarca consultas, terapia, farmacia y diagnóstico',
      ],
      quote: 'Todos trabajan desde la misma fuente de información, así nada se repite y nada se pierde.',
      quoteWho: 'El equipo de plataforma de Uribcare',
    },
    process: {
      eyebrow: 'El flujo de trabajo',
      heading: 'Cómo crece el expediente',
      intro: 'Cada interacción suma a una sola historia continua.',
      steps: [
        { label: 'Paso 1', title: 'Creado', text: 'El expediente se crea cuando el paciente se registra, y le pertenece y lo controla él.' },
        { label: 'Paso 2', title: 'Consentimiento otorgado', text: 'El paciente da acceso a los profesionales que participan en su atención.' },
        { label: 'Paso 3', title: 'Alimentado', text: 'Consultas, sesiones de terapia, recetas, resultados y visitas domiciliarias escriben en él.' },
        { label: 'Paso 4', title: 'Consultado', text: 'Cada profesional trabaja sobre el mismo panorama vigente, no sobre una copia parcial.' },
        { label: 'Paso 5', title: 'Auditado', text: 'El acceso se registra de forma continua y el consentimiento puede cambiarse o retirarse cuando se quiera.' },
      ],
    },
    cta: {
      heading: 'Un expediente para todo el recorrido',
      text: 'Inicie una prueba gratuita para reunir su atención en un expediente conectado, o regístrese como profesional para unirse a la red.',
      primary: { label: 'Iniciar prueba gratuita', href: '/#contact' },
      secondary: { label: 'Registrarme', href: '/register' },
      note: 'Preparado para HIPAA · Cifrado de extremo a extremo · Auditoría completa',
    },
  },
];

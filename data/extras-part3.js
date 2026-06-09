// ============================================================
// Pattern Extras - Part 3: Flyweight, Proxy, Observer, Strategy
// ============================================================

// ── FLYWEIGHT ────────────────────────────────────────────────
window.PATTERN_EXTRAS.flyweight = {
  identifierKeywords: [
    'millions of objects', 'memory consumption', 'shared state',
    'intrinsic', 'extrinsic', 'pool of objects', 'cache shared',
    'point of interest', 'POI', 'glyph', 'characters',
    'ذاكرة', 'مشاركة', 'آلاف الكائنات', 'flyweight', 'optimize memory'
  ],
  identifierPhrases: [
    'too many similar objects',
    'high memory consumption',
    'share common state',
    'intrinsic vs extrinsic',
    'ملايين الكائنات',
    'بيانات مشتركة'
  ],

  realWorldExamples: [
    {
      name: 'Text Editors (Characters)',
      desc: 'Word document فيه 100,000 حرف. لو كل حرف object منفصل بـ font, size, color = ذاكرة هائلة. Flyweight يشارك الـ font/style بين الحروف المتشابهة.',
      where: 'Microsoft Word, Google Docs'
    },
    {
      name: 'Map Markers (POI)',
      desc: 'خريطة فيها ملايين النقاط (مطاعم، محطات وقود). كل نقطة تشارك icon, color مع نقاط نفس النوع.',
      where: 'Google Maps, Apple Maps'
    },
    {
      name: 'Game Particles',
      desc: 'انفجار فيه آلاف الجسيمات (particles). كل واحدة تشارك texture/color مع باقي الجسيمات من نفس النوع.',
      where: 'Unity Particle System'
    },
    {
      name: 'Trees in Open World Games',
      desc: 'لعبة فيها غابة بـ 50,000 شجرة. كل شجرة تشارك model/texture مع شجرات نفس النوع.',
      where: 'Skyrim, Witcher 3, GTA'
    }
  ],

  pitfalls: [
    {
      title: 'تخزين Extrinsic داخل الـ Flyweight',
      bad: 'class Tree { String type; int x, y; }  // ❌ x,y extrinsic',
      good: 'class TreeType { String type; } // ✓ shared\nclass Tree { int x, y; TreeType type; }',
      reason: 'الـ x,y تتغير لكل شجرة (extrinsic)، فما يجب تخزينها في الـ Flyweight المشترك.'
    },
    {
      title: 'نسيان فحص containsKey قبل put',
      bad: 'Flyweight get(K key) {\n    Flyweight f = new Flyweight(key);  // ❌ ينشئ كل مرة\n    flyweights.put(key, f);\n    return f;\n}',
      good: 'if (flyweights.containsKey(key)) return flyweights.get(key);\nelse { f = new...; put; return; }  // ✓',
      reason: 'الفائدة الأساسية هي إعادة استخدام الكائنات. بدون فحص، تكسر النمط من أساسه.'
    },
    {
      title: 'الخلط بين Intrinsic و Extrinsic',
      bad: 'لو حطيت position كـ intrinsic، راح يكون لكل position flyweight مختلف!',
      good: 'Intrinsic = ثابت بين الكائنات (texture, color). Extrinsic = يتغير (position, ID)',
      reason: 'الحالة المشتركة (intrinsic) لازم تكون فعلاً مشتركة بين عدد كبير. الفريدة (extrinsic) تتمرر كـ parameter.'
    },
    {
      title: 'استخدام Map خاطئ للـ keys',
      bad: 'Map<Tree, Tree> map  // ❌ يستخدم الـ object كـ key',
      good: 'Map<String, TreeType> map  // ✓ string key واضح',
      reason: 'الـ key لازم يكون بسيط ويعرّف الـ flyweight (مثل اسم + لون)، مو الكائن نفسه.'
    }
  ],

  comparisons: [
    {
      with: 'Singleton',
      diff: 'Singleton = نسخة واحدة لكامل التطبيق. Flyweight = عدة نسخ مشتركة لمجموعات متشابهة.'
    },
    {
      with: 'Prototype',
      diff: 'Prototype ينسخ كائنات. Flyweight يشاركها (لا ينسخ).'
    }
  ],

  quiz: [
    {
      q: 'ما هو الـ Intrinsic State؟',
      options: [
        'الحالة المتغيرة لكل كائن',
        'الحالة المشتركة بين عدة كائنات',
        'الحالة المخفية',
        'الحالة العامة'
      ],
      correct: 1,
      explain: 'Intrinsic = ثابت ومشترك بين عدة flyweights (مثل texture, color). يُخزن داخل الـ Flyweight.'
    },
    {
      q: 'ما هو الـ Extrinsic State؟',
      options: [
        'الحالة المشتركة',
        'الحالة الفريدة لكل كائن، تُمرر كـ parameter',
        'الحالة الافتراضية',
        'الحالة الثابتة'
      ],
      correct: 1,
      explain: 'Extrinsic = فريدة لكل instance (مثل position). تُمرر للـ Flyweight كـ parameter عند الاستخدام.'
    },
    {
      q: 'لماذا نستخدم Factory مع Flyweight؟',
      options: [
        'لتعقيد الكود',
        'لإدارة المشاركة — يفحص إذا الـ flyweight موجود يُرجعه، وإلا ينشئ',
        'لتسريع البرنامج',
        'تتطلبه Java'
      ],
      correct: 1,
      explain: 'الـ Factory هو المسؤول عن المشاركة — يحفظ الموجود ويعيد استخدامه، ينشئ جديد فقط لما يحتاج.'
    },
    {
      q: 'الاختبار: "خريطة فيها ملايين علامات POI كل واحدة لها icon و position. الـ icon مشترك بين علامات نفس النوع." — أي نمط؟',
      options: ['Singleton', 'Prototype', 'Flyweight', 'Decorator'],
      correct: 2,
      explain: 'الكلمات المفتاحية: "ملايين" + "مشترك" + "icon مشترك، position فريد" = Flyweight بدون أدنى شك.'
    },
    {
      q: 'ما البنية المستخدمة في الـ Factory لحفظ الـ flyweights؟',
      options: ['Array', 'LinkedList', 'HashMap', 'Stack'],
      correct: 2,
      explain: 'HashMap مثالي للوصول السريع O(1) للـ flyweight عبر الـ key.'
    }
  ],

  decisionTree: {
    question: 'هل عندك آلاف/ملايين كائنات متشابهة وتحتاج توفير ذاكرة؟',
    yes: 'Flyweight ✓',
    no: 'لو نسخة وحيدة فقط — Singleton. لو نسخ منفصلة — Prototype.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Flyweight',
        type: 'class',
        members: [
          { name: '- intrinsic: shared data', kind: 'field', sig: '' },
          { name: '+ operation(extrinsic)', kind: 'method', sig: '' }
        ],
        x: 250, y: 50, w: 260, h: 100
      },
      {
        name: 'FlyweightFactory',
        type: 'class',
        members: [
          { name: '- pool: Map<K, Flyweight>', kind: 'field', sig: '' },
          { name: '+ getFlyweight(key)', kind: 'method', sig: '' }
        ],
        x: 50, y: 220, w: 260, h: 110
      },
      {
        name: 'Context',
        type: 'class',
        members: [
          { name: '- extrinsic: unique data', kind: 'field', sig: '' },
          { name: '- flyweight: Flyweight', kind: 'field', sig: '' }
        ],
        x: 380, y: 220, w: 240, h: 110
      }
    ],
    relations: [
      { from: 'FlyweightFactory', to: 'Flyweight', label: 'manages', type: 'has' },
      { from: 'Context', to: 'Flyweight', label: 'uses', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client يحتاج tree نوع "Oak" أخضر', actor: 'Client → Factory' },
    { step: 2, text: 'Factory يفحص: containsKey("Oak-green")?', actor: 'Factory checks Map' },
    { step: 3, text: 'لا — ينشئ TreeType جديد ويحفظه', actor: 'Factory creates TreeType' },
    { step: 4, text: 'يُرجع الـ TreeType للـ Client', actor: 'Factory → Client' },
    { step: 5, text: 'Client آخر يطلب نفس النوع', actor: 'Client2 → Factory' },
    { step: 6, text: 'Factory يلقاه موجود — يُرجع نفس الكائن (مشاركة!)', actor: 'Factory returns existing' }
  ]
};

// ── PROXY ────────────────────────────────────────────────────
window.PATTERN_EXTRAS.proxy = {
  identifierKeywords: [
    'control access', 'lazy loading', 'caching', 'authentication',
    'authorization', 'security', 'rate limiting', 'logging',
    'proxy', 'placeholder', 'وسيط', 'حماية', 'صلاحيات', 'تحقق'
  ],
  identifierPhrases: [
    'control access to object',
    'lazy initialization',
    'add caching layer',
    'check permissions before',
    'تحكم بالوصول',
    'تحقق قبل الاستخدام'
  ],

  realWorldExamples: [
    {
      name: 'API Gateway',
      desc: 'كل طلب يمر عبر gateway يتحقق من الـ authentication, rate limiting, logging قبل ما يصل للـ service الفعلي.',
      where: 'AWS API Gateway, Kong, Nginx'
    },
    {
      name: 'Lazy Image Loading',
      desc: 'صور كبيرة لا تُحمّل إلا عند الحاجة. الـ proxy يحمّل الصورة فقط لما تُعرض فعلاً.',
      where: 'Lazy loading in React, lazy in Spring'
    },
    {
      name: 'Database Connection Pool',
      desc: 'الـ proxy يدير الـ connections — يعطيك واحد متاح ويرجعه للـ pool لما تنتهي.',
      where: 'HikariCP, Apache DBCP'
    },
    {
      name: 'Caching Proxy',
      desc: 'API calls غالية. الـ proxy يحفظ النتائج في cache ويُرجعها بدون استدعاء الـ service.',
      where: 'CDN, Redis, Cloudflare'
    }
  ],

  pitfalls: [
    {
      title: 'الـ Proxy ما ينفذ نفس الـ interface',
      bad: 'class Proxy { ... }  // ❌ ما ينفذ Service',
      good: 'class Proxy implements Service { ... }  // ✓',
      reason: 'الـ Client يجب أن يستخدم الـ Proxy بنفس طريقة استخدامه الـ Real Service — لذا نفس الـ interface.'
    },
    {
      title: 'نسيان التفويض للـ Real Service',
      bad: 'public String getData() {\n    if (authorized) return "data";  // ❌ ما استدعى الـ real\n}',
      good: 'public String getData() {\n    if (authorized) return realService.getData();  // ✓\n}',
      reason: 'الـ Proxy يضيف logic إضافي، لكن العمل الفعلي يفوّضه للـ Real Service.'
    },
    {
      title: 'إنشاء Real Service كل مرة',
      bad: 'public String getData() {\n    Service s = new RealService();  // ❌ كل مرة\n    return s.getData();\n}',
      good: 'private Service real = new RealService();  // ✓ مرة واحدة',
      reason: 'الـ Real Service ينُشأ مرة واحدة في constructor، ويُحفظ في field.'
    },
    {
      title: 'الـ Proxy يفعل أكثر من اللازم',
      bad: 'class Proxy يضيف 5 ميزات مختلفة (auth + cache + log + retry + ...)',
      good: 'كل Proxy له مسؤولية واحدة — auth Proxy، cache Proxy منفصلين',
      reason: 'Single Responsibility — لو احتجت عدة وظائف، استخدم عدة proxies متسلسلة (Decorator-like).'
    }
  ],

  comparisons: [
    {
      with: 'Decorator',
      diff: 'Proxy يتحكم بالوصول (لا يضيف وظائف للعميل). Decorator يضيف وظائف جديدة.'
    },
    {
      with: 'Adapter',
      diff: 'Proxy نفس interface. Adapter يحول interface.'
    },
    {
      with: 'Facade',
      diff: 'Proxy واحد-لواحد (1:1). Facade يبسط مجموعة subsystems.'
    }
  ],

  quiz: [
    {
      q: 'الـ Proxy ينفذ نفس interface الـ Real Service. لماذا؟',
      options: [
        'لإجبار الـ compiler',
        'لتمكين الـ Client من استخدام Proxy بدل Real دون تغيير الكود',
        'لتعقيد الكود',
        'صدفة'
      ],
      correct: 1,
      explain: 'الفائدة الأساسية: العميل ما يحتاج يعرف هل يتعامل مع Proxy أو Real — Polymorphism.'
    },
    {
      q: 'ما الفرق الأساسي بين Proxy و Decorator؟',
      options: [
        'لا يوجد فرق',
        'Proxy يتحكم بالوصول. Decorator يضيف وظائف وميزات',
        'Proxy أحدث',
        'Decorator أقوى'
      ],
      correct: 1,
      explain: 'النية مختلفة: Proxy = تحكم/حماية، Decorator = إضافة. هما متشابهان في البنية لكن مختلفان في الغرض.'
    },
    {
      q: 'لو الاختبار: "نظام يفحص API key قبل ما يصل لـ Real Service" — أي نمط؟',
      options: ['Adapter', 'Proxy', 'Decorator', 'Strategy'],
      correct: 1,
      explain: 'فحص الصلاحية قبل التفويض = Proxy. لاحظ: الـ interface واحد، فقط نضيف طبقة تحكم.'
    },
    {
      q: 'في method الـ Proxy، ما الترتيب الصحيح؟',
      options: [
        'تفويض → فحص',
        'فحص → تفويض للـ Real (لو الفحص نجح)',
        'لا فحص، فقط تفويض',
        'لا تفويض، فقط فحص'
      ],
      correct: 1,
      explain: 'النمط: نفحص أولاً (auth/cache/permission)، ولو نجح نفوّض للـ Real Service.'
    }
  ],

  decisionTree: {
    question: 'هل تبي تتحكم بالوصول لكائن (auth, cache, lazy) بدون تغيير interface؟',
    yes: 'Proxy ✓',
    no: 'لو تبي تضيف وظائف — Decorator. لو تحويل interface — Adapter.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Service',
        type: 'interface',
        members: [
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 250, y: 50, w: 200, h: 80
      },
      {
        name: 'RealService',
        type: 'class',
        members: [
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 50, y: 220, w: 200, h: 80
      },
      {
        name: 'Proxy',
        type: 'class',
        members: [
          { name: '- real: Service', kind: 'field', sig: '' },
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 380, y: 220, w: 200, h: 100
      }
    ],
    relations: [
      { from: 'RealService', to: 'Service', label: 'implements', type: 'inherit' },
      { from: 'Proxy', to: 'Service', label: 'implements', type: 'inherit' },
      { from: 'Proxy', to: 'RealService', label: 'wraps', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client يستدعي proxy.getWeather("Jeddah")', actor: 'Client → Proxy' },
    { step: 2, text: 'Proxy يفحص الـ API key', actor: 'Proxy checks auth' },
    { step: 3, text: 'الـ key صحيح ✓', actor: 'Authorized' },
    { step: 4, text: 'Proxy يفوّض للـ Real Service', actor: 'Proxy → RealService' },
    { step: 5, text: 'RealService يجلب البيانات', actor: 'RealService executes' },
    { step: 6, text: 'النتيجة تعود عبر Proxy للـ Client', actor: 'RealService → Proxy → Client' }
  ]
};

// ── OBSERVER ─────────────────────────────────────────────────
window.PATTERN_EXTRAS.observer = {
  identifierKeywords: [
    'subscribe', 'unsubscribe', 'notify', 'event', 'listener', 'publish',
    'broadcast', 'subject', 'observer', 'watcher', 'one-to-many',
    'اشتراك', 'إشعار', 'مراقبة', 'تنبيه', 'subscribers'
  ],
  identifierPhrases: [
    'notify multiple objects',
    'subscribe to events',
    'one-to-many dependency',
    'publish/subscribe',
    'إعلام عدة كائنات',
    'subscribe/unsubscribe'
  ],

  realWorldExamples: [
    {
      name: 'Event Listeners (UI)',
      desc: 'زر فيه addEventListener("click", handler). الزر هو Subject، الـ handlers هم Observers.',
      where: 'JavaScript DOM, Java Swing'
    },
    {
      name: 'Social Media Notifications',
      desc: 'لما تنشر post، كل متابعينك يستلمون إشعار.',
      where: 'Twitter, Instagram'
    },
    {
      name: 'Stock Market Tickers',
      desc: 'سعر السهم يتغير، كل التطبيقات المشتركة تستلم التحديث.',
      where: 'Trading platforms (Bloomberg, MT4)'
    },
    {
      name: 'RxJava / Reactive Streams',
      desc: 'كامل البرمجة التفاعلية مبنية على Observer pattern.',
      where: 'RxJava, RxJS, Project Reactor'
    }
  ],

  pitfalls: [
    {
      title: 'نسيان loop على الـ observers في notify',
      bad: 'public void notifyUpdate(String m) {\n    observer.update(m);  // ❌ واحد فقط\n}',
      good: 'public void notifyUpdate(String m) {\n    for (Observer o : observers) o.update(m);  // ✓\n}',
      reason: 'الفائدة الأساسية هي تنبيه الكل، لذا نلف على الـ list ونستدعي update على كل واحد.'
    },
    {
      title: 'ConcurrentModificationException',
      bad: 'في notify لو observer استدعى unsubscribe من داخل update، نحصل على exception',
      good: 'استخدم copy: new ArrayList<>(observers) للتنبيه',
      reason: 'لو غيرت الـ list أثناء الـ iteration، Java ترمي exception. حل: انسخ الـ list قبل الـ loop.'
    },
    {
      title: 'استخدام Array بدل List',
      bad: 'Observer[] observers = new Observer[10];  // ❌ حجم ثابت',
      good: 'List<Observer> observers = new ArrayList<>();  // ✓ مرن',
      reason: 'عدد الـ observers يتغير دائماً (subscribe/unsubscribe)، فنحتاج بنية مرنة.'
    },
    {
      title: 'Memory Leak — observers ما تنفصل',
      bad: 'observer يبقى مشترك حتى بعد ما خلصت الحاجة',
      good: 'استدعي unsubscribe() لما تنتهي',
      reason: 'الـ Subject يحتفظ بـ reference للـ observer، فلو ما عملت unsubscribe، الـ GC ما يقدر يحرّر الـ observer.'
    }
  ],

  comparisons: [
    {
      with: 'Strategy',
      diff: 'Observer = one-to-many (تنبيه عدة كائنات). Strategy = one-to-one (الـ Context يختار strategy واحدة).'
    },
    {
      with: 'Mediator',
      diff: 'Observer = اتصال مباشر Subject→Observers. Mediator = طرف ثالث يدير الاتصالات.'
    }
  ],

  quiz: [
    {
      q: 'ما اسم الـ method التي يستدعيها الـ Subject على الـ Observer؟',
      options: ['call()', 'execute()', 'update()', 'run()'],
      correct: 2,
      explain: 'update() هي الـ method المتعارف عليها في Observer pattern.'
    },
    {
      q: 'ما البنية المستخدمة لحفظ الـ observers؟',
      options: ['HashMap', 'List<Observer>', 'Set', 'Array'],
      correct: 1,
      explain: 'List مرنة (تكبر/تصغر) وتسمح بالترتيب لو احتجت. الدكتور يستخدم ArrayList تحديداً.'
    },
    {
      q: 'في notifyUpdate، ماذا نفعل؟',
      options: [
        'نستدعي observer.update() لأول observer فقط',
        'نلف على كل observers ونستدعي update() على كل واحد',
        'نرسل event عبر network',
        'نضيف observer جديد'
      ],
      correct: 1,
      explain: 'for (Observer o : observers) o.update(message); — هذي روح النمط.'
    },
    {
      q: 'لو الاختبار: "TweetWatcher يبلغ Twitter, WhatsApp, Slack عند tweet جديد" — أي نمط؟',
      options: ['Strategy', 'Observer', 'Singleton', 'Adapter'],
      correct: 1,
      explain: 'تنبيه متعدد + subscribers + إعلام = Observer مباشرة.'
    },
    {
      q: 'لماذا الـ Subject يستخدم Observer interface وليس concrete classes؟',
      options: [
        'للتعقيد',
        'للسماح بأنواع متعددة من observers (Polymorphism)',
        'متطلب Java',
        'للأداء'
      ],
      correct: 1,
      explain: 'الـ Subject يتعامل مع أي observer ينفذ الـ interface — لذا يقدر يدعم أنواع متعددة من المشتركين.'
    }
  ],

  decisionTree: {
    question: 'هل تبي تبلغ عدة كائنات تلقائياً عند تغيير في كائن واحد؟',
    yes: 'Observer ✓',
    no: 'لو خوارزميات قابلة للتبديل — Strategy. لو وسيط يدير الاتصالات — Mediator.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Subject',
        type: 'interface',
        members: [
          { name: '+ subscribe(Observer)', kind: 'method', sig: '' },
          { name: '+ unsubscribe(Observer)', kind: 'method', sig: '' },
          { name: '+ notifyUpdate(msg)', kind: 'method', sig: '' }
        ],
        x: 50, y: 50, w: 260, h: 130
      },
      {
        name: 'Observer',
        type: 'interface',
        members: [
          { name: '+ update(msg)', kind: 'method', sig: '' }
        ],
        x: 380, y: 50, w: 220, h: 80
      },
      {
        name: 'ConcreteSubject',
        type: 'class',
        members: [
          { name: '- observers: List<Observer>', kind: 'field', sig: '' }
        ],
        x: 50, y: 240, w: 260, h: 80
      },
      {
        name: 'ConcreteObserver',
        type: 'class',
        members: [
          { name: '+ update(msg)', kind: 'method', sig: '' }
        ],
        x: 380, y: 240, w: 220, h: 80
      }
    ],
    relations: [
      { from: 'ConcreteSubject', to: 'Subject', label: 'implements', type: 'inherit' },
      { from: 'ConcreteObserver', to: 'Observer', label: 'implements', type: 'inherit' },
      { from: 'ConcreteSubject', to: 'Observer', label: 'notifies', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Observer1 يستدعي subject.subscribe(self)', actor: 'Observer1 → Subject' },
    { step: 2, text: 'Subject يضيفه للقائمة: observers.add(o1)', actor: 'Subject stores Observer1' },
    { step: 3, text: 'Observer2, Observer3 يشتركون كذلك', actor: 'More subscribers' },
    { step: 4, text: 'حدث جديد: subject.notifyUpdate("news!")', actor: 'Event happens' },
    { step: 5, text: 'Subject يلف على القائمة: for each observer', actor: 'Subject iterates' },
    { step: 6, text: 'كل observer يستدعي update("news!") تلقائياً', actor: 'All observers notified' }
  ]
};

// ── STRATEGY ─────────────────────────────────────────────────
window.PATTERN_EXTRAS.strategy = {
  identifierKeywords: [
    'multiple algorithms', 'swap algorithm', 'interchangeable',
    'payment method', 'sort method', 'compression', 'strategy',
    'runtime choice', 'policy',
    'خوارزميات متعددة', 'طرق دفع', 'تبديل', 'قابل للتبديل'
  ],
  identifierPhrases: [
    'multiple ways to do same thing',
    'swap algorithm at runtime',
    'family of algorithms',
    'avoid if-else for algorithm selection',
    'خوارزميات قابلة للتبديل',
    'اختيار طريقة وقت التشغيل'
  ],

  realWorldExamples: [
    {
      name: 'Payment Methods',
      desc: 'تطبيق متجر يدعم: CreditCard, PayPal, ApplePay. كل طريقة تنفذ pay() بشكل مختلف.',
      where: 'Stripe, PayPal SDK'
    },
    {
      name: 'Sorting Algorithms',
      desc: 'Collections.sort() يأخذ Comparator كـ strategy — تقدر تمرر أي طريقة مقارنة.',
      where: 'Java Collections.sort(list, comparator)'
    },
    {
      name: 'Compression Algorithms',
      desc: 'برنامج ضغط يدعم ZIP, RAR, 7z. كل واحد strategy منفصلة.',
      where: 'WinRAR, 7-Zip'
    },
    {
      name: 'Route Calculation',
      desc: 'GPS يحسب المسار: أسرع، أقصر، تجنب الزحام. كل واحد strategy.',
      where: 'Google Maps, Waze'
    }
  ],

  pitfalls: [
    {
      title: 'تخزين Strategy كـ field دائم',
      bad: 'class Context {\n    private Strategy s = new StrategyA();  // ❌ ثابت\n}',
      good: 'public void execute(Strategy s) {\n    s.run();  // ✓ تُمرر وقت الاستخدام\n}',
      reason: 'الـ Strategy تُمرر كـ parameter لتعطي مرونة في اختيارها كل مرة. تخزينها يفقدها هذه المرونة.'
    },
    {
      title: 'الـ Context يعرف الـ Concrete Strategy',
      bad: 'if (s instanceof CreditCard) // ❌ معرفة بالأنواع',
      good: 'paymentMethod.pay(amount);  // ✓ polymorphism',
      reason: 'الـ Context يجب أن يتعامل مع الـ interface فقط، ليس مع الـ implementations المحددة.'
    },
    {
      title: 'if-else بدل Strategy',
      bad: 'if (type.equals("credit")) // ...\nelse if (type.equals("paypal")) // ...  // ❌',
      good: 'paymentMethod.pay(amount);  // ✓ بدون if-else',
      reason: 'الفائدة الأساسية من Strategy هي إزالة الـ if-else — استبدالها بـ polymorphism.'
    },
    {
      title: 'دمج Context و Strategy',
      bad: 'class Cart {\n    public void payWithCard() {...}\n    public void payWithPaypal() {...}  // ❌ كله في Cart\n}',
      good: 'class Cart { checkout(Payment p) { p.pay(); } }  // ✓ Strategy منفصلة',
      reason: 'الـ Context يدير المنطق العام. الـ Strategy تنفذ الخوارزمية المتغيرة.'
    }
  ],

  comparisons: [
    {
      with: 'Observer',
      diff: 'Strategy = اختيار خوارزمية واحدة. Observer = تنبيه عدة كائنات.'
    },
    {
      with: 'State',
      diff: 'Strategy = العميل يختار. State = الكائن نفسه يغير سلوكه بناءً على حالته.'
    },
    {
      with: 'Template Method',
      diff: 'Strategy = composition (تُمرر). Template Method = inheritance (تورّث).'
    }
  ],

  quiz: [
    {
      q: 'كيف يستلم الـ Context الـ Strategy؟',
      options: [
        'يبنيها في الـ constructor',
        'تُمرر كـ parameter في method',
        'يقرأها من ملف',
        'static'
      ],
      correct: 1,
      explain: 'في النمط الكلاسيكي، الـ Strategy تُمرر كـ parameter لإعطاء مرونة كاملة في اختيارها كل مرة.'
    },
    {
      q: 'ما الفائدة الأساسية من Strategy؟',
      options: [
        'تقليل الذاكرة',
        'إزالة if-else الخاصة باختيار خوارزمية، واستبدالها بـ polymorphism',
        'تسريع الكود',
        'إخفاء الأخطاء'
      ],
      correct: 1,
      explain: 'بدل if-else طويل لكل خوارزمية، نعزل كل واحدة في class مستقل ونمررها كـ parameter.'
    },
    {
      q: 'لو الاختبار: "تطبيق دفع يدعم CreditCard, PayPal" — أي نمط؟',
      options: ['Factory', 'Strategy', 'Observer', 'Builder'],
      correct: 1,
      explain: 'خوارزميات متعددة قابلة للتبديل لنفس العملية = Strategy.'
    },
    {
      q: 'كيف يفصل الـ Context عن الـ Strategy؟',
      options: [
        'بـ interface مشترك',
        'بـ inheritance',
        'بـ instanceof',
        'مستحيل'
      ],
      correct: 0,
      explain: 'الـ Context يعتمد على interface (Payment, Strategy)، لذا يقبل أي implementation.'
    }
  ],

  decisionTree: {
    question: 'هل عندك عدة طرق لتنفيذ نفس العملية، وتبي تختار وقت التشغيل؟',
    yes: 'Strategy ✓',
    no: 'لو تبي تنبه عدة كائنات — Observer. لو تختار نوع لإنشاء — Factory.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Strategy',
        type: 'interface',
        members: [
          { name: '+ execute()', kind: 'method', sig: '' }
        ],
        x: 350, y: 50, w: 200, h: 80
      },
      {
        name: 'ConcreteA',
        type: 'class',
        members: [
          { name: '+ execute()', kind: 'method', sig: '' }
        ],
        x: 230, y: 200, w: 180, h: 80
      },
      {
        name: 'ConcreteB',
        type: 'class',
        members: [
          { name: '+ execute()', kind: 'method', sig: '' }
        ],
        x: 470, y: 200, w: 180, h: 80
      },
      {
        name: 'Context',
        type: 'class',
        members: [
          { name: '+ run(s: Strategy)', kind: 'method', sig: '' }
        ],
        x: 50, y: 50, w: 220, h: 80
      }
    ],
    relations: [
      { from: 'ConcreteA', to: 'Strategy', label: 'implements', type: 'inherit' },
      { from: 'ConcreteB', to: 'Strategy', label: 'implements', type: 'inherit' },
      { from: 'Context', to: 'Strategy', label: 'uses', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client ينشئ Strategy: new CreditCardPayment(...)', actor: 'Client creates Strategy' },
    { step: 2, text: 'Client يستدعي cart.checkout(strategy)', actor: 'Client → Context' },
    { step: 3, text: 'Context يحسب الإجمالي', actor: 'Context.calculateTotal()' },
    { step: 4, text: 'Context يستدعي strategy.pay(amount)', actor: 'Context → Strategy' },
    { step: 5, text: 'الـ Strategy تنفذ الدفع بطريقتها', actor: 'Strategy executes' },
    { step: 6, text: 'لو الـ Client بدّل Strategy: cart.checkout(new PayPal())', actor: 'Different Strategy, same Context' }
  ]
};

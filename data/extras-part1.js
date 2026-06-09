// ============================================================
// Pattern Extras - Part 1: Singleton, Prototype, Builder
// Pitfalls, Quizzes, UML structure, Real Exam Scenarios,
// Identifier Keywords
// ============================================================

window.PATTERN_EXTRAS = window.PATTERN_EXTRAS || {};

// ── SINGLETON ────────────────────────────────────────────────
window.PATTERN_EXTRAS.singleton = {
  identifierKeywords: [
    'one instance', 'single instance', 'global access', 'shared resource',
    'thread pool', 'database connection', 'logger', 'configuration',
    'نسخة واحدة', 'instance واحد', 'مشترك', 'global', 'singleton',
    'pool', 'connection', 'cache manager', 'app settings'
  ],
  identifierPhrases: [
    'must have only one instance',
    'should be only one',
    'shared across the application',
    'global point of access',
    'كائن واحد فقط',
    'نسخة وحيدة'
  ],

  realWorldExamples: [
    {
      name: 'Database Connection Pool',
      desc: 'الاتصال بقاعدة البيانات غالي ومحدود. عمل instance واحد فقط للـ pool يضمن إعادة استخدام الاتصالات.',
      where: 'في كل تطبيق ويب تقريباً'
    },
    {
      name: 'Application Logger',
      desc: 'كل أجزاء التطبيق تكتب logs في نفس المكان. Logger واحد يضمن التناسق في كتابة السجلات.',
      where: 'java.util.logging.Logger, log4j'
    },
    {
      name: 'Configuration Manager',
      desc: 'إعدادات التطبيق تُقرأ مرة واحدة من ملف، وكل الـ classes تشاركها. Singleton يضمن قراءة الإعدادات مرة واحدة فقط.',
      where: 'Spring Boot ApplicationContext, Django settings'
    }
  ],

  pitfalls: [
    {
      title: 'نسيان جعل الـ Constructor private',
      bad: 'public Singleton() { }  // ❌',
      good: 'private Singleton() { }  // ✓',
      reason: 'لو كان public، أي أحد يقدر يسوي <code>new Singleton()</code> ويكسر فكرة النمط من الأساس.'
    },
    {
      title: 'نسيان كلمة static في getInstance()',
      bad: 'public Singleton getInstance() { ... }  // ❌',
      good: 'public static Singleton getInstance() { ... }  // ✓',
      reason: 'بدون static، تحتاج تسوي object علشان تستدعي الـ method — وهذا تناقض مع الفكرة.'
    },
    {
      title: 'استخدام == بدل equals للأشياء غير الـ instance',
      bad: 'if (s1 == s2) // ✓ صحيح للـ Singleton (نفس الـ reference)',
      good: 'هذا الاستخدام الصحيح في Singleton — لأننا نقارن الـ references',
      reason: 'في Singleton، نقارن الـ references بـ == لأن المفروض النسختين نفس الكائن في الذاكرة.'
    },
    {
      title: 'مشكلة Thread Safety (متقدم)',
      bad: 'if (instance == null) instance = new Singleton();  // ⚠ غير آمن في multi-threaded',
      good: 'استخدم synchronized أو double-checked locking لو في threads متعددة',
      reason: 'في بيئات متعددة الـ threads، اثنين threads ممكن يدخلون الـ if في نفس الوقت وينشئون نسختين.'
    }
  ],

  comparisons: [
    {
      with: 'Static Class',
      diff: 'Singleton كائن (object)، تقدر تورّثه و تنفذ interfaces. Static class مجموعة methods فقط.'
    },
    {
      with: 'Factory',
      diff: 'Factory ينشئ كائنات مختلفة كل مرة. Singleton يرجع نفس الكائن دائماً.'
    }
  ],

  quiz: [
    {
      q: 'لماذا يجب أن يكون الـ Constructor في Singleton private؟',
      options: [
        'لتوفير الذاكرة',
        'لمنع إنشاء instances إضافية من خارج الكلاس',
        'لتحسين الأداء',
        'لأن الـ Java تتطلب ذلك'
      ],
      correct: 1,
      explain: 'الـ private constructor يمنع أي كود خارجي من إنشاء instance جديد بـ new، وهذا الجوهر اللي يضمن وجود instance واحد فقط.'
    },
    {
      q: 'ما الفائدة من كلمة static في getInstance()?',
      options: [
        'لتسريع الـ method',
        'للسماح باستدعاء الـ method بدون إنشاء object',
        'لجعل الـ method آمنة',
        'لإخفاء الـ method'
      ],
      correct: 1,
      explain: 'static تخلي الـ method تنتمي للكلاس نفسه وليس لـ instance، فتقدر تستدعيها بـ Singleton.getInstance() مباشرة.'
    },
    {
      q: 'ما اسم الـ field المتعارف عليه لحفظ النسخة الوحيدة؟',
      options: ['singleton', 'unique', 'uniqueInstance', 'theOne'],
      correct: 2,
      explain: 'الاسم المتعارف عليه أكاديمياً ومستخدم في أمثلة الدكتور هو uniqueInstance.'
    },
    {
      q: 'لو رأيت في الاختبار: "نريد ضمان وجود ThreadPool واحد لكامل التطبيق" — أي نمط تستخدم؟',
      options: ['Factory', 'Builder', 'Singleton', 'Prototype'],
      correct: 2,
      explain: 'كلمة "واحد لكامل التطبيق" = إشارة مباشرة لـ Singleton.'
    },
    {
      q: 'ما الفرق بين Singleton و Static Class؟',
      options: [
        'لا فرق بينهما',
        'Singleton كائن يقدر يورث وينفذ interfaces، Static Class مجموعة methods فقط',
        'Static أسرع دائماً',
        'Singleton أقدم من Static'
      ],
      correct: 1,
      explain: 'Singleton كائن حقيقي تقدر تمرره كـ parameter وتورّثه. Static Class مجرد مجموعة methods و variables.'
    }
  ],

  decisionTree: {
    question: 'هل تحتاج كائن واحد فقط في كامل التطبيق؟',
    yes: 'Singleton ✓',
    no: 'انتقل لأنماط أخرى'
  },

  umlStructure: {
    classes: [
      {
        name: 'Singleton',
        type: 'class',
        members: [
          { name: '- uniqueInstance: Singleton', kind: 'field', sig: 'static' },
          { name: '- Singleton()', kind: 'constructor', sig: 'private' },
          { name: '+ getInstance(): Singleton', kind: 'method', sig: 'static' }
        ],
        x: 50, y: 50, w: 280, h: 130
      }
    ],
    relations: [
      { from: 'Singleton', to: 'Singleton', label: 'creates', type: 'self' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client يستدعي getInstance() لأول مرة', actor: 'Client → Singleton' },
    { step: 2, text: 'الـ getInstance() يفحص uniqueInstance == null', actor: 'Singleton' },
    { step: 3, text: 'لأنه null، ينشئ instance جديد ويحفظه', actor: 'Singleton creates Self' },
    { step: 4, text: 'يرجع الـ instance للـ Client', actor: 'Singleton → Client' },
    { step: 5, text: 'Client آخر يستدعي getInstance()', actor: 'Client2 → Singleton' },
    { step: 6, text: 'هذي المرة uniqueInstance موجود — يرجع نفس النسخة', actor: 'Singleton → Client2' }
  ]
};

// ── PROTOTYPE ────────────────────────────────────────────────
window.PATTERN_EXTRAS.prototype = {
  identifierKeywords: [
    'clone', 'copy', 'duplicate', 'cache of objects', 'prototype',
    'expensive creation', 'avoid recreating', 'similar objects',
    'نسخ', 'استنساخ', 'cache', 'قوالب جاهزة', 'بناء غالي', 'expensive'
  ],
  identifierPhrases: [
    'avoid expensive object creation',
    'clone existing objects',
    'cache of pre-built objects',
    'بدل بنائها من الصفر',
    'نسخ كائنات موجودة'
  ],

  realWorldExamples: [
    {
      name: 'Document Templates',
      desc: 'نظام إدارة وثائق فيه قوالب جاهزة (Report, Invoice). بدل ما نبنيها كل مرة، نحفظها مرة وننسخها.',
      where: 'Microsoft Word templates, Google Docs templates'
    },
    {
      name: 'Game Object Spawning',
      desc: 'لعبة فيها كائنات متعددة من نفس النوع. تحميل النموذج (model) غالي، فننسخه بدل ما نعيد التحميل.',
      where: 'Unity GameObject.Instantiate()'
    },
    {
      name: 'GUI Component Cloning',
      desc: 'نسخ component معقد مع كل إعداداته بدل بنائه من جديد.',
      where: 'JComponent.clone() في Swing'
    }
  ],

  pitfalls: [
    {
      title: 'نسيان super() في الـ Copy Constructor',
      bad: 'public Circle(Circle target) {\n    this.radius = target.radius;  // ❌ نسيت super\n}',
      good: 'public Circle(Circle target) {\n    super(target.getColor());  // ✓\n    this.radius = target.radius;\n}',
      reason: 'بدون super، الـ fields الموروثة (مثل color) راح تكون null في النسخة الجديدة.'
    },
    {
      title: 'إنشاء كائن جديد بدل نسخة',
      bad: 'public Shape clone() {\n    return new Circle();  // ❌ كائن جديد فاضي\n}',
      good: 'public Shape clone() {\n    return new Circle(this);  // ✓ نسخة من الحالي\n}',
      reason: 'الهدف من clone() نسخ الكائن الحالي بكل قيمه، وليس إنشاء كائن جديد فاضي.'
    },
    {
      title: 'الـ Cache يُرجع الأصل بدل النسخة',
      bad: 'public Shape get(String key) {\n    return cache.get(key);  // ❌ يُرجع الأصل\n}',
      good: 'public Shape get(String key) {\n    return cache.get(key).clone();  // ✓\n}',
      reason: 'لو رجعت الأصل، أي تعديل على الكائن المُرجع يفسد الـ prototype في الـ cache.'
    },
    {
      title: 'Shallow Copy للـ Mutable Objects',
      bad: 'this.tags = target.tags;  // ❌ shallow copy للقائمة',
      good: 'this.tags = new ArrayList<>(target.tags);  // ✓ deep copy',
      reason: 'لو الـ fields فيها objects أخرى (Lists, Maps)، نسخها بـ = ينسخ الـ reference فقط. التعديل على إحداهن يأثر على الكل.'
    }
  ],

  comparisons: [
    {
      with: 'Factory',
      diff: 'Factory ينشئ كائن جديد من الصفر. Prototype ينسخ كائن موجود — أسرع لو البناء غالي.'
    },
    {
      with: 'Builder',
      diff: 'Builder يبني خطوة بخطوة. Prototype ينسخ نسخة جاهزة بضربة واحدة.'
    }
  ],

  quiz: [
    {
      q: 'ما الفائدة الأساسية من Prototype pattern؟',
      options: [
        'تنظيم الكود',
        'إنشاء نسخ من كائنات معقدة بدلاً من بنائها من الصفر',
        'منع تعديل الكائنات',
        'تسريع الـ inheritance'
      ],
      correct: 1,
      explain: 'Prototype مفيد جداً لما يكون بناء الكائن غالي (DB calls, file I/O) — ننسخ نسخة جاهزة بدل البناء من جديد.'
    },
    {
      q: 'ما اسم الـ method المتعارف عليها في Prototype؟',
      options: ['copy()', 'duplicate()', 'clone()', 'replicate()'],
      correct: 2,
      explain: 'clone() هي الـ method المتعارف عليها أكاديمياً، وهي الموجودة في Java بـ Cloneable interface.'
    },
    {
      q: 'لماذا نحتاج Copy Constructor في كل subclass؟',
      options: [
        'لتحسين الأداء',
        'لأن Java تتطلب ذلك',
        'لنسخ كل الـ fields بشكل صحيح بما فيها الموروثة',
        'لاستخدام @Override'
      ],
      correct: 2,
      explain: 'الـ Copy Constructor ينسخ الـ fields الخاصة بالـ subclass + يستدعي super(target) لنسخ الـ fields الموروثة.'
    },
    {
      q: 'في Cache، لماذا نرجع clone() وليس الأصل؟',
      options: [
        'لتجنب تعديل الأصل عن طريق الخطأ',
        'لجعل الكود أطول',
        'لتسريع البرنامج',
        'لا فرق بينهما'
      ],
      correct: 0,
      explain: 'لو رجعنا الأصل، أي تعديل عليه راح يأثر على الـ prototype في الـ cache، فالنسخة القادمة راح تكون مُلوّثة.'
    }
  ],

  decisionTree: {
    question: 'هل بناء الكائن غالي وتحتاج نسخ متعددة منه؟',
    yes: 'Prototype ✓',
    no: 'فكر في Factory أو Builder'
  },

  umlStructure: {
    classes: [
      {
        name: 'Prototype',
        type: 'abstract',
        members: [
          { name: '+ clone(): Prototype', kind: 'method', sig: 'abstract' }
        ],
        x: 50, y: 50, w: 240, h: 90
      },
      {
        name: 'ConcretePrototype',
        type: 'class',
        members: [
          { name: '+ ConcretePrototype(target)', kind: 'constructor', sig: 'copy' },
          { name: '+ clone(): Prototype', kind: 'method', sig: '' }
        ],
        x: 350, y: 50, w: 280, h: 110
      },
      {
        name: 'PrototypeRegistry',
        type: 'class',
        members: [
          { name: '- cache: Map', kind: 'field', sig: '' },
          { name: '+ get(key): Prototype', kind: 'method', sig: '' }
        ],
        x: 200, y: 220, w: 280, h: 110
      }
    ],
    relations: [
      { from: 'ConcretePrototype', to: 'Prototype', label: 'extends', type: 'inherit' },
      { from: 'PrototypeRegistry', to: 'Prototype', label: 'manages', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Registry يبني prototypes جاهزة في constructor', actor: 'Registry creates Prototypes' },
    { step: 2, text: 'Client يطلب نسخة بـ registry.get("report")', actor: 'Client → Registry' },
    { step: 3, text: 'Registry يستدعي clone() على الـ prototype', actor: 'Registry → Prototype' },
    { step: 4, text: 'الـ clone() يستدعي copy constructor', actor: 'Prototype → CopyConstructor' },
    { step: 5, text: 'الـ copy constructor ينسخ كل الـ fields', actor: 'CopyConstructor creates new' },
    { step: 6, text: 'النسخة الجديدة تُرجع للـ Client', actor: 'Registry → Client' }
  ]
};

// ── BUILDER ──────────────────────────────────────────────────
window.PATTERN_EXTRAS.builder = {
  identifierKeywords: [
    'optional', 'many parameters', 'constructor parameters', 'telescoping',
    'with', 'fluent', 'configuration', 'required', 'optional fields',
    'خصائص اختيارية', 'بناء معقد', 'method chaining', 'builder', 'فلوينت'
  ],
  identifierPhrases: [
    'object with many optional fields',
    'avoid telescoping constructors',
    'step-by-step construction',
    'method chaining',
    'بناء خطوة بخطوة',
    'خصائص كثيرة اختيارية'
  ],

  realWorldExamples: [
    {
      name: 'HTTP Request Builder',
      desc: 'بناء HTTP request فيه method, URL, headers, body, timeout — معظمها اختياري.',
      where: 'OkHttpClient.Builder, RestTemplate'
    },
    {
      name: 'StringBuilder',
      desc: 'بناء string عبر append متتالية بدل concatenation.',
      where: 'java.lang.StringBuilder'
    },
    {
      name: 'SQL Query Builder',
      desc: 'بناء استعلامات SQL خطوة بخطوة: select, from, where, orderBy.',
      where: 'jOOQ, QueryDSL, MyBatis'
    },
    {
      name: 'Configuration Objects',
      desc: 'بناء كائن إعدادات معقد بخصائص كثيرة اختيارية.',
      where: 'Lombok @Builder, AWS SDK clients'
    }
  ],

  pitfalls: [
    {
      title: 'نسيان static في الـ inner class',
      bad: 'public class Builder { ... }  // ❌ غير static',
      good: 'public static class Builder { ... }  // ✓',
      reason: 'بدون static، تحتاج instance من الـ outer class علشان تستخدم الـ Builder — وهذا يكسر النمط.'
    },
    {
      title: 'نسيان return this في with methods',
      bad: 'public Builder withRadio() {\n    this.radio = new Radio();\n}  // ❌',
      good: 'public Builder withRadio() {\n    this.radio = new Radio();\n    return this;  // ✓\n}',
      reason: 'بدون return this، method chaining ما يشتغل، وتنكسر فكرة fluent interface.'
    },
    {
      title: 'جعل Constructor الكلاس الرئيسي public',
      bad: 'public Car(Builder builder) { ... }  // ❌',
      good: 'private Car(Builder builder) { ... }  // ✓',
      reason: 'لو كان public، أحد يقدر يتجاوز الـ Builder ويبني الكائن مباشرة، وهذا يكسر التحكم.'
    },
    {
      title: 'وضع required في with methods',
      bad: 'Builder().withName().withAge()  // ❌ كله اختياري',
      good: 'Builder(name, age).withColor()  // ✓ required في constructor',
      reason: 'الـ required لازم تكون في constructor الـ Builder لإجبار العميل على تمريرها.'
    }
  ],

  comparisons: [
    {
      with: 'Factory',
      diff: 'Factory يرجع كائن بقرار واحد. Builder يبني خطوة بخطوة بمرونة في الـ optional fields.'
    },
    {
      with: 'Constructor Overloading',
      diff: 'Overloading يصير قبيح مع كثرة الـ params (Telescoping). Builder ينظف الكود ويوضح كل field.'
    }
  ],

  quiz: [
    {
      q: 'لماذا يجب أن يكون الـ Builder inner static class؟',
      options: [
        'للأداء',
        'حتى نقدر نسوي new Car.Builder(...) بدون كائن Car',
        'لإخفاءه عن العملاء',
        'تتطلبه Java'
      ],
      correct: 1,
      explain: 'static تخلي الـ Builder ينتمي للكلاس نفسه، فنقدر نوصل له مباشرة بـ Car.Builder(...) بدون ما نسوي Car object أول.'
    },
    {
      q: 'ما الفائدة من return this في with methods؟',
      options: [
        'لإرجاع الـ Builder للسماح بـ method chaining',
        'لمنع التعديل',
        'لتسريع الكود',
        'ليس مهماً'
      ],
      correct: 0,
      explain: 'return this تُرجع الـ Builder نفسه، فنقدر نسلسل: <code>builder.withA().withB().withC()</code>.'
    },
    {
      q: 'أين توضع الـ required parameters؟',
      options: [
        'في with methods',
        'في constructor الـ Builder',
        'في build()',
        'لا تُحدد أبداً'
      ],
      correct: 1,
      explain: 'الـ required توضع في constructor الـ Builder لإجبار العميل على تمريرها، والـ optional في with methods.'
    },
    {
      q: 'ما الفرق الجوهري بين Builder و Factory؟',
      options: [
        'لا يوجد فرق',
        'Builder يبني كائن واحد معقد خطوة بخطوة. Factory يقرر أي كائن يُرجع',
        'Builder أسرع',
        'Factory أقدم'
      ],
      correct: 1,
      explain: 'Factory يجيب لك كائن بناءً على input، Builder يساعدك في بناء كائن معقد بخصائص متعددة.'
    },
    {
      q: 'لو الاختبار يقول: "VirtualMachine بخصائص cloudProvider, region (إجباري) و tags, ports (اختياري)" — أي نمط؟',
      options: ['Factory', 'Builder', 'Singleton', 'Adapter'],
      correct: 1,
      explain: 'كلمات "اختياري" + "خصائص متعددة" = إشارة مباشرة لـ Builder.'
    }
  ],

  decisionTree: {
    question: 'هل الكائن فيه خصائص كثيرة، بعضها اختياري؟',
    yes: 'Builder ✓',
    no: 'لو نسخة واحدة فقط — Singleton. لو نوع من interface — Factory.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Product',
        type: 'class',
        members: [
          { name: '- field1, field2, ...', kind: 'field', sig: '' },
          { name: '- Product(Builder b)', kind: 'constructor', sig: 'private' }
        ],
        x: 50, y: 50, w: 260, h: 110
      },
      {
        name: 'Product.Builder',
        type: 'static class',
        members: [
          { name: '- field1, field2, ...', kind: 'field', sig: '' },
          { name: '+ Builder(required)', kind: 'constructor', sig: '' },
          { name: '+ withX(): Builder', kind: 'method', sig: '' },
          { name: '+ build(): Product', kind: 'method', sig: '' }
        ],
        x: 360, y: 50, w: 290, h: 150
      }
    ],
    relations: [
      { from: 'Product.Builder', to: 'Product', label: 'builds', type: 'creates' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client ينشئ Builder بـ required params', actor: 'Client → Builder' },
    { step: 2, text: 'Client يضيف اختيارية: .withRadio()', actor: 'Client → Builder.withRadio' },
    { step: 3, text: 'with method تحفظ القيمة و return this', actor: 'Builder returns self' },
    { step: 4, text: 'Client يستمر: .withGPS().withTags()', actor: 'Chaining continues' },
    { step: 5, text: 'Client يستدعي .build()', actor: 'Client → Builder.build' },
    { step: 6, text: 'build() ينشئ Product بكل القيم من الـ Builder', actor: 'Builder creates Product' }
  ]
};

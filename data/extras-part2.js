// ============================================================
// Pattern Extras - Part 2: Factory, Adapter, Decorator
// ============================================================

// ── FACTORY ──────────────────────────────────────────────────
window.PATTERN_EXTRAS.factory = {
  identifierKeywords: [
    'create different types', 'based on input', 'switch case for creation',
    'factory', 'instantiate', 'product family', 'getX(type)',
    'إنشاء حسب نوع', 'مصنع', 'حسب الـ string', 'parameterized creation'
  ],
  identifierPhrases: [
    'create objects based on type',
    'hide creation complexity',
    'multiple subtypes of same interface',
    'إنشاء نوع معين من interface',
    'switch على string لإنشاء'
  ],

  realWorldExamples: [
    {
      name: 'GUI Component Factory',
      desc: 'إنشاء components مختلفة (Button, Slider, Checkbox) بناءً على platform (Windows, macOS, Linux).',
      where: 'Java Swing UIManager'
    },
    {
      name: 'Document Format Factory',
      desc: 'إنشاء parser للملف بناءً على امتداده (.pdf → PDFParser, .docx → DocxParser).',
      where: 'Apache POI, iText'
    },
    {
      name: 'Notification Factory',
      desc: 'إنشاء notification (Email, SMS, Push) بناءً على إعدادات المستخدم.',
      where: 'Firebase Cloud Messaging'
    }
  ],

  pitfalls: [
    {
      title: 'استخدام == بدل equalsIgnoreCase',
      bad: 'if (type == "circle")  // ❌ يقارن references',
      good: 'if (type.equalsIgnoreCase("circle"))  // ✓',
      reason: 'في Java، == على String يقارن المراجع (memory references) وليس المحتوى. استخدم equals دائماً.'
    },
    {
      title: 'عدم التحقق من null',
      bad: 'public Shape getShape(String type) {\n    if (type.equalsIgnoreCase("circle"))  // ❌ NPE!\n}',
      good: 'if (type == null) return null;  // ✓',
      reason: 'لو type == null، أي method call عليه راح يرمي NullPointerException.'
    },
    {
      title: 'نسيان return null في النهاية',
      bad: 'يخلص بدون default — compile error',
      good: 'return null;  // أو throw new IllegalArgumentException',
      reason: 'الـ method تتطلب return في كل المسارات، فلازم default في الآخر.'
    },
    {
      title: 'حساس لحالة الأحرف (case-sensitive)',
      bad: 'if (type.equals("circle"))  // ❌ "Circle" ما تطابق',
      good: 'if (type.equalsIgnoreCase("circle"))  // ✓',
      reason: 'الدكتور يفضل equalsIgnoreCase لمرونة الاستخدام — "Circle" و "CIRCLE" و "circle" كلها تشتغل.'
    }
  ],

  comparisons: [
    {
      with: 'Builder',
      diff: 'Factory يقرر النوع. Builder يبني كائن واحد بخصائص.'
    },
    {
      with: 'Strategy',
      diff: 'Factory ينشئ. Strategy ينفذ خوارزمية. لكن أحياناً يُستخدمان معاً.'
    }
  ],

  quiz: [
    {
      q: 'لماذا نستخدم equalsIgnoreCase بدلاً من == في Factory؟',
      options: [
        'لأنه أسرع',
        'لأن == يقارن references في Strings وليس المحتوى',
        'لأنه أحدث',
        'تفضيل شخصي'
      ],
      correct: 1,
      explain: 'في Java، == على String تقارن إذا كانا نفس الكائن في الذاكرة، ليس المحتوى. equalsIgnoreCase تقارن النصوص متجاهلة حالة الأحرف.'
    },
    {
      q: 'ما الـ return type لـ getShape في ShapeFactory؟',
      options: ['void', 'Circle', 'Shape (الـ interface)', 'Object'],
      correct: 2,
      explain: 'الـ return type يكون الـ interface المشترك (Shape) ليرجع أي نوع subtype.'
    },
    {
      q: 'لو الاختبار يقول: "نظام إشعارات يدعم email, sms, push وتختار النوع بـ string" — أي نمط؟',
      options: ['Singleton', 'Factory', 'Observer', 'Strategy'],
      correct: 1,
      explain: 'الاختيار بناءً على string + إنشاء instance من interface = Factory.'
    },
    {
      q: 'في Factory، أين توضع منطق "أي class أنشئ"؟',
      options: [
        'في الـ Client',
        'في الـ Interface',
        'في الـ Factory class داخل method getX()',
        'في كل subclass'
      ],
      correct: 2,
      explain: 'الفائدة الأساسية من Factory هي عزل منطق الإنشاء (if-else) في مكان واحد بدل تكراره في الـ client.'
    }
  ],

  decisionTree: {
    question: 'هل تختار بين عدة أنواع من نفس الـ interface بناءً على input؟',
    yes: 'Factory ✓',
    no: 'لو خصائص كثيرة — Builder. لو واحد فقط — Singleton.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Product',
        type: 'interface',
        members: [
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 350, y: 50, w: 200, h: 80
      },
      {
        name: 'ConcreteA',
        type: 'class',
        members: [
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 220, y: 200, w: 180, h: 80
      },
      {
        name: 'ConcreteB',
        type: 'class',
        members: [
          { name: '+ operation()', kind: 'method', sig: '' }
        ],
        x: 460, y: 200, w: 180, h: 80
      },
      {
        name: 'Factory',
        type: 'class',
        members: [
          { name: '+ get(type): Product', kind: 'method', sig: '' }
        ],
        x: 50, y: 50, w: 220, h: 80
      }
    ],
    relations: [
      { from: 'ConcreteA', to: 'Product', label: 'implements', type: 'inherit' },
      { from: 'ConcreteB', to: 'Product', label: 'implements', type: 'inherit' },
      { from: 'Factory', to: 'Product', label: 'creates', type: 'creates' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client يستدعي factory.getShape("circle")', actor: 'Client → Factory' },
    { step: 2, text: 'Factory يفحص النوع بـ equalsIgnoreCase', actor: 'Factory checks type' },
    { step: 3, text: 'يطابق "circle" — ينشئ Circle', actor: 'Factory creates Circle' },
    { step: 4, text: 'يُرجع الـ Circle كـ Shape', actor: 'Factory → Client (as Shape)' },
    { step: 5, text: 'Client يستخدمه: shape.draw()', actor: 'Client uses Shape' },
    { step: 6, text: 'الـ Client ما يحتاج يعرف النوع الفعلي', actor: 'Polymorphism' }
  ]
};

// ── ADAPTER ──────────────────────────────────────────────────
window.PATTERN_EXTRAS.adapter = {
  identifierKeywords: [
    'incompatible', 'convert', 'legacy', 'wrap', 'bridge two interfaces',
    'different interface', 'integration', 'adapter', 'compatibility',
    'تحويل', 'دمج', 'interface مختلف', 'تكييف', 'legacy code', 'wrapper'
  ],
  identifierPhrases: [
    'cannot modify existing class',
    'convert one interface to another',
    'work with legacy system',
    'integrate third-party library',
    'لا يمكن تعديل الكلاس الموجود',
    'تحويل interface قديم لجديد'
  ],

  realWorldExamples: [
    {
      name: 'Java InputStreamReader',
      desc: 'يحول InputStream (bytes) إلى Reader (characters). الـ InputStream قديم، الـ Reader أحدث.',
      where: 'java.io.InputStreamReader'
    },
    {
      name: 'Database Drivers (JDBC)',
      desc: 'كل قاعدة بيانات (MySQL, Oracle) لها API خاص. الـ JDBC driver يلفها بـ Interface مشترك.',
      where: 'JDBC Driver Manager'
    },
    {
      name: 'Power Adapter',
      desc: 'مثال فيزيائي: جهاز US بـ 110V يحتاج adapter للعمل في أوروبا 220V.',
      where: 'الحياة اليومية'
    },
    {
      name: 'Third-Party Library Integration',
      desc: 'مكتبة قديمة لها API ما يناسب كودك. تكتب adapter يلفها بـ interface كودك.',
      where: 'أي تكامل مع legacy systems'
    }
  ],

  pitfalls: [
    {
      title: 'الـ Adapter ينفذ Adaptee بدل Target',
      bad: 'class Adapter implements Adaptee  // ❌',
      good: 'class Adapter implements Target  // ✓',
      reason: 'الهدف من Adapter جعل الـ Adaptee يبدو مثل الـ Target، فيجب أن ينفذ الـ Target.'
    },
    {
      title: 'نسيان حفظ reference للـ Adaptee',
      bad: 'class Adapter { void method() { new Adaptee().call(); }}  // ❌',
      good: 'class Adapter {\n    private Adaptee a;\n    Adapter(Adaptee a) { this.a = a; }\n}  // ✓',
      reason: 'لازم نحفظ reference للـ Adaptee في field علشان كل method تستخدم نفس الـ instance.'
    },
    {
      title: 'محاولة تعديل الـ Adaptee',
      bad: 'يحاول يعدل في الـ legacy class',
      good: 'يكتب Adapter ولا يلمس الـ Adaptee',
      reason: 'الـ Adapter موجود تحديداً لأننا ما نقدر/ما نبي نعدل الـ Adaptee.'
    },
    {
      title: 'تحويل غير منطقي في method',
      bad: 'public double getTemp(double lat, double lng) {\n    return 25.0;  // ❌ ما استخدم الـ adaptee\n}',
      good: 'public double getTemp(double lat, double lng) {\n    String city = convertCoords(lat, lng);\n    return adaptee.getTemp(city);  // ✓\n}',
      reason: 'الـ adapter لازم يحول الـ parameters للصيغة المناسبة ويستدعي الـ adaptee الفعلي.'
    }
  ],

  comparisons: [
    {
      with: 'Decorator',
      diff: 'Adapter يغير الـ interface. Decorator يحافظ على نفس الـ interface ويضيف ميزات.'
    },
    {
      with: 'Proxy',
      diff: 'Adapter يحول interface. Proxy يحافظ على نفس interface لكن يتحكم بالوصول.'
    }
  ],

  quiz: [
    {
      q: 'الـ Adapter ينفذ أي interface؟',
      options: ['الـ Adaptee', 'الـ Target', 'كلاهما', 'لا شيء'],
      correct: 1,
      explain: 'الـ Adapter ينفذ الـ Target (الـ interface المطلوبة من العميل) ويلف الـ Adaptee داخلياً.'
    },
    {
      q: 'لماذا لا نعدل الـ Adaptee مباشرة بدل كتابة Adapter؟',
      options: [
        'لتعقيد الكود',
        'لأنه قد يكون legacy أو من مكتبة خارجية لا نملك الصلاحية لتعديله',
        'تفضيل شخصي',
        'تتطلبه Java'
      ],
      correct: 1,
      explain: 'الـ Adapter مفيد بالذات لما يكون الـ Adaptee من مكتبة خارجية أو legacy code لا نقدر/ما نبي نعدله.'
    },
    {
      q: 'لو الاختبار: "عندنا CityWeather يأخذ city، والكود الجديد يحتاج GeoWeather يأخذ lat/lng" — أي نمط؟',
      options: ['Strategy', 'Adapter', 'Decorator', 'Factory'],
      correct: 1,
      explain: 'تحويل interface (city → lat/lng) = Adapter بدون شك.'
    },
    {
      q: 'كيف يحفظ الـ Adapter مرجع للـ Adaptee؟',
      options: [
        'في static field',
        'في private field يُمرر عبر constructor',
        'يبنيه داخل كل method',
        'لا يحفظه'
      ],
      correct: 1,
      explain: 'النمط المعتاد: private field من نوع Adaptee + constructor يستقبله ويحفظه (composition).'
    }
  ],

  decisionTree: {
    question: 'هل عندك interface قديم/خارجي تبي تستخدمه في نظام بـ interface مختلف؟',
    yes: 'Adapter ✓',
    no: 'لو تبي تضيف وظائف — Decorator. لو تبي تتحكم بالوصول — Proxy.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Target',
        type: 'interface',
        members: [
          { name: '+ request()', kind: 'method', sig: '' }
        ],
        x: 50, y: 50, w: 200, h: 80
      },
      {
        name: 'Adapter',
        type: 'class',
        members: [
          { name: '- adaptee: Adaptee', kind: 'field', sig: '' },
          { name: '+ request()', kind: 'method', sig: '' }
        ],
        x: 50, y: 200, w: 200, h: 100
      },
      {
        name: 'Adaptee',
        type: 'class',
        members: [
          { name: '+ specificRequest()', kind: 'method', sig: '' }
        ],
        x: 320, y: 200, w: 220, h: 80
      }
    ],
    relations: [
      { from: 'Adapter', to: 'Target', label: 'implements', type: 'inherit' },
      { from: 'Adapter', to: 'Adaptee', label: 'wraps', type: 'has' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'Client يستدعي adapter.request()', actor: 'Client → Adapter' },
    { step: 2, text: 'Adapter يحول الـ parameters للصيغة المطلوبة', actor: 'Adapter converts' },
    { step: 3, text: 'Adapter يستدعي adaptee.specificRequest()', actor: 'Adapter → Adaptee' },
    { step: 4, text: 'Adaptee ينفذ المنطق الأصلي', actor: 'Adaptee executes' },
    { step: 5, text: 'Adaptee يُرجع النتيجة', actor: 'Adaptee → Adapter' },
    { step: 6, text: 'Adapter يحول النتيجة (لو لازم) ويُرجعها', actor: 'Adapter → Client' }
  ]
};

// ── DECORATOR ────────────────────────────────────────────────
window.PATTERN_EXTRAS.decorator = {
  identifierKeywords: [
    'add features dynamically', 'wrap', 'extra functionality', 'toppings',
    'condiments', 'enhance', 'extend behavior', 'runtime composition',
    'decorator', 'additions', 'إضافات', 'تحسين', 'تزيين', 'wrapping'
  ],
  identifierPhrases: [
    'add features at runtime',
    'multiple optional features',
    'compose multiple behaviors',
    'add behavior without modifying',
    'إضافات متراكمة',
    'تركيب وظائف على بعض'
  ],

  realWorldExamples: [
    {
      name: 'Java I/O Streams',
      desc: 'BufferedReader يلف FileReader. الـ BufferedReader يضيف buffering للقراءة من ملف.',
      where: 'java.io: FileReader, BufferedReader, LineNumberReader'
    },
    {
      name: 'Coffee Order System',
      desc: 'مشروب أساسي + إضافات متعددة (milk, sugar, vanilla, whip).',
      where: 'Starbucks ordering systems'
    },
    {
      name: 'GUI Component Decoration',
      desc: 'JTextField + ScrollPane + Border. كل واحد يضيف ميزة للـ component.',
      where: 'Java Swing'
    }
  ],

  pitfalls: [
    {
      title: 'استخدام interface بدل abstract class',
      bad: 'class Decorator implements Beverage  // ❌',
      good: 'abstract class Decorator extends Beverage  // ✓',
      reason: 'الدكتور يفضل abstract class لأن الـ Decorator يحتاج يرث الـ fields (مثل description) من الـ base.'
    },
    {
      title: 'نسيان إضافة beverage.cost()',
      bad: 'public double cost() {\n    return 0.50;  // ❌ بس سعره\n}',
      good: 'public double cost() {\n    return 0.50 + beverage.cost();  // ✓\n}',
      reason: 'بدون beverage.cost()، التراكم ما يحصل، والـ Decorator يفقد فائدته الأساسية.'
    },
    {
      title: 'عدم حفظ reference للـ component',
      bad: 'class Milk extends Decorator {\n    Milk() { }  // ❌ ما يستقبل beverage\n}',
      good: 'class Milk extends Decorator {\n    Milk(Beverage b) { this.beverage = b; }  // ✓\n}',
      reason: 'الـ Decorator لازم يلف component — يستقبله في constructor ويحفظه.'
    },
    {
      title: 'الخلط بين Decorator و Inheritance',
      bad: 'class CoffeeWithMilk extends Coffee  // ❌ explosion في الـ classes',
      good: 'new Milk(new Coffee())  // ✓ composition بدل inheritance',
      reason: 'لو كل combination يحتاج subclass، تنفجر عدد الكلاسات. Decorator يحلها بـ composition وقت التشغيل.'
    }
  ],

  comparisons: [
    {
      with: 'Adapter',
      diff: 'Decorator يحافظ على نفس interface ويضيف ميزات. Adapter يحول interface.'
    },
    {
      with: 'Proxy',
      diff: 'Decorator يضيف وظائف. Proxy يتحكم بالوصول بدون إضافة وظائف جوهرية.'
    },
    {
      with: 'Inheritance',
      diff: 'Inheritance ثابت وقت الكتابة. Decorator مرن وقت التشغيل.'
    }
  ],

  quiz: [
    {
      q: 'لماذا يستخدم الدكتور abstract class بدل interface للـ Decorator؟',
      options: [
        'لأنه أحدث',
        'لإرث الـ fields المشتركة من الـ base class',
        'لإجبار الطلاب على التعلم',
        'لا فرق'
      ],
      correct: 1,
      explain: 'abstract class تسمح بإرث fields (مثل description) و methods فعلية. الـ Decorator يحتاج هذا.'
    },
    {
      q: 'في cost() داخل decorator، ما الذي يجب فعله؟',
      options: [
        'إرجاع سعر الـ decorator فقط',
        'إرجاع سعر الـ decorator + beverage.cost()',
        'إرجاع 0',
        'استدعاء super.cost()'
      ],
      correct: 1,
      explain: 'السعر يتراكم: سعر الـ decorator نفسه + سعر اللي تحته (beverage.cost()).'
    },
    {
      q: 'كيف يستخدم العميل عدة decorators؟',
      options: [
        'يكتب class جديد',
        'يلف بعضها فوق بعض: new Whip(new Milk(new Coffee()))',
        'يستخدم static methods',
        'مستحيل'
      ],
      correct: 1,
      explain: 'كل decorator يلف اللي قبله، وتقدر تركبها بأي ترتيب وعدد.'
    },
    {
      q: 'لو الاختبار: "إضافات على ساندويتش مع تراكم سعر/وصف" — أي نمط؟',
      options: ['Factory', 'Strategy', 'Decorator', 'Adapter'],
      correct: 2,
      explain: 'كلمة "إضافات تتراكم" = إشارة مباشرة لـ Decorator.'
    }
  ],

  decisionTree: {
    question: 'هل تبي تضيف ميزات/إضافات على كائن أساسي مع تراكمها؟',
    yes: 'Decorator ✓',
    no: 'لو خوارزميات متبادلة — Strategy. لو تحويل interface — Adapter.'
  },

  umlStructure: {
    classes: [
      {
        name: 'Component',
        type: 'abstract',
        members: [
          { name: '+ cost(): double', kind: 'method', sig: 'abstract' }
        ],
        x: 250, y: 50, w: 220, h: 80
      },
      {
        name: 'ConcreteComponent',
        type: 'class',
        members: [
          { name: '+ cost(): double', kind: 'method', sig: '' }
        ],
        x: 50, y: 200, w: 240, h: 80
      },
      {
        name: 'Decorator',
        type: 'abstract',
        members: [
          { name: '# component: Component', kind: 'field', sig: '' }
        ],
        x: 380, y: 200, w: 220, h: 80
      },
      {
        name: 'ConcreteDecorator',
        type: 'class',
        members: [
          { name: '+ cost(): double', kind: 'method', sig: '' }
        ],
        x: 380, y: 340, w: 240, h: 80
      }
    ],
    relations: [
      { from: 'ConcreteComponent', to: 'Component', label: 'extends', type: 'inherit' },
      { from: 'Decorator', to: 'Component', label: 'extends + wraps', type: 'inherit' },
      { from: 'ConcreteDecorator', to: 'Decorator', label: 'extends', type: 'inherit' }
    ]
  },

  animatedFlow: [
    { step: 1, text: 'ننشئ Coffee أساسي', actor: 'new Coffee()' },
    { step: 2, text: 'نلفه بـ Milk: new Milk(coffee)', actor: 'Milk wraps Coffee' },
    { step: 3, text: 'نلفه بـ Whip: new Whip(milk)', actor: 'Whip wraps Milk' },
    { step: 4, text: 'الـ Client يستدعي drink.cost()', actor: 'Client → Whip.cost()' },
    { step: 5, text: 'Whip يضيف 0.10 + يستدعي milk.cost()', actor: 'Whip → Milk' },
    { step: 6, text: 'Milk يضيف 0.20 + يستدعي coffee.cost() (1.99) → النتيجة: 2.29', actor: 'Total: 2.29' }
  ]
};

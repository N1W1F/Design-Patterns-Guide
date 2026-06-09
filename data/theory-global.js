// ============================================================
// THEORY — Global data (Big Picture, Principles, Code Smells,
// Comparisons, MVC, Cheat Sheet)
// Bilingual: ar (primary) / en
// ============================================================

window.THEORY_GLOBAL = {

  // ── What is a design pattern ──
  intro: {
    ar: 'أنماط التصميم هي حلول نموذجية لمشاكل متكررة في تصميم البرمجيات. ليست كوداً جاهزاً تنسخه، بل فكرة عامة (blueprint) تطبّقها بما يناسب مشروعك. تشبه الوصفة العامة وليس الخوارزمية الحرفية.',
    en: 'Design patterns are typical solutions to commonly occurring problems in software design. They are not ready-made code you copy, but a general blueprint you adapt to your own program — closer to a recipe than to a fixed algorithm.'
  },

  // ── Benefits (from the doctor's notes) ──
  benefits: [
    { ar: 'حل المشاكل التصميمية المعقّدة بحلول مجرّبة', en: 'Solve complex design problems with proven solutions' },
    { ar: 'تحسين قابلية القراءة والصيانة', en: 'Improve code readability and maintainability' },
    { ar: 'تحسين التواصل بين المطوّرين (لغة مشتركة)', en: 'Improve developer communication (shared vocabulary)' },
    { ar: 'اقتران مرن (Loose coupling): إضافة مزايا دون كسر الكود الموجود', en: 'Loose coupling: add features without breaking existing code' }
  ],

  // ── The 3 categories ──
  categories: [
    {
      key: 'Creational', ar: 'إنشائية', icon: '⚙',
      desc: { ar: 'تهتم بآليات إنشاء الكائنات — طرق أخرى لإنشاء الكائنات غير new المباشر، لزيادة المرونة وإعادة الاستخدام.', en: 'Concerned with object creation mechanisms — other ways to create objects than direct new, increasing flexibility and reuse.' },
      patterns: ['singleton','prototype','builder','factory','abstractfactory']
    },
    {
      key: 'Structural', ar: 'هيكلية', icon: '⬢',
      desc: { ar: 'تشرح كيف نُجمّع الكائنات والكلاسات في هياكل أكبر مع إبقائها مرنة وفعّالة (العلاقات والتركيب).', en: 'Explain how to assemble objects and classes into larger structures while keeping them flexible and efficient (relationships & composition).' },
      patterns: ['adapter','bridge','composite','decorator','facade','flyweight','proxy']
    },
    {
      key: 'Behavioral', ar: 'سلوكية', icon: '⟲',
      desc: { ar: 'تهتم بالتواصل الفعّال وتوزيع المسؤوليات بين الكائنات (الخوارزميات والتفاعل).', en: 'Concerned with effective communication and the assignment of responsibilities between objects (algorithms & interaction).' },
      patterns: ['chain','command','interpreter','iterator','mediator','memento','observer','state','strategy','template','visitor']
    }
  ],

  // ── Core OO Design Principles (repeated in the notes) ──
  principles: [
    {
      ar: 'البرمجة وفق المواصفات لا التطبيق', en: 'Program to Specifications, not Implementations',
      detail: { ar: 'اكتب الـ interface أو abstract class أولاً واعتمد عليه. كود العميل يستخدم النوع المجرّد لا الكلاس الفعلي. هذا يقلّل الاقتران.', en: 'Write the interface or abstract class first and depend on it. Client code uses the abstract type, not the concrete class. This reduces coupling.' }
    },
    {
      ar: 'مبدأ المسؤولية الواحدة (SRP)', en: 'Single Responsibility Principle (SRP)',
      detail: { ar: 'الكلاس يجب أن يكون له مهمّة/سبب تغيير واحد فقط.', en: 'A class should have one job / one reason to change.' }
    },
    {
      ar: 'مبدأ المفتوح/المغلق (Open/Closed)', en: 'Open/Closed Principle',
      detail: { ar: 'الكلاسات مفتوحة للتوسعة، مغلقة للتعديل — أضف سلوكاً جديداً دون تعديل الكود القائم.', en: 'Classes are open for extension, closed for modification — add new behavior without changing existing code.' }
    },
    {
      ar: 'فضّل التركيب على الوراثة', en: 'Favor Composition over Inheritance',
      detail: { ar: 'بدل توسيع الكلاس بالوراثة (اقتران قوي، ثابت)، احتوِ كائناً آخر كحقل: class Foo { Bar b; }. أكثر مرونة وأقل اقتراناً.', en: 'Instead of extending via inheritance (tight, static coupling), hold another object as a field: class Foo { Bar b; }. More flexible, less coupling.' }
    }
  ],

  // ── Code Smells (signals of bad design) ──
  codeSmells: [
    { ar: 'الاقتران القوي (Tight coupling) — مثل الإفراط في الوراثة', en: 'Tight coupling — e.g. overusing inheritance' },
    { ar: 'دوال طويلة وكلاسات طويلة', en: 'Long methods, long classes' },
    { ar: 'تجريد ضعيف (كلاس أو دالة تقوم بأشياء غير مترابطة)', en: 'Poor abstraction (a class/method doing unrelated things)' },
    { ar: 'كود مكرّر (Duplicate code)', en: 'Duplicate code' },
    { ar: 'جُمل switch / if-else طويلة', en: 'Switch / long if-else statements' },
    { ar: 'غياب فصل الاهتمامات (Separation of Concerns)', en: 'Lack of separation of concerns' }
  ],

  // ── Code-smell → pattern fixes (exam Q8 style) ──
  smellFixes: [
    {
      title: { ar: 'سلسلة if-else / switch على "نوع"', en: 'if-else / switch on a "type"' },
      bad: { ar: 'دالة فيها if(type=="A")...else if(type=="B")... لإنشاء كائنات أو اختيار سلوك.', en: 'A method with if(type=="A")...else if(type=="B")... to create objects or pick behavior.' },
      smell: { ar: 'Switch statements + اقتران قوي + كسر Open/Closed', en: 'Switch statements + tight coupling + breaks Open/Closed' },
      patterns: ['factory','strategy'],
      fix: { ar: 'لإنشاء كائنات → Factory. لاختيار خوارزمية وقت التشغيل → Strategy. كلاهما يستبدل الـ if-else بالـ polymorphism.', en: 'For creating objects → Factory. For selecting an algorithm at runtime → Strategy. Both replace if-else with polymorphism.' }
    },
    {
      title: { ar: 'Constructor عملاق بكثير من البارامترات', en: 'Telescoping constructor with many parameters' },
      bad: { ar: 'constructor فيه 8+ بارامترات، معظمها اختياري وتمرّر null كثيراً.', en: 'A constructor with 8+ params, most optional, passing null repeatedly.' },
      smell: { ar: 'Long method / telescoping constructor', en: 'Long method / telescoping constructor' },
      patterns: ['builder'],
      fix: { ar: 'Builder: بناء الكائن خطوة بخطوة عبر withX()...build().', en: 'Builder: construct the object step by step via withX()...build().' }
    },
    {
      title: { ar: 'تكامل مكتبة بواجهة غير متوافقة', en: 'Integrating a library with an incompatible interface' },
      bad: { ar: 'مكتبة طرف ثالث تتوقع مدخلاً مختلفاً عمّا لديك (مثلاً city بدل lat/lng).', en: 'A third-party library expects a different input than you have (e.g. city instead of lat/lng).' },
      smell: { ar: 'عدم توافق الواجهات', en: 'Interface incompatibility' },
      patterns: ['adapter'],
      fix: { ar: 'Adapter: غلاف يحوّل واجهتك إلى الواجهة المتوقعة.', en: 'Adapter: a wrapper that converts your interface to the expected one.' }
    },
    {
      title: { ar: 'إضافة سلوك دون تعديل الكلاس أو الوراثة', en: 'Adding behavior without modifying the class or subclassing' },
      bad: { ar: 'تحتاج إضافة مزايا (logging، تنسيق...) تتراكم بمرونة وقت التشغيل.', en: 'You need to stack features (logging, formatting...) flexibly at runtime.' },
      smell: { ar: 'انفجار الكلاسات الفرعية (subclass explosion)', en: 'Subclass explosion' },
      patterns: ['decorator'],
      fix: { ar: 'Decorator: لفّ الكائن بكائنات تضيف سلوكاً ديناميكياً.', en: 'Decorator: wrap the object with objects that add behavior dynamically.' }
    }
  ],

  // ── Confusable patterns: differentiate (exam "Similar") ──
  comparisons: [
    {
      title: { ar: 'الأغلفة الأربعة: Adapter vs Decorator vs Proxy vs Facade', en: 'The four wrappers: Adapter vs Decorator vs Proxy vs Facade' },
      note: { ar: 'كلها "تلفّ" كائناً آخر، لكن الغرض يختلف:', en: 'All "wrap" another object, but the intent differs:' },
      rows: [
        { p: 'Adapter', ar: 'يغيّر الواجهة لتتوافق (نفس السلوك، واجهة مختلفة).', en: 'Changes the interface to make it compatible (same behavior, different interface).' },
        { p: 'Decorator', ar: 'يضيف سلوكاً جديداً مع الإبقاء على نفس الواجهة (يتراكم).', en: 'Adds new behavior while keeping the same interface (stacks).' },
        { p: 'Proxy', ar: 'نفس الواجهة، يتحكّم بالوصول (تحقّق، تأخير تحميل، caching).', en: 'Same interface, controls access (auth, lazy-load, caching).' },
        { p: 'Facade', ar: 'واجهة جديدة مبسّطة فوق نظام فرعي معقّد (لا يلفّ كائناً واحداً).', en: 'A new simplified interface over a complex subsystem (not wrapping one object).' }
      ]
    },
    {
      title: { ar: 'Strategy vs State', en: 'Strategy vs State' },
      note: { ar: 'نفس البنية تقريباً، لكن:', en: 'Almost identical structure, but:' },
      rows: [
        { p: 'Strategy', ar: 'العميل يختار الخوارزمية. الاستراتيجيات لا تعرف عن بعضها.', en: 'The client chooses the algorithm. Strategies are unaware of each other.' },
        { p: 'State', ar: 'الكائن يبدّل حالته تلقائياً؛ الحالات تعرف بعضها وتتحوّل فيما بينها.', en: 'The object switches its own state; states know each other and transition.' }
      ]
    },
    {
      title: { ar: 'Factory Method vs Abstract Factory vs Builder', en: 'Factory Method vs Abstract Factory vs Builder' },
      note: { ar: 'كلها إنشائية لكن:', en: 'All creational but:' },
      rows: [
        { p: 'Factory Method', ar: 'ينشئ كائناً واحداً بناءً على نوع/شرط.', en: 'Creates one object based on a type/condition.' },
        { p: 'Abstract Factory', ar: 'ينشئ عائلة من كائنات مترابطة معاً.', en: 'Creates a family of related objects together.' },
        { p: 'Builder', ar: 'يبني كائناً معقّداً خطوة بخطوة.', en: 'Builds one complex object step by step.' }
      ]
    },
    {
      title: { ar: 'Composite vs Decorator', en: 'Composite vs Decorator' },
      note: { ar: 'كلاهما بنية شجرية متكرّرة لكن:', en: 'Both are recursive tree structures but:' },
      rows: [
        { p: 'Composite', ar: 'يعامل الكائن المفرد والمجموعة بنفس الطريقة (part-whole).', en: 'Treats individual objects and groups uniformly (part-whole).' },
        { p: 'Decorator', ar: 'يضيف مسؤوليات لكائن واحد بلفّه (طبقة فوق طبقة).', en: 'Adds responsibilities to a single object by wrapping it (layer over layer).' }
      ]
    },
    {
      title: { ar: 'Template Method vs Strategy', en: 'Template Method vs Strategy' },
      note: { ar: 'كلاهما يغيّر خطوة في عملية لكن:', en: 'Both vary a step in a process but:' },
      rows: [
        { p: 'Template Method', ar: 'عبر الوراثة — الكلاس الأب يثبّت الهيكل، الأبناء يعدّلون خطوات.', en: 'Via inheritance — parent fixes the skeleton, subclasses override steps.' },
        { p: 'Strategy', ar: 'عبر التركيب — تبدّل كائن الخوارزمية وقت التشغيل.', en: 'Via composition — swap the algorithm object at runtime.' }
      ]
    }
  ],

  // ── MVC ──
  mvc: {
    intro: {
      ar: 'MVC (Model-View-Controller) نمط معماري يفصل التطبيق إلى ثلاث طبقات، ويُبنى من تركيبة أنماط تصميم.',
      en: 'MVC (Model-View-Controller) is an architectural pattern that splits the app into three layers, built from a combination of design patterns.'
    },
    parts: [
      { key: 'Model', ar: 'البيانات ومنطق العمل — كلاسات لكل جدول SQL، يعرف نقاط الـ API. لا يعتمد على الـ View.', en: 'Data & business logic — classes per SQL table, knows API endpoints. Does not depend on the View.' },
      { key: 'View', ar: 'واجهة المستخدم (UI) — يعرض البيانات فقط.', en: 'The user interface (UI) — only displays data.' },
      { key: 'Controller', ar: 'المنطق الوسيط بين الـ Model والـ View — يتحقّق من المدخلات ويعالجها.', en: 'The intermediary logic between Model and View — validates and handles input.' }
    ],
    patternsUsed: [
      { p: 'Observer', ar: 'العلاقة بين Model و View: الـ View يشترك في الـ Model ويُبلَّغ عند تغيّر البيانات.', en: 'Model↔View relationship: the View subscribes to the Model and is notified when data changes.' },
      { p: 'Strategy', ar: 'في الـ Controller: للتعامل مع أفعال المستخدم المختلفة (سلوكيات قابلة للتبديل).', en: 'In the Controller: to handle different user actions (swappable behaviors).' }
    ],
    facts: [
      { ar: 'الـ Controller يتوسّط بين الـ View والـ Model.', en: 'The Controller mediates between View and Model.' },
      { ar: 'الـ Model يحتوي منطق العمل ويدير بيانات التطبيق.', en: 'The Model contains business logic and manages application data.' },
      { ar: 'الـ View لا يحتوي منطق عمل ولا يعدّل الـ Model مباشرة (في الصورة المثالية).', en: 'The View contains no business logic and does not modify the Model directly (ideally).' }
    ]
  },

  // ── Before / After per category (core teaching device in the notes) ──
  categoryDeepDive: [
    {
      key: 'Creational',
      tagline: { ar: 'تتعامل مع إنشاء الكائنات — ليس فقط new() بل طرق أخرى لإنشائها.', en: 'Deal with object creation — not just new(), but other ways to create objects.' },
      before: {
        title: { ar: 'قبل: إنشاء مباشر', en: 'Before: direct creation' },
        code: 'Foo f = new Foo();',
        problems: [
          { ar: 'اقتران قوي: العميل مرتبط بالكلاس الفعلي.', en: 'Tight coupling: the client is bound to the concrete class.' },
          { ar: 'تغيير الـ constructor يكسر كل العملاء.', en: 'Changing the constructor breaks every client.' }
        ]
      },
      after: {
        title: { ar: 'بعد: إنشاء غير مباشر', en: 'After: indirect creation' },
        points: [
          { ar: 'إزالة الاقتران القوي — لا نريد ربط العملاء بالكلاسات الفعلية.', en: 'Eliminate tight coupling — we don\'t want clients bound to concrete classes.' },
          { ar: 'تغيير الـ constructor دون كسر العملاء.', en: 'Change the constructor without breaking clients.' }
        ],
        examples: [
          'Foo f = SingletonClass.getInstance();',
          'Foo f = FactoryMethod.create("Car");',
          'Foo f = Builder.create().withSomething().build();'
        ]
      }
    },
    {
      key: 'Structural',
      tagline: { ar: 'تتعامل مع تجميع الكلاسات لتكوين بنية أكبر (العلاقات والتركيب).', en: 'Deal with assembling classes into a larger structure (relationships & composition).' },
      before: {
        title: { ar: 'قبل: الاعتماد على الوراثة', en: 'Before: relying on inheritance' },
        code: 'class Sub extends Base { ... }',
        problems: [
          { ar: 'اقتران قوي (Tight Coupling).', en: 'Tight coupling.' },
          { ar: 'ثابت (static) — لا يمكن إضافة سلوك ديناميكياً وقت التشغيل.', en: 'Static — can\'t add behavior dynamically at runtime.' },
          { ar: 'تجريد ضعيف — علاقة "is-a" غير صحيحة غالباً.', en: 'Poor abstraction — the "is-a" relationship is often incorrect.' },
          { ar: 'تعديل كود الكلاس وتضخيمه.', en: 'Changing the class code and making it bigger.' }
        ]
      },
      after: {
        title: { ar: 'بعد: فضّل التركيب على الوراثة', en: 'After: favor composition over inheritance' },
        points: [
          { ar: 'احتوِ كائناً بدل توسيع كلاس — اقتران أقل ومرونة أكثر.', en: 'Hold an object instead of extending a class — less coupling, more flexibility.' },
          { ar: 'البرمجة وفق المواصفات: اكتب الواجهة/الكلاس المجرّد أولاً ثم نفّذه أو وسّعه.', en: 'Program to specification: write the interface/abstract class first, then implement or extend it.' }
        ],
        examples: [ 'class Foo {\n    Bar b;   // composition, not inheritance\n}' ]
      }
    },
    {
      key: 'Behavioral',
      tagline: { ar: 'تتعامل مع التواصل بين الكائنات وتوزيع المسؤوليات.', en: 'Deal with communication between objects and responsibilities.' },
      before: {
        title: { ar: 'قبل', en: 'Before' },
        code: 'if (type == "A") { ... }\nelse if (type == "B") { ... }\n// ... long duplicate code',
        problems: [
          { ar: 'جُمل if-else / switch طويلة.', en: 'Long if-else / switch statements.' },
          { ar: 'كود مكرّر طويل.', en: 'Long duplicate code.' }
        ]
      },
      after: {
        title: { ar: 'بعد', en: 'After' },
        points: [
          { ar: 'فضّل التركيب على الوراثة.', en: 'Favor composition over inheritance.' },
          { ar: 'البرمجة وفق المواصفات: اكتب الواجهة/الكلاس المجرّد أولاً ثم نفّذه أو وسّعه.', en: 'Program to specification: write the interface/abstract class first, then implement or extend it.' }
        ],
        examples: [ 'interface Strategy { void run(); }\ncontext.setStrategy(new ConcreteA());' ]
      }
    }
  ],

  // ── Type of exam questions (from the notes) ──
  questionTypes: {
    concepts: {
      title: { ar: 'مفاهيم / الصورة العامة', en: 'Concepts / Overall Picture' },
      items: [
        { ar: 'اشرح مفاهيم/مبادئ تصميم البرمجيات الأساسية.', en: 'Explain core software design concepts/principles.' },
        { ar: 'حدّد روائح الكود (Code smells).', en: 'Identify code smells.' },
        { ar: 'كل الأنماط: استخرج التشابهات، صنّفها، فرّق بينها.', en: 'All patterns: outline similarities, categorize, differentiate.' }
      ]
    },
    perPattern: {
      title: { ar: 'لكل نمط تصميم', en: 'For each design pattern' },
      items: [
        { ar: 'ما هو الغرض (Intent)؟', en: 'What is the intent?' },
        { ar: 'كيف يُطبَّق (إكمال كود مع مخطط UML)؟', en: 'How is it implemented (code completion with a UML diagram)?' },
        { ar: 'متى تستخدمه (حالات استخدام / تطبيقات / أعطِ مثالاً)؟', en: 'When to use it (use cases / applications / give an example)?' },
        { ar: 'سيناريو: اختر النمط الأنسب لموقف معطى.', en: 'Scenario: given a scenario, select the most appropriate pattern.' },
        { ar: 'الحدود / العواقب (Limitations / Consequences)؟', en: 'Limitations / consequences?' }
      ]
    }
  },

  // ── Code smells definition (from the notes) ──
  codeSmellsDef: {
    ar: 'إشارات على خيارات تصميم سيئة أو مشاكل محتملة.',
    en: 'Signals of bad design choices or potential problems.'
  },

  // ── Combined Design Patterns (patterns work together) ──
  combined: {
    intro: {
      ar: 'نادراً ما يُستخدم نمط بمفرده — في الأنظمة الحقيقية تُدمج عدة أنماط معاً، كل نمط يحلّ جزءاً من المشكلة.',
      en: 'A pattern is rarely used alone — in real systems several patterns are combined, each solving part of the problem.'
    },
    examples: [
      {
        title: { ar: 'تسجيل الدخول = Template Method + Strategy', en: 'Login flow = Template Method + Strategy' },
        desc: {
          ar: 'الـ Template Method يثبّت ترتيب العملية: signin() ثم do2FactorAuth() (القالب يضمن الترتيب دائماً). أما كل خطوة فهي Strategy قابلة للتبديل: طريقة الدخول (Google أو Facebook أو اسم مستخدم) والتحقّق الثنائي (SMS أو Email أو مفتاح أمان).',
          en: 'Template Method fixes the process order: signin() then do2FactorAuth() (the template always ensures the order). Each step is a swappable Strategy: the sign-in method (Google, Facebook, or username) and the 2FA method (SMS, Email, or a security key).'
        },
        patterns: ['template', 'strategy']
      },
      {
        title: { ar: 'MVC = Observer + Strategy', en: 'MVC = Observer + Strategy' },
        desc: {
          ar: 'علاقة الـ Model بالـ View تستخدم Observer: الـ View يشترك في الـ Model ويُبلَّغ تلقائياً عند تغيّر البيانات. والـ Controller يستخدم Strategy للتعامل مع أفعال المستخدم المختلفة كسلوكيات قابلة للتبديل.',
          en: 'The Model–View relationship uses Observer: the View subscribes to the Model and is notified automatically when data changes. The Controller uses Strategy to handle different user actions as swappable behaviors.'
        },
        patterns: ['observer', 'strategy']
      }
    ]
  }
};

// ============================================================
// DEEP DIVE — In-depth bilingual explanations for each pattern
// ============================================================

window.DEEP_DIVE = {

  singleton: {
    icon: '①',
    mnemonic: { ar: 'خاتم واحد يحكم الجميع', en: 'One ring to rule them all' },
    problem: {
      ar: 'تخيّل أن في تطبيقك Logger يكتب في ملف واحد. لو كل ميثود تعمل `new Logger()` ستحصل على عشرات الـ instances كلها تكتب على نفس الملف بنفس الوقت — تتداخل الأسطر، تضيع الرسائل، تتعارض الـ buffers. نفس المشكلة مع Database Connection Pool: لو فتحت 100 pool، كل واحد فيه 10 connections = 1000 connection للسيرفر. الكارثة. نحتاج كائن واحد فقط مشترك بين كل أجزاء التطبيق.',
      en: 'Imagine your app has a Logger writing to one file. If every method does `new Logger()`, you get dozens of instances writing to the same file simultaneously — interleaved lines, lost messages, buffer conflicts. Same with a Database Connection Pool: if you create 100 pools each with 10 connections = 1000 connections hitting the server. Disaster. We need exactly one shared object across the entire app.'
    },
    insight: {
      ar: 'الفكرة: امنع `new` بإخفاء الـ constructor، وأعطِ نقطة دخول واحدة `getInstance()` تتحكم في إنشاء وتسليم الكائن الوحيد. كأنك مدخل واحد لمسرح كبير.',
      en: 'The insight: block `new` by hiding the constructor, and provide one gateway `getInstance()` that controls creation and serves the single object. Like one entrance to a large theatre.'
    },
    mechanics: [
      { ar: 'اجعل الـ constructor `private` — أي محاولة `new` خارجية = خطأ كومبايل', en: 'Make constructor `private` — any external `new` = compile error' },
      { ar: 'حقل `private static` يحمل الـ instance الوحيد', en: 'A `private static` field holds the one instance' },
      { ar: '`public static getInstance()` — لو `null` أنشئ، وإلا أعد الموجود (lazy init)', en: '`public static getInstance()` — if `null`, create; else return existing (lazy init)' },
      { ar: 'في multi-threading: استخدم `synchronized` أو double-checked locking أو static holder', en: 'For multi-threading: use `synchronized`, double-checked locking, or static holder' }
    ],
    pros: [
      { ar: 'ضمان وجود instance واحد فقط في حياة التطبيق', en: 'Guarantees one instance for the app lifetime' },
      { ar: 'نقطة وصول عالمية بدون استخدام global variables الخطيرة', en: 'Global access point without dangerous global variables' },
      { ar: 'Lazy initialization — ما يُنشأ إلا عند الحاجة', en: 'Lazy initialization — created only when needed' },
      { ar: 'سيطرة كاملة على دورة حياته (init, destroy)', en: 'Full control over its lifecycle (init, destroy)' }
    ],
    cons: [
      { ar: 'يصعّب الـ unit testing — الـ state يبقى بين الاختبارات (مشكلة كبيرة!)', en: 'Hurts unit testing — state persists across tests (big issue!)' },
      { ar: 'يخفي الـ dependencies (كود يستخدم Singleton بدون أن يصرّح عنه في constructor)', en: 'Hides dependencies (code uses singleton without declaring it in constructor)' },
      { ar: 'ينتهك Single Responsibility — الكلاس يدير منطقه + يدير إنشاء نفسه', en: 'Violates SRP — class manages its logic AND its own creation' },
      { ar: 'صعب في multi-threading (race conditions في getInstance)', en: 'Tricky in multi-threading (race conditions in getInstance)' },
      { ar: 'يُعتبر anti-pattern من البعض لأنه global state مُقنّع', en: 'Considered anti-pattern by some — disguised global state' }
    ],
    whenToUse: [
      { ar: 'Logger مركزي', en: 'Centralized Logger' },
      { ar: 'Connection Pool لقاعدة البيانات', en: 'Database connection pool' },
      { ar: 'Cache في الذاكرة', en: 'In-memory cache' },
      { ar: 'Configuration manager', en: 'Configuration manager' },
      { ar: 'Hardware interface (طابعة، صوت)', en: 'Hardware interfaces (printer, audio)' }
    ],
    whenNotToUse: [
      { ar: 'دوال stateless — استخدم static methods مباشرة', en: 'Stateless utilities — just use static methods' },
      { ar: 'كائن بـ state متغير بكثرة — صراعات thread', en: 'Object with highly mutable state — thread chaos' },
      { ar: 'قد تحتاج لاحقاً أكثر من instance — لا تقفل خياراتك', en: 'You might need 2+ instances later — don\'t lock yourself in' }
    ],
    realDeep: {
      title: { ar: 'Java Runtime', en: 'Java Runtime' },
      scenario: {
        ar: '`Runtime.getRuntime()` في Java مثال حقيقي — Runtime واحد فقط لكل JVM يدير الذاكرة والـ processes. لا يمكن إنشاء Runtime بـ `new` لأن constructor مخفي.',
        en: '`Runtime.getRuntime()` in Java is a real example — exactly one Runtime per JVM manages memory and processes. You can\'t `new Runtime()` because its constructor is hidden.'
      },
      code: `public class Runtime {
    private static final Runtime currentRuntime = new Runtime();
    private Runtime() {}  // ❌ no external creation

    public static Runtime getRuntime() {
        return currentRuntime;
    }

    public void gc() { ... }
    public Process exec(String cmd) { ... }
}`
    },
    relations: [
      { withId: 'prototype', note: { ar: 'Prototype عكس Singleton — كثير من النسخ بدل واحدة', en: 'Prototype is the opposite — many copies, not one' } },
      { withId: 'factory', note: { ar: 'Factory قد تستخدم Singleton لمصنع وحيد', en: 'Factory may use Singleton for one global factory' } }
    ]
  },

  prototype: {
    icon: '⎘',
    mnemonic: { ar: 'نسخ الـ DNA', en: 'DNA replication' },
    problem: {
      ar: 'إنشاء كائن من الصفر مكلف جداً: قراءة من قاعدة بيانات، تحليل XML، إعدادات شبكة، parsing معقّد. لو كان عندك كائن جاهز ومضبوط، وتحتاج 100 نسخة منه بفروقات بسيطة — هل تنشئ كل واحدة من الصفر؟ تصير 100×تكلفة!',
      en: 'Creating an object from scratch is expensive: DB reads, XML parsing, network config, complex initialization. If you have a ready, configured object and need 100 copies with slight variations — would you build each from scratch? That\'s 100× the cost!'
    },
    insight: {
      ar: 'بدلاً من البناء، انسخ! الكائن نفسه يعرف كيف يستنسخ نفسه عبر `clone()`. النسخة جاهزة في زمن O(1) تقريباً مقارنة بإعادة التحميل الكامل.',
      en: 'Instead of building, copy! The object itself knows how to clone via `clone()`. A copy is ~O(1) compared to full reload.'
    },
    mechanics: [
      { ar: 'يطبّق الكائن `Cloneable` أو يوفّر method `copy()`', en: 'Object implements `Cloneable` or provides `copy()`' },
      { ar: 'Deep copy: نسخ كل الحقول، حتى الـ references الداخلية', en: 'Deep copy: copy every field, including internal references' },
      { ar: 'النسخة الجديدة مستقلة — تعديلها لا يؤثر على الأصلي', en: 'The clone is independent — modifying it doesn\'t affect the original' },
      { ar: 'يمكن تعديل النسخة بعد الـ clone (color, name, ...)', en: 'After clone, modify the copy as needed (color, name, ...)' }
    ],
    pros: [
      { ar: 'تجنّب تكلفة الإنشاء العالية (DB, parsing, network)', en: 'Avoid expensive construction (DB, parsing, network)' },
      { ar: 'إخفاء التعقيدات الداخلية للإنشاء عن العميل', en: 'Hide construction complexity from the client' },
      { ar: 'إضافة وإزالة الأنواع وقت التشغيل (registry of prototypes)', en: 'Add/remove types at runtime (prototype registry)' },
      { ar: 'لا تحتاج subclass لكل variant', en: 'No subclass per variant needed' }
    ],
    cons: [
      { ar: 'Deep copy للكائنات المعقدة (circular references) عذاب', en: 'Deep copying complex objects (circular refs) is painful' },
      { ar: 'الخلط بين shallow vs deep copy = bugs مزعجة', en: 'Shallow vs deep copy confusion = nasty bugs' },
      { ar: 'في Java: `Cloneable` interface مكسور — يستخدم Object.clone() بحاكي', en: 'In Java: `Cloneable` interface is broken — uses awkward Object.clone()' }
    ],
    whenToUse: [
      { ar: 'الإنشاء مكلف (شبكة، DB، حسابات معقدة)', en: 'Construction is expensive (network, DB, heavy compute)' },
      { ar: 'عندك template جاهز وتحتاج نُسخ بفروقات بسيطة', en: 'You have a template and need slight variations' },
      { ar: 'كائنات بنفس البنية لكن قيم مختلفة (game enemies, UI widgets)', en: 'Same structure, different values (game enemies, UI widgets)' }
    ],
    whenNotToUse: [
      { ar: 'الكائنات رخيصة الإنشاء — استخدم `new`', en: 'Objects cheap to construct — just `new`' },
      { ar: 'الكائن لا يحتوي state يستحق النسخ', en: 'Object has no state worth copying' },
      { ar: 'كائنات بـ references لمكونات خارجية لا تُنسخ (File handles, Sockets)', en: 'Objects holding non-copyable resources (file handles, sockets)' }
    ],
    realDeep: {
      title: { ar: 'JavaScript Prototype-Based OOP', en: 'JavaScript Prototype-Based OOP' },
      scenario: {
        ar: 'JavaScript مبني على Prototype! كل كائن يحمل reference لـ prototype آخر. `Object.create(template)` ينشئ كائن جديد بنفس prototype — أسرع وأخف من class instantiation.',
        en: 'JavaScript itself is prototype-based! Every object holds a reference to a prototype. `Object.create(template)` creates a new object sharing that prototype — faster and lighter than class instantiation.'
      },
      code: `const carPrototype = {
    drive() { console.log(\`\${this.brand} is driving\`); },
    stop()  { console.log("Stopped"); }
};

const toyota = Object.create(carPrototype);
toyota.brand = "Toyota";

const honda = Object.create(carPrototype);
honda.brand = "Honda";

toyota.drive(); // Toyota is driving
honda.drive();  // Honda is driving
// كلاهما يشارك نفس الـ methods في prototype`
    },
    relations: [
      { withId: 'factory', note: { ar: 'Factory ينشئ من classes، Prototype ينسخ من instance — Prototype أحسن لو عدد variants كبير', en: 'Factory creates from classes, Prototype clones from instance — Prototype better when variants > classes' } },
      { withId: 'singleton', note: { ar: 'عكسه تماماً — Singleton واحد، Prototype كثير', en: 'Direct opposite — Singleton one, Prototype many' } }
    ]
  },

  builder: {
    icon: '🏗',
    mnemonic: { ar: 'بناء برغر طبقة طبقة', en: 'Building a burger step by step' },
    problem: {
      ar: 'كلاس Car بـ 10 خصائص: brand, model, year, color, engine, gps, sunroof, seats, transmission, audio. لو سويت `new Car("Toyota", "Corolla", 2024, "red", "v6", true, false, 5, "auto", "premium")` — أي parameter وين؟ ولو 7 منها optional؟ يصير عندك 7 constructors بطرق مختلفة (telescoping constructor anti-pattern). كارثة قراءة وصيانة.',
      en: 'A Car class with 10 fields: brand, model, year, color, engine, gps, sunroof, seats, transmission, audio. Calling `new Car("Toyota", "Corolla", 2024, "red", "v6", true, false, 5, "auto", "premium")` — which param is which? And if 7 are optional? You\'d need 7 constructors with different signatures (telescoping constructor anti-pattern). Readability and maintenance disaster.'
    },
    insight: {
      ar: 'افصل البناء عن التمثيل — بدلاً من constructor واحد ضخم، استخدم methods متسلسلة (fluent API) كل واحدة تضبط جانب واحد، ثم `build()` تجمّع كل شيء وتعيد المنتج النهائي.',
      en: 'Separate construction from representation — instead of one huge constructor, use chained methods (fluent API) each setting one aspect, then `build()` assembles everything and returns the final product.'
    },
    mechanics: [
      { ar: 'كلاس Builder ينفصل عن الكائن النهائي (Product)', en: 'Builder class is separate from the final Product' },
      { ar: 'كل `withX()` تضبط حقل وتعيد `this` للسلسلة', en: 'Each `withX()` sets a field and returns `this` for chaining' },
      { ar: '`build()` يفحص الـ state، ينشئ الـ Product، ويعيده', en: '`build()` validates state, creates the Product, returns it' },
      { ar: 'Product غالباً immutable (final fields) ومنشأ في constructor خاص يقبل Builder', en: 'Product is usually immutable (final fields) with private constructor taking Builder' }
    ],
    pros: [
      { ar: 'قراءة الكود كأنه جملة إنجليزية: `.withBrand("BMW").withYear(2024).build()`', en: 'Reads like English: `.withBrand("BMW").withYear(2024).build()`' },
      { ar: 'كل حقل optional، ترتيب حر، لا حاجة لـ overloading', en: 'Each field optional, free order, no overloading needed' },
      { ar: 'Product يطلع immutable — آمن من thread issues', en: 'Product comes out immutable — thread safe' },
      { ar: 'فالديشن مركز في `build()` — لا تنشئ كائن غير صالح أبداً', en: 'Validation centralized in `build()` — never create invalid object' }
    ],
    cons: [
      { ar: 'يضاعف عدد الكلاسات (Builder + Product)', en: 'Doubles class count (Builder + Product)' },
      { ar: 'Boilerplate كثير — كل field يحتاج method', en: 'Lots of boilerplate — each field needs a method' },
      { ar: 'مبالغة لكائنات بـ 2-3 خصائص', en: 'Overkill for 2-3 field objects' }
    ],
    whenToUse: [
      { ar: '4+ خصائص، أكثرها optional', en: '4+ fields, mostly optional' },
      { ar: 'منتج immutable مطلوب', en: 'Immutable product required' },
      { ar: 'فالديشن معقد عند الإنشاء', en: 'Complex validation at creation' },
      { ar: 'صيغ متعددة لنفس النوع (Pizza: thin crust, thick crust, ...)', en: 'Many variants of same type (Pizza: thin/thick crust, ...)' }
    ],
    whenNotToUse: [
      { ar: 'كائن بسيط (1-3 خصائص)', en: 'Simple object (1-3 fields)' },
      { ar: 'كل الـ fields required بدون تباين', en: 'All fields required, no variation' }
    ],
    realDeep: {
      title: { ar: 'OkHttp Request Builder', en: 'OkHttp Request Builder' },
      scenario: {
        ar: 'مكتبة OkHttp في Android تستخدم Builder لـ HTTP requests — Request يحتوي URL, method, headers, body — كلها optional ما عدا URL. الـ Builder الـ fluent يجعل الكود قابل للقراءة.',
        en: 'Android\'s OkHttp library uses Builder for HTTP requests — Request has URL, method, headers, body — all optional except URL. The fluent Builder makes code readable.'
      },
      code: `Request request = new Request.Builder()
    .url("https://api.example.com/data")
    .header("Authorization", "Bearer " + token)
    .header("Accept", "application/json")
    .post(RequestBody.create(jsonBody, JSON))
    .build();

// مقارنة بـ:
// new Request("https://...", "POST", headers, body, null, null, ...)  ❌`
    },
    relations: [
      { withId: 'factory', note: { ar: 'Factory ينتج كائن واحد كامل، Builder يبني خطوة خطوة', en: 'Factory produces one complete object; Builder builds step-by-step' } },
      { withId: 'prototype', note: { ar: 'Prototype يبدأ من template، Builder يبدأ من الصفر', en: 'Prototype starts from template, Builder starts from scratch' } }
    ]
  },

  factory: {
    icon: '🏭',
    mnemonic: { ar: 'ماكينة البيع — اختر، احصل', en: 'Vending machine — pick, get' },
    problem: {
      ar: 'كودك يعرض أشكال: `new Circle()` هنا، `new Square()` هناك، `new Triangle()` في المكان الثالث. لو أضفت `Hexagon` لازم تعدّل في 100 مكان. كودك مرتبط بالكلاسات الـ concrete — ينتهك OCP (Open/Closed Principle).',
      en: 'Your code creates shapes: `new Circle()` here, `new Square()` there, `new Triangle()` over there. Adding `Hexagon` means editing 100 places. Your code is tightly coupled to concrete classes — violates OCP (Open/Closed Principle).'
    },
    insight: {
      ar: 'اخفِ كل الـ `new` خلف method واحدة `create(type)` تحدد بنفسها أي subclass تنشئ. العميل يطلب "Circle" كـ string، لا يهمه أي كلاس فعلي وراءه.',
      en: 'Hide all `new` calls behind one method `create(type)` that decides which subclass to instantiate. The client asks for "Circle" as a string and doesn\'t care which class is actually behind it.'
    },
    mechanics: [
      { ar: 'Interface مشتركة (Shape) — كل المنتجات تطبّقها', en: 'Common interface (Shape) — all products implement it' },
      { ar: 'كلاس ShapeFactory يحتوي method `get(String type)` أو `create()`', en: 'ShapeFactory class with `get(String type)` or `create()`' },
      { ar: 'الـ method تحتوي if/switch تعيد instance من الـ concrete subclass المناسبة', en: 'Method has if/switch returning the correct concrete subclass instance' },
      { ar: 'العميل يستخدم النتيجة عبر الـ interface فقط، لا يعرف النوع الفعلي', en: 'Client uses result via the interface only, never knows the actual type' }
    ],
    pros: [
      { ar: 'فصل الإنشاء عن الاستخدام — العميل لا يعرف الكلاسات الفعلية', en: 'Separates creation from usage — client doesn\'t know actual classes' },
      { ar: 'إضافة نوع جديد = تعديل في مكان واحد (الـ Factory) فقط', en: 'New type = edit one place (the Factory) only' },
      { ar: 'الكود يلتزم بـ Dependency Inversion (يعتمد على abstractions)', en: 'Code follows Dependency Inversion (depends on abstractions)' }
    ],
    cons: [
      { ar: 'كلاس Factory قد يصير "god class" لو عنده 50 نوع', en: 'Factory class can become a "god class" with 50 types' },
      { ar: 'String-based factory — لا يكتشف الـ compiler أخطاء الـ typo (use enum بدلاً)', en: 'String-based factory — compiler can\'t catch typos (use enum instead)' },
      { ar: 'إضافة منتج جديد = تعديل الـ Factory (ينتهك OCP من وجهة نظر)', en: 'Adding a product = editing the Factory (some argue this violates OCP)' }
    ],
    whenToUse: [
      { ar: 'منتجات متعددة بنفس الـ interface', en: 'Multiple products with same interface' },
      { ar: 'النوع يُحدد وقت التشغيل عبر input (config, user, file)', en: 'Type decided at runtime via input (config, user, file)' },
      { ar: 'تريد إخفاء تعقيدات الإنشاء عن العميل', en: 'Want to hide construction complexity from client' }
    ],
    whenNotToUse: [
      { ar: 'نوع واحد فقط من المنتج', en: 'Only one product type' },
      { ar: 'المنتجات مختلفة جداً (لا interface مشترك) — استخدم Abstract Factory', en: 'Products very different (no common interface) — use Abstract Factory' }
    ],
    realDeep: {
      title: { ar: 'JDBC DriverManager', en: 'JDBC DriverManager' },
      scenario: {
        ar: '`DriverManager.getConnection(url)` في Java يحلل الـ URL ويعيد الـ Connection المناسبة (MySQL, PostgreSQL, Oracle). كودك يستخدم Connection interface — لا يدري ولا يهمه أي driver فعلي.',
        en: '`DriverManager.getConnection(url)` in Java parses the URL and returns the right Connection (MySQL, PostgreSQL, Oracle). Your code uses the Connection interface — doesn\'t know or care which driver actually runs.'
      },
      code: `Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",  // أو jdbc:postgresql://...
    "user", "pass"
);

// نفس الكود يشتغل مع أي database
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users");
ResultSet rs = ps.executeQuery();
// لا أحد يعرف نوع الـ driver الفعلي`
    },
    relations: [
      { withId: 'singleton', note: { ar: 'الـ Factory نفسه غالباً Singleton — مصنع واحد للتطبيق', en: 'Factory itself often a Singleton — one factory per app' } },
      { withId: 'builder', note: { ar: 'Factory ينشئ كائن واحد كامل، Builder يبني خطوة', en: 'Factory creates one complete object; Builder builds step-by-step' } }
    ]
  },

  adapter: {
    icon: '🔌',
    mnemonic: { ar: 'محوّل الشاحن الدولي', en: 'International power adapter' },
    problem: {
      ar: 'كودك يتوقع `MediaPlayer.play(file)`، لكن المكتبة الخارجية الجديدة تعمل `AdvancedMediaPlayer.playMp4()` و `playVlc()`. ما تقدر تعدّل المكتبة (مغلقة المصدر) وما تبي تكتب كل كودك من جديد. تحتاج "مترجم" بينهم.',
      en: 'Your code expects `MediaPlayer.play(file)`, but a new external library uses `AdvancedMediaPlayer.playMp4()` and `playVlc()`. You can\'t modify the library (closed source) and don\'t want to rewrite all your code. You need a "translator" between them.'
    },
    insight: {
      ar: 'اصنع كلاس وسيط يطبّق الـ interface اللي كودك يتوقعها، ويحوّل الاستدعاءات داخلياً إلى الـ API الغريب. كأنه مترجم فوري.',
      en: 'Build a middle class that implements the interface your code expects, and internally translates calls to the foreign API. Like a live interpreter.'
    },
    mechanics: [
      { ar: 'Target Interface — ما يتوقعه العميل (MediaPlayer.play)', en: 'Target Interface — what client expects (MediaPlayer.play)' },
      { ar: 'Adaptee — الكلاس الموجود بـ interface مختلف (AdvancedMediaPlayer)', en: 'Adaptee — existing class with different interface (AdvancedMediaPlayer)' },
      { ar: 'Adapter — يطبّق Target ويحمل reference للـ Adaptee', en: 'Adapter — implements Target, holds reference to Adaptee' },
      { ar: 'method الـ Adapter تحوّل النداء إلى method الـ Adaptee المناسبة', en: 'Adapter\'s method translates the call to the matching Adaptee method' }
    ],
    pros: [
      { ar: 'إعادة استخدام كود قديم/خارجي بدون تعديله', en: 'Reuse old/external code without modifying it' },
      { ar: 'منطق التحويل معزول في كلاس واحد', en: 'Translation logic isolated in one class' },
      { ar: 'يمكن وجود عدة adapters لنفس الـ Adaptee لاستخدامات مختلفة', en: 'Multiple adapters can serve the same Adaptee differently' },
      { ar: 'يتبع Single Responsibility — كل adapter غرضه التحويل فقط', en: 'Follows SRP — each adapter just does translation' }
    ],
    cons: [
      { ar: 'طبقة إضافية = أداء أقل قليلاً', en: 'Extra layer = slight performance hit' },
      { ar: 'قد يخفي مشاكل تصميم أعمق كان لازم تتحل', en: 'May hide deeper design issues that should be fixed' },
      { ar: 'كثرة adapters تجعل تتبع الكود متعب', en: 'Many adapters make code tracing tedious' }
    ],
    whenToUse: [
      { ar: 'دمج مكتبة طرف ثالث (third-party)', en: 'Integrating third-party libraries' },
      { ar: 'استخدام كود قديم (legacy) في نظام جديد', en: 'Using legacy code in a new system' },
      { ar: 'دمج نظامين بـ APIs مختلفة لكن مفاهيم متشابهة', en: 'Merging two systems with different APIs but similar concepts' },
      { ar: 'كتابة tests — adapter يحوّل interface حقيقية لـ mock', en: 'Writing tests — adapter wraps real interface as mock' }
    ],
    whenNotToUse: [
      { ar: 'تقدر تعدّل الكود الأصلي', en: 'You can modify the original code' },
      { ar: 'الاختلاف بين الـ interfaces جذري (وظائف مختلفة جداً)', en: 'Interfaces fundamentally different (totally different jobs)' }
    ],
    realDeep: {
      title: { ar: 'Arrays.asList() في Java', en: 'Java\'s Arrays.asList()' },
      scenario: {
        ar: '`Arrays.asList()` يحوّل array (interface قديم) إلى List (interface حديث). الـ List الناتجة في الحقيقة wrapper حول الـ array — لا تنسخه، فقط تحوّل النداءات.',
        en: '`Arrays.asList()` converts an array (old interface) into a List (modern interface). The resulting List is actually a wrapper around the array — doesn\'t copy, just translates calls.'
      },
      code: `String[] arr = {"a", "b", "c"};
List<String> list = Arrays.asList(arr); // Adapter!

// list.get(0) داخلياً يستدعي arr[0]
// list.size() داخلياً يعيد arr.length
// لا نسخ — مجرد محوّل interface`
    },
    relations: [
      { withId: 'decorator', note: { ar: 'Decorator يضيف وظائف بنفس الـ interface، Adapter يغيّر الـ interface', en: 'Decorator adds features with same interface, Adapter changes the interface' } },
      { withId: 'proxy', note: { ar: 'Proxy نفس الـ interface مع تحكم، Adapter interface مختلف', en: 'Proxy same interface with control, Adapter different interface' } }
    ]
  },

  decorator: {
    icon: '🎁',
    mnemonic: { ar: 'دمى الماتريوشكا', en: 'Russian nesting dolls' },
    problem: {
      ar: 'محل قهوة: عندك Coffee، تبي تضيف Milk، Sugar، Whipped Cream، Caramel، Chocolate. لو سويت كلاس لكل تركيبة: CoffeeWithMilk، CoffeeWithMilkAndSugar، CoffeeWithMilkSugarChocolate... ينفجر عدد الكلاسات (combinatorial explosion). 5 إضافات = 32 كلاس!',
      en: 'Coffee shop: you have Coffee, want to add Milk, Sugar, Whipped Cream, Caramel, Chocolate. If you make a class per combo: CoffeeWithMilk, CoffeeWithMilkAndSugar, CoffeeWithMilkSugarChocolate... class explosion (combinatorial). 5 add-ons = 32 classes!'
    },
    insight: {
      ar: 'لف الكائن داخل كائن آخر يضيف ميزة وحدة، ولفه مرة ثانية لميزة ثانية. كل طبقة تطبّق نفس الـ interface — العميل لا يفرّق بين Coffee الأصلية و Coffee الملفوفة 5 مرات.',
      en: 'Wrap the object inside another object that adds one feature, then wrap again for another. Each layer implements the same interface — client can\'t tell plain Coffee from 5×-wrapped Coffee.'
    },
    mechanics: [
      { ar: 'Component interface (Coffee) — `cost()`, `description()`', en: 'Component interface (Coffee) — `cost()`, `description()`' },
      { ar: 'ConcreteComponent (BasicCoffee) — التطبيق الأساسي', en: 'ConcreteComponent (BasicCoffee) — base implementation' },
      { ar: 'Decorator abstract class يطبّق Component ويحمل reference لـ Component آخر', en: 'Abstract Decorator implements Component and holds reference to another Component' },
      { ar: 'ConcreteDecorators (MilkDecorator) — يستدعي wrapped.cost() ويضيف 0.5', en: 'ConcreteDecorators (MilkDecorator) — calls wrapped.cost() and adds 0.5' },
      { ar: 'تركيب: `new SugarDecorator(new MilkDecorator(new BasicCoffee()))`', en: 'Composition: `new SugarDecorator(new MilkDecorator(new BasicCoffee()))`' }
    ],
    pros: [
      { ar: 'تركيبات لا نهائية بدون انفجار الكلاسات (5 decorators = 32 combos، لا 32 كلاس)', en: 'Infinite combinations without class explosion (5 decorators = 32 combos, not 32 classes)' },
      { ar: 'إضافة وإزالة ميزات وقت التشغيل', en: 'Add/remove features at runtime' },
      { ar: 'Single Responsibility — كل decorator يضيف ميزة واحدة فقط', en: 'SRP — each decorator adds exactly one feature' },
      { ar: 'بديل أقوى من الـ inheritance — composition over inheritance', en: 'Better than inheritance — composition over inheritance' }
    ],
    cons: [
      { ar: 'كثير من الكلاسات الصغيرة في الكود', en: 'Many small classes in the codebase' },
      { ar: 'صعب debugging — الـ stack trace فيه 10 wrappers', en: 'Hard to debug — stack trace shows 10 wrappers' },
      { ar: 'الـ identity check (==) يكسر — Coffee ≠ MilkDecorator(Coffee)', en: 'Identity check (==) breaks — Coffee ≠ MilkDecorator(Coffee)' },
      { ar: 'ترتيب الـ decorators مهم! Milk(Sugar(...)) ≠ Sugar(Milk(...))', en: 'Order matters! Milk(Sugar(...)) ≠ Sugar(Milk(...))' }
    ],
    whenToUse: [
      { ar: 'إضافة ميزات قابلة للتركيب (logging, caching, encryption)', en: 'Stackable features (logging, caching, encryption)' },
      { ar: 'cross-cutting concerns — أشياء كثير من الكائنات تحتاجها بشكل اختياري', en: 'Cross-cutting concerns — features many objects optionally need' },
      { ar: 'الـ inheritance ينفجر عند التركيبات', en: 'Inheritance explodes for combinations' }
    ],
    whenNotToUse: [
      { ar: 'الميزة الإضافية تغيّر سلوك الـ method جذرياً (استخدم Strategy)', en: 'Added feature fundamentally changes method behavior (use Strategy)' },
      { ar: 'ميزة واحدة فقط ولا حاجة لتركيبات', en: 'Only one optional feature, no combinations needed' }
    ],
    realDeep: {
      title: { ar: 'Java I/O Streams', en: 'Java I/O Streams' },
      scenario: {
        ar: 'الـ I/O في Java مبني كلياً على Decorator! BufferedReader يلف InputStreamReader اللي يلف FileInputStream. كل طبقة تضيف وظيفة (buffering, char decoding, file access).',
        en: 'Java I/O is entirely built on Decorator! BufferedReader wraps InputStreamReader wraps FileInputStream. Each layer adds a function (buffering, char decoding, file access).'
      },
      code: `BufferedReader reader = new BufferedReader(            // ⊕ buffering
    new InputStreamReader(                                // ⊕ bytes → chars
        new FileInputStream("data.txt")                   // ⊕ raw file bytes
    )
);

String line = reader.readLine();  // كل طبقة شغّلت دورها
reader.close();  // كل طبقة تنظف نفسها بالعكس`
    },
    relations: [
      { withId: 'adapter', note: { ar: 'Adapter يغيّر interface، Decorator يحافظ على interface ويضيف', en: 'Adapter changes interface, Decorator keeps it and adds features' } },
      { withId: 'proxy', note: { ar: 'Proxy يتحكم في الوصول، Decorator يضيف وظائف — interface واحدة لكن نية مختلفة', en: 'Proxy controls access, Decorator adds features — same interface, different intent' } }
    ]
  },

  flyweight: {
    icon: '🪶',
    mnemonic: { ar: 'مشاركة أقلام التلوين', en: 'Sharing crayons' },
    problem: {
      ar: 'لعبة فيها غابة بـ 1,000,000 شجرة. كل شجرة Object فيها: type ("Oak"), texture (5MB image), color, height, mesh (3D model 2MB). الحساب: 1M × 7MB = 7TB في الذاكرة! لكن في الحقيقة 99% من الأشجار يشاركون نفس الـ texture و mesh — لماذا نخزنها مكررة؟',
      en: 'A game with a forest of 1,000,000 trees. Each Tree has: type ("Oak"), texture (5MB image), color, height, mesh (3D model 2MB). Math: 1M × 7MB = 7TB in memory! But really 99% of trees share the same texture and mesh — why store them duplicated?'
    },
    insight: {
      ar: 'افصل state إلى نوعين: intrinsic (مشترك، ثابت، لا يتغير: texture, mesh) و extrinsic (خاص بكل كائن: position, height). شارك الـ intrinsic عبر cache، خزّن الـ extrinsic فقط في كل instance.',
      en: 'Split state into two kinds: intrinsic (shared, immutable: texture, mesh) and extrinsic (per-instance: position, height). Share intrinsic via a cache, store only extrinsic in each instance.'
    },
    mechanics: [
      { ar: 'حدد الـ intrinsic state (مشترك بين كثيرين)', en: 'Identify intrinsic state (shared across many)' },
      { ar: 'حدد الـ extrinsic state (يختلف لكل كائن، يُمرر عند الاستخدام)', en: 'Identify extrinsic state (varies per object, passed in on use)' },
      { ar: 'Flyweight class يحتوي intrinsic فقط، immutable', en: 'Flyweight class holds intrinsic only, immutable' },
      { ar: 'FlyweightFactory ينشئ flyweight جديد لكل مفتاح فريد، يعيد الموجود لو موجود', en: 'FlyweightFactory creates new flyweight per unique key, returns existing if found' },
      { ar: 'الـ Context (Tree) يخزن extrinsic + reference للـ flyweight', en: 'Context (Tree) stores extrinsic + reference to flyweight' }
    ],
    pros: [
      { ar: 'توفير ذاكرة هائل — من GB إلى MB', en: 'Massive memory savings — GB → MB' },
      { ar: 'أداء أحسن لو الـ intrinsic state ثقيل التحميل (textures)', en: 'Better performance if intrinsic state is heavy to load (textures)' },
      { ar: 'cache locality أفضل — الـ CPU يشتغل أسرع', en: 'Better cache locality — CPU runs faster' }
    ],
    cons: [
      { ar: 'تعقيد إضافي — تحتاج تفصل intrinsic vs extrinsic بدقة', en: 'Extra complexity — must carefully split intrinsic vs extrinsic' },
      { ar: 'الـ Context يصير أكبر (يخزن كل extrinsic)', en: 'Context grows (stores all extrinsic)' },
      { ar: 'استدعاء أبطأ شوي (indirection للـ flyweight)', en: 'Slightly slower calls (indirection to flyweight)' },
      { ar: 'لو intrinsic state يتغيّر — الكارثة (يفسد كل من يشاركه)', en: 'If intrinsic state changes — disaster (corrupts everyone sharing)' }
    ],
    whenToUse: [
      { ar: 'كائنات كثيرة جداً (آلاف، ملايين)', en: 'Very many objects (thousands, millions)' },
      { ar: 'ضغط ذاكرة عالي', en: 'High memory pressure' },
      { ar: 'الـ state قابل للقسمة بوضوح إلى مشترك/خاص', en: 'State clearly splits into shared/per-instance' }
    ],
    whenNotToUse: [
      { ar: 'عدد الكائنات قليل (دزينة)', en: 'Few objects (a dozen)' },
      { ar: 'الـ intrinsic state يتغيّر بكثرة', en: 'Intrinsic state changes often' },
      { ar: 'لا يوجد state مشترك حقيقي', en: 'No truly shareable state' }
    ],
    realDeep: {
      title: { ar: 'Java String.intern() و String Pool', en: 'Java String.intern() and String Pool' },
      scenario: {
        ar: 'كل string literal في Java محفوظ في "string pool" — لو سويت `"hello"` مرتين، Java تعيد نفس الـ instance. وفّر هذا ميغابايتات في تطبيقات الويب اللي تتعامل مع HTTP headers, JSON keys إلخ.',
        en: 'Every string literal in Java is stored in the "string pool" — if you write `"hello"` twice, Java returns the same instance. This saves megabytes in web apps dealing with HTTP headers, JSON keys, etc.'
      },
      code: `String a = "hello";
String b = "hello";
System.out.println(a == b);  // true! نفس الـ object

String c = new String("hello");        // ليست في الـ pool
String d = c.intern();                  // الآن في الـ pool
System.out.println(a == d);  // true

// لو 1M JSON object فيه "name", "email", "age" → 3 strings مشتركة لا 3M`
    },
    relations: [
      { withId: 'singleton', note: { ar: 'كلا الـ Singleton و Flyweight يشاركون state — Singleton واحد لكل التطبيق، Flyweight واحد لكل قيمة فريدة', en: 'Both share state — Singleton one per app, Flyweight one per unique value' } },
      { withId: 'factory', note: { ar: 'الـ FlyweightFactory هو Factory متخصص يعيد المشترك بدل ينشئ جديد', en: 'FlyweightFactory is a specialized Factory that returns shared instead of new' } }
    ]
  },

  proxy: {
    icon: '🛡',
    mnemonic: { ar: 'حارس النادي يفحص الـ ID', en: 'Bouncer checking IDs' },
    problem: {
      ar: 'تحتاج تحكم في وصول الكائن: (1) صورة كبيرة لا تحمّلها إلا عند الحاجة (lazy loading)، (2) API بعيد لا تستدعيه إلا بعد فحص الـ auth، (3) عملية ثقيلة احفظ نتيجتها (cache). تعديل كل كائن لإضافة هذي الخطوات = chaos. تحتاج طبقة "حارس" بنفس interface الكائن.',
      en: 'You need to control access to an object: (1) large image loaded lazily, (2) remote API called only after auth check, (3) heavy operation results cached. Modifying every object to add these checks = chaos. You need a "guard" layer with the same interface as the object.'
    },
    insight: {
      ar: 'كائن وكيل (Proxy) يطبّق نفس interface الكائن الحقيقي، يقف بينه وبين العميل، يقرر متى/إذا/كيف يمرّر الطلب. شفاف تماماً للعميل.',
      en: 'A surrogate (Proxy) implements the same interface as the real object, sits between it and the client, decides when/if/how to forward calls. Completely transparent to the client.'
    },
    mechanics: [
      { ar: 'Subject interface — كلاهما (Proxy و Real) يطبّقها', en: 'Subject interface — both Proxy and Real implement it' },
      { ar: 'RealSubject — العمل الحقيقي الثقيل', en: 'RealSubject — the actual heavy work' },
      { ar: 'Proxy — يحمل reference للـ RealSubject (قد يكون lazy)', en: 'Proxy — holds reference to RealSubject (possibly lazy)' },
      { ar: 'كل method في Proxy تتحقق من الشروط أولاً (auth, cache, etc.) ثم تستدعي real', en: 'Each Proxy method checks conditions first (auth, cache, etc.) then calls real' }
    ],
    pros: [
      { ar: 'إضافة سلوك تحكم بدون تعديل الـ RealSubject', en: 'Add control behavior without modifying RealSubject' },
      { ar: 'lazy loading يوفر memory وأداء', en: 'Lazy loading saves memory and performance' },
      { ar: 'caching = استجابة فورية للطلبات المتكررة', en: 'Caching = instant response for repeated requests' },
      { ar: 'security layer مركزي', en: 'Centralized security layer' }
    ],
    cons: [
      { ar: 'طبقة إضافية = استدعاءات أبطأ', en: 'Extra layer = slower calls' },
      { ar: 'تعقيد في debugging — وين يحدث الفعل الحقيقي؟', en: 'Debugging complexity — where does the real work happen?' },
      { ar: 'لو الـ proxy يتعطل، الكائن الحقيقي معزول', en: 'If proxy fails, real object is isolated' }
    ],
    whenToUse: [
      { ar: 'Auth checks قبل كل عملية', en: 'Auth checks before every operation' },
      { ar: 'Lazy initialization لكائنات ثقيلة', en: 'Lazy initialization for heavy objects' },
      { ar: 'Caching لنتائج العمليات المتكررة', en: 'Caching results of repeated operations' },
      { ar: 'Remote object stub (RMI, REST clients)', en: 'Remote object stubs (RMI, REST clients)' },
      { ar: 'Logging كل الاستدعاءات', en: 'Logging all calls' }
    ],
    whenNotToUse: [
      { ar: 'دائماً تحتاج للوصول المباشر السريع', en: 'You always need fast direct access' },
      { ar: 'لا توجد عمليات cross-cutting', en: 'No cross-cutting concerns' }
    ],
    realDeep: {
      title: { ar: 'Hibernate Lazy Loading', en: 'Hibernate Lazy Loading' },
      scenario: {
        ar: 'Hibernate ينشئ proxy تلقائياً للـ entities. عندما تستدعي `user.getOrders()`، الـ proxy يفحص: لو الـ orders ما تحمّلت بعد، يعمل query إلى DB، يخزن النتيجة، يعيدها. الاستدعاء التالي يأخذها من الـ cache بدون أي DB hit.',
        en: 'Hibernate auto-generates proxies for entities. When you call `user.getOrders()`, the proxy checks: if orders aren\'t loaded yet, query the DB, cache the result, return it. Next call gets from cache with zero DB hits.'
      },
      code: `@Entity
public class User {
    @OneToMany(fetch = FetchType.LAZY)  // ⚡ proxy magic
    private List<Order> orders;
}

// المستخدم لا يدري:
User user = session.get(User.class, 1L);
// ما حدث DB query للـ orders بعد

user.getOrders().size();
// ⚡ proxy يكتشف الحاجة، يعمل query، يخزن، يعيد
user.getOrders().get(0);  // ⚡ من الـ cache مباشرة`
    },
    relations: [
      { withId: 'decorator', note: { ar: 'Decorator يضيف وظائف، Proxy يتحكم في الوصول — نفس البنية، نية مختلفة', en: 'Decorator adds features, Proxy controls access — same structure, different intent' } },
      { withId: 'adapter', note: { ar: 'Adapter يغيّر interface، Proxy يحافظ على interface', en: 'Adapter changes interface, Proxy keeps the same interface' } }
    ]
  },

  observer: {
    icon: '📡',
    mnemonic: { ar: 'الاشتراك في جريدة', en: 'Newspaper subscription' },
    problem: {
      ar: 'في تطبيق Twitter، عند نشر تغريدة جديدة، يجب إشعار: (1) متابعي المستخدم، (2) صفحة التوصيات، (3) فلتر hashtags، (4) إشعارات الموبايل، (5) cache invalidation، (6) analytics. لو الـ Tweet كائن يعرف كل هؤلاء = coupling مأساوي. ولو أضفت جديد، تعديل في 10 أماكن.',
      en: 'In Twitter, when a tweet is posted, notify: (1) user\'s followers, (2) recommendations page, (3) hashtag filters, (4) mobile notifications, (5) cache invalidation, (6) analytics. If Tweet knows all these = tragic coupling. Adding a new listener = edit 10 places.'
    },
    insight: {
      ar: 'الكائن (Subject) يحتفظ بقائمة "مشتركين" ويبثّ إشعار عام عند كل تغيير. المشتركون يسجلون/يلغون متى يبغون. الـ Subject ما يعرف ولا يهمه من المشترك ولا كم عددهم.',
      en: 'The Subject keeps a list of "subscribers" and broadcasts notifications on every change. Subscribers register/unregister when they want. Subject doesn\'t know or care who or how many.'
    },
    mechanics: [
      { ar: 'Subject interface — `subscribe(Observer)`, `unsubscribe(Observer)`, `notify()`', en: 'Subject interface — `subscribe(Observer)`, `unsubscribe(Observer)`, `notify()`' },
      { ar: 'Observer interface — `update(data)`', en: 'Observer interface — `update(data)`' },
      { ar: 'ConcreteSubject يحمل قائمة observers (List<Observer>)', en: 'ConcreteSubject holds an observer list (List<Observer>)' },
      { ar: 'عند تغيير state، `notify()` يلف على القائمة ويستدعي `update()` لكل واحد', en: 'On state change, `notify()` iterates the list and calls `update()` on each' },
      { ar: 'ConcreteObservers يطبّقون `update()` كل واحد بطريقته', en: 'ConcreteObservers each implement `update()` in their own way' }
    ],
    pros: [
      { ar: 'Loose coupling — Subject لا يعرف الـ Observers', en: 'Loose coupling — Subject doesn\'t know Observers' },
      { ar: 'Subscribe/unsubscribe وقت التشغيل (dynamic)', en: 'Subscribe/unsubscribe at runtime (dynamic)' },
      { ar: 'broadcast لـ N مشترك بكفاءة', en: 'Efficient broadcast to N subscribers' },
      { ar: 'يدعم Open/Closed — أضف observer جديد بدون لمس Subject', en: 'Supports Open/Closed — add new observer without touching Subject' }
    ],
    cons: [
      { ar: 'ترتيب التحديث غير محدد — observer A قد ينفّذ قبل B بدون ضمان', en: 'Update order undefined — observer A may run before B without guarantee' },
      { ar: 'Memory leaks لو نسيت `unsubscribe()` — observer يبقى في الذاكرة للأبد', en: 'Memory leaks if you forget `unsubscribe()` — observer stays in memory forever' },
      { ar: 'cascading updates — observer يعدّل subject ثاني = chain تفاعلات', en: 'Cascading updates — observer updates another subject = chain reaction' },
      { ar: 'صعب debugging — من اللي حدّث؟ متى؟', en: 'Hard to debug — who updated? when?' },
      { ar: 'لو observer رمى exception، قد يكسر سلسلة التحديث', en: 'If observer throws, may break the update chain' }
    ],
    whenToUse: [
      { ar: 'Event systems (UI clicks, network events)', en: 'Event systems (UI clicks, network events)' },
      { ar: 'Real-time updates (chat, stock prices, scores)', en: 'Real-time updates (chat, stock prices, scores)' },
      { ar: 'MVC: Model تبلغ Views', en: 'MVC: Model notifies Views' },
      { ar: 'Reactive programming (RxJS, RxJava)', en: 'Reactive programming (RxJS, RxJava)' }
    ],
    whenNotToUse: [
      { ar: 'فقط مشترك واحد دائماً — استدعِ مباشرة', en: 'Always exactly one subscriber — just call directly' },
      { ar: 'تحتاج ترتيب صارم للتحديثات', en: 'Need strict update order' },
      { ar: 'الـ chain يتعمّق كثيراً وتسبب performance issues', en: 'Chain becomes too deep and causes performance issues' }
    ],
    realDeep: {
      title: { ar: 'DOM Event Listeners', en: 'DOM Event Listeners' },
      scenario: {
        ar: 'كل `addEventListener` في JavaScript = اشتراك observer. زر يبثّ "click" event لكل المشتركين، كل واحد يفعل شغله. مثال خرافي للـ Observer في الواقع.',
        en: 'Every `addEventListener` in JavaScript = subscribing an observer. A button broadcasts "click" to all subscribers, each does its thing. Textbook real-world Observer.'
      },
      code: `const button = document.querySelector('#submit');

// 3 مشتركين، كل واحد يفعل شغله
button.addEventListener('click', () => sendAnalytics());
button.addEventListener('click', () => validateForm());
button.addEventListener('click', () => submitToServer());

// الزر لا يعرف عن أي واحد منهم
// تقدر تشيل أي observer:
button.removeEventListener('click', sendAnalytics);`
    },
    relations: [
      { withId: 'strategy', note: { ar: 'Observer لتبليغ التغيرات، Strategy لتغيير الخوارزمية — الاثنان يفصلون السلوك عن الـ class الأساسي', en: 'Observer for notifying changes, Strategy for swapping algorithm — both separate behavior from main class' } },
      { withId: 'singleton', note: { ar: 'Event bus عادةً Singleton يبثّ events لكل التطبيق', en: 'Event bus is often a Singleton broadcasting events app-wide' } }
    ]
  },

  strategy: {
    icon: '⚔',
    mnemonic: { ar: 'اختر سلاحك', en: 'Choose your weapon' },
    problem: {
      ar: 'تطبيق دفع: cash, credit card, Apple Pay, PayPal, crypto. كل واحد له خوارزمية حساب رسوم وتنفيذ مختلفة. لو سويت if/else ضخم في class Order = الكلاس يصير 500 سطر، صعب التعديل، وعند إضافة طريقة جديدة تعدّل في كل order ميثود.',
      en: 'A payment app: cash, credit card, Apple Pay, PayPal, crypto. Each has different fee calculation and execution logic. A huge if/else in the Order class = 500-line class, hard to modify, and adding a new method requires editing every order method.'
    },
    insight: {
      ar: 'كل خوارزمية = كلاس منفصل يطبّق interface مشتركة. الـ Context يحمل reference للـ Strategy الحالية ويفوّض إليها. تبدّل الـ Strategy وقت التشغيل بتغيير reference.',
      en: 'Each algorithm = a separate class implementing a common interface. The Context holds a reference to the current Strategy and delegates to it. Swap Strategy at runtime by changing the reference.'
    },
    mechanics: [
      { ar: 'Strategy interface — `execute(...)` أو `pay(amount)`', en: 'Strategy interface — `execute(...)` or `pay(amount)`' },
      { ar: 'ConcreteStrategies — CashPayment, CreditCardPayment, etc.', en: 'ConcreteStrategies — CashPayment, CreditCardPayment, etc.' },
      { ar: 'Context — يحمل `Strategy current` ويعيّنها وقت التشغيل', en: 'Context — holds `Strategy current` and sets it at runtime' },
      { ar: 'الـ Context يستدعي `current.execute()` بدون أن يعرف النوع الفعلي', en: 'Context calls `current.execute()` without knowing the actual type' }
    ],
    pros: [
      { ar: 'إزالة if/else chains الضخمة', en: 'Eliminates huge if/else chains' },
      { ar: 'Open/Closed — أضف strategy جديدة بدون لمس Context', en: 'Open/Closed — add a new strategy without touching Context' },
      { ar: 'يمكن تبديل الـ strategy وقت التشغيل (user يختار)', en: 'Can swap strategy at runtime (user picks)' },
      { ar: 'كل خوارزمية معزولة — سهلة الاختبار والتعديل', en: 'Each algorithm isolated — easy to test and modify' }
    ],
    cons: [
      { ar: 'العميل لازم يعرف الـ strategies الموجودة ليختار', en: 'Client must know which strategies exist to choose' },
      { ar: 'زيادة عدد الكلاسات', en: 'Increases class count' },
      { ar: 'مبالغة لو عندك 2 خوارزميتين فقط', en: 'Overkill if you only have 2 algorithms' },
      { ar: 'تواصل غير مباشر — قد يضيع context بين Context و Strategy', en: 'Indirect communication — may lose context between Context and Strategy' }
    ],
    whenToUse: [
      { ar: 'خوارزميات متعددة لنفس المهمة (sorting, encryption, compression)', en: 'Multiple algorithms for same task (sorting, encryption, compression)' },
      { ar: 'طرق دفع متعددة', en: 'Multiple payment methods' },
      { ar: 'صيغ تصدير مختلفة (PDF, Excel, CSV)', en: 'Different export formats (PDF, Excel, CSV)' },
      { ar: 'AI behaviors في الألعاب (aggressive, defensive, neutral)', en: 'Game AI behaviors (aggressive, defensive, neutral)' }
    ],
    whenNotToUse: [
      { ar: 'خوارزمية واحدة لن تتغير أبداً', en: 'Only one algorithm, will never change' },
      { ar: 'خوارزميات متشابهة جداً (الفرق سطر واحد) — استخدم parameter', en: 'Algorithms very similar (1-line diff) — use a parameter' }
    ],
    realDeep: {
      title: { ar: 'Java Comparator', en: 'Java Comparator' },
      scenario: {
        ar: '`Collections.sort(list, comparator)` تأخذ Comparator strategy لتحديد كيف تقارن. تبدّل الـ comparator = تبدّل الـ algorithm كاملاً بدون لمس sort.',
        en: '`Collections.sort(list, comparator)` takes a Comparator strategy to decide how to compare. Swap the comparator = swap the entire algorithm without touching sort.'
      },
      code: `List<User> users = ...;

// Strategy 1: ترتيب بالاسم
Collections.sort(users, (a, b) -> a.name.compareTo(b.name));

// Strategy 2: ترتيب بالعمر
Collections.sort(users, (a, b) -> a.age - b.age);

// Strategy 3: ترتيب معكوس بالاسم
Collections.sort(users, (a, b) -> b.name.compareTo(a.name));

// نفس sort() — strategy مختلفة في كل مرة
// Lambda هو في الحقيقة poor man's Strategy`
    },
    relations: [
      { withId: 'observer', note: { ar: 'Strategy تبدل سلوك، Observer تبلغ بتغير', en: 'Strategy swaps behavior, Observer notifies of change' } },
      { withId: 'factory', note: { ar: 'Factory ينشئ Strategy المناسبة بناء على input', en: 'Factory can create the right Strategy based on input' } }
    ]
  }
};

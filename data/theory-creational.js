// ============================================================
// THEORY — Creational patterns (5)
// Singleton, Prototype, Builder, Factory Method, Abstract Factory
// ============================================================

window.THEORY_PATTERNS = (window.THEORY_PATTERNS || []).concat([

  {
    id: 'singleton', name: 'Singleton', nameAr: 'المُفرد', category: 'Creational',
    icon: '①', practical: true, practicalId: 'singleton',
    intent: {
      ar: 'يضمن أن للكلاس نسخة واحدة فقط، ويوفّر نقطة وصول عامة لها.',
      en: 'Ensures a class has only one instance, and provides a global access point to it.'
    },
    whenToUse: {
      ar: 'عندما يجب أن يكون لمورد مشترك نسخة واحدة في كامل التطبيق — مثل اتصال قاعدة بيانات، أو ملف إعدادات، أو Logger.',
      en: 'When a shared resource must have a single instance across the whole app — e.g. a database connection, a config file, or a Logger.'
    },
    principle: {
      ar: 'تحكّم أصرم من المتغيّرات العامة. (يخالف SRP لأنه يحلّ مشكلتين: ضمان نسخة واحدة + الوصول العام.)',
      en: 'Stricter control than global variables. (Violates SRP since it solves two problems: single instance + global access.)'
    },
    keyword: { ar: 'نسخة واحدة فقط · مورد مشترك · نقطة وصول عامة', en: 'only one instance · shared resource · global access point' },
    howItWorks: {
      ar: 'constructor خاص (private) يمنع new من الخارج + حقل static يخزّن النسخة + دالة getInstance() static تنشئها أول مرة (lazy) وترجعها في كل مرة بعدها.',
      en: 'A private constructor blocks external new + a static field stores the instance + a static getInstance() creates it lazily on first call and returns it thereafter.'
    },
    limitations: {
      ar: 'يخالف مبدأ المسؤولية الواحدة · قد يخفي تصميماً سيئاً (مكوّنات تعرف أكثر من اللازم عن بعضها) · يحتاج معالجة خاصة في البيئات متعدّدة الخيوط · صعوبة في اختبار الوحدة (unit testing).',
      en: 'Violates SRP · can mask bad design (components knowing too much about each other) · needs special handling in multithreaded environments · hard to unit-test.'
    },
    scenarios: [
      { text: { ar: 'تطبيق متعدّد الخيوط (multithreaded) يعالج المهام بشكل متوازٍ باستخدام ThreadPool. المشكلة أن الكود الحالي يُنشئ كائن الـ pool في عدة أماكن باستخدام new، وكل كائن يطلق 5 خيوط عاملة جديدة، مما يهدر موارد النظام. يحتاج الفريق إلى ضمان وجود pool واحد مشترك فقط في كامل التطبيق، مع نقطة وصول عامة يصل إليها أي وحدة.', en: 'A multithreaded application processes tasks in parallel using a ThreadPool. The problem: the current code instantiates the pool object in several places with new, and each instance spawns 5 new worker threads, wasting system resources. The team needs to guarantee that exactly one shared pool exists across the entire application, with a single global access point reachable by any module.' },
        why: { ar: 'العبارات الحاسمة: "pool واحد مشترك في كامل التطبيق" + "نقطة وصول عامة" → هذا تعريف Singleton حرفياً.', en: 'Decisive phrases: "one shared pool across the entire application" + "a single global access point" → this is literally the Singleton definition.' } },
      { text: { ar: 'يحمّل تطبيق مؤسّسي إعداداته (روابط قواعد البيانات، مفاتيح الـ API، أعلام المزايا) من ملف عند بدء التشغيل. عشرات المكوّنات تقرأ هذه الإعدادات طوال عمر التطبيق. يريد المطوّرون تجنّب إعادة قراءة الملف وتحليله مراراً، وضمان أن كل المكوّنات تشترك في نفس كائن الإعدادات تماماً.', en: 'An enterprise app loads its configuration (database URLs, API keys, feature flags) from a file at startup. Dozens of components read these settings throughout the app\'s lifetime. The developers want to avoid re-reading and re-parsing the file repeatedly, and ensure all components share the very same configuration object.' },
        why: { ar: 'التريك: "كل المكوّنات تشترك في نفس الكائن تماماً" + مورد مشترك يُحمَّل مرة واحدة → Singleton.', en: 'The trick: "all components share the very same object" + a shared resource loaded once → Singleton.' } },
      { text: { ar: 'نظام كبير يكتب رسائل التشخيص في ملف سجلّ (log) واحد من كل وحداته. عندما تُنشئ كل وحدة كائن Logger خاصاً بها، تتداخل عمليات الكتابة وتُفسد الملف. يحتاج الفريق إلى نسخة تسجيل واحدة مشتركة تتحكّم في الوصول إلى هذا المورد الوحيد المشترك.', en: 'A large system writes diagnostic messages to a single log file from every module. When each module creates its own Logger object, the writes interleave and corrupt the file. The team needs one shared logging instance that controls access to this one shared resource.' },
        why: { ar: 'التريك: "نسخة واحدة مشتركة تتحكّم في الوصول إلى مورد وحيد" → Singleton (تفادي تضارب الكتابة).', en: 'The trick: "one shared instance controlling access to a single resource" → Singleton (avoiding write conflicts).' } },
      { text: { ar: 'في تطبيق ويب، فتح اتصال جديد بقاعدة البيانات لكل طلب وارد مكلف جداً ويستنزف الأداء. يريد الفريق مديراً مركزياً واحداً للاتصال يُنشأ فقط أول مرة يُطلب فيها (lazy) ثم يُعاد استخدامه في كل استدعاء لاحق، ويكون متاحاً من أي مكان في الكود.', en: 'In a web app, opening a new database connection for every incoming request is very expensive and drains performance. The team wants one central connection manager that is created only the first time it is requested (lazy) and then reused for every subsequent call, available from anywhere in the code.' },
        why: { ar: 'التريك: "يُنشأ أول مرة فقط ثم يُعاد استخدامه" = lazy initialization + "متاح من أي مكان" = global access → Singleton.', en: 'The trick: "created only the first time, then reused" = lazy initialization + "available from anywhere" = global access → Singleton.' } },
      { text: { ar: 'وحدة في نظام مالي يجب أن تولّد أرقام معرّفات (IDs) فريدة ومتزايدة بصرامة. لو وُجدت نسختان منفصلتان من المولّد، قد تُصدران نفس الرقم وتُفسدان السجلّات. يتطلّب النظام مولّداً واحداً لا غير ليكون المصدر الوحيد للحقيقة.', en: 'A module in a financial system must generate strictly increasing, unique IDs. If two separate generator instances existed, they could hand out the same number and corrupt records. The system requires one and only one generator instance to be the single source of truth.' },
        why: { ar: 'التريك: "مولّد واحد لا غير" + "المصدر الوحيد للحقيقة" → Singleton يمنع وجود نسختين.', en: 'The trick: "one and only one generator" + "single source of truth" → Singleton prevents two instances.' } },
      { text: { ar: 'في نظام تشغيل، يوجد منظّم طباعة (print spooler) واحد يضع كل مهام الطباعة في طابور. مهما كان عدد التطبيقات التي تطلب الطباعة، يجب أن تتحدّث جميعها مع نفس كائن المنظّم، ويجب أن يكون الوصول إليه ممكناً من أي مكان.', en: 'In an operating system, there is exactly one print spooler that queues all print jobs. No matter how many applications request printing, they must all talk to the same spooler object, and it must be reachable from anywhere.' },
        why: { ar: 'التريك: "منظّم واحد" + "نفس الكائن" + "الوصول من أي مكان" → Singleton.', en: 'The trick: "exactly one spooler" + "the same object" + "reachable from anywhere" → Singleton.' } }
    ]
  },

  {
    id: 'prototype', name: 'Prototype', nameAr: 'النموذج المبدئي', category: 'Creational',
    icon: '⎘', practical: true, practicalId: 'prototype',
    intent: {
      ar: 'يتيح نسخ الكائنات الموجودة دون جعل الكود معتمداً على كلاساتها الفعلية.',
      en: 'Lets you copy existing objects without making your code dependent on their concrete classes.'
    },
    whenToUse: {
      ar: 'عندما يكون إنشاء الكائن مكلفاً (تحميل من DB، حسابات ثقيلة) وتريد نسخة من كائن مهيّأ مسبقاً بدل بنائه من الصفر؛ أو عندما لا تعرف الكلاس الفعلي بل الواجهة فقط.',
      en: 'When creating an object is costly (DB loads, heavy computation) and you want a copy of a pre-configured object instead of building from scratch; or when you only know the interface, not the concrete class.'
    },
    principle: {
      ar: 'بديل عن الوراثة لتكوين كائنات مُعدّة مسبقاً · يقلّل الاعتماد على الكلاسات الفعلية.',
      en: 'An alternative to inheritance for pre-configured objects · reduces dependency on concrete classes.'
    },
    keyword: { ar: 'نسخ / استنساخ كائن موجود · clone · إنشاء مكلف · قوالب جاهزة', en: 'copy / clone existing object · clone · costly creation · pre-built templates' },
    howItWorks: {
      ar: 'واجهة فيها دالة clone(). كل كلاس ينفّذها عبر copy constructor ينسخ حقوله. سجلّ (Registry) اختياري يخزّن نماذج جاهزة ويُرجع نُسخاً منها.',
      en: 'An interface with a clone() method. Each class implements it via a copy constructor that copies its fields. An optional Registry stores ready prototypes and returns copies of them.'
    },
    limitations: {
      ar: 'نسخ الكائنات المعقّدة ذات المراجع الدائرية (circular references) قد يكون صعباً ومربكاً.',
      en: 'Cloning complex objects with circular references can be tricky.'
    },
    scenarios: [
      { text: { ar: 'يبني مطوّر محرّر رسوميات يحتوي على أشكال (دوائر، مستطيلات) لكل منها عشرات الخصائص (الموضع، اللون، السماكة، التدوير). عند ضغط المستخدم على "نسخ"، يجب إنتاج كائن مطابق تماماً للأصل بكل خصائصه، لكن الكود يجب ألّا يعتمد على الكلاس الفعلي للشكل لأنه قد يكون أي نوع.', en: 'A developer is building a graphics editor with shapes (circles, rectangles), each having dozens of properties (position, color, thickness, rotation). When the user clicks "duplicate," an object identical to the original with all its properties must be produced, but the code should not depend on the shape\'s concrete class since it could be any type.' },
        why: { ar: 'التريك: "إنتاج كائن مطابق دون الاعتماد على الكلاس الفعلي" → Prototype عبر clone().', en: 'The trick: "produce an identical object without depending on the concrete class" → Prototype via clone().' } },
      { text: { ar: 'محرّك ألعاب يولّد آلاف الأعداء أثناء اللعب، جميعهم مبنيّون من نفس "القالب" مع اختلافات بسيطة. بناء كل عدوّ من الصفر مكلف، فيريد المطوّر استنساخ كائن نموذجي مُعدّ مسبقاً بدل إنشائه من جديد في كل مرة.', en: 'A game engine spawns thousands of enemies during play, all built from the same "template" with minor differences. Building each enemy from scratch is costly, so the developer wants to clone a pre-configured prototype object instead of constructing a new one each time.' },
        why: { ar: 'التريك: "استنساخ كائن نموذجي مُعدّ مسبقاً" + "البناء من الصفر مكلف" → Prototype.', en: 'The trick: "clone a pre-configured prototype" + "building from scratch is costly" → Prototype.' } },
      { text: { ar: 'نظام إدارة وثائق فيه قوالب جاهزة (تقرير، فاتورة) يتطلّب إنشاء كل منها تحميل رأس وتذييل وأنماط وبيانات وصفية من قاعدة البيانات، وهي عملية بطيئة. يطلب المستخدمون نفس القالب مراراً، فبدل إعادة بنائه في كل مرة يريد النظام تخزين النماذج الجاهزة وإرجاع نسخة منها عند الطلب.', en: 'A document management system has ready templates (report, invoice), each requiring loading a header, footer, styles, and metadata from the database — a slow process. Users request the same template repeatedly, so instead of rebuilding it each time, the system wants to store the ready prototypes and return a copy on demand.' },
        why: { ar: 'التريك: "تخزين النماذج الجاهزة وإرجاع نسخة منها" → Prototype Registry (إنشاء مكلف يُستبدَل بالنسخ).', en: 'The trick: "store ready prototypes and return a copy" → Prototype Registry (costly creation replaced by cloning).' } },
      { text: { ar: 'تطبيق واجهة يحتوي على مكوّنات (أزرار، نماذج إدخال) مُعدّة بإعدادات معقّدة (ألوان، خطوط، تحقّق). يحتاج المطوّر إلى تكرار هذه المكوّنات بسرعة بنفس إعداداتها بدل إعادة ضبطها يدوياً في كل مرة.', en: 'A UI application has components (buttons, input forms) configured with complex settings (colors, fonts, validation). The developer needs to replicate these components quickly with the same configuration instead of re-configuring them manually each time.' },
        why: { ar: 'التريك: "تكرار المكوّن المُعدّ بنفس إعداداته" → Prototype (نسخ بدل إعادة الإعداد).', en: 'The trick: "replicate the configured component with the same settings" → Prototype (copy instead of reconfigure).' } },
      { text: { ar: 'يستقبل كودك كائناً من مكتبة طرف ثالث عبر واجهة (interface) دون أن تعرف كلاسه الفعلي. تحتاج إلى إنتاج نسخة مطابقة من هذا الكائن، لكن لأنك لا تعرف نوعه الحقيقي لا تستطيع استدعاء constructor محدّد.', en: 'Your code receives an object from a third-party library through an interface without knowing its concrete class. You need to produce an exact copy of this object, but since you don\'t know its real type, you cannot call a specific constructor.' },
        why: { ar: 'التريك: "لا تعرف الكلاس الفعلي لكن تريد نسخة" → clone() على الواجهة = Prototype.', en: 'The trick: "you don\'t know the concrete class but want a copy" → clone() on the interface = Prototype.' } },
      { text: { ar: 'عند تسجيل مستخدم جديد، يجب إعطاؤه مجموعة إعدادات افتراضية معقّدة (تفضيلات، أذونات، لوحة تحكّم). بدل بناء هذه الإعدادات من الصفر لكل مستخدم، يريد النظام نسخها من "ملف نموذجي" جاهز ثم تعديل ما يلزم.', en: 'When a new user registers, they must be given a complex set of default settings (preferences, permissions, dashboard). Instead of building these from scratch for each user, the system wants to copy them from a ready "template profile" and then adjust as needed.' },
        why: { ar: 'التريك: "نسخها من ملف نموذجي جاهز ثم التعديل" → Prototype.', en: 'The trick: "copy from a ready template profile then adjust" → Prototype.' } }
    ]
  },

  {
    id: 'builder', name: 'Builder', nameAr: 'البنّاء', category: 'Creational',
    icon: '🔨', practical: true, practicalId: 'builder',
    intent: {
      ar: 'يتيح بناء كائنات معقّدة خطوة بخطوة، ويسمح بإنتاج تمثيلات مختلفة بنفس كود البناء.',
      en: 'Lets you construct complex objects step by step, producing different representations using the same construction code.'
    },
    whenToUse: {
      ar: 'عندما يحتاج الكائن لتهيئة طويلة بكثير من الحقول، بعضها اختياري — لتفادي "constructor متداخل" قبيح أو انفجار الكلاسات الفرعية.',
      en: 'When an object needs lengthy initialization with many fields, some optional — to avoid an ugly telescoping constructor or subclass explosion.'
    },
    principle: {
      ar: 'يفصل كود البناء عن تمثيل الكائن · يحقّق فصل الاهتمامات.',
      en: 'Separates construction code from the object\'s representation · achieves separation of concerns.'
    },
    keyword: { ar: 'خطوة بخطوة · كثير من البارامترات الاختيارية · telescoping constructor · ‎.withX().build()', en: 'step by step · many optional parameters · telescoping constructor · .withX().build()' },
    howItWorks: {
      ar: 'كلاس Builder داخلي (static) فيه نفس الحقول، constructor يأخذ الإجباري فقط، ودوال withX() ترجع this (method chaining)، ودالة build() تُنشئ الكائن النهائي عبر constructor خاص يأخذ الـ Builder.',
      en: 'A static inner Builder class with the same fields, a constructor taking only required params, withX() methods returning this (chaining), and build() creating the final object via a private constructor that takes the Builder.'
    },
    limitations: {
      ar: 'يزيد عدد الكلاسات/الكود · مفيد فقط عندما يكون الكائن معقّداً فعلاً (مبالغة للكائنات البسيطة).',
      en: 'Increases the number of classes/code · only worthwhile when the object is genuinely complex (overkill for simple objects).'
    },
    scenarios: [
      { text: { ar: 'كلاس VirtualMachine في تطبيق إدارة سحابية له 9 خصائص إجبارية و7 اختيارية. الكود الحالي يحتوي على 8 constructors متعدّدة (telescoping)، ولإنشاء جهاز بمنافذ ووسوم فقط تضطر لتمرير null أكثر من خمس مرات. يبحث الفريق عن طريقة لبناء الكائن خطوة بخطوة مع تمرير الخصائص الاختيارية فقط عند الحاجة.', en: 'A VirtualMachine class in a cloud-management app has 9 required and 7 optional properties. The current code has 8 telescoping constructors, and to create a VM with only ports and tags you must pass null more than five times. The team is looking for a way to build the object step by step, supplying optional properties only when needed.' },
        why: { ar: 'التريك: "telescoping constructors" + "بناء خطوة بخطوة مع خصائص اختيارية" → Builder بلا شك.', en: 'The trick: "telescoping constructors" + "build step by step with optional properties" → Builder, no doubt.' } },
      { text: { ar: 'مكتبة شبكات تحتاج إنشاء كائن طلب HTTP يتكوّن من رابط (إجباري) ورؤوس (headers) وجسم (body) ومعاملات استعلام، معظمها اختياري ويتغيّر من طلب لآخر. يريد المطوّرون كتابة شيء مثل request.url(...).header(...).body(...).build().', en: 'A networking library needs to create an HTTP request object made of a URL (required), headers, a body, and query parameters, most of them optional and varying per request. The developers want to write something like request.url(...).header(...).body(...).build().' },
        why: { ar: 'التريك: سلسلة ‎.url().header().build() (method chaining بأجزاء اختيارية) → Builder.', en: 'The trick: the .url().header().build() chain (method chaining with optional parts) → Builder.' } },
      { text: { ar: 'نظام يبني استعلامات SQL ديناميكياً حسب اختيارات المستخدم: قد يضيف شروط WHERE أو ترتيب ORDER BY أو حدّ LIMIT أو لا يضيف أياً منها. يحتاج المطوّر تركيب الاستعلام تدريجياً بأجزاء اختيارية ثم إنتاج الاستعلام النهائي بخطوة build واحدة.', en: 'A system builds SQL queries dynamically based on user choices: it may add WHERE conditions, ORDER BY, a LIMIT, or none of them. The developer needs to assemble the query gradually with optional parts and then produce the final query with a single build step.' },
        why: { ar: 'التريك: "تركيب تدريجي بأجزاء اختيارية ثم build" → Builder.', en: 'The trick: "gradual assembly with optional parts then build" → Builder.' } },
      { text: { ar: 'في تطبيق مطعم، كائن "الوجبة" يتكوّن من نوع خبز (إجباري) وحجم وعدد كبير من الإضافات الاختيارية (جبن، صلصات، خضار). لا يريد الفريق إنشاء كلاس لكل تركيبة محتملة، بل بناء الوجبة خطوة بخطوة بإضافة ما يطلبه الزبون فقط.', en: 'In a restaurant app, a "meal" object consists of a bread type (required), a size, and a large number of optional add-ons (cheese, sauces, vegetables). The team does not want a class per possible combination, but to build the meal step by step, adding only what the customer requests.' },
        why: { ar: 'التريك: "كثير من الإضافات الاختيارية" + "تجنّب كلاس لكل تركيبة" → Builder.', en: 'The trick: "many optional add-ons" + "avoid a class per combination" → Builder.' } },
      { text: { ar: 'تطبيق يحتاج تكوين كائن إعدادات (Configuration) له قيم افتراضية كثيرة، لكن يجب السماح للمستخدم بتجاوز بعضها فقط دون ذكر البقية. يبحث المطوّر عن أسلوب مرن لتعيين القيم المطلوبة فقط ثم إنشاء الكائن النهائي دون constructor عملاق.', en: 'An app needs to construct a Configuration object with many default values, but must let the user override only some of them without mentioning the rest. The developer wants a flexible way to set only the desired values and then create the final object without a giant constructor.' },
        why: { ar: 'التريك: "تجاوز بعض القيم فقط دون constructor عملاق" → Builder.', en: 'The trick: "override only some values, no giant constructor" → Builder.' } },
      { text: { ar: 'أداة لإنشاء مستندات PDF/تقارير: كل مستند له عنوان (إجباري) وأقسام اختيارية ورأس وتذييل وجدول محتويات. تتغيّر الأجزاء المطلوبة من تقرير لآخر، فيحتاج المطوّر تجميع الأجزاء الاختيارية تدريجياً ثم بناء المستند النهائي.', en: 'A tool for creating PDF documents/reports: each document has a title (required) and optional sections, a header, a footer, and a table of contents. The required parts vary from one report to another, so the developer needs to assemble the optional parts gradually and then build the final document.' },
        why: { ar: 'التريك: "تجميع أجزاء اختيارية كثيرة تدريجياً ثم البناء" → Builder.', en: 'The trick: "assemble many optional parts gradually then build" → Builder.' } }
    ]
  },

  {
    id: 'factory', name: 'Factory Method', nameAr: 'دالة المصنع', category: 'Creational',
    icon: '🏭', practical: true, practicalId: 'factory',
    intent: {
      ar: 'يوفّر واجهة لإنشاء كائنات، ويترك للكلاسات الفرعية (أو الدالة) تحديد النوع الفعلي الذي يُنشأ.',
      en: 'Provides an interface for creating objects, letting subclasses (or the method) decide which concrete type to instantiate.'
    },
    whenToUse: {
      ar: 'عندما تريد إنشاء كائن بناءً على نوع/شرط (string مثلاً) دون أن يعرف العميل الكلاسات الفعلية، ومع سهولة إضافة أنواع جديدة مستقبلاً.',
      en: 'When you want to create an object based on a type/condition (e.g. a string) without the client knowing concrete classes, and easily add new types later.'
    },
    principle: {
      ar: 'البرمجة وفق المواصفات لا التطبيق · إزالة الاقتران القوي بين العميل والكلاسات الفعلية · Open/Closed.',
      en: 'Program to specifications, not implementations · removes tight coupling between client and concrete classes · Open/Closed.'
    },
    keyword: { ar: 'إنشاء غير مباشر حسب نوع/string · إخفاء تعقيد الإنشاء · دعم أنواع جديدة', en: 'indirect creation by type/string · hides creation complexity · supports new types' },
    howItWorks: {
      ar: 'واجهة منتج مشتركة + كلاسات فعلية تنفّذها + كلاس Factory فيه دالة getX(type) تقارن النوع (equalsIgnoreCase) وترجع الكائن المناسب، فيستخدمه العميل عبر الواجهة فقط.',
      en: 'A common product interface + concrete classes implementing it + a Factory class with a getX(type) method that compares the type (equalsIgnoreCase) and returns the right object, used by the client via the interface only.'
    },
    limitations: {
      ar: 'قد يزيد عدد الكلاسات · ما يزال الـ Factory نفسه يحتوي على if/switch (يُحسَّن أحياناً بسجلّ أو reflection).',
      en: 'May increase the number of classes · the Factory itself still contains an if/switch (sometimes improved with a registry or reflection).'
    },
    scenarios: [
      { text: { ar: 'تطبيق يقرأ ملفات الإعدادات بصيغ مختلفة: JSON أو XML أو CSV. كل صيغة تتطلّب طريقة تحليل (parsing) مختلفة. يستطيع المستخدم اختيار الصيغة التي يريدها، ويجب أن يدعم النظام صيغاً جديدة مثل YAML مستقبلاً بسهولة دون تعديل كود العميل.', en: 'An application reads configuration files in different formats: JSON, XML, or CSV. Each format requires a different parsing method. The user can select which format to use, and the system should easily support new formats like YAML in the future without changing client code.' },
        why: { ar: 'التريك: "إنشاء parser حسب نوع يختاره المستخدم" + "دعم أنواع جديدة بسهولة" → Factory Method.', en: 'The trick: "create a parser by a user-selected type" + "easily support new types" → Factory Method.' } },
      { text: { ar: 'نظام إشعارات يدعم ثلاثة أنواع: Email و SMS و Push. الكود الحالي مليء بجُمل if-else متفرّقة تستدعي new EmailNotification() وأمثالها في أماكن متعدّدة، مما يصعّب إضافة نوع جديد مثل Slack ويسبّب تكراراً. يريد الفريق مكاناً واحداً يُرجع نوع الإشعار المطلوب حسب نص يُمرَّر إليه.', en: 'A notification system supports three types: Email, SMS, and Push. The current code is full of scattered if-else statements calling new EmailNotification() and similar in many places, making it hard to add a new type like Slack and causing duplication. The team wants one place that returns the requested notification type based on a string passed to it.' },
        why: { ar: 'التريك: "إنشاء كائن حسب string في مكان واحد" + رائحة if-else متفرّقة → Factory Method.', en: 'The trick: "create an object by a string in one place" + the scattered if-else smell → Factory Method.' } },
      { text: { ar: 'كلاس Employees فيه دالة getEmployee(String type) تُرجع كائن موظّف مختلفاً حسب النوع الممرّر: "Accountant" تُرجع Accountant، و"SalesRep" تُرجع SalesRep، و"IT" تُرجع IT، وإلا تُرجع null. العميل يطلب الموظّف عبر النوع فقط دون معرفة كيفية إنشائه.', en: 'An Employees class has a getEmployee(String type) method that returns a different employee object based on the passed type: "Accountant" returns an Accountant, "SalesRep" returns a SalesRep, "IT" returns an IT, otherwise null. The client requests the employee by type only, without knowing how it is created.' },
        why: { ar: 'التريك الحرفي من الاختبار: دالة تُرجع كائناً حسب string وتقارن بـ equalsIgnoreCase → Factory Method.', en: 'The literal exam trick: a method returning an object by a string, compared with equalsIgnoreCase → Factory Method.' } },
      { text: { ar: 'محرّر رسوميات يُنشئ أشكالاً (دائرة، مربع، مثلث) بناءً على اختيار المستخدم من قائمة. يجب أن يطلب كود العميل الشكل عبر الواجهة المشتركة Shape فقط، بينما يقرّر مكان مركزي أي كلاس فعلي يُنشأ.', en: 'A graphics editor creates shapes (circle, square, triangle) based on the user\'s selection from a menu. The client code must request the shape only through the common Shape interface, while a central place decides which concrete class is instantiated.' },
        why: { ar: 'التريك: "العميل يطلب عبر الواجهة ومكان مركزي يقرّر الكلاس الفعلي" → Factory Method.', en: 'The trick: "the client requests via the interface, a central place decides the concrete class" → Factory Method.' } },
      { text: { ar: 'بوّابة دفع يجب أن تُنشئ معالج دفع مناسباً (CreditCard أو PayPal أو Cash) بناءً على نوع الدفع الذي يختاره الزبون عند السداد. يريد الفريق إخفاء منطق إنشاء المعالج المعقّد خلف نقطة إنشاء واحدة.', en: 'A payment gateway must create the appropriate payment processor (CreditCard, PayPal, or Cash) based on the payment type the customer chooses at checkout. The team wants to hide the complex processor-creation logic behind a single creation point.' },
        why: { ar: 'التريك: "إنشاء معالج حسب نوع مختار + إخفاء تعقيد الإنشاء" → Factory.', en: 'The trick: "create a processor by chosen type + hide creation complexity" → Factory.' } },
      { text: { ar: 'مصنع مكوّنات واجهة عبر-منصّات يجب أن يُنشئ زرّاً يناسب نظام التشغيل الحالي: زر بنمط Windows على ويندوز وزر بنمط Mac على ماك، من نفس كود العميل، مع تحديد النوع الفعلي وقت التشغيل.', en: 'A cross-platform UI component factory must create a button matching the current OS: a Windows-style button on Windows and a Mac-style button on Mac, from the same client code, with the concrete type decided at runtime.' },
        why: { ar: 'التريك: "تحديد النوع الفعلي وقت التشغيل عبر دالة مصنع" → Factory Method (لمنتج واحد، وليس عائلة).', en: 'The trick: "decide the concrete type at runtime via a factory method" → Factory Method (one product, not a family).' } }
    ]
  },

  {
    id: 'abstractfactory', name: 'Abstract Factory', nameAr: 'المصنع المجرّد', category: 'Creational',
    icon: '🏬', practical: false,
    intent: {
      ar: 'يتيح إنشاء عائلات من كائنات مترابطة معاً دون تحديد كلاساتها الفعلية.',
      en: 'Lets you produce families of related objects together without specifying their concrete classes.'
    },
    whenToUse: {
      ar: 'عندما يحتاج النظام للعمل مع عدة عائلات من المنتجات المترابطة (مثل عناصر واجهة لنظام تشغيل كامل)، ويجب أن تكون منتجات العائلة الواحدة متوافقة معاً.',
      en: 'When the system must work with several families of related products (e.g. UI elements for an entire OS theme), and products of one family must be compatible together.'
    },
    principle: {
      ar: 'البرمجة وفق المواصفات · يضمن توافق المنتجات داخل العائلة الواحدة.',
      en: 'Program to specifications · guarantees compatibility of products within one family.'
    },
    keyword: { ar: 'عائلة من كائنات مترابطة · مجموعة منتجات متوافقة · تبديل "الطقم" كاملاً', en: 'family of related objects · compatible product set · swap the whole "kit"' },
    howItWorks: {
      ar: 'واجهة Abstract Factory فيها دالة إنشاء لكل منتج في العائلة (createButton, createCheckbox)، ومصانع فعلية (WinFactory, MacFactory) تُنتج عائلة متوافقة. العميل يتعامل مع الواجهة فقط.',
      en: 'An Abstract Factory interface with a creation method per product in the family (createButton, createCheckbox), and concrete factories (WinFactory, MacFactory) producing a compatible family. The client uses only the interface.'
    },
    limitations: {
      ar: 'تعقيد أكبر وكلاسات كثيرة · إضافة منتج جديد للعائلة تتطلّب تعديل كل المصانع.',
      en: 'More complexity and many classes · adding a new product to the family requires changing every factory.'
    },
    scenarios: [
      { text: { ar: 'تطبيق يدعم سمتين كاملتين (Light و Dark). كل سمة لها مجموعة عناصر واجهة متناسقة: أزرار ونوافذ وقوائم وحقول إدخال بنفس المظهر. عند تبديل السمة يجب أن تتغيّر كل العناصر معاً لتبقى متوافقة، ولا يصح خلط زر من السمة الفاتحة مع نافذة من الداكنة.', en: 'An app supports two complete themes (Light and Dark). Each theme has a consistent set of UI elements: buttons, windows, menus, and input fields of the same look. When the theme switches, all elements must change together to stay compatible, and a Light-theme button must not be mixed with a Dark-theme window.' },
        why: { ar: 'التريك: "عائلة عناصر متناسقة تُنتج معاً لكل سمة + منع الخلط بين العائلات" → Abstract Factory.', en: 'The trick: "a coherent family of elements produced together per theme + no mixing across families" → Abstract Factory.' } },
      { text: { ar: 'واجهة برنامج عبر-منصّات يجب أن تُنتج طقماً كاملاً من المكوّنات لكل نظام تشغيل: على ويندوز تُنتج زر ويندوز وصندوق اختيار ويندوز وقائمة ويندوز، وعلى ماك تُنتج المكوّنات بنمط ماك، بحيث تتناسق مكوّنات النظام الواحد دائماً.', en: 'A cross-platform program UI must produce a complete kit of components per operating system: on Windows it produces a Windows button, a Windows checkbox, and a Windows menu; on Mac it produces Mac-style components — so that components of one OS always stay consistent.' },
        why: { ar: 'التريك: "كل مصنع يُنتج طقم مكوّنات متوافق لمنصّته" → Abstract Factory (عائلة، وليس منتجاً واحداً).', en: 'The trick: "each factory produces a compatible component kit for its platform" → Abstract Factory (a family, not one product).' } },
      { text: { ar: 'محرّك ألعاب يُنشئ أصول بيئة كاملة بناءً على "العالم" المختار: عالم صحراوي يُنتج تضاريس رملية وأعداء عقارب وموسيقى صحراوية، وعالم ثلجي يُنتج تضاريس جليدية وأعداء دببة وموسيقى شتوية. يجب أن تكون أصول العالم الواحد متناسقة معاً.', en: 'A game engine creates a full environment asset set based on the chosen "world": a desert world produces sandy terrain, scorpion enemies, and desert music; a snow world produces icy terrain, bear enemies, and winter music. The assets of one world must be coherent together.' },
        why: { ar: 'التريك: "عائلة أصول متناسقة لكل عالم تُنتج معاً" → Abstract Factory.', en: 'The trick: "a coherent asset family per world produced together" → Abstract Factory.' } },
      { text: { ar: 'نظام يتكامل مع عدة موردي دفع، وكل مورد يقدّم مجموعة خدمات متكاملة يجب استخدامها معاً: معالج دفع ومعالج استرجاع ومولّد فواتير، كلها من نفس المورد. لا يصح استخدام معالج دفع من مورد مع مولّد فواتير من مورد آخر.', en: 'A system integrates with several payment providers, and each provider offers an integrated set of services that must be used together: a payment processor, a refund processor, and an invoice generator — all from the same provider. A payment processor from one provider must not be used with an invoice generator from another.' },
        why: { ar: 'التريك: "طقم خدمات متوافق لكل مورد يُستخدم معاً" → Abstract Factory.', en: 'The trick: "a compatible service kit per provider used together" → Abstract Factory.' } },
      { text: { ar: 'مولّد تقارير يُنتج عائلة مخرجات متوافقة (رأس + جدول + رسم بياني) بصيغة واحدة مختارة: إما كلها بصيغة PDF أو كلها بصيغة HTML. يجب أن تكون كل عناصر التقرير من نفس الصيغة لتُعرض بشكل صحيح.', en: 'A report generator produces a compatible output family (header + table + chart) in one chosen format: either all in PDF or all in HTML. All report elements must be of the same format to render correctly.' },
        why: { ar: 'التريك: "عناصر التقرير يجب أن تكون من نفس الصيغة" → Abstract Factory.', en: 'The trick: "report elements must all be of the same format" → Abstract Factory.' } },
      { text: { ar: 'تطبيق أثاث افتراضي يتيح اختيار طراز التصميم (حديث أو كلاسيكي)، وعند الاختيار يُنتج كرسياً وطاولة وأريكة كلها بنفس الطراز لتتناسق في الغرفة. لا يصح إنتاج كرسي حديث مع طاولة كلاسيكية.', en: 'A virtual furniture app lets the user choose a design style (modern or classic); upon selection it produces a chair, a table, and a sofa all of the same style to match in the room. A modern chair must not be produced with a classic table.' },
        why: { ar: 'التريك: "منتجات العائلة الواحدة يجب أن تتناسق ولا تُخلط" → Abstract Factory.', en: 'The trick: "products of one family must match and not be mixed" → Abstract Factory.' } }
    ]
  }

]);

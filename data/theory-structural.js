// ============================================================
// THEORY — Structural patterns (7)
// Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
// ============================================================

window.THEORY_PATTERNS = (window.THEORY_PATTERNS || []).concat([

  {
    id: 'adapter', name: 'Adapter', nameAr: 'المُحوّل', category: 'Structural',
    icon: '🔌', practical: true, practicalId: 'adapter',
    intent: {
      ar: 'يتيح لكائنات ذات واجهات غير متوافقة أن تعمل معاً، عبر غلاف يحوّل واجهة إلى أخرى.',
      en: 'Allows objects with incompatible interfaces to work together, via a wrapper that converts one interface to another.'
    },
    whenToUse: {
      ar: 'عندما تريد استخدام كلاس موجود (أو مكتبة طرف ثالث) لكن واجهته لا تطابق ما يتوقّعه كودك — فتبني محوّلاً بينهما.',
      en: 'When you want to use an existing class (or third-party library) but its interface doesn\'t match what your code expects — so you build an adapter between them.'
    },
    principle: {
      ar: 'البرمجة وفق المواصفات (polymorphism) · يحقّق اقتراناً مرناً (loose coupling) · مبدأ المسؤولية الواحدة (يفصل التحويل عن منطق العمل).',
      en: 'Program to specifications (polymorphism) · achieves loose coupling · SRP (separates conversion from business logic).'
    },
    keyword: { ar: 'واجهة غير متوافقة · مكتبة طرف ثالث تتوقّع مدخلاً مختلفاً · توفيق واجهتين', en: 'incompatible interface · third-party library expects a different input · reconcile two interfaces' },
    howItWorks: {
      ar: 'Target (الواجهة المتوقّعة) + Adaptee (الكلاس الموجود بواجهة مختلفة) + Adapter ينفّذ Target ويحتفظ بمرجع للـ Adaptee، ويحوّل الاستدعاء داخل الدالة.',
      en: 'Target (expected interface) + Adaptee (existing class with a different interface) + Adapter implements Target, holds a reference to the Adaptee, and translates the call inside the method.'
    },
    limitations: {
      ar: 'يزيد التعقيد الكلي بطبقة إضافية · أحياناً تغيير الكود ليتوافق مباشرة أبسط من بناء محوّل.',
      en: 'Adds overall complexity with an extra layer · sometimes changing the code to be compatible directly is simpler than an adapter.'
    },
    scenarios: [
      { text: { ar: 'يبني مطوّر تطبيقاً يعرض أوقات شروق وغروب الشمس لموقع معيّن باستخدام إحداثيات GPS (خط الطول وخط العرض). وجد مكتبة طرف ثالث مفيدة تعطي الأوقات بدقّة، لكن واجهة المكتبة تتوقّع اسم المدينة كمدخل لتُرجع الأوقات. يحتاج المطوّر إلى استخدام هذه المكتبة بإحداثيات GPS بدل اسم المدينة.', en: 'A developer is building an app that shows sunrise and sunset times for a location using GPS coordinates (latitude and longitude). He found a useful third-party library that returns accurate times, but the library\'s interface expects the city name as input to return the times. The developer needs to use this library with GPS coordinates instead of the city name.' },
        why: { ar: 'التريك الحرفي من الاختبار: "المكتبة تتوقّع مدخلاً مختلفاً عمّا لديك" → Adapter يحوّل الإحداثيات إلى الواجهة المتوقّعة.', en: 'The literal exam trick: "the library expects a different input than you have" → Adapter converts the coordinates to the expected interface.' } },
      { text: { ar: 'محاكاة لتوصيل أجهزة كهربائية: لدينا واجهة EuropeanSocket للأجهزة الأوروبية (220V)، لكن جهازاً أمريكياً قديماً من نوع USDevice يعمل بـ 110V بطريقة مختلفة وواجهته غير متوافقة. نحتاج إلى جعل الجهاز الأمريكي يعمل مع المقبس الأوروبي دون تعديل أيٍّ منهما.', en: 'A simulation of connecting electrical devices: we have a EuropeanSocket interface for European devices (220V), but an old US device (USDevice) runs at 110V differently and its interface is incompatible. We need to make the US device work with the European socket without modifying either one.' },
        why: { ar: 'التريك: "جعل كائن قديم بواجهة مختلفة يعمل في نظام جديد دون تعديلهما" → Adapter.', en: 'The trick: "make an old object with a different interface work in a new system without modifying either" → Adapter.' } },
      { text: { ar: 'يدمج فريق مكتبة دفع قديمة في تطبيق جديد. واجهة المكتبة القديمة (دوالها وأسماء معاملاتها) لا تطابق واجهة الدفع الموحّدة الجديدة في التطبيق. لا يستطيعون تعديل كود المكتبة (طرف ثالث)، ويحتاجون غلافاً يوفّق بين الواجهتين.', en: 'A team integrates an old payment library into a new app. The old library\'s interface (its methods and parameter names) does not match the new unified payment interface in the app. They cannot modify the library code (third-party), and need a wrapper to reconcile both interfaces.' },
        why: { ar: 'التريك: "لا يمكن تعديل المكتبة + يحتاج توفيق واجهتين" → Adapter.', en: 'The trick: "cannot modify the library + needs to reconcile two interfaces" → Adapter.' } },
      { text: { ar: 'كود تطبيقك مصمّم للتعامل مع بيانات بصيغة XML عبر واجهة محدّدة، لكن خدمة خارجية جديدة تُرجع البيانات بصيغة JSON فقط. تحتاج إلى جعل مخرجات JSON تعمل مع الكود الذي يتوقّع XML دون إعادة كتابة الكود.', en: 'Your application code is designed to handle XML data through a specific interface, but a new external service returns data only in JSON. You need to make the JSON output work with the code that expects XML without rewriting the code.' },
        why: { ar: 'التريك: "تحويل مخرجات صيغة إلى الواجهة التي يتوقّعها الكود" → Adapter.', en: 'The trick: "convert one format\'s output to the interface the code expects" → Adapter.' } },
      { text: { ar: 'يستخدم تطبيق كامل مكتبة خرائط قديمة عبر دوال معيّنة في كل مكان. قرّر الفريق الانتقال إلى مكتبة خرائط جديدة أفضل، لكن دوالها مختلفة تماماً عن القديمة. يريدون تجنّب تعديل كل الاستدعاءات في التطبيق عبر غلاف يقدّم واجهة المكتبة القديمة فوق الجديدة.', en: 'An entire application uses an old maps library through certain methods everywhere. The team decided to move to a better new maps library, but its methods are completely different from the old one. They want to avoid changing all the calls in the app by using a wrapper that exposes the old library\'s interface over the new one.' },
        why: { ar: 'التريك: "غلاف يقدّم الواجهة القديمة المتوقّعة فوق المكتبة الجديدة" → Adapter.', en: 'The trick: "a wrapper exposing the old expected interface over the new library" → Adapter.' } },
      { text: { ar: 'نظام تسجيل (logging) خارجي قويّ يستقبل الرسائل بصيغة وبنية مختلفة عن الصيغة الداخلية التي ينتجها تطبيقك. تريد إرسال سجلّاتك إلى هذا النظام دون تغيير طريقة إنتاج تطبيقك للرسائل.', en: 'A powerful external logging system receives messages in a format and structure different from the internal format your app produces. You want to send your logs to this system without changing how your app produces messages.' },
        why: { ar: 'التريك: "ترجمة صيغة رسائلك إلى الصيغة التي يتوقّعها النظام الخارجي" → Adapter.', en: 'The trick: "translate your message format to the format the external system expects" → Adapter.' } }
    ]
  },

  {
    id: 'bridge', name: 'Bridge', nameAr: 'الجسر', category: 'Structural',
    icon: '🌉', practical: false,
    intent: {
      ar: 'يفصل التجريد (Abstraction) عن تطبيقه (Implementation) ليتطوّرا بشكل مستقل.',
      en: 'Decouples an abstraction from its implementation so the two can vary independently.'
    },
    whenToUse: {
      ar: 'عندما يكون لديك بُعدان مستقلان يتزايدان (مثل: أشكال × طرق رسم، أو أجهزة × أنظمة تحكّم) ولا تريد انفجار كلاسات من ضربهما ببعض عبر الوراثة.',
      en: 'When you have two independent dimensions that both grow (e.g. shapes × rendering APIs, or devices × remotes) and you don\'t want a subclass explosion from multiplying them via inheritance.'
    },
    principle: {
      ar: 'فضّل التركيب على الوراثة · البرمجة وفق المواصفات · يمنع انفجار الكلاسات الفرعية.',
      en: 'Favor composition over inheritance · program to specifications · prevents subclass explosion.'
    },
    keyword: { ar: 'بُعدان مستقلان · فصل التجريد عن التطبيق · تجنّب ضرب الكلاسات', en: 'two independent dimensions · separate abstraction from implementation · avoid class multiplication' },
    howItWorks: {
      ar: 'Abstraction تحتفظ بمرجع لكائن Implementation (تركيب لا وراثة) وتفوّض إليه. يمكن توسعة كل جانب على حدة: شكل جديد دون لمس طرق الرسم، وطريقة رسم جديدة دون لمس الأشكال.',
      en: 'The Abstraction holds a reference to an Implementation object (composition, not inheritance) and delegates to it. Each side extends independently: a new shape without touching renderers, a new renderer without touching shapes.'
    },
    limitations: {
      ar: 'يزيد التعقيد الأولي · مبالغة إن كان لديك بُعد واحد فقط.',
      en: 'Adds upfront complexity · overkill if you only have one dimension.'
    },
    scenarios: [
      { text: { ar: 'تطبيق رسوميات لديه أشكال هندسية (دائرة، مربع، مثلث) يجب رسم كل منها بمحرّكين مختلفين (OpenGL و DirectX). لو استخدمنا الوراثة لكل تركيبة (دائرة-OpenGL، دائرة-DirectX، مربع-OpenGL...) لانفجر عدد الكلاسات. نريد إضافة شكل جديد أو محرّك رسم جديد بشكل مستقل عن الآخر.', en: 'A graphics app has geometric shapes (circle, square, triangle), each of which must be drawn by two engines (OpenGL and DirectX). If we used inheritance for every combination (circle-OpenGL, circle-DirectX, square-OpenGL...), the class count would explode. We want to add a new shape or a new rendering engine independently of the other.' },
        why: { ar: 'التريك: "بُعدان (شكل × محرّك رسم) يتطوّران مستقلين + تجنّب انفجار الكلاسات" → Bridge.', en: 'The trick: "two dimensions (shape × renderer) evolving independently + avoiding class explosion" → Bridge.' } },
      { text: { ar: 'نظام تحكّم منزلي: لدينا أنواع أجهزة تحكّم عن بُعد (بسيط، متقدّم) ويجب أن تعمل مع أجهزة مختلفة (تلفاز، راديو، مكيّف). نوع جهاز التحكّم منفصل تماماً عن نوع الجهاز المتحكَّم به، ونريد توسعة أي جانب دون لمس الآخر.', en: 'A home-control system: we have remote-control types (basic, advanced) that must work with different devices (TV, radio, AC). The remote type is entirely separate from the controlled device type, and we want to extend either side without touching the other.' },
        why: { ar: 'التريك: "جهاز التحكّم بُعد مستقل عن الجهاز" → Bridge بدل ضربهما بالوراثة.', en: 'The trick: "the remote is a dimension independent of the device" → Bridge instead of inheritance multiplication.' } },
      { text: { ar: 'نظام إشعارات له نوعان من حيث الأولوية (عاجل، عادي)، ويجب إرسال كل منهما عبر قنوات متعدّدة (SMS، Email، Push). نوع الإشعار منفصل عن قناة الإرسال، ونريد إضافة قناة جديدة أو نوع إشعار جديد دون مضاعفة الكلاسات.', en: 'A notification system has two priority types (urgent, normal), and each must be sent over multiple channels (SMS, Email, Push). The notification type is separate from the delivery channel, and we want to add a new channel or a new notification type without multiplying classes.' },
        why: { ar: 'التريك: "نوع الإشعار وقناة الإرسال بُعدان مستقلان" → Bridge.', en: 'The trick: "notification type and delivery channel are independent dimensions" → Bridge.' } },
      { text: { ar: 'تطبيق رسائل يجب أن يعمل على منصّات مختلفة (سطح مكتب، جوال) ويدعم بروتوكولات إرسال مختلفة (WebSocket، HTTP). المنصّة وبروتوكول الإرسال يتطوّران كلٌّ على حدة، ولا نريد كلاساً لكل تركيبة منصّة-بروتوكول.', en: 'A messaging app must run on different platforms (desktop, mobile) and support different send protocols (WebSocket, HTTP). The platform and the send protocol each evolve separately, and we don\'t want a class for every platform-protocol combination.' },
        why: { ar: 'التريك: "المنصّة والبروتوكول بُعدان مستقلان" → Bridge.', en: 'The trick: "platform and protocol are independent dimensions" → Bridge.' } },
      { text: { ar: 'محرّك تقارير لديه أنواع تقارير (مبيعات، مخزون، موظّفين) يجب إخراج كل منها بصيغ مختلفة (PDF، Excel). يريد الفريق إضافة نوع تقرير جديد دون لمس صيغ الإخراج، وإضافة صيغة إخراج جديدة دون لمس أنواع التقارير.', en: 'A report engine has report types (sales, inventory, employees), each of which must be output in different formats (PDF, Excel). The team wants to add a new report type without touching the output formats, and add a new output format without touching the report types.' },
        why: { ar: 'التريك: "نوع التقرير وصيغة الإخراج يتطوّران مستقلين" → Bridge.', en: 'The trick: "report type and output format evolve independently" → Bridge.' } },
      { text: { ar: 'مشغّل وسائط يدعم أنواع وسائط (فيديو، صوت) ويجب أن يعمل على أنظمة تشغيل مختلفة بمكتبات تشغيل مختلفة لكل نظام. نوع الوسائط منفصل عن مكتبة التشغيل الخاصة بالنظام، ونريد توسعة أي جانب باستقلالية.', en: 'A media player supports media types (video, audio) and must run on different operating systems with a different playback library per OS. The media type is separate from the OS playback library, and we want to extend either side independently.' },
        why: { ar: 'التريك: "نوع الوسائط منفصل عن مكتبة التشغيل" → Bridge.', en: 'The trick: "media type separate from playback library" → Bridge.' } }
    ]
  },

  {
    id: 'composite', name: 'Composite', nameAr: 'المركّب', category: 'Structural',
    icon: '🌲', practical: false,
    intent: {
      ar: 'يتيح تركيب الكائنات في بُنى شجرية ثم التعامل مع الكائن المفرد والمجموعة بنفس الطريقة.',
      en: 'Lets you compose objects into tree structures and then treat individual objects and groups uniformly.'
    },
    whenToUse: {
      ar: 'عندما تكون البيانات هرمية (part-whole) وتريد أن يعامل العميل الورقة (عنصر مفرد) والفرع (مجموعة) عبر نفس الواجهة.',
      en: 'When data is hierarchical (part-whole) and you want the client to treat a leaf (single item) and a branch (group) through the same interface.'
    },
    principle: {
      ar: 'البرمجة وفق المواصفات · يبسّط كود العميل (لا يميّز بين المفرد والمجموعة).',
      en: 'Program to specifications · simplifies client code (no distinction between single and group).'
    },
    keyword: { ar: 'بنية شجرية · part-whole · معاملة المفرد والمجموعة بنفس الطريقة', en: 'tree structure · part-whole · treat individual and group uniformly' },
    howItWorks: {
      ar: 'واجهة Component مشتركة + Leaf (عنصر مفرد) + Composite يحتوي قائمة من Components ويفوّض العملية لكل أبنائه بشكل متكرّر. الكل ينفّذ نفس الواجهة.',
      en: 'A common Component interface + Leaf (single item) + Composite holding a list of Components and recursively delegating the operation to its children. All implement the same interface.'
    },
    limitations: {
      ar: 'قد يجعل التصميم عاماً أكثر من اللازم · يصعب تقييد أنواع الأبناء المسموحة.',
      en: 'Can make the design overly general · hard to restrict which child types are allowed.'
    },
    scenarios: [
      { text: { ar: 'نظام ملفات فيه مجلّدات وملفات: المجلّد قد يحتوي ملفات ومجلّدات أخرى متداخلة لأي عمق. عند حساب الحجم الإجمالي لمجلّد، يجب أن يشمل الحساب كل ما بداخله من ملفات ومجلّدات فرعية. يريد المطوّر التعامل مع الملف المفرد والمجلّد (المجموعة) بنفس الطريقة دون تمييز.', en: 'A file system with folders and files: a folder may contain files and other nested folders to any depth. When computing a folder\'s total size, the calculation must include everything inside it — files and subfolders. The developer wants to treat a single file and a folder (a group) the same way without distinction.' },
        why: { ar: 'التريك: "بنية شجرية + معاملة الملف والمجلّد بنفس الواجهة (part-whole)" → Composite.', en: 'The trick: "tree structure + treating file and folder via the same interface (part-whole)" → Composite.' } },
      { text: { ar: 'واجهة تطبيق فيها قوائم متداخلة: القائمة تحتوي عناصر بسيطة وقوائم فرعية، والقائمة الفرعية بدورها قد تحتوي عناصر وقوائم. عند رسم القائمة بالكامل يجب أن يتم ذلك بشكل موحّد سواء كان العنصر مفرداً أو قائمة فرعية.', en: 'An app UI has nested menus: a menu contains simple items and submenus, and a submenu in turn may contain items and menus. When rendering the whole menu, it must be done uniformly whether the element is a single item or a submenu.' },
        why: { ar: 'التريك: "العنصر والقائمة الفرعية ينفّذان نفس واجهة الرسم في شجرة" → Composite.', en: 'The trick: "item and submenu implement the same render interface in a tree" → Composite.' } },
      { text: { ar: 'مخطّط هيكلي لمؤسّسة: المدير يدير موظّفين عاديين ومدراء آخرين، وكل مدير آخر يدير فريقه. عند حساب إجمالي رواتب فرع معيّن، يجب جمع رواتب الجميع تحته بشكل متكرّر، ومعاملة الموظّف المفرد والمدير (الذي يقود مجموعة) بنفس الطريقة.', en: 'An organizational chart: a manager manages regular employees and other managers, and each other manager leads their own team. When computing the total salaries of a branch, all salaries beneath it must be summed recursively, treating a single employee and a manager (who leads a group) the same way.' },
        why: { ar: 'التريك: "الموظّف والمدير في شجرة موحّدة + حساب متكرّر" → Composite.', en: 'The trick: "employee and manager in a uniform tree + recursive computation" → Composite.' } },
      { text: { ar: 'محرّر رسوميات يتيح تجميع عدّة أشكال في "مجموعة" (group)، ثم تحريك المجموعة كلها أو تحجيمها أو تدويرها وكأنها شكل واحد. يجب أن تنفّذ المجموعة والشكل المفرد نفس العمليات (تحريك، تحجيم) عبر نفس الواجهة.', en: 'A graphics editor lets you group several shapes into a "group," then move, resize, or rotate the whole group as if it were a single shape. The group and a single shape must implement the same operations (move, resize) through the same interface.' },
        why: { ar: 'التريك: "المجموعة والشكل المفرد ينفّذان نفس العمليات" → Composite.', en: 'The trick: "group and single shape implement the same operations" → Composite.' } },
      { text: { ar: 'متجر إلكتروني يصنّف منتجاته في فئات هرمية: الفئة قد تحتوي منتجات وفئات فرعية، والفئة الفرعية تحتوي منتجات وفئات أعمق. عند عرض شجرة الفئات أو حساب عدد المنتجات الكلّي، يجب التعامل مع الفئة والمنتج بشكل موحّد.', en: 'An e-commerce store organizes products into hierarchical categories: a category may contain products and subcategories, and a subcategory contains products and deeper categories. When displaying the category tree or counting total products, a category and a product must be handled uniformly.' },
        why: { ar: 'التريك: "الفئة والمنتج في بنية شجرية موحّدة" → Composite.', en: 'The trick: "category and product in a uniform tree structure" → Composite.' } },
      { text: { ar: 'مستند يتكوّن من عناصر متداخلة: فقرات وصور وجداول، والقسم قد يحتوي عناصر أخرى وأقسام فرعية. عند طباعة المستند بالكامل، يجب أن ينفّذ كل عنصر — سواء كان مفرداً (فقرة) أو حاوية (قسم) — نفس عملية الطباعة.', en: 'A document is made of nested elements: paragraphs, images, and tables, and a section may contain other elements and subsections. When printing the whole document, every element — whether a leaf (paragraph) or a container (section) — must implement the same print operation.' },
        why: { ar: 'التريك: "كل عنصر (مفرد أو حاوية) ينفّذ نفس واجهة الطباعة" → Composite.', en: 'The trick: "every element (leaf or container) implements the same print interface" → Composite.' } }
    ]
  },

  {
    id: 'decorator', name: 'Decorator', nameAr: 'المُزخرف', category: 'Structural',
    icon: '🎀', practical: true, practicalId: 'decorator',
    intent: {
      ar: 'يتيح إضافة سلوكيات/مسؤوليات جديدة لكائن ديناميكياً عبر لفّه بكائنات مُزخرِفة، دون تعديل كلاسه.',
      en: 'Lets you attach new behaviors/responsibilities to an object dynamically by wrapping it in decorator objects, without modifying its class.'
    },
    whenToUse: {
      ar: 'عندما تريد إضافة مزايا تتراكم بمرونة وقت التشغيل (مثل إضافات على مشروب، أو طبقات على تيار بيانات) دون انفجار الكلاسات الفرعية لكل تركيبة.',
      en: 'When you want to add features that stack flexibly at runtime (e.g. condiments on a drink, layers on a data stream) without a subclass explosion for every combination.'
    },
    principle: {
      ar: 'فضّل التركيب على الوراثة · Open/Closed (إضافة سلوك دون تعديل) · المسؤولية الواحدة.',
      en: 'Favor composition over inheritance · Open/Closed (add behavior without modifying) · SRP.'
    },
    keyword: { ar: 'إضافة سلوك دون subclassing · ديناميكياً · يتراكم/طبقات · لفّ الكائن', en: 'add behavior without subclassing · dynamically · stacks/layers · wrap the object' },
    howItWorks: {
      ar: 'واجهة/كلاس مجرّد للمكوّن + مكوّن فعلي أساسي + Decorator مجرّد يرث المكوّن ويحتفظ بمرجع له + مُزخرِفات فعلية تضيف سلوكها ثم تفوّض للمكوّن الملفوف (مثل cost = سعرها + beverage.cost()).',
      en: 'A component interface/abstract class + a base concrete component + an abstract Decorator that extends the component and holds a reference to it + concrete decorators that add their behavior then delegate to the wrapped component (e.g. cost = their price + beverage.cost()).'
    },
    limitations: {
      ar: 'كثرة الكائنات الصغيرة المتداخلة تصعّب التتبّع · ترتيب اللفّ قد يؤثّر على النتيجة · صعوبة إزالة مُزخرِف بعينه من المنتصف.',
      en: 'Many small nested objects are hard to trace · wrapping order can affect the result · hard to remove a specific decorator from the middle.'
    },
    scenarios: [
      { text: { ar: 'مقهى يحتاج نظاماً لحساب أسعار المشروبات. عنده مشروبات أساسية (Espresso، HouseBlend) وإضافات (حليب، موكا، كريمة)، وكل إضافة لها سعر. المشكلة أن الإضافات تتراكم فوق بعضها بأي ترتيب وعدد، ولا يريد الفريق إنشاء كلاس لكل تركيبة ممكنة. يجب أن تضيف كل إضافة سعرها فوق سعر المشروب الذي تحته.', en: 'A coffee shop needs a system to compute drink prices. It has base drinks (Espresso, HouseBlend) and add-ons (milk, mocha, whip), each with a price. The problem: add-ons stack on top of each other in any order and number, and the team does not want a class for every possible combination. Each add-on must add its price on top of the drink beneath it.' },
        why: { ar: 'التريك: "إضافات تتراكم بأي ترتيب + تجنّب كلاس لكل تركيبة + كل إضافة تزيد على ما تحتها" → Decorator.', en: 'The trick: "add-ons stack in any order + avoid a class per combination + each adds onto the one beneath" → Decorator.' } },
      { text: { ar: 'تطبيق يستخدم مكتبة طرف ثالث جاهزة للتعامل مع تسجيل الدخول والتسجيل. المكتبة لا تتضمّن كتابة رسائل سجلّ (logging) لمحاولات الدخول. يحتاج المطوّر إضافة هذه الميزة (سلوك إضافي للتسجيل) عند استخدام المكتبة دون أن يرث منها أو يعدّل كودها.', en: 'An app uses a ready third-party library for login and signup. The library does not include writing log messages for login attempts. The developer needs to add this feature (extra logging behavior) when using the library without subclassing it or modifying its code.' },
        why: { ar: 'التريك الحرفي من الاختبار: "إضافة سلوك إضافي دون subclassing ودون تعديل المكتبة" → Decorator (لفّ الكائن).', en: 'The literal exam trick: "add extra behavior without subclassing and without modifying the library" → Decorator (wrap the object).' } },
      { text: { ar: 'تيار بيانات (data stream) أساسي تريد إضافة طبقات معالجة فوقه بشكل قابل للتركيب: أولاً ضغط البيانات، ثم تشفيرها فوق الضغط. يجب أن تلفّ كل طبقة التيار الذي تحتها وتفوّض إليه بعد إضافة معالجتها، كما في تيارات Java I/O.', en: 'A base data stream to which you want to add processing layers in a composable way: first compress the data, then encrypt it over the compression. Each layer must wrap the stream beneath it and delegate to it after adding its processing, as in Java I/O streams.' },
        why: { ar: 'التريك: "طبقات تُلفّ فوق بعضها وتفوّض للتيار الأساسي" → Decorator (مثل Java I/O).', en: 'The trick: "layers wrapped over each other delegating to the base stream" → Decorator (like Java I/O).' } },
      { text: { ar: 'مكوّن واجهة نصّي بسيط تريد إضافة مزايا بصرية عليه بشكل اختياري وقت التشغيل: حدود، ثم شريط تمرير، ثم ظل. قد يحتاج المستخدم واحدة أو أكثر بأي ترتيب، ولا تريد كلاساً لكل مزيج من المزايا.', en: 'A simple text UI component to which you want to add visual features optionally at runtime: a border, then a scrollbar, then a shadow. The user may need one or more in any order, and you don\'t want a class for every mix of features.' },
        why: { ar: 'التريك: "إضافات مرئية اختيارية تتراكم وقت التشغيل" → Decorator.', en: 'The trick: "optional visual features stacking at runtime" → Decorator.' } },
      { text: { ar: 'عميل HTTP أساسي تريد إضافة سلوكيات فوقه حسب الحاجة: إعادة المحاولة عند الفشل، ثم ضغط الطلب، ثم إضافة رأس توثيق. تريد تركيب هذه السلوكيات بمرونة على العميل الأساسي دون تعديل كلاسه الأصلي.', en: 'A base HTTP client to which you want to add behaviors as needed: retry on failure, then request compression, then an auth header. You want to compose these behaviors flexibly over the base client without modifying its original class.' },
        why: { ar: 'التريك: "تغليف العميل بطبقات سلوك اختيارية دون تعديل الأصل" → Decorator.', en: 'The trick: "wrap the client in optional behavior layers without modifying the original" → Decorator.' } },
      { text: { ar: 'نظام إشعارات أساسي يرسل رسالة واحدة، وتريد إضافة قنوات إرسال إضافية فوقه (Slack، SMS) بحيث تُرسَل عبر القناة الأساسية ثم القنوات المُضافة، دون تعديل كلاس الإشعار الأصلي.', en: 'A base notifier that sends one message, and you want to add extra delivery channels on top of it (Slack, SMS) so the message goes out via the base channel and then the added ones, without modifying the original notifier class.' },
        why: { ar: 'التريك: "كل قناة مُزخرِف يلفّ ويضيف سلوك الإرسال" → Decorator.', en: 'The trick: "each channel is a decorator wrapping and adding send behavior" → Decorator.' } }
    ]
  },

  {
    id: 'facade', name: 'Facade', nameAr: 'الواجهة', category: 'Structural',
    icon: '🏛️', practical: false,
    intent: {
      ar: 'يوفّر واجهة واحدة مبسّطة لنظام فرعي معقّد من الكلاسات.',
      en: 'Provides a single simplified interface to a complex subsystem of classes.'
    },
    whenToUse: {
      ar: 'عندما يكون التعامل مع نظام فرعي معقّد (عدة كلاسات وخطوات) مرهقاً للعميل، فتقدّم واجهة واحدة بسيطة تُخفي التعقيد خلفها.',
      en: 'When dealing with a complex subsystem (many classes and steps) is overwhelming for the client, so you offer one simple entry point that hides the complexity behind it.'
    },
    principle: {
      ar: 'يقلّل الاقتران بين العميل والنظام الفرعي · يبسّط الاستخدام (لكنه لا يمنع الوصول المباشر عند الحاجة).',
      en: 'Reduces coupling between client and subsystem · simplifies usage (but doesn\'t prevent direct access when needed).'
    },
    keyword: { ar: 'تبسيط نظام فرعي معقّد · واجهة واحدة بسيطة · إخفاء التعقيد', en: 'simplify a complex subsystem · one simple interface · hide complexity' },
    howItWorks: {
      ar: 'كلاس Facade يحتفظ بمراجع لكلاسات النظام الفرعي، ويقدّم دوال عالية المستوى تنسّق الاستدعاءات الداخلية المعقّدة بدلاً من العميل.',
      en: 'A Facade class holds references to the subsystem classes and exposes high-level methods that orchestrate the complex internal calls on the client\'s behalf.'
    },
    limitations: {
      ar: 'قد يتحوّل الـ Facade إلى "كائن إله" (God object) مقترن بكل شيء إن أُسيء استخدامه.',
      en: 'The Facade can become a "God object" coupled to everything if misused.'
    },
    scenarios: [
      { text: { ar: 'تطبيق ويب لمشاركة الفيديو يتواصل مع أنظمة معقّدة متعدّدة عند رفع فيديو: ترميز الفيديو وضغطه، إضافة الترجمة المغلقة (closed captioning)، فحص حقوق النشر، وغيرها. يفكّر المطوّر في كلاس يبسّط التواصل مع عملية الرفع المعقّدة هذه فيقدّم دالة واحدة بسيطة مثل upload().', en: 'A video-sharing web app communicates with multiple complex systems when uploading a video: encoding and compressing the video, adding closed captioning, copyright checking, and more. The developer is considering a class that simplifies communication with this complex upload process, exposing one simple method like upload().' },
        why: { ar: 'التريك الحرفي من الاختبار: "كلاس يبسّط التواصل مع عملية معقّدة متعدّدة الأنظمة" → Facade.', en: 'The literal exam trick: "a class that simplifies communication with a complex multi-system process" → Facade.' } },
      { text: { ar: 'بدء تشغيل السيارة يتطلّب خطوات داخلية كثيرة ومعقّدة: ضخّ الوقود، شحن البطارية، تشغيل نظام الإشعال، تدوير المحرّك. يريد المصمّمون إخفاء كل هذه الخطوات خلف زر/دالة واحدة start() ينسّق النظام الفرعي بأكمله نيابةً عن السائق.', en: 'Starting a car requires many complex internal steps: pumping fuel, charging the battery, engaging the ignition system, cranking the engine. The designers want to hide all these steps behind one start() button/method that orchestrates the entire subsystem on the driver\'s behalf.' },
        why: { ar: 'التريك: "دالة واحدة تنسّق نظاماً فرعياً معقّداً وتخفيه" → Facade.', en: 'The trick: "one method orchestrating and hiding a complex subsystem" → Facade.' } },
      { text: { ar: 'مكتبة تحويل وسائط منخفضة المستوى تحتوي عشرات الكلاسات للتعامل مع الـ codecs والصيغ والتدفّقات. يجد المطوّرون التعامل المباشر معها مرهقاً، فيريدون تقديم دالة بسيطة convert(file, format) فوقها تُخفي كل هذا التعقيد.', en: 'A low-level media-conversion library contains dozens of classes for handling codecs, formats, and streams. Developers find dealing with it directly overwhelming, so they want to expose a simple convert(file, format) method over it that hides all this complexity.' },
        why: { ar: 'التريك: "دالة بسيطة فوق مكتبة معقّدة تخفي التعقيد" → Facade.', en: 'The trick: "a simple method over a complex library that hides complexity" → Facade.' } },
      { text: { ar: 'نظام حجز رحلة سفر يجمع عدّة أنظمة فرعية: حجز الطيران، حجز الفندق، تأجير السيارة، ومعالجة الدفع. يريد الفريق دالة واحدة bookTrip() تنسّق كل هذه الأنظمة بالترتيب الصحيح بدل أن يتعامل العميل مع كل نظام على حدة.', en: 'A trip-booking system combines several subsystems: flight booking, hotel booking, car rental, and payment processing. The team wants one bookTrip() method that orchestrates all these systems in the right order instead of the client dealing with each system separately.' },
        why: { ar: 'التريك: "واجهة واحدة تنسّق أنظمة فرعية متعدّدة" → Facade.', en: 'The trick: "one interface orchestrating multiple subsystems" → Facade.' } },
      { text: { ar: 'متجر إلكتروني عند إتمام الطلب يجب أن ينسّق: التحقّق من المخزون، معالجة الدفع، جدولة الشحن، وإرسال إشعار للعميل — وكلها كلاسات منفصلة معقّدة. يريد الفريق واجهة مبسّطة placeOrder() تخفي هذا التنسيق خلف نقطة دخول واحدة.', en: 'An e-commerce store at checkout must coordinate: inventory check, payment processing, shipping scheduling, and sending a customer notification — all separate, complex classes. The team wants a simplified placeOrder() interface that hides this orchestration behind one entry point.' },
        why: { ar: 'التريك: "إخفاء تنسيق أنظمة معقّدة خلف نقطة دخول واحدة" → Facade.', en: 'The trick: "hide orchestration of complex systems behind one entry point" → Facade.' } },
      { text: { ar: 'مكتبة رسومات منخفضة المستوى تتطلّب استدعاءات كثيرة معقّدة لرسم أي شيء (تهيئة السياق، تعيين الألوان، رسم المسارات...). يريد الفريق تقديم دوال عالية المستوى مثل drawChart() فوق المكتبة تخفي كل هذه التفاصيل.', en: 'A low-level graphics library requires many complex calls to draw anything (initialize context, set colors, draw paths...). The team wants to expose high-level methods like drawChart() over the library that hide all these details.' },
        why: { ar: 'التريك: "واجهة عالية المستوى تبسّط مكتبة منخفضة المستوى" → Facade.', en: 'The trick: "a high-level interface simplifying a low-level library" → Facade.' } }
    ]
  },

  {
    id: 'flyweight', name: 'Flyweight', nameAr: 'الوزن الخفيف', category: 'Structural',
    icon: '🍃', practical: true, practicalId: 'flyweight',
    intent: {
      ar: 'يقلّل استهلاك الذاكرة بمشاركة الحالة المشتركة (intrinsic) بين عدد كبير من الكائنات بدل تخزينها في كل كائن.',
      en: 'Reduces memory usage by sharing common (intrinsic) state across a large number of objects instead of storing it in each one.'
    },
    whenToUse: {
      ar: 'عندما تحتاج لإنشاء عدد ضخم من الكائنات المتشابهة (آلاف/ملايين) وتستهلك ذاكرة هائلة، ويمكن فصل حالتها المشتركة عن حالتها المتغيّرة.',
      en: 'When you must create a huge number of similar objects (thousands/millions) consuming enormous memory, and their shared state can be separated from their varying state.'
    },
    principle: {
      ar: 'مشاركة الكائنات لتوفير الذاكرة · فصل الحالة الداخلية (المشتركة) عن الخارجية (المتغيّرة).',
      en: 'Object sharing to save memory · separating intrinsic (shared) state from extrinsic (varying) state.'
    },
    keyword: { ar: 'آلاف الكائنات · توفير ذاكرة · حالة مشتركة (intrinsic) مقابل متغيّرة (extrinsic)', en: 'thousands of objects · save memory · intrinsic (shared) vs extrinsic (varying) state' },
    howItWorks: {
      ar: 'كائن Flyweight يحمل الحالة المشتركة فقط (مثل القوام واللون لنوع شجرة) + Factory يحتفظ بـ HashMap يُعيد استخدام الكائن إن وُجد أو يُنشئه ويخزّنه + Context يحمل الحالة المتغيّرة (مثل x,y) + مرجعاً للـ Flyweight.',
      en: 'A Flyweight object holds only the shared state (e.g. a tree type\'s texture and color) + a Factory keeps a HashMap reusing the object if present or creating and storing it + a Context holds the varying state (e.g. x,y) + a reference to the Flyweight.'
    },
    limitations: {
      ar: 'يزيد تعقيد الكود مقابل توفير الذاكرة · قد تُستبدل دورات المعالجة بمساحة الذاكرة · الكائنات المشتركة يجب أن تكون immutable.',
      en: 'Trades code complexity for memory savings · may exchange CPU cycles for memory · shared objects must be immutable.'
    },
    scenarios: [
      { text: { ar: 'محرّك لعبة يجب أن يرسم غابة فيها 10,000 شجرة. المشكلة أن كل شجرة كائن كامل يخزّن القوام (texture) واللون والشبكة (mesh)، مما يستهلك ذاكرة هائلة. الحل المقترح: مشاركة القوام واللون بين كل الأشجار من نفس النوع، وتخزين الإحداثيات (x, y) فقط في كل شجرة على حدة.', en: 'A game engine must draw a forest of 10,000 trees. The problem: each tree is a full object storing the texture, color, and mesh, consuming enormous memory. The proposed solution: share the texture and color across all trees of the same type, and store only the coordinates (x, y) in each individual tree.' },
        why: { ar: 'التريك: "آلاف الكائنات + توفير ذاكرة + مشاركة المشترك (intrinsic) وتخزين المتغيّر (extrinsic)" → Flyweight.', en: 'The trick: "thousands of objects + save memory + share the intrinsic and store the extrinsic" → Flyweight.' } },
      { text: { ar: 'محرّر نصوص يمثّل كل حرف في المستند ككائن. عند فتح مستند فيه ملايين الأحرف المكرّرة، تنفجر الذاكرة. يريد المطوّر أن يشير كل ظهور للحرف "a" إلى كائن حرف واحد مشترك بدل إنشاء كائن جديد لكل ظهور.', en: 'A text editor represents each character in a document as an object. When opening a document with millions of repeated characters, memory explodes. The developer wants every occurrence of the letter "a" to point to one shared glyph object instead of creating a new object per occurrence.' },
        why: { ar: 'التريك: "ملايين الكائنات المكرّرة + مشاركة كائن واحد لكل حرف" → Flyweight.', en: 'The trick: "millions of repeated objects + sharing one object per character" → Flyweight.' } },
      { text: { ar: 'تطبيق خرائط يعرض آلاف الدبابيس (pins) من أنواع محدودة (مطعم، فندق، محطّة وقود). كل دبابيس النوع الواحد تشترك في نفس الأيقونة واللون، لكنها تختلف في الموقع فقط. تخزين الأيقونة في كل دبوس يهدر ذاكرة كبيرة.', en: 'A maps app displays thousands of pins of a few types (restaurant, hotel, gas station). All pins of one type share the same icon and color, differing only in location. Storing the icon in every pin wastes a lot of memory.' },
        why: { ar: 'التريك: "مشاركة الأيقونة/النوع بين كل الدبابيس المتشابهة" → Flyweight.', en: 'The trick: "share the icon/type across all similar pins" → Flyweight.' } },
      { text: { ar: 'لعبة إطلاق نار أو محاكاة جزيئات تُطلق آلاف الكائنات المتطابقة في الشكل (نفس الرصاصة/الجزيء) لكنها تختلف في الموقع والسرعة فقط. إنشاء كائن كامل بشكله لكل رصاصة يستنزف الذاكرة بسرعة.', en: 'A shooter game or particle simulation spawns thousands of objects identical in shape (the same bullet/particle) but differing only in position and velocity. Creating a full object with its shape per bullet quickly drains memory.' },
        why: { ar: 'التريك: "شكل الجزيء مشترك (intrinsic) والموقع متغيّر خارجي (extrinsic)" → Flyweight.', en: 'The trick: "the particle shape is shared (intrinsic) and position is extrinsic" → Flyweight.' } },
      { text: { ar: 'جدول بيانات ضخم فيه ملايين الخلايا، وكثير منها يشترك في نفس التنسيق تماماً (نفس الخط واللون والمحاذاة). تخزين كائن تنسيق منفصل في كل خلية يهدر ذاكرة هائلة، فيريد الفريق مشاركة كائن التنسيق بين كل الخلايا المتشابهة.', en: 'A huge spreadsheet has millions of cells, many sharing exactly the same formatting (same font, color, alignment). Storing a separate format object in every cell wastes enormous memory, so the team wants to share the format object across all similar cells.' },
        why: { ar: 'التريك: "مشاركة كائن التنسيق المشترك بين ملايين الخلايا" → Flyweight.', en: 'The trick: "share the common format object across millions of cells" → Flyweight.' } },
      { text: { ar: 'محاكاة غابة أو حشود فيها آلاف الكائنات المرسومة من بضعة نماذج ثلاثية الأبعاد فقط. كل الكائنات من نفس النموذج تشترك في بياناته الثقيلة (الشبكة، القوام)، وتختلف في الموضع والاتجاه. تكرار النموذج لكل كائن غير عملي.', en: 'A forest or crowd simulation has thousands of objects rendered from only a few 3D models. All objects of the same model share its heavy data (mesh, texture) and differ in position and orientation. Duplicating the model per object is impractical.' },
        why: { ar: 'التريك: "النموذج المشترك يُعاد استخدامه لكل النسخ لتوفير الذاكرة" → Flyweight.', en: 'The trick: "the shared model is reused across all instances to save memory" → Flyweight.' } }
    ]
  },

  {
    id: 'proxy', name: 'Proxy', nameAr: 'الوكيل', category: 'Structural',
    icon: '🛡️', practical: true, practicalId: 'proxy',
    intent: {
      ar: 'يوفّر بديلاً/نائباً عن كائن آخر للتحكّم في الوصول إليه (تحقّق، تأخير تحميل، caching) بنفس واجهته.',
      en: 'Provides a substitute/placeholder for another object to control access to it (auth, lazy-load, caching) using the same interface.'
    },
    whenToUse: {
      ar: 'عندما تريد طبقة وسيطة تتحكّم بالوصول للكائن الحقيقي — للتحقّق من الصلاحيات، أو تأجيل الإنشاء المكلف، أو التخزين المؤقّت — دون أن يلاحظ العميل الفرق.',
      en: 'When you want an intermediary layer controlling access to the real object — for permission checks, deferring costly creation, or caching — without the client noticing the difference.'
    },
    principle: {
      ar: 'نفس واجهة الكائن الحقيقي · المسؤولية الواحدة (يفصل التحكّم بالوصول عن منطق العمل) · Open/Closed.',
      en: 'Same interface as the real object · SRP (separates access control from business logic) · Open/Closed.'
    },
    keyword: { ar: 'التحكّم بالوصول · نفس الواجهة · تحقّق قبل التفويض · تأخير تحميل / caching', en: 'control access · same interface · validate before delegating · lazy-load / caching' },
    howItWorks: {
      ar: 'واجهة مشتركة + كائن حقيقي (RealSubject) ينفّذها + Proxy ينفّذ نفس الواجهة، يحتفظ بمرجع للحقيقي، ويُجري منطق التحكّم (تحقّق/تحميل/cache) قبل أو بدل تفويض الاستدعاء للحقيقي.',
      en: 'A shared interface + a real object (RealSubject) implementing it + a Proxy implementing the same interface, holding a reference to the real one, and running control logic (auth/load/cache) before or instead of delegating to it.'
    },
    limitations: {
      ar: 'يضيف طبقة قد تؤخّر الاستجابة · يزيد عدد الكلاسات · تعقيد إضافي في التتبّع.',
      en: 'Adds a layer that may delay responses · increases the number of classes · extra tracing complexity.'
    },
    scenarios: [
      { text: { ar: 'تطبيق يستخدم قاعدة بيانات عبر دالة query(sql). المشكلة أن أي مستخدم يستطيع تنفيذ استعلامات DELETE حتى لو لم يكن لديه صلاحية. نحتاج طبقة وسيطة تنفّذ نفس واجهة قاعدة البيانات، وتفحص دور المستخدم (role) قبل تمرير الاستعلام: إن كان الاستعلام DELETE والمستخدم ليس admin تُرفضه، وإلا تفوّضه لقاعدة البيانات الحقيقية.', en: 'An app uses a database through a query(sql) method. The problem: any user can run DELETE queries even without permission. We need an intermediary layer that implements the same database interface and checks the user\'s role before passing the query: if the query is DELETE and the user is not admin, it rejects it; otherwise it delegates to the real database.' },
        why: { ar: 'التريك: "طبقة وسيطة بنفس الواجهة تتحقّق من الصلاحية قبل التفويض" → Protection Proxy.', en: 'The trick: "an intermediary layer with the same interface validating permission before delegating" → Protection Proxy.' } },
      { text: { ar: 'خدمة تحويل الكلام إلى نص (Speech-to-Text) مكلفة التحميل والتشغيل. قبل استدعاء الخدمة الحقيقية، يجب التحقّق من صحّة مفتاح API الذي قدّمه المستخدم: إن كان صحيحاً تفوّض للخدمة الحقيقية، وإلا ترفض. يجب أن ينفّذ الوكيل نفس واجهة الخدمة بحيث لا يلاحظ العميل الفرق.', en: 'A Speech-to-Text service is costly to load and run. Before calling the real service, the user-provided API key must be validated: if valid, delegate to the real service; otherwise reject. The proxy must implement the same service interface so the client notices no difference.' },
        why: { ar: 'التريك الحرفي من الاختبار: "كائن بنفس الواجهة يتحقّق من مفتاح API ثم يفوّض" → Proxy.', en: 'The literal exam trick: "an object with the same interface validating an API key then delegating" → Proxy.' } },
      { text: { ar: 'تطبيق يعرض صوراً عالية الدقّة من القرص، لكن تحميل كل صورة عند فتح الصفحة بطيء ومكلف. نريد ألّا تُحمَّل الصورة الحقيقية من القرص إلا عند عرضها فعلاً على الشاشة لأول مرة، مع كائن نائب يأخذ مكانها ويؤجّل التحميل.', en: 'An app displays high-resolution images from disk, but loading every image when the page opens is slow and costly. We want the real image to be loaded from disk only when it is actually displayed on screen for the first time, with a placeholder object standing in and deferring the load.' },
        why: { ar: 'التريك: "تأجيل تحميل الكائن المكلف حتى أول استخدام فعلي" → Virtual Proxy (تحميل كسول).', en: 'The trick: "defer loading the costly object until first actual use" → Virtual Proxy (lazy loading).' } },
      { text: { ar: 'تطبيق يستدعي API خارجياً بطيئاً للحصول على بيانات الطقس. كثير من الطلبات تتكرّر بنفس المدينة خلال دقائق. نريد طبقة بنفس الواجهة تُرجع النتيجة المخزّنة مؤقّتاً (cache) إن كانت موجودة بدل ضرب الـ API في كل مرة.', en: 'An app calls a slow external API to get weather data. Many requests repeat for the same city within minutes. We want a layer with the same interface that returns a cached result if available instead of hitting the API every time.' },
        why: { ar: 'التريك: "طبقة بنفس الواجهة تُرجع النتيجة المخزّنة" → Caching Proxy.', en: 'The trick: "a layer with the same interface returning the cached result" → Caching Proxy.' } },
      { text: { ar: 'كائن خدمة موجود على خادم بعيد، ويتعامل العميل المحلّي معه عبر الشبكة. نريد كائناً محلّياً نائباً ينفّذ نفس واجهة الخدمة ويخفي تفاصيل الاتصال الشبكي (التسلسل، الإرسال، الاستقبال) عن العميل وكأنه يستدعي كائناً محلّياً.', en: 'A service object lives on a remote server, and the local client interacts with it over the network. We want a local placeholder object that implements the same service interface and hides the network-communication details (serialization, sending, receiving) from the client, as if it were calling a local object.' },
        why: { ar: 'التريك: "كائن محلّي يمثّل الكائن البعيد بنفس الواجهة ويخفي الشبكة" → Remote Proxy.', en: 'The trick: "a local object representing the remote one with the same interface, hiding the network" → Remote Proxy.' } },
      { text: { ar: 'نظام إدارة مستندات حسّاسة لا يجوز أن يصل إليها إلا مستخدم مُصرَّح له، ويجب تسجيل كل محاولة وصول. نريد وكيلاً ينفّذ نفس واجهة المستند، يفرض التحقّق من الصلاحية ويسجّل المحاولة قبل أن يفوّض للمستند الحقيقي.', en: 'A sensitive-document management system where documents may only be accessed by an authorized user, and every access attempt must be logged. We want a proxy that implements the same document interface, enforces the permission check, and logs the attempt before delegating to the real document.' },
        why: { ar: 'التريك: "وكيل يفرض الصلاحية ويسجّل قبل التفويض" → Protection Proxy.', en: 'The trick: "a proxy enforcing authorization and logging before delegating" → Protection Proxy.' } }
    ]
  }

]);

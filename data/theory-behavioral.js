// ============================================================
// THEORY — Behavioral patterns (11)
// Chain of Responsibility, Command, Interpreter, Iterator,
// Mediator, Memento, Observer, State, Strategy, Template Method,
// Visitor
// ============================================================

window.THEORY_PATTERNS = (window.THEORY_PATTERNS || []).concat([

  {
    id: 'chain', name: 'Chain of Responsibility', nameAr: 'سلسلة المسؤولية', category: 'Behavioral',
    icon: '⛓️', practical: false,
    intent: {
      ar: 'يمرّر الطلب على سلسلة من المعالِجات، فيقرّر كل معالِج إمّا معالجة الطلب أو تمريره للتالي.',
      en: 'Passes a request along a chain of handlers; each handler decides either to process it or pass it to the next.'
    },
    whenToUse: {
      ar: 'عندما يمكن لعدة كائنات معالجة طلب، ولا تريد ربط المُرسِل بمعالِج محدّد — بل تترك الطلب يسير في السلسلة حتى يلتقطه من يستطيع.',
      en: 'When several objects can handle a request and you don\'t want to couple the sender to a specific handler — let the request travel the chain until one can handle it.'
    },
    principle: {
      ar: 'يفصل المُرسِل عن المُستقبِل · المسؤولية الواحدة · Open/Closed (إضافة معالِجات دون تعديل البقية).',
      en: 'Decouples sender from receiver · SRP · Open/Closed (add handlers without modifying others).'
    },
    keyword: { ar: 'تمرير الطلب عبر سلسلة · عدة معالِجات · كل واحد يعالج أو يمرّر', en: 'pass request along a chain · multiple handlers · each handles or forwards' },
    howItWorks: {
      ar: 'كلاس Handler مجرّد يحتفظ بمرجع للمعالِج التالي (successor) ودالة handle(). كل معالِج فعلي إمّا يعالج الطلب أو يستدعي successor.handle(). العميل يطلق الطلب من رأس السلسلة.',
      en: 'An abstract Handler holds a reference to the next handler (successor) and a handle() method. Each concrete handler either processes the request or calls successor.handle(). The client fires the request at the head of the chain.'
    },
    limitations: {
      ar: 'لا ضمان أن الطلب سيُعالَج (قد يصل النهاية دون معالجة) · صعوبة تتبّع المسار أحياناً.',
      en: 'No guarantee the request will be handled (it may reach the end unhandled) · the path can be hard to trace.'
    },
    scenarios: [
      { text: { ar: 'نظام دعم فنّي يستقبل طلبات العملاء. يبدأ الطلب عند موظّف المستوى الأول؛ فإن لم يستطع حلّه يمرّره لموظّف المستوى الثاني، فإن عجز هذا يمرّره للمدير. يجب ألّا يعرف المُرسِل من سيعالج الطلب فعلاً — بل يسير الطلب في سلسلة حتى يلتقطه من يستطيع معالجته.', en: 'A tech-support system receives customer requests. A request starts at a level-1 agent; if they can\'t resolve it, they pass it to a level-2 agent; if that one fails, they pass it to a manager. The sender must not know who will actually handle the request — the request travels a chain until someone capable picks it up.' },
        why: { ar: 'التريك: "الطلب يمرّ عبر معالِجات متتالية، كل واحد يعالج أو يمرّر، دون معرفة المُرسِل" → Chain of Responsibility.', en: 'The trick: "the request passes through successive handlers, each handling or forwarding, without the sender knowing" → Chain of Responsibility.' } },
      { text: { ar: 'تطبيق ويب يعالج كل طلب HTTP وارد عبر سلسلة من المرشّحات (filters): أولاً مرشّح المصادقة، ثم مرشّح التسجيل (logging)، ثم مرشّح الضغط. كل مرشّح يقوم بعمله ثم يمرّر الطلب للمرشّح التالي في السلسلة.', en: 'A web app processes every incoming HTTP request through a chain of filters: first an authentication filter, then a logging filter, then a compression filter. Each filter does its job and then passes the request to the next filter in the chain.' },
        why: { ar: 'التريك: "سلسلة معالجة متتالية عبر حلقات مستقلة" → Chain of Responsibility.', en: 'The trick: "sequential processing through independent links" → Chain of Responsibility.' } },
      { text: { ar: 'نظام موافقات على طلبات الصرف المالي يعتمد على حدّ المبلغ: الموظّف يعتمد حتى 1000، والمدير حتى 10000، والرئيس التنفيذي لأي مبلغ. يصعد الطلب في السلسلة حتى يصل إلى أول شخص لديه صلاحية اعتماده.', en: 'An expense-approval system depends on the amount limit: an employee approves up to 1000, a manager up to 10000, and the CEO any amount. The request climbs the chain until it reaches the first person authorized to approve it.' },
        why: { ar: 'التريك: "الطلب يصعد السلسلة حتى يجد صاحب الصلاحية" → Chain of Responsibility.', en: 'The trick: "the request climbs the chain until it finds an authorized approver" → Chain of Responsibility.' } },
      { text: { ar: 'معالجة أحداث واجهة المستخدم: عند النقر على زر داخل حاوية داخل نافذة، يُعرَض الحدث أولاً على الزر، فإن لم يعالجه يُمرَّر إلى الحاوية، ثم إلى النافذة. كل عنصر قد يلتقط الحدث أو يمرّره لأبيه.', en: 'UI event handling: when clicking a button inside a container inside a window, the event is offered first to the button; if it doesn\'t handle it, it is passed to the container, then to the window. Each element may capture the event or forward it to its parent.' },
        why: { ar: 'التريك: "الحدث يتنقّل عبر سلسلة المعالِجات حتى يُعالَج" → Chain of Responsibility.', en: 'The trick: "the event travels through a chain of handlers until handled" → Chain of Responsibility.' } },
      { text: { ar: 'نظام التحقّق من مدخلات نموذج يطبّق سلسلة فحوصات متتالية: فحص أن الحقل غير فارغ، ثم فحص الطول، ثم فحص الصيغة. عند نجاح كل فحص يُمرَّر الإدخال للفحص التالي، وعند فشل أيٍّ منها يتوقّف.', en: 'A form-input validation system applies a chain of successive checks: a non-empty check, then a length check, then a format check. On each successful check the input is passed to the next; if any fails, it stops.' },
        why: { ar: 'التريك: "كل فحص حلقة في السلسلة يمرّر للتالي عند النجاح" → Chain of Responsibility.', en: 'The trick: "each check is a link passing along on success" → Chain of Responsibility.' } },
      { text: { ar: 'نظام تسجيل (logging) بمستويات متعدّدة: DEBUG و INFO و ERROR. تمرّ رسالة السجلّ على معالِجات المستويات تباعاً، وكل معالِج يقرّر هل يتعامل مع الرسالة (حسب مستواها) أو يمرّرها للمستوى التالي.', en: 'A multi-level logging system: DEBUG, INFO, and ERROR. A log message passes through the level handlers in turn, and each handler decides whether to handle the message (based on its level) or pass it to the next level.' },
        why: { ar: 'التريك: "الرسالة تمرّ على معالِجات المستويات تباعاً، كل واحد يعالج أو يمرّر" → Chain of Responsibility.', en: 'The trick: "the message passes through level handlers in turn, each handling or forwarding" → Chain of Responsibility.' } }
    ]
  },

  {
    id: 'command', name: 'Command', nameAr: 'الأمر', category: 'Behavioral',
    icon: '⌘', practical: false,
    intent: {
      ar: 'يغلّف الطلب ككائن مستقل، مما يتيح تمريره وتأجيله وحفظه في طابور أو سجلّ، ودعم التراجع (undo).',
      en: 'Encapsulates a request as a standalone object, enabling you to pass, queue, log it, and support undo.'
    },
    whenToUse: {
      ar: 'عندما تريد فصل من يطلب العملية عمّن ينفّذها، أو دعم التراجع/الإعادة، أو وضع العمليات في طابور أو جدولتها أو تسجيلها.',
      en: 'When you want to decouple the invoker from the executor, support undo/redo, or queue, schedule, or log operations.'
    },
    principle: {
      ar: 'يفصل المُستدعي عن المنفّذ · المسؤولية الواحدة · Open/Closed (أوامر جديدة دون تعديل المُستدعي).',
      en: 'Decouples invoker from receiver · SRP · Open/Closed (new commands without modifying the invoker).'
    },
    keyword: { ar: 'دعم التراجع (undo) · تغليف الطلب ككائن · طابور/جدولة عمليات', en: 'undo support · encapsulate request as object · queue/schedule operations' },
    howItWorks: {
      ar: 'واجهة Command فيها execute() (و undo() اختياري) + أوامر فعلية تغلّف المستقبِل وتفوّض له + Invoker يحتفظ بالأوامر ويستدعي execute() دون معرفة التفاصيل + سجلّ للأوامر لدعم التراجع.',
      en: 'A Command interface with execute() (and optional undo()) + concrete commands wrapping the receiver and delegating to it + an Invoker holding commands and calling execute() without knowing details + a command history for undo.'
    },
    limitations: {
      ar: 'يزيد عدد الكلاسات (كلاس لكل أمر) · تعقيد إضافي إن لم تكن تحتاج التراجع/الطابور.',
      en: 'Increases the number of classes (one per command) · extra complexity if you don\'t need undo/queue.'
    },
    scenarios: [
      { text: { ar: 'محرّر نصوص متقدّم يجب أن يدعم التراجع والإعادة (undo/redo) لكل عملية يقوم بها المستخدم: كتابة، حذف، تنسيق. يريد المطوّر تغليف كل عملية ككائن مستقل يحمل طريقة تنفيذها وطريقة التراجع عنها، وحفظها في سجلّ يسمح بالعودة خطوة للخلف.', en: 'An advanced text editor must support undo/redo for every operation the user performs: type, delete, format. The developer wants to encapsulate each operation as a standalone object holding how to execute it and how to undo it, stored in a history that allows stepping back.' },
        why: { ar: 'التريك: "دعم undo + تغليف كل عملية ككائن له execute و undo + سجلّ" → Command.', en: 'The trick: "undo support + encapsulating each operation as an object with execute and undo + a history" → Command.' } },
      { text: { ar: 'تطبيق فيه نفس الأفعال تُستدعى من أماكن مختلفة: زر في شريط الأدوات، وعنصر في القائمة، واختصار لوحة مفاتيح، كلها تنفّذ "حفظ المستند". يريد الفريق تغليف الفعل ككائن واحد يُعاد استخدامه عبر كل هذه المُستدعِيات دون تكرار المنطق.', en: 'An app where the same actions are triggered from different places: a toolbar button, a menu item, and a keyboard shortcut, all performing "save document." The team wants to encapsulate the action as a single object reused across all these invokers without duplicating logic.' },
        why: { ar: 'التريك: "تغليف الفعل ككائن يُعاد استخدامه عبر مُستدعِين متعدّدين" → Command.', en: 'The trick: "encapsulate the action as an object reused across multiple invokers" → Command.' } },
      { text: { ar: 'نظام معالجة مهام يضع المهام في طابور (queue) ويجدولها للتنفيذ لاحقاً أو على دفعات في وقت محدّد. يجب أن تكون كل مهمّة كائناً مستقلاً يمكن تخزينه وتمريره وتنفيذه في وقت لاحق دون معرفة من سيستقبلها.', en: 'A task-processing system queues tasks and schedules them for later or batch execution at a specific time. Each task must be a standalone object that can be stored, passed, and executed later without knowing who will receive it.' },
        why: { ar: 'التريك: "وضع العمليات في طابور وجدولتها للتنفيذ لاحقاً" → Command.', en: 'The trick: "queue operations and schedule them for later execution" → Command.' } },
      { text: { ar: 'وحدة تحكّم منزل ذكي فيها أزرار قابلة للبرمجة: كل زر يمكن إسناد فعل له لتشغيل أو إطفاء أجهزة مختلفة (إضاءة، مكيّف، ستائر). يجب أن يستدعي الزر (المُستدعي) الفعل دون أن يعرف الجهاز الذي سينفّذه.', en: 'A smart-home remote with programmable buttons: each button can be assigned an action to turn different devices on or off (lights, AC, blinds). The button (invoker) must trigger the action without knowing the device that will perform it.' },
        why: { ar: 'التريك: "الزر يستدعي أمراً مغلّفاً دون معرفة الجهاز المنفّذ" → Command.', en: 'The trick: "the button triggers an encapsulated command without knowing the executing device" → Command.' } },
      { text: { ar: 'لعبة تسجّل كل حركة يقوم بها اللاعب لتتمكّن من إعادة تشغيل المباراة (replay) لاحقاً أو التراجع عن آخر حركة. يجب أن تكون كل حركة كائناً في سجلّ قابل للإعادة والتراجع.', en: 'A game records every move the player makes so it can replay the match later or undo the last move. Each move must be an object in a replayable, undoable history.' },
        why: { ar: 'التريك: "كل حركة كائن في سجلّ قابل للإعادة/التراجع" → Command.', en: 'The trick: "each move is an object in a replayable/undoable history" → Command.' } },
      { text: { ar: 'نظام بنكي ينفّذ معاملات مالية يجب أن تكون قابلة للتراجع (rollback) في حال فشل أحد الخطوات. يريد الفريق تمثيل كل معاملة ككائن يحمل طريقة تنفيذها وطريقة عكسها لضمان التراجع الآمن.', en: 'A banking system executes financial transactions that must be rollback-able if a step fails. The team wants to represent each transaction as an object holding how to execute it and how to reverse it to ensure safe rollback.' },
        why: { ar: 'التريك: "كل معاملة كائن فيه execute و undo لدعم rollback" → Command.', en: 'The trick: "each transaction is an object with execute and undo for rollback" → Command.' } }
    ]
  },

  {
    id: 'interpreter', name: 'Interpreter', nameAr: 'المُفسّر', category: 'Behavioral',
    icon: '🔤', practical: false,
    intent: {
      ar: 'يعرّف تمثيلاً لقواعد لغة، ومُفسّراً يستخدم هذا التمثيل لتفسير الجُمل في تلك اللغة.',
      en: 'Defines a representation for a language\'s grammar along with an interpreter that uses it to interpret sentences in that language.'
    },
    whenToUse: {
      ar: 'عندما يكون لديك لغة بسيطة متكرّرة (تعابير حسابية، استعلامات، قواعد) وتريد تمثيل قواعدها ككلاسات وتفسيرها — أو ترجمة لغة إلى أخرى.',
      en: 'When you have a simple, recurring language (math expressions, queries, rules) and want to represent its grammar as classes and interpret it — or translate one language into another.'
    },
    principle: {
      ar: 'كل قاعدة نحوية كلاس مستقل · يسهّل توسعة القواعد · يطبّق التركيب الشجري.',
      en: 'Each grammar rule is its own class · makes the grammar easy to extend · uses a tree composition.'
    },
    keyword: { ar: 'تفسير/ترجمة لغة · قواعد نحوية (grammar) · تعابير متكرّرة', en: 'interpret/translate a language · grammar rules · recurring expressions' },
    howItWorks: {
      ar: 'واجهة Expression فيها interpret(context) + تعابير طرفية (terminal) وغير طرفية (non-terminal) تُبنى كشجرة تمثّل الجملة، ثم تُفسَّر تكراريّاً.',
      en: 'An Expression interface with interpret(context) + terminal and non-terminal expressions composed into a tree representing the sentence, then interpreted recursively.'
    },
    limitations: {
      ar: 'يصبح معقّداً جداً مع القواعد الكبيرة (كلاس لكل قاعدة) · مناسب فقط للّغات البسيطة.',
      en: 'Becomes very complex for large grammars (a class per rule) · suitable only for simple languages.'
    },
    scenarios: [
      { text: { ar: 'نظام يستقبل مدخلات مكتوبة بلغة مختلفة عن اللغة الافتراضية للنظام، ويحتاج إلى ترجمتها وتفسيرها وفق قواعد محدّدة قبل المعالجة. متى يجب استخدام نمط يمثّل قواعد اللغة ويفسّر الجمل المكتوبة بها؟', en: 'A system receives input written in a language different from the system\'s default language, and needs to translate and interpret it per defined rules before processing. When should you use a pattern that represents the language\'s grammar and interprets sentences written in it?' },
        why: { ar: 'التريك الحرفي من الاختبار: "مدخل بلغة مختلفة يُترجَم/يُفسَّر وفق قواعد" → Interpreter.', en: 'The literal exam trick: "input in a different language translated/interpreted per a grammar" → Interpreter.' } },
      { text: { ar: 'آلة حاسبة يجب أن تفسّر تعابير حسابية نصّية يكتبها المستخدم مثل "3 + 5 * 2"، فتبني تمثيلاً شجرياً للتعبير (أرقام كعناصر طرفية وعمليات كعناصر غير طرفية) ثم تقيّمه تكراريّاً.', en: 'A calculator must interpret textual math expressions the user types like "3 + 5 * 2," building a tree representation of the expression (numbers as terminals, operations as non-terminals) and then evaluating it recursively.' },
        why: { ar: 'التريك: "تمثيل قواعد التعبير ككلاسات في شجرة وتفسيرها" → Interpreter.', en: 'The trick: "represent the expression grammar as classes in a tree and interpret it" → Interpreter.' } },
      { text: { ar: 'محرّك بحث بسيط يتيح للمستخدم كتابة استعلامات بقواعد محدّدة مثل "color=red AND size>10". يحتاج النظام إلى تمثيل قواعد هذه اللغة الصغيرة وتفسير الاستعلام لتطبيقه على البيانات.', en: 'A simple search engine lets the user write queries with a defined grammar like "color=red AND size>10." The system needs to represent this small language\'s grammar and interpret the query to apply it to the data.' },
        why: { ar: 'التريك: "تمثيل قواعد استعلام صغير وتفسيره" → Interpreter.', en: 'The trick: "represent and interpret a small query grammar" → Interpreter.' } },
      { text: { ar: 'أداة تحويل الأرقام الرومانية إلى أرقام عشرية وفق قواعد ثابتة معروفة (I, V, X, L...). كل قاعدة تحويل يمكن تمثيلها كتعبير يُفسَّر ضمن بنية القواعد.', en: 'A tool that converts Roman numerals to decimal numbers per fixed, known rules (I, V, X, L...). Each conversion rule can be represented as an expression interpreted within the grammar structure.' },
        why: { ar: 'التريك: "قواعد تحويل ثابتة تُمثَّل كتعابير تُفسَّر" → Interpreter.', en: 'The trick: "fixed conversion rules represented as interpretable expressions" → Interpreter.' } },
      { text: { ar: 'تطبيق يحتاج لغة سكربت صغيرة يكتب بها المستخدمون أوامر نصّية لتخصيص سلوك التطبيق. يجب تمثيل قواعد هذه اللغة وتفسير السكربت المكتوب لتنفيذه.', en: 'An app needs a tiny scripting language in which users write textual commands to customize the app\'s behavior. The grammar of this language must be represented and the written script interpreted to execute it.' },
        why: { ar: 'التريك: "تمثيل قواعد لغة سكربت صغيرة وتفسيرها" → Interpreter.', en: 'The trick: "represent and interpret a small scripting-language grammar" → Interpreter.' } },
      { text: { ar: 'محرّك تقييم تعابير منطقية (Boolean) يقيّم شروطاً مركّبة من متغيّرات وعوامل مثل AND و OR و NOT. كل عامل منطقي يُمثَّل كتعبير في شجرة تُفسَّر لإنتاج النتيجة النهائية.', en: 'A boolean-expression evaluation engine evaluates compound conditions of variables and operators like AND, OR, NOT. Each logical operator is represented as an expression in a tree that is interpreted to produce the final result.' },
        why: { ar: 'التريك: "كل عامل منطقي تعبير في شجرة قواعد تُفسَّر" → Interpreter.', en: 'The trick: "each logical operator is an expression in an interpreted grammar tree" → Interpreter.' } }
    ]
  },

  {
    id: 'iterator', name: 'Iterator', nameAr: 'المُكرِّر', category: 'Behavioral',
    icon: '🔁', practical: false,
    intent: {
      ar: 'يتيح المرور على عناصر مجموعة بشكل تسلسلي دون كشف بنيتها الداخلية.',
      en: 'Lets you traverse the elements of a collection sequentially without exposing its internal structure.'
    },
    whenToUse: {
      ar: 'عندما تريد توفير طريقة موحّدة للمرور على عناصر مجموعة (مهما كانت بنيتها: مصفوفة، قائمة، شجرة) مع إخفاء تفاصيل التخزين.',
      en: 'When you want a uniform way to traverse a collection\'s elements (whatever its structure: array, list, tree) while hiding storage details.'
    },
    principle: {
      ar: 'المسؤولية الواحدة (يفصل منطق المرور عن المجموعة) · يخفي التطبيق الداخلي · Open/Closed.',
      en: 'SRP (separates traversal logic from the collection) · hides the internal implementation · Open/Closed.'
    },
    keyword: { ar: 'المرور على مجموعة · دون كشف البنية الداخلية · traverse / next()', en: 'traverse a collection · without exposing internal structure · traverse / next()' },
    howItWorks: {
      ar: 'واجهة Iterator فيها hasNext() و next() + المجموعة (Aggregate) تُرجع مُكرِّراً عبر createIterator(). العميل يمرّ عبر المُكرِّر دون معرفة كيف تُخزَّن العناصر.',
      en: 'An Iterator interface with hasNext() and next() + the collection (Aggregate) returns an iterator via createIterator(). The client traverses through the iterator without knowing how elements are stored.'
    },
    limitations: {
      ar: 'مبالغة للمجموعات البسيطة جداً · بعض اللغات توفّره مدمجاً (foreach) فيقلّ الداعي لبنائه يدوياً.',
      en: 'Overkill for very simple collections · some languages provide it built-in (foreach), reducing the need to build it manually.'
    },
    scenarios: [
      { text: { ar: 'مطوّرة تبني مكتبة تستخدم داخلياً مجموعة من بُنى البيانات المعقّدة. تريد إنشاء واجهة (دالة) لمكتبتها لا تكشف التطبيق الداخلي لبنية البيانات (مصفوفة، قائمة مترابطة...). يجب أن تدعم الدالة المرور والتنقّل عبر مجموعة العناصر بطريقة تُخفي وتغلّف تفاصيل التعامل مع بنية بيانات محدّدة.', en: 'A developer builds a library that internally uses a collection of complex data structures. She wants to create an interface (method) for her library that does not expose the internal implementation of the data structure (array, linked list...). The method must support traversing and looping through the collection of elements in a way that hides and encapsulates the details of a specific data structure.' },
        why: { ar: 'التريك الحرفي من الاختبار: "دعم المرور دون كشف التطبيق الداخلي للبنية" → Iterator.', en: 'The literal exam trick: "support traversal without exposing the internal structure implementation" → Iterator.' } },
      { text: { ar: 'جامعة تحتفظ بسجلّات الطلاب بصيغ مختلفة: طلاب البكالوريوس في مصفوفة، طلاب الدراسات العليا في شجرة، والطلاب الزائرون في بنية بيانات مخصّصة. يحتاج مكتب التسجيل إلى توليد تقرير يسرد كل الطلاب بغضّ النظر عن بنية البيانات المستخدمة، بالوصول إلى كل سجلّ بشكل تسلسلي.', en: 'A university keeps student records in multiple formats: undergraduate students in an array, graduate students in a tree, and exchange students in a custom data structure. The registrar\'s office needs to generate a report listing all students regardless of the data structure used, accessing each record sequentially.' },
        why: { ar: 'التريك الحرفي من الاختبار: "المرور على بُنى مختلفة بشكل تسلسلي موحّد دون كشفها" → Iterator.', en: 'The literal exam trick: "traverse different structures sequentially and uniformly without exposing them" → Iterator.' } },
      { text: { ar: 'تطبيق وسائط يحتاج المرور على قائمة تشغيل (playlist) بترتيبها الطبيعي تارة وبترتيب عشوائي تارة أخرى، عبر نفس الواجهة، دون أن يعرف العميل كيف تُخزَّن المقاطع داخلياً.', en: 'A media app needs to traverse a playlist in its natural order sometimes and in shuffled order other times, through the same interface, without the client knowing how the tracks are stored internally.' },
        why: { ar: 'التريك: "مُكرِّرات مختلفة لنفس المجموعة دون كشف التخزين" → Iterator.', en: 'The trick: "different iterators for the same collection without exposing storage" → Iterator.' } },
      { text: { ar: 'نظام يعرض نتائج بحث مقسّمة على صفحات (pagination)، ويريد للعميل أن يمرّ على النتائج عنصراً بعنصر دون أن يعرف متى ولا كيف تُجلب الصفحات التالية من الخادم.', en: 'A system shows paginated search results and wants the client to traverse the results item by item without knowing when or how the next pages are fetched from the server.' },
        why: { ar: 'التريك: "مُكرِّر يقدّم تسلسلاً موحّداً ويخفي منطق جلب الصفحات" → Iterator.', en: 'The trick: "an iterator providing a uniform sequence while hiding page-fetching logic" → Iterator.' } },
      { text: { ar: 'بنية شجرة ملفات يحتاج المطوّر المرور عليها بترتيبات مختلفة (تصاعدي، تنازلي) دون كشف كيفية تخزين العقد أو ربطها داخلياً، عبر واجهة مرور موحّدة.', en: 'A file-tree structure the developer needs to traverse in different orders (pre-order, post-order) without exposing how nodes are stored or linked internally, through a uniform traversal interface.' },
        why: { ar: 'التريك: "مُكرِّر يقدّم تسلسلاً موحّداً للشجرة دون كشف العقد" → Iterator.', en: 'The trick: "an iterator providing a uniform sequence over the tree without exposing nodes" → Iterator.' } },
      { text: { ar: 'مجموعة مخصّصة (custom collection) بناها الفريق بنفسه، ويريدون دعم المرور القياسي عليها بـ foreach بشكل نظيف، فينفّذون واجهة مرور تخفي بنيتهم الداخلية.', en: 'A custom collection the team built themselves, and they want to support standard foreach traversal over it cleanly, so they implement a traversal interface that hides their internal structure.' },
        why: { ar: 'التريك: "تنفيذ واجهة المُكرِّر يتيح المرور القياسي ويخفي البنية" → Iterator.', en: 'The trick: "implementing the iterator interface enables standard traversal and hides the structure" → Iterator.' } }
    ]
  },

  {
    id: 'mediator', name: 'Mediator', nameAr: 'الوسيط', category: 'Behavioral',
    icon: '🕸️', practical: false,
    intent: {
      ar: 'يقلّل الاقتران الفوضوي بين كائنات كثيرة بجعلها تتواصل عبر كائن وسيط مركزي بدل التواصل المباشر.',
      en: 'Reduces chaotic coupling between many objects by making them communicate through a central mediator object instead of directly.'
    },
    whenToUse: {
      ar: 'عندما تتواصل مجموعة كائنات بشكل متشابك (many-to-many) مما يصعّب تعديلها — فتُمرَّر كل الاتصالات عبر وسيط واحد.',
      en: 'When a set of objects communicate in a tangled many-to-many way that makes them hard to change — route all communication through one mediator.'
    },
    principle: {
      ar: 'يقلّل الاقتران (many-to-many → one-to-many) · المسؤولية الواحدة · يبسّط التواصل.',
      en: 'Reduces coupling (many-to-many → one-to-many) · SRP · simplifies communication.'
    },
    keyword: { ar: 'مركز اتصال مركزي · تقليل الاقتران بين كائنات متواصلة · بدل التواصل المباشر', en: 'central communication hub · reduce coupling between communicating objects · instead of direct talk' },
    howItWorks: {
      ar: 'واجهة Mediator + وسيط فعلي يعرف كل المكوّنات (Colleagues). كل مكوّن يُبلّغ الوسيط بالأحداث، والوسيط ينسّق ردود الفعل ويُبلّغ المكوّنات المعنية — فلا يعرف المكوّن الآخرين مباشرة.',
      en: 'A Mediator interface + a concrete mediator that knows all components (colleagues). Each component notifies the mediator of events, and the mediator coordinates reactions and notifies the relevant components — so a component never knows the others directly.'
    },
    limitations: {
      ar: 'قد يتضخّم الوسيط ويصبح "كائن إله" يحتوي منطقاً كثيراً.',
      en: 'The mediator can bloat into a "God object" holding too much logic.'
    },
    scenarios: [
      { text: { ar: 'نموذج إدخال (form) معقّد فيه حقول كثيرة يؤثّر بعضها على بعض: تفعيل حقل عند ملء آخر، وإخفاء قسم بناءً على اختيار. ربط الحقول مباشرة ببعضها يخلق تشابكاً يصعب تعديله. يريد المطوّر كائناً مركزياً ينسّق كل هذه التفاعلات بدل تواصل الحقول مباشرة.', en: 'A complex input form has many fields affecting each other: enabling a field when another is filled, hiding a section based on a choice. Wiring fields directly to each other creates tangling that is hard to change. The developer wants a central object that coordinates all these interactions instead of fields talking directly.' },
        why: { ar: 'التريك: "كائن مركزي ينسّق التفاعلات بدل ربط الحقول مباشرة" → Mediator.', en: 'The trick: "a central object coordinating interactions instead of wiring fields directly" → Mediator.' } },
      { text: { ar: 'غرفة دردشة (chat room) يتبادل فيها المستخدمون الرسائل. بدل أن يرسل كل مستخدم رسالة مباشرة لكل مستخدم آخر (تشابك كبير)، يرسلون رسائلهم إلى خادم مركزي يتولّى توزيعها على المعنيين.', en: 'A chat room where users exchange messages. Instead of each user sending a message directly to every other user (heavy tangling), they send their messages to a central server that distributes them to the relevant recipients.' },
        why: { ar: 'التريك: "خادم مركزي يمنع اقتران المستخدمين ببعضهم" → Mediator.', en: 'The trick: "a central server preventing user-to-user coupling" → Mediator.' } },
      { text: { ar: 'نظام مراقبة حركة طيران: الطائرات في منطقة المطار يجب ألّا تتواصل مباشرة فيما بينها لتجنّب الفوضى، بل تتواصل جميعها عبر برج مراقبة مركزي ينسّق إقلاعها وهبوطها وحركتها.', en: 'An air-traffic control system: planes in the airport area must not communicate directly with each other to avoid chaos; instead they all communicate through a central control tower that coordinates their takeoff, landing, and movement.' },
        why: { ar: 'التريك: "برج مركزي ينسّق كل الاتصالات بدل التواصل المباشر" → Mediator.', en: 'The trick: "a central tower coordinating all communication instead of direct talk" → Mediator.' } },
      { text: { ar: 'لوحة تحكّم فيها مكوّنات كثيرة (أزرار، قوائم منسدلة، حقول) يجب أن تبقى متزامنة: تغيير قائمة يحدّث حقلاً، وضغط زر يعطّل آخر. لتفادي اقترانها المباشر المتشابك، يريد الفريق وسيطاً ينسّق تزامنها.', en: 'A dashboard with many components (buttons, dropdowns, fields) that must stay synchronized: changing a dropdown updates a field, pressing a button disables another. To avoid their tangled direct coupling, the team wants a mediator coordinating their synchronization.' },
        why: { ar: 'التريك: "وسيط ينسّق تزامن مكوّنات متشابكة" → Mediator.', en: 'The trick: "a mediator coordinating synchronization of tangled components" → Mediator.' } },
      { text: { ar: 'نظام منزل ذكي تتفاعل فيه أجهزة كثيرة (إضاءة، تكييف، ستائر، حسّاسات). بدل أن يعرف كل جهاز الأجهزة الأخرى ويتواصل معها مباشرة، يتفاعل الجميع عبر وحدة تحكّم مركزية تنسّق سلوكهم.', en: 'A smart-home system where many devices interact (lights, AC, blinds, sensors). Instead of each device knowing and talking to the others directly, they all interact through a central hub that coordinates their behavior.' },
        why: { ar: 'التريك: "وحدة مركزية تنسّق الأجهزة وتقلّل التشابك" → Mediator.', en: 'The trick: "a central hub coordinating devices and reducing tangling" → Mediator.' } },
      { text: { ar: 'لعبة استراتيجية فيها وحدات كثيرة يجب أن تنسّق تحرّكاتها وهجماتها. بدل تواصل الوحدات مباشرة فيما بينها، تمرّ كل التنسيقات عبر "مدير معركة" مركزي يقلّل الاقتران بينها.', en: 'A strategy game with many units that must coordinate their moves and attacks. Instead of units talking directly to each other, all coordination passes through a central "battle manager" that reduces coupling between them.' },
        why: { ar: 'التريك: "مدير مركزي يقلّل التشابك بين الوحدات" → Mediator.', en: 'The trick: "a central manager reducing entanglement between units" → Mediator.' } }
    ]
  },

  {
    id: 'memento', name: 'Memento', nameAr: 'التذكار', category: 'Behavioral',
    icon: '💾', practical: false,
    intent: {
      ar: 'يتيح حفظ واستعادة الحالة الداخلية لكائن دون كشف تفاصيلها — لدعم التراجع (undo) أو اللقطات (snapshots).',
      en: 'Lets you save and restore an object\'s internal state without exposing its details — to support undo or snapshots.'
    },
    whenToUse: {
      ar: 'عندما تريد توفير ميزة "تراجع" أو حفظ نقاط استرجاع (checkpoints) لحالة كائن، مع الحفاظ على تغليف حالته الداخلية.',
      en: 'When you want to provide undo or save restore points (checkpoints) of an object\'s state, while preserving its encapsulation.'
    },
    principle: {
      ar: 'يحافظ على التغليف (الحالة لا تُكشف للخارج) · المسؤولية الواحدة (يفصل حفظ الحالة عن منطق العمل).',
      en: 'Preserves encapsulation (state isn\'t exposed) · SRP (separates state saving from business logic).'
    },
    keyword: { ar: 'حفظ/استعادة حالة · لقطة (snapshot) · نقاط استرجاع · undo', en: 'save/restore state · snapshot · checkpoints · undo' },
    howItWorks: {
      ar: 'Originator يُنشئ Memento يحمل لقطة من حالته ويستعيدها منه. Caretaker يحتفظ بقائمة الـ Mementos (التاريخ) دون النظر في محتواها. الاستعادة تعيد الـ Originator لحالة سابقة.',
      en: 'The Originator creates a Memento holding a snapshot of its state and restores from it. A Caretaker keeps a list of Mementos (history) without inspecting their contents. Restoring returns the Originator to a previous state.'
    },
    limitations: {
      ar: 'قد يستهلك ذاكرة كبيرة إن كانت اللقطات كثيرة أو ضخمة · على الـ Caretaker إدارة دورة حياة اللقطات.',
      en: 'Can consume a lot of memory if snapshots are many or large · the caretaker must manage snapshot lifecycle.'
    },
    scenarios: [
      { text: { ar: 'محرّر رسم أو نص يحتاج لحفظ حالاته السابقة بحيث يمكن للمستخدم التراجع (undo) والعودة إلى أي حالة سابقة لاحقاً. يجب أن تُحفظ الحالة الداخلية للكائن وتُستعاد دون كشف تفاصيلها للخارج.', en: 'A drawing or text editor needs to save its previous states so the user can undo and return to any earlier state later. The object\'s internal state must be saved and restored without exposing its details externally.' },
        why: { ar: 'التريك: "حفظ/استعادة الحالة لدعم undo مع الحفاظ على التغليف" → Memento.', en: 'The trick: "save/restore state for undo while preserving encapsulation" → Memento.' } },
      { text: { ar: 'لعبة فيديو تحفظ نقاط استرجاع (checkpoints/save points) يعود إليها اللاعب عند الخسارة. يجب تخزين حالة اللعبة بالكامل في لقطة واستعادتها دون أن يطّلع الكائن الحافظ على تفاصيلها الداخلية.', en: 'A video game saves checkpoints/save points the player returns to upon losing. The full game state must be stored in a snapshot and restored without the holding object inspecting its internal details.' },
        why: { ar: 'التريك: "لقطة لحالة اللعبة تُستعاد دون كشف داخلها" → Memento.', en: 'The trick: "a snapshot of the game state restored without exposing its internals" → Memento.' } },
      { text: { ar: 'نموذج إدخال طويل (form) يحفظ مسوّدات تلقائية كل فترة، بحيث يستطيع المستخدم الرجوع إلى أي مسوّدة سابقة لو أخطأ أو أراد التراجع، دون أن تكشف المسوّدة بنية النموذج الداخلية.', en: 'A long input form auto-saves drafts periodically, so the user can revert to any previous draft if they make a mistake or want to undo, without the draft exposing the form\'s internal structure.' },
        why: { ar: 'التريك: "كل مسوّدة لقطة قابلة للاستعادة دون كشف البنية" → Memento.', en: 'The trick: "each draft is a restorable snapshot that doesn\'t expose the structure" → Memento.' } },
      { text: { ar: 'محرّر إعدادات يتيح للمستخدم تجربة تغييرات ثم "استعادة الإعدادات السابقة" إن لم تعجبه. يجب حفظ حالة الإعدادات قبل التغيير واستعادتها عند الطلب.', en: 'A settings editor lets the user try changes then "restore previous settings" if they don\'t like them. The settings state must be saved before the change and restored on demand.' },
        why: { ar: 'التريك: "حفظ حالة الإعدادات واستعادتها عند الطلب" → Memento.', en: 'The trick: "save the settings state and restore it on demand" → Memento.' } },
      { text: { ar: 'تطبيق رسم مخطّطات يدعم أزرار "رجوع/تقدّم" (back/forward) عبر تاريخ من الحالات المتتابعة، يديره كائن حافظ يحتفظ بقائمة اللقطات دون النظر في محتواها.', en: 'A diagramming app supports back/forward buttons through a history of successive states, managed by a caretaker object that keeps a list of snapshots without inspecting their content.' },
        why: { ar: 'التريك: "تاريخ من اللقطات يديره caretaker للرجوع/التقدّم" → Memento.', en: 'The trick: "a history of snapshots managed by a caretaker for back/forward" → Memento.' } },
      { text: { ar: 'برنامج محاكاة (simulation) يتيح العودة إلى لحظة سابقة لإعادة تشغيل التجربة من تلك النقطة. يجب أخذ لقطة لحالة المحاكاة الكاملة واستعادتها عند الطلب دون كشف تفاصيلها.', en: 'A simulation program allows rolling back to an earlier moment to re-run the experiment from that point. A snapshot of the full simulation state must be taken and restored on demand without exposing its details.' },
        why: { ar: 'التريك: "لقطة لحالة المحاكاة تُستعاد للعودة لنقطة سابقة" → Memento.', en: 'The trick: "a snapshot of the simulation state restored to roll back to an earlier point" → Memento.' } }
    ]
  },

  {
    id: 'observer', name: 'Observer', nameAr: 'المُراقِب', category: 'Behavioral',
    icon: '📡', practical: true, practicalId: 'observer',
    intent: {
      ar: 'يعرّف علاقة واحد-لمتعدّد، فعند تغيّر حالة الكائن (Subject) يُبلَّغ كل المشتركين (Observers) تلقائياً.',
      en: 'Defines a one-to-many relationship so that when one object (Subject) changes state, all its subscribers (Observers) are notified automatically.'
    },
    whenToUse: {
      ar: 'عندما تحتاج لإبلاغ عدة كائنات بتغيّر حدث، مع قائمة مشتركين تتغيّر وقت التشغيل (تُضاف وتُحذف) ودون ربط الـ Subject بأنواعهم.',
      en: 'When you must notify multiple objects of a change, with a subscriber list that changes at runtime (add/remove) and without coupling the Subject to their types.'
    },
    principle: {
      ar: 'فضّل التركيب على الوراثة · البرمجة وفق المواصفات · Open/Closed (مشتركون جدد دون تعديل الـ Subject).',
      en: 'Favor composition over inheritance · program to specifications · Open/Closed (new subscribers without modifying the Subject).'
    },
    keyword: { ar: 'إبلاغ عدة كائنات · اشتراك/إلغاء (subscribe) · واحد-لمتعدّد · بثّ التحديثات', en: 'notify multiple objects · subscribe/unsubscribe · one-to-many · broadcast updates' },
    howItWorks: {
      ar: 'واجهة Subject (subscribe/unsubscribe/notify) + واجهة Observer فيها update() + Subject فعلي يحتفظ بقائمة Observers ويلفّ عليها مستدعياً update() عند كل تغيير.',
      en: 'A Subject interface (subscribe/unsubscribe/notify) + an Observer interface with update() + a concrete Subject holding a list of Observers and looping over it calling update() on every change.'
    },
    limitations: {
      ar: 'ترتيب الإبلاغ غير مضمون · قد تحدث تحديثات متسلسلة (cascading) يصعب تتبّعها · تسريب ذاكرة إن لم يُلغَ الاشتراك.',
      en: 'Notification order isn\'t guaranteed · cascading updates can be hard to trace · memory leaks if unsubscribing is forgotten.'
    },
    scenarios: [
      { text: { ar: 'بنى مطوّر موقع مزادات، ويريد إضافة ميزة تتبّع أسعار العناصر وإبلاغ المستخدمين المشتركين في الخطط المدفوعة عبر SMS أو Email أو إشعارات Push. يبحث عن حلّ مرن وقابل للتوسّع يبثّ الرسائل لهم بكفاءة كلما تغيّر السعر، مع إمكانية إضافة مشتركين أو إزالتهم.', en: 'A developer built an auction website and wants to add a feature to track item prices and notify users on paid plans via SMS, Email, or Push notifications. He is looking for a flexible, extensible solution that broadcasts messages to them efficiently whenever a price changes, with the ability to add or remove subscribers.' },
        why: { ar: 'التريك الحرفي من الاختبار: "إبلاغ عدة مشتركين بتغيّر + مرن وقابل للتوسّع + قائمة تتغيّر" → Observer.', en: 'The literal exam trick: "notify multiple subscribers of a change + flexible and extensible + a changing list" → Observer.' } },
      { text: { ar: 'نظام إنذار جامعي يرسل رسائل تحذير إلى عدة منصّات في حالة الطوارئ: Twitter و WhatsApp و Slack و Email. عند وقوع حدث طارئ يجب أن تُبلَّغ كل المنصّات المشتركة دفعة واحدة، مع إمكانية اشتراك منصّات جديدة أو إلغاء اشتراكها وقت التشغيل.', en: 'A university alert system sends warning messages to several platforms in an emergency: Twitter, WhatsApp, Slack, and Email. When an emergency occurs, all subscribed platforms must be notified at once, with the ability to subscribe new platforms or unsubscribe at runtime.' },
        why: { ar: 'التريك: "الحدث يُبثّ لكل المشتركين دفعة واحدة + اشتراك/إلغاء وقت التشغيل" → Observer.', en: 'The trick: "the event is broadcast to all subscribers at once + subscribe/unsubscribe at runtime" → Observer.' } },
      { text: { ar: 'لوحة عرض أسهم: عند تغيّر سعر سهم يجب أن تتحدّث كل العناصر المعروضة تلقائياً (الرسم البياني، الجدول، التنبيه). كل عنصر عرض يشترك في بيانات السهم ويُبلَّغ فور تغيّرها — وهي العلاقة بين Model و View في معمارية MVC.', en: 'A stock dashboard: when a stock price changes, all displayed elements must update automatically (the chart, the table, the alert). Each display element subscribes to the stock data and is notified the moment it changes — this is the Model–View relationship in MVC.' },
        why: { ar: 'التريك: "العناصر تشترك في الـ Subject وتُبلَّغ بالتغيير" → Observer (أساس علاقة Model↔View في MVC).', en: 'The trick: "elements subscribe to the Subject and are notified of changes" → Observer (the basis of Model↔View in MVC).' } },
      { text: { ar: 'لعبة: عند تجاوز اللاعب لمعدّل نقاط معيّن يجب إبلاغ كل المعجبين (Fans) المتابعين له برسالة تهنئة. عدد المعجبين يتغيّر باستمرار (ينضمّون ويغادرون)، ويجب أن يُبلَّغوا تلقائياً عند تغيّر نقاط اللاعب.', en: 'A game: when a player exceeds a certain points average, all fans following them must be notified with a congratulatory message. The number of fans changes constantly (they join and leave), and they must be notified automatically when the player\'s points change.' },
        why: { ar: 'التريك: "المعجبون مشتركون متغيّرون يُبلَّغون عند تغيّر النقاط" → Observer.', en: 'The trick: "fans are changing subscribers notified when points change" → Observer.' } },
      { text: { ar: 'محطّة طقس تبثّ قراءاتها الجديدة (حرارة، رطوبة، ضغط) لعدّة شاشات عرض مختلفة. عند وصول قراءة جديدة يجب أن تتحدّث كل الشاشات المشتركة تلقائياً دون أن تعرف المحطّة أنواع الشاشات.', en: 'A weather station broadcasts its new readings (temperature, humidity, pressure) to several different displays. When a new reading arrives, all subscribed displays must update automatically without the station knowing the display types.' },
        why: { ar: 'التريك: "المحطّة Subject والشاشات Observers تُبلَّغ تلقائياً" → Observer.', en: 'The trick: "the station is the Subject and displays are Observers notified automatically" → Observer.' } },
      { text: { ar: 'تطبيق متابعة على شبكة اجتماعية: عند نشر مستخدم محتوى جديداً يجب إبلاغ كل متابعيه. علاقة واحد-لمتعدّد، والمتابعون يتغيّرون باستمرار، ويجب أن يصلهم التحديث فور النشر.', en: 'A social-media follow app: when a user posts new content, all their followers must be notified. A one-to-many relationship where followers change constantly and must receive the update as soon as the post is made.' },
        why: { ar: 'التريك: "واحد-لمتعدّد مع مشتركين متغيّرين يُبلَّغون بالتحديث" → Observer.', en: 'The trick: "one-to-many with changing subscribers notified of updates" → Observer.' } }
    ]
  },

  {
    id: 'state', name: 'State', nameAr: 'الحالة', category: 'Behavioral',
    icon: '🔀', practical: false,
    intent: {
      ar: 'يتيح لكائن تغيير سلوكه عند تغيّر حالته الداخلية، وكأنه غيّر كلاسه.',
      en: 'Lets an object alter its behavior when its internal state changes, as if it changed its class.'
    },
    whenToUse: {
      ar: 'عندما يكون لكائن سلوك يعتمد على حالته، ويتنقّل بين حالات كثيرة عبر جُمل if/switch ضخمة — فتُحوَّل كل حالة إلى كلاس مستقل.',
      en: 'When an object\'s behavior depends on its state and it transitions between many states via huge if/switch blocks — turn each state into its own class.'
    },
    principle: {
      ar: 'المسؤولية الواحدة (كل حالة كلاس) · Open/Closed (حالات جديدة دون تعديل البقية) · يزيل if/switch الضخمة.',
      en: 'SRP (each state is a class) · Open/Closed (new states without modifying others) · removes huge if/switch.'
    },
    keyword: { ar: 'السلوك يتغيّر حسب الحالة · آلة حالات (state machine) · انتقالات بين حالات', en: 'behavior changes with state · state machine · transitions between states' },
    howItWorks: {
      ar: 'واجهة State فيها الدوال المعتمدة على الحالة + كلاسات حالة فعلية تنفّذ السلوك الخاص بها وقد تحوّل الـ Context لحالة أخرى + Context يحتفظ بمرجع للحالة الحالية ويفوّض لها.',
      en: 'A State interface with the state-dependent methods + concrete state classes implementing their behavior and possibly switching the Context to another state + a Context holding a reference to the current state and delegating to it.'
    },
    limitations: {
      ar: 'مبالغة إن كانت الحالات قليلة وثابتة · يزيد عدد الكلاسات.',
      en: 'Overkill if states are few and stable · increases the number of classes.'
    },
    scenarios: [
      { text: { ar: 'مشغّل وسائط له حالات متعدّدة (متوقّف، يعمل، متوقّف مؤقّتاً). نفس زر "تشغيل/إيقاف" يتصرّف بشكل مختلف تماماً حسب الحالة الحالية. الكود الحالي مليء بـ if/switch ضخمة تفحص الحالة في كل دالة. يريد المطوّر أن تحدّد كل حالة سلوكها الخاص وتنتقل للحالة التالية تلقائياً.', en: 'A media player has multiple states (stopped, playing, paused). The same play/pause button behaves completely differently depending on the current state. The current code is full of huge if/switch checking the state in every method. The developer wants each state to define its own behavior and transition to the next state automatically.' },
        why: { ar: 'التريك: "السلوك يتغيّر حسب الحالة + إزالة if/switch الضخمة + انتقالات تلقائية" → State.', en: 'The trick: "behavior changes with state + removing huge if/switch + automatic transitions" → State.' } },
      { text: { ar: 'طلب في متجر إلكتروني يتنقّل بين حالات: جديد، مدفوع، مُشحَن، مُسلَّم، ملغى. العمليات المسموحة وسلوك الطلب يختلفان جذرياً في كل حالة (لا يمكن شحن طلب غير مدفوع مثلاً). يريد الفريق آلة حالات صريحة بدل سلسلة if/switch.', en: 'An order in an e-commerce store transitions between states: new, paid, shipped, delivered, cancelled. The allowed operations and the order\'s behavior differ radically per state (you can\'t ship an unpaid order, for example). The team wants an explicit state machine instead of an if/switch chain.' },
        why: { ar: 'التريك: "آلة حالات للطلب تستبدل if/switch، سلوك مختلف لكل حالة" → State.', en: 'The trick: "a state machine for the order replacing if/switch, different behavior per state" → State.' } },
      { text: { ar: 'ماكينة بيع آلية تمرّ بحالات: في انتظار النقود، نقود مُدخَلة، اختيار المنتج، صرف المنتج. كل حالة تتصرّف بشكل مختلف عند الضغط على نفس الأزرار، وتنتقل للحالة التالية وفق منطق محدّد.', en: 'A vending machine goes through states: awaiting coins, coins inserted, product selected, dispensing. Each state behaves differently when the same buttons are pressed, and transitions to the next state per defined logic.' },
        why: { ar: 'التريك: "كل حالة كلاس مستقل بسلوكه وانتقالاته" → State.', en: 'The trick: "each state is its own class with its behavior and transitions" → State.' } },
      { text: { ar: 'إشارة مرور تنتقل دورياً بين حالات (أحمر → أخضر → أصفر)، ولكل لون سلوك وتوقيت مختلف، وتنتقل تلقائياً للحالة التالية. يريد المطوّر تمثيل كل لون كحالة مستقلة تعرف الحالة التي تليها.', en: 'A traffic light cycles between states (red → green → yellow), each color having different behavior and timing, transitioning automatically to the next. The developer wants to represent each color as an independent state that knows the next one.' },
        why: { ar: 'التريك: "آلة حالات صريحة لكل لون يعرف التالي" → State.', en: 'The trick: "an explicit state machine where each color knows the next" → State.' } },
      { text: { ar: 'وثيقة في نظام إدارة محتوى لها حالات: مسوّدة، قيد المراجعة، منشورة، مؤرشفة. العمليات المسموحة تختلف بحسب الحالة (لا يمكن نشر وثيقة لم تُراجَع). يريد الفريق أن تحدّد كل حالة العمليات المتاحة فيها.', en: 'A document in a CMS has states: draft, under review, published, archived. The allowed operations differ by state (you can\'t publish an unreviewed document). The team wants each state to define the operations available in it.' },
        why: { ar: 'التريك: "كل حالة تحدّد العمليات المسموحة فيها" → State.', en: 'The trick: "each state defines the operations allowed in it" → State.' } },
      { text: { ar: 'شخصية في لعبة لها حالات (طبيعي، مُعزَّز بقوة خاصة، مُصاب) تغيّر ردود فعلها على نفس المدخلات: في الحالة المُعزَّزة تكون الهجمات أقوى، وفي حالة الإصابة تكون أبطأ. تنتقل الشخصية بين الحالات تلقائياً حسب أحداث اللعبة.', en: 'A game character has states (normal, powered-up, injured) that change its reactions to the same inputs: in the powered-up state attacks are stronger, and in the injured state it is slower. The character transitions between states automatically based on game events.' },
        why: { ar: 'التريك: "الحالة تبدّل سلوك الشخصية تلقائياً مع نفس المدخلات" → State.', en: 'The trick: "the state switches the character\'s behavior automatically for the same inputs" → State.' } }
    ]
  },

  {
    id: 'strategy', name: 'Strategy', nameAr: 'الاستراتيجية', category: 'Behavioral',
    icon: '🎯', practical: true, practicalId: 'strategy',
    intent: {
      ar: 'يعرّف عائلة من الخوارزميات، يغلّف كلاً منها، ويجعلها قابلة للتبديل وقت التشغيل.',
      en: 'Defines a family of algorithms, encapsulates each, and makes them interchangeable at runtime.'
    },
    whenToUse: {
      ar: 'عندما يكون لديك عدة طرق (خوارزميات) لتنفيذ عملية واحدة، وتريد اختيار/تبديل الطريقة ديناميكياً دون if-else، مع سهولة إضافة طرق جديدة.',
      en: 'When you have several ways (algorithms) to perform one operation and want to pick/swap them dynamically without if-else, while easily adding new ones.'
    },
    principle: {
      ar: 'فضّل التركيب على الوراثة · البرمجة وفق المواصفات · Open/Closed · يزيل if-else للسلوك.',
      en: 'Favor composition over inheritance · program to specifications · Open/Closed · removes behavior if-else.'
    },
    keyword: { ar: 'اختيار خوارزمية وقت التشغيل · خوارزميات مختلفة قابلة للتبديل · ديناميكياً', en: 'select algorithm at runtime · different interchangeable algorithms · dynamically' },
    howItWorks: {
      ar: 'واجهة Strategy فيها دالة العملية + استراتيجيات فعلية تنفّذها بطرق مختلفة + Context يستقبل الاستراتيجية (كبارامتر أو حقل) ويفوّض لها التنفيذ، فيمكن تبديلها وقت التشغيل.',
      en: 'A Strategy interface with the operation method + concrete strategies implementing it differently + a Context that receives the strategy (as a parameter or field) and delegates execution to it, allowing runtime swapping.'
    },
    limitations: {
      ar: 'على العميل معرفة الاختلاف بين الاستراتيجيات لاختيار المناسبة · يزيد عدد الكلاسات · أحياناً يكفي lambda بدلاً منه.',
      en: 'The client must know the difference between strategies to choose · increases the number of classes · sometimes a lambda suffices instead.'
    },
    scenarios: [
      { text: { ar: 'يحتاج مطوّر إضافة طريقة دفع لتطبيقها، وتدرس استخدام بطاقات الائتمان أو Apple Pay أو Google Pay. تفاصيل تنفيذ كل طريقة تستخدم خوارزميات مختلفة. تبحث عن نمط يساعد في اختيار وتبديل طريقة الدفع ديناميكياً وقت التشغيل.', en: 'A developer needs to add a payment method to her app and is considering credit cards, Apple Pay, or Google Pay. The implementation details of each method use different algorithms. She is looking for a pattern that helps select and change the payment method dynamically at runtime.' },
        why: { ar: 'التريك الحرفي من الاختبار: "طرق مختلفة بخوارزميات مختلفة تُختار وتُبدَّل ديناميكياً وقت التشغيل" → Strategy.', en: 'The literal exam trick: "different methods with different algorithms selected and swapped dynamically at runtime" → Strategy.' } },
      { text: { ar: 'تطبيق مشاركة صور فيه كلاس Photo، ويستطيع المستخدم مشاركة الصور بطرق مختلفة (Bluetooth، Gmail، Messages، WhatsApp). الكود الحالي فيه سلسلة if-else طويلة داخل Photo تفحص نوع المشاركة، مما يكسر مبدأ Open/Closed. يريد المطوّر اختيار طريقة المشاركة وقت الاستخدام.', en: 'A photo-sharing app has a Photo class, and the user can share photos in different ways (Bluetooth, Gmail, Messages, WhatsApp). The current code has a long if-else inside Photo checking the share type, breaking the Open/Closed principle. The developer wants to choose the share method at use time.' },
        why: { ar: 'التريك: "عدة طرق لنفس العملية تُختار وقت التشغيل + إزالة if-else" → Strategy.', en: 'The trick: "several ways for the same operation chosen at runtime + removing if-else" → Strategy.' } },
      { text: { ar: 'محرّك ضغط ملفات يتيح للمستخدم اختيار خوارزمية الضغط المناسبة (ZIP، RAR، GZIP) حسب الحاجة. كل خوارزمية مغلّفة على حدة، ويمكن إضافة خوارزمية جديدة مستقبلاً دون تعديل الكود الذي يستخدمها.', en: 'A file-compression engine lets the user choose the appropriate compression algorithm (ZIP, RAR, GZIP) as needed. Each algorithm is encapsulated separately, and a new one can be added in the future without modifying the code that uses it.' },
        why: { ar: 'التريك: "كل خوارزمية ضغط مغلّفة وقابلة للتبديل" → Strategy.', en: 'The trick: "each compression algorithm is encapsulated and swappable" → Strategy.' } },
      { text: { ar: 'تطبيق ملاحة يحسب المسار بطرق مختلفة حسب تفضيل المستخدم: الأسرع، الأقصر، أو تجنّب الطرق ذات الرسوم. يجب اختيار خوارزمية حساب المسار وقت التشغيل وتبديلها بسهولة.', en: 'A navigation app computes routes in different ways based on user preference: fastest, shortest, or avoid tolls. The route-computation algorithm must be selected at runtime and swapped easily.' },
        why: { ar: 'التريك: "كل طريقة حساب مسار خوارزمية قابلة للتبديل وقت التشغيل" → Strategy.', en: 'The trick: "each route-computation method is a swappable algorithm at runtime" → Strategy.' } },
      { text: { ar: 'نظام ترتيب (sorting) يجب أن يختار خوارزمية الترتيب الأنسب حسب حجم البيانات وقت التشغيل: خوارزمية سريعة للبيانات الكبيرة وأخرى بسيطة للصغيرة. يريد المطوّر تبديل الخوارزمية ديناميكياً دون if-else.', en: 'A sorting system must choose the most suitable sort algorithm based on data size at runtime: a fast algorithm for large data and a simple one for small. The developer wants to swap the algorithm dynamically without if-else.' },
        why: { ar: 'التريك: "تبديل خوارزمية الترتيب ديناميكياً حسب الظرف" → Strategy.', en: 'The trick: "swap the sort algorithm dynamically based on circumstances" → Strategy.' } },
      { text: { ar: 'متجر يطبّق سياسات خصم مختلفة حسب العرض النشط: خصم بنسبة مئوية، أو مبلغ ثابت، أو "اشترِ واحداً واحصل على آخر". يجب اختيار سياسة الخصم وتبديلها وقت التشغيل، مع سهولة إضافة سياسات جديدة.', en: 'A store applies different discount policies based on the active offer: a percentage discount, a fixed amount, or "buy one get one." The discount policy must be selected and swapped at runtime, with new policies easy to add.' },
        why: { ar: 'التريك: "كل سياسة خصم خوارزمية قابلة للتبديل وقت التشغيل" → Strategy.', en: 'The trick: "each discount policy is a swappable algorithm at runtime" → Strategy.' } }
    ]
  },

  {
    id: 'template', name: 'Template Method', nameAr: 'دالة القالب', category: 'Behavioral',
    icon: '📐', practical: false,
    intent: {
      ar: 'يعرّف هيكل خوارزمية في دالة أب، ويترك بعض الخطوات للكلاسات الفرعية لتعيد تعريفها دون تغيير الهيكل العام.',
      en: 'Defines the skeleton of an algorithm in a parent method, deferring some steps to subclasses to redefine without changing the overall structure.'
    },
    whenToUse: {
      ar: 'عندما تتبع عدة عمليات نفس التسلسل الثابت من الخطوات، وتختلف فقط في تفاصيل خطوة أو خطوتين — فتثبّت الهيكل في الأب وتترك الخطوات المتغيّرة للأبناء.',
      en: 'When several processes follow the same fixed sequence of steps and differ only in one or two step details — fix the skeleton in the parent and leave varying steps to subclasses.'
    },
    principle: {
      ar: 'يضمن ثبات ترتيب العمليات (الأب يتحكّم بالتسلسل) · يزيل الكود المكرّر · Open/Closed عبر الوراثة.',
      en: 'Guarantees a fixed order of operations (the parent controls the sequence) · removes duplicate code · Open/Closed via inheritance.'
    },
    keyword: { ar: 'عملية ثابتة الهيكل · إعادة تعريف خطوات فقط · نفس التسلسل · القالب يثبّت الترتيب', en: 'fixed-structure process · override steps only · same sequence · the template fixes the order' },
    howItWorks: {
      ar: 'كلاس مجرّد فيه دالة قالب final تستدعي خطوات بترتيب ثابت، بعضها مُنفَّذ وبعضها abstract. الكلاسات الفرعية تعيد تعريف الخطوات المتغيّرة فقط دون لمس الترتيب العام.',
      en: 'An abstract class with a final template method calling steps in a fixed order, some implemented and some abstract. Subclasses override only the varying steps without touching the overall order.'
    },
    limitations: {
      ar: 'مقيّد بالوراثة (اقتران أقوى من Strategy) · صعوبة عند الحاجة لتغيير الهيكل نفسه · قد يخالف Liskov إن أساء الأبناء التنفيذ.',
      en: 'Constrained by inheritance (tighter coupling than Strategy) · hard when the skeleton itself must change · may violate Liskov if subclasses misbehave.'
    },
    scenarios: [
      { text: { ar: 'نظام يولّد تقارير المبيعات والمخزون والموظّفين. كل التقارير تتبع نفس العملية الثابتة: جلب البيانات، حساب المقاييس، تنسيق المخرجات، وحفظ الملف. الكلاس الأب يحدّد هيكل هذه العملية، وتختلف خطوة الحساب فقط. تستطيع الكلاسات الفرعية إعادة تعريف خطوة الحساب دون تغيير الهيكل العام.', en: 'A system generates Sales, Inventory, and Employee reports. All reports follow the same fixed process: fetch data, calculate metrics, format output, and save file. The parent class defines the structure of this process, and only the calculation step differs. Subclasses can override the calculation step without changing the overall structure.' },
        why: { ar: 'التريك الحرفي من الاختبار: "عملية ثابتة الهيكل + الأب يحدّد البنية + خطوة واحدة تختلف + الأبناء يعيدون تعريفها دون تغيير الهيكل" → Template Method.', en: 'The literal exam trick: "fixed-structure process + parent defines the structure + only one step differs + subclasses override it without changing the structure" → Template Method.' } },
      { text: { ar: 'كلاس Teacher مجرّد فيه دالة teach() نهائية (final) تستدعي بالترتيب: prepareLecture()، ثم teachLecture()، ثم evaluateStudents(). كل نوع معلّم (رياضيات، فيزياء) يعيد تعريف هذه الخطوات بطريقته، لكن ترتيب التدريس يبقى ثابتاً دائماً.', en: 'An abstract Teacher class has a final teach() method that calls in order: prepareLecture(), then teachLecture(), then evaluateStudents(). Each teacher type (math, physics) overrides these steps in its own way, but the teaching order always stays fixed.' },
        why: { ar: 'التريك الحرفي من الاختبار: "دالة قالب final تثبّت ترتيب الخطوات والأبناء يحدّدونها" → Template Method.', en: 'The literal exam trick: "a final template method fixing the step order while subclasses define them" → Template Method.' } },
      { text: { ar: 'عملية تسجيل دخول تتبع ترتيباً ثابتاً: signin() ثم do2FactorAuth(). طريقة الدخول قد تختلف (Google، Facebook، اسم مستخدم)، وطريقة التحقّق الثنائي قد تختلف (SMS، Email، مفتاح أمان)، لكن القالب يضمن دائماً تنفيذ الدخول أولاً ثم التحقّق الثنائي بنفس الترتيب.', en: 'A login process follows a fixed order: signin() then do2FactorAuth(). The sign-in method may differ (Google, Facebook, username), and the 2FA method may differ (SMS, Email, security key), but the template always ensures sign-in runs first then 2FA, in the same order.' },
        why: { ar: 'مثال النوتة حرفياً: "Template always ensures the order of operations" — القالب يثبّت ترتيب signin ثم 2FA → Template Method.', en: 'The notes\' literal example: "Template always ensures the order of operations" — the template fixes the order signin then 2FA → Template Method.' } },
      { text: { ar: 'عملية معالجة بيانات تتبع تسلسلاً ثابتاً: قراءة الملف، ثم تحليله، ثم حفظ النتيجة. خطوة التحليل فقط تختلف حسب نوع الملف (CSV، JSON)، بينما يبقى ترتيب الخطوات الكلّي ثابتاً يحدّده الكلاس الأب.', en: 'A data-processing operation follows a fixed sequence: read the file, parse it, then save the result. Only the parse step differs by file type (CSV, JSON), while the overall step order stays fixed and is defined by the parent class.' },
        why: { ar: 'التريك: "تسلسل ثابت مع خطوة تحليل متغيّرة فقط" → Template Method.', en: 'The trick: "a fixed sequence with only the parse step varying" → Template Method.' } },
      { text: { ar: 'خوارزميات ألعاب لوحية تتبع نفس الدورة الثابتة: تهيئة اللوحة، تنفيذ دورات اللعب، إعلان الفائز. ما يختلف هو قواعد كل لعبة فقط، بينما يبقى هيكل الدورة العام ثابتاً في الكلاس الأب.', en: 'Board-game algorithms follow the same fixed cycle: initialize the board, run play turns, declare the winner. Only the rules of each game differ, while the overall cycle structure stays fixed in the parent class.' },
        why: { ar: 'التريك: "دورة اللعبة ثابتة الهيكل والقواعد تُعاد تعريفها" → Template Method.', en: 'The trick: "the game cycle is fixed in structure while rules are redefined" → Template Method.' } },
      { text: { ar: 'خط بناء برمجي (build pipeline) يتبع ترتيباً ثابتاً: جلب الكود، ترجمته، اختباره، نشره. تفاصيل كل خطوة قد تُخصَّص حسب المشروع، لكن ترتيب المراحل يبقى ثابتاً يفرضه الكلاس الأب.', en: 'A software build pipeline follows a fixed order: fetch the code, compile it, test it, deploy it. The details of each step may be customized per project, but the stage order stays fixed, enforced by the parent class.' },
        why: { ar: 'التريك: "ترتيب المراحل ثابت والتفاصيل تُعاد تعريفها" → Template Method.', en: 'The trick: "the stage order is fixed while details are redefined" → Template Method.' } }
    ]
  },

  {
    id: 'visitor', name: 'Visitor', nameAr: 'الزائر', category: 'Behavioral',
    icon: '🚶', practical: false,
    intent: {
      ar: 'يتيح إضافة عمليات جديدة على مجموعة كائنات دون تعديل كلاساتها، بفصل العملية عن بنية الكائنات.',
      en: 'Lets you add new operations to a set of objects without modifying their classes, by separating the operation from the object structure.'
    },
    whenToUse: {
      ar: 'عندما تريد إضافة وظائف جديدة (مؤقّتة أو متعدّدة) على بنية كائنات مستقرّة دون تعديل كلاساتها — تجمع المنطق المتعلّق بكل عملية في "زائر" واحد.',
      en: 'When you want to add new (temporary or many) operations over a stable object structure without modifying their classes — gathering the logic of each operation in a single "visitor".'
    },
    principle: {
      ar: 'Open/Closed (عمليات جديدة دون تعديل الكلاسات) · المسؤولية الواحدة (تجميع كل عملية في مكان واحد).',
      en: 'Open/Closed (new operations without modifying classes) · SRP (each operation gathered in one place).'
    },
    keyword: { ar: 'إضافة عملية جديدة دون تعديل الكلاسات · فصل العملية عن البنية · سلوك إضافي مؤقّت', en: 'add a new operation without changing classes · separate operation from structure · temporary extra behavior' },
    howItWorks: {
      ar: 'واجهة Visitor فيها visit() لكل نوع عنصر + عناصر فيها دالة accept(visitor) تستدعي visit المناسب (double dispatch). إضافة عملية = زائر جديد فقط دون لمس العناصر.',
      en: 'A Visitor interface with a visit() per element type + elements with an accept(visitor) method calling the right visit (double dispatch). Adding an operation = just a new visitor, untouched elements.'
    },
    limitations: {
      ar: 'إضافة نوع عنصر جديد تتطلّب تعديل كل الزوّار · يكسر التغليف أحياناً (الزائر يحتاج الوصول لتفاصيل العناصر).',
      en: 'Adding a new element type requires changing every visitor · can break encapsulation (the visitor needs access to element internals).'
    },
    scenarios: [
      { text: { ar: 'تطبيق يستخدم مكتبة طرف ثالث جاهزة للتعامل مع تسجيل الدخول والتسجيل. لا تتضمّن المكتبة كتابة رسائل سجلّ لمحاولات الدخول. يحتاج المطوّر إضافة وظيفة جديدة (سلوك إضافي) مثل التسجيل، بشكل مؤقّت ودون أي تغيير في كلاسات المكتبة.', en: 'An app uses a ready third-party library for login and signup. The library does not include writing log messages for login attempts. The developer needs to add a new function (extra behavior) such as logging, temporarily and without any change to the library\'s classes.' },
        why: { ar: 'التريك الحرفي من الاختبار: "إضافة وظيفة جديدة مؤقّتة دون أي تغيير في الكلاسات" → Visitor.', en: 'The literal exam trick: "add a new function temporarily without any change in the classes" → Visitor.' } },
      { text: { ar: 'مترجم برمجي يبني شجرة بناء مجرّدة (AST) من الكود. يريد الفريق تطبيق عمليات متعدّدة عليها (طباعة، تحقّق من الأنواع، تحسين الكود، توليد كود)، وإضافة عملية جديدة لاحقاً دون تعديل كلاسات عقد الشجرة.', en: 'A compiler builds an abstract syntax tree (AST) from code. The team wants to apply multiple operations on it (printing, type checking, optimization, code generation), and add a new operation later without modifying the tree-node classes.' },
        why: { ar: 'التريك: "عمليات متعدّدة على بنية ثابتة، كل عملية زائر مستقل" → Visitor.', en: 'The trick: "multiple operations over a stable structure, each operation a separate visitor" → Visitor.' } },
      { text: { ar: 'بنية أشكال هندسية مستقرّة (دائرة، مربع، مثلث). يريد الفريق إضافة عمليات جديدة عليها (حساب المساحة، التصدير إلى XML، الرسم) دون تعديل كلاسات الأشكال نفسها، وتجميع منطق كل عملية في مكان واحد.', en: 'A stable shapes structure (circle, square, triangle). The team wants to add new operations on it (compute area, export to XML, render) without modifying the shape classes themselves, gathering each operation\'s logic in one place.' },
        why: { ar: 'التريك: "العملية تُجمَّع في زائر بدل توزيعها على الأشكال دون تعديلها" → Visitor.', en: 'The trick: "the operation is gathered in a visitor instead of spread across shapes without modifying them" → Visitor.' } },
      { text: { ar: 'نظام ملفات مستقرّ يريد الفريق تطبيق عمليات متعدّدة على كل عناصره (حساب الحجم، البحث، توليد تقرير صلاحيات، فحص الفيروسات) دون تعديل كلاسات الملفات والمجلّدات.', en: 'A stable file system where the team wants to apply multiple operations over all its elements (compute size, search, generate a permissions report, virus scan) without modifying the file and folder classes.' },
        why: { ar: 'التريك: "زائر لكل عملية يمرّ على عناصر النظام دون تعديلها" → Visitor.', en: 'The trick: "a visitor per operation traversing the system elements without modifying them" → Visitor.' } },
      { text: { ar: 'نموذج مستند فيه عناصر (فقرات، صور، جداول). يريد الفريق تصدير المستند إلى صيغ متعدّدة (HTML، PDF، Markdown) دون تعديل كلاسات العناصر، بإضافة زائر تصدير جديد لكل صيغة.', en: 'A document model with elements (paragraphs, images, tables). The team wants to export the document to multiple formats (HTML, PDF, Markdown) without modifying the element classes, by adding a new export visitor per format.' },
        why: { ar: 'التريك: "كل صيغة تصدير زائر مستقل يُضاف دون لمس العناصر" → Visitor.', en: 'The trick: "each export format is a separate visitor added without touching the elements" → Visitor.' } },
      { text: { ar: 'محرّك تقارير ضريبية يطبّق حسابات مختلفة على أنواع منتجات ثابتة (طعام، إلكترونيات، خدمات). تتغيّر سياسات الحساب الضريبي سنوياً، ويريد الفريق إضافة سياسة حساب جديدة دون تعديل كلاسات المنتجات.', en: 'A tax-report engine applies different calculations to fixed product types (food, electronics, services). The tax-calculation policies change yearly, and the team wants to add a new calculation policy without modifying the product classes.' },
        why: { ar: 'التريك: "كل سياسة حساب زائر يُضاف دون تعديل المنتجات الثابتة" → Visitor.', en: 'The trick: "each calculation policy is a visitor added without modifying the fixed products" → Visitor.' } }
    ]
  }

]);

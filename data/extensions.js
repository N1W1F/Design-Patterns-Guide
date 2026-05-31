// ============================================================
// Extensions data: Comparisons, Achievements, Daily Challenges
// ============================================================

// ── 1) PATTERN COMPARISONS ───────────────────────────────────
window.COMPARISONS = [
  {
    id: 'factory-vs-builder',
    a: 'factory', b: 'builder',
    title: { ar: 'Factory مقابل Builder', en: 'Factory vs Builder' },
    summary: { ar: 'كلاهما ينشئ كائنات — الفرق في طريقة الإنشاء وعدد الخصائص', en: 'Both create objects — difference is HOW and how many params' },
    points: [
      { aspect: { ar: 'الغرض', en: 'Purpose' }, a: { ar: 'اختر نوع وأنشئ', en: 'Pick a class & create' }, b: { ar: 'ابنِ خطوة بخطوة', en: 'Construct piece by piece' } },
      { aspect: { ar: 'عدد الـ params', en: 'Parameters' }, a: { ar: 'قليل (غالباً 1)', en: 'Few (often 1)' }, b: { ar: 'كثير، أكثرها اختياري', en: 'Many, mostly optional' } },
      { aspect: { ar: 'النتيجة', en: 'Result' }, a: { ar: 'كائن مباشر', en: 'Direct instance' }, b: { ar: 'سلسلة fluent + build()', en: 'Fluent chain → build()' } },
      { aspect: { ar: 'Immutability', en: 'Immutability' }, a: { ar: 'حسب التصميم', en: 'Depends on design' }, b: { ar: 'عادة immutable', en: 'Usually immutable' } },
      { aspect: { ar: 'مثال', en: 'Example' }, a: { ar: 'ShapeFactory.get("circle")', en: 'ShapeFactory.get("circle")' }, b: { ar: 'Burger.Builder().cheese().build()', en: 'Burger.Builder().cheese().build()' } }
    ]
  },
  {
    id: 'decorator-vs-proxy',
    a: 'decorator', b: 'proxy',
    title: { ar: 'Decorator مقابل Proxy', en: 'Decorator vs Proxy' },
    summary: { ar: 'نفس البنية، نية مختلفة — Decorator يضيف، Proxy يتحكم', en: 'Same structure, different intent — Decorator adds, Proxy controls' },
    points: [
      { aspect: { ar: 'النية', en: 'Intent' }, a: { ar: 'أضف وظيفة جديدة', en: 'Add new behavior' }, b: { ar: 'تحكّم في الوصول', en: 'Control access' } },
      { aspect: { ar: 'يعرف العميل بوجوده؟', en: 'Client aware?' }, a: { ar: 'نعم — يلفّه عمداً', en: 'Yes — wraps intentionally' }, b: { ar: 'لا — شفاف تماماً', en: 'No — fully transparent' } },
      { aspect: { ar: 'يضيف ميزات؟', en: 'Adds features?' }, a: { ar: 'نعم (logging, encryption)', en: 'Yes (logging, encryption)' }, b: { ar: 'لا — نفس interface', en: 'No — same interface' } },
      { aspect: { ar: 'تركيب متعدد', en: 'Stacking' }, a: { ar: 'نعم (decorator سلسلة)', en: 'Yes (decorator chains)' }, b: { ar: 'نادراً', en: 'Rarely' } },
      { aspect: { ar: 'حالات الاستخدام', en: 'Use case' }, a: { ar: 'I/O streams, UI widgets', en: 'I/O streams, UI widgets' }, b: { ar: 'lazy load, auth, cache, RMI', en: 'lazy load, auth, cache, RMI' } }
    ]
  },
  {
    id: 'strategy-vs-state',
    a: 'strategy', b: 'observer',
    title: { ar: 'Strategy مقابل Observer', en: 'Strategy vs Observer' },
    summary: { ar: 'كلاهما يفصل سلوك عن كلاس — Strategy تبدّل خوارزمية، Observer ينشر إشعار', en: 'Both decouple behavior — Strategy swaps algorithm, Observer broadcasts notification' },
    points: [
      { aspect: { ar: 'الغرض', en: 'Purpose' }, a: { ar: 'تبديل خوارزمية', en: 'Swap an algorithm' }, b: { ar: 'بثّ تغيير للمشتركين', en: 'Broadcast change' } },
      { aspect: { ar: 'العلاقة', en: 'Relationship' }, a: { ar: 'Context يفوّض إلى Strategy واحدة', en: 'Context delegates to one Strategy' }, b: { ar: 'Subject إلى N observers', en: 'Subject → N observers' } },
      { aspect: { ar: 'الاتجاه', en: 'Direction' }, a: { ar: 'Context → Strategy', en: 'Context → Strategy' }, b: { ar: 'Subject → Observers', en: 'Subject → Observers' } },
      { aspect: { ar: 'متى تتغير؟', en: 'When changes?' }, a: { ar: 'عند طلب العميل', en: 'On client request' }, b: { ar: 'عند تغيير state', en: 'On state change' } },
      { aspect: { ar: 'مثال', en: 'Example' }, a: { ar: 'Sort comparators', en: 'Sort comparators' }, b: { ar: 'Event listeners', en: 'Event listeners' } }
    ]
  },
  {
    id: 'singleton-vs-prototype',
    a: 'singleton', b: 'prototype',
    title: { ar: 'Singleton مقابل Prototype', en: 'Singleton vs Prototype' },
    summary: { ar: 'نقيضان: واحد مشترك ضد نسخ مستقلة', en: 'Opposites: one shared vs many independent copies' },
    points: [
      { aspect: { ar: 'عدد الكائنات', en: 'Instance count' }, a: { ar: 'واحد فقط', en: 'Exactly one' }, b: { ar: 'كثير، حسب الحاجة', en: 'Many, on demand' } },
      { aspect: { ar: 'مشاركة الـ state', en: 'State sharing' }, a: { ar: 'كل التطبيق يشارك', en: 'Whole app shares' }, b: { ar: 'كل clone مستقل', en: 'Each clone independent' } },
      { aspect: { ar: 'كيفية الإنشاء', en: 'Creation' }, a: { ar: 'getInstance()', en: 'getInstance()' }, b: { ar: 'clone()', en: 'clone()' } },
      { aspect: { ar: 'Thread safety', en: 'Thread safety' }, a: { ar: 'صعب — race conditions', en: 'Tricky — race conditions' }, b: { ar: 'سهل — clones مستقلة', en: 'Easy — independent clones' } },
      { aspect: { ar: 'مثال', en: 'Example' }, a: { ar: 'Logger, DB pool', en: 'Logger, DB pool' }, b: { ar: 'Game enemies, UI widgets', en: 'Game enemies, UI widgets' } }
    ]
  },
  {
    id: 'adapter-vs-decorator',
    a: 'adapter', b: 'decorator',
    title: { ar: 'Adapter مقابل Decorator', en: 'Adapter vs Decorator' },
    summary: { ar: 'Adapter يغيّر الـ interface، Decorator يحافظ عليها', en: 'Adapter changes interface, Decorator keeps it' },
    points: [
      { aspect: { ar: 'الـ interface', en: 'Interface' }, a: { ar: 'يحوّل من شكل لآخر', en: 'Converts one to another' }, b: { ar: 'نفسها (transparent)', en: 'Same (transparent)' } },
      { aspect: { ar: 'الهدف', en: 'Goal' }, a: { ar: 'توافق بين أنظمة', en: 'System compatibility' }, b: { ar: 'إضافة ميزات', en: 'Add features' } },
      { aspect: { ar: 'متى يُستخدم؟', en: 'When?' }, a: { ar: 'بعد كتابة الكود (legacy)', en: 'Post-hoc (legacy)' }, b: { ar: 'بتصميم مسبق', en: 'By design upfront' } },
      { aspect: { ar: 'التركيب', en: 'Stacking' }, a: { ar: 'عادة طبقة واحدة', en: 'Usually one layer' }, b: { ar: 'سلاسل عميقة شائعة', en: 'Deep chains common' } }
    ]
  },
  {
    id: 'factory-vs-prototype',
    a: 'factory', b: 'prototype',
    title: { ar: 'Factory مقابل Prototype', en: 'Factory vs Prototype' },
    summary: { ar: 'Factory ينشئ من class، Prototype ينسخ من instance', en: 'Factory creates from class, Prototype clones from instance' },
    points: [
      { aspect: { ar: 'مصدر الإنشاء', en: 'Source' }, a: { ar: 'class جديدة', en: 'New class' }, b: { ar: 'instance موجود', en: 'Existing instance' } },
      { aspect: { ar: 'التكلفة', en: 'Cost' }, a: { ar: 'constructor كامل', en: 'Full constructor' }, b: { ar: 'نسخ سريع', en: 'Fast copy' } },
      { aspect: { ar: 'إضافة نوع جديد', en: 'New type' }, a: { ar: 'تعديل الـ Factory', en: 'Edit the Factory' }, b: { ar: 'إضافة prototype للـ registry', en: 'Add to prototype registry' } },
      { aspect: { ar: 'الأفضل لـ', en: 'Best for' }, a: { ar: 'أنواع محدودة معروفة', en: 'Few known types' }, b: { ar: 'تركيبات لا محدودة', en: 'Unlimited combinations' } }
    ]
  }
];

// ── 2) ACHIEVEMENTS ──────────────────────────────────────────
window.ACHIEVEMENTS = [
  { id: 'first-pattern', icon: '👶', xp: 10,
    name: { ar: 'الخطوة الأولى', en: 'First Step' },
    desc: { ar: 'افتح أول نمط', en: 'Open your first pattern' } },
  { id: 'explorer', icon: '🧭', xp: 50,
    name: { ar: 'مستكشف', en: 'Explorer' },
    desc: { ar: 'افتح كل الأنماط الـ 10', en: 'View all 10 patterns' } },
  { id: 'deep-thinker', icon: '🧠', xp: 30,
    name: { ar: 'مفكّر عميق', en: 'Deep Thinker' },
    desc: { ar: 'افتح صفحة "تعمّق" لأي نمط', en: 'Open "Deep Dive" for any pattern' } },
  { id: 'quiz-novice', icon: '📝', xp: 20,
    name: { ar: 'مبتدئ اختبارات', en: 'Quiz Novice' },
    desc: { ar: 'أكمل أول اختبار', en: 'Complete your first quiz' } },
  { id: 'quiz-master', icon: '🎓', xp: 100,
    name: { ar: 'سيد الاختبارات', en: 'Quiz Master' },
    desc: { ar: 'احصل على 100% في 5 اختبارات', en: 'Score 100% on 5 quizzes' } },
  { id: 'practitioner', icon: '💪', xp: 40,
    name: { ar: 'ممارس', en: 'Practitioner' },
    desc: { ar: 'أكمل أول تدريب', en: 'Finish your first practice level' } },
  { id: 'no-hints', icon: '🔥', xp: 60,
    name: { ar: 'بلا تلميحات', en: 'No Hints' },
    desc: { ar: 'أكمل تدريب بدون استخدام أي تلميح', en: 'Complete a level without any hints' } },
  { id: 'note-taker', icon: '📓', xp: 15,
    name: { ar: 'مدوّن', en: 'Note Taker' },
    desc: { ar: 'اكتب ملاحظات لـ 3 أنماط', en: 'Write notes for 3 patterns' } },
  { id: 'exam-warrior', icon: '⚔', xp: 80,
    name: { ar: 'محارب الاختبار', en: 'Exam Warrior' },
    desc: { ar: 'أكمل Mock Exam كامل', en: 'Complete the Mock Exam' } },
  { id: 'streak-3', icon: '🔥', xp: 30,
    name: { ar: 'متابع 3 أيام', en: '3-Day Streak' },
    desc: { ar: 'تحدّي يومي 3 أيام متتالية', en: 'Daily challenge 3 days in a row' } },
  { id: 'streak-7', icon: '⭐', xp: 100,
    name: { ar: 'متابع أسبوع', en: 'Week Streak' },
    desc: { ar: 'تحدّي يومي 7 أيام متتالية', en: 'Daily challenge 7 days in a row' } },
  { id: 'identifier-pro', icon: '🎯', xp: 25,
    name: { ar: 'محدّد محترف', en: 'Identifier Pro' },
    desc: { ar: 'استخدم Identifier 5 مرات', en: 'Use Identifier 5 times' } }
];

// ── 3) DAILY CHALLENGES ──────────────────────────────────────
window.DAILY_CHALLENGES = [
  { id: 'dc1', answer: 'singleton',
    scenario: { ar: 'تطبيق ويب يكتب logs لملف واحد من 100 ميثود. الحل؟', en: 'Web app writes logs to one file from 100 methods. The fix?' } },
  { id: 'dc2', answer: 'observer',
    scenario: { ar: 'منصة تداول الأسهم: عند تغير السعر، 50 صفحة UI يجب أن تتحدث', en: 'Stock trading: when price changes, 50 UI pages must update' } },
  { id: 'dc3', answer: 'strategy',
    scenario: { ar: 'تطبيق دفع يدعم Cash, Card, Apple Pay, PayPal — حسب اختيار المستخدم', en: 'Payment app supports Cash, Card, Apple Pay, PayPal — by user choice' } },
  { id: 'dc4', answer: 'factory',
    scenario: { ar: 'قارئ مستندات يفتح PDF, Word, Excel — حسب امتداد الملف', en: 'Document reader opens PDF, Word, Excel — by file extension' } },
  { id: 'dc5', answer: 'builder',
    scenario: { ar: 'API request: URL إجباري، method اختياري، headers, body, timeout كلها اختيارية', en: 'API request: URL required; method, headers, body, timeout optional' } },
  { id: 'dc6', answer: 'decorator',
    scenario: { ar: 'تشفير + ضغط + تخزين مؤقت لنفس البيانات بترتيبات مختلفة', en: 'Encryption + compression + caching on same data in different orders' } },
  { id: 'dc7', answer: 'proxy',
    scenario: { ar: 'صورة 50MB لا تتحمّل إلا عند ظهورها في viewport المتصفح', en: 'A 50MB image loaded only when it appears in viewport' } },
  { id: 'dc8', answer: 'adapter',
    scenario: { ar: 'مكتبة قديمة بـ API مختلف عن interface النظام الحديث', en: 'Old library with API different from new system interface' } },
  { id: 'dc9', answer: 'flyweight',
    scenario: { ar: 'لعبة فيها 100,000 شجرة بنفس الـ texture و mesh', en: 'Game with 100,000 trees sharing same texture and mesh' } },
  { id: 'dc10', answer: 'prototype',
    scenario: { ar: 'كل enemy في اللعبة له template واحد، فقط position و health تختلف', en: 'Each game enemy has one template; only position & health differ' } },
  { id: 'dc11', answer: 'observer',
    scenario: { ar: 'تطبيق chat: عند وصول رسالة، يجب تحديث UI + إشعار + DB + cache', en: 'Chat app: on new message, update UI + notification + DB + cache' } },
  { id: 'dc12', answer: 'singleton',
    scenario: { ar: 'إعدادات التطبيق محفوظة في ملف JSON، تُقرأ مرة وتُشارك للجميع', en: 'App settings stored in JSON, read once, shared everywhere' } },
  { id: 'dc13', answer: 'strategy',
    scenario: { ar: 'مكتبة ضغط تختار بين GZIP, ZIP, Brotli حسب نوع الملف', en: 'Compression lib picks GZIP, ZIP, or Brotli based on file type' } },
  { id: 'dc14', answer: 'factory',
    scenario: { ar: 'تطبيق رسائل: SMS, Email, WhatsApp — كلها بنفس interface send()', en: 'Messaging app: SMS, Email, WhatsApp — all with send() interface' } },
  { id: 'dc15', answer: 'decorator',
    scenario: { ar: 'إضافة logging و authentication لكل HTTP request بدون تعديل الـ client', en: 'Add logging + auth to every HTTP request without modifying client' } },
  { id: 'dc16', answer: 'builder',
    scenario: { ar: 'كائن Pizza: حجم، نوع عجين، 15 إضافة اختيارية', en: 'Pizza object: size, crust type, 15 optional toppings' } },
  { id: 'dc17', answer: 'proxy',
    scenario: { ar: 'فحص صلاحيات المستخدم قبل كل عملية على قاعدة البيانات', en: 'Check user permissions before every DB operation' } },
  { id: 'dc18', answer: 'flyweight',
    scenario: { ar: 'محرر نصوص: مليون حرف، كل حرف من 26 فقط (a-z)', en: 'Text editor: 1M characters, each from only 26 letters (a-z)' } },
  { id: 'dc19', answer: 'adapter',
    scenario: { ar: 'API قديم يعيد XML، النظام الجديد يتوقع JSON', en: 'Legacy API returns XML, new system expects JSON' } },
  { id: 'dc20', answer: 'observer',
    scenario: { ar: 'لوحة admin: عند إضافة مستخدم، تحديث القائمة + الإحصاءات + الـ chart', en: 'Admin panel: on new user, update list + stats + chart' } }
];

// ── Helper: get today's challenge based on date ──
window.getTodayChallenge = function() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  const idx = seed % window.DAILY_CHALLENGES.length;
  return window.DAILY_CHALLENGES[idx];
};

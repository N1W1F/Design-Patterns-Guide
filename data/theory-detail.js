// ============================================================
// THEORY — Per-pattern DETAIL sections (extra depth)
// analogy · participants (UML roles) · codeSkeleton (Java) ·
// relations · examTip
// Keyed by pattern id; merged by the renderer.
// ============================================================

window.THEORY_DETAIL = {

  // ════════════ CREATIONAL ════════════
  singleton: {
    analogy: { ar: 'الحكومة: لأي دولة حكومة رسمية واحدة فقط. مهما تغيّر الأشخاص، "حكومة الدولة" هي نقطة وصول عامة واحدة.', en: 'A government: a country has only one official government. Whoever the people are, "the Government of X" is a single global access point.' },
    participants: [
      { role: 'Singleton', desc: { ar: 'يعلن حقلاً static يخزّن النسخة، ودالة getInstance() static للوصول إليها، و constructor خاص.', en: 'Declares a static field holding the instance, a static getInstance() to access it, and a private constructor.' } }
    ],
    codeSkeleton: `public class Database {
    private static Database instance;   // static field
    private Database() { }               // private constructor

    public static Database getInstance() {
        if (instance == null) {          // lazy initialization
            instance = new Database();
        }
        return instance;
    }
}`,
    relations: { ar: 'يمكن تطبيق Facade و Builder و Prototype و Abstract Factory كـ Singletons. يشبه Flyweight لكن Singleton نسخة واحدة قابلة للتعديل، بينما Flyweight عدة نسخ غير قابلة للتعديل.', en: 'Facade, Builder, Prototype, and Abstract Factory can be implemented as Singletons. Resembles Flyweight, but a Singleton is one mutable instance while Flyweights are multiple immutable ones.' },
    examTip: { ar: 'سؤال متكرّر: "ما غرض Singleton + مثال". تذكّر النقطتين: constructor خاص + دالة static. وانتبه: يخالف SRP.', en: 'Recurring: "Singleton intent + example." Remember the two steps: private constructor + static method. Note: it violates SRP.' }
  },

  prototype: {
    analogy: { ar: 'انقسام الخلية (الميتوزا): الخلية الأصلية تأخذ دوراً نشطاً في إنتاج نسخة مطابقة من نفسها.', en: 'Mitotic cell division: the original cell takes an active role in producing an identical copy of itself.' },
    participants: [
      { role: 'Prototype', desc: { ar: 'واجهة تعلن دالة clone().', en: 'An interface declaring the clone() method.' } },
      { role: 'Concrete Prototype', desc: { ar: 'ينفّذ clone() عبر copy constructor ينسخ حقوله.', en: 'Implements clone() via a copy constructor that copies its fields.' } },
      { role: 'Client / Registry', desc: { ar: 'ينتج نسخة بطلب clone() دون معرفة الكلاس الفعلي.', en: 'Produces a copy by calling clone() without knowing the concrete class.' } }
    ],
    codeSkeleton: `abstract class Shape {
    int x, y;
    Shape() { }
    Shape(Shape src) { this.x = src.x; this.y = src.y; }  // copy constructor
    abstract Shape clone();
}
class Circle extends Shape {
    int radius;
    Circle(Circle src) { super(src); this.radius = src.radius; }
    @Override Shape clone() { return new Circle(this); }
}`,
    relations: { ar: 'بديل عن الوراثة (مثل Factory Method) لكنه يحتاج تهيئة معقّدة للنسخة. يفيد مع Composite و Decorator لنسخ بُنى معقّدة. أحياناً بديل أبسط من Memento.', en: 'An alternative to inheritance (like Factory Method) but needs complex initialization of the clone. Useful with Composite and Decorator to copy complex structures. Sometimes a simpler alternative to Memento.' },
    examTip: { ar: 'الكلمة الذهبية: "copy constructor". clone() دائماً = return new X(this). كل subclass لازم يعيد تعريف clone() باسمه.', en: 'Golden phrase: "copy constructor." clone() is always return new X(this). Each subclass must override clone() with its own name.' }
  },

  builder: {
    analogy: { ar: 'طلب وجبة في مطعم: تختار الخبز ثم تضيف ما تشاء من الإضافات خطوة بخطوة، ثم "تأكيد الطلب" (build).', en: 'Ordering a meal: you pick the bread, then add toppings step by step, then "confirm" (build).' },
    participants: [
      { role: 'Product', desc: { ar: 'الكائن المعقّد الناتج. constructor خاص يأخذ Builder.', en: 'The complex resulting object. A private constructor taking a Builder.' } },
      { role: 'Builder', desc: { ar: 'inner static class فيها نفس الحقول + withX() + build().', en: 'A static inner class with the same fields + withX() + build().' } }
    ],
    codeSkeleton: `public class Car {
    private final String engine;        // required
    private final String gps;           // optional
    private Car(Builder b) { this.engine = b.engine; this.gps = b.gps; }

    public static class Builder {
        private final String engine;
        private String gps;
        public Builder(String engine) { this.engine = engine; }   // required
        public Builder withGps(String gps) { this.gps = gps; return this; }
        public Car build() { return new Car(this); }
    }
}
// Car c = new Car.Builder("V8").withGps("Garmin").build();`,
    relations: { ar: 'تبدأ التصاميم بـ Factory Method وتتطوّر نحو Builder أو Abstract Factory أو Prototype. Builder يركّز على بناء كائن معقّد واحد خطوة بخطوة، بينما Abstract Factory يبني عائلة كائنات.', en: 'Designs often start with Factory Method and evolve toward Builder, Abstract Factory, or Prototype. Builder focuses on building one complex object step by step, while Abstract Factory builds a family of objects.' },
    examTip: { ar: 'العلامة المميزة: withX() ترجع this (method chaining)، و build() ترجع new Product(this). الـ Builder لازم static.', en: 'Signature: withX() returns this (chaining), build() returns new Product(this). The Builder must be static.' }
  },

  factory: {
    analogy: { ar: 'موظّف استقبال في فندق: تطلب "غرفة مزدوجة" فيعطيك المفتاح المناسب دون أن تعرف أي غرفة بالتحديد أو كيف تُجهَّز.', en: 'A hotel receptionist: you ask for a "double room" and get the right key without knowing which room or how it\'s prepared.' },
    participants: [
      { role: 'Product (interface)', desc: { ar: 'الواجهة المشتركة لكل المنتجات.', en: 'The common interface for all products.' } },
      { role: 'Concrete Products', desc: { ar: 'تطبيقات فعلية للواجهة.', en: 'Concrete implementations of the interface.' } },
      { role: 'Factory', desc: { ar: 'دالة getX(type) تقرّر الكلاس الفعلي وترجعه.', en: 'A getX(type) method deciding the concrete class and returning it.' } }
    ],
    codeSkeleton: `interface Notification { void send(String msg); }

class NotificationFactory {
    public Notification getNotification(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("email")) return new EmailNotification();
        if (type.equalsIgnoreCase("sms"))   return new SMSNotification();
        return null;
    }
}`,
    relations: { ar: 'Abstract Factory غالباً مبني على مجموعة Factory Methods. Builder يركّز على بناء معقّد خطوة بخطوة بينما Factory ينشئ بخطوة واحدة. كثير من التصاميم تتطوّر من Factory Method نحو الأنماط الأخرى.', en: 'Abstract Factory is often built on a set of Factory Methods. Builder focuses on step-by-step construction while Factory creates in one step. Many designs evolve from Factory Method toward the others.' },
    examTip: { ar: 'علاجٌ متكرّر لرائحة "switch/if-else على نوع لإنشاء كائن". استخدم equalsIgnoreCase. سؤال إكمال كود شائع.', en: 'A frequent fix for the "switch/if-else on a type to create objects" smell. Use equalsIgnoreCase. Common code-completion question.' }
  },

  abstractfactory: {
    analogy: { ar: 'متجر أثاث بطُرز: تختار "الطراز الحديث" فتحصل على كرسي وطاولة وأريكة متناسقة معاً من نفس الطراز.', en: 'A furniture store with styles: pick "modern" and get a matching chair, table, and sofa all from the same style.' },
    participants: [
      { role: 'Abstract Factory', desc: { ar: 'واجهة فيها دالة إنشاء لكل منتج في العائلة.', en: 'An interface with a creation method per product in the family.' } },
      { role: 'Concrete Factories', desc: { ar: 'كل مصنع يُنتج عائلة منتجات متوافقة.', en: 'Each factory produces a compatible family of products.' } },
      { role: 'Abstract / Concrete Products', desc: { ar: 'واجهات المنتجات وتطبيقاتها لكل عائلة.', en: 'Product interfaces and their implementations per family.' } }
    ],
    codeSkeleton: `interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}
class WinFactory implements GUIFactory {
    public Button createButton()   { return new WinButton(); }
    public Checkbox createCheckbox(){ return new WinCheckbox(); }
}
// GUIFactory f = new WinFactory();
// Button b = f.createButton();   // whole family stays consistent`,
    relations: { ar: 'يبدأ غالباً كمجموعة Factory Methods. يمكن استخدام Prototype لتكوين دواله. كثيراً ما يُطبَّق كـ Singleton. الفرق عن Factory Method: عائلة كاملة بدل كائن واحد.', en: 'Often starts as a set of Factory Methods. Prototype can compose its methods. Frequently implemented as a Singleton. Difference from Factory Method: a whole family instead of one object.' },
    examTip: { ar: 'الكلمة المفتاحية الفارقة: "عائلة من المنتجات المتوافقة". إن ذُكر منتج واحد فقط → Factory Method لا Abstract Factory.', en: 'Distinguishing keyword: "a family of compatible products." If only one product is mentioned → Factory Method, not Abstract Factory.' }
  },

  // ════════════ STRUCTURAL ════════════
  adapter: {
    analogy: { ar: 'محوّل كهرباء سفر: يجعل قابس جهازك يعمل مع مقبس بلد آخر دون تغيير الجهاز أو المقبس.', en: 'A travel power adapter: makes your device\'s plug work with another country\'s socket without changing either.' },
    participants: [
      { role: 'Target', desc: { ar: 'الواجهة التي يتوقّعها العميل.', en: 'The interface the client expects.' } },
      { role: 'Adaptee', desc: { ar: 'الكلاس الموجود بواجهة غير متوافقة.', en: 'The existing class with an incompatible interface.' } },
      { role: 'Adapter', desc: { ar: 'ينفّذ Target ويحتفظ بمرجع Adaptee ويحوّل الاستدعاء.', en: 'Implements Target, holds an Adaptee reference, and translates the call.' } }
    ],
    codeSkeleton: `interface CityWeather { String byCity(String city); }   // Target
class GeoWeather {                                       // Adaptee
    String byCoords(double lat, double lng) { return "Sunny"; }
}
class WeatherAdapter implements CityWeather {
    private GeoWeather geo;
    WeatherAdapter(GeoWeather geo) { this.geo = geo; }
    public String byCity(String city) {
        double lat = lookupLat(city), lng = lookupLng(city);
        return geo.byCoords(lat, lng);     // translate then delegate
    }
}`,
    relations: { ar: 'يشبه Decorator و Proxy و Facade (كلها أغلفة) لكنه يغيّر الواجهة. Bridge يُصمَّم مسبقاً ليفصل الجوانب، بينما Adapter يُضاف لاحقاً لتوفيق واجهات غير متوافقة موجودة.', en: 'Resembles Decorator, Proxy, and Facade (all wrappers) but it changes the interface. Bridge is designed up-front to separate aspects, while Adapter is added afterward to reconcile existing incompatible interfaces.' },
    examTip: { ar: 'يطبّق polymorphism و loose coupling. سؤال إكمال كود متكرّر: "class XAdapter implements Target". الجواب يملأ implements + جسم الدالة (يحوّل ثم يفوّض).', en: 'Demonstrates polymorphism & loose coupling. Recurring completion: "class XAdapter implements Target." The blank fills implements + the method body (translate then delegate).' }
  },

  bridge: {
    analogy: { ar: 'جهاز تحكّم عن بُعد وجهاز: يمكن تطوير أجهزة تحكّم جديدة وأجهزة جديدة بشكل مستقل، ويتواصلان عبر "جسر".', en: 'A remote control and a device: new remotes and new devices evolve independently, communicating over a "bridge".' },
    participants: [
      { role: 'Abstraction', desc: { ar: 'تحتفظ بمرجع لـ Implementation وتفوّض إليه.', en: 'Holds a reference to an Implementation and delegates to it.' } },
      { role: 'Refined Abstraction', desc: { ar: 'توسعة للتجريد على بُعده الخاص.', en: 'Extends the abstraction along its own dimension.' } },
      { role: 'Implementation', desc: { ar: 'واجهة الجانب الآخر وتطبيقاتها الفعلية.', en: 'The other side\'s interface and its concrete implementations.' } }
    ],
    codeSkeleton: `interface Renderer { void drawCircle(float r); }     // Implementation
abstract class Shape {
    protected Renderer renderer;                       // bridge (composition)
    Shape(Renderer r) { this.renderer = r; }
    abstract void draw();
}
class Circle extends Shape {
    float radius;
    Circle(Renderer r, float radius){ super(r); this.radius = radius; }
    void draw() { renderer.drawCircle(radius); }
}`,
    relations: { ar: 'يشبه Adapter بنيوياً لكن الغرض مختلف: Bridge يُصمَّم مسبقاً، Adapter يوفّق لاحقاً. يمكن دمجه مع Abstract Factory. State و Strategy يشبهانه في الاعتماد على التركيب.', en: 'Structurally like Adapter but different intent: Bridge is designed up-front, Adapter reconciles afterward. Can be combined with Abstract Factory. State and Strategy resemble it in relying on composition.' },
    examTip: { ar: 'العلامة: "بُعدان مستقلان" (مثل شكل × محرّك رسم). إن رأيت ضرب احتمالات يؤدي لانفجار كلاسات → Bridge.', en: 'Marker: "two independent dimensions" (e.g. shape × renderer). If multiplying options causes a class explosion → Bridge.' }
  },

  composite: {
    analogy: { ar: 'مخطّط مؤسّسة: المدير يدير موظّفين ومدراء آخرين. حساب إجمالي الرواتب يعمل على الفرد والمجموعة بنفس الطريقة.', en: 'An org chart: a manager manages employees and other managers. Computing total salaries works the same for an individual and a group.' },
    participants: [
      { role: 'Component', desc: { ar: 'الواجهة المشتركة للورقة والمركّب.', en: 'The shared interface for leaf and composite.' } },
      { role: 'Leaf', desc: { ar: 'العنصر المفرد (لا أبناء له).', en: 'A single element (no children).' } },
      { role: 'Composite', desc: { ar: 'يحتوي قائمة Components ويفوّض العملية لأبنائه.', en: 'Holds a list of Components and delegates the operation to its children.' } }
    ],
    codeSkeleton: `interface Node { int size(); }                  // Component
class File implements Node {                     // Leaf
    int size() { return 1; }
}
class Folder implements Node {                    // Composite
    private List<Node> children = new ArrayList<>();
    void add(Node n) { children.add(n); }
    public int size() {
        int total = 0;
        for (Node n : children) total += n.size();   // recurse
        return total;
    }
}`,
    relations: { ar: 'يُستخدم كثيراً مع Decorator (بنية شجرية متكرّرة) لكن Composite يجمّع، Decorator يضيف مسؤولية. Iterator يمرّ على الشجرة. Visitor ينفّذ عمليات عليها. Prototype ينسخها.', en: 'Often used with Decorator (recursive tree) but Composite aggregates while Decorator adds responsibility. Iterator traverses the tree, Visitor runs operations on it, Prototype copies it.' },
    examTip: { ar: 'الكلمة المفتاحية: "part-whole" أو "معاملة الفرد والمجموعة بنفس الطريقة" أو "بنية شجرية".', en: 'Keyword: "part-whole" or "treat individual and group uniformly" or "tree structure".' }
  },

  decorator: {
    analogy: { ar: 'ارتداء الملابس طبقة فوق طبقة: قميص ثم سترة ثم معطف — كل طبقة تضيف دفئاً دون تغيير ما تحتها.', en: 'Wearing clothes in layers: shirt, then sweater, then coat — each layer adds warmth without changing the ones beneath.' },
    participants: [
      { role: 'Component', desc: { ar: 'واجهة/كلاس مجرّد مشترك.', en: 'A shared interface/abstract class.' } },
      { role: 'Concrete Component', desc: { ar: 'الكائن الأساسي المراد تزيينه.', en: 'The base object to be decorated.' } },
      { role: 'Decorator', desc: { ar: 'يرث Component ويحتفظ بمرجع له.', en: 'Extends Component and holds a reference to it.' } },
      { role: 'Concrete Decorator', desc: { ar: 'يضيف سلوكه ثم يفوّض للمكوّن الملفوف.', en: 'Adds its behavior then delegates to the wrapped component.' } }
    ],
    codeSkeleton: `abstract class Beverage { abstract double cost(); }     // Component
class Espresso extends Beverage { double cost() { return 1.99; } }

abstract class Condiment extends Beverage {             // Decorator
    protected Beverage beverage;
}
class Mocha extends Condiment {
    Mocha(Beverage b) { this.beverage = b; }
    double cost() { return 0.20 + beverage.cost(); }    // add then delegate
}
// Beverage b = new Mocha(new Espresso());`,
    relations: { ar: 'يشبه Adapter و Proxy (أغلفة) لكنه يضيف سلوكاً بنفس الواجهة ويتراكم. يشبه Composite بنيةً لكن غرضه إضافة مسؤولية لا التجميع. Strategy يغيّر الجوهر، Decorator يغيّر الغلاف.', en: 'Resembles Adapter and Proxy (wrappers) but adds behavior with the same interface and stacks. Structurally like Composite but its intent is adding responsibility, not aggregation. Strategy changes the guts, Decorator changes the skin.' },
    examTip: { ar: 'العلامة الحاسمة: "إضافة سلوك دون subclassing / ديناميكياً / يتراكم". المفتاح في الكود: extends Component + يحتوي مرجعاً له + cost = x + wrapped.cost().', en: 'Decisive marker: "add behavior without subclassing / dynamically / stacks." Key in code: extends Component + holds a reference + cost = x + wrapped.cost().' }
  },

  facade: {
    analogy: { ar: 'موظّف خدمة العملاء بالهاتف: ينسّق نيابةً عنك بين عدة أقسام معقّدة، وأنت تتعامل معه وحده.', en: 'A phone customer-service rep: coordinates several complex departments on your behalf, and you deal only with them.' },
    participants: [
      { role: 'Facade', desc: { ar: 'يقدّم دوال عالية المستوى تنسّق النظام الفرعي.', en: 'Exposes high-level methods orchestrating the subsystem.' } },
      { role: 'Subsystem classes', desc: { ar: 'الكلاسات المعقّدة التي يخفيها الـ Facade.', en: 'The complex classes the Facade hides.' } }
    ],
    codeSkeleton: `class VideoConverter {                  // Facade
    private Codec codec = new Codec();
    private AudioMixer mixer = new AudioMixer();
    private Compressor comp = new Compressor();

    public File convert(File f, String fmt) {   // one simple entry point
        var a = codec.decode(f);
        var b = mixer.fix(a);
        return comp.compress(b, fmt);
    }
}`,
    relations: { ar: 'يشبه Adapter لكن Facade يبسّط نظاماً فرعياً كاملاً (واجهة جديدة) بينما Adapter يوفّق واجهة كائن واحد. غالباً يُطبَّق كـ Singleton. Mediator يشبهه لكنه ينظّم تواصلاً ثنائي الاتجاه.', en: 'Like Adapter but Facade simplifies a whole subsystem (a new interface) while Adapter reconciles one object\'s interface. Often a Singleton. Mediator resembles it but organizes two-way communication.' },
    examTip: { ar: 'الكلمة المفتاحية: "تبسيط التواصل مع نظام معقّد" / "واجهة واحدة بسيطة". سؤال Intent مباشر متكرّر.', en: 'Keyword: "simplify communication with a complex system" / "one simple interface." A direct, recurring Intent question.' }
  },

  flyweight: {
    analogy: { ar: 'أحرف الطباعة: حرف "أ" واحد مشترك يُعاد استخدامه في كل مواضعه بدل صنع كائن لكل ظهور.', en: 'Typeset letters: one shared "a" glyph reused at every position instead of an object per occurrence.' },
    participants: [
      { role: 'Flyweight', desc: { ar: 'يحمل الحالة المشتركة (intrinsic) غير القابلة للتعديل.', en: 'Holds the shared, immutable (intrinsic) state.' } },
      { role: 'Flyweight Factory', desc: { ar: 'يحتفظ بـ HashMap يعيد استخدام أو ينشئ flyweights.', en: 'Keeps a HashMap that reuses or creates flyweights.' } },
      { role: 'Context', desc: { ar: 'يحمل الحالة المتغيّرة (extrinsic) + مرجع flyweight.', en: 'Holds the varying (extrinsic) state + a flyweight reference.' } }
    ],
    codeSkeleton: `class TreeType { String name, color; }       // Flyweight (intrinsic)

class TreeFactory {
    private Map<String, TreeType> cache = new HashMap<>();
    TreeType get(String name, String color) {
        String key = name + "-" + color;
        if (!cache.containsKey(key))
            cache.put(key, new TreeType());
        return cache.get(key);                   // share
    }
}
class Tree { int x, y; TreeType type; }         // Context (extrinsic)`,
    relations: { ar: 'يشبه Singleton إن قلّصت الحالة المشتركة لكائن واحد، لكن Flyweight عدة كائنات غير قابلة للتعديل. الـ Factory فيه يشبه Factory Method. يُستخدم مع Composite للأوراق المشتركة.', en: 'Resembles Singleton if shared state collapses to one object, but Flyweights are multiple and immutable. Its factory resembles Factory Method. Used with Composite for shared leaves.' },
    examTip: { ar: 'العلامة: "آلاف الكائنات + توفير ذاكرة". افصل intrinsic (مشترك) عن extrinsic (متغيّر مثل x,y). الـ Factory + HashMap هو القلب.', en: 'Marker: "thousands of objects + save memory." Separate intrinsic (shared) from extrinsic (varying like x,y). The Factory + HashMap is the core.' }
  },

  proxy: {
    analogy: { ar: 'بطاقة ائتمان: تنوب عن النقود الحقيقية وتتحكّم بالوصول إليها (تحقّق، حدود) بنفس وظيفة الدفع.', en: 'A credit card: stands in for real cash and controls access to it (auth, limits) with the same payment function.' },
    participants: [
      { role: 'Subject (interface)', desc: { ar: 'الواجهة المشتركة بين الحقيقي والوكيل.', en: 'The interface shared by the real object and the proxy.' } },
      { role: 'RealSubject', desc: { ar: 'الكائن الحقيقي الذي ينفّذ العمل.', en: 'The real object that does the work.' } },
      { role: 'Proxy', desc: { ar: 'ينفّذ نفس الواجهة، يتحكّم بالوصول ثم يفوّض.', en: 'Implements the same interface, controls access, then delegates.' } }
    ],
    codeSkeleton: `interface Database { void query(String sql); }     // Subject
class RealDatabase implements Database {
    public void query(String sql) { /* execute */ }
}
class DatabaseProxy implements Database {            // Proxy
    private Database real; private String role;
    DatabaseProxy(Database r, String role){ this.real=r; this.role=role; }
    public void query(String sql) {
        if (sql.startsWith("DELETE") && !role.equals("admin")) return;  // control
        real.query(sql);                              // delegate
    }
}`,
    relations: { ar: 'يشبه Adapter و Decorator (أغلفة) لكن Proxy يحافظ على نفس الواجهة ويتحكّم بالوصول لا يضيف سلوكاً ظاهرياً. Decorator يديره العميل، أما Proxy فغالباً يدير دورة حياة الكائن بنفسه.', en: 'Like Adapter and Decorator (wrappers) but Proxy keeps the same interface and controls access rather than visibly adding behavior. A Decorator is managed by the client, while a Proxy often manages the object\'s lifecycle itself.' },
    examTip: { ar: 'العلامة: "التحكّم بالوصول / تحقّق قبل التفويض / نفس الواجهة / تأخير تحميل". سؤال "حدّد النمط + أكمل الكود" متكرّر (Protection Proxy).', en: 'Marker: "control access / validate before delegating / same interface / lazy load." A recurring "identify the pattern + complete the code" question (Protection Proxy).' }
  },

  // ════════════ BEHAVIORAL ════════════
  chain: {
    analogy: { ar: 'الدعم الفني الهاتفي: المستوى الأول، ثم الثاني، ثم المدير — يمرّ طلبك حتى يجده من يحلّه.', en: 'Phone tech support: level 1, then level 2, then a manager — your request travels until someone can resolve it.' },
    participants: [
      { role: 'Handler', desc: { ar: 'واجهة/كلاس مجرّد فيه handle() ومرجع successor.', en: 'An interface/abstract class with handle() and a successor reference.' } },
      { role: 'Concrete Handlers', desc: { ar: 'كل واحد يعالج أو يمرّر للتالي.', en: 'Each one handles or forwards to the next.' } }
    ],
    codeSkeleton: `abstract class Handler {
    protected Handler next;                       // successor
    Handler setNext(Handler n){ this.next = n; return n; }
    abstract void handle(Request r);
    protected void forward(Request r){ if (next != null) next.handle(r); }
}
class ManagerHandler extends Handler {
    void handle(Request r) {
        if (r.amount <= 5000) approve(r);
        else forward(r);                          // pass along the chain
    }
}`,
    relations: { ar: 'يشبه Decorator بنيةً (سلسلة) لكن Chain قد يوقف الطلب، و Decorator دائماً يفوّض. يُستخدم مع Composite (تمرير للأب). الأمر المُمرَّر قد يكون Command.', en: 'Structurally like Decorator (a chain) but Chain may stop the request, while Decorator always delegates. Used with Composite (forward to parent). The passed request may be a Command.' },
    examTip: { ar: 'العلامة: "تمرير الطلب عبر معالِجات متتالية حتى يُعالَج". مثال: سلسلة موافقات بحدود متصاعدة.', en: 'Marker: "pass the request through successive handlers until handled." Example: an approval chain with rising limits.' }
  },

  command: {
    analogy: { ar: 'طلب في مطعم: النادل يكتب الطلب (كائن) ويسلّمه للمطبخ. الطلب مغلّف، يمكن وضعه في طابور أو إلغاؤه.', en: 'A restaurant order: the waiter writes the order (object) and hands it to the kitchen. The order is encapsulated, can be queued or cancelled.' },
    participants: [
      { role: 'Command (interface)', desc: { ar: 'فيه execute() و undo() اختياري.', en: 'Has execute() and optional undo().' } },
      { role: 'Concrete Command', desc: { ar: 'يغلّف المستقبِل ويفوّض له.', en: 'Wraps the receiver and delegates to it.' } },
      { role: 'Invoker', desc: { ar: 'يستدعي execute() دون معرفة التفاصيل.', en: 'Calls execute() without knowing details.' } },
      { role: 'Receiver', desc: { ar: 'يقوم بالعمل الفعلي.', en: 'Performs the actual work.' } }
    ],
    codeSkeleton: `interface Command { void execute(); void undo(); }

class LightOnCommand implements Command {
    private Light light;                          // receiver
    LightOnCommand(Light l) { this.light = l; }
    public void execute() { light.on(); }
    public void undo()    { light.off(); }
}
class Remote {                                    // invoker
    private Command cmd;
    void setCommand(Command c) { this.cmd = c; }
    void press() { cmd.execute(); }
}`,
    relations: { ar: 'يمكن حفظ الأوامر مع Memento لدعم التراجع، أو في Composite لأوامر مركّبة (macro). الطلب المُمرَّر في Chain of Responsibility قد يكون Command. Strategy يشبهه لكنه يركّز على الخوارزمية.', en: 'Commands can be stored with Memento for undo, or in a Composite for macro commands. The request passed in Chain of Responsibility may be a Command. Strategy resembles it but focuses on the algorithm.' },
    examTip: { ar: 'الكلمة المفتاحية الذهبية: "undo / التراجع" أو "طابور/جدولة العمليات" أو "تغليف الطلب ككائن".', en: 'Golden keyword: "undo" or "queue/schedule operations" or "encapsulate a request as an object."' }
  },

  interpreter: {
    analogy: { ar: 'مترجم لغة: يأخذ جملة بلغة ما ويفسّرها وفق قواعد نحوية معروفة.', en: 'A language translator: takes a sentence in some language and interprets it per known grammar rules.' },
    participants: [
      { role: 'Expression (interface)', desc: { ar: 'فيه interpret(context).', en: 'Has interpret(context).' } },
      { role: 'Terminal Expression', desc: { ar: 'يفسّر الرموز الطرفية (قيم/متغيّرات).', en: 'Interprets terminal symbols (values/variables).' } },
      { role: 'Non-terminal Expression', desc: { ar: 'يجمع تعابير فرعية (عمليات).', en: 'Combines sub-expressions (operations).' } }
    ],
    codeSkeleton: `interface Expr { int interpret(); }
class Num implements Expr {                       // terminal
    int v; Num(int v){ this.v = v; }
    public int interpret() { return v; }
}
class Add implements Expr {                       // non-terminal
    Expr left, right;
    Add(Expr l, Expr r){ left=l; right=r; }
    public int interpret() { return left.interpret() + right.interpret(); }
}
// new Add(new Num(3), new Num(5)).interpret()  →  8`,
    relations: { ar: 'يبني شجرة تشبه Composite. يُستخدم Iterator للمرور على الشجرة، و Visitor لتطبيق عمليات عليها، و Flyweight لمشاركة الرموز الطرفية المتكرّرة.', en: 'Builds a tree like Composite. Iterator traverses the tree, Visitor applies operations to it, and Flyweight shares repeated terminal symbols.' },
    examTip: { ar: 'العلامة: "تفسير/ترجمة لغة أو تعابير وفق قواعد". مثال النوتة: ترجمة لغة بشرية إلى لغة JVM.', en: 'Marker: "interpret/translate a language or expressions per a grammar." Notes example: translate a human language to the JVM language.' }
  },

  iterator: {
    analogy: { ar: 'جهاز تحكّم بقنوات التلفاز: يتيح "التالي/السابق" دون أن تعرف كيف تُخزَّن القنوات داخلياً.', en: 'A TV remote: lets you go "next/previous" without knowing how channels are stored internally.' },
    participants: [
      { role: 'Iterator (interface)', desc: { ar: 'فيه hasNext() و next().', en: 'Has hasNext() and next().' } },
      { role: 'Concrete Iterator', desc: { ar: 'يتتبّع موضع المرور الحالي.', en: 'Tracks the current traversal position.' } },
      { role: 'Aggregate', desc: { ar: 'المجموعة، تُرجع مُكرِّراً عبر createIterator().', en: 'The collection, returns an iterator via createIterator().' } }
    ],
    codeSkeleton: `interface Iterator<T> { boolean hasNext(); T next(); }

class ListIterator<T> implements Iterator<T> {
    private List<T> items; private int pos = 0;
    ListIterator(List<T> items){ this.items = items; }
    public boolean hasNext() { return pos < items.size(); }
    public T next()          { return items.get(pos++); }
}
// hides whether the collection is an array, tree, etc.`,
    relations: { ar: 'يمرّ على بُنى Composite. يمكن استخدامه مع Memento لحفظ موضع المرور. Factory Method ينشئ المُكرِّرات المناسبة. Visitor قد يستخدمه للمرور.', en: 'Traverses Composite structures. Can pair with Memento to capture iteration position. Factory Method creates appropriate iterators. Visitor may use it to traverse.' },
    examTip: { ar: 'الكلمة المفتاحية: "المرور على مجموعة دون كشف بنيتها الداخلية / traverse". مثال النوتة: مكتبة تخفي array أو linked list.', en: 'Keyword: "traverse a collection without exposing its internal structure." Notes example: a library hiding an array or linked list.' }
  },

  mediator: {
    analogy: { ar: 'برج مراقبة المطار: الطائرات لا تتواصل مباشرة، بل عبر البرج الذي ينسّق كل الحركة.', en: 'An airport control tower: planes don\'t talk directly; they go through the tower that coordinates all movement.' },
    participants: [
      { role: 'Mediator (interface)', desc: { ar: 'يعلن طريقة إبلاغ الأحداث.', en: 'Declares a method to notify events.' } },
      { role: 'Concrete Mediator', desc: { ar: 'يعرف كل المكوّنات وينسّق بينها.', en: 'Knows all components and coordinates them.' } },
      { role: 'Colleagues', desc: { ar: 'المكوّنات تتواصل عبر الوسيط فقط.', en: 'Components communicate only through the mediator.' } }
    ],
    codeSkeleton: `interface Mediator { void notify(Component sender, String event); }

class Dialog implements Mediator {
    Button ok; Checkbox terms;
    public void notify(Component sender, String event) {
        if (sender == terms && event.equals("checked"))
            ok.setEnabled(true);                  // coordinate centrally
    }
}
// components hold a Mediator ref and call mediator.notify(this, ...)`,
    relations: { ar: 'يشبه Facade لكن Mediator تواصل ثنائي الاتجاه بين الأقران، Facade تبسيط أحادي الاتجاه لنظام فرعي. يشبه Observer (كلاهما يفصل المكوّنات) وقد يُبنى عليه.', en: 'Like Facade but Mediator is two-way communication between peers, while Facade is one-way simplification of a subsystem. Resembles Observer (both decouple components) and may be built on it.' },
    examTip: { ar: 'العلامة: "تقليل الاقتران بين كائنات متشابكة عبر مركز اتصال واحد". مثال: غرفة دردشة، نموذج بحقول مترابطة.', en: 'Marker: "reduce coupling among tangled objects via one communication hub." Example: a chat room, a form with interdependent fields.' }
  },

  memento: {
    analogy: { ar: 'نقطة حفظ في لعبة فيديو: تخزّن حالتك لتعود إليها لاحقاً دون كشف تفاصيلها الداخلية.', en: 'A save point in a video game: stores your state to return to later without exposing its internals.' },
    participants: [
      { role: 'Originator', desc: { ar: 'ينشئ memento من حالته ويستعيدها منه.', en: 'Creates a memento from its state and restores from it.' } },
      { role: 'Memento', desc: { ar: 'يخزّن لقطة الحالة (محتواه مغلّف).', en: 'Stores a snapshot of the state (its content is encapsulated).' } },
      { role: 'Caretaker', desc: { ar: 'يحتفظ بتاريخ الـ mementos دون النظر في محتواها.', en: 'Keeps a history of mementos without inspecting their contents.' } }
    ],
    codeSkeleton: `class Editor {                                    // Originator
    private String text;
    Memento save() { return new Memento(text); }
    void restore(Memento m) { this.text = m.state; }
}
class Memento { final String state; Memento(String s){ state = s; } }

class History {                                   // Caretaker
    private Deque<Memento> stack = new ArrayDeque<>();
    void push(Memento m){ stack.push(m); }
    Memento pop(){ return stack.pop(); }
}`,
    relations: { ar: 'يُستخدم مع Command لدعم التراجع (Command ينفّذ، Memento يحفظ الحالة). أحياناً Prototype بديل أبسط إن كانت الحالة بسيطة. يمكن دمجه مع Iterator لحفظ موضع المرور.', en: 'Used with Command for undo (Command executes, Memento saves state). Prototype is sometimes a simpler alternative if state is simple. Can pair with Iterator to save traversal position.' },
    examTip: { ar: 'العلامة: "حفظ/استعادة حالة / لقطة / undo مع الحفاظ على التغليف". قارنه بـ Command: Memento يحفظ الحالة، Command يحفظ العملية.', en: 'Marker: "save/restore state / snapshot / undo while preserving encapsulation." Contrast with Command: Memento saves state, Command saves the operation.' }
  },

  observer: {
    analogy: { ar: 'الاشتراك في مجلة: كل المشتركين يستلمون العدد الجديد تلقائياً عند صدوره. تشترك أو تلغي وقت ما تشاء.', en: 'A magazine subscription: all subscribers automatically receive each new issue. You subscribe or unsubscribe anytime.' },
    participants: [
      { role: 'Subject', desc: { ar: 'يحتفظ بقائمة Observers ودوال subscribe/unsubscribe/notify.', en: 'Holds a list of Observers with subscribe/unsubscribe/notify.' } },
      { role: 'Observer (interface)', desc: { ar: 'فيه update() يُستدعى عند التغيير.', en: 'Has update() called on change.' } },
      { role: 'Concrete Observer', desc: { ar: 'يتفاعل مع التحديث بطريقته.', en: 'Reacts to the update in its own way.' } }
    ],
    codeSkeleton: `interface Observer { void update(String msg); }

class Subject {
    private List<Observer> observers = new ArrayList<>();
    void subscribe(Observer o)   { observers.add(o); }
    void unsubscribe(Observer o) { observers.remove(o); }
    void notifyAll(String msg) {
        for (Observer o : observers) o.update(msg);   // broadcast
    }
}`,
    relations: { ar: 'أساس علاقة Model↔View في MVC. يشبه Mediator (كلاهما يفصل) لكن Observer بثّ أحادي الاتجاه. قد يُدمج مع Singleton للـ Subject المشترك.', en: 'The basis of the Model↔View relationship in MVC. Resembles Mediator (both decouple) but Observer is one-way broadcast. May combine with Singleton for a shared Subject.' },
    examTip: { ar: 'الكلمة المفتاحية: "إبلاغ عدة كائنات / subscribe / واحد-لمتعدّد". سؤال إكمال كود متكرّر (attach/detach/notify). في MVC: علاقة Model↔View.', en: 'Keyword: "notify multiple objects / subscribe / one-to-many." A recurring code-completion question (attach/detach/notify). In MVC: the Model↔View relationship.' }
  },

  state: {
    analogy: { ar: 'إشارة المرور: نفس الإشارة تتصرّف مختلفة حسب حالتها (أحمر/أخضر/أصفر) وتنتقل تلقائياً.', en: 'A traffic light: the same light behaves differently per state (red/green/yellow) and transitions automatically.' },
    participants: [
      { role: 'Context', desc: { ar: 'يحتفظ بمرجع للحالة الحالية ويفوّض لها.', en: 'Holds a reference to the current state and delegates to it.' } },
      { role: 'State (interface)', desc: { ar: 'يعلن الدوال المعتمدة على الحالة.', en: 'Declares the state-dependent methods.' } },
      { role: 'Concrete States', desc: { ar: 'كل حالة تنفّذ سلوكها وقد تحوّل الـ Context.', en: 'Each state implements its behavior and may switch the Context.' } }
    ],
    codeSkeleton: `interface State { void next(Context c); }

class RedState implements State {
    public void next(Context c) { c.setState(new GreenState()); }
}
class Context {
    private State state = new RedState();
    void setState(State s) { this.state = s; }
    void next() { state.next(this); }            // delegate to current state
}`,
    relations: { ar: 'بنيته كـ Strategy لكن: في State تعرف الحالات بعضها وتتحوّل، وفي Strategy العميل يختار والاستراتيجيات مستقلة. يمكن دمجه مع Singleton لكائنات الحالة.', en: 'Structured like Strategy but: in State, states know each other and transition; in Strategy, the client chooses and strategies are independent. State objects can be Singletons.' },
    examTip: { ar: 'العلامة: "السلوك يتغيّر حسب الحالة / آلة حالات / انتقالات". فرّقه عن Strategy: من يقرّر التغيير — الكائن (State) أم العميل (Strategy)؟', en: 'Marker: "behavior changes with state / state machine / transitions." Distinguish from Strategy: who decides the change — the object (State) or the client (Strategy)?' }
  },

  strategy: {
    analogy: { ar: 'الوصول للمطار: سيارة، أجرة، حافلة، أو دراجة — وسائل مختلفة لنفس الهدف، تختار حسب الظرف.', en: 'Getting to the airport: car, taxi, bus, or bike — different means to the same goal, chosen by circumstance.' },
    participants: [
      { role: 'Strategy (interface)', desc: { ar: 'يعلن دالة الخوارزمية.', en: 'Declares the algorithm method.' } },
      { role: 'Concrete Strategies', desc: { ar: 'تطبيقات مختلفة لنفس الدالة.', en: 'Different implementations of the same method.' } },
      { role: 'Context', desc: { ar: 'يستقبل استراتيجية ويفوّض لها.', en: 'Receives a strategy and delegates to it.' } }
    ],
    codeSkeleton: `interface Shareable { void share(String file); }    // Strategy
class Whatsapp implements Shareable {
    public void share(String file) { /* ... */ }
}
class Photo {                                        // Context
    void sharePhoto(Shareable method, String file) {
        method.share(file);                          // delegate to strategy
    }
}
// new Photo().sharePhoto(new Whatsapp(), "pic.jpg");`,
    relations: { ar: 'بنيته كـ State و Bridge (تركيب). يشبه Template Method لكن Strategy تركيب وقت التشغيل، Template وراثة وقت التصميم. أحياناً lambda بديل أبسط. يُستخدم في Controller داخل MVC.', en: 'Structured like State and Bridge (composition). Resembles Template Method but Strategy is runtime composition, Template is compile-time inheritance. A lambda is sometimes a simpler alternative. Used in the Controller in MVC.' },
    examTip: { ar: 'الكلمة المفتاحية: "اختيار خوارزمية وقت التشغيل / خوارزميات مختلفة ديناميكياً". علاج متكرّر لرائحة if-else على سلوك.', en: 'Keyword: "select algorithm at runtime / different algorithms dynamically." A frequent fix for the behavioral if-else smell.' }
  },

  template: {
    analogy: { ar: 'وصفة طبخ ثابتة الخطوات: نفس الترتيب دائماً (تحضير، طبخ، تقديم)، وتختلف المكوّنات فقط في كل طبق.', en: 'A fixed-step recipe: always the same order (prep, cook, serve), only the ingredients differ per dish.' },
    participants: [
      { role: 'Abstract Class', desc: { ar: 'فيه دالة قالب final تثبّت ترتيب الخطوات.', en: 'Has a final template method fixing the step order.' } },
      { role: 'Concrete Classes', desc: { ar: 'تعيد تعريف الخطوات المتغيّرة فقط.', en: 'Override only the varying steps.' } }
    ],
    codeSkeleton: `abstract class Teacher {
    abstract void prepareLecture();
    abstract void teachLecture();
    abstract void evaluateStudents();

    public final void teach() {          // template method — fixed order
        prepareLecture();
        teachLecture();
        evaluateStudents();
    }
}
// login(){ signin(); do2FactorAuth(); }  →  template fixes the order`,
    relations: { ar: 'يشبه Strategy لكن عبر الوراثة (Strategy عبر التركيب). Factory Method غالباً خطوة داخل دالة قالب. على عكس Strategy، يعمل على مستوى الكلاس لا الكائن.', en: 'Like Strategy but via inheritance (Strategy via composition). Factory Method is often a step inside a template method. Unlike Strategy, it works at the class level, not the object level.' },
    examTip: { ar: 'من النوتة حرفياً: "Template always ensures the order of operations". العلامة: "نفس العملية ثابتة الهيكل، تختلف خطوة واحدة فقط". مثال: login يثبّت signin ثم 2FA.', en: 'Literally from the notes: "Template always ensures the order of operations." Marker: "same fixed-structure process, only one step differs." Example: login fixing signin then 2FA.' }
  },

  visitor: {
    analogy: { ar: 'مفتّش ضرائب يزور شركات مختلفة: يطبّق حساباً جديداً على كل نوع دون أن تغيّر الشركات أنفسها.', en: 'A tax inspector visiting different businesses: applies a new calculation to each type without the businesses changing themselves.' },
    participants: [
      { role: 'Visitor (interface)', desc: { ar: 'فيه visit() لكل نوع عنصر.', en: 'Has a visit() per element type.' } },
      { role: 'Concrete Visitor', desc: { ar: 'يطبّق عملية واحدة على كل الأنواع.', en: 'Applies one operation across all types.' } },
      { role: 'Element', desc: { ar: 'فيه accept(visitor) يستدعي visit المناسب (double dispatch).', en: 'Has accept(visitor) calling the right visit (double dispatch).' } }
    ],
    codeSkeleton: `interface Visitor { void visit(Circle c); void visit(Square s); }
interface Shape   { void accept(Visitor v); }

class Circle implements Shape {
    public void accept(Visitor v) { v.visit(this); }   // double dispatch
}
class AreaVisitor implements Visitor {                  // new operation
    public void visit(Circle c) { /* area of circle */ }
    public void visit(Square s) { /* area of square */ }
}`,
    relations: { ar: 'يمرّ غالباً على بُنى Composite (مع Iterator). على عكس Decorator الذي يضيف سلوكاً لكائن واحد، Visitor يضيف عملية عبر كل العناصر دون تعديلها.', en: 'Often traverses Composite structures (with Iterator). Unlike Decorator which adds behavior to one object, Visitor adds an operation across all elements without modifying them.' },
    examTip: { ar: 'العلامة: "إضافة وظيفة/عملية جديدة دون تعديل الكلاسات الموجودة". انتبه: إضافة نوع عنصر جديد مكلفة (تعدّل كل الزوّار).', en: 'Marker: "add a new function/operation without modifying existing classes." Note: adding a new element type is costly (changes every visitor).' }
  }

};

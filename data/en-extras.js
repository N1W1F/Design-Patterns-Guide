// ============================================================
// English translations for PATTERN_EXTRAS content
// Used when LANG === 'en' — falls back to Arabic when missing
// ============================================================

window.EN_EXTRAS = {

  singleton: {
    realWorldExamples: [
      { desc: 'Database connections are expensive and limited. One pool instance ensures connection reuse across the app.', where: 'Almost every web application' },
      { desc: 'All app parts write logs to one place. A single Logger ensures consistent log writing.', where: 'java.util.logging.Logger, log4j' },
      { desc: 'App settings are read once from a file and shared by all classes. Singleton ensures one-time reading.', where: 'Spring Boot ApplicationContext, Django settings' }
    ],
    pitfalls: [
      { title: 'Forgetting to make constructor private', reason: 'If public, anyone can <code>new Singleton()</code> and break the pattern entirely.' },
      { title: 'Forgetting static keyword on getInstance()', reason: 'Without static, you need an object to call the method — which contradicts the whole idea.' },
      { title: 'Using == instead of equals for non-instance objects', reason: 'In Singleton we compare references with == because both should point to the same memory.' },
      { title: 'Thread Safety problem (advanced)', reason: 'In multi-threaded environments, two threads may enter the if block at the same time and create two instances.' }
    ],
    comparisons: [
      { diff: 'Singleton is an object — it can inherit and implement interfaces. Static class is just a bundle of methods.' },
      { diff: 'Factory creates different objects each time. Singleton always returns the same object.' }
    ],
    quiz: [
      { q: 'Why must a Singleton constructor be private?',
        options: ['To save memory', 'To prevent external instance creation', 'To improve performance', 'Because Java requires it'],
        explain: 'A private constructor blocks any external code from creating new instances via `new` — the very mechanism that guarantees only one instance exists.' },
      { q: 'Why use the static keyword on getInstance()?',
        options: ['To speed up the method', 'To allow calling without creating an object', 'To make the method safe', 'To hide the method'],
        explain: '`static` makes the method belong to the class itself, not an instance, so you can call `Singleton.getInstance()` directly without needing an object first.' },
      { q: 'What is the conventional field name for storing the single instance?',
        options: ['singleton', 'unique', 'uniqueInstance', 'theOne'],
        explain: 'The academically conventional name (used in course examples) is `uniqueInstance`.' },
      { q: 'On the exam you see "ensure exactly one ThreadPool for the entire app" — which pattern?',
        options: ['Factory', 'Builder', 'Singleton', 'Prototype'],
        explain: 'The phrase "one for the entire app" is a direct signal for Singleton.' },
      { q: 'What is the difference between Singleton and Static Class?',
        options: ['No difference', 'Singleton is an object that can inherit and implement interfaces; Static is just methods', 'Static is always faster', 'Singleton is older than Static'],
        explain: 'Singleton is a real object you can pass as a parameter and inherit. A static class is just a collection of methods and variables.' }
    ],
    decisionTree: { question: 'Do you need exactly one shared object across the entire application?', yes: 'Singleton ✓', no: 'Look at other patterns' },
    animatedFlow: [
      { text: 'Client calls getInstance() for the first time', actor: 'Client → Singleton' },
      { text: 'getInstance() checks if uniqueInstance == null', actor: 'Singleton' },
      { text: 'Because it\'s null, it creates a new instance and stores it', actor: 'Singleton creates Self' },
      { text: 'Returns the instance to the Client', actor: 'Singleton → Client' },
      { text: 'A second Client calls getInstance()', actor: 'Client2 → Singleton' },
      { text: 'This time uniqueInstance exists — returns the same instance', actor: 'Singleton → Client2' }
    ]
  },

  prototype: {
    realWorldExamples: [
      { desc: 'A document system with ready templates (Report, Invoice). Instead of rebuilding each time, save once and clone.', where: 'Microsoft Word templates, Google Docs templates' },
      { desc: 'A game with many objects of the same type. Loading the model is expensive, so clone instead of reload.', where: 'Unity GameObject.Instantiate()' },
      { desc: 'Cloning a complex component with all its settings instead of rebuilding from scratch.', where: 'JComponent.clone() in Swing' }
    ],
    pitfalls: [
      { title: 'Forgetting super() in the Copy Constructor', reason: 'Without super(t), inherited fields will not be copied — leading to subtle bugs.' },
      { title: 'Shallow copy of references', reason: 'If your object holds another object reference, both clones will share it — modifying one affects the other.' },
      { title: 'Not implementing Cloneable interface', reason: 'In Java, you must implement Cloneable for Object.clone() to work, otherwise it throws CloneNotSupportedException.' },
      { title: 'Using clone() when prototypes are stateless', reason: 'If there\'s no expensive state, just `new` is simpler than clone. Prototype shines when construction is costly.' }
    ],
    comparisons: [
      { diff: 'Factory creates new objects from scratch each time. Prototype copies a pre-built template — faster when construction is expensive.' },
      { diff: 'Builder constructs step-by-step. Prototype starts from a complete template and modifies only the parts that differ.' }
    ],
    quiz: [
      { q: 'When is Prototype better than Factory?',
        options: ['When you have many subclasses', 'When object creation is expensive and there\'s a template available', 'When you need only one instance', 'When you have no interface'],
        explain: 'Prototype shines when the construction cost is high and you have a configured object to copy from.' },
      { q: 'What is shallow copy?',
        options: ['Copying everything completely', 'Copying only the top level — references are shared', 'A faster type of clone', 'A type of inheritance'],
        explain: 'Shallow copy duplicates the object but shares its internal references — both clones point to the same nested objects.' },
      { q: 'What method does Prototype rely on in Java?',
        options: ['copy()', 'clone()', 'duplicate()', 'replicate()'],
        explain: 'Java\'s built-in mechanism for prototyping is the Object.clone() method.' },
      { q: 'When should you avoid Prototype?',
        options: ['When objects are simple and cheap to create', 'When you have many templates', 'When you need clones at runtime', 'When using collections'],
        explain: 'If objects are simple and cheap, just `new` is clearer than implementing clone logic.' }
    ],
    decisionTree: { question: 'Is object construction expensive, and do you need many copies?', yes: 'Prototype ✓', no: 'Consider Builder or Factory' },
    animatedFlow: [
      { text: 'Client has a pre-built prototype object', actor: 'Client holds Prototype' },
      { text: 'Client calls prototype.clone()', actor: 'Client → Prototype' },
      { text: 'Prototype creates a deep copy of itself', actor: 'Prototype copies Self' },
      { text: 'Client modifies the clone without affecting the original', actor: 'Client modifies Clone' },
      { text: 'Both original and clone exist independently', actor: 'Independent instances' },
      { text: 'The new instance is returned to the Client', actor: 'Prototype → Client' }
    ]
  },

  builder: {
    realWorldExamples: [
      { desc: 'Burger King: choose bun, patty, sauces, toppings — most optional. Builder lets you fluently chain choices.', where: 'Restaurant POS systems' },
      { desc: 'Building an HTTP request: URL is required, but method, headers, body, timeout are all optional.', where: 'OkHttp Request.Builder' },
      { desc: 'Constructing immutable configuration objects with many optional fields and validation in build().', where: 'Spring @ConfigurationProperties, Lombok @Builder' },
      { desc: 'Building a complex configuration object with many optional properties.', where: 'Lombok @Builder, AWS SDK clients' }
    ],
    pitfalls: [
      { title: 'Forgetting to return `this` in withX() methods', reason: 'Without `return this`, the fluent chain breaks. Each setter must return the builder for chaining.' },
      { title: 'Not making the Product immutable', reason: 'Mutable Product defeats half the benefit — anyone can change it after build(). Use final fields.' },
      { title: 'Missing validation in build()', reason: 'build() should validate required fields. Without it, you create invalid objects that crash later.' },
      { title: 'Builder methods exposing internal Product fields', reason: 'Builder should be a clean facade — never expose `getProduct()` mid-construction.' }
    ],
    comparisons: [
      { diff: 'Factory creates one complete object at once. Builder builds piece by piece with optional steps.' },
      { diff: 'Prototype starts from an existing template. Builder starts from scratch and constructs incrementally.' }
    ],
    quiz: [
      { q: 'Why do builder methods return `this`?',
        options: ['To save memory', 'To enable method chaining (fluent API)', 'To improve performance', 'Java requires it'],
        explain: 'Returning `this` lets you chain calls like `.withSize(M).withColor(red).build()` — the hallmark of the Builder pattern.' },
      { q: 'When should you use Builder?',
        options: ['When the object has few required fields', 'When the object has many parameters, mostly optional', 'When you need only one instance', 'For simple value objects'],
        explain: 'Builder shines when constructors would become unreadable with many optional parameters (the telescoping constructor anti-pattern).' },
      { q: 'What method finalizes the construction in a Builder?',
        options: ['create()', 'build()', 'make()', 'construct()'],
        explain: 'The conventional name is `build()` — it validates state and returns the final immutable product.' },
      { q: 'Where does validation typically happen in Builder?',
        options: ['In each withX() method', 'In the constructor only', 'Inside build()', 'In the client code'],
        explain: 'Validation goes in `build()` because that\'s where the final product is materialized and all fields are available together.' },
      { q: 'Exam: "VirtualMachine has cloudProvider, region (required) and tags, ports (optional)" — which pattern?',
        options: ['Factory', 'Builder', 'Singleton', 'Adapter'],
        explain: 'Words "optional" + "multiple fields" = direct signal for Builder.' }
    ],
    decisionTree: { question: 'Does the object have many fields, mostly optional?', yes: 'Builder ✓', no: 'Use Singleton — for one copy. Factory — for many types.' },
    animatedFlow: [
      { text: 'Client creates a new Builder', actor: 'Client creates Builder' },
      { text: 'Client chains withX() calls — each sets a field, returns the builder', actor: 'Client → Builder' },
      { text: 'Client calls build()', actor: 'Client → Builder.build()' },
      { text: 'Builder validates the collected fields', actor: 'Builder validates' },
      { text: 'Builder constructs and returns the final Product', actor: 'Builder → Product' },
      { text: 'Product is immutable and ready to use', actor: 'Product → Client' }
    ]
  },

  factory: {
    realWorldExamples: [
      { desc: 'A drawing app supports Circle, Square, Triangle. ShapeFactory.get("circle") returns the right shape without coupling clients to concrete classes.', where: 'Most graphics frameworks' },
      { desc: 'JDBC DriverManager.getConnection() picks the right driver (MySQL, PostgreSQL, Oracle) based on the URL string.', where: 'java.sql.DriverManager' },
      { desc: 'A messaging system sends SMS, Email, or WhatsApp via the same interface. The factory picks the right sender.', where: 'Notification services' }
    ],
    pitfalls: [
      { title: 'Hardcoding types with string comparisons', reason: 'Strings are typo-prone. Prefer enums or type tokens for compile-time safety.' },
      { title: 'Returning null for unknown types', reason: 'Silent null returns hide bugs. Throw an explicit IllegalArgumentException instead.' },
      { title: 'Coupling the factory to too many concrete classes', reason: 'A factory creating 20 types becomes a god class. Consider splitting into smaller factories.' },
      { title: 'Forgetting to use the interface in the return type', reason: 'Returning the concrete type defeats the purpose — client must depend on the abstraction.' }
    ],
    comparisons: [
      { diff: 'Factory creates one object. Abstract Factory creates families of related objects.' },
      { diff: 'Builder builds step-by-step. Factory creates in one call. Use Builder for many optional params, Factory for picking a type.' }
    ],
    quiz: [
      { q: 'Why should the factory return an interface type rather than a concrete class?',
        options: ['For better performance', 'To decouple client code from concrete implementations', 'It uses less memory', 'Java requires it'],
        explain: 'Returning the interface keeps the client unaware of concrete classes — that\'s the whole point of the pattern.' },
      { q: 'What\'s the main problem the Factory pattern solves?',
        options: ['Memory management', 'Tight coupling between client and concrete classes', 'Thread safety', 'Code duplication'],
        explain: 'Without Factory, every `new Circle()` couples the client to the Circle class. Factory centralizes that decision in one place.' },
      { q: 'When you add a new product type, where do you modify?',
        options: ['Every client', 'The Factory only', 'The Product interface', 'The build system'],
        explain: 'Only the Factory needs editing — clients still call factory.create("newType") and get back the interface.' },
      { q: 'What\'s an anti-pattern in Factory implementations?',
        options: ['Using switch statements', 'Returning the interface', 'Returning concrete types from create()', 'Having many products'],
        explain: 'Returning the concrete type couples the client to the implementation — defeating the Factory\'s purpose.' }
    ],
    decisionTree: { question: 'Do you choose between several types of the same interface based on input?', yes: 'Factory ✓', no: 'Singleton — for one only. Builder — for many fields.' },
    animatedFlow: [
      { text: 'Client wants a Shape but doesn\'t know which type', actor: 'Client → ShapeFactory' },
      { text: 'Client calls factory.get("circle")', actor: 'Client → Factory' },
      { text: 'Factory checks the type string', actor: 'Factory decides' },
      { text: 'Factory instantiates the concrete Circle', actor: 'Factory creates Circle' },
      { text: 'Factory returns the Circle as a Shape interface', actor: 'Factory → Client' },
      { text: 'Client uses circle.draw() via Shape — concrete type stays hidden', actor: 'Client uses Shape' }
    ]
  },

  adapter: {
    realWorldExamples: [
      { desc: 'Your app expects MediaPlayer.play(), but a new library uses AdvancedMediaPlayer.playMp4(). An Adapter translates between them.', where: 'Audio/video libraries' },
      { desc: 'Arrays.asList() in Java adapts an array (old) to a List (new) — no copying, just interface translation.', where: 'java.util.Arrays' },
      { desc: 'Charging an EU device in the US: physical adapter converts plug shape without changing the device or socket.', where: 'Power adapters (real-world metaphor)' },
      { desc: 'A legacy library has an API that doesn\'t match your code. You write an adapter that wraps it with your interface.', where: 'Any integration with legacy systems' }
    ],
    pitfalls: [
      { title: 'Confusing Adapter with Decorator', reason: 'Adapter changes the interface; Decorator keeps the same interface and adds features. Same structure, different intent.' },
      { title: 'Adapting too much logic inside the Adapter', reason: 'Adapter should only translate — not implement business logic. Keep it thin.' },
      { title: 'Forgetting that Adapter is post-hoc', reason: 'If you control both interfaces, just design them compatibly — Adapter is for code you can\'t change.' },
      { title: 'Wrapping the wrong way', reason: 'Adapter implements the Target (client-facing) interface and holds the Adaptee — not the other way around.' }
    ],
    comparisons: [
      { diff: 'Adapter changes the interface — used when fixing legacy mismatches. Decorator keeps the interface and adds behavior.' },
      { diff: 'Adapter wraps a third-party class. Bridge is designed upfront for flexibility, not as a retrofit.' }
    ],
    quiz: [
      { q: 'When is Adapter the right pattern?',
        options: ['When designing a system from scratch', 'When integrating a third-party class with incompatible interface', 'When adding features to an object', 'When sharing state'],
        explain: 'Adapter is specifically for retrofitting incompatible interfaces — usually third-party or legacy code you can\'t modify.' },
      { q: 'How is Adapter different from Decorator?',
        options: ['They are the same', 'Adapter changes the interface; Decorator keeps it', 'Decorator is faster', 'Adapter only works on classes'],
        explain: 'Adapter\'s purpose is to make incompatible interfaces work together. Decorator\'s purpose is to add new behavior with the same interface.' },
      { q: 'What does the Adapter class hold?',
        options: ['Two adaptees', 'A reference to the Adaptee', 'A factory', 'A singleton'],
        explain: 'The Adapter implements the Target interface and internally holds an instance of the Adaptee to delegate calls to.' },
      { q: 'If you can modify both sides — should you use Adapter?',
        options: ['Yes, always', 'No — design them compatibly directly', 'Only for performance', 'Only for testing'],
        explain: 'If you control both, just design the interfaces to match. Adapter is for situations where one side can\'t change.' }
    ],
    decisionTree: { question: 'Do you have an existing interface that doesn\'t match what your system expects?', yes: 'Adapter ✓', no: 'Decorator — to add features. Proxy — to control access.' },
    animatedFlow: [
      { text: 'Client expects Target interface (play())', actor: 'Client expects Target' },
      { text: 'But available class has different interface (playMp4(), playVlc())', actor: 'Adaptee exists' },
      { text: 'Adapter implements Target and holds Adaptee', actor: 'Adapter wraps Adaptee' },
      { text: 'Client calls adapter.play("song.mp4")', actor: 'Client → Adapter' },
      { text: 'Adapter translates: calls adaptee.playMp4("song.mp4")', actor: 'Adapter → Adaptee' },
      { text: 'Adaptee does the actual work', actor: 'Adaptee plays' }
    ]
  },

  decorator: {
    realWorldExamples: [
      { desc: 'Coffee shop: BasicCoffee, then optionally MilkDecorator, SugarDecorator, WhippedCreamDecorator. Each wraps and adds cost/description.', where: 'Order systems' },
      { desc: 'Java I/O: BufferedReader wraps InputStreamReader wraps FileInputStream — each layer adds a function.', where: 'java.io package' },
      { desc: 'Web frameworks add middleware: logging, auth, compression — each wraps the next handler.', where: 'Express.js, ASP.NET' }
    ],
    pitfalls: [
      { title: 'Forgetting that Decorator has the same interface as the wrapped object', reason: 'If decorator returns a different type, you lose transparency. Both implement the same Component interface.' },
      { title: 'Decorator order matters!', reason: 'Milk(Sugar(coffee)) and Sugar(Milk(coffee)) may produce different results — operations may not be commutative.' },
      { title: 'Identity check (==) breaks after wrapping', reason: 'coffee != milkDecorator(coffee). If you compare references, you may get unexpected results.' },
      { title: 'Decorator chains become hard to debug', reason: 'Stack traces show 10 wrappers. Use clear naming and consider Builder for very deep chains.' }
    ],
    comparisons: [
      { diff: 'Decorator adds features dynamically. Inheritance is static and fixed — Decorator wins for runtime composition.' },
      { diff: 'Proxy controls access; Decorator adds behavior. Same structure but different intent.' },
      { diff: 'Inheritance is fixed at write-time. Decorator is flexible at runtime.' }
    ],
    quiz: [
      { q: 'Why is Decorator preferred over multiple subclasses?',
        options: ['It\'s faster', 'It avoids class explosion for feature combinations', 'It uses less memory', 'Java requires it'],
        explain: '5 features = 32 combinations. With inheritance you\'d need 32 classes. With Decorator, just 5 classes — compose at runtime.' },
      { q: 'Decorator and the wrapped object must share what?',
        options: ['Same class', 'Same Component interface', 'Same factory', 'Same memory'],
        explain: 'Both implement the same Component interface so the decorator is transparent — clients can\'t tell the difference.' },
      { q: 'When is order of decorators important?',
        options: ['Never', 'When operations are not commutative (e.g., encrypt then compress vs compress then encrypt)', 'Only for performance', 'Only in Java'],
        explain: 'If operations don\'t commute (like encrypt+compress), the order changes the result. Decorator order matters in these cases.' },
      { q: 'Java I/O streams are a classic example of which pattern?',
        options: ['Factory', 'Singleton', 'Decorator', 'Observer'],
        explain: 'BufferedReader → InputStreamReader → FileInputStream is a textbook Decorator chain — each layer adds a capability.' }
    ],
    decisionTree: { question: 'Do you want to add features/responsibilities to an object dynamically and stackably?', yes: 'Decorator ✓', no: 'Strategy — to swap behavior. Adapter — to change interface.' },
    animatedFlow: [
      { text: 'Start with a base Component (BasicCoffee)', actor: 'BasicCoffee created' },
      { text: 'Wrap with first Decorator (MilkDecorator)', actor: 'Milk wraps Coffee' },
      { text: 'Wrap again with SugarDecorator', actor: 'Sugar wraps Milk' },
      { text: 'Client calls cost() on the outermost wrapper', actor: 'Client → Sugar' },
      { text: 'Sugar.cost() calls Milk.cost() + sugar price', actor: 'Sugar → Milk' },
      { text: 'Milk.cost() calls Coffee.cost() + milk price', actor: 'Milk → Coffee' },
      { text: 'Total bubbles back up through the chain', actor: 'Result returns to Client' }
    ]
  },

  flyweight: {
    realWorldExamples: [
      { desc: 'A game forest with 1,000,000 trees. Each tree shares texture and mesh (intrinsic). Only position and scale (extrinsic) vary per tree.', where: 'Game engines (Unity, Unreal)' },
      { desc: 'Text editor: 1M characters, each one of only 26 letters. Each letter is a Flyweight — character info shared, position is per-instance.', where: 'Editors, browsers' },
      { desc: 'Java String pool: all string literals like "hello" share one instance via String.intern().', where: 'java.lang.String' },
      { desc: 'An open-world game with 50,000 trees. Each tree shares its model/texture with other trees of the same type.', where: 'Skyrim, Witcher 3, GTA' }
    ],
    pitfalls: [
      { title: 'Mixing intrinsic and extrinsic state', reason: 'If you store position (extrinsic) inside the Flyweight, sharing breaks. Keep Flyweights immutable.' },
      { title: 'Forgetting the Factory cache', reason: 'Without a cache (Map), you keep creating new Flyweights — defeating the memory savings.' },
      { title: 'Modifying a Flyweight\'s intrinsic state', reason: 'Disaster — all contexts sharing it get corrupted. Flyweights must be immutable.' },
      { title: 'Using Flyweight when you have only a few objects', reason: 'The overhead isn\'t worth it for 10 objects. Flyweight pays off with thousands+.' }
    ],
    comparisons: [
      { diff: 'Singleton shares ONE object app-wide. Flyweight shares many flyweights, one per unique value.' },
      { diff: 'Flyweight + Factory go together — the factory caches flyweights by key.' }
    ],
    quiz: [
      { q: 'What is "intrinsic" state in Flyweight?',
        options: ['State that changes per instance', 'State shared across all instances (immutable)', 'State stored in the database', 'Private state'],
        explain: 'Intrinsic state is shared — like the texture of a tree type. It\'s stored once in the Flyweight and shared by all contexts using it.' },
      { q: 'When does Flyweight pay off?',
        options: ['Always', 'When you have very many similar objects (thousands+)', 'When you have only a few objects', 'When using inheritance'],
        explain: 'Flyweight\'s overhead is justified only with thousands or millions of objects sharing common state.' },
      { q: 'What must Flyweight objects be?',
        options: ['Mutable', 'Immutable (shared, can\'t change)', 'Public', 'Generic'],
        explain: 'Because Flyweights are shared by many contexts, any mutation would corrupt all sharers. They must be immutable.' },
      { q: 'Java\'s String.intern() is an example of which pattern?',
        options: ['Singleton', 'Factory', 'Flyweight', 'Prototype'],
        explain: 'String literals share the same instance via the string pool — a classic Flyweight implementation built into the JVM.' },
      { q: 'What data structure does the Factory use to store flyweights?',
        options: ['Array', 'LinkedList', 'HashMap', 'Stack'],
        explain: 'HashMap is ideal for O(1) flyweight lookup by key.' }
    ],
    decisionTree: { question: 'Do you have thousands/millions of similar objects and need to save memory?', yes: 'Flyweight ✓', no: 'Singleton — for shared one. Prototype — for independent copies.' },
    animatedFlow: [
      { text: 'Identify intrinsic (shared) vs extrinsic (per-instance) state', actor: 'Designer splits state' },
      { text: 'Client requests a Tree of type "Oak"', actor: 'Client → Factory' },
      { text: 'Factory checks cache for "Oak" Flyweight', actor: 'Factory checks cache' },
      { text: 'If not cached, create and store. Otherwise return cached', actor: 'Factory returns Flyweight' },
      { text: 'Client wraps the Flyweight with extrinsic data (position)', actor: 'Client creates Tree context' },
      { text: 'Memory used: 1 Oak Flyweight + N Tree contexts (small)', actor: 'Result: memory saved' }
    ]
  },

  proxy: {
    realWorldExamples: [
      { desc: 'A web app loads thumbnail proxies first. Full-resolution image loaded only when the user clicks (virtual proxy / lazy load).', where: 'Image galleries, viewers' },
      { desc: 'Hibernate generates proxies for entity relations — collections load lazily on first access.', where: 'Hibernate, JPA' },
      { desc: 'Spring Security wraps methods with auth proxies — checks permission before forwarding the call.', where: 'Spring AOP' },
      { desc: 'API calls are expensive. The proxy caches results and returns them without calling the service again.', where: 'CDN, Redis, Cloudflare' }
    ],
    pitfalls: [
      { title: 'Confusing Proxy with Decorator', reason: 'Decorator adds features; Proxy controls access. Same structure, opposite intent.' },
      { title: 'Forgetting that Proxy must implement the same interface as RealSubject', reason: 'If interfaces differ, clients can\'t use the proxy transparently — they must know about it.' },
      { title: 'Heavy logic inside the proxy', reason: 'Proxy should be thin — auth check, cache lookup, or lazy init. Don\'t put business logic here.' },
      { title: 'Lazy proxy creating RealSubject too eagerly', reason: 'The whole point of lazy loading is to defer creation. Verify the RealSubject is created only when actually needed.' }
    ],
    comparisons: [
      { diff: 'Decorator adds behavior; Proxy controls access. Both wrap and share the interface — intent differs.' },
      { diff: 'Adapter changes the interface; Proxy keeps the same interface as the RealSubject.' },
      { diff: 'Proxy is one-to-one (1:1). Facade simplifies a group of subsystems into a single interface.' }
    ],
    quiz: [
      { q: 'What\'s the primary purpose of Proxy?',
        options: ['Add features', 'Control access to another object', 'Change interface', 'Manage state'],
        explain: 'Proxy controls access — for lazy loading, caching, auth checks, or remote calls. Same interface as RealSubject, different gateway.' },
      { q: 'Proxy and RealSubject must implement what?',
        options: ['Different interfaces', 'The same interface', 'Two interfaces', 'No interface'],
        explain: 'Both implementing the same interface makes the proxy transparent — the client uses them interchangeably.' },
      { q: 'Virtual Proxy is used for what?',
        options: ['Encrypting data', 'Lazy loading expensive resources', 'Caching', 'Authentication'],
        explain: 'Virtual Proxy defers creation of the expensive RealSubject until actually needed — e.g., image loading on scroll.' },
      { q: 'Hibernate lazy loading uses which pattern?',
        options: ['Factory', 'Proxy', 'Singleton', 'Adapter'],
        explain: 'Hibernate auto-generates proxies for entity associations. The collection is queried only when first accessed.' }
    ],
    decisionTree: { question: 'Do you want to control access to an object (lazy, auth, cache) without changing its interface?', yes: 'Proxy ✓', no: 'Decorator — to add features. Adapter — to change interface.' },
    animatedFlow: [
      { text: 'Client thinks it\'s talking to RealSubject', actor: 'Client → Proxy (thinks it\'s Real)' },
      { text: 'Proxy intercepts the call', actor: 'Proxy receives' },
      { text: 'Proxy checks conditions (auth, cache, lazy init)', actor: 'Proxy decides' },
      { text: 'If allowed, Proxy forwards to RealSubject', actor: 'Proxy → Real' },
      { text: 'RealSubject performs the actual work', actor: 'Real executes' },
      { text: 'Result returns through Proxy to Client', actor: 'Real → Proxy → Client' }
    ]
  },

  observer: {
    realWorldExamples: [
      { desc: 'Twitter: when a user tweets, all followers, hashtag feeds, mobile notifications, and caches update — without the Tweet knowing them.', where: 'Social media platforms' },
      { desc: 'Stock trading dashboard: 50 UI components subscribe to price updates. One change → all update.', where: 'Trading platforms' },
      { desc: 'DOM events: addEventListener("click", handler) — the button broadcasts clicks to all listeners without knowing who they are.', where: 'Every web app' },
      { desc: 'All of reactive programming is built on the Observer pattern.', where: 'RxJava, RxJS, Project Reactor' }
    ],
    pitfalls: [
      { title: 'Memory leak: forgetting to unsubscribe', reason: 'Observers stay in the list forever, blocking garbage collection. Always provide and use unsubscribe().' },
      { title: 'Cascading updates causing chains', reason: 'An observer\'s update() may modify another subject — triggering more updates. Watch for infinite loops.' },
      { title: 'Order of notifications undefined', reason: 'If your observers depend on a specific order, the Observer pattern doesn\'t guarantee it. Consider a different design.' },
      { title: 'Heavy work in update()', reason: 'notify() runs all updates synchronously. Slow observers stall the whole notification chain.' }
    ],
    comparisons: [
      { diff: 'Observer broadcasts to N subscribers. Mediator centralizes communication between N components.' },
      { diff: 'Observer is loose coupling for events. Pub/Sub adds a broker between publisher and subscribers.' }
    ],
    quiz: [
      { q: 'What problem does Observer solve?',
        options: ['Memory management', 'Tight coupling when one object\'s change affects many', 'Thread safety', 'Object creation'],
        explain: 'When state changes need to update multiple components, hardcoding all listeners couples them tightly. Observer decouples publisher from subscribers.' },
      { q: 'In Observer, who maintains the subscriber list?',
        options: ['The Observer', 'The Subject', 'A separate Manager', 'The client'],
        explain: 'The Subject (Observable) holds the list and calls notify() on state changes. Observers don\'t know about each other.' },
      { q: 'What\'s a common Observer memory leak?',
        options: ['Too many notifications', 'Forgetting to unsubscribe', 'Using interfaces', 'Heavy subjects'],
        explain: 'Observers remain in the subject\'s list even after they\'re no longer needed — preventing garbage collection. Always unsubscribe.' },
      { q: 'When you do `button.addEventListener("click", fn)` — what pattern?',
        options: ['Singleton', 'Observer', 'Factory', 'Decorator'],
        explain: 'addEventListener is a textbook Observer subscription. The button (Subject) broadcasts events to its listeners (Observers).' },
      { q: 'What happens when the Subject\'s state changes?',
        options: ['Nothing automatic', 'It calls notify(), which calls update() on each Observer', 'Observers must poll', 'It logs the change'],
        explain: 'State change triggers notify(), which iterates and calls update() on each registered Observer.' }
    ],
    decisionTree: { question: 'Do you need to automatically notify multiple objects when one object\'s state changes?', yes: 'Observer ✓', no: 'Mediator — to manage communication. Strategy — for swappable algorithms.' },
    animatedFlow: [
      { text: 'Observer1 calls subject.subscribe(self)', actor: 'Observer1 → Subject' },
      { text: 'Subject adds it to the list: observers.add(o1)', actor: 'Subject stores Observer1' },
      { text: 'Observer2, Observer3 also subscribe', actor: 'More subscribers' },
      { text: 'Event happens: subject.notifyUpdate("news!")', actor: 'Event triggers' },
      { text: 'Subject loops the list and calls update() on each', actor: 'Subject → All observers' },
      { text: 'Each Observer handles the update its own way', actor: 'Observers update' }
    ]
  },

  strategy: {
    realWorldExamples: [
      { desc: 'Payment app supports Cash, Card, PayPal, Apple Pay — each is a Strategy. User picks, context delegates.', where: 'E-commerce platforms' },
      { desc: 'Collections.sort(list, comparator) takes a Strategy (Comparator) to decide how to sort. Swap the comparator, swap the strategy.', where: 'Java Collections' },
      { desc: 'Compression library picks GZIP, ZIP, or Brotli per file type — each is a Strategy with the same compress() interface.', where: 'File compressors' },
      { desc: 'GPS calculates the route: fastest, shortest, or avoid traffic. Each routing approach is a strategy.', where: 'Google Maps, Waze' }
    ],
    pitfalls: [
      { title: 'Using Strategy for only 2 simple algorithms', reason: 'Overkill — a simple if/else or boolean parameter is clearer when there are just 2 trivial options.' },
      { title: 'Strategy that needs too much context', reason: 'If the Strategy needs 10 parameters, the design is wrong. Strategies should be self-contained.' },
      { title: 'Confusing Strategy with State', reason: 'Strategy: client picks explicitly. State: object changes internally based on transitions. Same structure, different control.' },
      { title: 'Hardcoding strategy selection', reason: 'If you write if/else to pick a strategy, you\'ve recreated the problem you tried to solve. Use a Factory or lookup.' }
    ],
    comparisons: [
      { diff: 'Strategy is explicit — client picks. State changes implicitly based on internal transitions.' },
      { diff: 'Strategy uses composition (delegates to a Strategy). Template Method uses inheritance (subclasses override).' },
      { diff: 'Strategy = composition (passed in). Template Method = inheritance (overridden in subclass).' }
    ],
    quiz: [
      { q: 'What is the key feature of Strategy?',
        options: ['Single instance', 'Algorithms are interchangeable at runtime', 'Object creation', 'Memory sharing'],
        explain: 'Strategy lets you swap the algorithm a context uses, at runtime, without modifying the context.' },
      { q: 'How does the Context use a Strategy?',
        options: ['Inherits it', 'Holds a reference and delegates calls', 'Creates it inline', 'Caches it globally'],
        explain: 'The Context composes a Strategy reference and delegates the work — composition over inheritance.' },
      { q: 'What replaces a long if/else chain with Strategy?',
        options: ['A switch statement', 'Polymorphism — each branch becomes a Strategy class', 'A loop', 'A factory only'],
        explain: 'Each branch of the if/else becomes a Strategy implementation. The Context delegates without knowing which one.' },
      { q: 'In Java, a lambda passed to Collections.sort() acts as:',
        options: ['A factory', 'A Strategy (Comparator)', 'An observer', 'A decorator'],
        explain: 'The Comparator lambda is the strategy — sort() delegates the comparison decision to it.' }
    ],
    decisionTree: { question: 'Do you have multiple algorithms doing the same task differently and want to swap them?', yes: 'Strategy ✓', no: 'Observer — if you\'re notifying changes. Factory — if you\'re creating objects.' },
    animatedFlow: [
      { text: 'Context is created with an initial Strategy', actor: 'Context holds Strategy' },
      { text: 'Client calls context.execute()', actor: 'Client → Context' },
      { text: 'Context delegates to strategy.execute()', actor: 'Context → Strategy' },
      { text: 'Strategy performs its algorithm', actor: 'Strategy executes' },
      { text: 'Result returns to Context, then Client', actor: 'Result returns' },
      { text: 'Client swaps strategy: context.setStrategy(newOne)', actor: 'Strategy swapped at runtime' },
      { text: 'Next execute() uses the new strategy without changing Context', actor: 'Context delegates to new Strategy' }
    ]
  }
};

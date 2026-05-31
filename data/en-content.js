// ============================================================
// English Content — All patterns intro + class descriptions + method purposes
// Loaded alongside Arabic data, merged at runtime
// ============================================================
window.EN_CONTENT = {

  singleton: {
    taglineEn: 'Only one instance of the class exists across the entire application',
    shortDescEn: 'Ensures only one instance of a class exists, with a global access point',
    introEn: `<strong>Singleton</strong> ensures that a class has <strong>only one instance</strong> throughout the entire program, providing a global access point to it.
    <br><br>
    <strong>When to use it?</strong> When you need a single shared object across all parts of the program: database connections, Loggers, application settings.
    <br><br>
    <strong>The three pillars (memorize these):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><code>private static</code> field that holds the single instance</li>
      <li><code>private constructor</code> prevents anyone from calling <code>new</code></li>
      <li><code>public static getInstance()</code> — the only way to access it</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Singleton Class — contains all logic and self-manages its own instance',
        descEn: 'This class IS the Singleton. It stores its only instance internally and controls its creation.',
        methods: [
          { purposeEn: 'A static field that stores the single instance. Being static makes it shared across the class (not per object). Being private means nobody outside can modify it.' },
          { purposeEn: 'The constructor is private! This is the most important point. If it were public, anyone could call new DBConnection() and break the Singleton. Private restricts creation to the class itself.' },
          { purposeEn: 'The only way to get the instance. First call: checks if uniqueInstance == null and creates it. Every subsequent call returns the same instance. This guarantees only one instance exists.' }
        ]
      },
      {
        roleEn: 'Client — demonstrates that all requests return the same instance',
        descEn: 'The class that uses the Singleton and proves any new request returns the same object.',
        methods: [
          { purposeEn: 'Creates two instances and compares them with ==. If == returns true they are the same object in memory (Singleton succeeded). Notice: we use getInstance(), never new.' }
        ]
      }
    ]
  },

  prototype: {
    taglineEn: 'Clone existing objects instead of building them from scratch',
    shortDescEn: 'Copies existing objects using a copy constructor instead of creating new ones from scratch',
    introEn: `<strong>Prototype</strong> creates new objects by <strong>cloning an existing object</strong> instead of building from scratch.
    <br><br>
    <strong>When to use it?</strong> When object creation is expensive (DB calls, file loading), and you need multiple similar objects. Clone a ready prototype instead of re-building.
    <br><br>
    <strong>Key mechanism:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Abstract base class with <code>abstract clone()</code></li>
      <li>Each subclass has a <strong>copy constructor</strong> that copies all fields</li>
      <li>A cache/registry stores ready prototypes and returns clones</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Abstract Prototype — defines the clone() contract',
        descEn: 'The abstract base that forces every subclass to implement clone(). Holds shared fields.',
        methods: [
          { purposeEn: 'Stores fields shared by all shapes (e.g. color). Subclasses inherit and extend these.' },
          { purposeEn: 'The copy constructor. Takes an existing object of the same type and copies all its fields. Called inside clone().' },
          { purposeEn: 'Abstract method every subclass must implement. Returns a new copy of itself.' }
        ]
      },
      {
        roleEn: 'Concrete Prototype — implements clone via copy constructor',
        descEn: 'A concrete shape that knows how to copy itself using its copy constructor.',
        methods: [
          { purposeEn: 'Copies the parent fields via super(target), then copies its own specific fields (like radius).' },
          { purposeEn: 'Implementation of clone(). Simply calls the copy constructor: return new Circle(this).' }
        ]
      },
      {
        roleEn: 'Registry/Cache — stores prototypes and returns clones on request',
        descEn: 'Holds a HashMap of pre-built prototypes. Returns a clone (not the original!) when requested.',
        methods: [
          { purposeEn: 'Stores a ready-made prototype by key. Call this once during setup.' },
          { purposeEn: 'Returns a clone of the prototype. Critical: returns clone(), NOT the original, to prevent modifying the cache.' }
        ]
      }
    ]
  },

  builder: {
    taglineEn: 'Build complex objects step-by-step with optional and required fields',
    shortDescEn: 'Separates complex object construction from its representation, handling many optional fields cleanly',
    introEn: `<strong>Builder</strong> solves the problem of objects with <strong>many parameters</strong> — especially when some are optional.
    <br><br>
    <strong>When to use it?</strong> When a class has 4+ fields and some are optional. Avoids ugly telescoping constructors.
    <br><br>
    <strong>Key structure:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Private constructor in the Product that accepts a Builder</li>
      <li><code>public static class Builder</code> inside the Product</li>
      <li>Builder constructor takes required fields</li>
      <li><code>withX()</code> methods for optional fields — each returns <code>this</code></li>
      <li><code>build()</code> creates and returns the Product</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Product — the complex object being built',
        descEn: 'The final object. Has a private constructor that only accepts a Builder.',
        methods: [
          { purposeEn: 'Private constructor accepting a Builder. Copies all values from the builder. This ensures the object can only be created through the Builder.' },
          { purposeEn: 'Returns the value of this field. Standard getter.' }
        ]
      },
      {
        roleEn: 'Builder (inner static class) — assembles the product step by step',
        descEn: 'Lives inside the Product class. Holds the same fields and provides a fluent API.',
        methods: [
          { purposeEn: 'Constructor takes only the REQUIRED fields. This forces callers to always provide them. Optional fields have defaults (null/0).' },
          { purposeEn: 'Sets an optional field and returns THIS — enabling method chaining: .withA().withB().withC().' },
          { purposeEn: 'Creates the final Product by passing this Builder to the private constructor.' }
        ]
      }
    ]
  },

  factory: {
    taglineEn: 'Create objects without specifying the exact class — let a factory decide',
    shortDescEn: 'Creates objects from a common interface based on a string input, hiding creation complexity',
    introEn: `<strong>Factory (Simple Factory)</strong> centralizes object creation — you pass a type string, it returns the right object.
    <br><br>
    <strong>When to use it?</strong> When you have multiple subtypes of the same interface, and the client should not know which exact class to instantiate.
    <br><br>
    <strong>Key rules:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>A shared <code>interface</code> or abstract class for all products</li>
      <li>A Factory class with <code>getX(String type)</code></li>
      <li>Use <strong><code>equalsIgnoreCase</code></strong> — never <code>==</code> for String comparison</li>
      <li>Always check for null and return null as default</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Product Interface — the common contract for all created objects',
        descEn: 'The interface (or abstract class) that all concrete products implement. The Factory returns this type.',
        methods: [
          { purposeEn: 'The operation that every concrete product must implement. The factory returns this interface, so the client can call this without knowing the concrete type.' }
        ]
      },
      {
        roleEn: 'Concrete Product — one specific implementation of the interface',
        descEn: 'A specific product that implements the Product interface. The Factory instantiates this.',
        methods: [
          { purposeEn: 'The specific implementation of the interface method for this product type.' }
        ]
      },
      {
        roleEn: 'Factory Class — creates and returns the right product',
        descEn: 'Contains the creation logic. Uses if-else with equalsIgnoreCase to decide which class to instantiate.',
        methods: [
          { purposeEn: 'The factory method. Takes a type string and returns the appropriate Product. Always use equalsIgnoreCase for comparison, check for null at the start, and return null as the default.' }
        ]
      }
    ]
  },

  adapter: {
    taglineEn: 'Make incompatible interfaces work together without modifying existing code',
    shortDescEn: 'Converts one interface to another, letting existing classes work with systems they were not designed for',
    introEn: `<strong>Adapter</strong> acts as a bridge between two incompatible interfaces — wrapping the old one (Adaptee) to look like the new one (Target).
    <br><br>
    <strong>When to use it?</strong> When you have an existing/third-party class you cannot modify, but need it to work in a system that expects a different interface.
    <br><br>
    <strong>Key rules:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Adapter <strong>implements the Target</strong> interface (NOT the Adaptee)</li>
      <li>Adapter <strong>has-a</strong> reference to the Adaptee (stored in private field)</li>
      <li>Each Target method calls and translates to the Adaptee's method</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Target Interface — what the client expects',
        descEn: 'The interface the client code is written against. The Adapter must implement this.',
        methods: [
          { purposeEn: 'The method the client calls. The Adapter must implement this and internally delegate to the Adaptee.' }
        ]
      },
      {
        roleEn: 'Adaptee — the existing class with an incompatible interface',
        descEn: 'The existing/legacy class. Has its own methods that do not match the Target interface.',
        methods: [
          { purposeEn: 'The Adaptee\'s existing method. Different name/signature from the Target. The Adapter will call this internally.' }
        ]
      },
      {
        roleEn: 'Adapter — implements Target, wraps Adaptee, translates calls',
        descEn: 'Implements the Target interface and holds a reference to the Adaptee. Translates every Target method call into an Adaptee call.',
        methods: [
          { purposeEn: 'Constructor takes the Adaptee and stores it. This is composition — the Adapter wraps the Adaptee.' },
          { purposeEn: 'Implements the Target method. Internally converts parameters if needed and calls the Adaptee\'s method.' }
        ]
      }
    ]
  },

  decorator: {
    taglineEn: 'Add features to objects dynamically at runtime by wrapping them',
    shortDescEn: 'Attaches additional responsibilities to objects dynamically. Decorators wrap existing objects and add on top of them',
    introEn: `<strong>Decorator</strong> adds new behaviors to objects by wrapping them — without modifying the original class or using inheritance for every combination.
    <br><br>
    <strong>When to use it?</strong> When you need to add features that stack on top of each other at runtime (e.g. Coffee + Milk + Sugar + Whip).
    <br><br>
    <strong>Key structure (Professor's version):</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Abstract base class (NOT interface) — Decorator extends it</li>
      <li>CondimentDecorator extends the base AND holds a reference to it</li>
      <li><code>cost()</code> adds its own value + <code>component.cost()</code> (stacking!)</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Component (Abstract Base) — the shared type for drinks and decorators',
        descEn: 'The abstract class that both concrete beverages and decorators extend. Defines the interface that everything must implement.',
        methods: [
          { purposeEn: 'Returns the description. Concrete beverages set a description in their constructor. Decorators override this to append their own.' },
          { purposeEn: 'Abstract method — every concrete component and decorator must implement this to return its price.' }
        ]
      },
      {
        roleEn: 'Concrete Component — a base beverage (no decorations)',
        descEn: 'A specific base drink. Sets its description and price. Gets wrapped by decorators.',
        methods: [
          { purposeEn: 'Returns the base price of this beverage alone. Decorators will ADD to this.' }
        ]
      },
      {
        roleEn: 'Decorator (Abstract) — wraps a component and passes calls through',
        descEn: 'Extends the base class AND holds a reference to it (composition). This is the key that enables stacking.',
        methods: [
          { purposeEn: 'The wrapped component. Could be a base drink or another decorator — enabling unlimited stacking.' }
        ]
      },
      {
        roleEn: 'Concrete Decorator — adds one specific feature/cost on top',
        descEn: 'A specific add-on (like Milk, Mocha). Adds its description to the wrapped component\'s and adds its price on top.',
        methods: [
          { purposeEn: 'Constructor stores the component being wrapped.' },
          { purposeEn: 'Returns the wrapped component\'s description + its own (e.g. "Espresso, Mocha").' },
          { purposeEn: 'Returns its own price + component.cost(). This is what creates the stacking effect.' }
        ]
      }
    ]
  },

  flyweight: {
    taglineEn: 'Share common state among thousands of similar objects to save memory',
    shortDescEn: 'Reduces memory usage by sharing common intrinsic state among many objects, while keeping unique extrinsic state separate',
    introEn: `<strong>Flyweight</strong> solves memory problems when you have <strong>thousands of similar objects</strong> by sharing their common data.
    <br><br>
    <strong>When to use it?</strong> When you have millions of objects with shared properties (POI markers on a map, characters in a text editor, particles in a game).
    <br><br>
    <strong>The two types of state:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li><strong>Intrinsic (shared):</strong> Stored inside the Flyweight — same across many objects (e.g. icon, color, texture)</li>
      <li><strong>Extrinsic (unique):</strong> Stored in the Context — different per object (e.g. position, ID, tooltip)</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Flyweight — holds shared intrinsic state, passed extrinsic when used',
        descEn: 'The shared object. Contains only the state common to many instances. Receives unique state as parameters when draw() is called.',
        methods: [
          { purposeEn: 'Shared state stored here (e.g. character glyph image, tree mesh). This is what gets shared across many Context objects.' },
          { purposeEn: 'Performs its operation. Receives extrinsic state (position, etc.) as parameters — not stored here.' }
        ]
      },
      {
        roleEn: 'FlyweightFactory — manages the pool and ensures sharing',
        descEn: 'Creates and caches Flyweight objects. Returns an existing one if the key already exists, creates a new one otherwise.',
        methods: [
          { purposeEn: 'HashMap of cached flyweights, keyed by a string identifier (e.g. "Oak-Green").' },
          { purposeEn: 'Checks if a flyweight with this key exists. Returns it if yes, creates+stores+returns if no. This is what enforces sharing.' }
        ]
      },
      {
        roleEn: 'Context — holds extrinsic state + reference to shared Flyweight',
        descEn: 'Represents one unique instance. Holds only the unique state (position, ID) and a reference to the shared Flyweight.',
        methods: [
          { purposeEn: 'Unique data per instance (x, y coordinates, tooltip text).' },
          { purposeEn: 'Delegates to the shared flyweight, passing the extrinsic state as a parameter.' }
        ]
      }
    ]
  },

  proxy: {
    taglineEn: 'Control access to an object by placing a surrogate in front of it',
    shortDescEn: 'Provides a substitute that controls access to the real object — for authentication, caching, lazy loading, and logging',
    introEn: `<strong>Proxy</strong> places a middle layer in front of the real object — checking, caching, or logging before delegating to the real service.
    <br><br>
    <strong>When to use it?</strong> When you want to control access (authentication), add caching, lazy-initialize expensive objects, or add logging — without modifying the real service.
    <br><br>
    <strong>Key rules:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Proxy and Real Service <strong>implement the same interface</strong></li>
      <li>Proxy holds a <code>private</code> reference to the Real Service</li>
      <li>Proxy checks first → then delegates to real service if allowed</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Service Interface — shared by both Real and Proxy',
        descEn: 'The common interface implemented by both the real service and the proxy. The client uses this type.',
        methods: [
          { purposeEn: 'The operation the client needs. Both the real service and the proxy implement this — the client cannot tell them apart.' }
        ]
      },
      {
        roleEn: 'Real Service — does the actual work',
        descEn: 'The actual implementation. Does real work but may be expensive or require access control.',
        methods: [
          { purposeEn: 'The real implementation of the operation. The Proxy calls this only after its checks pass.' }
        ]
      },
      {
        roleEn: 'Proxy — controls access, then delegates to Real Service',
        descEn: 'Implements the same interface. Contains access control or caching logic. Delegates to the Real Service when appropriate.',
        methods: [
          { purposeEn: 'Constructor receives and stores the Real Service reference.' },
          { purposeEn: 'Checks permissions/cache first. If the check passes, delegates to real.operation(). Returns null or error otherwise.' }
        ]
      }
    ]
  },

  observer: {
    taglineEn: 'Notify multiple objects automatically when one object changes state',
    shortDescEn: 'Defines a one-to-many dependency: when one object changes, all its subscribers are notified automatically',
    introEn: `<strong>Observer</strong> lets a Subject automatically notify all its registered Observers when something happens.
    <br><br>
    <strong>When to use it?</strong> When a change in one object should trigger updates in many others — notifications, event systems, pub/sub.
    <br><br>
    <strong>Key structure:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Observer interface with <code>update()</code> method</li>
      <li>Subject holds a <code>List&lt;Observer&gt;</code></li>
      <li>Subject has <code>subscribe()</code>, <code>unsubscribe()</code>, and <code>notifyUpdate()</code></li>
      <li><code>notifyUpdate()</code> loops through the list and calls <code>update()</code> on each</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Observer Interface — the contract all subscribers must follow',
        descEn: 'Every subscriber implements this. The Subject only knows this interface — not the concrete types.',
        methods: [
          { purposeEn: 'Called by the Subject to notify this observer. Receives the event data as a parameter.' }
        ]
      },
      {
        roleEn: 'Concrete Observer — a specific subscriber that reacts to events',
        descEn: 'A specific platform or component that subscribes and reacts when notified.',
        methods: [
          { purposeEn: 'Implements the update method. Does whatever this observer needs to do with the received message (print, forward, display, etc.).' }
        ]
      },
      {
        roleEn: 'Subject — manages subscribers and fires notifications',
        descEn: 'Holds the list of observers. Provides subscribe/unsubscribe and loops through all observers when notifying.',
        methods: [
          { purposeEn: 'The list of all current subscribers. Uses ArrayList for dynamic add/remove.' },
          { purposeEn: 'Adds an observer to the list.' },
          { purposeEn: 'Removes an observer from the list.' },
          { purposeEn: 'Loops through ALL observers and calls update() on each one. This is the core of the pattern.' }
        ]
      }
    ]
  },

  strategy: {
    taglineEn: 'Define a family of algorithms and make them interchangeable at runtime',
    shortDescEn: 'Encapsulates algorithms in separate classes and lets the client choose one at runtime, eliminating if-else chains',
    introEn: `<strong>Strategy</strong> replaces if-else algorithm selection with polymorphism — each algorithm lives in its own class.
    <br><br>
    <strong>When to use it?</strong> When you have multiple ways to perform the same operation and the choice happens at runtime (payment methods, sort algorithms, sharing options).
    <br><br>
    <strong>Key structure:</strong>
    <ol style="margin-right: 1.5rem; margin-top: 0.5rem;">
      <li>Strategy interface with the operation method</li>
      <li>One Concrete Strategy class per algorithm</li>
      <li>Context receives the strategy <strong>as a parameter</strong> (not stored)</li>
      <li>Context calls <code>strategy.execute()</code> — no if-else needed</li>
    </ol>`,
    classes: [
      {
        roleEn: 'Strategy Interface — the common contract for all algorithms',
        descEn: 'Every algorithm implements this interface. The Context only depends on this — not on concrete classes.',
        methods: [
          { purposeEn: 'The operation that every strategy must implement. Name it after what it does (pay, share, sort, compress).' }
        ]
      },
      {
        roleEn: 'Concrete Strategy — one specific algorithm implementation',
        descEn: 'A specific implementation. Could be CreditCard, Bluetooth, QuickSort — each in its own class.',
        methods: [
          { purposeEn: 'The specific implementation of this algorithm. Prints/performs its specific action.' }
        ]
      },
      {
        roleEn: 'Context — receives and uses the strategy as a parameter',
        descEn: 'The class that performs the operation. Does NOT store the strategy as a field — receives it as a method parameter each time.',
        methods: [
          { purposeEn: 'Receives the strategy as a parameter and calls execute() on it. No if-else. The caller decides which strategy to pass.' }
        ]
      }
    ]
  }
};

// ============================================
// Lab Scenarios for Mock Exam — Intermediate Level
// Each lab provides most of the code; student fills in
// only the KEY elements of each design pattern.
// ============================================

window.TRIAL_LABS = [

  // ==================== LAB 1: Singleton - ThreadPool ====================
  {
    id: 'lab-singleton-threadpool',
    pattern: 'singleton',
    patternName: 'Singleton',
    title: 'Lab: ThreadPool Manager',
    scenario: `تطبيق يحتاج ThreadPool واحد فقط في كامل النظام. الكلاس موجود لكن يحتاج تطبيق Singleton: أضف الـ static field وأكمل <code>getInstance()</code>.`,
    task: `<strong>المطلوب:</strong> في <code>MyThreadPool.java</code>:<br>
    • أضف <code>private static MyThreadPool uniqueInstance;</code><br>
    • أكمل جسم <code>getInstance()</code>: لو <code>uniqueInstance == null</code> أنشئها، ثم ارجعها`,
    starterFiles: [
      {
        name: 'MyThreadPool.java',
        status: 'todo',
        starter: `package sa.edu.kau.fcit.cpit252;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPool {
    // TODO: أضف private static field اسمه uniqueInstance

    private ExecutorService executorService;
    private final int THREAD_POOL_SIZE = 5;

    private MyThreadPool() {
        this.executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    }

    public static MyThreadPool getInstance() {
        // TODO: لو uniqueInstance == null أنشئ new MyThreadPool()
        // ثم ارجع uniqueInstance

    }

    public ExecutorService getThreadPoolExecutor() {
        return this.executorService;
    }
}`,
        solution: `package sa.edu.kau.fcit.cpit252;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPool {
    private static MyThreadPool uniqueInstance;
    private ExecutorService executorService;
    private final int THREAD_POOL_SIZE = 5;

    private MyThreadPool() {
        this.executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
    }

    public static MyThreadPool getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new MyThreadPool();
        }
        return uniqueInstance;
    }

    public ExecutorService getThreadPoolExecutor() {
        return this.executorService;
    }
}`,
        checks: [
          { type: 'regex', value: 'private\\s+static\\s+MyThreadPool\\s+uniqueInstance', msg: 'private static MyThreadPool uniqueInstance' },
          { type: 'contains', value: 'uniqueInstance == null', msg: 'فحص null قبل الإنشاء' },
          { type: 'contains', value: 'new MyThreadPool()', msg: 'أنشئ instance لما يكون null' },
          { type: 'contains', value: 'return uniqueInstance', msg: 'ارجع uniqueInstance' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. الـ Static Field', content: 'أضف <code>private static MyThreadPool uniqueInstance;</code> في أعلى الكلاس. هذا الـ field يخزن النسخة الوحيدة.' },
      { title: '2. getInstance()', content: '<code>if (uniqueInstance == null) { uniqueInstance = new MyThreadPool(); }</code> ثم <code>return uniqueInstance;</code>' }
    ]
  },

  // ==================== LAB 2: Builder - VirtualMachine ====================
  {
    id: 'lab-builder-vm',
    pattern: 'builder',
    patternName: 'Builder',
    title: 'Lab: VirtualMachine Configuration',
    scenario: `كلاس VirtualMachine جاهز مع private constructor والـ fields. المطلوب إكمال الـ Builder inner class.`,
    task: `<strong>المطلوب:</strong> داخل <code>VirtualMachine.java</code> أكمل الـ <code>Builder</code> inner class:<br>
    • أضف <code>withPorts()</code>، <code>withPrivateIP()</code>، <code>withTags()</code> — كل واحدة ترجع <code>this</code><br>
    • أضف <code>build()</code> ترجع <code>new VirtualMachine(this)</code>`,
    starterFiles: [
      {
        name: 'VirtualMachine.java',
        status: 'todo',
        starter: `package sa.edu.kau.fcit.cpit252;

public class VirtualMachine {
    private String cloudProvider;
    private String region;
    private String az;
    private String imageId;
    private String[] ports;
    private String privateIP;
    private String[] tags;

    private VirtualMachine(Builder builder) {
        this.cloudProvider = builder.cloudProvider;
        this.region        = builder.region;
        this.az            = builder.az;
        this.imageId       = builder.imageId;
        this.ports         = builder.ports;
        this.privateIP     = builder.privateIP;
        this.tags          = builder.tags;
    }

    public static class Builder {
        private String cloudProvider;
        private String region;
        private String az;
        private String imageId;
        private String[] ports;
        private String privateIP;
        private String[] tags;

        public Builder(String cloudProvider, String region, String az, String imageId) {
            this.cloudProvider = cloudProvider;
            this.region = region;
            this.az = az;
            this.imageId = imageId;
        }

        // TODO: withPorts(String[] ports)  — ارجع this
        // TODO: withPrivateIP(String ip)   — ارجع this
        // TODO: withTags(String[] tags)    — ارجع this
        // TODO: build()                    — ارجع new VirtualMachine(this)
    }
}`,
        solution: `package sa.edu.kau.fcit.cpit252;

public class VirtualMachine {
    private String cloudProvider;
    private String region;
    private String az;
    private String imageId;
    private String[] ports;
    private String privateIP;
    private String[] tags;

    private VirtualMachine(Builder builder) {
        this.cloudProvider = builder.cloudProvider;
        this.region        = builder.region;
        this.az            = builder.az;
        this.imageId       = builder.imageId;
        this.ports         = builder.ports;
        this.privateIP     = builder.privateIP;
        this.tags          = builder.tags;
    }

    public static class Builder {
        private String cloudProvider;
        private String region;
        private String az;
        private String imageId;
        private String[] ports;
        private String privateIP;
        private String[] tags;

        public Builder(String cloudProvider, String region, String az, String imageId) {
            this.cloudProvider = cloudProvider;
            this.region = region;
            this.az = az;
            this.imageId = imageId;
        }

        public Builder withPorts(String[] ports) {
            this.ports = ports;
            return this;
        }

        public Builder withPrivateIP(String privateIP) {
            this.privateIP = privateIP;
            return this;
        }

        public Builder withTags(String[] tags) {
            this.tags = tags;
            return this;
        }

        public VirtualMachine build() {
            return new VirtualMachine(this);
        }
    }
}`,
        checks: [
          { type: 'contains', value: 'withPorts', msg: 'method withPorts' },
          { type: 'contains', value: 'withTags', msg: 'method withTags' },
          { type: 'regex', value: 'return\\s+this', msg: 'withX ترجع this' },
          { type: 'contains', value: 'new VirtualMachine(this)', msg: 'build() ترجع new VirtualMachine(this)' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. withX() Methods', content: 'كل method تحفظ القيمة في الـ field ثم <code>return this;</code> للـ method chaining.' },
      { title: '2. build()', content: '<code>public VirtualMachine build() { return new VirtualMachine(this); }</code> — تمرر الـ Builder الحالي للـ constructor.' }
    ]
  },

  // ==================== LAB 3: Strategy - Photo Sharing ====================
  {
    id: 'lab-strategy-photo',
    pattern: 'strategy',
    patternName: 'Strategy',
    title: 'Lab: Photo Sharing App',
    scenario: `تطبيق Photo Sharing. الـ concrete strategies جاهزة. المطلوب: إنشاء الـ <code>Shareable</code> interface وإكمال <code>Photo</code> context.`,
    task: `<strong>المطلوب:</strong><br>
    • أنشئ <code>interface Shareable</code> فيه <code>void share(String filename)</code><br>
    • في <code>Photo.java</code>، أكمل <code>sharePhoto(Shareable s)</code> بحيث تستدعي <code>s.share(filename)</code>`,
    starterFiles: [
      {
        name: 'Shareable.java',
        status: 'todo',
        starter: `// TODO: interface Shareable فيه method share(String filename)`,
        solution: `public interface Shareable {
    void share(String filename);
}`,
        checks: [
          { type: 'regex', value: 'interface\\s+Shareable', msg: 'interface Shareable' },
          { type: 'contains', value: 'share', msg: 'method share(String filename)' }
        ]
      },
      {
        name: 'Photo.java',
        status: 'todo',
        starter: `public class Photo {
    private String filename;

    public Photo(String filename) {
        this.filename = filename;
    }

    public void sharePhoto(Shareable sharingMethod) {
        // TODO: استدعي share على الـ sharingMethod وارسلها الـ filename
    }
}`,
        solution: `public class Photo {
    private String filename;

    public Photo(String filename) {
        this.filename = filename;
    }

    public void sharePhoto(Shareable sharingMethod) {
        sharingMethod.share(filename);
    }
}`,
        checks: [
          { type: 'regex', value: 'sharePhoto\\s*\\(\\s*Shareable', msg: 'sharePhoto يأخذ Shareable' },
          { type: 'regex', value: '\\.share\\s*\\(\\s*filename', msg: 'استدعي share(filename)' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. Shareable Interface', content: '<code>interface Shareable { void share(String filename); }</code>' },
      { title: '2. Photo Context', content: '<code>sharingMethod.share(filename);</code> — الـ Photo يفوّض العمل للـ strategy.' }
    ]
  },

  // ==================== LAB 4: Observer - TweetWatcher ====================
  {
    id: 'lab-observer-tweet',
    pattern: 'observer',
    patternName: 'Observer',
    title: 'Lab: Tweet Watcher',
    scenario: `TweetWatcher يراقب keyword ويبلغ المشتركين. الـ Subscriber interface والمشتركون جاهزون. أكمل <code>TweetWatcher</code>.`,
    task: `<strong>المطلوب:</strong> في <code>TweetWatcher.java</code> أكمل:<br>
    • <code>subscribe(Subscriber s)</code> — أضف للقائمة<br>
    • <code>unsubscribe(Subscriber s)</code> — احذف من القائمة<br>
    • <code>postTweet(String tweet)</code> — لو فيه keyword بلّغ الكل`,
    starterFiles: [
      {
        name: 'TweetWatcher.java',
        status: 'todo',
        starter: `import java.util.ArrayList;
import java.util.List;

public class TweetWatcher {
    private String keyword;
    private List<Subscriber> subscribers = new ArrayList<>();

    public TweetWatcher(String keyword) {
        this.keyword = keyword;
    }

    public void subscribe(Subscriber s) {
        // TODO: أضف s للقائمة
    }

    public void unsubscribe(Subscriber s) {
        // TODO: احذف s من القائمة
    }

    public void postTweet(String tweet) {
        // TODO: لو tweet.contains(keyword) استدعي s.update(tweet) على كل subscriber
    }
}`,
        solution: `import java.util.ArrayList;
import java.util.List;

public class TweetWatcher {
    private String keyword;
    private List<Subscriber> subscribers = new ArrayList<>();

    public TweetWatcher(String keyword) {
        this.keyword = keyword;
    }

    public void subscribe(Subscriber s) {
        subscribers.add(s);
    }

    public void unsubscribe(Subscriber s) {
        subscribers.remove(s);
    }

    public void postTweet(String tweet) {
        if (tweet.contains(keyword)) {
            for (Subscriber s : subscribers) {
                s.update(tweet);
            }
        }
    }
}`,
        checks: [
          { type: 'contains', value: 'subscribers.add', msg: 'subscribe يضيف للقائمة' },
          { type: 'contains', value: 'subscribers.remove', msg: 'unsubscribe يحذف من القائمة' },
          { type: 'contains', value: '.contains(keyword)', msg: 'فحص الـ keyword في التغريدة' },
          { type: 'regex', value: 's\\.update\\(', msg: 'استدعي s.update على كل subscriber' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. subscribe/unsubscribe', content: '<code>subscribers.add(s)</code> و <code>subscribers.remove(s)</code>' },
      { title: '2. postTweet', content: '<code>if (tweet.contains(keyword)) { for (Subscriber s : subscribers) { s.update(tweet); } }</code>' }
    ]
  },

  // ==================== LAB 5: Factory - Notification ====================
  {
    id: 'lab-factory-notification',
    pattern: 'factory',
    patternName: 'Factory',
    title: 'Lab: Notification System',
    scenario: `الـ Notification interface والكلاسات الثلاثة جاهزة. أكمل <code>NotificationFactory</code> لتُرجع النوع الصحيح.`,
    task: `<strong>المطلوب:</strong> في <code>NotificationFactory.java</code>، أكمل <code>getNotification(String type)</code>:<br>
    • <code>"email"</code> → ارجع <code>new EmailNotification()</code><br>
    • <code>"sms"</code> → ارجع <code>new SMSNotification()</code><br>
    • <code>"push"</code> → ارجع <code>new PushNotification()</code><br>
    • استخدم <code>equalsIgnoreCase</code> للمقارنة`,
    starterFiles: [
      {
        name: 'NotificationFactory.java',
        status: 'todo',
        starter: `public class NotificationFactory {

    public Notification getNotification(String type) {
        if (type == null) return null;

        // TODO: استخدم equalsIgnoreCase للمقارنة
        // "email" → new EmailNotification()
        // "sms"   → new SMSNotification()
        // "push"  → new PushNotification()

        return null;
    }
}`,
        solution: `public class NotificationFactory {

    public Notification getNotification(String type) {
        if (type == null) return null;

        if (type.equalsIgnoreCase("email")) {
            return new EmailNotification();
        }
        if (type.equalsIgnoreCase("sms")) {
            return new SMSNotification();
        }
        if (type.equalsIgnoreCase("push")) {
            return new PushNotification();
        }
        return null;
    }
}`,
        checks: [
          { type: 'contains', value: 'equalsIgnoreCase', msg: 'استخدم equalsIgnoreCase' },
          { type: 'contains', value: 'new EmailNotification', msg: 'دعم email' },
          { type: 'contains', value: 'new SMSNotification', msg: 'دعم sms' },
          { type: 'contains', value: 'new PushNotification', msg: 'دعم push' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. المقارنة', content: 'استخدم <code>type.equalsIgnoreCase("email")</code> وليس <code>==</code> — لأن strings في Java تُقارن بـ equals.' },
      { title: '2. كل حالة', content: 'كل <code>if</code> يرجع الكلاس المناسب. وفي النهاية <code>return null</code> كـ fallback.' }
    ]
  },

  // ==================== LAB 6: Decorator - Coffee Order ====================
  {
    id: 'lab-decorator-coffee',
    pattern: 'decorator',
    patternName: 'Decorator',
    title: 'Lab: Coffee Shop',
    scenario: `الكلاسات الأساسية جاهزة (Beverage، Espresso، CondimentDecorator). أكمل <code>Mocha</code> decorator.`,
    task: `<strong>المطلوب:</strong> في <code>Mocha.java</code>:<br>
    • الـ constructor يستقبل <code>Beverage beverage</code> ويحفظه<br>
    • <code>getDescription()</code> يرجع وصف المشروب + <code>", Mocha"</code><br>
    • <code>cost()</code> يرجع <code>0.20 + beverage.cost()</code>`,
    starterFiles: [
      {
        name: 'Mocha.java',
        status: 'todo',
        starter: `public class Mocha extends CondimentDecorator {

    // TODO: constructor يأخذ Beverage ويحفظه في this.beverage

    @Override
    public String getDescription() {
        // TODO: ارجع beverage.getDescription() + ", Mocha"
    }

    @Override
    public double cost() {
        // TODO: ارجع 0.20 + beverage.cost()
    }
}`,
        solution: `public class Mocha extends CondimentDecorator {

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    @Override
    public double cost() {
        return 0.20 + beverage.cost();
    }
}`,
        checks: [
          { type: 'contains', value: 'extends CondimentDecorator', msg: 'extends CondimentDecorator' },
          { type: 'regex', value: 'Mocha\\s*\\(\\s*Beverage', msg: 'constructor يأخذ Beverage' },
          { type: 'contains', value: 'beverage.getDescription()', msg: 'استدعي beverage.getDescription()' },
          { type: 'contains', value: 'beverage.cost()', msg: '+ beverage.cost()' },
          { type: 'contains', value: '0.20', msg: 'سعر Mocha = 0.20' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. Constructor', content: '<code>public Mocha(Beverage beverage) { this.beverage = beverage; }</code>' },
      { title: '2. التراكم', content: '<code>getDescription()</code> يضيف على وصف الأصل. <code>cost()</code> يضيف على سعر الأصل. هذا جوهر Decorator.' }
    ]
  },

  // ==================== LAB 7: Adapter - Power Adapter ====================
  {
    id: 'lab-adapter-power',
    pattern: 'adapter',
    patternName: 'Adapter',
    title: 'Lab: Power Outlet Adapter',
    scenario: `<code>EuropeanSocket</code> interface و <code>USDevice</code> جاهزان. أكمل <code>USToEuropeAdapter</code>.`,
    task: `<strong>المطلوب:</strong> في <code>USToEuropeAdapter.java</code>:<br>
    • أضف constructor يأخذ <code>USDevice</code> ويحفظه<br>
    • أكمل <code>provideElectricity()</code> لتستدعي <code>usDevice.connectUS()</code>`,
    starterFiles: [
      {
        name: 'USToEuropeAdapter.java',
        status: 'todo',
        starter: `public class USToEuropeAdapter implements EuropeanSocket {
    private USDevice usDevice;

    // TODO: constructor يأخذ USDevice ويحفظه في this.usDevice

    @Override
    public void provideElectricity() {
        // TODO: استدعي usDevice.connectUS()
    }
}`,
        solution: `public class USToEuropeAdapter implements EuropeanSocket {
    private USDevice usDevice;

    public USToEuropeAdapter(USDevice device) {
        this.usDevice = device;
    }

    @Override
    public void provideElectricity() {
        System.out.println("Converting 220V to 110V...");
        usDevice.connectUS();
    }
}`,
        checks: [
          { type: 'contains', value: 'implements EuropeanSocket', msg: 'implements EuropeanSocket' },
          { type: 'regex', value: 'USToEuropeAdapter\\s*\\(\\s*USDevice', msg: 'constructor يأخذ USDevice' },
          { type: 'contains', value: 'this.usDevice', msg: 'احفظ usDevice' },
          { type: 'contains', value: 'usDevice.connectUS', msg: 'استدعي connectUS()' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. Constructor', content: '<code>public USToEuropeAdapter(USDevice device) { this.usDevice = device; }</code>' },
      { title: '2. التفويض', content: 'في <code>provideElectricity()</code> استدعي <code>usDevice.connectUS()</code> — الـ Adapter يحوّل الاستدعاء.' }
    ]
  },

  // ==================== LAB 8: Proxy - Database Access ====================
  {
    id: 'lab-proxy-database',
    pattern: 'proxy',
    patternName: 'Proxy',
    title: 'Lab: Database Access Control',
    scenario: `<code>Database</code> interface و <code>RealDatabase</code> جاهزان. أكمل منطق <code>query()</code> في الـ Proxy.`,
    task: `<strong>المطلوب:</strong> في <code>DatabaseProxy.java</code>، أكمل <code>query(String sql)</code>:<br>
    • لو <code>sql.startsWith("DELETE")</code> و <code>userRole</code> ليست <code>"admin"</code> → اطبع خطأ وارجع<br>
    • غير كذا فوّض للـ <code>realDatabase.query(sql)</code>`,
    starterFiles: [
      {
        name: 'DatabaseProxy.java',
        status: 'todo',
        starter: `public class DatabaseProxy implements Database {
    private final Database realDatabase;
    private final String userRole;

    public DatabaseProxy(Database db, String role) {
        this.realDatabase = db;
        this.userRole = role;
    }

    @Override
    public void query(String sql) {
        // TODO: لو sql يبدأ بـ "DELETE" و userRole != "admin"
        //       اطبع رسالة خطأ وارجع
        // غير كذا: realDatabase.query(sql)

    }
}`,
        solution: `public class DatabaseProxy implements Database {
    private final Database realDatabase;
    private final String userRole;

    public DatabaseProxy(Database db, String role) {
        this.realDatabase = db;
        this.userRole = role;
    }

    @Override
    public void query(String sql) {
        if (sql.startsWith("DELETE") && !userRole.equals("admin")) {
            System.err.println("ERROR: Only admin can delete.");
            return;
        }
        realDatabase.query(sql);
    }
}`,
        checks: [
          { type: 'contains', value: 'implements Database', msg: 'implements Database' },
          { type: 'contains', value: 'startsWith("DELETE")', msg: 'فحص DELETE' },
          { type: 'regex', value: '!.*userRole\\.equals\\("admin"\\)|!"admin"\\.equals\\(userRole\\)', msg: 'فحص لو الـ role != admin' },
          { type: 'contains', value: 'realDatabase.query', msg: 'فوّض للـ realDatabase' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. فحص الصلاحية', content: '<code>if (sql.startsWith("DELETE") && !userRole.equals("admin"))</code> → اطبع خطأ و <code>return;</code>' },
      { title: '2. التفويض', content: '<code>realDatabase.query(sql);</code> — الـ Proxy يفوّض للـ Real عند الموافقة.' }
    ]
  },

  // ==================== LAB 9: Prototype - Document ====================
  {
    id: 'lab-prototype-document',
    pattern: 'prototype',
    patternName: 'Prototype',
    title: 'Lab: Document Template System',
    scenario: `<code>Document</code> abstract class و <code>Invoice</code> جاهزان. أكمل <code>Report</code>: copy constructor + <code>clone()</code>.`,
    task: `<strong>المطلوب:</strong> في <code>Report.java</code>:<br>
    • أضف <strong>copy constructor</strong>: <code>Report(Report target)</code> يستدعي <code>super(target.getTitle(), target.getAuthor())</code> وينسخ <code>summary</code><br>
    • أكمل <code>clone()</code> لترجع <code>new Report(this)</code>`,
    starterFiles: [
      {
        name: 'Report.java',
        status: 'todo',
        starter: `public class Report extends Document {
    private String summary;

    public Report(String title, String author, String summary) {
        super(title, author);
        this.summary = summary;
    }

    // TODO: copy constructor Report(Report target)
    //       استدعي super بـ title وauthor من target
    //       انسخ summary من target

    @Override
    public Document clone() {
        // TODO: ارجع new Report(this)
    }
}`,
        solution: `public class Report extends Document {
    private String summary;

    public Report(String title, String author, String summary) {
        super(title, author);
        this.summary = summary;
    }

    public Report(Report target) {
        super(target.getTitle(), target.getAuthor());
        this.summary = target.summary;
    }

    @Override
    public Document clone() {
        return new Report(this);
    }
}`,
        checks: [
          { type: 'contains', value: 'extends Document', msg: 'extends Document' },
          { type: 'regex', value: 'Report\\s*\\(\\s*Report\\s+\\w+\\s*\\)', msg: 'copy constructor Report(Report)' },
          { type: 'contains', value: 'super(', msg: 'استدعي super من copy constructor' },
          { type: 'contains', value: 'new Report(this)', msg: 'clone() تُرجع new Report(this)' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. Copy Constructor', content: '<code>public Report(Report target) { super(target.getTitle(), target.getAuthor()); this.summary = target.summary; }</code>' },
      { title: '2. clone()', content: '<code>return new Report(this);</code> — يستخدم الـ copy constructor مع <code>this</code>.' }
    ]
  },

  // ==================== LAB 10: Flyweight - Forest ====================
  {
    id: 'lab-flyweight-forest',
    pattern: 'flyweight',
    patternName: 'Flyweight',
    title: 'Lab: Forest Rendering Engine',
    scenario: `<code>TreeType</code> و <code>Tree</code> جاهزان. أكمل <code>TreeFactory.getTreeType()</code>: لو النوع موجود ارجعه، لو لا أنشئه وخزّنه.`,
    task: `<strong>المطلوب:</strong> في <code>TreeFactory.java</code>، أكمل <code>getTreeType()</code>:<br>
    • المفتاح = <code>name + "-" + color</code><br>
    • لو موجود في الـ map → ارجعه مباشرة<br>
    • لو لا → أنشئ <code>new TreeType()</code>، خزّنه، وارجعه`,
    starterFiles: [
      {
        name: 'TreeFactory.java',
        status: 'todo',
        starter: `import java.util.HashMap;
import java.util.Map;

public class TreeFactory {
    private Map<String, TreeType> treeTypes = new HashMap<>();

    public TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color;

        // TODO: لو treeTypes.containsKey(key) → ارجع treeTypes.get(key)
        // غير كذا → أنشئ new TreeType(name, color, texture)
        //             خزّنه بـ treeTypes.put(key, ...)
        //             وارجعه

    }
}`,
        solution: `import java.util.HashMap;
import java.util.Map;

public class TreeFactory {
    private Map<String, TreeType> treeTypes = new HashMap<>();

    public TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color;

        if (treeTypes.containsKey(key)) {
            return treeTypes.get(key);
        } else {
            TreeType type = new TreeType(name, color, texture);
            treeTypes.put(key, type);
            return type;
        }
    }
}`,
        checks: [
          { type: 'contains', value: 'containsKey', msg: 'فحص containsKey' },
          { type: 'contains', value: 'new TreeType', msg: 'أنشئ لما يكون غير موجود' },
          { type: 'contains', value: 'put', msg: 'خزّن بـ put' },
          { type: 'contains', value: 'return', msg: 'ارجع الـ TreeType' }
        ]
      }
    ],
    solutionSteps: [
      { title: '1. Cache Lookup', content: '<code>if (treeTypes.containsKey(key)) { return treeTypes.get(key); }</code>' },
      { title: '2. Create & Store', content: '<code>TreeType type = new TreeType(name, color, texture); treeTypes.put(key, type); return type;</code>' }
    ]
  }

];

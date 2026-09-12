import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const articleTitle = "Java Program/Application Execution Process — Part 1: Class Loading";
const articleExcerpt =
	"Running a Java program requires compiling .java source files into .class bytecode and then launching the program on the JVM.";
const readingTime = "9 min read";
const articleTags = ["Java", "JVM", "Class Loading", "Java Internals"];

const hierarchyCode = `public class Main {
    public static void main(String[] args) {
        ClassLoader system = ClassLoader.getSystemClassLoader();
        ClassLoader platform = system.getParent();
        ClassLoader bootstrap = platform.getParent();

        System.out.println("System:    " + system);
        System.out.println("Platform:  " + platform);
        System.out.println("Bootstrap: " + bootstrap);
    }
}`;

const customLoaderCode = `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class MyClassLoader extends ClassLoader {
    private final Path root;

    public MyClassLoader(Path root, ClassLoader parent) {
        super(parent); // Preserve the delegation chain.
        this.root = root.toAbsolutePath().normalize();
    }

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {
        String relativePath = name.replace('.', '/') + ".class";
        Path classFile = root.resolve(relativePath).normalize();

        if (!classFile.startsWith(root)) {
            throw new ClassNotFoundException("Invalid class name: " + name);
        }

        try {
            byte[] classBytes = Files.readAllBytes(classFile);
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (IOException cause) {
            throw new ClassNotFoundException(name, cause);
        }
    }
}`;

const greeterCode = `package com.example.plugin;

public class Greeter {
    public void sayHello() {
        System.out.println("Hello from a dynamically loaded class!");
    }
}`;

const mainCode = `import java.lang.reflect.Method;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws Exception {
        // Usually the Application ClassLoader.
        ClassLoader parent = Main.class.getClassLoader();

        MyClassLoader customLoader = new MyClassLoader(
            Path.of("plugins"), parent
        );

        // Greeter is not on the normal application class path.
        Class<?> loadedClass = customLoader.loadClass(
            "com.example.plugin.Greeter"
        );

        System.out.println("Loaded class: " + loadedClass.getName());
        System.out.println("Loaded by: " + loadedClass.getClassLoader());

        Object instance = loadedClass.getDeclaredConstructor().newInstance();
        Method sayHello = loadedClass.getMethod("sayHello");
        sayHello.invoke(instance);
    }
}`;

const terminalCode = `javac -d plugins Greeter.java
javac MyClassLoader.java Main.java
java Main`;

const bodyText = "mt-4 text-[17px] leading-8 text-gray-700";
const inlineCode =
	"rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.88em] text-gray-900";

function useDocumentTitle(title: string) {
	useEffect(() => {
		const previousTitle = document.title;
		document.title = title;
		return () => {
			document.title = previousTitle;
		};
	}, [title]);
}

function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
			const nextProgress = scrollableHeight > 0
				? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
				: 0;
			setProgress(nextProgress);
		};

		updateProgress();
		window.addEventListener("scroll", updateProgress, { passive: true });
		window.addEventListener("resize", updateProgress);

		return () => {
			window.removeEventListener("scroll", updateProgress);
			window.removeEventListener("resize", updateProgress);
		};
	}, []);

	return (
		<div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1" aria-hidden="true">
			<div
				className="h-full bg-green-700 transition-[width] duration-150"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}

function TagList({ compact = false }: { compact?: boolean }) {
	return (
		<ul
			className={`flex flex-wrap items-center text-gray-500 ${compact ? "gap-x-1.5 text-[11px]" : "gap-x-2 text-xs"}`}
			aria-label="Article topics"
		>
			{articleTags.map((tag, index) => (
				<li
					key={tag}
					className="flex items-center gap-x-1.5"
				>
					{index > 0 && <span className="text-gray-300" aria-hidden="true">·</span>}
					<span>{tag}</span>
				</li>
			))}
		</ul>
	);
}

function CodeBlock({
	children,
	label,
	variant = "source",
}: {
	children: string;
	label?: string;
	variant?: "source" | "output";
}) {
	const isOutput = variant === "output";

	return (
		<div className={`my-6 overflow-hidden rounded-sm border ${
			isOutput
				? "border-gray-300 border-l-4 border-l-green-700 bg-gray-50"
				: "border-gray-700 bg-[#101714] shadow-sm"
		}`}>
			{label && (
				<div className={`border-b px-4 py-2 font-mono text-xs ${
					isOutput
						? "border-gray-200 bg-white text-gray-500"
						: "border-gray-700 bg-[#17211d] text-gray-300"
				}`}>
					{label}
				</div>
			)}
			<pre className={`overflow-x-auto p-4 text-[14px] leading-6 sm:p-5 ${
				isOutput ? "text-gray-800" : "text-gray-100"
			}`}>
				<code>{children}</code>
			</pre>
		</div>
	);
}

function SectionHeading({
	id,
	number,
	children,
}: {
	id: string;
	number?: string;
	children: string;
}) {
	return (
		<h2
			id={id}
			className="scroll-mt-6 border-t border-gray-200 pt-10 text-2xl font-semibold leading-tight text-green-900 sm:text-[28px]"
		>
			{number && (
				<span className="mr-2 font-mono text-[0.72em] font-normal text-green-700">
					{number}
				</span>
			)}
			{children}
		</h2>
	);
}

function Subheading({
	id,
	number,
	children,
}: {
	id: string;
	number: string;
	children: string;
}) {
	return (
		<h3
			id={id}
			className="scroll-mt-6 pt-8 text-xl font-semibold leading-snug text-gray-900 sm:text-2xl"
		>
			<span className="mr-2 font-mono text-[0.7em] font-normal text-green-700">
				{number}
			</span>
			{children}
		</h3>
	);
}

function TableOfContents() {
	return (
		<nav aria-label="Article contents" className="border-l-2 border-green-800 pl-5 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-2">
			<p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-900">
				Table of contents
			</p>
			<ol className="mt-4 space-y-1.5 text-sm leading-6 text-gray-600">
				<li><a className="hover:text-green-800 hover:underline" href="#introduction">Introduction</a></li>
				<li><a className="hover:text-green-800 hover:underline" href="#jdk-javac-java">1. The JDK, javac, and java</a></li>
				<li className="pl-3"><a className="hover:text-green-800 hover:underline" href="#javac">1.1 What is javac?</a></li>
				<li className="pl-3"><a className="hover:text-green-800 hover:underline" href="#java-launcher">1.2 What is java?</a></li>
				<li><a className="hover:text-green-800 hover:underline" href="#jvm">2. What is the JVM?</a></li>
				<li><a className="hover:text-green-800 hover:underline" href="#class-loader-subsystem">2.1 Class Loader Subsystem</a></li>
				<li className="pl-3"><a className="hover:text-green-800 hover:underline" href="#core-class-loaders">2.1.1 Core types of class loaders</a></li>
				<li className="pl-3"><a className="hover:text-green-800 hover:underline" href="#delegation">2.1.2 Delegation principle</a></li>
				<li className="pl-6"><a className="hover:text-green-800 hover:underline" href="#delegation-example">Example</a></li>
				<li className="pl-3"><a className="hover:text-green-800 hover:underline" href="#custom-class-loader">2.1.3 Custom ClassLoader</a></li>
				<li className="pl-6"><a className="hover:text-green-800 hover:underline" href="#create-custom-loader">2.1.3.1 How to create a custom ClassLoader</a></li>
				<li><a className="hover:text-green-800 hover:underline" href="#conclusion">Conclusion</a></li>
				<li><a className="hover:text-green-800 hover:underline" href="#resources-used">Resources used</a></li>
			</ol>
		</nav>
	);
}

function BlogListItem() {
	return (
		<article className="border-b border-gray-200 pb-6">
			<Link className="text-lg font-semibold leading-snug text-green-900 hover:underline" to="/blogs/1">
				{articleTitle}
			</Link>
			<div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.08em] text-gray-500">
				<time dateTime="2026-08-23">August 23, 2026</time>
				<span aria-hidden="true">·</span>
				<span>{readingTime}</span>
			</div>
			<div className="mt-3"><TagList compact /></div>
			<p className="mt-3 max-w-2xl text-[16px] leading-7 text-gray-700">{articleExcerpt}</p>
			<Link className="mt-3 inline-block text-[15px] font-medium text-green-900 hover:text-green-700 hover:underline" to="/blogs/1">
				Read article <span aria-hidden="true">→</span>
			</Link>
		</article>
	);
}

export function BlogListPage() {
	useDocumentTitle("Blog — Nabil Aadou");

	return (
		<div className="min-h-screen bg-white text-gray-900">
			<Header />
			<main className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-0">
				<h1 className="pt-4 text-2xl font-light text-gray-900 sm:pt-6">Blog</h1>
				<div className="mt-7"><BlogListItem /></div>
			</main>
		</div>
	);
}

export function Blog1() {
	useDocumentTitle(`${articleTitle} — Nabil Aadou`);

	return (
		<div className="min-h-screen bg-white text-gray-900">
			<ReadingProgress />
			<Header />
			<main id="article-top" className="mx-auto max-w-6xl scroll-mt-4 px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
				<Link to="/blogs" className="text-sm font-medium text-green-800 hover:underline">
					<span aria-hidden="true">←</span> All articles
				</Link>

				<header className="mt-6 max-w-4xl border-b border-gray-200 pb-9">
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
						Java series · Part 1 · Class loading
					</p>
					<h1 className="mt-3 text-3xl font-semibold leading-[1.16] text-green-950 sm:text-5xl">
						{articleTitle}
					</h1>
					<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.08em] text-gray-500">
						<time dateTime="2026-08-23">August 23, 2026</time>
						<span aria-hidden="true">·</span>
						<span>{readingTime}</span>
					</div>
					<div className="mt-4"><TagList /></div>
				</header>

				<div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_230px]">
					<article className="min-w-0 max-w-3xl">
						<section aria-labelledby="introduction">
							<h2 id="introduction" className="scroll-mt-6 text-2xl font-semibold text-green-900 sm:text-[28px]">
								Introduction
							</h2>
							<p className={bodyText}>
								Running a Java program requires compiling the <code className={inlineCode}>.java</code> files
								into <code className={inlineCode}>.class</code> files using the <strong className="text-gray-900">javac</strong>{" "}
								program, and then running the program using <strong className="text-gray-900">java</strong>.
								Briefly, <code className={inlineCode}>javac</code> compiles the source code into bytecode and
								packages it into <code className={inlineCode}>.class</code> files. The <code className={inlineCode}>java</code>{" "}
								launcher starts the JVM, where the bytecode can be interpreted or compiled into native machine
								code understood by the CPU. These steps are only an overview; a complex system lies behind them.
							</p>
						</section>

						<section aria-labelledby="jdk-javac-java" className="mt-10">
							<SectionHeading id="jdk-javac-java" number="1.">The JDK, javac, and java</SectionHeading>
							<p className={bodyText}>
								What exactly are <strong className="text-gray-900">javac</strong> and <strong className="text-gray-900">java</strong>?
								They are both part of the <strong className="text-gray-900">JDK</strong> (Java Development Kit).
								The JDK is a software package used for building and running Java applications. It provides the
								Java runtime and development tools such as <code className={inlineCode}>javac</code>,{" "}
								<code className={inlineCode}>java</code>, <code className={inlineCode}>javadoc</code>, and{" "}
								<code className={inlineCode}>jdb</code>. In simple words, it is a bundle containing the tools
								needed to build and run Java applications.
							</p>

							<Subheading id="javac" number="1.1">What is javac?</Subheading>
							<p className={bodyText}>
								<code className={inlineCode}>javac</code> (the Java compiler) is a program that reads Java
								declarations and compiles them into class files containing bytecode that runs on the JVM.
							</p>

							<Subheading id="java-launcher" number="1.2">What is java?</Subheading>
							<p className={bodyText}>
								<code className={inlineCode}>java</code> is the program responsible for launching a Java
								application. It starts a JVM, loads the initial class, and invokes its{" "}
								<code className={inlineCode}>main</code> method.
							</p>
						</section>

						<section aria-labelledby="jvm" className="mt-10">
							<SectionHeading id="jvm" number="2.">What is the JVM?</SectionHeading>
							<p className={bodyText}>
								JVM stands for Java Virtual Machine. It is software responsible for reading and executing a
								compiled Java program on your computer. It is called “virtual” because it is an abstract
								computer defined by a specification. To run a Java program, you need a concrete implementation
								of that abstract specification.
							</p>
							<p className={bodyText}>
								To understand the Java Virtual Machine, you must first be aware that you may be talking about
								any of three different things when you say “Java Virtual Machine”:
							</p>
							<ul className="mt-4 list-disc space-y-1 pl-7 text-[17px] leading-8 text-gray-700">
								<li>the abstract specification</li>
								<li>a concrete implementation</li>
								<li>a runtime instance</li>
							</ul>
							<p className={bodyText}>
								The abstract specification is a concept. Concrete implementations exist on many platforms and
								come from many vendors. A runtime instance hosts a single running Java application.
							</p>
							<p className={bodyText}>
								In the Java Virtual Machine specification, the behavior of a virtual machine instance is
								described in terms of subsystems, memory areas, data types, and instructions.
							</p>
						</section>

						<figure className="my-10 overflow-hidden border border-gray-200 bg-gray-50">
							<a href="/assets/jvm-architecture.jpeg" target="_blank" rel="noreferrer" aria-label="Open the JVM architecture diagram at full size">
								<img
									src="/assets/jvm-architecture.jpeg"
									alt="JVM architecture diagram showing the Class Loader Subsystem, runtime data areas, execution engine, JNI, and native libraries"
									className="h-auto w-full cursor-zoom-in"
								/>
							</a>
							<figcaption className="border-t border-gray-200 px-4 py-3 text-sm leading-6 text-gray-600">
								JVM subsystems architecture. Select the image to open it at full size.
							</figcaption>
						</figure>

						<section aria-labelledby="class-loader-subsystem" className="mt-10">
							<SectionHeading id="class-loader-subsystem" number="2.1">Class Loader Subsystem</SectionHeading>
							<p className={bodyText}>
								The part of a JVM implementation that takes care of finding and loading{" "}
								<code className={inlineCode}>.class</code> bytecode is the Class Loader Subsystem. It contains
								two kinds of class loaders: the Bootstrap (or primordial) ClassLoader and class-loader objects
								(the Platform, Application, and custom class loaders). The Bootstrap ClassLoader is part of the
								virtual machine implementation. Class-loader objects are part of the running Java application
								and are implementations of the <code className={inlineCode}>java.lang.ClassLoader</code> abstract
								class.
							</p>
							<p className={bodyText}>
								Class identity in the JVM is determined by both the class’s binary name and the loader that
								defined it. Therefore, two classes with the same name but different defining class loaders are
								treated as different types.
							</p>
							<p className={bodyText}>
								The Class Loader Subsystem is responsible for more than locating and importing the binary data
								for classes. It also verifies imported classes, allocates and initializes memory for class
								variables, and assists with resolving symbolic references. These activities are described in
								the following stages:
							</p>
							<ol className="mt-5 list-decimal space-y-3 pl-7 text-[17px] leading-8 text-gray-700">
								<li><strong className="text-gray-900">Loading:</strong> finding and importing the binary data for a type.</li>
								<li>
									<strong className="text-gray-900">Linking:</strong> performing verification, preparation, and optionally resolution.
									<ul className="mt-2 list-disc space-y-1 pl-7">
										<li><strong className="text-gray-900">Verification:</strong> ensuring the correctness of the imported type.</li>
										<li><strong className="text-gray-900">Preparation:</strong> allocating memory for class variables and initializing it to default values.</li>
										<li><strong className="text-gray-900">Resolution:</strong> transforming symbolic references from the type into direct references.</li>
									</ul>
								</li>
								<li><strong className="text-gray-900">Initialization:</strong> invoking Java code that initializes class variables to their proper starting values.</li>
							</ol>

							<Subheading id="core-class-loaders" number="2.1.1">Core types of class loaders</Subheading>
							<ul className="mt-5 list-disc space-y-3 pl-7 text-[17px] leading-8 text-gray-700">
								<li><strong className="text-gray-900">Bootstrap ClassLoader:</strong> the root of the class-loading system. It loads fundamental Java classes, including classes in the <code className={inlineCode}>java.base</code> module. It is built into the JVM.</li>
								<li><strong className="text-gray-900">Platform ClassLoader:</strong> loads platform classes from Java SE, the JDK, and their implementation that are assigned to it or its ancestors.</li>
								<li><strong className="text-gray-900">System (Application) ClassLoader:</strong> typically loads classes from the application class path and module path. The class path can be set with <code className={inlineCode}>CLASSPATH</code>, <code className={inlineCode}>-classpath</code>/<code className={inlineCode}>-cp</code>, or a JAR manifest.</li>
								<li><strong className="text-gray-900">Custom ClassLoader:</strong> a loader written for an application is usually created with one of the built-in loaders as its parent.</li>
							</ul>
							<p className={bodyText}>
								Different types of class loaders exist for security, consistency, and architectural reasons.
								The Bootstrap (or primordial) ClassLoader is implemented as part of the JVM itself. This is
								necessary because there is a chicken-and-egg problem: the class-loading mechanism relies on
								Java classes, but those classes must first be loaded before Java code can execute.
							</p>
							<p className={bodyText}>
								The Bootstrap ClassLoader therefore loads a set of critical classes and modules required to
								start the Java runtime, including classes from the <code className={inlineCode}>java.base</code> module.
							</p>
							<p className={bodyText}>
								The Platform ClassLoader, introduced in its current form with Java 9, is responsible for loading
								platform classes that are part of the Java SE and JDK APIs but are not defined by the Bootstrap
								ClassLoader.
							</p>
							<p className={bodyText}>
								Finally, the System (or Application) ClassLoader is typically responsible for loading
								application classes. It loads from the application class path and module path, and the Platform
								ClassLoader is its parent or ancestor in the standard hierarchy. The class path is exposed by
								the <code className={inlineCode}>java.class.path</code> system property and can be configured with
								options such as <code className={inlineCode}>-cp</code> or <code className={inlineCode}>-classpath</code>.
							</p>

							<Subheading id="delegation" number="2.1.2">Delegation principle</Subheading>
							<p className={bodyText}>Class loaders follow a hierarchy with a parent–child relationship:</p>
							<p className="my-5 border-l-4 border-green-800 bg-green-50 px-5 py-4 font-mono text-[16px] text-green-950">
								Bootstrap → Platform → System/Application
							</p>
							<p className={bodyText}>
								The standard class-loading mechanism uses a <strong className="text-gray-900">parent-first delegation model</strong>.
								When a class loader is asked to load a class, it first checks whether the class has already been
								loaded. If not, it delegates the request to its parent class loader. This continues up the
								hierarchy until a loader can provide the requested class or the Bootstrap ClassLoader is reached.
							</p>
							<p className={bodyText}>
								If a parent class loader can load the class, that class is returned to the child. If the parent
								cannot find the class, the request passes back down the hierarchy, allowing the child loader to
								attempt to find and define the class itself.
							</p>
							<p className={bodyText}>
								This model ensures that classes provided by parent class loaders—particularly core Java
								classes—take precedence over classes that could otherwise be supplied by child class loaders.
							</p>
							<h4 id="delegation-example" className="scroll-mt-6 pt-8 text-lg font-semibold text-gray-900">Example</h4>
							<CodeBlock label="Main.java">{hierarchyCode}</CodeBlock>
							<p className={bodyText}>A typical output looks like:</p>
							<CodeBlock label="Typical output" variant="output">{`System:    jdk.internal.loader.ClassLoaders$AppClassLoader@...
Platform:  jdk.internal.loader.ClassLoaders$PlatformClassLoader@...
Bootstrap: null`}</CodeBlock>
							<p className={bodyText}>
								The exact output varies between Java versions and JVM implementations, but the hierarchy is the
								important part. The <code className={inlineCode}>null</code> value for the Bootstrap ClassLoader is
								expected. It is implemented by the JVM and is not represented as a normal Java{" "}
								<code className={inlineCode}>ClassLoader</code> object, so the API represents it as null.
							</p>

							<Subheading id="custom-class-loader" number="2.1.3">Custom ClassLoader</Subheading>
							<p className={bodyText}>
								The built-in class loaders are sufficient for most cases where class files are available on the
								normal class path or module path. However, when classes must be loaded from a location outside
								those paths—such as a separate plugin directory, network source, database, encrypted archive,
								in-memory buffer, or generated bytecode—a custom class loader can be useful.
							</p>

							<Subheading id="create-custom-loader" number="2.1.3.1">How to create a custom ClassLoader</Subheading>
							<p className={bodyText}>
								To create a custom ClassLoader, inherit from the <code className={inlineCode}>java.lang.ClassLoader</code>{" "}
								abstract class.
							</p>
							<p className={bodyText}>
								For a well-behaved custom loader, there is one method you almost always override:{" "}
								<code className={inlineCode}>findClass(String name)</code>.
							</p>
							<ul className="mt-4 list-disc space-y-3 pl-7 text-[17px] leading-8 text-gray-700">
								<li>The default implementation throws <code className={inlineCode}>ClassNotFoundException</code>.</li>
								<li>This is where your custom logic lives: fetching bytes from a file, network, database, encrypted archive, in-memory buffer, generated bytecode, or another source.</li>
								<li>Once you have the raw <code className={inlineCode}>byte[]</code>, call <code className={inlineCode}>defineClass(name, bytes, 0, bytes.length)</code> to turn it into a <code className={inlineCode}>Class&lt;?&gt;</code>. You do not override <code className={inlineCode}>defineClass</code>; you call it.</li>
							</ul>
							<p className={bodyText}>
								Normally, do not override <code className={inlineCode}>loadClass</code>. Its inherited
								implementation checks for an already-loaded class, asks the parent first, and calls your{" "}
								<code className={inlineCode}>findClass</code> only if the parent cannot find the class.
							</p>
							<CodeBlock label="MyClassLoader.java">{customLoaderCode}</CodeBlock>
							<p className={bodyText}>For a complete example, the dynamically loaded class can look like this:</p>
							<CodeBlock label="Greeter.java">{greeterCode}</CodeBlock>
							<CodeBlock label="Main.java">{mainCode}</CodeBlock>
							<p className={bodyText}>
								Compile the plugin into its own directory, then compile and run the application without adding
								that plugin directory to the normal application class path:
							</p>
							<CodeBlock label="Terminal">{terminalCode}</CodeBlock>
							<p className={bodyText}>Expected output:</p>
							<CodeBlock label="Expected output" variant="output">{`Loaded class: com.example.plugin.Greeter
Loaded by: MyClassLoader@...
Hello from a dynamically loaded class!`}</CodeBlock>
							<p className={bodyText}>
								Because <code className={inlineCode}>Main</code> does not have{" "}
								<code className={inlineCode}>com.example.plugin.Greeter</code> on its class path, you cannot
								write <code className={inlineCode}>new Greeter()</code> or reference that type directly. The
								compiler would not know it. That is why the example uses reflection with{" "}
								<code className={inlineCode}>getDeclaredConstructor().newInstance()</code> and{" "}
								<code className={inlineCode}>Method.invoke</code>.
							</p>
							<p className={bodyText}>
								The <code className={inlineCode}>loadClass</code> call still goes through the inherited delegation
								logic. It asks the parent first; when the parent cannot find <code className={inlineCode}>Greeter</code>{" "}
								on the normal class path, the request falls through to your <code className={inlineCode}>findClass</code>{" "}
								method. This is the delegation mechanism shown earlier, now visible end to end.
							</p>
							<div className="my-6 border-l-4 border-green-800 bg-green-50 px-5 py-4 text-[16px] leading-7 text-green-950">
								<strong>One important detail:</strong> the JVM considers both the binary class name and the
								defining class loader when identifying a type. Loading the same class bytes with two different
								custom loaders creates two different JVM types, which can cause casting errors if they are mixed.
							</div>
						</section>

						<section aria-labelledby="conclusion" className="mt-12">
							<SectionHeading id="conclusion">Conclusion</SectionHeading>
							<p className={bodyText}>
								Running a Java application involves more than compiling source code and starting the program.
								The JDK provides the compiler and launcher, the JVM provides the runtime environment, and the
								Class Loader Subsystem finds, loads, links, and initializes the classes the application needs.
							</p>
							<p className={bodyText}>
								The built-in class loaders handle normal Java applications. When bytecode must come from another
								source, a custom ClassLoader can extend the process by implementing <code className={inlineCode}>findClass</code>{" "}
								and calling <code className={inlineCode}>defineClass</code>, while preserving the standard parent-first
								delegation chain. Runtime data areas, the execution engine, JNI, and native method libraries will
								be covered separately in later parts of this series.
							</p>
						</section>

						<section className="mt-12 border-t border-gray-200 pt-8" aria-labelledby="resources-used">
							<h2 id="resources-used" className="text-lg font-semibold text-gray-900">Resources used</h2>
							<ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-gray-600">
								<li><cite>Java Virtual Machine Internals</cite> (book)</li>
								<li><a className="text-green-800 hover:underline" href="https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html" target="_blank" rel="noreferrer">Oracle Java 25 documentation: The javac Command ↗</a></li>
								<li><a className="text-green-800 hover:underline" href="https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html" target="_blank" rel="noreferrer">Oracle Java 25 documentation: The java Command ↗</a></li>
								<li><a className="text-green-800 hover:underline" href="https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ClassLoader.html" target="_blank" rel="noreferrer">Java SE 25 API: ClassLoader ↗</a></li>
								<li><a className="text-green-800 hover:underline" href="https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-5.html" target="_blank" rel="noreferrer">JVM Specification, Chapter 5: Loading, Linking, and Initializing ↗</a></li>
								<li><a className="text-green-800 hover:underline" href="https://www.geeksforgeeks.org/java/jdk-in-java/" target="_blank" rel="noreferrer">GeeksforGeeks: JDK in Java ↗</a></li>
							</ul>
						</section>

						<nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6" aria-label="Article navigation">
							<Link className="text-sm font-medium text-green-800 hover:underline" to="/blogs">
								<span aria-hidden="true">←</span> Browse all articles
							</Link>
							<a className="text-sm font-medium text-green-800 hover:underline" href="#article-top">
								Back to top <span aria-hidden="true">↑</span>
							</a>
						</nav>
					</article>

					<aside className="order-first lg:order-last lg:sticky lg:top-8">
						<TableOfContents />
					</aside>
				</div>
			</main>
		</div>
	);
}

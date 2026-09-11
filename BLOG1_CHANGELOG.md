# Java blog editorial change log

This file records every category of change between the supplied Notion draft and the version published in `src/pages/Blog1.tsx`. The goal is to preserve the author's wording and structure while correcting errors, completing the custom `ClassLoader` example, and formatting the article for the website.

## Content preserved

- The original subject and order remain: introduction; JDK, `javac`, and `java`; JVM; Class Loader Subsystem; built-in loaders; delegation; custom loaders; conclusion.
- The original section numbering through `2.1.3.1` remains.
- The original class-loader hierarchy example and expected output remain, with formatting corrections only.
- The explanation of why reflection is used remains.
- The supplied JVM architecture image remains immediately before section 2.1.
- The original publication date, August 23, 2026, remains.

## Title and page summary

| Draft | Website | Reason |
| --- | --- | --- |
| `Java Program/Application execution process` | `Java Program/Application Execution Process` | Capitalization only. |
| No separate card excerpt | A one-sentence summary derived from the first sentence | The homepage and blog list require a short preview. It does not add a new technical claim. |

The first version of the website edit used the title “What Happens When You Compile and Run a Java Program? Part 1: Class Loading.” That rewrite has been removed and the original title restored.

## Global spelling, grammar, and terminology corrections

These corrections apply everywhere the relevant wording appeared:

- `java` → `Java` when referring to the language or a Java application. The lowercase form remains only for the `java` command.
- `byte code` → `bytecode`.
- `class loader`/`Classloader` capitalization was made consistent with the surrounding sentence and API name.
- `costume ClassLoader` → `custom ClassLoader`. “Costume” was a spelling error.
- `than` → `then` where the draft described a sequence.
- `usin` → `using`.
- `Breifly` → `Briefly`.
- `interepted` → `interpreted`.
- `understode` → `understood`.
- `its a bundles` → `it is a bundle`.
- `inhertite` → `inherit`.
- Missing articles, punctuation, and subject–verb agreement were corrected without changing the intended claim.
- File extensions, command names, API types, methods, properties, and command-line flags are formatted as code.

## Introduction

The draft's meaning was preserved, with two factual/phrasing corrections:

- “the java program passes these byte code into the java” was changed to “the `java` launcher starts the JVM.” The launcher is the entry point that starts the virtual machine; it does not pass bytecode “into java.”
- “interpreted/compiled to be transformed into native machine code” was clarified to “the bytecode can be interpreted or compiled into native machine code.” This avoids implying that every bytecode instruction must pass through both mechanisms.

## Section 1: The JDK, javac, and java

- The draft's description of the JDK as the package used to build and run Java applications remains.
- “includes a JRE ... and the JVM” was phrased as “provides the Java runtime and development tools.” This avoids treating modern JDK distributions as if they must contain a separately packaged JRE.
- The examples `javac`, `java`, `javadoc`, and `jdb` remain.
- The definition of `javac` remains, with grammar corrected from “read ... and compile” to “reads ... and compiles.”
- “java ... passes the .class files to the JVM” was replaced with “starts a JVM, loads the initial class, and invokes its `main` method.” This is a factual correction to the launch sequence.

## Section 2: What is the JVM?

- The distinction between the JVM specification, a concrete implementation, and a runtime instance remains.
- Sentence fragments about concrete implementations were joined into complete sentences.
- “hosts a single running Java application” remains.
- The statement that the JVM is described using subsystems, memory areas, data types, and instructions remains.
- The supplied diagram received alternative text, a short caption, and a full-size link for readability. The image itself was not edited.

## Section 2.1: Class Loader Subsystem

- The original explanation that the subsystem finds and loads `.class` bytecode remains.
- The built-in Bootstrap loader and the Java `ClassLoader` objects remain distinguished.
- “Classes loaded by different class loaders are placed into separate name spaces” was expressed more precisely: JVM class identity is the binary class name plus the defining loader. This explains the intended namespace idea and why identically named classes can still be different types.
- The loading, linking, and initialization list remains.
- The malformed `I**nitialization` text was corrected.
- “strict order” was softened to “described in the following stages,” and resolution remains optional. The JVM specification allows flexibility about when loading, linking, and resolution occur, while verification and preparation must precede initialization.
- Preparation now says that memory is initialized to default values; initialization still describes running Java code that supplies the intended starting values.

## Section 2.1.1: Core types of class loaders

- All four entries remain: Bootstrap, Platform, System/Application, and Custom.
- The Bootstrap loader is called “built into the JVM” instead of always “implemented in native code.” Native implementation is common but is not a portable requirement of the API description.
- The Platform loader description was adjusted from “modules ... not part of `java.base`” to the more precise platform classes assigned to it or its ancestors.
- The System/Application loader remains described as the typical loader for the application class path and module path.
- “Custom loaders sit below these” was changed to “usually created with one of the built-in loaders as its parent.” A custom loader participates in a parent hierarchy, but its exact position is chosen by the application.
- The original bootstrap chicken-and-egg explanation remains, with grammar corrected.
- The original Java 9 note for the current Platform ClassLoader remains.

## Section 2.1.2: Delegation principle

- The original hierarchy `Bootstrap → Platform → System/Application` remains.
- The parent-first explanation remains and was only edited for sentence structure and repetition.
- The original demonstration program remains.
- The original expected output remains.
- The original explanation that the Bootstrap ClassLoader is represented as `null` remains.

## Sections 2.1.3 and 2.1.3.1: Custom ClassLoader

The requested additional explanation is limited to completing and clarifying the draft's example:

- “The built-in class loader is sufficient for most cases where the files are already in the file system” was corrected to “built-in class loaders are sufficient when classes are on the normal class path or module path.” The location being a local disk is not the deciding factor; whether the class is visible through the configured paths is.
- The draft's example sources—file, network, database, encrypted archive, memory, and generated bytecode—remain.
- The recommendation to override `findClass(String name)` rather than `loadClass` remains.
- The explanation that `defineClass` is called rather than overridden remains.
- The custom source directory is passed to the loader as a `Path` instead of being hard-coded as `/some/custom/path/`. This makes the example runnable on different systems.
- `Files.readAllBytes` replaces `FileInputStream.readAllBytes` to keep the directory example concise.
- An I/O error is wrapped in `ClassNotFoundException` with the original cause. The draft returned `null`, which discarded the reason the load failed.
- A normalized-root check prevents the resolved class-file path from escaping the configured root.
- A complete `Greeter` class was added because it was referenced but not defined in the draft.
- Three compilation/run commands were added so the example can be reproduced end to end.
- The `Main` example now passes the plugin root to `MyClassLoader`; its reflection flow and printed output otherwise follow the draft.
- One short note about class identity was added because this is a central consequence of custom class loaders and directly explains common casting failures.

The broader additions from the first edit—custom resource lookup, class-loader unloading, a separate security discussion, shared plugin interfaces, and child-first implementation concerns—were removed to stay within the supplied draft.

## Conclusion

- A conclusion was added because the original request explicitly asked for one.
- It summarizes only the subjects already covered in the article.
- It states that runtime data areas, the execution engine, JNI, and native libraries will be handled in later parts rather than explaining those topics here.

## Sections intentionally omitted

The empty headings below were removed exactly as requested:

- `2.2 Runtime Data Areas (Memory)`
- `2.3 Execution Engine`
- `2.4 JNI and Native Method Libraries`

They are mentioned only as future parts in the conclusion.

## Resources used

- `Java Virtual Machine Internals` was added as a book resource exactly as supplied. No author, edition, publisher, or link was invented because those details were not provided.
- The original GeeksforGeeks JDK resource remains.
- The original Oracle `javac` resource remains without its tracking query parameter.
- The official Oracle `java` command, `ClassLoader` API, and JVM Specification chapter were added because they support the factual corrections above.

## Website-only presentation changes

- The article is available through the existing `/blogs/1` route and appears in the homepage and blog-list previews.
- Semantic headings, lists, code blocks, a table of contents, a back link, image alternative text, and responsive spacing were added for web readability and accessibility.
- A route-specific document title was added.
- The invented “14 min read” label from the first edit was removed.
- The site-wide title and description in `index.html` were changed from the placeholder `Document` to portfolio-specific metadata.

## Reader-experience additions approved afterward

The author later approved reading-time information, additional tags, and general browsing improvements. The following changes were then added without changing the article's prose:

- Added a `9 min read` estimate to the homepage preview, blog listing, and article header. The estimate is based on the article's approximate prose length at a typical reading speed; code blocks may make the actual reading time longer.
- Replaced the single Java category label with four topic tags: `Java`, `JVM`, `Class Loading`, and `Java Internals`.
- Added a thin reading-progress indicator at the top of the article page. It updates as the reader scrolls and is hidden from assistive technology because it is decorative.
- Added “Browse all articles” and “Back to top” links at the end of the article.
- Added smooth scrolling for table-of-contents and back-to-top links.
- Added a consistent visible keyboard-focus outline across the site.
- Disabled smooth scrolling when the reader has enabled the operating system's reduced-motion preference.

## Minimal visual refinement

- Expanded the side table of contents to include every article heading and subheading, including `1.1`, `1.2`, `2.1.1`, `2.1.2`, its Example subsection, `2.1.3`, `2.1.3.1`, and Resources used.
- Made the desktop table of contents independently scrollable when it is taller than the viewport, so no entry becomes inaccessible.
- Kept source-code and terminal blocks dark, while changing program output to a light neutral block with a restrained brand-green edge and a clear output label.
- Changed the reading-progress indicator from bright emerald to the website's darker green palette.
- Simplified topic tags on the article, blog list, and homepage into quiet gray inline labels separated by dots, without colored backgrounds or borders.
- No article prose or technical content was changed in this refinement.

## Deployment preparation

- Added the existing `nabilaadou.com` custom-domain configuration to the source assets so future production builds preserve it automatically.

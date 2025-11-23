import { ChapterData } from "./types";

export const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    title: "Reactivity (Vue 2)",
    color: "bg-emerald-100",
    pages: [
      {
        id: "1-1",
        type: "read",
        title: "The Spy",
        illustration: "reactivity-eye",
        content: `
          <p>Welcome! We begin our journey with <b>Reactivity</b>.</p>
          <p>In the old days (Vue 2), Vue acted like a spy. It would walk into your data objects and secretly replace every property with a magical trap.</p>
          <p>This trap is called <code class="vue-code">Object.defineProperty</code>. It allowed Vue to detect whenever you touched a property (getter) or changed it (setter).</p>
        `,
        codeSnippet: `
// The "Trap"
let internalValue = 10;

Object.defineProperty(data, 'count', {
  get() {
    // 1. Remember who is asking
    return internalValue;
  },
  set(newVal) {
    // 2. Tell everyone it changed!
    internalValue = newVal;
  }
});`,
      },
      {
        id: "1-2",
        type: "read",
        title: "The Bell",
        illustration: "dep-bell",
        content: `
          <p>Knowing something changed isn't enough. We need to know <i>who</i> cares.</p>
          <p>We use a class called <code class="vue-code">Dep</code> (Dependency). Think of it like a Town Bell.</p>
          <ul>
            <li><code class="vue-code">depend()</code>: "I'm listening!" (Subscribe) - Used when we read data.</li>
            <li><code class="vue-code">notify()</code>: "Ring the bell!" (Publish) - Used when we change data.</li>
          </ul>
        `,
        codeSnippet: `class Dep {
  constructor() {
    this.subs = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subs.add(activeEffect);
    }
  }

  notify() {
    this.subs.forEach(effect => effect());
  }
}`,
      },
      {
        id: "1-3",
        type: "challenge",
        title: "Coding the Trap",
        challenge: {
          subtitle: "defineReactive",
          description:
            "Your turn! Finish the <code class='vue-code'>defineReactive</code> function. The getter is ready. You need to finish the <b>setter</b> to alert the dependency manager when data changes. You have access to the <code class='vue-code'>dep</code> instance—just call its notification method.",
          visualType: "reactivity",
          hints: [
            "When the value changes, we need to alert someone.",
            "The <code class='vue-code'>dep</code> object has a method to alert listeners.",
            "Call <code class='vue-code'>dep.notify()</code>",
          ],
          codeContext: `function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      dep.depend();
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}`,
          codePre: `    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      
      // TODO: Ring the bell!
`,
          codePost: `    }
  });
}`,
          placeholder: "      // dep...",
          correctAnswer: ["dep.notify()", "dep.notify();"],
        },
      },
    ],
  },
  {
    id: 2,
    title: "Virtual DOM",
    color: "bg-purple-100",
    pages: [
      {
        id: "2-1",
        type: "read",
        title: "The Blueprint",
        illustration: "vdom-tree",
        content: `
             <p>Touching the real DOM is slow. It's like moving furniture in real life.</p>
             <p>Vue uses a <b>Virtual DOM</b>—a lightweight sketch of your UI. It's just a tree of JavaScript objects called <code class="vue-code">VNodes</code>.</p>
             <p>Because they are just JS objects, we can create millions of them without slowing down the browser.</p>
            `,
        codeSnippet: `// Virtual Node (Cheap)
             
const vnode = {
  tag: 'div',
  children: 'Hello Vue'
};

// Real DOM Node (Expensive)
// [HTMLDivElement] -> 100s of properties`,
      },
      {
        id: "2-2",
        type: "challenge",
        title: "The Architect",
        challenge: {
          subtitle: "The h() Function",
          description:
            "Developers use <code class='vue-code'>h()</code> to create VNodes easily. Implement <code class='vue-code'>h</code> to return the VNode object. It receives <code class='vue-code'>tag</code>, <code class='vue-code'>props</code>, and <code class='vue-code'>children</code> as arguments. Return an object with these properties.",
          visualType: "vdom",
          hints: [
            "The function arguments are <code class='vue-code'>tag</code>, <code class='vue-code'>props</code>, and <code class='vue-code'>children</code>.",
            "We need to assign the <code class='vue-code'>children</code> argument to the object key.",
            "Add <code class='vue-code'>children: children || []</code> to the object.",
          ],
          codeContext: `function h(tag, props, children) {
  return {
    tag: tag,
    props: props || {},
    children: children || []
  };
}`,
          codePre: `function h(tag, props, children) {
  return {
    tag: tag,
    props: props || {},
`,
          codePost: `  };
}`,
          placeholder: "    // children: ...",
          correctAnswer: [
            "children: children || []",
            "children: children",
            "children",
            "children: children,",
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: "Renderer",
    color: "bg-orange-100",
    pages: [
      {
        id: "3-1",
        type: "read",
        title: "The Builder",
        illustration: "mount-plant",
        content: `
             <p>Now we need a <b>Renderer</b> to turn VNodes into real DOM.</p>
             <p>This process is called <b>Mounting</b>. It creates the actual HTML element based on the VNode's tag and inserts it into the page container.</p>
            `,
      },
      {
        id: "3-2",
        type: "challenge",
        title: "Construction",
        challenge: {
          subtitle: "Mount Function",
          description:
            "We created the element <code class='vue-code'>el</code>. Now, put it inside the <code class='vue-code'>container</code> so it actually appears on screen. Use the standard DOM API <code class='vue-code'>appendChild</code>.",
          visualType: "render",
          hints: [
            "We have an <code class='vue-code'>el</code> and a <code class='vue-code'>container</code>.",
            "The <code class='vue-code'>container</code> is a parent DOM node.",
            "Use <code class='vue-code'>container.appendChild(el)</code>",
          ],
          codeContext: `function mount(vnode, container) {
  const el = document.createElement(vnode.tag);
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  }
  container.appendChild(el);
}`,
          codePre: `function mount(vnode, container) {
  const el = document.createElement(vnode.tag);
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  }
  // TODO: Insert into container
`,
          codePost: `}`,
          placeholder: "  // container...",
          correctAnswer: [
            "container.appendChild(el)",
            "container.appendChild(el);",
          ],
        },
      },
    ],
  },
  {
    id: 4,
    title: "Patching",
    color: "bg-blue-100",
    pages: [
      {
        id: "4-1",
        type: "read",
        title: "Diffing",
        illustration: "patch-diff",
        content: `
             <p>When data changes, we don't destroy the world. We <b>Patch</b> it.</p>
             <p>Vue compares the Old VNode vs. New VNode. If the tag is the same, it reuses the element and just updates the changed parts (like text or props). This is much faster than rebuilding.</p>
            `,
        codeSnippet: `// Old: <div>Hello</div>
// New: <div>World</div>

// Result:
el.textContent = 'World'; // Efficient!`,
      },
      {
        id: "4-2",
        type: "challenge",
        title: "Patch Logic",
        challenge: {
          subtitle: "Patch Text",
          description:
            "If tags match but children differ, we don't replace the element. We just update the text content. The real DOM element is in <code class='vue-code'>el</code>, and the new text is in <code class='vue-code'>n2.children</code>. Assign the new text to the element.",
          visualType: "patch",
          hints: [
            "The element is stored in <code class='vue-code'>el</code>.",
            "The new text is in <code class='vue-code'>n2.children</code>.",
            "Set <code class='vue-code'>el.textContent = n2.children</code>",
          ],
          codeContext: `function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    const el = n2.el = n1.el;
    if (n1.children !== n2.children) {
      el.textContent = n2.children;
    }
  }
}`,
          codePre: `function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    const el = n2.el = n1.el;
    if (n1.children !== n2.children) {
      // TODO: Update text
`,
          codePost: `    }
  }
}`,
          placeholder: "      // el.textContent = ...",
          correctAnswer: [
            "el.textContent = n2.children",
            "el.textContent = n2.children;",
          ],
        },
      },
    ],
  },
  {
    id: 5,
    title: "Vue 3: The Proxy",
    color: "bg-pink-100",
    pages: [
      {
        id: "5-1",
        type: "read",
        title: "The Upgrade",
        illustration: "proxy-shield",
        content: `
             <p>Vue 3 brought a revolution: <b>Proxies</b>.</p>
             <p>Instead of defining properties one by one (<code class="vue-code">Object.defineProperty</code>), a Proxy wraps the <i>entire</i> object.</p>
             <p>It intercepts EVERYTHING: adding keys, deleting keys, checking keys. No more strict limits!</p>
            `,
        codeSnippet: `const handler = {
  get(target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    let result = 
      Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
      trigger(target, key);
    }
    return result;
  }
};
const proxy = new Proxy(original, handler);`,
      },
      {
        id: "5-2",
        type: "challenge",
        title: "Reactive 2.0",
        challenge: {
          subtitle: "reactive()",
          description:
            "Implement the <code class='vue-code'>reactive</code> function using Proxy. Return a new <code class='vue-code'>Proxy</code> that wraps the <code class='vue-code'>target</code>. We have already imported <code class='vue-code'>mutableHandlers</code> for you to use as the second argument.",
          visualType: "reactivity",
          hints: [
            "We need to return a <code class='vue-code'>new Proxy</code> instance.",
            "The constructor takes <code class='vue-code'>target</code> and <code class='vue-code'>mutableHandlers</code>.",
            "Return <code class='vue-code'>new Proxy(target, mutableHandlers)</code>",
          ],
          codeContext: `function reactive(target) {
  return new Proxy(target, mutableHandlers);
}`,
          codePre: `function reactive(target) {
  // TODO: Wrap target in a Proxy
`,
          codePost: `}`,
          placeholder: "  // return new Proxy...",
          correctAnswer: [
            "return new Proxy(target, mutableHandlers)",
            "return new Proxy(target, mutableHandlers);",
          ],
        },
      },
    ],
  },
  {
    id: 6,
    title: "Vapor Mode",
    color: "bg-cyan-100",
    pages: [
      {
        id: "6-1",
        type: "read",
        title: "No More VDOM?",
        illustration: "vapor-steam",
        content: `
             <p>The future is here. <b>Vapor Mode</b> is an experimental compilation strategy.</p>
             <p>It realizes that if we know the structure of the template at compile time, we don't need a Virtual DOM at all!</p>
             <p>It compiles templates directly into surgical DOM operations. It's faster, lighter, and uses less memory.</p>
            `,
        codeSnippet: `// Template: <div :id="id">{{ count }}</div>

// Vapor Output:
const t0 = document.createElement('div')
renderEffect(() => {
  t0.id = ctx.id
  t0.textContent = ctx.count
})`,
      },
      {
        id: "6-2",
        type: "challenge",
        title: "Vapor Logic",
        challenge: {
          subtitle: "Direct Update",
          description:
            "In Vapor mode, we skip the VNode and update the DOM element directly inside an effect. The element <code class='vue-code'>el</code> and data <code class='vue-code'>ctx</code> are available. Set <code class='vue-code'>el.textContent</code> to <code class='vue-code'>ctx.count</code>.",
          visualType: "render",
          hints: [
            "We are inside an effect that runs when data changes.",
            "We need to update <code class='vue-code'>el.textContent</code>.",
            "Set it equal to <code class='vue-code'>ctx.count</code>.",
          ],
          codeContext: `function render(ctx) {
  const el = document.createElement('div');
  
  effect(() => {
    el.textContent = ctx.count;
  });
  
  return el;
}`,
          codePre: `function render(ctx) {
  const el = document.createElement('div');
  
  effect(() => {
    // TODO: Update el directly
`,
          codePost: `  });
  return el;
}`,
          placeholder: "    // el.textContent...",
          correctAnswer: [
            "el.textContent = ctx.count",
            "el.textContent = ctx.count;",
          ],
        },
      },
    ],
  },
];

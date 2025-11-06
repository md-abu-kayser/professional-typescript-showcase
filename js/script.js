// TypeScript Pro Platform - Enhanced JavaScript

// Theme Management
const availableThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "synthwave",
  "corporate",
  "forest",
  "cyberpunk",
  "valentine",
  "halloween",
];

let currentTheme = localStorage.getItem("theme") || "light";

// Initialize theme
function initTheme() {
  setTheme(currentTheme);

  // Add theme change listener to all theme buttons
  document.querySelectorAll("[data-set-theme]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-set-theme");
      setTheme(theme);
    });
  });
}

// Set theme function
function setTheme(theme) {
  if (!availableThemes.includes(theme)) return;

  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update theme selector UI
  updateThemeSelector(theme);

  // Apply theme-specific styles
  applyThemeStyles(theme);
}

// Apply theme-specific styles
function applyThemeStyles(theme) {
  const body = document.body;

  // Remove existing theme classes
  body.classList.remove(...availableThemes.map((t) => `theme-${t}`));

  // Add current theme class
  body.classList.add(`theme-${theme}`);
}

// Update theme selector UI
function updateThemeSelector(theme) {
  const themeButtons = document.querySelectorAll("[data-set-theme]");
  themeButtons.forEach((button) => {
    const buttonTheme = button.getAttribute("data-set-theme");
    if (buttonTheme === theme) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Enhanced Examples Data (50 examples)
const examples = [
  {
    id: 1,
    title: "Union Types",
    description:
      "Function that accepts both string and number types and returns different results based on the input type.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `function processInput(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input * input;
  }
}

// Usage examples
console.log(processInput("hello")); // Output: 5
console.log(processInput(5)); // Output: 25`,
    run: (input) => {
      try {
        const parsed = isNaN(input) ? input : Number(input);
        return processInput(parsed);
      } catch (e) {
        return "Error: " + e.message;
      }
    },
  },
  {
    id: 2,
    title: "Optional Chaining",
    description: "Safely access nested properties with optional chaining.",
    category: "Object Types",
    difficulty: "Beginner",
    code: `interface User {
  name: string;
  address?: {
    street: string;
    city?: string;
  };
}

function getUserCity(user: User): string {
  return user.address?.city ?? "No city specified";
}

// Usage examples
const user1: User = { name: "Alice", address: { street: "123 Main St", city: "NYC" } };
const user2: User = { name: "Bob" };
console.log(getUserCity(user1)); // Output: "NYC"
console.log(getUserCity(user2)); // Output: "No city specified"`,
    run: (input) => {
      try {
        const test =
          input === "withAddress"
            ? { name: "John", address: { street: "123 Main", city: "NYC" } }
            : { name: "John" };
        return (function (person) {
          return person.address?.city ?? "No city specified";
        })(test);
      } catch (e) {
        return "Error: " + e.message;
      }
    },
  },
  {
    id: 3,
    title: "Type Guards",
    description: "Using type guards to narrow down types at runtime.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `interface Cat {
  meow(): string;
}

interface Dog {
  bark(): string;
}

function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

function handlePet(pet: Cat | Dog): string {
  if (isCat(pet)) {
    return "It's a cat: " + pet.meow();
  } else {
    return "It's a dog: " + pet.bark();
  }
}`,
    run: (input) => {
      try {
        const Cat = function () {
          this.meow = () => "Meow!";
        };
        const Dog = function () {
          this.bark = () => "Woof!";
        };
        const pet = input === "cat" ? new Cat() : new Dog();
        return handlePet(pet);
      } catch (e) {
        return "Error: " + e.message;
      }
    },
  },
  {
    id: 4,
    title: "Generics",
    description:
      "Write reusable functions/components that preserve type information across types.",
    category: "Generics",
    difficulty: "Intermediate",
    code: `function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));`,
    run: (input) => {
      return "Generic demonstration: " + input;
    },
  },
  {
    id: 5,
    title: "Type Assertions",
    description:
      "Tell the compiler what you know — useful when interfacing with third-party code.",
    category: "Type System",
    difficulty: "Beginner",
    code: `let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;`,
    run: (input) => "Type assertion example",
  },
  {
    id: 6,
    title: "Interfaces vs Type Aliases",
    description: "Differences between interfaces and type aliases.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `interface Point { x: number; y: number; }
type Coordinate = { x: number; y: number; }`,
    run: (input) => "Interface vs Type",
  },
  {
    id: 7,
    title: "Function Overloads",
    description: "Multiple signatures for the same function.",
    category: "Functions",
    difficulty: "Intermediate",
    code: `function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}`,
    run: (input) => "Overload demonstration",
  },
  {
    id: 8,
    title: "Mapped Types",
    description: "Transform existing types by iterating over their properties.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};`,
    run: (input) => "Mapped types example",
  },
  {
    id: 9,
    title: "Conditional Types",
    description: "Type-level logic with extends.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type Extract<T, U> = T extends U ? T : never;`,
    run: (input) => "Conditional types",
  },
  {
    id: 10,
    title: "Decorators",
    description: "Modify classes and members.",
    category: "Advanced",
    difficulty: "Advanced",
    code: `@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}`,
    run: (input) => "Decorators example",
  },
  {
    id: 11,
    title: "Non-null Assertion",
    description: "Assert that a value is not null or undefined.",
    category: "Type System",
    difficulty: "Beginner",
    code: `let user: string | null = "Alice";
let name = user!;`,
    run: (input) => "Non-null assertion",
  },
  {
    id: 12,
    title: "Definite Assignment Assertion",
    description: "Assert that a variable is assigned.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `let x!: number;`,
    run: (input) => "Definite assignment",
  },
  {
    id: 13,
    title: "Enum Types",
    description: "Define a set of named constants.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `enum Direction { Up, Down, Left, Right }`,
    run: (input) => "Enum example",
  },
  {
    id: 14,
    title: "Literal Types",
    description: "Specific values as types.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `type Alignment = "left" | "right" | "center";`,
    run: (input) => "Literal types",
  },
  {
    id: 15,
    title: "Tuple Types",
    description: "Arrays with fixed length and types.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `let tuple: [string, number] = ["hello", 10];`,
    run: (input) => "Tuple example",
  },
  {
    id: 16,
    title: "Rest Parameters",
    description: "Variable number of arguments.",
    category: "Functions",
    difficulty: "Intermediate",
    code: `function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}`,
    run: (input) => "Rest parameters",
  },
  {
    id: 17,
    title: "Spread Operator Types",
    description: "Typing spread operators.",
    category: "Functions",
    difficulty: "Intermediate",
    code: `let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];`,
    run: (input) => "Spread operator",
  },
  {
    id: 18,
    title: "Destructuring Types",
    description: "Typing destructured objects and arrays.",
    category: "Basic",
    difficulty: "Beginner",
    code: `let { a, b }: { a: string, b: number } = { a: "baz", b: 101 };`,
    run: (input) => "Destructuring",
  },
  {
    id: 19,
    title: "Modules",
    description: "Organize code into modules.",
    category: "Modules",
    difficulty: "Intermediate",
    code: `export const pi = 3.14;`,
    run: (input) => "Modules example",
  },
  {
    id: 20,
    title: "Namespaces",
    description: "Group related code.",
    category: "Modules",
    difficulty: "Intermediate",
    code: `namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}`,
    run: (input) => "Namespaces",
  },
  {
    id: 21,
    title: "Declaration Merging",
    description: "Merge multiple declarations.",
    category: "Advanced",
    difficulty: "Advanced",
    code: `interface Box { height: number; }
interface Box { width: number; }`,
    run: (input) => "Declaration merging",
  },
  {
    id: 22,
    title: "Any Type Risks",
    description: "Dangers of using any.",
    category: "Type System",
    difficulty: "Beginner",
    code: `let looselyTyped: any = 4;`,
    run: (input) => "Any risks",
  },
  {
    id: 23,
    title: "Void Type",
    description: "For functions with no return.",
    category: "Functions",
    difficulty: "Beginner",
    code: `function warnUser(): void {
  console.log("This is my warning message");
}`,
    run: (input) => "Void type",
  },
  {
    id: 24,
    title: "Unknown Type",
    description: "Safer alternative to any.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `let userInput: unknown;`,
    run: (input) => "Unknown type",
  },
  {
    id: 25,
    title: "Never Type",
    description: "For functions that never return.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `function error(message: string): never {
  throw new Error(message);
}`,
    run: (input) => "Never type",
  },
  {
    id: 26,
    title: "Discriminated Unions",
    description: "Unions with discriminant properties.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `interface Circle { kind: "circle"; radius: number; }`,
    run: (input) => "Discriminated unions",
  },
  {
    id: 27,
    title: "Type Predicates",
    description: "Custom type guards.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `function isNumber(x: any): x is number { return typeof x === "number"; }`,
    run: (input) => "Type predicates",
  },
  {
    id: 28,
    title: "Infer Keyword",
    description: "Infer types in conditional types.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;`,
    run: (input) => "Infer keyword",
  },
  {
    id: 29,
    title: "Mapped Types",
    description: "Transform types.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type Readonly<T> = { readonly [P in keyof T]: T[P]; };`,
    run: (input) => "Mapped types",
  },
  {
    id: 30,
    title: "Template Literal Types",
    description: "Advanced string manipulation at the type level.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type EventName = "click" | "scroll" | "keypress";
type HandlerName = \`on\${Capitalize<EventName>}\`;

// Usage
let clickHandler: HandlerName = "onClick"; // Valid
// let invalidHandler: HandlerName = "onHover"; // Error

// More complex example
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";
type Alignment = \`\${VerticalAlignment}-\${HorizontalAlignment}\`;

let alignment: Alignment = "top-left"; // Valid`,
    run: (input) =>
      "This demonstrates TypeScript's compile-time template literal types",
  },
  {
    id: 31,
    title: "Conditional Types",
    description: "Type-level logic using extends.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type Check<T> = T extends string ? "string" : "other";`,
    run: (input) => "Conditional types demo",
  },
  {
    id: 32,
    title: "Mapped Types",
    description: "Transform existing types.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type Flags<T> = { [K in keyof T]: boolean };`,
    run: (input) => "Mapped types demo",
  },
  {
    id: 33,
    title: "Infer Keyword",
    description: "Infer types within conditional types.",
    category: "Advanced Types",
    difficulty: "Advanced",
    code: `type ElementType<T> = T extends (infer U)[] ? U : never;`,
    run: (input) => "Infer demo",
  },
  {
    id: 34,
    title: "Type Predicates",
    description: "Functions that narrow types.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `function isString(value: any): value is string { return typeof value === "string"; }`,
    run: (input) => "Type predicate demo",
  },
  {
    id: 35,
    title: "Discriminated Unions",
    description: "Unions with common discriminant property.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };`,
    run: (input) => "Discriminated union demo",
  },
  {
    id: 36,
    title: "Never Type",
    description: "Represents values that never occur.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `function fail(): never { throw new Error(); }`,
    run: (input) => "Never type demo",
  },
  {
    id: 37,
    title: "Unknown Type",
    description: "Top type for unknown values.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `let unknownValue: unknown;`,
    run: (input) => "Unknown type demo",
  },
  {
    id: 38,
    title: "Void Type",
    description: "For functions returning nothing.",
    category: "Functions",
    difficulty: "Beginner",
    code: `function log(message: string): void { console.log(message); }`,
    run: (input) => "Void type demo",
  },
  {
    id: 39,
    title: "Any Type Risks",
    description: "Avoiding type safety with any.",
    category: "Type System",
    difficulty: "Beginner",
    code: `let anyValue: any = "string"; anyValue = 42;`,
    run: (input) => "Any risks demo",
  },
  {
    id: 40,
    title: "Non-null Assertion",
    description: "Assert non-null.",
    category: "Type System",
    difficulty: "Beginner",
    code: `let maybeNull: string | null = null; let value = maybeNull!;`,
    run: (input) => "Non-null demo",
  },
  {
    id: 41,
    title: "Definite Assignment",
    description: "Assert assignment.",
    category: "Type System",
    difficulty: "Intermediate",
    code: `let x!: number; initialize(); console.log(x); function initialize() { x = 10; }`,
    run: (input) => "Definite assignment demo",
  },
  {
    id: 42,
    title: "Enum Types",
    description: "Named constants.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `enum Color { Red, Green, Blue }`,
    run: (input) => "Enum demo",
  },
  {
    id: 43,
    title: "Literal Types",
    description: "Specific values.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;`,
    run: (input) => "Literal demo",
  },
  {
    id: 44,
    title: "Tuple Types",
    description: "Fixed length arrays.",
    category: "Basic Types",
    difficulty: "Beginner",
    code: `let httpResponse: [number, string] = [200, "OK"];`,
    run: (input) => "Tuple demo",
  },
  {
    id: 45,
    title: "Rest Parameters",
    description: "Variable args.",
    category: "Functions",
    difficulty: "Intermediate",
    code: `function sum(...numbers: number[]): number { return numbers.reduce((a, b) => a + b, 0); }`,
    run: (input) => "Rest params demo",
  },
  {
    id: 46,
    title: "Spread Operator Types",
    description: "Spreading in types.",
    category: "Functions",
    difficulty: "Intermediate",
    code: `type Merge<T, U> = { ...T, ...U };`,
    run: (input) => "Spread demo",
  },
  {
    id: 47,
    title: "Destructuring Types",
    description: "Typed destructuring.",
    category: "Basic",
    difficulty: "Beginner",
    code: `const { name, age }: { name: string; age: number } = { name: "Alice", age: 30 };`,
    run: (input) => "Destructuring demo",
  },
  {
    id: 48,
    title: "Module Types",
    description: "Typed modules.",
    category: "Modules",
    difficulty: "Intermediate",
    code: `export type Data = { value: number };`,
    run: (input) => "Module types demo",
  },
  {
    id: 49,
    title: "Namespace",
    description: "Organized code.",
    category: "Modules",
    difficulty: "Intermediate",
    code: `namespace Util { export function log() {} }`,
    run: (input) => "Namespace demo",
  },
  {
    id: 50,
    title: "Declaration Merging",
    description: "Merging declarations.",
    category: "Advanced",
    difficulty: "Advanced",
    code: `interface User { name: string; } interface User { age: number; }`,
    run: (input) => "Merging demo",
  },
];

// Helper functions for examples
function processInput(input) {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input * input;
  }
}

function getProperty(obj, key) {
  return obj[key];
}

function handlePet(pet) {
  if (pet.meow) {
    return "It's a cat: " + pet.meow();
  } else {
    return "It's a dog: " + pet.bark();
  }
}

// Initialize examples
let currentExample = 0;

function initExamples() {
  // Load examples tabs
  const tabsContainer = document.getElementById("examples-tabs");
  if (tabsContainer) {
    tabsContainer.innerHTML = examples
      .map(
        (example, index) => `
      <button class="w-full text-left p-3 rounded-lg hover:bg-theme-secondary transition-all ${
        index === currentExample
          ? "bg-theme-secondary shadow-sm border border-theme"
          : ""
      }"
              onclick="showExample(${index})">
        <div class="font-medium text-theme-primary">${example.title}</div>
        <div class="text-xs text-theme-secondary mt-1">${example.category} • ${
          example.difficulty
        }</div>
      </button>
    `
      )
      .join("");
  }

  // Load example insert dropdown
  const insertDropdown = document.querySelector(".dropdown-content");
  if (insertDropdown) {
    insertDropdown.innerHTML = examples
      .map(
        (example, index) => `
      <li><button onclick="insertExampleIntoEditor(${index})" class="hover:bg-theme-secondary">${example.title}</button></li>
    `
      )
      .join("");
  }

  // Show first example
  showExample(0);
}

function showExample(index) {
  currentExample = index;
  const ex = examples[currentExample];

  // Update UI
  document.getElementById("example-title").textContent = ex.title;
  document.getElementById("example-description").textContent = ex.description;
  document.getElementById("example-code").textContent = ex.code;

  // Update input placeholder based on example
  const input = document.getElementById("example-input");
  switch (currentExample) {
    case 1:
      input.placeholder = "Enter 'withAddress' or anything else";
      break;
    case 2:
      input.placeholder = "Enter 'cat' or anything else";
      break;
    case 6:
      input.placeholder = "Enter a string or number";
      break;
    default:
      input.placeholder = "Input value (varies by example)";
  }

  // Highlight code
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }

  // Update active tab
  document.querySelectorAll("#examples-tabs button").forEach((t, i) => {
    t.classList.toggle("bg-theme-secondary", i === currentExample);
    t.classList.toggle("shadow-sm", i === currentExample);
    t.classList.toggle("border", i === currentExample);
  });
}

function runExample() {
  const input = document.getElementById("example-input").value;
  const output = examples[currentExample].run(input);
  document.getElementById("example-output").textContent = String(output);
}

// Enhanced Features Data (50 features)
const features = [
  {
    id: 1,
    title: "Union Types",
    description:
      "Combine multiple types into one for flexible APIs and safer runtime checks.",
    icon: "fa-code",
    color: "sky",
    category: "Basic Types",
    articleId: 1,
  },
  {
    id: 2,
    title: "Type Guards",
    description:
      "Narrow types at runtime so your code can be both dynamic and type-safe.",
    icon: "fa-shield-alt",
    color: "emerald",
    category: "Type System",
    articleId: 2,
  },
  {
    id: 3,
    title: "Optional Chaining",
    description:
      "Access nested props safely with `?.` and reduce null-check boilerplate.",
    icon: "fa-link",
    color: "violet",
    category: "Object Types",
    articleId: 3,
  },
  {
    id: 4,
    title: "Generics",
    description:
      "Write reusable functions/components that preserve type information across types.",
    icon: "fa-cubes",
    color: "yellow",
    category: "Generics",
    articleId: 4,
  },
  {
    id: 5,
    title: "Type Assertions",
    description:
      "Tell the compiler what you know — useful when interfacing with third-party code.",
    icon: "fa-check-circle",
    color: "rose",
    category: "Type System",
    articleId: 5,
  },
  {
    id: 6,
    title: "Interfaces vs Type Aliases",
    description: "Differences between interfaces and type aliases.",
    icon: "fa-object-group",
    color: "blue",
    category: "Type System",
    articleId: 6,
  },
  {
    id: 7,
    title: "Function Overloads",
    description: "Multiple signatures for the same function.",
    icon: "fa-functions",
    color: "green",
    category: "Functions",
    articleId: 7,
  },
  {
    id: 8,
    title: "Mapped Types",
    description: "Transform existing types by iterating over their properties.",
    icon: "fa-map",
    color: "purple",
    category: "Advanced Types",
    articleId: 8,
  },
  {
    id: 9,
    title: "Conditional Types",
    description: "Type-level logic with extends.",
    icon: "fa-question-circle",
    color: "indigo",
    category: "Advanced Types",
    articleId: 9,
  },
  {
    id: 10,
    title: "Decorators",
    description: "Modify classes and members.",
    icon: "fa-paint-brush",
    color: "pink",
    category: "Advanced",
    articleId: 10,
  },
  {
    id: 11,
    title: "Non-null Assertion",
    description: "Assert that a value is not null or undefined.",
    icon: "fa-exclamation",
    color: "red",
    category: "Type System",
    articleId: 11,
  },
  {
    id: 12,
    title: "Definite Assignment Assertion",
    description: "Assert that a variable is assigned.",
    icon: "fa-check",
    color: "green",
    category: "Type System",
    articleId: 12,
  },
  {
    id: 13,
    title: "Enum Types",
    description: "Define a set of named constants.",
    icon: "fa-list",
    color: "blue",
    category: "Basic Types",
    articleId: 13,
  },
  {
    id: 14,
    title: "Literal Types",
    description: "Specific values as types.",
    icon: "fa-quote-left",
    color: "yellow",
    category: "Basic Types",
    articleId: 14,
  },
  {
    id: 15,
    title: "Tuple Types",
    description: "Arrays with fixed length and types.",
    icon: "fa-array",
    color: "orange",
    category: "Basic Types",
    articleId: 15,
  },
  {
    id: 16,
    title: "Rest Parameters",
    description: "Variable number of arguments.",
    icon: "fa-ellipsis-h",
    color: "purple",
    category: "Functions",
    articleId: 16,
  },
  {
    id: 17,
    title: "Spread Operator Types",
    description: "Typing spread operators.",
    icon: "fa-expand-arrows-alt",
    color: "indigo",
    category: "Functions",
    articleId: 17,
  },
  {
    id: 18,
    title: "Destructuring Types",
    description: "Typing destructured objects and arrays.",
    icon: "fa-object-ungroup",
    color: "violet",
    category: "Basic",
    articleId: 18,
  },
  {
    id: 19,
    title: "Modules",
    description: "Organize code into modules.",
    icon: "fa-cube",
    color: "sky",
    category: "Modules",
    articleId: 19,
  },
  {
    id: 20,
    title: "Namespaces",
    description: "Group related code.",
    icon: "fa-folder",
    color: "emerald",
    category: "Modules",
    articleId: 20,
  },
  {
    id: 21,
    title: "Declaration Merging",
    description: "Merge multiple declarations.",
    icon: "fa-merge",
    color: "yellow",
    category: "Advanced",
    articleId: 21,
  },
  {
    id: 22,
    title: "Any Type Risks",
    description: "Dangers of using any.",
    icon: "fa-warning",
    color: "rose",
    category: "Type System",
    articleId: 22,
  },
  {
    id: 23,
    title: "Void Type",
    description: "For functions with no return.",
    icon: "fa-ban",
    color: "red",
    category: "Functions",
    articleId: 23,
  },
  {
    id: 24,
    title: "Unknown Type",
    description: "Safer alternative to any.",
    icon: "fa-question",
    color: "gray",
    category: "Type System",
    articleId: 24,
  },
  {
    id: 25,
    title: "Never Type",
    description: "For functions that never return.",
    icon: "fa-infinity",
    color: "black",
    category: "Type System",
    articleId: 25,
  },
  {
    id: 26,
    title: "Discriminated Unions",
    description: "Unions with discriminant properties.",
    icon: "fa-tags",
    color: "blue",
    category: "Type System",
    articleId: 26,
  },
  {
    id: 27,
    title: "Type Predicates",
    description: "Custom type guards.",
    icon: "fa-filter",
    color: "green",
    category: "Type System",
    articleId: 27,
  },
  {
    id: 28,
    title: "Infer Keyword",
    description: "Infer types in conditional types.",
    icon: "fa-magic",
    color: "purple",
    category: "Advanced Types",
    articleId: 28,
  },
  {
    id: 29,
    title: "Mapped Types",
    description: "Transform types.",
    icon: "fa-map-signs",
    color: "indigo",
    category: "Advanced Types",
    articleId: 29,
  },
  {
    id: 30,
    title: "Template Literal Types",
    description:
      "Manipulate string literal types using template literal syntax for advanced type patterns.",
    icon: "fa-font",
    color: "purple",
    category: "Advanced Types",
    articleId: 30,
  },
  {
    id: 31,
    title: "Conditional Types",
    description: "Type-level logic using extends.",
    icon: "fa-branch",
    color: "blue",
    category: "Advanced Types",
    articleId: 31,
  },
  {
    id: 32,
    title: "Mapped Types",
    description: "Transform existing types.",
    icon: "fa-transform",
    color: "green",
    category: "Advanced Types",
    articleId: 32,
  },
  {
    id: 33,
    title: "Infer Keyword",
    description: "Infer types within conditional types.",
    icon: "fa-lightbulb",
    color: "yellow",
    category: "Advanced Types",
    articleId: 33,
  },
  {
    id: 34,
    title: "Type Predicates",
    description: "Functions that narrow types.",
    icon: "fa-arrow-down",
    color: "orange",
    category: "Type System",
    articleId: 34,
  },
  {
    id: 35,
    title: "Discriminated Unions",
    description: "Unions with common discriminant property.",
    icon: "fa-union",
    color: "red",
    category: "Type System",
    articleId: 35,
  },
  {
    id: 36,
    title: "Never Type",
    description: "Represents values that never occur.",
    icon: "fa-ban",
    color: "black",
    category: "Type System",
    articleId: 36,
  },
  {
    id: 37,
    title: "Unknown Type",
    description: "Top type for unknown values.",
    icon: "fa-question",
    color: "gray",
    category: "Type System",
    articleId: 37,
  },
  {
    id: 38,
    title: "Void Type",
    description: "For functions returning nothing.",
    icon: "fa-empty-set",
    color: "blue",
    category: "Functions",
    articleId: 38,
  },
  {
    id: 39,
    title: "Any Type Risks",
    description: "Avoiding type safety with any.",
    icon: "fa-exclamation-triangle",
    color: "yellow",
    category: "Type System",
    articleId: 39,
  },
  {
    id: 40,
    title: "Non-null Assertion",
    description: "Assert non-null.",
    icon: "fa-exclamation",
    color: "red",
    category: "Type System",
    articleId: 40,
  },
  {
    id: 41,
    title: "Definite Assignment",
    description: "Assert assignment.",
    icon: "fa-check-square",
    color: "green",
    category: "Type System",
    articleId: 41,
  },
  {
    id: 42,
    title: "Enum Types",
    description: "Named constants.",
    icon: "fa-enum",
    color: "purple",
    category: "Basic Types",
    articleId: 42,
  },
  {
    id: 43,
    title: "Literal Types",
    description: "Specific values.",
    icon: "fa-literal",
    color: "indigo",
    category: "Basic Types",
    articleId: 43,
  },
  {
    id: 44,
    title: "Tuple Types",
    description: "Fixed length arrays.",
    icon: "fa-tuple",
    color: "violet",
    category: "Basic Types",
    articleId: 44,
  },
  {
    id: 45,
    title: "Rest Parameters",
    description: "Variable args.",
    icon: "fa-ellipsis",
    color: "sky",
    category: "Functions",
    articleId: 45,
  },
  {
    id: 46,
    title: "Spread Operator Types",
    description: "Spreading in types.",
    icon: "fa-spread",
    color: "emerald",
    category: "Functions",
    articleId: 46,
  },
  {
    id: 47,
    title: "Destructuring Types",
    description: "Typed destructuring.",
    icon: "fa-destructure",
    color: "yellow",
    category: "Basic",
    articleId: 47,
  },
  {
    id: 48,
    title: "Module Types",
    description: "Typed modules.",
    icon: "fa-module",
    color: "rose",
    category: "Modules",
    articleId: 48,
  },
  {
    id: 49,
    title: "Namespace",
    description: "Organized code.",
    icon: "fa-namespace",
    color: "red",
    category: "Modules",
    articleId: 49,
  },
  {
    id: 50,
    title: "Declaration Merging",
    description: "Merging declarations.",
    icon: "fa-merge",
    color: "green",
    category: "Advanced",
    articleId: 50,
  },
];

// Initialize features
function initFeatures() {
  const container = document.getElementById("features-container");
  if (container) {
    container.innerHTML = features
      .map(
        (feature) => `
      <div class="feature-card card bg-theme-secondary rounded-2xl p-6 border border-theme hover:shadow-xl transition-all duration-300"
           onclick="scrollToArticle(${feature.articleId})">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center text-${feature.color}-600 dark:text-${feature.color}-400 flex-shrink-0">
            <i class="fas ${feature.icon} text-lg"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-semibold text-theme-primary">${feature.title}</h3>
              <span class="text-xs px-2 py-1 bg-theme-primary text-theme-secondary rounded-full">${feature.category}</span>
            </div>
            <p class="text-theme-secondary text-sm leading-relaxed">${feature.description}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

// Enhanced Articles Data (50 articles)
const articles = [
  {
    id: 1,
    title: "Understanding Union Types in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Union types allow a variable to hold values of different types. They're defined with the pipe <code class="bg-theme-primary px-1 rounded">|</code> operator and provide flexibility while maintaining type safety.</p>
     
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Defining union types
type ID = string | number;
type Status = "success" | "error" | "loading";

function processID(id: ID): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return id.toFixed(2);
  }
}

// Using with interfaces
interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
  }
}</code></pre>
     
      <p class="text-theme-secondary">Union types are essential for handling different data formats, API responses, and creating flexible function interfaces while maintaining type safety through type narrowing.</p>
    `,
  },
  {
    id: 2,
    title: "Type Guards for Runtime Safety",
    content: `
      <p class="text-theme-secondary mb-4">Type guards refine types during runtime, making code safer and clearer. They allow TypeScript to narrow down types within conditional blocks.</p>
     
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Different types of type guards
// 1. typeof guards
function isString(value: any): value is string {
  return typeof value === "string";
}

// 2. instanceof guards
class Animal { }

class Dog extends Animal { bark() { } }

function isDog(animal: Animal): animal is Dog {
  return animal instanceof Dog;
}

// 3. Custom type guards with type predicates
interface Bird { fly(): void; }
interface Fish { swim(): void; }

function isBird(pet: Bird | Fish): pet is Bird {
  return (pet as Bird).fly !== undefined;
}

// 4. in operator guards
function move(pet: Bird | Fish) {
  if ("fly" in pet) {
    pet.fly();
  } else {
    pet.swim();
  }
}

// 5. Literal type guards
type NetworkState =
  | { state: "loading" }
  | { state: "success", data: string }
  | { state: "error", code: number };

function getResult(state: NetworkState): string {
  switch (state.state) {
    case "loading":
      return "Loading...";
    case "success":
      return \`Data: \${state.data}\`;
    case "error":
      return \`Error code: \${state.code}\`;
  }
}</code></pre>
     
      <p class="text-theme-secondary">Type guards are crucial for working with union types and ensuring type safety at runtime. Use type predicates <code class="bg-theme-primary px-1 rounded">value is Type</code> to create custom guards that TypeScript can understand.</p>
    `,
  },
  {
    id: 3,
    title: "Mastering Optional Chaining in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Optional chaining allows safe access to nested properties.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">const user = { address: { city: 'NYC' } };
const city = user?.address?.city;</code></pre>
    `,
  },
  {
    id: 4,
    title: "Generics in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Generics for reusable code.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">function identity<T>(arg: T): T { return arg; }</code></pre>
    `,
  },
  {
    id: 5,
    title: "Type Assertions Explained",
    content: `
      <p class="text-theme-secondary mb-4">Using as keyword.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">let value = "string" as string;</code></pre>
    `,
  },
  {
    id: 6,
    title: "Interfaces vs Type Aliases",
    content: `
      <p class="text-theme-secondary mb-4">Differences and use cases.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">interface I {} type T = {};</code></pre>
    `,
  },
  {
    id: 7,
    title: "Function Overloads",
    content: `
      <p class="text-theme-secondary mb-4">Multiple function signatures.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">function fn(a: string): void; function fn(a: number): void;</code></pre>
    `,
  },
  {
    id: 8,
    title: "Mapped Types",
    content: `
      <p class="text-theme-secondary mb-4">Mapping over keys.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">type M<T> = { [K in keyof T]: T[K] };</code></pre>
    `,
  },
  {
    id: 9,
    title: "Conditional Types",
    content: `
      <p class="text-theme-secondary mb-4">Conditional logic in types.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">type C<T> = T extends U ? X : Y;</code></pre>
    `,
  },
  {
    id: 10,
    title: "Decorators",
    content: `
      <p class="text-theme-secondary mb-4">Class decorators.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">@decorator class C {}</code></pre>
    `,
  },
  {
    id: 11,
    title: "Non-null Assertion",
    content: `
      <p class="text-theme-secondary mb-4">! operator.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">value!;</code></pre>
    `,
  },
  {
    id: 12,
    title: "Definite Assignment Assertion",
    content: `
      <p class="text-theme-secondary mb-4">! for assignment.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">let x!: number;</code></pre>
    `,
  },
  {
    id: 13,
    title: "Enum Types",
    content: `
      <p class="text-theme-secondary mb-4">Enums in TS.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">enum E { A, B }</code></pre>
    `,
  },
  {
    id: 14,
    title: "Literal Types",
    content: `
      <p class="text-theme-secondary mb-4">Literal values.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">type L = "a" | "b";</code></pre>
    `,
  },
  {
    id: 15,
    title: "Tuple Types",
    content: `
      <p class="text-theme-secondary mb-4">Tuples.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">[string, number];</code></pre>
    `,
  },
  {
    id: 16,
    title: "Rest Parameters",
    content: `
      <p class="text-theme-secondary mb-4">Rest params.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">...args: number[]</code></pre>
    `,
  },
  {
    id: 17,
    title: "Spread Operator Types",
    content: `
      <p class="text-theme-secondary mb-4">Spread typing.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">...array</code></pre>
    `,
  },
  {
    id: 18,
    title: "Destructuring Types",
    content: `
      <p class="text-theme-secondary mb-4">Destructuring.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">{ a, b }</code></pre>
    `,
  },
  {
    id: 19,
    title: "Modules",
    content: `
      <p class="text-theme-secondary mb-4">Modules in TS.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">export {}</code></pre>
    `,
  },
  {
    id: 20,
    title: "Namespaces",
    content: `
      <p class="text-theme-secondary mb-4">Namespaces.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">namespace N {}</code></pre>
    `,
  },
  {
    id: 21,
    title: "Declaration Merging",
    content: `
      <p class="text-theme-secondary mb-4">Merging.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">interface I {} interface I {}</code></pre>
    `,
  },
  {
    id: 22,
    title: "Any Type Risks",
    content: `
      <p class="text-theme-secondary mb-4">Risks of any.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">any</code></pre>
    `,
  },
  {
    id: 23,
    title: "Void Type",
    content: `
      <p class="text-theme-secondary mb-4">Void.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">void</code></pre>
    `,
  },
  {
    id: 24,
    title: "Unknown Type",
    content: `
      <p class="text-theme-secondary mb-4">Unknown.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">unknown</code></pre>
    `,
  },
  {
    id: 25,
    title: "Never Type",
    content: `
      <p class="text-theme-secondary mb-4">Never.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">never</code></pre>
    `,
  },
  {
    id: 26,
    title: "Discriminated Unions",
    content: `
      <p class="text-theme-secondary mb-4">Discriminated unions.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">kind: "type"</code></pre>
    `,
  },
  {
    id: 27,
    title: "Type Predicates",
    content: `
      <p class="text-theme-secondary mb-4">Predicates.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">is Type</code></pre>
    `,
  },
  {
    id: 28,
    title: "Infer Keyword",
    content: `
      <p class="text-theme-secondary mb-4">Infer.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">infer U</code></pre>
    `,
  },
  {
    id: 29,
    title: "Mapped Types",
    content: `
      <p class="text-theme-secondary mb-4">Mapped.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">[K in keyof T]</code></pre>
    `,
  },
  {
    id: 30,
    title: "Template Literal Types in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Template literal types allow you to manipulate string literal types using template literal syntax, enabling powerful type-level string operations.</p>
     
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic template literal types
type Event = "click" | "scroll" | "keydown";
type Handler = \`on\${Capitalize<Event>}\`;

// Result: "onClick" | "onScroll" | "onKeydown"

// Complex transformations
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";
type Alignment = \`\${VerticalAlignment}-\${HorizontalAlignment}\`;

// Advanced use cases with inference
type ExtractEvent<T> = T extends \`on\${infer Event}\` ? Uncapitalize<Event> : never;
type Extracted = ExtractEvent<"onClick">; // "click"

// Utility types for string manipulation
type Getter<T extends string> = \`get\${Capitalize<T>}\`;
type Setter<T extends string> = \`set\${Capitalize<T>}\`;

type NameGetters = Getter<"name" | "age">; // "getName" | "getAge"
type NameSetters = Setter<"name" | "age">; // "setName" | "setAge"

// Real-world example: CSS property mapping
type CSSProperty = "margin" | "padding";
type CSSDirection = "Top" | "Right" | "Bottom" | "Left";
type CSSProperties = \`\${CSSProperty}\${CSSDirection}\`;

// Result: "marginTop" | "marginRight" | ... | "paddingLeft"</code></pre>
     
      <p class="text-theme-secondary">Template literal types open up powerful possibilities for type-safe string manipulation, API design, and creating more intuitive type systems that match your domain language.</p>
    `,
  },
  {
    id: 31,
    title: "Conditional Types in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Conditional types introduction.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">T extends U ? X : Y</code></pre>
    `,
  },
  {
    id: 32,
    title: "Advanced Mapped Types",
    content: `
      <p class="text-theme-secondary mb-4">Mapped types transform existing types by iterating over their properties.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Mapped type with modifiers
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Removing modifiers
type Concrete<T> = {
  -readonly [P in keyof T]-?: T[P];
};

// Key remapping
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};</code></pre>
    `,
  },
  {
    id: 33,
    title: "Infer Keyword Deep Dive",
    content: `
      <p class="text-theme-secondary mb-4">The infer keyword allows you to extract and work with types within conditional types.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic infer usage
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Infer in array types
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

// Infer in promise types
type PromiseType<T> = T extends Promise<infer U> ? U : never;

// Multiple infer positions
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

// Complex conditional with infer
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T;</code></pre>
    `,
  },
  {
    id: 34,
    title: "Advanced Type Predicates",
    content: `
      <p class="text-theme-secondary mb-4">Type predicates provide powerful runtime type checking capabilities.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic type predicate
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Complex type predicate
interface Cat {
  type: 'cat';
  meow(): void;
}

interface Dog {
  type: 'dog';
  bark(): void;
}

function isCat(pet: Cat | Dog): pet is Cat {
  return pet.type === 'cat';
}

// Type predicate with assertions
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Not a number');
  }
}</code></pre>
    `,
  },
  {
    id: 35,
    title: "Advanced Discriminated Unions",
    content: `
      <p class="text-theme-secondary mb-4">Discriminated unions provide type safety for complex data structures.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Complex discriminated union
type NetworkState =
  | { state: "loading" }
  | { state: "success"; data: string }
  | { state: "error"; code: number; message: string };</code></pre>
    `,
  },
  {
    id: 36,
    title: "Never Type Patterns",
    content: `
      <p class="text-theme-secondary mb-4">The never type represents values that never occur and is useful for exhaustive checks.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Exhaustiveness checking
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      // TypeScript will error if we forget a case
      return assertNever(shape);
  }
}

// Filtering never types
type NonNullable<T> = T extends null | undefined ? never : T;</code></pre>
    `,
  },
  {
    id: 37,
    title: "Unknown Type Safety",
    content: `
      <p class="text-theme-secondary mb-4">The unknown type provides type safety for values of unknown type.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Unknown requires type checking
function processValue(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (Array.isArray(value)) {
    return value.length;
  }
  throw new Error('Invalid value type');
}

// Type guards with unknown
function isUser(obj: unknown): obj is { name: string; age: number } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'age' in obj
  );
}</code></pre>
    `,
  },
  {
    id: 38,
    title: "Void Type Usage",
    content: `
      <p class="text-theme-secondary mb-4">The void type represents the absence of a value, typically used for functions that don't return anything.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic void usage
function logMessage(message: string): void {
  console.log(message);
}

// Void in callbacks
function forEach<T>(arr: T[], callback: (item: T) => void): void {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

// Void vs undefined
type VoidFunc = () => void;
type UndefinedFunc = () => undefined;</code></pre>
    `,
  },
  {
    id: 39,
    title: "Any Type Dangers",
    content: `
      <p class="text-theme-secondary mb-4">The any type bypasses TypeScript's type checking and should be used sparingly.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Dangers of any
let dangerous: any = 'hello';
dangerous = 42; // No error
dangerous.nonExistentMethod(); // Runtime error!

// Better alternatives to any
// Use unknown for values of unknown type
// Use generics for flexible typing
// Use type assertions when you know more than TypeScript</code></pre>
    `,
  },
  {
    id: 40,
    title: "Non-null Assertion Operator",
    content: `
      <p class="text-theme-secondary mb-4">The non-null assertion operator tells TypeScript that a value is not null or undefined.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Non-null assertion
function getLength(str: string | null): number {
  return str!.length; // We're sure str is not null
}

// Definite assignment assertion
class MyClass {
  value!: string; // Will be assigned later
  
  initialize() {
    this.value = 'hello';
  }
}

// Use with caution - can lead to runtime errors!</code></pre>
    `,
  },
  {
    id: 41,
    title: "Definite Assignment Assertion",
    content: `
      <p class="text-theme-secondary mb-4">Definite assignment assertions tell TypeScript that a variable will be assigned before use.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Definite assignment
let x!: number;
initialize();
console.log(x); // No error because of !

function initialize() {
  x = 10;
}

// Class property assignment
class MyClass {
  name!: string;
  
  constructor() {
    this.initialize();
  }
  
  initialize() {
    this.name = 'TypeScript';
  }
}</code></pre>
    `,
  },
  {
    id: 42,
    title: "Enum Types Deep Dive",
    content: `
      <p class="text-theme-secondary mb-4">Enums allow you to define a set of named constants.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Numeric enums
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// String enums
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// Const enums (removed during compilation)
const enum LogLevel {
  Error,
  Warn,
  Info,
  Debug,
}

// Heterogeneous enums (mixed string and numeric)
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}</code></pre>
    `,
  },
  {
    id: 43,
    title: "Literal Types Advanced",
    content: `
      <p class="text-theme-secondary mb-4">Literal types allow you to specify exact values as types.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// String literal types
type EventType = 'click' | 'scroll' | 'keypress';

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literal types
type Truthy = true;

// Literal types in function parameters
function setAlignment(alignment: 'left' | 'center' | 'right') {
  // ...
}

// Combining with other types
interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
}</code></pre>
    `,
  },
  {
    id: 44,
    title: "Tuple Types Advanced",
    content: `
      <p class="text-theme-secondary mb-4">Tuples allow you to express an array with a fixed number of elements of known types.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic tuple
type StringNumberPair = [string, number];

// Optional tuple elements
type OptionalTuple = [string, number?];

// Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];

// Readonly tuples
type ReadonlyTuple = readonly [string, number];

// Labeled tuple elements
type Range = [start: number, end: number];</code></pre>
    `,
  },
  {
    id: 45,
    title: "Rest Parameters Advanced",
    content: `
      <p class="text-theme-secondary mb-4">Rest parameters allow functions to accept an indefinite number of arguments as an array.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Typed rest parameters
function join(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

// Rest parameters with tuples
function tupleSum(...args: [number, number, number]): number {
  return args[0] + args[1] + args[2];
}

// Generic rest parameters
function mergeObjects<T extends object[]>(...objects: T): T[number] {
  return Object.assign({}, ...objects);
}</code></pre>
    `,
  },
  {
    id: 46,
    title: "Spread Operator Types",
    content: `
      <p class="text-theme-secondary mb-4">The spread operator can be used with typed arrays and objects.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Array spreading
const parts = [1, 2];
const moreParts = [0, ...parts, 3, 4];

// Object spreading
interface Point {
  x: number;
  y: number;
}

const point: Point = { x: 1, y: 2 };
const point3D = { ...point, z: 3 };

// Spread with type safety
function merge<A, B>(a: A, b: B): A & B {
  return { ...a, ...b };
}</code></pre>
    `,
  },
  {
    id: 47,
    title: "Destructuring Types",
    content: `
      <p class="text-theme-secondary mb-4">TypeScript provides type safety for destructuring objects and arrays.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Object destructuring with types
function draw({ shape, x, y }: { shape: string; x: number; y: number }) {
  // ...
}

// Array destructuring with types
function firstAndLast([first, last]: [string, string]): string {
  return first + ' ' + last;
}

// Default values in destructuring
function createElement({
  tag = 'div',
  content = '',
  className = ''
}: {
  tag?: string;
  content?: string;
  className?: string;
} = {}) {
  // ...
}</code></pre>
    `,
  },
  {
    id: 48,
    title: "Module Types",
    content: `
      <p class="text-theme-secondary mb-4">TypeScript enhances JavaScript modules with type safety.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Exporting types
export interface User {
  id: number;
  name: string;
  email: string;
}

export type Status = 'active' | 'inactive' | 'pending';

// Re-exporting
export { User as UserType } from './types';

// Default exports with types
export default function createUser(user: User): User {
  return { ...user, id: Date.now() };
}</code></pre>
    `,
  },
  {
    id: 49,
    title: "Namespaces",
    content: `
      <p class="text-theme-secondary mb-4">Namespaces help organize code and prevent global namespace pollution.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic namespace
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.includes('@');
    }
  }
}

// Nested namespaces
namespace Shapes {
  export namespace Polygons {
    export class Triangle { }
    export class Square { }
  }
}

// Using namespaces
let validator = new Validation.EmailValidator();</code></pre>
    `,
  },
  {
    id: 50,
    title: "Declaration Merging",
    content: `
      <p class="text-theme-secondary mb-4">Declaration merging allows multiple declarations to contribute to a single definition.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Interface merging
interface Box {
  height: number;
}

interface Box {
  width: number;
}

// The resulting Box interface has both properties
const box: Box = { height: 10, width: 20 };

// Namespace merging
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

namespace Validation {
  export class EmailValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.includes('@');
    }
  }
}</code></pre>
    `,
  },
];

// Initialize articles
function initArticles() {
  const container = document.getElementById("articles-container");
  if (container) {
    container.innerHTML = articles
      .map(
        (article, index) => `
      <article class="bg-theme-secondary rounded-2xl shadow-lg overflow-hidden border border-theme hover:shadow-xl transition-all duration-300" id="article-${article.id}">
        <header class="p-6 border-b border-theme cursor-pointer hover:bg-theme-primary transition-colors" onclick="toggleArticle(${index})">
          <h3 class="text-xl font-semibold flex justify-between items-center text-theme-primary">
            <span>${article.title}</span>
            <i class="fas fa-chevron-down text-theme-secondary transition-transform duration-300"></i>
          </h3>
        </header>
        <div class="article-content">
          <div class="p-6">
            ${article.content}
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }
}

// Article toggle functionality
function toggleArticle(index) {
  const articles = document.querySelectorAll(".article-content");
  const article = articles[index];
  if (!article) return;

  article.classList.toggle("show");

  // Rotate the chevron
  const headers = document.querySelectorAll(".article header");
  const header = headers[index];
  const chevron = header ? header.querySelector(".fa-chevron-down") : null;
  if (chevron) chevron.classList.toggle("fa-rotate-180");

  // Re-highlight code blocks if revealed
  if (window.hljs) {
    setTimeout(() => {
      article.querySelectorAll("pre code").forEach((block) => {
        try {
          window.hljs.highlightElement(block);
        } catch (e) {}
      });
    }, 300);
  }
}

// Scroll to article function
function scrollToArticle(articleId) {
  const articleElement = document.getElementById(`article-${articleId}`);
  if (articleElement) {
    articleElement.scrollIntoView({ behavior: "smooth" });

    // Open the article if it's closed
    const index = articles.findIndex((a) => a.id === articleId);
    if (index !== -1) {
      const articleContent =
        document.querySelectorAll(".article-content")[index];
      if (articleContent && !articleContent.classList.contains("show")) {
        toggleArticle(index);
      }
    }
  }
}

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;

  mobileMenu.classList.toggle("-translate-y-full");
  const isHidden = mobileMenu.classList.contains("-translate-y-full");
  mobileMenu.setAttribute("aria-hidden", isHidden ? "true" : "false");

  // Toggle body scroll
  document.body.style.overflow = isHidden ? "" : "hidden";
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobile-menu");
  const button = document.getElementById("mobile-menu-button");
  if (!mobileMenu || !button) return;

  const target = event.target;
  if (!mobileMenu.contains(target) && !button.contains(target)) {
    if (!mobileMenu.classList.contains("-translate-y-full")) {
      mobileMenu.classList.add("-translate-y-full");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }
});

// Navbar hide on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 120) {
    navbar.classList.add("nav-hidden");
    if (mobileMenu) {
      mobileMenu.classList.add("-translate-y-full");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  } else {
    navbar.classList.remove("nav-hidden");
  }

  lastScrollTop = scrollTop;
});

// Ace Editor Setup
let aceEditor = null;

function setupAce() {
  try {
    aceEditor = ace.edit("ace-editor", {
      mode: "ace/mode/typescript",
      theme: "ace/theme/monokai",
      wrap: true,
      tabSize: 2,
      useWorker: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      fontSize: "14px",
      showPrintMargin: false,
    });

    // Default content
    const defaultCode = `// Welcome to TypeScript Pro Playground!
// Try writing TypeScript code and click Run to see the output

// Basic type annotations
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;

// Function with types
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Interface example
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

// Using the interface
const user: User = {
  id: 1,
  name: "Alice"
};

// Generic function
function identity<T>(value: T): T {
  return value;
}

// Console output
console.log(greet("TypeScript Developer"));
console.log("User:", user);
console.log("Identity result:", identity<string>("test"));`;

    aceEditor.setValue(defaultCode, -1);
    aceEditor.clearSelection();

    // Add some basic TypeScript types to autocomplete
    aceEditor.completers = [
      {
        getCompletions: function (editor, session, pos, prefix, callback) {
          const typescriptKeywords = [
            "interface",
            "type",
            "enum",
            "class",
            "function",
            "let",
            "const",
            "var",
            "string",
            "number",
            "boolean",
            "any",
            "void",
            "null",
            "undefined",
            "never",
            "unknown",
            "public",
            "private",
            "protected",
            "readonly",
            "static",
            "extends",
            "implements",
            "namespace",
            "module",
            "import",
            "export",
            "default",
            "from",
            "as",
            "typeof",
            "keyof",
            "in",
            "is",
            "instanceof",
          ].map((word) => ({
            caption: word,
            value: word,
            meta: "keyword",
          }));

          callback(null, typescriptKeywords);
        },
      },
    ];
  } catch (e) {
    console.warn("Ace editor setup failed:", e);
  }
}

function insertExampleIntoEditor(exampleIndex) {
  if (!aceEditor) return;

  const txt = examples[exampleIndex].code + "\n\n";
  aceEditor.session.insert(
    { row: aceEditor.session.getLength(), column: 0 },
    "\n" + txt
  );
  aceEditor.focus();

  // Show notification with improved styling
  showNotification(`Added "${examples[exampleIndex].title}" example to editor`);
}

function formatEditor() {
  if (!aceEditor) return;

  const content = aceEditor.getValue();
  // Basic formatting - replace tabs with 2 spaces and clean up empty lines
  const formatted = content
    .replace(/\t/g, "  ")
    .replace(/\n\s*\n\s*\n/g, "\n\n");

  aceEditor.setValue(formatted, -1);
  showNotification("Code formatted");
}

function clearEditor() {
  if (!aceEditor) return;

  aceEditor.setValue("", -1);
  showNotification("Editor cleared");
}

function clearOutput() {
  document.getElementById("output-code").textContent = "// Output cleared";
}

function runEditorCode() {
  if (!aceEditor) return;

  const raw = aceEditor.getValue();

  // Show loading state
  const outputEl = document.getElementById("output-code");
  outputEl.innerHTML =
    '<div class="flex items-center gap-2 text-sky-600"><div class="spinner"></div> Compiling and running TypeScript...</div>';

  setTimeout(() => {
    // Naive TypeScript-to-JavaScript transformation for demo
    let compiled = raw
      .replace(/:\s*string\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*number\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*boolean\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*any\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*void\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*never\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*unknown\s*(?=[,=){};]|$)/g, "")
      .replace(/<\w+>/g, "") // Remove simple generics
      .replace(/interface\s+\w+\s*{[^}]*}/g, "") // Remove interfaces
      .replace(/type\s+\w+\s*=([^;]+);/g, "") // Remove type aliases
      .replace(/readonly\s+/g, "")
      .replace(/private\s+/g, "")
      .replace(/protected\s+/g, "")
      .replace(/public\s+/g, "");

    // Capture console output
    let out = "";
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = function (...args) {
      out +=
        args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
          )
          .join(" ") + "\n";
    };

    console.error = function (...args) {
      out += "ERROR: " + args.map(String).join(" ") + "\n";
    };

    console.warn = function (...args) {
      out += "WARNING: " + args.map(String).join(" ") + "\n";
    };

    try {
      // Execute in a try-catch to handle runtime errors
      new Function(compiled)();
      if (!out.trim()) {
        out = "Code executed successfully (no console output).";
      }
    } catch (err) {
      out =
        "Runtime Error: " + (err && err.message ? err.message : String(err));
    } finally {
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }

    outputEl.textContent = out;
    showNotification("Code executed successfully");
  }, 500);
}

// Enhanced Chatbot functionality
const chatDrawer = document.getElementById("chat-drawer");
const chatBody = document.getElementById("chat-body");
const chatFloatingBtn = document.getElementById("chat-floating-btn");

function openChat() {
  if (!chatDrawer) return;

  chatDrawer.style.transform = "translateY(0)";
  chatDrawer.style.opacity = "1";
  chatDrawer.style.pointerEvents = "auto";
  chatFloatingBtn.style.opacity = "0";
  chatFloatingBtn.style.pointerEvents = "none";
  document.getElementById("chat-input").focus();
}

function closeChat() {
  if (!chatDrawer) return;

  chatDrawer.style.transform = "translateY(8px)";
  chatDrawer.style.opacity = "0";
  chatDrawer.style.pointerEvents = "none";
  chatFloatingBtn.style.opacity = "1";
  chatFloatingBtn.style.pointerEvents = "auto";
}

function appendChat(message, who = "bot", isTyping = false) {
  if (!chatBody) return;

  const messageId = "msg-" + Date.now();
  const wrap = document.createElement("div");
  wrap.id = messageId;
  wrap.className = `chat-message ${who} p-4 rounded-2xl mb-4 ${
    who === "user" ? "user ml-12" : "bot mr-12"
  } ${isTyping ? "typing" : ""}`;

  if (who === "user") {
    wrap.innerHTML = `
      <div class="flex items-start gap-3 justify-end">
        <div class="flex-1 text-right">
          <div class="text-sm font-medium text-theme-secondary mb-1">You</div>
          <div class="text-theme-primary text-sm bg-theme-secondary p-3 rounded-xl border border-theme inline-block">${message}</div>
        </div>
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white text-sm flex-shrink-0">
          <i class="fas fa-user"></i>
        </div>
      </div>
    `;
  } else {
    if (isTyping) {
      wrap.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <i class="fas fa-robot text-sm"></i>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-theme-secondary mb-1">TypeScript Assistant</div>
            <div class="text-theme-secondary text-sm bg-theme-secondary p-3 rounded-xl border border-theme">
              <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      wrap.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <i class="fas fa-robot text-sm"></i>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-theme-secondary mb-1">TypeScript Assistant</div>
            <div class="text-theme-secondary text-sm bg-theme-secondary p-3 rounded-xl border border-theme">${message}</div>
          </div>
        </div>
      `;
    }
  }

  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
  return messageId;
}

function updateChatMessage(messageId, newContent) {
  const messageEl = document.getElementById(messageId);
  if (messageEl) {
    const contentEl = messageEl.querySelector(
      ".text-theme-secondary, .text-theme-primary"
    );
    if (contentEl) {
      contentEl.innerHTML = newContent;
    }
  }
}

function clearChat() {
  if (!chatBody) return;

  chatBody.innerHTML = `
    <div class="chat-message bot p-4 rounded-2xl mb-4 mr-12">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
          <i class="fas fa-robot text-sm"></i>
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium text-theme-secondary mb-1">TypeScript Assistant</div>
          <div class="text-theme-secondary text-sm bg-theme-secondary p-3 rounded-xl border border-theme">
            Hello! I'm your TypeScript AI assistant. I can help you with TypeScript concepts, provide examples, and even insert code directly into the editor. How can I assist you today?
          </div>
        </div>
      </div>
    </div>
  `;
  showNotification("Chat cleared");
}

function quickQuestion(question) {
  document.getElementById("chat-input").value = question;
  sendChat();
}

function sendChat() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  appendChat(text, "user");
  input.value = "";

  // Show typing indicator
  const typingId = appendChat("", "bot", true);

  // Simulate AI thinking
  setTimeout(() => {
    // Remove typing indicator
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.remove();
    }

    // Add AI response
    const reply = generateAIResponse(text);
    appendChat(reply, "bot");

    // Handle special actions
    if (reply.includes("[insert example")) {
      const found = reply.match(/\[insert example:(\d+)\]/);
      if (found && found[1]) {
        const idx = Number(found[1]);
        insertExampleIntoEditor(idx);
      }
    }
  }, 1000 + Math.random() * 1000);
}

function generateAIResponse(userText) {
  const text = userText.toLowerCase();

  // Enhanced response system with more context
  if (text.includes("union") || text.includes("multiple types")) {
    return "Union types allow a variable to hold values of different types (e.g., `string | number`). They're perfect for functions that can accept different input types while maintaining type safety. Try the union types example: [insert example:0]";
  }

  if (
    text.includes("optional") ||
    text.includes("chaining") ||
    text.includes("safe access")
  ) {
    return "Optional chaining (`?.`) lets you safely access nested properties that might be `null` or `undefined`. It's a cleaner alternative to long conditional checks. Try it out: [insert example:1]";
  }

  if (
    text.includes("guard") ||
    text.includes("type guard") ||
    text.includes("narrow")
  ) {
    return "Type guards narrow down types at runtime using type predicates (`value is Type`). They're essential for working with union types safely. Check out this example: [insert example:2]";
  }

  if (
    text.includes("assert") ||
    text.includes("cast") ||
    text.includes("type assertion")
  ) {
    return "Type assertions (`as Type`) tell TypeScript to treat a value as a specific type. Use them sparingly when you know more about the type than TypeScript does. Example: [insert example:3]";
  }

  if (
    text.includes("generic") ||
    text.includes("reusable") ||
    text.includes("template")
  ) {
    return "Generics create reusable components and functions that work with multiple types while preserving type information. They're fundamental to TypeScript's type system. Try: [insert example:4]";
  }

  if (
    text.includes("interface") ||
    text.includes("type alias") ||
    text.includes("difference")
  ) {
    return "Interfaces and type aliases both define types, but interfaces are extendable and can be merged, while type aliases can represent union types and use computed properties. Learn more: [insert example:5]";
  }

  if (text.includes("overload") || text.includes("multiple signatures")) {
    return "Function overloads let you define multiple signatures for the same function, providing better type checking for different parameter combinations. Example: [insert example:6]";
  }

  if (text.includes("mapped") || text.includes("transform type")) {
    return "Mapped types transform existing types by iterating over their properties. They're powerful for creating utility types like `Readonly` and `Partial`. See: [insert example:7]";
  }

  if (text.includes("conditional") || text.includes("type logic")) {
    return "Conditional types (`T extends U ? X : Y`) enable type-level logic, making TypeScript's type system Turing-complete. They're advanced but incredibly powerful. Example: [insert example:8]";
  }

  if (
    text.includes("decorator") ||
    text.includes("annotation") ||
    text.includes("@")
  ) {
    return "Decorators (experimental) modify classes and members at design time. They're similar to annotations in other languages and are great for cross-cutting concerns. Try: [insert example:9]";
  }

  if (
    text.includes("run") ||
    text.includes("execute") ||
    text.includes("compile")
  ) {
    return "Click the Run button in the editor to compile your TypeScript code to JavaScript and execute it. The output will appear in the output panel. You can also try the examples in the Examples section!";
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hello! I'm your TypeScript assistant. I can explain concepts, provide code examples, and help you learn TypeScript. What would you like to know about?";
  }

  if (text.includes("thank")) {
    return "You're welcome! I'm glad I could help. Feel free to ask more questions about TypeScript features, best practices, or anything else!";
  }

  // Default response with suggestions
  return "I can help you with TypeScript concepts like union types, generics, type guards, interfaces, and more. Try asking about specific features or use the quick buttons below for common questions. You can also say 'insert example' followed by a topic to add code to the editor.";
}

// Notification system with improved styling
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-24 right-6 z-50 p-4 rounded-xl shadow-2xl border transform transition-all duration-500 translate-x-full notification`;
  notification.style.backdropFilter = "blur(10px)";
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas ${
        type === "info"
          ? "fa-info-circle text-sky-500"
          : type === "success"
          ? "fa-check-circle text-emerald-500"
          : "fa-exclamation-triangle text-amber-500"
      }"></i>
      <span class="font-medium">${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 10);

  // Remove after delay
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme();

  // Initialize components
  initFeatures();
  initArticles();
  initExamples();

  // Set up highlight.js
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }

  // Set up chat input event listener
  document
    .getElementById("chat-input")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendChat();
      }
    });

  // Set up chat open buttons
  document.getElementById("chat-open-btn")?.addEventListener("click", openChat);
  document
    .getElementById("chat-open-mobile")
    ?.addEventListener("click", openChat);

  // Show initial example
  showExample(0);
});

// Initialize Ace editor when window loads
window.addEventListener("load", () => {
  setupAce();

  // Re-highlight code blocks
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }
});

// Expose functions to global scope for HTML onclick handlers
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleMobileMenu = toggleMobileMenu;
window.showExample = showExample;
window.runExample = runExample;
window.toggleArticle = toggleArticle;
window.insertExampleIntoEditor = insertExampleIntoEditor;
window.formatEditor = formatEditor;
window.clearEditor = clearEditor;
window.clearOutput = clearOutput;
window.runEditorCode = runEditorCode;
window.sendChat = sendChat;
window.clearChat = clearChat;
window.quickQuestion = quickQuestion;
window.setTheme = setTheme;
window.scrollToArticle = scrollToArticle;

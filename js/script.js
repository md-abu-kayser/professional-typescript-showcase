// all javascript code here:
// ------------------------------------------------------->>>
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
function initTheme() {
  setTheme(currentTheme);
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
  updateThemeSelector(theme);
  // Theme-specific
  applyThemeStyles(theme);
}
// Theme-specific styles
function applyThemeStyles(theme) {
  const body = document.body;
  // Remove
  body.classList.remove(...availableThemes.map((t) => `theme-${t}`));
  body.classList.add(`theme-${theme}`);
}
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
let currentExample = 0;
function initExamples() {
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
  showExample(0);
}
function showExample(index) {
  currentExample = index;
  const ex = examples[currentExample];
  document.getElementById("example-title").textContent = ex.title;
  document.getElementById("example-description").textContent = ex.description;
  document.getElementById("example-code").textContent = ex.code;
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
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use union types when a value can legitimately be one of several types, like API responses or function parameters. Combine with type guards for safe access to type-specific properties. Avoid overly broad unions to maintain type safety.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: TypeScript enforces that you handle all possible types in a union, preventing errors like accessing non-existent properties. Use exhaustive checks with 'never' for complete coverage.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Discriminated unions (with a common literal property) enable powerful pattern matching, similar to sum types in functional languages.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Prefer built-in guards like typeof or instanceof when possible. Use custom predicates for complex checks. Always pair with union types for maximum benefit. When to use: When dealing with dynamic data or unions where runtime checks are necessary.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Type guards prevent invalid operations on wrong types, catching errors at compile time after narrowing. They bridge compile-time and runtime type checking.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Combine with assertion functions ('asserts value is Type') to throw errors if guards fail, ensuring type safety through exceptions.</p>
    `,
  },
  {
    id: 3,
    title: "Mastering Optional Chaining in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Optional chaining allows safe access to nested properties and methods that might be null or undefined, short-circuiting with undefined if any part is nullish.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic optional chaining
interface User {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}
const user: User = { name: 'Alice' };
const city = user.address?.city; // undefined
// Method calls
const length = user.address?.street?.length; // undefined
// With nullish coalescing
const safeCity = user.address?.city ?? 'Unknown';
// Array access
const firstFriend = user.friends?.[0];
// Function calls
user.getDetails?.();
// Real-world example: API response handling
interface ApiResponse {
  data?: {
    user?: {
      profile?: {
        avatar?: string;
      };
    };
  };
}
function getAvatar(response: ApiResponse): string | undefined {
  return response.data?.user?.profile?.avatar;
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use with nullish coalescing (??) for default values. Prefer over manual null checks for cleaner code. When to use: When working with potentially incomplete objects, like JSON data or optional properties in interfaces.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: TypeScript infers the type as possibly undefined, forcing you to handle null cases, preventing runtime errors.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Combine with optional element access (?.[expr]) for dynamic keys or array indices, and optional calls (?.()) for conditional function invocation.</p>
    `,
  },
  {
    id: 4,
    title: "Generics in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Generics enable creating reusable components that work with any data type while providing type safety and autocompletion.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}
const str = identity<string>('hello'); // string
const num = identity(42); // number (inferred)
// Generic interfaces
interface GenericArray<T> {
  items: T[];
  add(item: T): void;
}
// Class with generics
class Queue<T> {
  private data: T[] = [];
  enqueue(item: T): void {
    this.data.push(item);
  }
  dequeue(): T | undefined {
    return this.data.shift();
  }
}
const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
// Constraints
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
// Multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use constraints (extends) to limit types. Prefer inference over explicit types when possible. When to use: For collections, utilities, or components that should work with multiple types like arrays or promises.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Generics preserve type information through operations, preventing type mismatches and enabling better IDE support.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use default type parameters (T = string), conditional types in generics, and mapped types for transforming generic types.</p>
    `,
  },
  {
    id: 5,
    title: "Type Assertions Explained",
    content: `
      <p class="text-theme-secondary mb-4">Type assertions allow you to tell TypeScript the type of a value when it can't infer it, overriding the compiler's type checking.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic assertion
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;
// Angle bracket syntax
let numLength: number = (<string>someValue).length;
// With unknown
let input: unknown = 'hello';
if (typeof input === 'string') {
  let asserted = input as string; // Safe after check
}
// Const assertions
let readonly = { x: 1, y: 2 } as const; // readonly properties
// Non-null assertion
let maybeNull: string | null = getValue();
let definite = maybeNull!; // Dangerous if wrong
// Real-world: DOM elements
const button = document.getElementById('btn') as HTMLButtonElement;
button.disabled = true;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use assertions only when necessary, like with third-party libraries or after runtime checks. Prefer type guards over assertions for safety. When to use: When interfacing with untyped JavaScript or when TypeScript's inference is insufficient.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Assertions can bypass type checking, potentially leading to runtime errors if incorrect. Always validate assumptions at runtime if possible.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use 'as const' for literal types and readonly structures. Combine with generics for flexible assertions.</p>
    `,
  },
  {
    id: 6,
    title: "Interfaces vs Type Aliases",
    content: `
      <p class="text-theme-secondary mb-4">Interfaces and type aliases both define shapes, but differ in extensibility, merging, and capabilities for complex types.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic interface
interface Point {
  x: number;
  y: number;
}
// Extending interface
interface 3DPoint extends Point {
  z: number;
}
// Type alias
type Coordinate = { x: number; y: number };
// Union with type alias
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };
// Intersection with type alias
type ColoredPoint = Point & { color: string };
// Declaration merging (interfaces only)
interface User { name: string; }
interface User { age: number; } // Merged
// Computed properties (type aliases only)
type Keys = 'id' | 'name';
type ObjectWithKeys = { [K in Keys]: string };</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use interfaces for object shapes that might be extended. Use type aliases for unions, intersections, or primitives. When to use: Interfaces for public APIs, type aliases for internal complex types.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Both provide strong typing, but interfaces support merging which can lead to unexpected additions if not careful.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use type aliases with mapped/conditional types. Interfaces for class implementations and extensibility in libraries.</p>
    `,
  },
  {
    id: 7,
    title: "Function Overloads",
    content: `
      <p class="text-theme-secondary mb-4">Function overloads provide multiple type signatures for a single implementation, improving type checking for different call patterns.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic overloads
function padLeft(value: string, padding: string): string;
function padLeft(value: string, padding: number): string;
function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  return padding + value;
}
// Class method overloads
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    return a.toString() + b.toString();
  }
}
// Generic overloads
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
function getProperty(obj: any, key: string): any {
  return obj[key];
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Keep implementation signature compatible with all overloads. Use unions where possible instead of many overloads. When to use: When a function behaves differently based on argument types or count.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Overloads ensure callers get correct return types and parameter validation, preventing misuse.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Combine with generics for type-safe variadic functions or complex parameter dependencies.</p>
    `,
  },
  {
    id: 8,
    title: "Mapped Types",
    content: `
      <p class="text-theme-secondary mb-4">Mapped types create new types by transforming properties of existing types, enabling reusable type utilities.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
// With modifiers
type Optional<T> = {
  [P in keyof T]?: T[P];
};
// Key remapping (TS 4.1+)
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};
// Utility types example
type Person = { name: string; age: number; location: string };
type PersonGetters = Getters<Person>; // { getName: () => string; ... }
// Conditional mapping
type ExtractStrings<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
};</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for DRY type definitions. Combine with keyof for type-safe keys. When to use: Creating readonly/partial versions of types or transforming object shapes.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Mapped types preserve relationships between properties, ensuring transformations are type-safe.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use with conditional types for filtered mappings, or homomorphic mapped types for preserving modifiers.</p>
    `,
  },
  {
    id: 9,
    title: "Conditional Types",
    content: `
      <p class="text-theme-secondary mb-4">Conditional types introduce logic at the type level, selecting types based on type relationships using 'extends'.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic conditional
type IsString<T> = T extends string ? 'yes' : 'no';
// Distributed conditionals
type ArrayItem<T> = T extends Array<infer U> ? U : T;
// Exclude
type Exclude<T, U> = T extends U ? never : T;
type StringOnly = Exclude<string | number | boolean, number | boolean>; // string
// Extract return type
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
// Nested conditionals
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use infer to extract types. Keep simple to avoid complexity. When to use: For type utilities like Extract, Exclude, or inferring types from generics.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enables precise type narrowing and utilities that enforce type relationships.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Distributed conditionals over unions, recursive conditionals for deep types, combined with mapped types for powerful transformations.</p>
    `,
  },
  {
    id: 10,
    title: "Decorators",
    content: `
      <p class="text-theme-secondary mb-4">Decorators provide a way to add annotations and meta-programming syntax for class declarations and members (experimental feature).</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
@sealed
class Greeter {
  greeting: string;
}
// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyKey}\`);
    return original.apply(this, args);
  };
}
class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
// Parameter decorator
function validate(target: any, propertyName: string, parameterIndex: number) {
  // Validation logic
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for cross-cutting concerns like logging or validation. Enable experimentalDecorators in tsconfig. When to use: In frameworks like Angular for component metadata.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Decorators don't change types but can enforce runtime checks that align with types.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Decorator factories for configurable decorators, composition of multiple decorators, property and accessor decorators.</p>
    `,
  },
  {
    id: 11,
    title: "Non-null Assertion",
    content: `
      <p class="text-theme-secondary mb-4">The non-null assertion operator (!) tells TypeScript that an expression is not null or undefined, removing null/undefined from the type.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic usage
let maybeString: string | null = getString();
let definiteString = maybeString!; // string
// With optional chaining
const length = user.address?.street!.length; // Use ! if sure after ?.
// DOM example
const element = document.getElementById('id')!; // HTMLElement
// In functions
function process(value: string | null) {
  const safe = value!;
  // ...
}
// Risks
let nullValue: string | null = null;
nullValue!.length; // Runtime error!</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use sparingly after runtime checks. Prefer optional chaining or guards. When to use: When you know a value can't be null but TypeScript doesn't.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Can lead to runtime errors if assumption is wrong; use as a last resort.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In class initializers or after await where types are widened.</p>
    `,
  },
  {
    id: 12,
    title: "Definite Assignment Assertion",
    content: `
      <p class="text-theme-secondary mb-4">Definite assignment assertions (!) tell TypeScript that a variable will be assigned before use, even if not initialized immediately.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Class property
class MyClass {
  value!: string; // Asserts it will be assigned
  constructor() {
    this.init();
  }
  init() {
    this.value = 'hello';
  }
}
// Variable
let x!: number;
function setX() { x = 42; }
setX();
console.log(x); // Safe
// With strict mode
class Strict {
  prop!: number; // Required in strictNullChecks
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use when initialization happens indirectly (e.g., in lifecycle methods). Document why it's safe. When to use: In classes with deferred initialization or framework hooks.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Bypasses compiler checks, so ensure runtime assignment to avoid undefined errors.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use with dependency injection or async initialization patterns.</p>
    `,
  },
  {
    id: 13,
    title: "Enum Types",
    content: `
      <p class="text-theme-secondary mb-4">Enums define a set of named constants, making code more readable and type-safe for fixed value sets.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Numeric enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right, // Auto-increments
}
// String enum
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}
// Const enum (compile-time only)
const enum LogLevel {
  Error = 0,
  Warn = 1,
}
// Heterogeneous
enum Status {
  Active = 1,
  Inactive = 'inactive',
}
// Usage
function move(dir: Direction) {
  switch (dir) {
    case Direction.Up: /* ... */
  }
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use string enums for better debugging. Const enums for performance. When to use: For status codes, directions, or any fixed set of values.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enums prevent assigning invalid values and provide autocompletion.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Enum as namespace for related constants, or with bit flags for combinations.</p>
    `,
  },
  {
    id: 14,
    title: "Literal Types",
    content: `
      <p class="text-theme-secondary mb-4">Literal types specify exact values, enabling precise type checking for strings, numbers, or booleans.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// String literals
type Alignment = 'left' | 'center' | 'right';
function setAlign(a: Alignment) { /* ... */ }
// Numeric literals
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
function roll(): Dice { return 1; }
// Boolean literal
type Yes = true;
// With objects
type Action = { type: 'ADD' } | { type: 'REMOVE' };
// As const
const directions = ['north', 'south'] as const;
type Dir = typeof directions[number];</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Combine with unions for enums-like behavior without overhead. Use 'as const' for inference. When to use: For configuration options or action types in reducers.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Ensures only specific values are allowed, catching invalid assignments at compile time.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Template literal types for string patterns, or with keyof for type-safe keys.</p>
    `,
  },
  {
    id: 15,
    title: "Tuple Types",
    content: `
      <p class="text-theme-secondary mb-4">Tuples represent arrays with fixed length and specific types for each position.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic tuple
type Point = [number, number];
const origin: Point = [0, 0];
// Optional elements
type Response = [number, string?];
const ok: Response = [200];
// Rest elements
type Colors = [string, string, ...string[]];
const primary: Colors = ['red', 'blue'];
// Labeled tuples
type Vec3 = [x: number, y: number, z: number];
// Readonly
type ImmutablePoint = readonly [number, number];
// Destructuring
const [status, message] = [200, 'OK'] as const;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use labels for clarity. Make readonly when immutable. When to use: For returning multiple values or representing coordinates/CSV rows.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enforces length and position types, preventing index errors.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Variadic tuples with rest, or mapped types over tuples.</p>
    `,
  },
  {
    id: 16,
    title: "Rest Parameters",
    content: `
      <p class="text-theme-secondary mb-4">Rest parameters collect remaining arguments into an array, allowing functions to handle variable argument counts.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic rest
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
// Typed rest
function concat(sep: string, ...strings: string[]): string {
  return strings.join(sep);
}
// With fixed params
function buildName(first: string, ...rest: string[]): string {
  return [first, ...rest].join(' ');
}
// Generic rest
function merge<T>(...items: T[]): T[] {
  return items;
}
// Tuple rest
function process(...[first, second, ...rest]: [string, number, ...boolean[]]) {
  // ...
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Place rest last. Use specific types for safety. When to use: For utilities like sum or string join with variable inputs.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Types the array correctly, allowing type-safe operations on rest params.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Destructure rest in tuples, or use with generics for type-preserving variadics.</p>
    `,
  },
  {
    id: 17,
    title: "Spread Operator Types",
    content: `
      <p class="text-theme-secondary mb-4">The spread operator expands iterables in calls or literals, with TypeScript providing type inference for spreads.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Array spread
const parts: number[] = [2, 3];
const whole = [1, ...parts, 4]; // number[]
// Function call spread
Math.max(...[1, 2, 3]); // infers numbers
// Object spread
type Point = { x: number; y: number };
const point: Point = { x: 1, y: 2 };
const colored = { ...point, color: 'red' }; // Point & { color: string }
// Generic spread
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
// Tuple spread
type Tup = [1, ...number[], 2];</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for immutable updates. Avoid deep spreads. When to use: Merging objects/arrays or passing args.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Infers intersection types for objects, union for arrays.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Variadic tuple spreads, conditional spreads in objects.</p>
    `,
  },
  {
    id: 18,
    title: "Destructuring Types",
    content: `
      <p class="text-theme-secondary mb-4">Destructuring extracts values from objects/arrays with type annotations for safety.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Object destructuring
const { name, age }: { name: string; age: number } = user;
// Defaults
const { title = 'Untitled' }: { title?: string } = doc;
// Renaming
const { firstName: fn }: { firstName: string } = person;
// Array destructuring
const [first, second]: [string, string] = names;
// Rest destructuring
const [head, ...tail]: number[] = [1, 2, 3, 4];
// Nested
const { address: { city } }: { address: { city: string } } = user;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Annotate types explicitly for clarity. Use defaults for optionals. When to use: Function params or variable assignments from complex objects.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Ensures extracted values match expected types.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Nested destructuring with types, rest in objects for remaining props.</p>
    `,
  },
  {
    id: 19,
    title: "Modules",
    content: `
      <p class="text-theme-secondary mb-4">Modules organize code into reusable units with exports and imports, supporting type safety across files.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Exporting
export const PI = 3.14;
export interface Shape { area(): number; }
export default class Circle implements Shape { /* ... */ }
// Importing
import Circle from './circle';
import { PI, Shape } from './constants';
import * as utils from './utils';
// Type-only imports
import type { User } from './user';
// Dynamic imports
const mod = await import('./module');</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use default for main export. Type-only for types. When to use: Large apps to split code.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Types are imported/exported, ensuring consistency.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Re-exports, barrel files, dynamic type imports.</p>
    `,
  },
  {
    id: 20,
    title: "Namespaces",
    content: `
      <p class="text-theme-secondary mb-4">Namespaces group related code, preventing global pollution, useful for internal organization.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic namespace
namespace Validation {
  export interface Validator { validate(s: string): boolean; }
  export class EmailValidator implements Validator { /* ... */ }
}
// Nested
namespace Shapes {
  export namespace Polygons {
    export class Triangle { /* ... */ }
  }
}
// Usage
let v = new Validation.EmailValidator();
// Merging
namespace Animals {
  export class Zebra { }
}
namespace Animals {
  export class Lion { }
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use modules over namespaces for new code. Namespaces for augmenting globals. When to use: Legacy code or global augmentations.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Exports are typed, merging combines declarations.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Ambient namespaces for declarations, triple-slash references.</p>
    `,
  },
  {
    id: 21,
    title: "Declaration Merging",
    content: `
      <p class="text-theme-secondary mb-4">Declaration merging combines multiple declarations of the same name into one definition.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Interface merging
interface Box { height: number; }
interface Box { width: number; } // { height: number; width: number; }
// Function merging
function reverse(s: string): string;
function reverse(arr: any[]): any[];
function reverse(value: string | any[]): string | any[] { /* ... */ }
// Namespace merging
namespace Animals {
  export class Zebra { }
}
namespace Animals {
  export interface Legged { legCount: number; }
}
// Module augmentation
declare module 'lib' {
  interface Existing { newProp: string; }
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for extending third-party types. Avoid overuse in own code. When to use: Augmenting libraries or merging overloads.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Ensures consistent types across merges, errors on conflicts.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Module augmentation for globals, merging with classes.</p>
    `,
  },
  {
    id: 22,
    title: "Any Type Risks",
    content: `
      <p class="text-theme-secondary mb-4">The 'any' type disables type checking, useful for migration but risky for safety.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Using any
let obj: any = { x: 0 };
obj.foo(); // No error, but runtime fail
obj = 'string'; // No error
// Propagation
let num: number = obj + 1; // any infects
// Alternatives
let unk: unknown = getValue();
if (typeof unk === 'number') { /* safe */ }
// JSON
const data: any = JSON.parse(json); // Then narrow</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Avoid any; use unknown instead. Gradually type legacy code. When to use: Temporarily during refactoring.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Loses all benefits; can lead to subtle bugs.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use @ts-ignore for specific lines, but sparingly.</p>
    `,
  },
  {
    id: 23,
    title: "Void Type",
    content: `
      <p class="text-theme-secondary mb-4">Void represents absence of value, for functions that don't return anything.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Function return
function log(msg: string): void {
  console.log(msg);
}
// Variable (rare)
let useless: void = undefined;
// Callback
type Callback = () => void;
function onEvent(cb: Callback) { cb(); }
// Void vs undefined
function returnsUndefined(): undefined {
  return undefined;
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for side-effect functions. Avoid void variables. When to use: Event handlers, logging.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Prevents using return value, enforces no-return.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In generics for ignoring returns.</p>
    `,
  },
  {
    id: 24,
    title: "Unknown Type",
    content: `
      <p class="text-theme-secondary mb-4">Unknown is a safe 'any', requiring type checks before operations.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic
let value: unknown = getData();
// Checks required
if (typeof value === 'string') {
  value.toUpperCase(); // Safe
}
// Guard
function isNumber(v: unknown): v is number {
  return typeof v === 'number';
}
// Assignment
let num: number = value; // Error!
// Any to unknown
function process(a: any): unknown { return a; }</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for untyped inputs like APIs. Narrow with guards. When to use: Instead of any for safety.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Forces explicit checks, preventing assumptions.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In catch clauses (unknown errors), or generics for flexible inputs.</p>
    `,
  },
  {
    id: 25,
    title: "Never Type",
    content: `
      <p class="text-theme-secondary mb-4">Never represents values that never occur, useful for exhaustive checks and impossible cases.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Error function
function fail(msg: string): never {
  throw new Error(msg);
}
// Exhaustive check
type Shape = 'circle' | 'square';
function area(s: Shape): number {
  switch (s) {
    case 'circle': return 1;
    case 'square': return 2;
    default: const exhaustive: never = s; // Error if missing case
  }
}
// Never assignment
let n: never = fail('boom');
// Utility
type NonNullable<T> = T extends null | undefined ? never : T;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use in switches for exhaustiveness. When to use: Error functions or impossible branches.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Ensures all cases handled, catches refactors.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In conditionals for type exclusion.</p>
    `,
  },
  {
    id: 26,
    title: "Discriminated Unions",
    content: `
      <p class="text-theme-secondary mb-4">Discriminated unions use a common literal property to narrow types in switches.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'square': return shape.side ** 2;
  }
}
// With payloads
type Action =
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; index: number };
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD': return { ...state, value: action.payload };
    case 'REMOVE': return { ...state, index: action.index };
  }
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use string literals for discriminants. Add exhaustive checks. When to use: Redux actions, API responses.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Automatic narrowing in branches.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Nested discriminants, with generics.</p>
    `,
  },
  {
    id: 27,
    title: "Type Predicates",
    content: `
      <p class="text-theme-secondary mb-4">Type predicates are functions that return 'value is Type', enabling custom type narrowing.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
// Complex
interface User { id: number; name: string; }
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null &&
    'id' in obj && typeof (obj as any).id === 'number' &&
    'name' in obj && typeof (obj as any).name === 'string';
}
// Assertion predicate
function assertPositive(n: number): asserts n is PositiveNumber {
  if (n <= 0) throw new Error('Not positive');
}
// Usage
let data: unknown;
if (isUser(data)) {
  data.name; // string
}</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Make predicates pure. Use for complex objects. When to use: Custom narrowing beyond typeof/instanceof.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enables safe access after check.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Assertion predicates for validation, generics in predicates.</p>
    `,
  },
  {
    id: 28,
    title: "Infer Keyword",
    content: `
      <p class="text-theme-secondary mb-4">Infer extracts types within conditional types, enabling powerful type utilities.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Return type
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
// Array element
type ElementOf<T> = T extends (infer E)[] ? E : never;
// Promise unwrap
type Awaited<T> = T extends Promise<infer U> ? U : T;
// Multiple infers
type ParamTypes<T> = T extends (a: infer A, b: infer B) => any ? [A, B] : never;
// Recursive
type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use in utilities like ReturnType. When to use: Extracting nested types.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Precisely captures types without manual specification.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Multiple infers, with constraints.</p>
    `,
  },
  {
    id: 29,
    title: "Mapped Types",
    content: `
      <p class="text-theme-secondary mb-4">Mapped types transform existing types by iterating over their properties, enabling reusable type utilities.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
// With modifiers
type Optional<T> = {
  [P in keyof T]?: T[P];
};
// Key remapping (TS 4.1+)
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};
// Utility types example
type Person = { name: string; age: number; location: string };
type PersonGetters = Getters<Person>; // { getName: () => string; ... }
// Conditional mapping
type ExtractStrings<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
};</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use for DRY type definitions. Combine with keyof for type-safe keys. When to use: Creating readonly/partial versions of types or transforming object shapes.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Mapped types preserve relationships between properties, ensuring transformations are type-safe.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Use with conditional types for filtered mappings, or homomorphic mapped types for preserving modifiers.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use for type-safe string constants like event names or CSS classes. Combine with Capitalize/Uncapitalize utilities. When to use: Domain-specific string patterns or API keys.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enforces exact string formats at compile time, preventing typos.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Recursive string manipulation, integration with infer for parsing.</p>
    `,
  },
  {
    id: 31,
    title: "Conditional Types in TypeScript",
    content: `
      <p class="text-theme-secondary mb-4">Conditional types introduce logic at the type level, selecting types based on type relationships using 'extends'.</p>
    
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Basic conditional
type IsString<T> = T extends string ? 'yes' : 'no';
// Distributed conditionals
type ArrayItem<T> = T extends Array<infer U> ? U : T;
// Exclude
type Exclude<T, U> = T extends U ? never : T;
type StringOnly = Exclude<string | number | boolean, number | boolean>; // string
// Extract return type
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
// Nested conditionals
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;</code></pre>
    
      <p class="text-theme-secondary mb-4">Best practices: Use infer to extract types. Keep simple to avoid complexity. When to use: For type utilities like Extract, Exclude, or inferring types from generics.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Enables precise type narrowing and utilities that enforce type relationships.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Distributed conditionals over unions, recursive conditionals for deep types, combined with mapped types for powerful transformations.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use key remapping for renamed properties. Combine with conditional types. When to use: Utility types like Record or Pick.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Preserves type relationships during transformation.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Homomorphic mappings, filtered keys with as clause.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use to avoid duplication. When to use: Unwrapping generics like Promise or Array.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Accurately captures nested types.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Recursive infer, multiple infers in one type.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Combine with assertions for validation. When to use: Complex object validation.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Narrows types after successful check.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Generic predicates, assertion predicates.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use exhaustive switches. When to use: State machines or variant types.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Automatic narrowing in cases.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Nested unions, with generics.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use assertNever for switches. When to use: Ensuring complete coverage.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Catches missing cases at compile time.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In unions for exclusion, recursive never.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Always narrow unknown before use. When to use: API inputs or catch blocks.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Forces checks, unlike any.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In generics for safe handling.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use void for no return, undefined for explicit undefined. When to use: Side-effect functions.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Prevents using non-existent returns.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In promise chains for ignoring values.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Refactor any to proper types ASAP. When to use: Quick prototypes only.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Completely disables safety.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Gradual typing from any.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Pair with runtime checks. When to use: After null checks TypeScript misses.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Risky if wrong.</p>
      
      <p class="text-theme-secondary">Advanced patterns: In async code after awaits.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use in constructors or init methods. When to use: Deferred assignments.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Ensure runtime assignment.</p>
      
      <p class="text-theme-secondary">Advanced patterns: With DI frameworks.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: String enums for serialization. Const for perf. When to use: Fixed sets like roles.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Restricts to enum members.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Bitwise enums, enum as types.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use with as const. When to use: Exact value constraints.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Prevents invalid literals.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Template literals, with unions.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Label for readability. When to use: Fixed structures like coords.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Position and length checked.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Variadic tuples, mapping over tuples.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Type rest arrays. When to use: Variable args functions.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Typed array operations.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Tuple rests, generic variadics.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: For immutable merges. When to use: Object/array construction.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Intersection types for objects.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Conditional spreads.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Type params directly. When to use: Clean function args.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Typed extracts.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Nested with defaults.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Export types separately. When to use: Modular codebases.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Typed imports/exports.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Type-only exports, dynamic modules.</p>
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
    
      <p class="text-theme-secondary mb-4">Best practices: Prefer modules. When to use: Global code organization.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Typed groups.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Merging namespaces.</p>
    `,
  },
  {
    id: 50,
    title: "Declaration Merging",
    content: `
      <p class="text-theme-secondary mb-4">Declaration merging allows multiple declarations to contribute to a single definition.</p>
      <pre class="bg-slate-800 text-white p-4 rounded-lg mb-4"><code class="language-typescript">// Interface merging
interface User { name: string; }
interface User { age: number; }
// The resulting User interface has both properties
const user: User = { name: 'Alice', age: 30 };
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
    
      <p class="text-theme-secondary mb-4">Best practices: Use for extensions. When to use: Library augmentations.</p>
      
      <p class="text-theme-secondary mb-4">Type safety considerations: Consistent merges.</p>
      
      <p class="text-theme-secondary">Advanced patterns: Function/namespace merges.</p>
    `,
  },
];

// Articles
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
function toggleArticle(index) {
  const articles = document.querySelectorAll(".article-content");
  const article = articles[index];
  if (!article) return;
  article.classList.toggle("show");
  const headers = document.querySelectorAll(".article header");
  const header = headers[index];
  const chevron = header ? header.querySelector(".fa-chevron-down") : null;
  if (chevron) chevron.classList.toggle("fa-rotate-180");
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
function scrollToArticle(articleId) {
  const articleElement = document.getElementById(`article-${articleId}`);
  if (articleElement) {
    articleElement.scrollIntoView({ behavior: "smooth" });
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
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) return;
  mobileMenu.classList.toggle("-translate-y-full");
  const isHidden = mobileMenu.classList.contains("-translate-y-full");
  mobileMenu.setAttribute("aria-hidden", isHidden ? "true" : "false");
  document.body.style.overflow = isHidden ? "" : "hidden";
}
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
  showNotification(`Added "${examples[exampleIndex].title}" example to editor`);
}
function formatEditor() {
  if (!aceEditor) return;
  const content = aceEditor.getValue();
  const formatted = content
    .replace(/\t/g, " ")
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
  const outputEl = document.getElementById("output-code");
  outputEl.innerHTML =
    '<div class="flex items-center gap-2 text-sky-600"><div class="spinner"></div> Compiling and running TypeScript...</div>';
  setTimeout(() => {
    let compiled = raw
      .replace(/:\s*string\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*number\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*boolean\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*any\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*void\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*never\s*(?=[,=){};]|$)/g, "")
      .replace(/:\s*unknown\s*(?=[,=){};]|$)/g, "")
      .replace(/<\w+>/g, "")
      .replace(/interface\s+\w+\s*{[^}]*}/g, "")
      .replace(/type\s+\w+\s*=([^;]+);/g, "")
      .replace(/readonly\s+/g, "")
      .replace(/private\s+/g, "")
      .replace(/protected\s+/g, "")
      .replace(/public\s+/g, "");
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
      new Function(compiled)();
      if (!out.trim()) {
        out = "Code executed successfully (no console output).";
      }
    } catch (err) {
      out =
        "Runtime Error: " + (err && err.message ? err.message : String(err));
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }
    outputEl.textContent = out;
    showNotification("Code executed successfully");
  }, 500);
}
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
  appendChat(text, "user");
  input.value = "";
  const typingId = appendChat("", "bot", true);
  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.remove();
    }
    const reply = generateAIResponse(text);
    appendChat(reply, "bot");
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
  return "I can help you with TypeScript concepts like union types, generics, type guards, interfaces, and more. Try asking about specific features or use the quick buttons below for common questions. You can also say 'insert example' followed by a topic to add code to the editor.";
}
function showNotification(message, type = "info") {
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
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 10);
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initFeatures();
  initArticles();
  initExamples();
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }
  document
    .getElementById("chat-input")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendChat();
      }
    });
  document.getElementById("chat-open-btn")?.addEventListener("click", openChat);
  document
    .getElementById("chat-open-mobile")
    ?.addEventListener("click", openChat);
  showExample(0);
});
window.addEventListener("load", () => {
  setupAce();
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (e) {}
    });
  }
});
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

// Javascript code end
// -------------------------------------------------------------------->

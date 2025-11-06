// 100-ts-solved.ts
// Solved implementations for 100 TypeScript examples (ex01 .. ex100)
// Paste this file into VS Code as `100-ts-solved.ts`.

// -----------------------------
// Example 01: Basic types
// -----------------------------
export function ex01(): void {
  const name: string = "TypeScript";
  const year: number = 2025;
  const alive: boolean = true;
  console.log("ex01 ->", { name, year, alive });
}

// -----------------------------
// Example 02: Arrays & readonly arrays
// -----------------------------
export function ex02(): void {
  const tags: string[] = ["js", "ts", "web"];
  const readonlyTags = ["a", "b"] as const;
  console.log("ex02 ->", tags.join(","), readonlyTags[1]);
}

// -----------------------------
// Example 03: Tuples
// -----------------------------
export function ex03(): void {
  const tuple: [string, number, boolean] = ["alice", 30, true];
  const [n, a, b] = tuple;
  console.log("ex03 ->", n, a, b);
}

// -----------------------------
// Example 04: Enums
// -----------------------------
export function ex04(): void {
  enum Role {
    Guest,
    User,
    Admin,
  }
  const r: Role = Role.Admin;
  console.log("ex04 ->", Role[r], r);
}

// -----------------------------
// Example 05: Literal & union types
// -----------------------------
export function ex05(): void {
  type Size = "small" | "medium" | "large";
  const s: Size = "medium";
  type ID = number | string;
  const id: ID = "abc-123";
  console.log("ex05 ->", s, id);
}

// -----------------------------
// Example 06: Interfaces
// -----------------------------
export function ex06(): void {
  interface Person {
    id: number;
    name: string;
    age?: number;
  }
  const p: Person = { id: 1, name: "Bob" };
  console.log("ex06 ->", p.name);
}

// -----------------------------
// Example 07: Type aliases & intersection
// -----------------------------
export function ex07(): void {
  type A = { a: number };
  type B = { b: string };
  type C = A & B;
  const c: C = { a: 1, b: "x" };
  console.log("ex07 ->", c);
}

// -----------------------------
// Example 08: Functions with types
// -----------------------------
export function ex08(name: string, times = 1): string {
  return Array(times).fill(`Hi ${name}`).join(", ");
}

// -----------------------------
// Example 09: Optional & default parameters
// -----------------------------
export function ex09(a: number, b?: number): number {
  return a + (b ?? 0);
}

// -----------------------------
// Example 10: Generics (function)
// -----------------------------
export function ex10<T>(v: T): T {
  return v;
}

// -----------------------------
// Example 11: Generic constraints
// -----------------------------
export function ex11<T extends { length: number }>(x: T): number {
  return x.length;
}

// -----------------------------
// Example 12: Generic class
// -----------------------------
export class ex12<T> {
  private items: T[] = [];
  add(i: T) {
    this.items.push(i);
  }
  get(): T[] {
    return [...this.items];
  }
}
export const ex12Instance = new ex12<number>();

// -----------------------------
// Example 13: Function overloads
// -----------------------------
export function ex13(x: string): string[];
export function ex13(x: number): number[];
export function ex13(x: string | number): any[] {
  if (typeof x === "string") return x.split("");
  return [x, x * 2];
}

// -----------------------------
// Example 14: Type guards
// -----------------------------
export function ex14(a: unknown): string {
  if (typeof a === "string") return a.toUpperCase();
  if (Array.isArray(a)) return `arr(${a.length})`;
  return "unknown";
}

// -----------------------------
// Example 15: Discriminated unions
// -----------------------------
export type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };
export function ex15(s: Shape) {
  if (s.kind === "circle") return Math.PI * s.r * s.r;
  return s.w * s.h;
}

// -----------------------------
// Example 16: Mapped types (Partial/Readonly)
// -----------------------------
export function ex16(): void {
  type Person = { name: string; age: number };
  const p: Partial<Person> = { name: "x" };
  const r: Readonly<Person> = { name: "x", age: 1 };
  console.log("ex16 ->", p, r);
}

// -----------------------------
// Example 17: Utility types in practice (Pick/Omit)
// -----------------------------
export function ex17(): void {
  type Full = { id: number; name: string; secret: string };
  type Public = Omit<Full, "secret">;
  const pub: Public = { id: 1, name: "ok" };
  console.log("ex17 ->", pub);
}

// -----------------------------
// Example 18: Conditional types
// -----------------------------
export type IsString<T> = T extends string ? "yes" : "no";
export function ex18(): void {
  type A = IsString<string>;
  type B = IsString<number>;
  console.log("ex18 ->", null as any, A, B);
}

// -----------------------------
// Example 19: Infer with conditional types
// -----------------------------
export type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;
export function ex19(): ReturnOf<typeof ex08> {
  return ex08("hi", 1);
}

// -----------------------------
// Example 20: keyof and lookup types
// -----------------------------
export function ex20<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

// -----------------------------
// Example 21: Index signature
// -----------------------------
export function ex21(): void {
  type Dict = { [k: string]: number };
  const d: Dict = { a: 1, b: 2 };
  console.log("ex21 ->", d);
}

// -----------------------------
// Example 22: Readonly arrays & tuples
// -----------------------------
export function ex22(): void {
  const t: readonly [number, string] = [1, "a"];
  console.log("ex22 ->", t);
}

// -----------------------------
// Example 23: Tuple operations with variadic types (simple)
// -----------------------------
export function ex23<T extends any[]>(...args: T): T {
  return args;
}

// -----------------------------
// Example 24: Recursive types (LinkedList)
// -----------------------------
export type LList<T> = { value: T; next?: LList<T> };
export function ex24(): LList<number> {
  return { value: 1, next: { value: 2, next: { value: 3 } } };
}

// -----------------------------
// Example 25: Nullable/Optional chaining & nullish coalescing
// -----------------------------
export function ex25(o?: { x?: { y?: number } }) {
  return o?.x?.y ?? 0;
}

// -----------------------------
// Example 26: Unknown vs any
// -----------------------------
export function ex26(x: unknown) {
  if (typeof x === "string") return x.length;
  return null;
}

// -----------------------------
// Example 27: Never type & exhaustive checks
// -----------------------------
export function ex27(x: Shape) {
  switch (x.kind) {
    case "circle":
      return x.r;
    case "rect":
      return x.w;
    default:
      return (() => {
        const _n: never = x;
        return _n;
      })();
  }
}

// -----------------------------
// Example 28: Asserts (user-defined type guards)
// -----------------------------
export function assertIsNumber(x: unknown): asserts x is number {
  if (typeof x !== "number") throw new Error("Not a number");
}
export function ex28(v: unknown) {
  try {
    assertIsNumber(v);
    return v + 1;
  } catch {
    return null;
  }
}

// -----------------------------
// Example 29: Readonly utility and const assertions
// -----------------------------
export function ex29(): void {
  const arr = [1, 2, 3] as const;
  console.log("ex29 ->", arr[0]);
}

// -----------------------------
// Example 30: Template literal types
// -----------------------------
export function ex30(): void {
  type Methods = "get" | "post";
  type Route = `/${Methods}/:id`;
  const r: Route = "/get/:id";
  console.log("ex30 ->", r);
}

// -----------------------------
// Example 31: typeof in types
// -----------------------------
export function ex31(): void {
  const person = { name: "X", age: 20 } as const;
  type P = typeof person;
  const copy: P = person;
  console.log("ex31 ->", copy);
}

// -----------------------------
// Example 32: Index types & mapped
// -----------------------------
export function ex32<T extends object>(obj: T): { [K in keyof T]: T[K] } {
  return { ...obj };
}

// -----------------------------
// Example 33: Promise typing & async/await
// -----------------------------
export async function ex33(): Promise<number> {
  const value = await Promise.resolve(33);
  return value;
}

// -----------------------------
// Example 34: PromiseAll helper typing (simple)
// -----------------------------
export async function ex34<T extends any[]>(
  ...p: { [K in keyof T]: Promise<T[K]> }
): Promise<T> {
  return Promise.all(p) as Promise<T>;
}

// -----------------------------
// Example 35: Utility: Zip two arrays into a record
// -----------------------------
export function ex35<K extends string | number, V>(
  keys: K[],
  values: V[]
): Record<K, V | undefined> {
  const out: any = {};
  keys.forEach((k, i) => (out[k] = values[i]));
  return out;
}

// -----------------------------
// Example 36: Readonly and DeepReadonly (simple)
// -----------------------------
export function ex36(): void {
  type Nested = { a: { b: number } };
  type DR<T> = {
    readonly [K in keyof T]: T[K] extends object ? DR<T[K]> : T[K];
  };
  const obj: DR<Nested> = { a: { b: 1 } };
  console.log("ex36 ->", obj.a.b);
}

// -----------------------------
// Example 37: DeepPartial (simple)
// -----------------------------
export function ex37(): void {
  type DP<T> = { [K in keyof T]?: T[K] extends object ? DP<T[K]> : T[K] };
  type Tst = DP<{ a: { b: number }; c: string }>;
  const x: Tst = { a: {} };
  console.log("ex37 ->", x);
}

// -----------------------------
// Example 38: Currying example
// -----------------------------
export function ex38(a: number) {
  return (b: number) => a + b;
}

// -----------------------------
// Example 39: Promise + error handling pattern
// -----------------------------
export async function ex39<T>(p: Promise<T>) {
  try {
    const data = await p;
    return [null, data] as const;
  } catch (err) {
    return [err, null] as const;
  }
}

// -----------------------------
// Example 40: Utility type: First element of tuple
// -----------------------------
export type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
export function ex40<T extends any[]>(...args: T): First<T> | undefined {
  return args[0] as First<T> | undefined;
}

// -----------------------------
// Example 41: Creating readonly properties
// -----------------------------
export function ex41(): void {
  type R = { readonly id: number; name: string };
  const r: R = { id: 1, name: "n" };
  console.log("ex41 ->", r);
}

// -----------------------------
// Example 42: Module augmentation (note only commented)
// -----------------------------
// Example is a comment demonstrating `declare global { interface Window { } }` usage.

// -----------------------------
// Example 43: Simple decorator (class decorator)
// -----------------------------
export function ex43(): void {
  function LogClass<T extends { new (...args: any[]): {} }>(ctor: T) {
    return class extends ctor {
      constructor(...args: any[]) {
        super(...args);
        console.log("ex43 -> constructed", ctor.name);
      }
    };
  }
  @LogClass
  class Demo {
    constructor(public v: number) {}
  }
  new Demo(5);
}

// -----------------------------
// Example 44: Method decorator (logger)
// -----------------------------
export function ex44(): void {
  function logMethod(
    _target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const orig = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`ex44 -> call ${key}`, args);
      return orig.apply(this, args);
    };
    return descriptor;
  }
  class C {
    @logMethod
    m(x: number) {
      return x * 2;
    }
  }
  new C().m(2);
}

// -----------------------------
// Example 45: Namespaces (legacy) usage
// -----------------------------
export namespace ex45 {
  export const value = 45;
  export function run() {
    return value;
  }
}

// -----------------------------
// Example 46: Mixins (simple)
// -----------------------------
export function ex46(): void {
  type Constructor<T = {}> = new (...args: any[]) => T;
  function Timestamp<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      time = Date.now();
    };
  }
  class Base {
    name = "b";
  }
  const Mixed = Timestamp(Base);
  console.log("ex46 ->", new Mixed().time);
}

// -----------------------------
// Example 47: Iterator example
// -----------------------------
export function ex47() {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  return Array.from(gen());
}

// -----------------------------
// Example 48: Symbol usage
// -----------------------------
export function ex48(): void {
  const s = Symbol("id");
  const obj: any = { [s]: 10 };
  console.log("ex48 ->", obj[s]);
}

// -----------------------------
// Example 49: Advanced mapped keys renaming (key remapping)
// -----------------------------
export type Prefixed<T, P extends string> = {
  [K in keyof T as `${P & string}${Capitalize<string & K>}`]: T[K];
};
export function ex49(): void {
  type Base = { name: string; age: number };
  type P = Prefixed<Base, "get">;
  const x: P = { getName: "a", getAge: 1 } as any;
  console.log("ex49 ->", x);
}

// -----------------------------
// Example 50: Conditional infer to extract element type
// -----------------------------
export type ElementType<T> = T extends (infer E)[] ? E : T;
export function ex50(): void {
  console.log("ex50 ->", null as any);
}

// -----------------------------
// Example 51: Higher-order function
// -----------------------------
export function ex51(fn: (x: number) => number) {
  return (x: number) => fn(fn(x));
}

// -----------------------------
// Example 52: Using Record<K,V>
// -----------------------------
export function ex52(): void {
  const m: Record<string, number> = { a: 1, b: 2 };
  console.log("ex52 ->", m);
}

// -----------------------------
// Example 53: Using Pick to create subsets
// -----------------------------
export function ex53(): void {
  interface Full {
    id: number;
    name: string;
    age: number;
  }
  type Short = Pick<Full, "id" | "name">;
  const s: Short = { id: 1, name: "x" };
  console.log("ex53 ->", s);
}

// -----------------------------
// Example 54: Using Omit
// -----------------------------
export function ex54(): void {
  interface Full {
    id: number;
    name: string;
    secret: string;
  }
  type Public = Omit<Full, "secret">;
  console.log("ex54 ->", { id: 1, name: "x" } as Public);
}

// -----------------------------
// Example 55: Using NonNullable
// -----------------------------
export function ex55(x: string | null | undefined) {
  return x ?? "fallback";
}

// -----------------------------
// Example 56: Using ReturnType
// -----------------------------
export function ex56(): void {
  type R = ReturnType<typeof ex08>;
  const sample: R = "Hi";
  console.log("ex56 ->", sample);
}

// -----------------------------
// Example 57: Function composition
// -----------------------------
export function ex57<A, B, C>(f: (b: B) => C, g: (a: A) => B) {
  return (a: A) => f(g(a));
}

// -----------------------------
// Example 58: Simple event emitter types
// -----------------------------
export function ex58(): void {
  type Handler = (...args: any[]) => void;
  class Emitter {
    private h: Record<string, Handler[]> = {};
    on(k: string, fn: Handler) {
      (this.h[k] ||= []).push(fn);
    }
    emit(k: string, ...args: any[]) {
      (this.h[k] || []).forEach((fn) => fn(...args));
    }
  }
  const e = new Emitter();
  e.on("x", (v: any) => console.log("ex58 ->", v));
  e.emit("x", 58);
}

// -----------------------------
// Example 59: Using Partial<T>
// -----------------------------
export function ex59(): void {
  interface Config {
    url: string;
    timeout: number;
  }
  const cfg: Partial<Config> = { timeout: 1000 };
  console.log("ex59 ->", cfg);
}

// -----------------------------
// Example 60: Using Pick + Partial for updates
// -----------------------------
export function ex60() {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  function update(u: User, patch: Partial<Pick<User, "name" | "email">>) {
    return { ...u, ...patch };
  }
  console.log(
    "ex60 ->",
    update({ id: 1, name: "A", email: "e" }, { name: "B" })
  );
}

// -----------------------------
// Example 61: Tuple to union & vice versa
// -----------------------------
export function ex61(): void {
  const tuple = ["x", "y"] as const;
  type Tup = (typeof tuple)[number];
  console.log("ex61 ->", tuple, null as Tup);
}

// -----------------------------
// Example 62: Using bigint & bigint literals
// -----------------------------
export function ex62(): bigint {
  const n: bigint = 123n;
  return n;
}

// -----------------------------
// Example 63: BigInt + Number interop caution
// -----------------------------
export function ex63(): void {
  const n = 1n;
  console.log("ex63 ->", n + BigInt(1));
}

// -----------------------------
// Example 64: Using maps & sets with typing
// -----------------------------
export function ex64(): void {
  const m = new Map<string, number>();
  m.set("a", 1);
  const s = new Set<number>([1, 2]);
  console.log("ex64 ->", m.get("a"), s.has(2));
}

// -----------------------------
// Example 65: JSONValue type example
// -----------------------------
export type JSONValue65 =
  | string
  | number
  | boolean
  | null
  | { [k: string]: JSONValue65 }
  | JSONValue65[];
export function ex65(v: JSONValue65) {
  return v;
}

// -----------------------------
// Example 66: Using generator types
// -----------------------------
export function* ex66() {
  yield 1;
  yield 2;
  return 3;
}

// -----------------------------
// Example 67: Using class with private & protected
// -----------------------------
export class Ex67 {
  private secret = "s";
  protected proto = "p";
  public getSecret() {
    return this.secret;
  }
}

// -----------------------------
// Example 68: Using static members
// -----------------------------
export class Ex68 {
  static version = "1.0";
  static info() {
    return Ex68.version;
  }
}

// -----------------------------
// Example 69: Declaration merging note
// -----------------------------
export function ex69(): void {
  console.log("ex69 -> see TypeScript docs for declaration merging");
}

// -----------------------------
// Example 70: Utility - clamp function with generics
// -----------------------------
export function ex70(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

// -----------------------------
// Example 71: Simple parser types (nominal-like)
// -----------------------------
export type UserId71 = string & { readonly __brand?: unique symbol };
export function ex71(id: string): UserId71 {
  return id as UserId71;
}

// -----------------------------
// Example 72: Using optional chaining deep
// -----------------------------
export function ex72(o?: { a?: { b?: { c?: number } } }) {
  return o?.a?.b?.c ?? -1;
}

// -----------------------------
// Example 73: Simple memoize typed
// -----------------------------
export function ex73<F extends (...args: any[]) => any>(fn: F) {
  const cache = new Map<string, ReturnType<F>>();
  return (...args: Parameters<F>) => {
    const k = JSON.stringify(args);
    if (cache.has(k)) return cache.get(k) as ReturnType<F>;
    const r = fn(...args);
    cache.set(k, r);
    return r;
  };
}

// -----------------------------
// Example 74: Template tuple element transformation (simple)
// -----------------------------
export type UppercaseKeys<T extends string[]> = {
  [K in keyof T]: Uppercase<T[K] & string>;
};
export function ex74(): void {
  console.log("ex74 -> template tuple demo");
}

// -----------------------------
// Example 75: Using conditional mapped types
// -----------------------------
export type Optionalize<T> = { [K in keyof T]?: T[K] };
export function ex75(): void {
  console.log("ex75 -> Optionalize sample");
}

// -----------------------------
// Example 76: Module augmentation (note only comment)
// -----------------------------
export function ex76(): void {
  console.log("ex76 -> module augmentation is done with declare module");
}

// -----------------------------
// Example 77: Tagging / branding primitive types
// -----------------------------
export type Brand<T, B> = T & { __brand?: B };
export function ex77(): Brand<number, "MyNum"> {
  return 123 as Brand<number, "MyNum">;
}

// -----------------------------
// Example 78: Using web-like DOM types (if in browser)
// -----------------------------
export function ex78(el?: HTMLElement | null) {
  el?.querySelectorAll("div");
}

// -----------------------------
// Example 79: Basic regex typing & usage
// -----------------------------
export function ex79(s: string) {
  const m = /(\d+)/.exec(s);
  return m ? parseInt(m[1], 10) : null;
}

// -----------------------------
// Example 80: Using fetch typed response (placeholder)
// -----------------------------
export async function ex80(): Promise<{ ok: boolean }> {
  return Promise.resolve({ ok: true });
}

// -----------------------------
// Example 81: Using aggregator pattern
// -----------------------------
export function ex81(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

// -----------------------------
// Example 82: Simple serializer interface
// -----------------------------
export interface Serializer<T> {
  serialize(t: T): string;
  deserialize(s: string): T;
}
export function ex82(): Serializer<number> {
  return { serialize: (n) => String(n), deserialize: (s) => Number(s) };
}

// -----------------------------
// Example 83: Using Proxy typing
// -----------------------------
export function ex83(): void {
  const target = { a: 1 };
  const p = new Proxy(target, {
    get(t, k) {
      return (t as any)[k];
    },
  });
  console.log("ex83 ->", (p as any).a);
}

// -----------------------------
// Example 84: Using WeakMap typing
// -----------------------------
export function ex84(): void {
  const wm = new WeakMap<object, string>();
  const o = {};
  wm.set(o, "v");
  console.log("ex84 ->", wm.get(o));
}

// -----------------------------
// Example 85: Using generator return typing
// -----------------------------
export function ex85(): Generator<number, string, number> {
  return (function* () {
    yield 1;
    return "done";
  })();
}

// -----------------------------
// Example 86: Using conditional pick (select fields by type)
// -----------------------------
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
export function ex86(): void {
  console.log("ex86 -> PickByType sample");
}

// -----------------------------
// Example 87: Using bigint operations
// -----------------------------
export function ex87(a: bigint, b: bigint) {
  return a + b;
}

// -----------------------------
// Example 88: Using newable type
// -----------------------------
export function ex88<C extends new (...args: any[]) => any>(Ctor: C) {
  return new Ctor();
}

// -----------------------------
// Example 89: Phantom generic usage (no runtime effect)
// -----------------------------
export function ex89<T>(_v?: T): void {
  console.log("ex89 -> phantom generic");
}

// -----------------------------
// Example 90: Example of assertNever for exhaustive checks
// -----------------------------
export function assertNever(x: never): never {
  throw new Error("Unexpected: " + String(x));
}
export function ex90(x: Shape) {
  if (x.kind === "circle") return x.r;
  if (x.kind === "rect") return x.w;
  return assertNever(x as never);
}

// -----------------------------
// Example 91: Simple binary search typed
// -----------------------------
export function ex91(arr: number[], target: number) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// -----------------------------
// Example 92: Using tuple labels via comments (for readability)
// -----------------------------
export function ex92(): void {
  const point: [x: number, y: number] = [1, 2];
  console.log("ex92 ->", point[0], point[1]);
}

// -----------------------------
// Example 93: Using discriminated unions for API responses
// -----------------------------
export type Ok<T> = { status: "ok"; data: T };
export type Err = { status: "err"; error: string };
export function ex93<T>(r: Ok<T> | Err) {
  if (r.status === "ok") return r.data;
  throw new Error(r.error);
}

// -----------------------------
// Example 94: Simple RB-tree placeholder (comment)
// -----------------------------
export function ex94(): void {
  console.log("ex94 -> study algorithms for RB-trees");
}

// -----------------------------
// Example 95: Type level arithmetic note
// -----------------------------
export function ex95(): void {
  console.log(
    "ex95 -> type-level arithmetic is advanced (see TS type programming)"
  );
}

// -----------------------------
// Example 96: Using mapped tuples
// -----------------------------
export function ex96<T extends any[]>(...args: T): { [K in keyof T]: T[K] } {
  return args;
}

// -----------------------------
// Example 97: Using JSON.parse with typed result (careful)
// -----------------------------
export function ex97<T = unknown>(s: string): T {
  return JSON.parse(s) as T;
}

// -----------------------------
// Example 98: Simple CLI arg parse demo (node)
// -----------------------------
export function ex98(argv: string[]) {
  const args = argv.slice(2);
  console.log("ex98 ->", args);
  return args;
}

// -----------------------------
// Example 99: Using Flow control types (Promise + cancel token pattern)
// -----------------------------
export function ex99<T>(
  promise: Promise<T>,
  cancelToken: { cancelled?: boolean }
) {
  return promise.then((v) =>
    cancelToken.cancelled ? Promise.reject(new Error("cancelled")) : v
  );
}

// -----------------------------
// Example 100: Collection of example usage runner
// -----------------------------
export async function ex100(): Promise<void> {
  console.log("ex100 -> run start");
  ex01();
  ex02();
  ex03();
  ex04();
  ex05();
  ex06();
  ex07();
  console.log("ex08 ->", ex08("Alice", 2));
  console.log("ex10 ->", ex10<number>(5));
  ex12Instance.add(10);
  console.log("ex12 -> items:", ex12Instance.get());
  console.log("ex33 ->", await ex33());
  console.log("ex34 ->", await ex34(Promise.resolve(1), Promise.resolve(2)));
  console.log("ex35 ->", ex35(["a", "b"], [1, 2]));
  console.log("ex40 ->", ex40(1, 2, 3));
  console.log("ex47 ->", ex47());
  console.log("ex66 ->", Array.from(ex66()));
  console.log("ex100 -> run end");
}

// -----------------------------
// Convenience default export
// -----------------------------
const Examples = {
  ex01,
  ex02,
  ex03,
  ex04,
  ex05,
  ex06,
  ex07,
  ex08,
  ex09,
  ex10,
  ex11,
  ex12,
  ex13,
  ex14,
  ex15,
  ex16,
  ex17,
  ex18,
  ex19,
  ex20,
  ex21,
  ex22,
  ex23,
  ex24,
  ex25,
  ex26,
  ex27,
  ex28,
  ex29,
  ex30,
  ex31,
  ex32,
  ex33,
  ex34,
  ex35,
  ex36,
  ex37,
  ex38,
  ex39,
  ex40,
  ex41,
  ex43,
  ex44,
  ex45,
  ex46,
  ex47,
  ex48,
  ex49,
  ex50,
  ex51,
  ex52,
  ex53,
  ex54,
  ex55,
  ex56,
  ex57,
  ex58,
  ex59,
  ex60,
  ex61,
  ex62,
  ex63,
  ex64,
  ex65,
  ex66,
  Ex67,
  Ex68,
  ex69,
  ex70,
  ex71,
  ex72,
  ex73,
  ex74,
  ex75,
  ex77,
  ex78,
  ex79,
  ex80,
  ex81,
  ex82,
  ex83,
  ex84,
  ex85,
  ex86,
  ex87,
  ex88,
  ex89,
  ex90,
  ex91,
  ex92,
  ex93,
  ex94,
  ex95,
  ex96,
  ex97,
  ex98,
  ex99,
  ex100,
} as const;

export default Examples;

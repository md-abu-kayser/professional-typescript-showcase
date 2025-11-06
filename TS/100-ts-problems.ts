// 100-ts-problems.ts
// A collection of 100 TypeScript practice problems (unsolved) — one file with prompts.
// Copy this file to your project and implement solutions for each `// TODO` problem.
// Each problem is numbered ex01 .. ex100 and contains a short description and starter types/signatures.

// -----------------------------
// ex01 - Basic Types
// -----------------------------
// Problem: Declare variables with appropriate types and log a formatted sentence.
// TODO: implement function that returns formatted string
export function ex01(username: string, age: number, active: boolean): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex02 - Arrays & Tuples
// -----------------------------
// Problem: Accept tags array and a tuple [name, score], return joined info.
export function ex02(tags: string[], userData: [string, number]): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex03 - Function types
// -----------------------------
// Problem: Implement getUserInfo(name, age) -> string
export function ex03(name: string, age: number): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex04 - Union types
// -----------------------------
// Problem: Create a function that accepts id: string|number and returns string id
export function ex04(id: string | number): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex05 - Interfaces & Discriminated Unions
// -----------------------------
// Problem: Define BaseUser/AdminUser/RegularUser types and a checker that returns role-specific string.
export type BaseUser05 = { id: string | number; name: string; email?: string };
export type AdminUser05 = BaseUser05 & { role: "admin"; permissions: string[] };
export type RegularUser05 = BaseUser05 & {
  role: "user";
  preferences?: Record<string, any>;
};
export type AppUser05 = AdminUser05 | RegularUser05;
export function ex05(user: AppUser05): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex06 - Generics: reverse array
// -----------------------------
// Problem: Implement a generic reverseArray<T>(arr: T[]): T[] without mutating argument
export function ex06<T>(arr: T[]): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex07 - Generic Repository class
// -----------------------------
// Problem: Implement a simple in-memory generic Repository<T> with add, remove, find, getAll
export class Repository07<T> {
  // TODO: add private storage
  constructor() {
    // TODO
  }
  add(item: T): void {
    // TODO
    throw new Error("Not implemented");
  }
  remove(predicate: (item: T) => boolean): T | undefined {
    // TODO
    throw new Error("Not implemented");
  }
  find(predicate: (item: T) => boolean): T | undefined {
    // TODO
    throw new Error("Not implemented");
  }
  getAll(): T[] {
    // TODO
    throw new Error("Not implemented");
  }
}

// -----------------------------
// ex08 - Utility types: Partial / Readonly
// -----------------------------
// Problem: Given BaseUser, implement applyUpdate(original, patch) where patch is Partial<BaseUser>
export function ex08(
  original: BaseUser05,
  patch: Partial<BaseUser05>
): BaseUser05 {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex09 - Conditional types
// -----------------------------
// Problem: Implement a runtime helper isAdmin<T>(user: T): boolean using conditional typing expectations
export function ex09<T>(user: T): boolean {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex10 - Mapped types: Getters
// -----------------------------
// Problem: Create a function createGetters that returns typed getters for a plain object
export type Getters10<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
export function ex10<T extends Record<string, any>>(obj: T): Getters10<T> {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex11 - Template literal types
// -----------------------------
// Problem: Use template literals to build event handler names. Return runtime array of handler keys for given EventName[]
export type EventName11 = "click" | "scroll" | "input";
export type HandlerName11 = `on${Capitalize<EventName11>}`;
export function ex11(events: EventName11[]): HandlerName11[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex12 - Function overloads
// -----------------------------
// Problem: Implement overloaded function process(value: string) => string[] ; process(value: number) => number[]
export function ex12(value: string): string[];
export function ex12(value: number): number[];
export function ex12(value: string | number): string[] | number[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex13 - Generic constraints
// -----------------------------
// Problem: Implement logLength for types with .length
export function ex13<T extends { length: number }>(x: T): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex14 - Decorators (note: optional)
// -----------------------------
// Problem: Create a simple class decorator that adds a timestamp property (ts)
// NOTE: This requires experimentalDecorators in tsconfig to run — implement as factory returning the class.
export function ex14ClassDecorator<T extends { new (...args: any[]): {} }>(
  Ctor: T
): T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex15 - Tuple utilities
// -----------------------------
// Problem: Write a function first<T>(arr: T[]): T | undefined
export function ex15<T>(arr: T[]): T | undefined {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex16 - DeepPartial type practice
// -----------------------------
// Problem: Define DeepPartial<T> and write a function mergeDeep<T>(base: T, patch: DeepPartial<T>): T
export type DeepPartial16<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial16<T[K]> : T[K];
};
export function ex16Merge<T>(base: T, patch: DeepPartial16<T>): T {
  // TODO (shallow merge acceptable for exercise)
  throw new Error("Not implemented");
}

// -----------------------------
// ex17 - Readonly deep
// -----------------------------
// Problem: Create DeepReadonly<T> and demonstrate typing
export type DeepReadonly17<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly17<T[K]> : T[K];
};
// TODO: create sample typed value in tests

// -----------------------------
// ex18 - JSONValue type and parser
// -----------------------------
// Problem: Define JSONValue type and implement parseJson<T>(s: string): T | undefined safely
export type JSONValue18 =
  | string
  | number
  | boolean
  | null
  | { [k: string]: JSONValue18 }
  | JSONValue18[];
export function ex18Parse<T = JSONValue18>(s: string): T | undefined {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex19 - Promise utilities
// -----------------------------
// Problem: Implement promiseAll<T extends any[]>(...promises) -> Promise<T>
export function ex19<T extends any[]>(
  ...promises: { [K in keyof T]: Promise<T[K]> }
): Promise<T> {
  // TODO: wrap Promise.all with proper typing
  throw new Error("Not implemented");
}

// -----------------------------
// ex20 - Zip helper
// -----------------------------
// Problem: Implement zipObject(keys, values) -> Record
export function ex20<K extends string | number, V>(
  keys: K[],
  values: V[]
): Record<K, V | undefined> {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex21 - Utility: Head / Tail types
// -----------------------------
// Problem: Implement head<T>(arr: T[]) and tail<T>(arr: T[])
export function ex21Head<T>(arr: T[]): T | undefined {
  // TODO
  throw new Error("Not implemented");
}
export function ex21Tail<T>(arr: T[]): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex22 - Tagged union: API response
// -----------------------------
// Problem: Implement handleResponse that narrows discriminated union
export type Ok22<T> = { status: "ok"; data: T };
export type Err22 = { status: "error"; error: string };
export function ex22<T>(r: Ok22<T> | Err22): T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex23 - Assertion functions
// -----------------------------
// Problem: Implement assertIsNumber(x) -> asserts x is number
export function assertIsNumber23(x: unknown): asserts x is number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex24 - Utility types: PickByType
// -----------------------------
// Problem: Implement type PickByType<T, U> and show example usage (type only)
export type PickByType24<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// -----------------------------
// ex25 - Index signatures
// -----------------------------
// Problem: Create a typed dictionary and a helper getValue(key)
export function ex25Get<T>(
  dict: Record<string, T>,
  key: string
): T | undefined {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex26 - Optional chaining
// -----------------------------
// Problem: Implement safeRead(o) to return nested value or default
export function ex26Safe(o?: { a?: { b?: { c?: number } } }): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex27 - Never & exhaustive checks
// -----------------------------\n// Problem: Implement exhaustive switch on Shape type
export function ex27Area(
  s: { kind: "circle"; r: number } | { kind: "rect"; w: number; h: number }
): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex28 - Mapped modifiers: makeOptional
// -----------------------------
// Problem: Create a mapped type MakeOptional<T, K> that makes subset optional
export type MakeOptional28<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// -----------------------------
// ex29 - Template tuple transformations (type-level)
// -----------------------------\n// Problem: Create UppercaseKeys<T extends string[]> type and show sample (type-only)

// -----------------------------
// ex30 - Utility: clamp
// -----------------------------
// Problem: Implement clamp function
export function ex30Clamp(v: number, min: number, max: number): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex31 - Branding types
// -----------------------------
// Problem: Create branded type UserId and helper cast function
export type UserId31 = string & { readonly __brand?: unique symbol };
export function ex31ToUserId(id: string): UserId31 {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex32 - Readonly arrays & tuples
// -----------------------------
// Problem: Accept readonly tuple and return first
export function ex32First<T>(t: readonly [T, ...T[]]): T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex33 - Promise error handling pattern
// -----------------------------
// Problem: Implement safe<T>(p: Promise<T>) => Promise<[Error|null, T|null]>
export async function ex33Safe<T>(
  p: Promise<T>
): Promise<[Error | null, T | null]> {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex34 - Deep clone (simple)
// -----------------------------
// Problem: Implement a shallowClone<T>(obj: T): T
export function ex34Clone<T extends object>(obj: T): T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex35 - Flatten union to array element type
// -----------------------------
// Problem: Implement ElementType<T> type and runtime helper firstElement
export type ElementType35<T> = T extends (infer E)[] ? E : T;
export function ex35First<T>(arr: T[]): T | undefined {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex36 - Record and utility creation
// -----------------------------
// Problem: Implement fromEntries<K extends string, V>(pairs: [K, V][]) => Record<K, V>
export function ex36FromEntries<K extends string, V>(
  pairs: [K, V][]
): Record<K, V> {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex37 - Optional & Required utility
// -----------------------------
// Problem: Use Required<T> to force properties and create sample function
export function ex37Ensure<T extends object>(
  obj: T & Partial<Record<keyof T, any>>
): Required<T> {
  // TODO: if missing, throw
  throw new Error("Not implemented");
}

// -----------------------------
// ex38 - Currying helper
// -----------------------------
// Problem: Implement curry for binary functions
export function ex38Curry<A, B, R>(fn: (a: A, b: B) => R) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex39 - Tuple zip
// -----------------------------
// Problem: Zip two arrays into array of tuples
export function ex39Zip<A, B>(a: A[], b: B[]): [A, B][] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex40 - Type guards: isStringArray
// -----------------------------
// Problem: Implement isStringArray(x): x is string[]
export function ex40IsStringArray(x: unknown): x is string[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex41 - Proxy typed wrapper (exercise)
// -----------------------------
// Problem: Create typed proxy that logs gets
export function ex41CreateProxy<T extends object>(target: T): T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex42 - Event Emitter typed
// -----------------------------
// Problem: Implement small typed emitter with on/emit/off
export class Emitter42<EventMap extends Record<string, any[]>> {
  // TODO: implement generic typed emitter
}

// -----------------------------
// ex43 - Nullable utilities
// -----------------------------
// Problem: Implement coalesce(...values) -> first non-nullish
export function ex43Coalesce<T>(
  ...values: (T | null | undefined)[]
): T | undefined {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex44 - Compose multiple functions
// -----------------------------
// Problem: Implement compose(f,g,h) => f(g(h(x)))
export function ex44Compose(...fns: Function[]) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex45 - Simple LRU cache (typed)
// -----------------------------
// Problem: Implement tiny LRU cache class with max size
export class LRU45<K, V> {
  constructor(public max = 10) {
    // TODO
  }
  set(k: K, v: V) {
    throw new Error("Not implemented");
  }
  get(k: K): V | undefined {
    throw new Error("Not implemented");
  }
}

// -----------------------------
// ex46 - Branded enums & string unions
// -----------------------------
// Problem: Create a StringUnion and helper to validate values
export function ex46Validate<T extends string>(
  val: string,
  allowed: readonly T[]
): val is T {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex47 - Chunking arrays
// -----------------------------
// Problem: Implement chunk<T>(arr, size)
export function ex47Chunk<T>(arr: T[], size: number): T[][] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex48 - Debounce typed
// -----------------------------
// Problem: Implement debounce<F extends (...args:any)=>any>(fn, ms)
export function ex48Debounce<F extends (...args: any[]) => any>(
  fn: F,
  ms: number
) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex49 - Throttle typed
// -----------------------------
// Problem: Implement throttle similar to debounce
export function ex49Throttle<F extends (...args: any[]) => any>(
  fn: F,
  ms: number
) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex50 - Deep merge objects
// -----------------------------
// Problem: Implement shallowMerge and deepMerge signatures
export function ex50ShallowMerge<T extends object, U extends object>(
  a: T,
  b: U
): T & U {
  // TODO
  throw new Error("Not implemented");
}
export function ex50DeepMerge<T extends object, U extends object>(
  a: T,
  b: U
): T & U {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex51 - Flatten nested arrays
// -----------------------------
// Problem: Implement flatten once-level and deep flatten type signatures
export function ex51Flatten<T>(arr: (T | T[])[]): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex52 - Unique values from array
// -----------------------------
export function ex52Unique<T>(arr: T[]): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex53 - Topological sort (problem statement)
// -----------------------------
// Problem: Given edges, return topologically sorted nodes or throw on cycle
export function ex53Topo(nodes: string[], edges: [string, string][]): string[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex54 - Binary search variations
// -----------------------------
export function ex54BinarySearch(arr: number[], target: number): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex55 - Date utilities typed
// -----------------------------
export function ex55DaysBetween(a: Date, b: Date): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex56 - Color parse (hex -> rgb)
// -----------------------------
export function ex56HexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex57 - Simple Router match
// -----------------------------
// Problem: Given route like "/users/:id" and path "/users/123" return params {id:123}
export function ex57Match(
  route: string,
  path: string
): Record<string, string> | null {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex58 - Query string parse
// -----------------------------
export function ex58ParseQS(qs: string): Record<string, string> {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex59 - Serialize object to query string
// -----------------------------
export function ex59SerializeQS(
  obj: Record<string, string | number | boolean | undefined>
): string {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex60 - Simple JWT decode (no verify)
// -----------------------------
export function ex60DecodeJwt(token: string): any {
  // TODO: decode base64 payload and parse JSON
  throw new Error("Not implemented");
}

// -----------------------------
// ex61 - Form validation (types)
// -----------------------------
// Problem: Define a generic Validator<T> and implement simple validate function
export type Validator61<T> = (value: T) => string | null;
export function ex61Validate<T>(
  value: T,
  validators: Validator61<T>[]
): string[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex62 - Rate limiter (token bucket) signature
// -----------------------------
export class RateLimiter62 {
  constructor(public tokens = 10) {}
  take(n = 1): boolean {
    throw new Error("Not implemented");
  }
}

// -----------------------------
// ex63 - Simple RSA placeholder (defer to libraries)
// -----------------------------
// Problem: Describe interface for sign/verify and implement dummy
export interface Signer63 {
  sign(msg: string): string;
  verify(msg: string, sig: string): boolean;
}
export const ex63Dummy: Signer63 = {
  sign: (m) => "sig:" + m,
  verify: (m, s) => s === "sig:" + m,
};

// -----------------------------
// ex64 - Linked list operations
// -----------------------------
export type LinkedNode64<T> = { value: T; next?: LinkedNode64<T> };
export function ex64ToArray<T>(head?: LinkedNode64<T>): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex65 - Tree traversal (binary tree)
// -----------------------------
export type Tree65<T> = { value: T; left?: Tree65<T>; right?: Tree65<T> };
export function ex65Inorder<T>(root?: Tree65<T>): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex66 - Regex typed matcher
// -----------------------------
export function ex66FirstGroup(s: string, re: RegExp): string | null {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex67 - Sparse matrix representation
// -----------------------------
export function ex67Set(
  mat: Map<string, number>,
  r: number,
  c: number,
  v: number
) {
  mat.set(`${r},${c}`, v);
}
export function ex67Get(
  mat: Map<string, number>,
  r: number,
  c: number
): number | undefined {
  return mat.get(`${r},${c}`);
}

// -----------------------------
// ex68 - Simple event delegation helper
// -----------------------------
export function ex68Delegate(
  selector: string,
  eventName: string,
  root: Element,
  handler: (el: Element, ev: Event) => void
) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex69 - Merge arrays unique by key
// -----------------------------
export function ex69MergeUnique<T, K extends keyof T>(
  a: T[],
  b: T[],
  key: K
): T[] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex70 - Deep key-path getter
// -----------------------------
export function ex70Get(obj: any, path: string): any {
  // TODO: path like 'a.b.c'
  throw new Error("Not implemented");
}

// -----------------------------
// ex71 - Simple CSV parse
// -----------------------------
export function ex71ParseCSV(csv: string): string[][] {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex72 - Memoize with max size
// -----------------------------
export function ex72Memoize<F extends (...args: any[]) => any>(
  fn: F,
  max = 100
) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex73 - Binary tree depth
// -----------------------------
export function ex73Depth<T>(root?: Tree65<T>): number {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex74 - Serialize & deserialize typed data
// -----------------------------
export function ex74Serialize<T>(obj: T): string {
  return JSON.stringify(obj);
}
export function ex74Deserialize<T>(s: string): T {
  return JSON.parse(s) as T;
}

// -----------------------------
// ex75 - Simple encryption placeholder
// -----------------------------
export function ex75Xor(data: string, key: number): string {
  return data
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) ^ key))
    .join("");
}

// -----------------------------
// ex76 - DSL parser small (arithmetic)
// -----------------------------
export function ex76Eval(expr: string): number {
  // TODO: implement simple parser or use eval with sanitization (exercise)
  throw new Error("Not implemented");
}

// -----------------------------
// ex77 - Filepath utilities (basename, dirname)
// -----------------------------
export function ex77Basename(path: string): string {
  return path.split(/[/\\]/).pop() || "";
}
export function ex77Dirname(path: string): string {
  const parts = path.split(/[/\\]/);
  parts.pop();
  return parts.join("/");
}

// -----------------------------
// ex78 - Simple ACL check
// -----------------------------
export function ex78Can(userRoles: string[], required: string[]): boolean {
  return required.every((r) => userRoles.includes(r));
}

// -----------------------------
// ex79 - Simple pluralize utility
// -----------------------------
export function ex79Plural(word: string, n: number): string {
  return n === 1 ? word : word + "s";
}

// -----------------------------
// ex80 - Determine leap year
// -----------------------------
export function ex80IsLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// -----------------------------
// ex81 - Simple sorting comparator builder
// -----------------------------
export function ex81By<T>(key: keyof T) {
  return (a: T, b: T) => ((a[key] as any) > (b[key] as any) ? 1 : -1);
}

// -----------------------------
// ex82 - Debounce promise wrapper
// -----------------------------
export function ex82DebouncePromise<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number
) {
  // TODO
  throw new Error("Not implemented");
}

// -----------------------------
// ex83 - Simple CSV stringify
// -----------------------------
export function ex83StringifyCSV(rows: string[][]): string {
  return rows
    .map((r) =>
      r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(",")
    )
    .join("\n");
}

// -----------------------------
// ex84 - Simple unique ID generator
// -----------------------------
export function ex84Uid(prefix = ""): string {
  return prefix + Math.random().toString(36).slice(2, 9);
}

// -----------------------------
// ex85 - Simple HTTP status checker (typed)
// -----------------------------
export function ex85IsOk(status: number): boolean {
  return status >= 200 && status < 300;
}

// -----------------------------
// ex86 - Flatten typed nested object keys
// -----------------------------
export function ex86FlattenKeys(
  obj: Record<string, any>,
  prefix = ""
): string[] {
  const out: string[] = [];
  for (const k in obj) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k]))
      out.push(...ex86FlattenKeys(obj[k], p));
    else out.push(p);
  }
  return out;
}

// -----------------------------
// ex87 - Simple natural sort for strings containing numbers
// -----------------------------
export function ex87NaturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true });
}

// -----------------------------
// ex88 - Promise timeout wrapper
// -----------------------------
export function ex88WithTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}

// -----------------------------
// ex89 - Simple base64 encode/decode typed
// -----------------------------
export function ex89B64Encode(s: string) {
  return Buffer ? Buffer.from(s).toString("base64") : btoa(s);
}
export function ex89B64Decode(s: string) {
  return Buffer ? Buffer.from(s, "base64").toString("utf8") : atob(s);
}

// -----------------------------
// ex90 - Simple circular reference safe stringify
// -----------------------------
export function ex90SafeStringify(obj: any): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (_, v) => {
    if (v && typeof v === "object") {
      if (seen.has(v)) return "[Circular]";
      seen.add(v);
    }
    return v;
  });
}

// -----------------------------
// ex91 - Simple intersection of arrays
// -----------------------------
export function ex91Intersect<T>(a: T[], b: T[]): T[] {
  const s = new Set(b);
  return Array.from(new Set(a.filter((x) => s.has(x))));
}

// -----------------------------
// ex92 - Simple difference of arrays
// -----------------------------
export function ex92Difference<T>(a: T[], b: T[]): T[] {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
}

// -----------------------------
// ex93 - Flatten deep object to dot notation map
// -----------------------------
export function ex93Dot(obj: any, prefix = ""): Record<string, any> {
  const out: Record<string, any> = {};
  for (const k in obj) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k]))
      Object.assign(out, ex93Dot(obj[k], p));
    else out[p] = obj[k];
  }
  return out;
}

// -----------------------------
// ex94 - Simple debounce (browser-friendly)
// -----------------------------
export function ex94Debounce(fn: Function, ms = 200) {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// -----------------------------
// ex95 - Validate email basic
// -----------------------------
export function ex95IsEmail(s: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
}

// -----------------------------
// ex96 - Convert camelCase to kebab-case
// -----------------------------
export function ex96Kebab(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// -----------------------------
// ex97 - Simple UUID v4 (not cryptographically secure)
// -----------------------------
export function ex97Uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// -----------------------------
// ex98 - Group by key
// -----------------------------
export function ex98GroupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, cur) => {
    const k = String(cur[key]);
    (acc[k] ||= []).push(cur);
    return acc;
  }, {} as Record<string, T[]>);
}

// -----------------------------
// ex99 - Safe property set with path
// -----------------------------
export function ex99Set(obj: any, path: string, value: any) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] ||= {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

// -----------------------------
// ex100 - Runner: run selected examples by number
// -----------------------------
export async function ex100Run(selected: number[] = [1, 2, 3]) {
  const out: any = {};
  for (const n of selected) {
    try {
      out[n] = `ran ex${String(n).padStart(2, "0")}`;
    } catch (e) {
      out[n] = `error: ${String(e)}`;
    }
  }
  return out;
}

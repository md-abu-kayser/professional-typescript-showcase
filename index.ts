// Enhanced TypeScript Examples - Comprehensive Learning with 50 Examples
// This file provides 50 code examples for the playground, expanding the project.

// 1. Basic Types and Annotations
let username: string = "TypeScriptUser";
let userAge: number = 25;
let isActive: boolean = true;
let userTags: string[] = ["developer", "typescript"];
let userData: [string, number] = ["Alice", 30]; // Tuple

// 2. Advanced Type Annotations
type UserRole = "admin" | "user" | "guest";
type UserID = string | number;
interface BaseUser {
  id: UserID;
  name: string;
  email: string;
}
interface AdminUser extends BaseUser {
  role: "admin";
  permissions: string[];
}
interface RegularUser extends BaseUser {
  role: "user";
  preferences: Record<string, any>;
}
type AppUser = AdminUser | RegularUser;

// 3. Generic Functions and Classes
class Repository<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
  getAll(): T[] {
    return [...this.items];
  }
}

// 4. Utility Types in Action
type PartialUser = Partial<BaseUser>;
type ReadonlyUser = Readonly<BaseUser>;
type UserName = Pick<BaseUser, "name" | "email">;
type UserWithoutEmail = Omit<BaseUser, "email">;

// 5. Conditional Types and Inference
type IsAdmin<T> = T extends { role: "admin" } ? true : false;
type AdminCheck = IsAdmin<AdminUser>; // true
type ExtractRole<T> = T extends { role: infer R } ? R : never;
type UserRoleType = ExtractRole<AppUser>; // "admin" | "user"

// 6. Mapped Types with Modifiers
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type UserGetters = Getters<BaseUser>;
// Equivalent to:
// {
// getId: () => UserID;
// getName: () => string;
// getEmail: () => string;
// }

// 7. Template Literal Types
type EventName = "click" | "scroll" | "keypress";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onKeypress"

// 8. Function Overloads
function processInput(input: string): string[];
function processInput(input: number): number[];
function processInput(input: string | number): string[] | number[] {
  if (typeof input === "string") {
    return input.split("");
  } else {
    return [input, input * 2, input * 3];
  }
}

// 9. Advanced Generic Constraints
interface Lengthwise {
  length: number;
}
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 10. Decorators (Experimental)
function LogClass(target: Function) {
  console.log(`Class ${target.name} was defined`);
}
function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyName} returned:`, result);
    return result;
  };
}
@LogClass
class AdvancedCalculator {
  @LogMethod
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// 11. Template Literal Types Advanced
type HTTPMethod = "GET" | "POST";
type Route = `/${string}`;
type APIEndpoint = `/${HTTPMethod}${Route}`;

// 12. Indexed Access with Arrays
type StringArray = string[];
type FirstElement = StringArray[0]; // string

// 13. Partial Utility Example
type PartialPoint = Partial<{x: number; y: number}>;

// 14. Required Utility Example
type RequiredPoint = Required<{x?: number; y?: number}>;

// 15. Pick Utility Example
type PointXY = Pick<{x: number; y: number; z: number}, "x" | "y">;

// 16. Omit Utility Example
type PointXYNoZ = Omit<{x: number; y: number; z: number}, "z">;

// 17. Discriminated Union Example
type APIResponse = {status: "success"; data: any} | {status: "error"; error: string};

// 18. Intersection with Interfaces
interface Named { name: string; }
interface Aged { age: number; }
type Person = Named & Aged;

// 19. Never in Exhaustive Switch
type Color = "red" | "green" | "blue";
function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect ${x}`);
}

// 20. Unknown with Guards
let input: unknown;
if (typeof input === "string") { /* use as string */ }

// 21. Typeof with Objects
const config = { debug: true };
type Config = typeof config;

// 22. Keyof with Constraints
type Keys<T> = T extends object ? keyof T : never;

// 23. In Operator Narrowing
type Admin = { role: "admin" };
type User = { role: "user" };
type Person = Admin | User;
// if ("permissions" in person) { }

// 24. Instanceof with Classes
class Employee { salary: number = 0; }
class Manager extends Employee { team: string[] = []; }

// 25. This in Methods
class Clearable {
  value = "";
  clear(this: Clearable) { this.value = ""; }
}

// 26. Infer in Utilities
type Flatten<T> = T extends Array<infer U> ? U : T;

// 27. Variadic Tuples
type Append<T extends any[], U> = [...T, U];

// 28. Recursive Linked List
type LinkedList<T> = T | {value: T; next: LinkedList<T>};

// 29. Module Augmentation Example
declare global { interface Array<T> { unique(): T[]; } }

// 30. Const Assertion
const fruits = ["apple", "banana"] as const;
type Fruit = typeof fruits[number];

// 31. ReadonlyArrays
type ReadonlyArr = ReadonlyArray<string>;

// 32. Record Utility
type Dict = Record<string, number>;

// 33. Symbol Types
let ex33: symbol = Symbol("key");

// 34. Exclude Utility
type Ex34 = Exclude<string | number, number>; // string

// 35. Extract Utility
type Ex35 = Extract<"a" | "b", "b" | "c">; // "b"

// 36. Parameters Utility
type Ex36 = Parameters<() => void>; // []

// 37. Static Class Properties
class Ex37 { static prop = 42; }

// 38. ReturnType Utility
type Ex38 = ReturnType<() => string>; // string

// 39. InstanceType Utility
type Ex39 = InstanceType<typeof class {}>; // {}

// 40. Awaited Utility (TS 4.5+)
type Ex40 = Awaited<Promise<string>>; // string

// 41. Uppercase String Literals
type Greeting = `Hello, ${Uppercase<string>}`;

// 42. Brand Types (Nominal Typing)
type UserId = string & { readonly brand: unique symbol };

// 43. Correlated Records
type TupleToRecord<T extends readonly [string, unknown][]> = {
  [K in T[number][0]]: (T extends readonly [infer U extends [string, unknown], ...infer R] ? R : never)[number][1]
};

// 44. Flatten Union
type FlattenUnion<T> = { [P in keyof T]: T[P] } & {};

// 45. Deep Partial
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// 46. Deep Readonly
type DeepReadonly<T> = T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : T;

// 47. PromiseAll
type PromiseAll<T extends readonly unknown[]> = {
  [K in keyof T]: Awaited<T[K]>
} & { length: T['length'] };

// 48. Zip Object
type ZipObject<T extends readonly [string, any][]> = {
  [K in keyof T]: T[K][0] extends string ? { [P in T[K][0]]: T[K][1] } : never
}[number];

// 49. Head and Tail for Tuples
type Head<T extends readonly any[]> = T extends readonly [infer H, ...infer _] ? H : never;
type Tail<T extends readonly any[]> = T extends readonly [...infer _, infer R[]] ? R : [];

// 50. Advanced Recursive Type: JSON Serializable
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

// Usage examples and demonstrations
const userRepository = new Repository<AppUser>();
const numberRepository = new Repository<number>();
// Demonstrate the power of TypeScript's type system
function demonstrateTypeSafety() {
  // This would cause a TypeScript error:
  // userRepository.add({ name: "Bob" }); // Missing required properties
  // This is correct:
  userRepository.add({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    permissions: ["read", "write"],
  });
  const admin = userRepository.find((user) => user.role === "admin");
  console.log("Found admin:", admin);
}
// Run demonstrations
demonstrateTypeSafety();

// Export for use in other modules
export {
  BaseUser,
  AdminUser,
  RegularUser,
  AppUser,
  Repository,
  AdvancedCalculator,
  demonstrateTypeSafety,
  // Export additional types for completeness
  PartialUser,
  ReadonlyUser,
  UserName,
  UserWithoutEmail,
  IsAdmin,
  ExtractRole,
  Getters,
  HandlerName,
  Lengthwise,
  LogClass,
  LogMethod,
  HTTPMethod,
  Route,
  APIEndpoint,
  FirstElement,
  PartialPoint,
  RequiredPoint,
  PointXY,
  PointXYNoZ,
  APIResponse,
  Person,
  assertUnreachable,
  input,
  config,
  Keys,
  Person as AdminOrUser,
  Employee,
  Manager,
  Clearable,
  Flatten,
  Append,
  LinkedList,
  fruits,
  Fruit,
  ReadonlyArr,
  Dict,
  ex33,
  Ex34,
  Ex35,
  Ex36,
  Ex37,
  Ex38,
  Ex39,
  Ex40,
  Greeting,
  UserId,
  TupleToRecord,
  FlattenUnion,
  DeepPartial,
  DeepReadonly,
  PromiseAll,
  ZipObject,
  Head,
  Tail,
  JSONValue,
};
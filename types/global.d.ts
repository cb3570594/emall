import type {
  ComponentPublicInstance,
  FunctionalComponent,
} from 'vue';

declare global {
  type Recordable<T = any> = Record<string, T>;
}
declare type Recordable<T = any> = Record<string, T>;

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}

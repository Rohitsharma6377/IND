import { Request, Response } from "express";
import { ReactNode, ComponentType } from "react";
import * as React from "react";

// Core INDJS Types
export interface INDJSConfig {
  root?: string;
  port?: number;
  baseUrl?: string;
  env?: "development" | "production";
  database?: DatabaseConfig;
  auth?: AuthConfig;
  middleware?: MiddlewareConfig[];
}

// Request Context
export interface INDJSContext {
  req: Request;
  res: Response;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  body?: any;
  root: string;
  pageFile?: string;
  route?: string;
  dev?: boolean;
  user?: any;
}

// Page Component Props
export interface PageProps {
  [key: string]: any;
}

// Server-side Props
export interface GetServerSidePropsContext extends INDJSContext { }

export interface GetServerSidePropsResult<P = any> {
  props: P;
  redirect?: {
    destination: string;
    permanent?: boolean;
  };
  notFound?: boolean;
}

export type GetServerSideProps<P = any> = (
  context: GetServerSidePropsContext,
) => Promise<GetServerSidePropsResult<P>>;

// Static Generation
export interface GetStaticPropsContext {
  params?: Record<string, string>;
}

export interface GetStaticPropsResult<P = any> {
  props: P;
  revalidate?: number | false;
  notFound?: boolean;
  redirect?: {
    destination: string;
    permanent?: boolean;
  };
}

export type GetStaticProps<P = any> = (
  context: GetStaticPropsContext,
) => Promise<GetStaticPropsResult<P>>;

export interface GetStaticPathsResult {
  paths: Array<{
    params: Record<string, string>;
  }>;
  fallback: boolean | "blocking";
}

export type GetStaticPaths = () => Promise<GetStaticPathsResult>;

// API Handler Types
export type APIHandler = (context: INDJSContext) => Promise<any> | any;

export interface APIHandlers {
  get?: APIHandler;
  post?: APIHandler;
  put?: APIHandler;
  delete?: APIHandler;
  patch?: APIHandler;
  head?: APIHandler;
  options?: APIHandler;
  default?: APIHandler;
}

// Component Types
export type INDJSPage<P = {}> = ComponentType<P> & {
  getServerSideProps?: GetServerSideProps<P>;
  getStaticProps?: GetStaticProps<P>;
  getStaticPaths?: GetStaticPaths;
  metadata?: PageMetadata;
  getMetadata?: (context: INDJSContext) => Promise<PageMetadata>;
};

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
}

// Layout and App Components
export type LayoutComponent = ComponentType<{
  children: ReactNode;
  [key: string]: any;
}>;

export type AppComponent = ComponentType<{
  children: ReactNode;
  [key: string]: any;
}>;

export type HeadComponent = ComponentType<any>;

// Middleware
export interface MiddlewareConfig {
  name: string;
  handler: (context: INDJSContext) => Promise<boolean | void> | boolean | void;
  routes?: string[];
  exclude?: string[];
}

// Database Configuration
export interface DatabaseConfig {
  type: "mongodb" | "postgresql" | "sqlite" | "prisma";
  url: string;
  options?: Record<string, any>;
}

// Authentication Configuration
export interface AuthConfig {
  secret: string;
  providers?: AuthProvider[];
  session?: {
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
  };
}

export interface AuthProvider {
  name: string;
  type: "oauth" | "credentials";
  config: Record<string, any>;
}

// Route Information
export interface RouteInfo {
  type: "page" | "api";
  route: string;
  file: string;
  pattern: RegExp;
  names: string[];
}

// Build Assets
export interface BuildAssets {
  clientSrc?: string;
  manifest?: string;
}

// CLI Types
export interface CLICommand {
  name: string;
  description: string;
  options?: CLIOption[];
  action: (args: any) => Promise<void> | void;
}

export interface CLIOption {
  flag: string;
  description: string;
  default?: any;
}

// Template Types
export interface Template {
  name: string;
  description: string;
  files: TemplateFile[];
}

export interface TemplateFile {
  path: string;
  content: string;
  type: "file" | "directory";
}

// Plugin System
export interface INDJSPlugin {
  name: string;
  version: string;
  init: (config: INDJSConfig) => Promise<void> | void;
  middleware?: MiddlewareConfig[];
  routes?: RouteInfo[];
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Export main framework functions
export declare function dev(config: INDJSConfig): Promise<void>;
export declare function build(config: INDJSConfig): Promise<void>;
export declare function start(config: INDJSConfig): Promise<void>;

// Export utilities
export declare function discoverRoutes(root: string): Promise<{
  pages: RouteInfo[];
  api: RouteInfo[];
}>;

export declare function matchDynamic(
  pathname: string,
  routes: RouteInfo[],
): { route: RouteInfo; params: Record<string, string> } | null;

// Database utilities
export declare namespace Database {
  export function connect(config: DatabaseConfig): Promise<any>;
  export function disconnect(): Promise<void>;
  export function query(sql: string, params?: any[]): Promise<any>;
}

// Auth utilities
export declare namespace Auth {
  export function hashPassword(password: string): Promise<string>;
  export function verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean>;
  export function generateToken(payload: any): string;
  export function verifyToken(token: string): any;
  export function requireAuth(context: INDJSContext): Promise<boolean>;
}

// Testing utilities
export declare namespace Testing {
  export function createMockContext(
    overrides?: Partial<INDJSContext>,
  ): INDJSContext;
  export function mockRequest(options?: any): Request;
  export function mockResponse(options?: any): Response;
}

// -----------------------------
// UI Components and Utilities
// -----------------------------

// Image component
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  quality?: number;
  sizes?: string;
  widths?: Array<number>;
  unoptimized?: boolean;
  priority?: boolean; // eager + fetchPriority=high
}
export declare const Image: React.ComponentType<ImageProps>;

// Link component
export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick" | "href"
> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
export declare const Link: React.ComponentType<
  React.PropsWithChildren<LinkProps>
>;

// Script component
export type ScriptStrategy =
  | "beforeInteractive"
  | "afterInteractive"
  | "lazyOnload";
export interface ScriptProps extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  strategy?: ScriptStrategy;
  children?: string;
}
export declare const Script: React.ComponentType<ScriptProps>;

// Head component (client helper)
export interface HeadProps {
  title?: string;
  metas?: Array<Record<string, string>>;
  links?: Array<Record<string, string>>;
}
export declare const Head: React.ComponentType<HeadProps>;

// dynamic import helper
export interface DynamicOptions {
  loading?: React.ComponentType<any>;
  ssr?: boolean;
}
export default function dynamic<T = any>(
  loader: () => Promise<
    { default: React.ComponentType<T> } | React.ComponentType<T>
  >,
  options?: DynamicOptions,
): React.ComponentType<T>;

// Router utilities
export interface RouterLike {
  pathname: string;
  query: Record<string, string | string[]>;
  asPath: string;
  push: (url: string) => void;
  replace: (url: string) => void;
  back: () => void;
  reload: () => void;
}
export function useRouter(): RouterLike;
export const Router: { useRouter: typeof useRouter };

// React Native-like Primitives

// View Component
export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}
export declare const View: React.ComponentType<ViewProps>;

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}
export declare const Text: React.ComponentType<TextProps>;

// ScrollView Component
export interface ScrollViewProps extends ViewProps {
  contentContainerStyle?: React.CSSProperties;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  className?: string;
}
export declare const ScrollView: React.ComponentType<ScrollViewProps>;

// TextInput Component
export interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value?: string | number;
  defaultValue?: string | number;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  className?: string;
}
export declare const TextInput: React.ComponentType<TextInputProps>;

// Button Component
export interface ButtonProps extends ViewProps {
  title: string;
  onPress?: (e: any) => void;
  color?: string;
  disabled?: boolean;
  textStyle?: React.CSSProperties;
}
export declare const Button: React.ComponentType<ButtonProps>;

// ActivityIndicator
export interface ActivityIndicatorProps extends ViewProps {
  size?: "small" | "large";
  color?: string;
}
export declare const ActivityIndicator: React.ComponentType<ActivityIndicatorProps>;

// Switch
export interface SwitchProps extends ViewProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: { true?: string; false?: string };
  thumbColor?: string;
}
export declare const Switch: React.ComponentType<SwitchProps>;

// FlatList
export interface FlatListProps<T> extends ScrollViewProps {
  data: Array<T>;
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement;
  numColumns?: number;
}
export declare function FlatList<T>(
  props: FlatListProps<T>,
): React.ReactElement;

// TouchableOpacity
export interface TouchableOpacityProps extends ViewProps {
  activeOpacity?: number;
  onPress?: (e: any) => void;
  disabled?: boolean;
}
export declare const TouchableOpacity: React.ComponentType<TouchableOpacityProps>;

// Pressable
export interface PressableStateCallbackType {
  pressed: boolean;
}
export interface PressableProps extends Omit<ViewProps, "style" | "children"> {
  onPress?: (e: any) => void;
  onPressIn?: (e: any) => void;
  onPressOut?: (e: any) => void;
  disabled?: boolean;
  style?:
  | React.CSSProperties
  | ((state: PressableStateCallbackType) => React.CSSProperties);
  children?:
  | React.ReactNode
  | ((state: PressableStateCallbackType) => React.ReactNode);
}
export declare const Pressable: React.ComponentType<PressableProps>;

// ImageBackground
export interface ImageBackgroundProps extends ViewProps {
  source: string | { uri: string };
  imageStyle?: React.CSSProperties;
}
export declare const ImageBackground: React.ComponentType<ImageBackgroundProps>;

// Modal
export interface ModalProps extends ViewProps {
  visible?: boolean;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  onRequestClose?: () => void;
}
export declare const Modal: React.ComponentType<ModalProps>;

// SafeAreaView
export interface SafeAreaViewProps extends ViewProps { }
export declare const SafeAreaView: React.ComponentType<SafeAreaViewProps>;

// StatusBar
export interface StatusBarProps {
  barStyle?: "default" | "light-content" | "dark-content";
  backgroundColor?: string;
  hidden?: boolean;
}
export declare const StatusBar: React.ComponentType<StatusBarProps>;

// SectionList
export interface SectionListProps<T> extends ScrollViewProps {
  sections: Array<{ data: T[]; key?: string;[key: string]: any }>;
  renderItem: (info: {
    item: T;
    index: number;
    section: any;
  }) => React.ReactNode;
  renderSectionHeader?: (info: { section: any }) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  stickySectionHeadersEnabled?: boolean;
}
export declare function SectionList<T>(
  props: SectionListProps<T>,
): React.ReactElement;

// KeyboardAvoidingView
export interface KeyboardAvoidingViewProps extends ViewProps {
  behavior?: "height" | "position" | "padding";
  contentContainerStyle?: React.CSSProperties;
  enabled?: boolean;
  keyboardVerticalOffset?: number;
}
export declare const KeyboardAvoidingView: React.ComponentType<KeyboardAvoidingViewProps>;

// RefreshControl
export interface RefreshControlProps extends ViewProps {
  refreshing: boolean;
  onRefresh?: () => void;
  colors?: string[];
  tintColor?: string;
  title?: string;
  titleColor?: string;
}
export declare const RefreshControl: React.ComponentType<RefreshControlProps>;

// TouchableHighlight
export interface TouchableHighlightProps extends TouchableOpacityProps {
  underlayColor?: string;
  onShowUnderlay?: () => void;
  onHideUnderlay?: () => void;
}
export declare const TouchableHighlight: React.ComponentType<TouchableHighlightProps>;

// TouchableWithoutFeedback
export interface TouchableWithoutFeedbackProps {
  onPress?: (e: any) => void;
  onPressIn?: (e: any) => void;
  onPressOut?: (e: any) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare const TouchableWithoutFeedback: React.ComponentType<TouchableWithoutFeedbackProps>;

// APIs

export declare const StyleSheet: {
  create: <T extends Record<string, React.CSSProperties>>(styles: T) => T;
  flatten: (style: any) => React.CSSProperties;
  hairlineWidth: number;
  absoluteFill: React.CSSProperties;
  absoluteFillObject: React.CSSProperties;
};

export declare const Alert: {
  alert: (
    title: string,
    message?: string,
    buttons?: {
      text?: string;
      onPress?: () => void;
      style?: "default" | "cancel" | "destructive";
    }[],
    options?: { cancelable?: boolean; onDismiss?: () => void },
  ) => void;
  prompt: (
    title: string,
    message?: string,
    callbackOrButtons?: ((text: string) => void) | Object[],
    type?: string,
    defaultValue?: string,
    keyboardType?: string,
  ) => void;
};

export declare const Dimensions: {
  get: (dim: "window" | "screen") => {
    width: number;
    height: number;
    scale: number;
    fontScale: number;
  };
  addEventListener: (
    type: "change",
    handler: (dims: { window: any; screen: any }) => void,
  ) => { remove: () => void };
  removeEventListener: (
    type: "change",
    handler: (dims: { window: any; screen: any }) => void,
  ) => void;
};

export declare const PixelRatio: {
  get: () => number;
  getFontScale: () => number;
  getPixelSizeForLayoutSize: (layoutSize: number) => number;
  roundToNearestPixel: (layoutSize: number) => number;
};

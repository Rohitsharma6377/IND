import { Request, Response } from 'express';
import { ReactNode, ComponentType } from 'react';
import * as React from 'react';

// Core INDJS Types
export interface INDJSConfig {
  root?: string;
  port?: number;
  baseUrl?: string;
  env?: 'development' | 'production';
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
export interface GetServerSidePropsContext extends INDJSContext {}

export interface GetServerSidePropsResult<P = any> {
  props: P;
  redirect?: {
    destination: string;
    permanent?: boolean;
  };
  notFound?: boolean;
}

export type GetServerSideProps<P = any> = (
  context: GetServerSidePropsContext
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
  context: GetStaticPropsContext
) => Promise<GetStaticPropsResult<P>>;

export interface GetStaticPathsResult {
  paths: Array<{
    params: Record<string, string>;
  }>;
  fallback: boolean | 'blocking';
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
  type: 'mongodb' | 'postgresql' | 'sqlite' | 'prisma';
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
  type: 'oauth' | 'credentials';
  config: Record<string, any>;
}

// Route Information
export interface RouteInfo {
  type: 'page' | 'api';
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
  type: 'file' | 'directory';
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
  routes: RouteInfo[]
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
  export function verifyPassword(password: string, hash: string): Promise<boolean>;
  export function generateToken(payload: any): string;
  export function verifyToken(token: string): any;
  export function requireAuth(context: INDJSContext): Promise<boolean>;
}

// Testing utilities
export declare namespace Testing {
  export function createMockContext(overrides?: Partial<INDJSContext>): INDJSContext;
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
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href'> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
export declare const Link: React.ComponentType<React.PropsWithChildren<LinkProps>>;

// Script component
export type ScriptStrategy = 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
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
export default function dynamic<T = any>(loader: () => Promise<{ default: React.ComponentType<T> } | React.ComponentType<T>>, options?: DynamicOptions): React.ComponentType<T>;

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

/**
 * Script component (Next.js-like)
 *
 * Injects scripts with simple loading strategies.
 *
 * Props:
 * - id?: string
 * - src?: string
 * - strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' (default: 'afterInteractive')
 * - async?: boolean
 * - defer?: boolean
 * - type?: string
 * - onLoad?: (ev: Event) => void
 * - onError?: (ev: Event) => void
 * - children?: string (inline script content)
 *
 * Usage:
 * <Script src="/lib.js" />
 * <Script strategy="beforeInteractive">{"window.flag=true;"}</Script>
 */
import React from "react";

// Next.js-like <Script> component with simple strategies
// Props: src?, id?, strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' (default: 'afterInteractive')
//        async?, defer?, type?, onLoad?, onError?, children? (inline script)
export default function Script(props) {
  const {
    src,
    id,
    strategy = "afterInteractive",
    async: asyncAttr,
    defer: deferAttr,
    type,
    onLoad,
    onError,
    children,
    ...rest
  } = props;

  // beforeInteractive: inject ASAP on mount
  React.useEffect(() => {
    if (strategy !== "beforeInteractive") return;
    try {
      const s = document.createElement("script");
      if (id) s.id = id;
      if (type) s.type = type;
      if (asyncAttr != null) s.async = !!asyncAttr;
      if (deferAttr != null) s.defer = !!deferAttr;
      if (src) s.src = src;
      if (children)
        s.textContent = typeof children === "string" ? children : "";
      if (onLoad) s.addEventListener("load", onLoad);
      if (onError) s.addEventListener("error", onError);
      Object.assign(s, {});
      document.head.appendChild(s);
      return () => {
        try {
          document.head.removeChild(s);
        } catch {}
      };
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    src,
    type,
    asyncAttr,
    deferAttr,
    strategy,
    onLoad,
    onError,
    children,
  ]);

  // lazyOnload: wait for window load then inject
  React.useEffect(() => {
    if (strategy !== "lazyOnload") return;
    let injected = false;
    function inject() {
      if (injected) return;
      injected = true;
      try {
        const s = document.createElement("script");
        if (id) s.id = id;
        if (type) s.type = type;
        if (asyncAttr != null) s.async = !!asyncAttr;
        if (deferAttr != null) s.defer = !!deferAttr;
        if (src) s.src = src;
        if (children)
          s.textContent = typeof children === "string" ? children : "";
        if (onLoad) s.addEventListener("load", onLoad);
        if (onError) s.addEventListener("error", onError);
        document.body.appendChild(s);
      } catch {}
    }
    if (document.readyState === "complete") inject();
    else window.addEventListener("load", inject, { once: true });
    return () => {
      window.removeEventListener("load", inject);
    };
  }, [
    id,
    src,
    type,
    asyncAttr,
    deferAttr,
    strategy,
    onLoad,
    onError,
    children,
  ]);

  // afterInteractive: render script tag normally (runs after hydration)
  if (strategy === "afterInteractive") {
    if (src) {
      return React.createElement("script", {
        id,
        src,
        type,
        async: asyncAttr,
        defer: deferAttr,
        onLoad,
        onError,
        ...rest,
      });
    }
    // inline
    return React.createElement("script", {
      id,
      type,
      dangerouslySetInnerHTML: {
        __html: typeof children === "string" ? children : "",
      },
      ...rest,
    });
  }

  // For other strategies, render nothing (injected via effects)
  return null;
}

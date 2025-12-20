var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/_layout.jsx
import React30 from "react";
import { Provider } from "react-redux";

// node_modules/indjs/src/routing/router.mjs
import React from "react";
function parseQuery(search) {
  const q = {};
  const usp = new URLSearchParams(search || "");
  for (const [k, v] of usp.entries()) {
    if (q[k] === void 0) q[k] = v;
    else if (Array.isArray(q[k])) q[k].push(v);
    else q[k] = [q[k], v];
  }
  return q;
}
function useRouter() {
  const [state, setState] = React.useState(() => ({
    pathname: typeof window !== "undefined" ? window.location.pathname : "/",
    search: typeof window !== "undefined" ? window.location.search : "",
    hash: typeof window !== "undefined" ? window.location.hash : ""
  }));
  React.useEffect(() => {
    function onPop() {
      setState({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const hrefFrom = (url) => typeof url === "string" ? url : String(url || "");
  const navigate = React.useCallback((url, { replace = false } = {}) => {
    const base = window.location.origin;
    let u;
    try {
      u = new URL(hrefFrom(url), base);
    } catch {
      return;
    }
    const next = u.pathname + u.search + u.hash;
    if (replace) window.history.replaceState({}, "", next);
    else window.history.pushState({}, "", next);
    try {
      window.dispatchEvent(
        new CustomEvent("ind:navigate", { detail: { href: next } })
      );
    } catch {
    }
    setState({ pathname: u.pathname, search: u.search, hash: u.hash });
  }, []);
  const push = React.useCallback(
    (url) => navigate(url, { replace: false }),
    [navigate]
  );
  const rep = React.useCallback(
    (url) => navigate(url, { replace: true }),
    [navigate]
  );
  return {
    pathname: state.pathname,
    query: parseQuery(state.search),
    asPath: state.pathname + state.search + state.hash,
    push,
    replace: rep,
    back: () => window.history.back(),
    reload: () => window.location.reload()
  };
}

// node_modules/indjs/src/platform.mjs
var isBrowser = typeof window !== "undefined";
var isDesktop = isBrowser && (window.process?.type === "renderer" || !!window.electron || navigator.userAgent.includes("Electron"));
var isMobile = isBrowser && (!!window.Capacitor || !!window.androidBridge || !!window.webkit?.messageHandlers?.bridge || navigator.userAgent.includes("Capacitor"));
var isAndroid = isMobile && /android/i.test(navigator.userAgent);
var isIOS = isMobile && /iphone|ipad|ipod/i.test(navigator.userAgent);
var platform = (() => {
  if (isDesktop) return "desktop";
  if (isAndroid) return "android";
  if (isIOS) return "ios";
  if (isMobile) return "mobile";
  return "web";
})();

// node_modules/indjs/src/components/image.jsx
import React2, { forwardRef } from "react";

// node_modules/indjs/src/universal/resolve.js
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function resolveElement(type) {
  const platform2 = typeof PLATFORM !== "undefined" ? PLATFORM : "web";
  if (platform2 === "web") {
    const webMap = {
      view: "div",
      text: "span",
      image: "img",
      imagebackground: "div",
      // map image-background to div with style
      scrollview: "div",
      flatlist: "div",
      sectionlist: "div",
      keyboardavoidingview: "div",
      safeareaview: "div",
      pressable: "button",
      touchableopacity: "button",
      touchablehighlight: "button",
      switch: "input",
      // type='checkbox'
      textarea: "textarea",
      button: "button",
      modal: "div",
      activityindicator: "div",
      refreshcontrol: "div"
    };
    return webMap[type.toLowerCase().replace(/-/g, "")] || "div";
  }
  if (platform2 === "mobile") {
    const mobileMap = {
      view: "View",
      text: "Text",
      image: "Image",
      imagebackground: "ImageBackground",
      scrollview: "ScrollView",
      flatlist: "FlatList",
      sectionlist: "SectionList",
      keyboardavoidingview: "KeyboardAvoidingView",
      safeareaview: "SafeAreaView",
      pressable: "Pressable",
      touchableopacity: "TouchableOpacity",
      touchablehighlight: "TouchableHighlight",
      switch: "Switch",
      modal: "Modal",
      activityindicator: "ActivityIndicator",
      refreshcontrol: "RefreshControl",
      button: "Button"
    };
    const rnName = mobileMap[type.toLowerCase().replace(/-/g, "")] || capitalize(type);
    try {
      if (typeof __require !== "undefined") {
        return __require("react-native")[rnName];
      } else if (typeof window !== "undefined" && window.React && window.React.Native) {
        return window.React.Native[rnName];
      }
    } catch (e) {
      console.warn(`React Native component ${rnName} not found`);
    }
    return "View";
  }
  return "div";
}

// node_modules/indjs/src/apis/style-sheet.mjs
var StyleSheet = {
  create: (styles) => styles,
  flatten: (styles) => {
    if (!styles) return {};
    if (Array.isArray(styles)) {
      return styles.flat(Infinity).reduce((acc, item) => item ? { ...acc, ...item } : acc, {});
    }
    return styles;
  },
  hairlineWidth: 1,
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  absoluteFillObject: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};
var style_sheet_default = StyleSheet;

// node_modules/indjs/src/components/image.jsx
import { jsx } from "react/jsx-runtime";
var Image = forwardRef(({ style, source, src, ...rest }, ref) => {
  const Component = resolveElement("image");
  const imageSource = src || source && source.uri || "";
  const props = {
    ...rest,
    src: imageSource,
    ref
  };
  if (Component !== "img" && Component !== "image") {
    props.source = source || { uri: src };
    delete props.src;
  }
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx(Component, { style: flatStyle, ...props });
});
Image.displayName = "Image";

// node_modules/indjs/src/components/link.jsx
import React3 from "react";

// node_modules/indjs/src/components/view.jsx
import React4, { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var View = forwardRef2(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("view");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx2(
    Component,
    {
      ref,
      style: flatStyle,
      className: className || "",
      ...rest,
      children
    }
  );
});
View.displayName = "View";
var view_default = View;

// node_modules/indjs/src/components/text.jsx
import React5, { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Text = forwardRef3(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("text");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx3(
    Component,
    {
      ref,
      style: flatStyle,
      className: className || "",
      ...rest,
      children
    }
  );
});
Text.displayName = "Text";
var text_default = Text;

// node_modules/indjs/src/components/scroll-view.jsx
import React6, { forwardRef as forwardRef4 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var ScrollView = forwardRef4(
  ({
    children,
    style,
    contentContainerStyle,
    horizontal = false,
    showsHorizontalScrollIndicator = true,
    showsVerticalScrollIndicator = true,
    className,
    ...rest
  }, ref) => {
    const Component = resolveElement("scrollview");
    if (Component === "div" || Component === "view") {
      const containerStyle = {
        overflowX: horizontal ? "auto" : "hidden",
        overflowY: horizontal ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? "none" : "auto",
        msOverflowStyle: (horizontal ? !showsHorizontalScrollIndicator : !showsVerticalScrollIndicator) ? "none" : "auto",
        ...style_sheet_default.flatten(style)
      };
      const contentStyle = style_sheet_default.flatten([contentContainerStyle]);
      return /* @__PURE__ */ jsx4("div", { ref, style: containerStyle, className, ...rest, children: /* @__PURE__ */ jsx4("div", { style: contentStyle, children }) });
    }
    return /* @__PURE__ */ jsx4(
      Component,
      {
        ref,
        style,
        contentContainerStyle,
        horizontal,
        showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator,
        className,
        ...rest,
        children
      }
    );
  }
);
ScrollView.displayName = "ScrollView";
var scroll_view_default = ScrollView;

// node_modules/indjs/src/components/text-input.jsx
import React7, { forwardRef as forwardRef5 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var TextInput = forwardRef5(
  ({
    value,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
    placeholder,
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 4,
    editable = true,
    style,
    className,
    ...rest
  }, ref) => {
    const handleChange = (e) => {
      if (onChangeText) onChangeText(e.target.value);
    };
    const commonStyle = {
      appearance: "none",
      outline: "none",
      boxSizing: "border-box",
      ...style_sheet_default.flatten(style)
    };
    if (multiline) {
      return /* @__PURE__ */ jsx5(
        "textarea",
        {
          ref,
          defaultValue,
          value,
          onChange: handleChange,
          onFocus,
          onBlur,
          placeholder,
          readOnly: !editable,
          rows: numberOfLines,
          style: { ...commonStyle, resize: "none" },
          className: className || "",
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx5(
      "input",
      {
        ref,
        type: secureTextEntry ? "password" : "text",
        defaultValue,
        value,
        onChange: handleChange,
        onFocus,
        onBlur,
        placeholder,
        readOnly: !editable,
        style: commonStyle,
        className: className || "",
        ...rest
      }
    );
  }
);
TextInput.displayName = "TextInput";

// node_modules/indjs/src/components/button.jsx
import React8, { forwardRef as forwardRef6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button = forwardRef6(
  ({ title, onPress, color, disabled, className, ...rest }, ref) => {
    const Component = resolveElement("button");
    if (Component === "button" || Component === "div") {
      const flatStyle = style_sheet_default.flatten([
        {
          cursor: "pointer",
          backgroundColor: color || void 0,
          opacity: disabled ? 0.5 : 1
        },
        rest.style
      ]);
      return /* @__PURE__ */ jsx6(
        "button",
        {
          ref,
          onClick: onPress,
          disabled,
          className: className || "",
          style: flatStyle,
          type: "button",
          ...rest,
          children: title
        }
      );
    }
    return /* @__PURE__ */ jsx6(
      Component,
      {
        ref,
        title,
        onPress,
        color,
        disabled,
        className: className || "",
        ...rest
      }
    );
  }
);
Button.displayName = "Button";

// node_modules/indjs/src/components/activity-indicator.jsx
import React9, { forwardRef as forwardRef7 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ActivityIndicator = forwardRef7(
  ({ size = "small", color = "#999", style, className, ...rest }, ref) => {
    const Component = resolveElement("activityindicator");
    if (Component === "div" || Component === "view") {
      const dimension = size === "small" ? 20 : 40;
      const spinnerStyle = {
        width: dimension,
        height: dimension,
        border: `2px solid ${color}33`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "indjs-spin 0.8s linear infinite",
        display: "inline-block",
        boxSizing: "border-box",
        ...style_sheet_default.flatten(style)
      };
      if (typeof document !== "undefined" && !document.getElementById("indjs-spin-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "indjs-spin-style";
        styleEl.innerHTML = `@keyframes indjs-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(styleEl);
      }
      return /* @__PURE__ */ jsx7(
        "div",
        {
          ref,
          style: spinnerStyle,
          className: className || "",
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx7(
      Component,
      {
        ref,
        size,
        color,
        style,
        className: className || "",
        ...rest
      }
    );
  }
);
ActivityIndicator.displayName = "ActivityIndicator";

// node_modules/indjs/src/components/switch.jsx
import React10, { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch = forwardRef8(
  ({ value, onValueChange, disabled, trackColor, thumbColor, style, className, ...rest }, ref) => {
    const Component = resolveElement("switch");
    if (Component === "input" || Component === "div") {
      return /* @__PURE__ */ jsx8(
        "input",
        {
          ref,
          type: "checkbox",
          checked: value,
          onChange: (e) => onValueChange && onValueChange(e.target.checked),
          disabled,
          style: style_sheet_default.flatten([style]),
          className: className || "",
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx8(
      Component,
      {
        ref,
        value,
        onValueChange,
        disabled,
        trackColor,
        thumbColor,
        style,
        className: className || "",
        ...rest
      }
    );
  }
);
Switch.displayName = "Switch";

// node_modules/indjs/src/components/flat-list.jsx
import React11, { forwardRef as forwardRef9 } from "react";
import { jsx as jsx9, jsxs } from "react/jsx-runtime";
var FlatList = forwardRef9(
  ({
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    contentContainerStyle,
    numColumns = 1,
    horizontal = false,
    ...rest
  }, ref) => {
    const Component = resolveElement("flatlist");
    if (Component === "div" || Component === "view") {
      if (!data || data.length === 0) {
        if (ListEmptyComponent) {
          const Empty = React11.isValidElement(ListEmptyComponent) ? ListEmptyComponent : /* @__PURE__ */ jsx9(ListEmptyComponent, {});
          return /* @__PURE__ */ jsxs(
            scroll_view_default,
            {
              contentContainerStyle,
              horizontal,
              ref,
              ...rest,
              children: [
                ListHeaderComponent && (React11.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
                Empty,
                ListFooterComponent && (React11.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
              ]
            }
          );
        }
      }
      const items = data || [];
      const renderList = () => {
        return items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index.toString();
          return /* @__PURE__ */ jsx9(React11.Fragment, { children: renderItem({ item, index }) }, key);
        });
      };
      const flatContentStyle = style_sheet_default.flatten([contentContainerStyle]);
      return /* @__PURE__ */ jsxs(
        scroll_view_default,
        {
          contentContainerStyle: flatContentStyle,
          horizontal,
          ref,
          ...rest,
          children: [
            ListHeaderComponent && (React11.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
            renderList(),
            ListFooterComponent && (React11.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx9(
      Component,
      {
        ref,
        data,
        renderItem,
        keyExtractor,
        ListHeaderComponent,
        ListFooterComponent,
        ListEmptyComponent,
        contentContainerStyle,
        numColumns,
        horizontal,
        ...rest
      }
    );
  }
);
FlatList.displayName = "FlatList";

// node_modules/indjs/src/components/touchable-opacity.jsx
import React12, { forwardRef as forwardRef10 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var TouchableOpacity = forwardRef10(
  ({ children, style, onPress, activeOpacity = 0.2, className, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx10(
        "button",
        {
          ref,
          style: style_sheet_default.flatten([
            { cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", font: "inherit", display: "flex", flexDirection: "column", transition: "opacity 0.15s ease" },
            style
          ]),
          onClick: onPress,
          className: className || "",
          type: "button",
          onMouseDown: (e) => e.currentTarget.style.opacity = activeOpacity,
          onMouseUp: (e) => e.currentTarget.style.opacity = 1,
          onMouseLeave: (e) => e.currentTarget.style.opacity = 1,
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx10(
      Component,
      {
        ref,
        style,
        onPress,
        activeOpacity,
        className: className || "",
        ...rest,
        children
      }
    );
  }
);
TouchableOpacity.displayName = "TouchableOpacity";

// node_modules/indjs/src/components/pressable.jsx
import React13, { forwardRef as forwardRef11 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Pressable = forwardRef11(({ children, style, onPress, className, ...rest }, ref) => {
  const Component = resolveElement("pressable");
  if (Component === "button" || Component === "div") {
    const flatStyle = style_sheet_default.flatten([
      { cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left", font: "inherit", display: "flex", flexDirection: "column" },
      typeof style === "function" ? style({ pressed: false }) : style
    ]);
    return /* @__PURE__ */ jsx11(
      "button",
      {
        ref,
        style: flatStyle,
        onClick: onPress,
        className: className || "",
        type: "button",
        ...rest,
        children: typeof children === "function" ? children({ pressed: false }) : children
      }
    );
  }
  return /* @__PURE__ */ jsx11(Component, { ref, style, onPress, className: className || "", ...rest, children });
});
Pressable.displayName = "Pressable";
var pressable_default = Pressable;

// node_modules/indjs/src/components/image-background.jsx
import React14, { forwardRef as forwardRef12 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var ImageBackground = forwardRef12(
  ({ children, style, imageStyle, source, src, resizeMode = "cover", ...rest }, ref) => {
    const Component = resolveElement("imagebackground");
    const imageSource = src || source && source.uri || "";
    if (Component === "div" || Component === "view") {
      const flatStyle = style_sheet_default.flatten([
        {
          position: "relative",
          backgroundImage: `url(${imageSource})`,
          backgroundSize: resizeMode === "stretch" ? "100% 100%" : resizeMode,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        },
        style
      ]);
      return /* @__PURE__ */ jsx12("div", { ref, style: flatStyle, ...rest, children });
    }
    return /* @__PURE__ */ jsx12(
      Component,
      {
        ref,
        style,
        imageStyle,
        source: source || { uri: src },
        resizeMode,
        ...rest,
        children
      }
    );
  }
);
ImageBackground.displayName = "ImageBackground";

// node_modules/indjs/src/components/modal.jsx
import React15, { forwardRef as forwardRef13 } from "react";
import ReactDOM from "react-dom";
import { jsx as jsx13 } from "react/jsx-runtime";
var Modal = forwardRef13(
  ({
    children,
    visible,
    transparent,
    animationType,
    onRequestClose,
    style,
    ...rest
  }, ref) => {
    const Component = resolveElement("modal");
    if (Component === "div" || Component === "view") {
      if (!visible) return null;
      const modalStyle = {
        ...style_sheet_default.flatten(style)
      };
      const content = /* @__PURE__ */ jsx13("div", { ref, style: modalStyle, ...rest, children });
      if (typeof document !== "undefined") {
        return ReactDOM.createPortal(content, document.body);
      }
      return content;
    }
    return /* @__PURE__ */ jsx13(
      Component,
      {
        ref,
        visible,
        transparent,
        animationType,
        onRequestClose,
        ...rest,
        children
      }
    );
  }
);
Modal.displayName = "Modal";

// node_modules/indjs/src/components/safe-area-view.jsx
import React16, { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var SafeAreaView = forwardRef14(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");
  if (Component === "div" || Component === "view") {
    const flatStyle = style_sheet_default.flatten([
      {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        flex: 1
      },
      style
    ]);
    return /* @__PURE__ */ jsx14("div", { ref, style: flatStyle, className: className || "", ...rest, children });
  }
  return /* @__PURE__ */ jsx14(Component, { ref, style, className: className || "", ...rest, children });
});
SafeAreaView.displayName = "SafeAreaView";
var safe_area_view_default = SafeAreaView;

// node_modules/indjs/src/components/status-bar.jsx
import React17 from "react";

// node_modules/indjs/src/components/section-list.jsx
import React18, { forwardRef as forwardRef15 } from "react";
import { jsx as jsx15, jsxs as jsxs2 } from "react/jsx-runtime";
var SectionList = forwardRef15(
  ({
    sections,
    renderItem,
    renderSectionHeader,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    contentContainerStyle,
    stickySectionHeadersEnabled = true,
    ...rest
  }, ref) => {
    const Component = resolveElement("sectionlist");
    if (Component === "div" || Component === "view") {
      const renderSections = () => {
        return (sections || []).map((section, sectionIndex) => {
          const data = section.data || [];
          const key = section.key || sectionIndex.toString();
          return /* @__PURE__ */ jsxs2(React18.Fragment, { children: [
            renderSectionHeader && renderSectionHeader({ section }),
            data.map((item, itemIndex) => {
              const itemKey = keyExtractor ? keyExtractor(item, itemIndex) : item.key || item.id || key + "-" + itemIndex;
              return /* @__PURE__ */ jsx15(React18.Fragment, { children: renderItem({ item, index: itemIndex, section }) }, itemKey);
            })
          ] }, key);
        });
      };
      return /* @__PURE__ */ jsxs2(
        scroll_view_default,
        {
          contentContainerStyle,
          ref,
          ...rest,
          children: [
            ListHeaderComponent && (React18.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx15(ListHeaderComponent, {})),
            renderSections(),
            ListFooterComponent && (React18.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx15(ListFooterComponent, {}))
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx15(
      Component,
      {
        ref,
        sections,
        renderItem,
        renderSectionHeader,
        keyExtractor,
        ListHeaderComponent,
        ListFooterComponent,
        contentContainerStyle,
        stickySectionHeadersEnabled,
        ...rest
      }
    );
  }
);
SectionList.displayName = "SectionList";

// node_modules/indjs/src/components/keyboard-avoiding-view.jsx
import React19, { forwardRef as forwardRef16 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var KeyboardAvoidingView = forwardRef16(
  ({
    children,
    style,
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    enabled,
    className,
    ...rest
  }, ref) => {
    const Component = resolveElement("keyboardavoidingview");
    if (Component === "div" || Component === "view") {
      return /* @__PURE__ */ jsx16(
        "div",
        {
          ref,
          style: style_sheet_default.flatten([{ flex: 1 }, style]),
          className: className || "",
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx16(
      Component,
      {
        ref,
        style,
        behavior,
        contentContainerStyle,
        keyboardVerticalOffset,
        enabled,
        className: className || "",
        ...rest,
        children
      }
    );
  }
);
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

// node_modules/indjs/src/components/refresh-control.jsx
import React20, { forwardRef as forwardRef17 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var RefreshControl = forwardRef17(({ refreshing, onRefresh, className, ...rest }, ref) => {
  const Component = resolveElement("refreshcontrol");
  if (Component === "div") {
    return null;
  }
  return /* @__PURE__ */ jsx17(
    Component,
    {
      ref,
      refreshing,
      onRefresh,
      className: className || "",
      ...rest
    }
  );
});
RefreshControl.displayName = "RefreshControl";

// node_modules/indjs/src/components/touchable-highlight.jsx
import React21, { forwardRef as forwardRef18 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var TouchableHighlight = forwardRef18(
  ({
    children,
    style,
    onPress,
    underlayColor = "black",
    activeOpacity = 0.85,
    ...rest
  }, ref) => {
    const Component = resolveElement("touchablehighlight");
    if (Component === "button" || Component === "div") {
      const flatStyle = style_sheet_default.flatten([{ cursor: "pointer" }, style]);
      return /* @__PURE__ */ jsx18(
        "button",
        {
          ref,
          style: flatStyle,
          onClick: onPress,
          onMouseDown: (e) => {
            e.currentTarget.style.backgroundColor = underlayColor;
            e.currentTarget.style.opacity = activeOpacity;
          },
          onMouseUp: (e) => {
            e.currentTarget.style.backgroundColor = flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = flatStyle.backgroundColor || "transparent";
            e.currentTarget.style.opacity = 1;
          },
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx18(
      Component,
      {
        ref,
        style,
        onPress,
        underlayColor,
        activeOpacity,
        ...rest,
        children
      }
    );
  }
);
TouchableHighlight.displayName = "TouchableHighlight";

// node_modules/indjs/src/components/touchable-without-feedback.jsx
import React22, { cloneElement, Children } from "react";

// node_modules/indjs/src/components/screen.jsx
import React23, { forwardRef as forwardRef19 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Screen = forwardRef19(({ children, background = "light", className = "", style, ...props }, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx19(view_default, { ref, className: finalClass, style, ...props, children });
});
Screen.displayName = "Screen";

// node_modules/indjs/src/components/container.jsx
import React24, { forwardRef as forwardRef20 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Container = forwardRef20(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx20(view_default, { ref, className: finalClass, style, ...props, children });
});
Container.displayName = "Container";

// node_modules/indjs/src/components/card.jsx
import React25, { forwardRef as forwardRef21 } from "react";
import { jsx as jsx21 } from "react/jsx-runtime";
var Card = forwardRef21(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx21(view_default, { ref, className: finalClass, style, ...props, children });
});
Card.displayName = "Card";

// node_modules/indjs/src/components/grid.jsx
import React26, { forwardRef as forwardRef22 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var Grid = forwardRef22(({
  children,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx22(view_default, { ref, className: finalClass, style, ...props, children });
});
Grid.displayName = "Grid";

// node_modules/indjs/src/components/stack.jsx
import React27, { forwardRef as forwardRef23 } from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var Stack = forwardRef23(({
  children,
  direction = "vertical",
  spacing = 4,
  align = "start",
  justify = "start",
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx23(view_default, { ref, className: finalClass, style, ...props, children });
});
Stack.displayName = "Stack";

// node_modules/indjs/src/components/icon.jsx
import React28, { forwardRef as forwardRef24 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var Icon = forwardRef24(({
  name,
  className = "",
  style,
  ...props
}, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx24(text_default, { ref, className: finalClass, style, ...props, children: name });
});
Icon.displayName = "Icon";

// node_modules/indjs/src/apis/dimensions.mjs
import { EventEmitter } from "events";
var listeners = new EventEmitter();
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    listeners.emit("change", { window: getWindow(), screen: getScreen() });
  });
}
function getWindow() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: window.devicePixelRatio || 1,
    fontScale: 1
  };
}
function getScreen() {
  if (typeof window === "undefined")
    return { width: 0, height: 0, scale: 1, fontScale: 1 };
  return {
    width: window.screen.width,
    height: window.screen.height,
    scale: window.devicePixelRatio || 1,
    fontScale: 1
  };
}

// node_modules/indjs/src/apis/linking.mjs
import { EventEmitter as EventEmitter2 } from "events";
var eventEmitter = new EventEmitter2();

// utils/store.js
import { configureStore } from "@reduxjs/toolkit";

// utils/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  tasks: [
    {
      id: "1",
      title: "Welcome to Task Manager!",
      description: "This is a sample task. Click the checkbox to mark it as complete, or delete it.",
      priority: "high",
      category: "Personal",
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      dueDate: new Date(Date.now() + 864e5).toISOString().split("T")[0]
    },
    {
      id: "2",
      title: "Try adding a new task",
      description: "Click the + button to create your own tasks",
      priority: "medium",
      category: "Work",
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]
};
var taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    }
  }
});
var { addTask, toggleTask, deleteTask, updateTask } = taskSlice.actions;
var taskSlice_default = taskSlice.reducer;

// utils/store.js
var store = configureStore({
  reducer: {
    tasks: taskSlice_default
  }
});

// components/BottomNav.jsx
import React29 from "react";
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function BottomNav() {
  const router = useRouter();
  const currentPath = router.pathname;
  const navItems = [
    { id: "tasks", path: "/", label: "Tasks", icon: "\u{1F4DD}", activeIcon: "\u2705" },
    { id: "categories", path: "/categories", label: "Categories", icon: "\u{1F4C1}", activeIcon: "\u{1F4C2}" },
    { id: "statistics", path: "/statistics", label: "Stats", icon: "\u{1F4CA}", activeIcon: "\u{1F4C8}" },
    { id: "profile", path: "/profile", label: "Profile", icon: "\u{1F464}", activeIcon: "\u{1F468}" }
  ];
  return /* @__PURE__ */ jsx25(view_default, { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50", children: /* @__PURE__ */ jsx25(view_default, { className: "flex flex-row items-center justify-around px-2 py-3 pb-safe", children: navItems.map((item, index) => {
    const isActive = currentPath === item.path;
    return /* @__PURE__ */ jsx25(
      pressable_default,
      {
        onPress: () => router.push(item.path),
        className: "flex-1 flex items-center justify-center py-2",
        children: /* @__PURE__ */ jsxs3(view_default, { className: `flex items-center justify-center transition-all duration-300 ${isActive ? "transform scale-110" : ""}`, children: [
          /* @__PURE__ */ jsx25(view_default, { className: `w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-transparent"}`, children: /* @__PURE__ */ jsx25(text_default, { className: "text-2xl", children: isActive ? item.activeIcon : item.icon }) }),
          /* @__PURE__ */ jsx25(text_default, { className: `text-xs font-medium ${isActive ? "text-violet-600" : "text-gray-600"}`, children: item.label })
        ] })
      },
      index
    );
  }) }) });
}

// pages/_layout.jsx
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
function Layout({ children }) {
  return /* @__PURE__ */ jsx26(Provider, { store, children: /* @__PURE__ */ jsx26(safe_area_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs4(view_default, { className: "min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: [
    /* @__PURE__ */ jsx26(view_default, { className: "bg-white shadow-md sticky top-0 z-40 backdrop-blur-lg bg-opacity-90", children: /* @__PURE__ */ jsx26(view_default, { className: "width-full max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxs4(view_default, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxs4(view_default, { className: "flex flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsx26(view_default, { className: "w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx26("svg", { className: "w-6 h-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
        /* @__PURE__ */ jsx26(text_default, { className: "text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent", children: "TaskFlow" })
      ] }),
      /* @__PURE__ */ jsx26(pressable_default, { className: "w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center transition-colors duration-300", children: /* @__PURE__ */ jsx26(text_default, { className: "text-xl", children: "\u{1F514}" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx26(view_default, { className: "pb-24 flex-1", children }),
    /* @__PURE__ */ jsx26(BottomNav, {})
  ] }) }) });
}
export {
  Layout as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvX2xheW91dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9yb3V0aW5nL3JvdXRlci5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9wbGF0Zm9ybS5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL3VuaXZlcnNhbC9yZXNvbHZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9zdHlsZS1zaGVldC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2xpbmsuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy92aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3Njcm9sbC12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC1pbnB1dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N3aXRjaC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ZsYXQtbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvcHJlc3NhYmxlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UtYmFja2dyb3VuZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL21vZGFsLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zdGF0dXMtYmFyLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2VjdGlvbi1saXN0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQtYXZvaWRpbmctdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3JlZnJlc2gtY29udHJvbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1oaWdobGlnaHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NjcmVlbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NhcmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9ncmlkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pY29uLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2xpbmtpbmcubWpzIiwgIi4uLy4uL3V0aWxzL3N0b3JlLmpzIiwgIi4uLy4uL3V0aWxzL3Rhc2tTbGljZS5qcyIsICIuLi8uLi9jb21wb25lbnRzL0JvdHRvbU5hdi5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFZpZXcsIFRleHQsIFNhZmVBcmVhVmlldywgUHJlc3NhYmxlIH0gZnJvbSAnaW5kanMnO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuLi91dGlscy9zdG9yZSc7XG5pbXBvcnQgQm90dG9tTmF2IGZyb20gJy4uL2NvbXBvbmVudHMvQm90dG9tTmF2JztcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF5b3V0KHsgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFNhZmVBcmVhVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHZpYS1wdXJwbGUtNTAgdG8tZnVjaHNpYS01MFwiPlxuICAgICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgc2hhZG93LW1kIHN0aWNreSB0b3AtMCB6LTQwIGJhY2tkcm9wLWJsdXItbGcgYmctb3BhY2l0eS05MFwiPlxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwid2lkdGgtZnVsbCBtYXgtdy03eGwgbXgtYXV0byBweC00IHB5LTRcIj5cbiAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInctMTAgaC0xMCBiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXdoaXRlXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgNUg3YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMmgxMGEyIDIgMCAwMDItMlY3YTIgMiAwIDAwLTItMmgtMk05IDVhMiAyIDAgMDAyIDJoMmEyIDIgMCAwMDItMk05IDVhMiAyIDAgMDEyLTJoMmEyIDIgMCAwMTIgMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgVGFza0Zsb3dcbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgICAgICAgICA8UHJlc3NhYmxlIGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIGJnLWdyYXktMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bFwiPlx1RDgzRFx1REQxNDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDwvVmlldz5cblxuICAgICAgICAgIHsvKiBNYWluIENvbnRlbnQgKi99XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwicGItMjQgZmxleC0xXCI+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgICAgey8qIEJvdHRvbSBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgIDxCb3R0b21OYXYgLz5cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9TYWZlQXJlYVZpZXc+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcbn0iLCAiLyoqXG4gKiB1c2VSb3V0ZXIoKVxuICpcbiAqIE1pbmltYWwgcm91dGVyIGhvb2sgaW5zcGlyZWQgYnkgTmV4dC5qcy5cbiAqIFByb3ZpZGVzIHBhdGhuYW1lLCBxdWVyeSwgYXNQYXRoIGFuZCBuYXZpZ2F0aW9uIGhlbHBlcnMuXG4gKlxuICogQVBJOlxuICogLSBwYXRobmFtZTogc3RyaW5nXG4gKiAtIHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT5cbiAqIC0gYXNQYXRoOiBzdHJpbmdcbiAqIC0gcHVzaCh1cmw6IHN0cmluZyk6IHZvaWRcbiAqIC0gcmVwbGFjZSh1cmw6IHN0cmluZyk6IHZvaWRcbiAqIC0gYmFjaygpOiB2b2lkXG4gKiAtIHJlbG9hZCgpOiB2b2lkXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gTWluaW1hbCBSb3V0ZXIgdXRpbGl0aWVzIGluc3BpcmVkIGJ5IE5leHQuanMgdXNlUm91dGVyXG4vLyBQcm92aWRlczogdXNlUm91dGVyKCkgd2l0aCBwdXNoLCByZXBsYWNlLCBwYXRobmFtZSwgc2VhcmNoLCBoYXNoIGFuZCBxdWVyeVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICBjb25zdCBxID0ge307XG4gIGNvbnN0IHVzcCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc2VhcmNoIHx8IFwiXCIpO1xuICBmb3IgKGNvbnN0IFtrLCB2XSBvZiB1c3AuZW50cmllcygpKSB7XG4gICAgaWYgKHFba10gPT09IHVuZGVmaW5lZCkgcVtrXSA9IHY7XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxW2tdKSkgcVtrXS5wdXNoKHYpO1xuICAgIGVsc2UgcVtrXSA9IFtxW2tdLCB2XTtcbiAgfVxuICByZXR1cm4gcTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiAoe1xuICAgIHBhdGhuYW1lOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIDogXCIvXCIsXG4gICAgc2VhcmNoOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLnNlYXJjaCA6IFwiXCIsXG4gICAgaGFzaDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5oYXNoIDogXCJcIixcbiAgfSkpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZnVuY3Rpb24gb25Qb3AoKSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHBhdGhuYW1lOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgaGFzaDogd2luZG93LmxvY2F0aW9uLmhhc2gsXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBvblBvcCk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgb25Qb3ApO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaHJlZkZyb20gPSAodXJsKSA9PiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIiA/IHVybCA6IFN0cmluZyh1cmwgfHwgXCJcIikpO1xuXG4gIGNvbnN0IG5hdmlnYXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKHVybCwgeyByZXBsYWNlID0gZmFsc2UgfSA9IHt9KSA9PiB7XG4gICAgY29uc3QgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgbGV0IHU7XG4gICAgdHJ5IHtcbiAgICAgIHUgPSBuZXcgVVJMKGhyZWZGcm9tKHVybCksIGJhc2UpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0ID0gdS5wYXRobmFtZSArIHUuc2VhcmNoICsgdS5oYXNoO1xuICAgIGlmIChyZXBsYWNlKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICBzZXRTdGF0ZSh7IHBhdGhuYW1lOiB1LnBhdGhuYW1lLCBzZWFyY2g6IHUuc2VhcmNoLCBoYXNoOiB1Lmhhc2ggfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwdXNoID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKHVybCkgPT4gbmF2aWdhdGUodXJsLCB7IHJlcGxhY2U6IGZhbHNlIH0pLFxuICAgIFtuYXZpZ2F0ZV0sXG4gICk7XG4gIGNvbnN0IHJlcCA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICh1cmwpID0+IG5hdmlnYXRlKHVybCwgeyByZXBsYWNlOiB0cnVlIH0pLFxuICAgIFtuYXZpZ2F0ZV0sXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogc3RhdGUucGF0aG5hbWUsXG4gICAgcXVlcnk6IHBhcnNlUXVlcnkoc3RhdGUuc2VhcmNoKSxcbiAgICBhc1BhdGg6IHN0YXRlLnBhdGhuYW1lICsgc3RhdGUuc2VhcmNoICsgc3RhdGUuaGFzaCxcbiAgICBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcCxcbiAgICBiYWNrOiAoKSA9PiB3aW5kb3cuaGlzdG9yeS5iYWNrKCksXG4gICAgcmVsb2FkOiAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCksXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBSb3V0ZXIgPSB7IHVzZVJvdXRlciB9O1xuIiwgIi8qKlxuICogUGxhdGZvcm0gZGV0ZWN0aW9uIHV0aWxpdGllcyBmb3IgSU5ESlNcbiAqXG4gKiBVc2FnZTpcbiAqIGltcG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9IGZyb20gJ2luZGpzJztcbiAqXG4gKiBpZiAoaXNNb2JpbGUpIHsgLi4uIH1cbiAqL1xuXG4vLyBDaGVjayBpZiBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLy8gRWxlY3Ryb24gZGV0ZWN0aW9uIChyZW5kZXJlciBwcm9jZXNzKVxuZXhwb3J0IGNvbnN0IGlzRGVza3RvcCA9XG4gIGlzQnJvd3NlciAmJlxuICAod2luZG93LnByb2Nlc3M/LnR5cGUgPT09IFwicmVuZGVyZXJcIiB8fFxuICAgICEhd2luZG93LmVsZWN0cm9uIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVsZWN0cm9uXCIpKTtcblxuLy8gQ2FwYWNpdG9yIGRldGVjdGlvblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID1cbiAgaXNCcm93c2VyICYmXG4gICghIXdpbmRvdy5DYXBhY2l0b3IgfHxcbiAgICAhIXdpbmRvdy5hbmRyb2lkQnJpZGdlIHx8XG4gICAgISF3aW5kb3cud2Via2l0Py5tZXNzYWdlSGFuZGxlcnM/LmJyaWRnZSB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDYXBhY2l0b3JcIikpO1xuXG4vLyBTcGVjaWZpYyBtb2JpbGUgcGxhdGZvcm1zXG5leHBvcnQgY29uc3QgaXNBbmRyb2lkID0gaXNNb2JpbGUgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuZXhwb3J0IGNvbnN0IGlzSU9TID0gaXNNb2JpbGUgJiYgL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBXZWIgZmFsbGJhY2sgKGlmIG5vdCBkZXNrdG9wIG9yIG1vYmlsZSBhcHApXG5leHBvcnQgY29uc3QgaXNXZWIgPSAhaXNEZXNrdG9wICYmICFpc01vYmlsZTtcblxuLy8gR2V0IGN1cnJlbnQgcGxhdGZvcm0gbmFtZVxuZXhwb3J0IGNvbnN0IHBsYXRmb3JtID0gKCgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCkgcmV0dXJuIFwiZGVza3RvcFwiO1xuICBpZiAoaXNBbmRyb2lkKSByZXR1cm4gXCJhbmRyb2lkXCI7XG4gIGlmIChpc0lPUykgcmV0dXJuIFwiaW9zXCI7XG4gIGlmIChpc01vYmlsZSkgcmV0dXJuIFwibW9iaWxlXCI7IC8vIGZhbGxiYWNrXG4gIHJldHVybiBcIndlYlwiO1xufSkoKTtcblxuLy8gUmVhY3QgTmF0aXZlIGNvbXBhdGlibGUgQVBJXG5leHBvcnQgY29uc3QgT1MgPSBwbGF0Zm9ybTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChvYmopID0+IHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShPUykpIHJldHVybiBvYmpbT1NdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwibmF0aXZlXCIpICYmIGlzTW9iaWxlKSByZXR1cm4gb2JqW1wibmF0aXZlXCJdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwiZGVmYXVsdFwiKSkgcmV0dXJuIG9ialtcImRlZmF1bHRcIl07XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbiAgT1MsXG4gIHNlbGVjdCxcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2UgPSBmb3J3YXJkUmVmKCh7IHN0eWxlLCBzb3VyY2UsIHNyYywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZVwiKTtcblxuICAvLyBSZWFjdCBOYXRpdmUgdXNlcyAnc291cmNlJywgV2ViIHVzZXMgJ3NyYycuXG4gIC8vIFdlIHN1cHBvcnQgYm90aCBwcm9wcyBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4ucmVzdCxcbiAgICBzcmM6IGltYWdlU291cmNlLFxuICAgIHJlZixcbiAgfTtcblxuICBpZiAoQ29tcG9uZW50ICE9PSBcImltZ1wiICYmIENvbXBvbmVudCAhPT0gXCJpbWFnZVwiKSB7XG4gICAgLy8gSWYgaXQgcmVmZXJzIHRvIFJlYWN0IE5hdGl2ZSBJbWFnZSwgaXQgZXhwZWN0cyAnc291cmNlJ1xuICAgIHByb3BzLnNvdXJjZSA9IHNvdXJjZSB8fCB7IHVyaTogc3JjIH07XG4gICAgZGVsZXRlIHByb3BzLnNyYztcbiAgfVxuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucHJvcHN9IC8+O1xufSk7XG5cbkltYWdlLmRpc3BsYXlOYW1lID0gXCJJbWFnZVwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCAiZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSB0eXBlb2YgUExBVEZPUk0gIT09IFwidW5kZWZpbmVkXCIgPyBQTEFURk9STSA6IFwid2ViXCI7XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndlYlwiKSB7XG4gICAgY29uc3Qgd2ViTWFwID0ge1xuICAgICAgdmlldzogXCJkaXZcIixcbiAgICAgIHRleHQ6IFwic3BhblwiLFxuICAgICAgaW1hZ2U6IFwiaW1nXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiZGl2XCIsIC8vIG1hcCBpbWFnZS1iYWNrZ3JvdW5kIHRvIGRpdiB3aXRoIHN0eWxlXG4gICAgICBzY3JvbGx2aWV3OiBcImRpdlwiLFxuICAgICAgZmxhdGxpc3Q6IFwiZGl2XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJkaXZcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcImRpdlwiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcImRpdlwiLFxuICAgICAgcHJlc3NhYmxlOiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJidXR0b25cIixcbiAgICAgIHN3aXRjaDogXCJpbnB1dFwiLCAvLyB0eXBlPSdjaGVja2JveCdcbiAgICAgIHRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICBidXR0b246IFwiYnV0dG9uXCIsXG4gICAgICBtb2RhbDogXCJkaXZcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcImRpdlwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiZGl2XCIsXG4gICAgfTtcbiAgICByZXR1cm4gd2ViTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBcImRpdlwiO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIm1vYmlsZVwiKSB7XG4gICAgLy8gSW4gUmVhY3QgTmF0aXZlLCBjb21wb25lbnRzIGFyZSBDYW1lbENhc2VcbiAgICAvLyBXZSBuZWVkIHRvIG1hcCBnZW5lcmljIG5hbWVzIHRvIFJOIG5hbWVzXG4gICAgY29uc3QgbW9iaWxlTWFwID0ge1xuICAgICAgdmlldzogXCJWaWV3XCIsXG4gICAgICB0ZXh0OiBcIlRleHRcIixcbiAgICAgIGltYWdlOiBcIkltYWdlXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiSW1hZ2VCYWNrZ3JvdW5kXCIsXG4gICAgICBzY3JvbGx2aWV3OiBcIlNjcm9sbFZpZXdcIixcbiAgICAgIGZsYXRsaXN0OiBcIkZsYXRMaXN0XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJTZWN0aW9uTGlzdFwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJTYWZlQXJlYVZpZXdcIixcbiAgICAgIHByZXNzYWJsZTogXCJQcmVzc2FibGVcIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiVG91Y2hhYmxlT3BhY2l0eVwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiLFxuICAgICAgc3dpdGNoOiBcIlN3aXRjaFwiLFxuICAgICAgbW9kYWw6IFwiTW9kYWxcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcIkFjdGl2aXR5SW5kaWNhdG9yXCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJSZWZyZXNoQ29udHJvbFwiLFxuICAgICAgYnV0dG9uOiBcIkJ1dHRvblwiLFxuICAgIH07XG4gICAgY29uc3Qgcm5OYW1lID1cbiAgICAgIG1vYmlsZU1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgY2FwaXRhbGl6ZSh0eXBlKTtcblxuICAgIC8vIFNhZmV0eSBjaGVjayBmb3IgUmVhY3QgTmF0aXZlIGVudmlyb25tZW50XG4gICAgLy8gcmVhY3QtbmF0aXZlLXdlYiBtaWdodCBiZSBhbGlhc2VkLCBvciB3ZSBtaWdodCBiZSBpbiBhIHJlYWwgUk4gZW52aXJvbm1lbnRcbiAgICB0cnkge1xuICAgICAgLy8gVXNpbmcgZ2xvYmFsIGNoZWNrIG9yIHNhZmUgcmVxdWlyZVxuICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicmVhY3QtbmF0aXZlXCIpW3JuTmFtZV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdCAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QuTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5SZWFjdC5OYXRpdmVbcm5OYW1lXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFJlYWN0IE5hdGl2ZSBjb21wb25lbnQgJHtybk5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBWaWV3IG9yIGRpdiBkZXBlbmRpbmcgb24gY29udGV4dCwgYnV0IFZpZXcgaXMgc2FmZSBlbm91Z2ggZm9yIGxvZ2ljYWwgcmV0dXJuIGlmIG1vY2tlZFxuICAgIHJldHVybiBcIlZpZXdcIjtcbiAgfVxuXG4gIHJldHVybiBcImRpdlwiO1xufVxuIiwgIi8vIE1vY2sgU3R5bGVTaGVldCBmb3IgY29tcGF0aWJpbGl0eS5cbi8vIEluIElOREpTIHdlYiwgd2UgdXN1YWxseSB1c2Ugc3RhbmRhcmQgc3R5bGUgb2JqZWN0cyBvciBDU1MuXG4vLyBUaGlzIGFsbG93cyBTdHlsZVNoZWV0LmNyZWF0ZSh7fSkgdG8gcmV0dXJuIHRoZSBvYmplY3RzIGFzLWlzLlxuXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiAoc3R5bGVzKSA9PiBzdHlsZXMsXG4gIGZsYXR0ZW46IChzdHlsZXMpID0+IHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuIHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKGl0ZW0gPyB7IC4uLmFjYywgLi4uaXRlbSB9IDogYWNjKSwge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBoYWlybGluZVdpZHRoOiAxLFxuICBhYnNvbHV0ZUZpbGw6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbiAgYWJzb2x1dGVGaWxsT2JqZWN0OiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZVNoZWV0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gSU5ESlMgTGluayBjb21wb25lbnQgLSBsaWdodHdlaWdodCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGhlbHBlclxuLy8gUGVyZm9ybXMgU1BBLWxpa2UgbmF2aWdhdGlvbiBmb3Igc2FtZS1vcmlnaW4gaW50ZXJuYWwgbGlua3MuXG4vLyBQcm9wczogaHJlZiwgcHJlZmV0Y2gsIHJlcGxhY2UsIHNjcm9sbCAoZGVmYXVsdCB0cnVlKSwgb25DbGljaywgdGFyZ2V0LCByZWwsIGNsYXNzTmFtZSwgc3R5bGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoe1xuICBocmVmLFxuICBjaGlsZHJlbixcbiAgcHJlZmV0Y2ggPSBmYWxzZSxcbiAgcmVwbGFjZSA9IGZhbHNlLFxuICBzY3JvbGwgPSB0cnVlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgLi4ucmVzdFxufSkge1xuICAvLyBCYXNpYyBwcmVmZXRjaDogaGludCB0aGUgYnJvd3NlciB2aWEgPGxpbmsgcmVsPVwicHJlZmV0Y2hcIj5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZWZldGNoIHx8ICFocmVmKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgIGwucmVsID0gXCJwcmVmZXRjaFwiO1xuICAgICAgbC5ocmVmID0gaHJlZjtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobCk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH07XG4gICAgfSBjYXRjaCB7fVxuICB9LCBbaHJlZiwgcHJlZmV0Y2hdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZSk7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIC8vIE9ubHkgaW50ZXJjZXB0IHNpbXBsZSBsZWZ0LWNsaWNrcyB3aXRob3V0IG1vZGlmaWVyIGtleXNcbiAgICBpZiAoZS5idXR0b24gIT09IDAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICghaHJlZikgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBcIl9zZWxmXCIpIHJldHVybjtcbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSW52YWxpZCBVUkwsIGxldCBicm93c2VyIGhhbmRsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBTa2lwIG5vbi1odHRwKHMpIHByb3RvY29scyBhbmQgc3BlY2lhbCBzY2hlbWVzXG4gICAgY29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG4gICAgaWYgKHByb3RvICYmIHByb3RvICE9PSBcImh0dHA6XCIgJiYgcHJvdG8gIT09IFwiaHR0cHM6XCIpIHJldHVybjtcbiAgICAvLyBFeHRlcm5hbFxuICAgIGlmICh1cmwub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgLy8gUmVzcGVjdCBkb3dubG9hZCBsaW5rc1xuICAgIGlmIChyZXN0LmRvd25sb2FkKSByZXR1cm47XG4gICAgLy8gSGFzaC1vbmx5IG5hdmlnYXRpb24gb3B0aW1pemF0aW9uXG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgbmV4dCA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaDtcbiAgICBpZiAobmV4dCA9PT0gY3VycmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBEbyBwdXNoL3JlcGxhY2Ugc3RhdGVcbiAgICBpZiAocmVwbGFjZSkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgLy8gRW1pdCBhIGN1c3RvbSBuYXZpZ2F0aW9uIGV2ZW50IHNvIHRoZSBhcHAgY2FuIGxvYWQgdGhlIHRhcmdldCBtb2R1bGVcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICAvLyBTY3JvbGwgYmVoYXZpb3JcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbEZpbmFsID1cbiAgICB0YXJnZXQgPT09IFwiX2JsYW5rXCJcbiAgICAgID8gW3JlbCwgXCJub29wZW5lclwiLCBcIm5vcmVmZXJyZXJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpXG4gICAgICA6IHJlbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJhXCIsXG4gICAge1xuICAgICAgaHJlZixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcmVsOiByZWxGaW5hbCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgLi4ucmVzdCxcbiAgICB9LFxuICAgIGNoaWxkcmVuLFxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInZpZXdcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5WaWV3LmRpc3BsYXlOYW1lID0gXCJWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHQgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRleHRcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5UZXh0LmRpc3BsYXlOYW1lID0gXCJUZXh0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNjcm9sbFZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzY3JvbGx2aWV3XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICBvdmVyZmxvd1g6IGhvcml6b250YWwgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogaG9yaXpvbnRhbCA/IFwiaGlkZGVuXCIgOiBcImF1dG9cIixcbiAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICBtc092ZXJmbG93U3R5bGU6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17Y29udGFpbmVyU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblNjcm9sbFZpZXcuZGlzcGxheU5hbWUgPSBcIlNjcm9sbFZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0SW5wdXQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgdmFsdWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICBvbkNoYW5nZVRleHQsXG4gICAgICBvbkZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzZWN1cmVUZXh0RW50cnkgPSBmYWxzZSxcbiAgICAgIG11bHRpbGluZSA9IGZhbHNlLFxuICAgICAgbnVtYmVyT2ZMaW5lcyA9IDQsXG4gICAgICBlZGl0YWJsZSA9IHRydWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGlmIChvbkNoYW5nZVRleHQpIG9uQ2hhbmdlVGV4dChlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1vblN0eWxlID0ge1xuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgIH07XG5cbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICAgIHJvd3M9e251bWJlck9mTGluZXN9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3R5bGUsIHJlc2l6ZTogXCJub25lXCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblRleHRJbnB1dC5kaXNwbGF5TmFtZSA9IFwiVGV4dElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQnV0dG9uID0gZm9yd2FyZFJlZihcbiAgKHsgdGl0bGUsIG9uUHJlc3MsIGNvbG9yLCBkaXNhYmxlZCwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgIHtcbiAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIG9wYWNpdHk6IGRpc2FibGVkID8gMC41IDogMVxuICAgICAgICB9LFxuICAgICAgICByZXN0LnN0eWxlXG4gICAgICBdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiQnV0dG9uXCI7XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQWN0aXZpdHlJbmRpY2F0b3IgPSBmb3J3YXJkUmVmKFxuICAoeyBzaXplID0gXCJzbWFsbFwiLCBjb2xvciA9IFwiIzk5OVwiLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNpemUgPT09IFwic21hbGxcIiA/IDIwIDogNDA7XG4gICAgICBjb25zdCBzcGlubmVyU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkaW1lbnNpb24sXG4gICAgICAgIGhlaWdodDogZGltZW5zaW9uLFxuICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtjb2xvcn0zM2AsXG4gICAgICAgIGJvcmRlclRvcDogYDJweCBzb2xpZCAke2NvbG9yfWAsXG4gICAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMC44cyBsaW5lYXIgaW5maW5pdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluamVjdCBrZXlmcmFtZXMgaWYgbm90IHByZXNlbnRcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZGpzLXNwaW4tc3R5bGVcIilcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZUVsLmlkID0gXCJpbmRqcy1zcGluLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYEBrZXlmcmFtZXMgaW5kanMtc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17c3Bpbm5lclN0eWxlfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzaXplPXtzaXplfVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5BY3Rpdml0eUluZGljYXRvci5kaXNwbGF5TmFtZSA9IFwiQWN0aXZpdHlJbmRpY2F0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5SW5kaWNhdG9yO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFN3aXRjaCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IHZhbHVlLCBvblZhbHVlQ2hhbmdlLCBkaXNhYmxlZCwgdHJhY2tDb2xvciwgdGh1bWJDb2xvciwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2U9e29uVmFsdWVDaGFuZ2V9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgdHJhY2tDb2xvcj17dHJhY2tDb2xvcn1cbiAgICAgICAgdGh1bWJDb2xvcj17dGh1bWJDb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblN3aXRjaC5kaXNwbGF5TmFtZSA9IFwiU3dpdGNoXCI7XG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBGbGF0TGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEVtcHR5Q29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgbnVtQ29sdW1ucyA9IDEsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiZmxhdGxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChMaXN0RW1wdHlDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBFbXB0eSA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RFbXB0eUNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICBMaXN0RW1wdHlDb21wb25lbnRcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExpc3RFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7RW1wdHl9XG4gICAgICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhIHx8IFtdO1xuICAgICAgY29uc3QgcmVuZGVyTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGluZGV4KVxuICAgICAgICAgICAgOiBpbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4IH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZsYXRDb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17ZmxhdENvbnRlbnRTdHlsZX1cbiAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJMaXN0KCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50PXtMaXN0RW1wdHlDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBudW1Db2x1bW5zPXtudW1Db2x1bW5zfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkZsYXRMaXN0LmRpc3BsYXlOYW1lID0gXCJGbGF0TGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgRmxhdExpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlT3BhY2l0eSA9IGZvcndhcmRSZWYoXG4gICh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgYWN0aXZlT3BhY2l0eSA9IDAuMiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlb3BhY2l0eVwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgICAgICB7IGN1cnNvcjogXCJwb2ludGVyXCIsIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6IDAsIHRleHRBbGlnbjogJ2xlZnQnLCBmb250OiAnaW5oZXJpdCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzIGVhc2UnIH0sXG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICAgIF0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHkpfVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVPcGFjaXR5LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVPcGFjaXR5XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVPcGFjaXR5O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFByZXNzYWJsZSA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiwgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogMCwgdGV4dEFsaWduOiAnbGVmdCcsIGZvbnQ6ICdpbmhlcml0JywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNhZmVhcmVhdmlld1wiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAge1xuICAgICAgICBwYWRkaW5nVG9wOiAnZW52KHNhZmUtYXJlYS1pbnNldC10b3ApJyxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogJ2VudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKScsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAnZW52KHNhZmUtYXJlYS1pbnNldC1sZWZ0KScsXG4gICAgICAgIHBhZGRpbmdSaWdodDogJ2VudihzYWZlLWFyZWEtaW5zZXQtcmlnaHQpJyxcbiAgICAgICAgZmxleDogMVxuICAgICAgfSxcbiAgICAgIHN0eWxlXG4gICAgXSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9IHsuLi5yZXN0fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuU2FmZUFyZWFWaWV3LmRpc3BsYXlOYW1lID0gXCJTYWZlQXJlYVZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNhZmVBcmVhVmlldztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuXG4vLyBXZWIgbW9jayBvZiBTdGF0dXNCYXIuIEluIG5hdGl2ZSBpdCB3b3VsZCBjaGFuZ2UgdGhlIGJhciBzdHlsZS5cbi8vIEluIHdlYiwgbWF5YmUgaXQgY2hhbmdlcyB0aGUgbWV0YSB0aGVtZS1jb2xvciB0YWcuXG5cbmZ1bmN0aW9uIFN0YXR1c0Jhcih7IGJhclN0eWxlID0gXCJkZWZhdWx0XCIsIGJhY2tncm91bmRDb2xvciwgaGlkZGVuID0gZmFsc2UgfSkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIC8vIEF0dGVtcHQgdG8gc2V0IHRoZW1lLWNvbG9yIG1ldGEgdGFnIGlmIGJhY2tncm91bmRDb2xvciBwcm92aWRlZFxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKTtcbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIik7XG4gICAgICAgIG1ldGEubmFtZSA9IFwidGhlbWUtY29sb3JcIjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cbiAgICAgIG1ldGEuY29udGVudCA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gIH0sIFtiYWNrZ3JvdW5kQ29sb3JdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQmFyO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTZWN0aW9uTGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBzZWN0aW9ucyxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICByZW5kZXJTZWN0aW9uSGVhZGVyLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQgPSB0cnVlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNlY3Rpb25saXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IHJlbmRlclNlY3Rpb25zID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHNlY3Rpb25zIHx8IFtdKS5tYXAoKHNlY3Rpb24sIHNlY3Rpb25JbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZWN0aW9uLmRhdGEgfHwgW107XG4gICAgICAgICAgY29uc3Qga2V5ID0gc2VjdGlvbi5rZXkgfHwgc2VjdGlvbkluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJTZWN0aW9uSGVhZGVyICYmIHJlbmRlclNlY3Rpb25IZWFkZXIoeyBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGl0ZW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGl0ZW1JbmRleClcbiAgICAgICAgICAgICAgICAgIDogaXRlbS5rZXkgfHwgaXRlbS5pZCB8fCBrZXkgKyBcIi1cIiArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aXRlbUtleX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXg6IGl0ZW1JbmRleCwgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNlY3Rpb25zPXtzZWN0aW9uc31cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcj17cmVuZGVyU2VjdGlvbkhlYWRlcn1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQ9e3N0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5TZWN0aW9uTGlzdC5kaXNwbGF5TmFtZSA9IFwiU2VjdGlvbkxpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25MaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEtleWJvYXJkQXZvaWRpbmdWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBiZWhhdmlvcixcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQsXG4gICAgICBlbmFibGVkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImtleWJvYXJkYXZvaWRpbmd2aWV3XCIpO1xuXG4gICAgLy8gT24gd2ViLCBrZXlib2FyZCBhdm9pZGluZyBpcyB1c3VhbGx5IGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvclxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgZmxleDogMSB9LCBzdHlsZV0pfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInJlZnJlc2hjb250cm9sXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICByZWZyZXNoaW5nPXtyZWZyZXNoaW5nfVxuICAgICAgb25SZWZyZXNoPXtvblJlZnJlc2h9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iLCAiaW1wb3J0IHsgY29uZmlndXJlU3RvcmUgfSBmcm9tICdAcmVkdXhqcy90b29sa2l0JztcclxuaW1wb3J0IHRhc2tSZWR1Y2VyIGZyb20gJy4vdGFza1NsaWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcclxuICAgIHJlZHVjZXI6IHtcclxuICAgICAgICB0YXNrczogdGFza1JlZHVjZXJcclxuICAgIH1cclxufSk7XHJcbiIsICJpbXBvcnQgeyBjcmVhdGVTbGljZSB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgdGFza3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnV2VsY29tZSB0byBUYXNrIE1hbmFnZXIhJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIGEgc2FtcGxlIHRhc2suIENsaWNrIHRoZSBjaGVja2JveCB0byBtYXJrIGl0IGFzIGNvbXBsZXRlLCBvciBkZWxldGUgaXQuJyxcclxuICAgICAgICAgICAgcHJpb3JpdHk6ICdoaWdoJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6ICdQZXJzb25hbCcsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgICBkdWVEYXRlOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgODY0MDAwMDApLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJzInLFxyXG4gICAgICAgICAgICB0aXRsZTogJ1RyeSBhZGRpbmcgYSBuZXcgdGFzaycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ2xpY2sgdGhlICsgYnV0dG9uIHRvIGNyZWF0ZSB5b3VyIG93biB0YXNrcycsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiAnbWVkaXVtJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6ICdXb3JrJyxcclxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn07XHJcblxyXG5jb25zdCB0YXNrU2xpY2UgPSBjcmVhdGVTbGljZSh7XHJcbiAgICBuYW1lOiAndGFza3MnLFxyXG4gICAgaW5pdGlhbFN0YXRlLFxyXG4gICAgcmVkdWNlcnM6IHtcclxuICAgICAgICBhZGRUYXNrOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS50YXNrcy51bnNoaWZ0KGFjdGlvbi5wYXlsb2FkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZVRhc2s6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBzdGF0ZS50YXNrcy5maW5kKHQgPT4gdC5pZCA9PT0gYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICAgICAgICBpZiAodGFzaykge1xyXG4gICAgICAgICAgICAgICAgdGFzay5jb21wbGV0ZWQgPSAhdGFzay5jb21wbGV0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZVRhc2s6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRhc2tzID0gc3RhdGUudGFza3MuZmlsdGVyKHQgPT4gdC5pZCAhPT0gYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS50YXNrcy5maW5kSW5kZXgodCA9PiB0LmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnRhc2tzW2luZGV4XSA9IHsgLi4uc3RhdGUudGFza3NbaW5kZXhdLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB7IGFkZFRhc2ssIHRvZ2dsZVRhc2ssIGRlbGV0ZVRhc2ssIHVwZGF0ZVRhc2sgfSA9IHRhc2tTbGljZS5hY3Rpb25zO1xyXG5leHBvcnQgZGVmYXVsdCB0YXNrU2xpY2UucmVkdWNlcjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZpZXcsIFByZXNzYWJsZSwgVGV4dCwgdXNlUm91dGVyIH0gZnJvbSAnaW5kanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQm90dG9tTmF2KCkge1xyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IHJvdXRlci5wYXRobmFtZTtcclxuXHJcbiAgICBjb25zdCBuYXZJdGVtcyA9IFtcclxuICAgICAgICB7IGlkOiAndGFza3MnLCBwYXRoOiAnLycsIGxhYmVsOiAnVGFza3MnLCBpY29uOiAnXHVEODNEXHVEQ0REJywgYWN0aXZlSWNvbjogJ1x1MjcwNScgfSxcclxuICAgICAgICB7IGlkOiAnY2F0ZWdvcmllcycsIHBhdGg6ICcvY2F0ZWdvcmllcycsIGxhYmVsOiAnQ2F0ZWdvcmllcycsIGljb246ICdcdUQ4M0RcdURDQzEnLCBhY3RpdmVJY29uOiAnXHVEODNEXHVEQ0MyJyB9LFxyXG4gICAgICAgIHsgaWQ6ICdzdGF0aXN0aWNzJywgcGF0aDogJy9zdGF0aXN0aWNzJywgbGFiZWw6ICdTdGF0cycsIGljb246ICdcdUQ4M0RcdURDQ0EnLCBhY3RpdmVJY29uOiAnXHVEODNEXHVEQ0M4JyB9LFxyXG4gICAgICAgIHsgaWQ6ICdwcm9maWxlJywgcGF0aDogJy9wcm9maWxlJywgbGFiZWw6ICdQcm9maWxlJywgaWNvbjogJ1x1RDgzRFx1REM2NCcsIGFjdGl2ZUljb246ICdcdUQ4M0RcdURDNjgnIH1cclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMCBsZWZ0LTAgcmlnaHQtMCBiZy13aGl0ZSBib3JkZXItdCBib3JkZXItZ3JheS0yMDAgc2hhZG93LWxnIHotNTBcIj5cclxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1hcm91bmQgcHgtMiBweS0zIHBiLXNhZmVcIj5cclxuICAgICAgICAgICAgICAgIHtuYXZJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBjdXJyZW50UGF0aCA9PT0gaXRlbS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiByb3V0ZXIucHVzaChpdGVtLnBhdGgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtpc0FjdGl2ZSA/ICd0cmFuc2Zvcm0gc2NhbGUtMTEwJyA6ICcnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTIgaC0xMiByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0xICR7aXNBY3RpdmUgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAnIDogJ2JnLXRyYW5zcGFyZW50J31gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FjdGl2ZSA/IGl0ZW0uYWN0aXZlSWNvbiA6IGl0ZW0uaWNvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtbWVkaXVtICR7aXNBY3RpdmUgPyAndGV4dC12aW9sZXQtNjAwJyA6ICd0ZXh0LWdyYXktNjAwJ31gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsT0FBT0EsYUFBVztBQUNsQixTQUFTLGdCQUFnQjs7O0FDY3pCLE9BQU8sV0FBVztBQUtsQixTQUFTLFdBQVcsUUFBUTtBQUMxQixRQUFNLElBQUksQ0FBQztBQUNYLFFBQU0sTUFBTSxJQUFJLGdCQUFnQixVQUFVLEVBQUU7QUFDNUMsYUFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHO0FBQ2xDLFFBQUksRUFBRSxDQUFDLE1BQU0sT0FBVyxHQUFFLENBQUMsSUFBSTtBQUFBLGFBQ3RCLE1BQU0sUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFHLEdBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUFBLFFBQ3BDLEdBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ3RCO0FBQ0EsU0FBTztBQUNUO0FBRU8sU0FBUyxZQUFZO0FBQzFCLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxNQUFNLFNBQVMsT0FBTztBQUFBLElBQzlDLFVBQVUsT0FBTyxXQUFXLGNBQWMsT0FBTyxTQUFTLFdBQVc7QUFBQSxJQUNyRSxRQUFRLE9BQU8sV0FBVyxjQUFjLE9BQU8sU0FBUyxTQUFTO0FBQUEsSUFDakUsTUFBTSxPQUFPLFdBQVcsY0FBYyxPQUFP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U0FBUixPQUF3QixFQUFFLFNBQVMsR0FBRztBQUMzQyxTQUNFLGdCQUFBRCxNQUFDLFlBQVMsT0FDUiwwQkFBQUEsTUFBQywwQkFBYSxXQUFVLFVBQ3RCLDBCQUFBQyxNQUFDLGdCQUFLLFdBQVUsNkVBRWQ7QUFBQSxvQkFBQUQsTUFBQyxnQkFBSyxXQUFVLHVFQUNkLDBCQUFBQSxNQUFDLGdCQUFLLFdBQVUsMENBQ2QsMEJBQUFDLE1BQUMsZ0JBQUssV0FBVSw4Q0FDZDtBQUFBLHNCQUFBQSxNQUFDLGdCQUFLLFdBQVUsb0NBQ2Q7QUFBQSx3QkFBQUQsTUFBQyxnQkFBSyxXQUFVLHlHQUNkLDBCQUFBQSxNQUFDLFNBQUksV0FBVSxzQkFBcUIsTUFBSyxRQUFPLFNBQVEsYUFBWSxRQUFPLGdCQUN6RSwwQkFBQUEsTUFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQWEsR0FBRyxHQUFFLG1JQUFrSSxHQUN6TSxHQUNGO0FBQUEsUUFDQSxnQkFBQUEsTUFBQyxnQkFBSyxXQUFVLG1HQUFrRyxzQkFFbEg7QUFBQSxTQUNGO0FBQUEsTUFFQSxnQkFBQUEsTUFBQyxxQkFBVSxXQUFVLG9HQUNuQiwwQkFBQUEsTUFBQyxnQkFBSyxXQUFVLFdBQVUsdUJBQUUsR0FDOUI7QUFBQSxPQUNGLEdBQ0YsR0FDRjtBQUFBLElBR0EsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSxnQkFDYixVQUNIO0FBQUEsSUFHQSxnQkFBQUEsTUFBQyxhQUFVO0FBQUEsS0FDYixHQUNGLEdBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiUmVhY3QiLCAicGxhdGZvcm0iLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIl0KfQo=

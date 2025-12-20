var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/index.jsx
import React31, { useState as useState2 } from "react";
import { useSelector, useDispatch } from "react-redux";

// node_modules/indjs/src/routing/router.mjs
import React from "react";

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
var text_input_default = TextInput;

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
var modal_default = Modal;

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

// components/TaskCard.jsx
import React29 from "react";
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function TaskCard({ task, onToggle, onDelete }) {
  const priorityColors = {
    high: "border-red-400 bg-red-50",
    medium: "border-yellow-400 bg-yellow-50",
    low: "border-green-400 bg-green-50"
  };
  const priorityBadgeColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white"
  };
  return /* @__PURE__ */ jsx25(
    view_default,
    {
      className: `bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${task.completed ? "opacity-60 border-gray-300" : priorityColors[task.priority]}`,
      children: /* @__PURE__ */ jsxs3(view_default, { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx25(
          pressable_default,
          {
            onPress: onToggle,
            className: `flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent" : "border-gray-300 hover:border-violet-400"}`,
            children: task.completed && /* @__PURE__ */ jsx25("svg", { className: "w-4 h-4 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) })
          }
        ),
        /* @__PURE__ */ jsxs3(view_default, { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx25(
            text_default,
            {
              className: `text-lg font-semibold mb-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`,
              children: task.title
            }
          ),
          task.description && /* @__PURE__ */ jsx25(text_default, { className: `text-sm mb-3 ${task.completed ? "text-gray-400" : "text-gray-600"}`, children: task.description }),
          /* @__PURE__ */ jsxs3(view_default, { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx25(view_default, { className: `px-3 py-1 rounded-full ${priorityBadgeColors[task.priority]}`, children: /* @__PURE__ */ jsx25(text_default, { className: "text-xs font-medium text-white", children: task.priority.toUpperCase() }) }),
            task.category && /* @__PURE__ */ jsx25(view_default, { className: "px-3 py-1 rounded-full bg-purple-100", children: /* @__PURE__ */ jsx25(text_default, { className: "text-xs font-medium text-purple-700", children: task.category }) }),
            task.dueDate && /* @__PURE__ */ jsxs3(view_default, { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx25("svg", { className: "w-4 h-4 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx25(text_default, { className: "text-xs text-gray-500", children: new Date(task.dueDate).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx25(
          pressable_default,
          {
            onPress: onDelete,
            className: "flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110",
            children: /* @__PURE__ */ jsx25("svg", { className: "w-5 h-5 text-red-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
          }
        )
      ] })
    }
  );
}

// components/AddTaskModal.jsx
import React30, { useState } from "react";
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
function AddTaskModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: ""
  });
  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onAdd(formData);
  };
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  return /* @__PURE__ */ jsx26(modal_default, { visible: true, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx26(view_default, { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs4(view_default, { className: "bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden", children: [
    /* @__PURE__ */ jsx26(view_default, { className: "bg-blue-500 text-white px-6 py-4 rounded-t-2xl", children: /* @__PURE__ */ jsxs4(view_default, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx26(text_default, { className: "text-2xl font-bold text-white", children: "Add New Task" }),
      /* @__PURE__ */ jsx26(
        pressable_default,
        {
          onPress: onClose,
          className: "w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all",
          children: /* @__PURE__ */ jsx26("svg", { className: "w-5 h-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx26("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx26(scroll_view_default, { className: "p-6", children: /* @__PURE__ */ jsxs4(view_default, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs4(view_default, { children: [
        /* @__PURE__ */ jsx26(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Task Title *" }),
        /* @__PURE__ */ jsx26(
          text_input_default,
          {
            value: formData.title,
            onChangeText: (value) => handleChange("title", value),
            placeholder: "Enter task title...",
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4(view_default, { children: [
        /* @__PURE__ */ jsx26(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Description" }),
        /* @__PURE__ */ jsx26(
          text_input_default,
          {
            value: formData.description,
            onChangeText: (value) => handleChange("description", value),
            placeholder: "Add details about your task...",
            multiline: true,
            numberOfLines: 3,
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4(view_default, { children: [
        /* @__PURE__ */ jsx26(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Priority" }),
        /* @__PURE__ */ jsx26(view_default, { className: "grid grid-cols-3 gap-3", children: ["low", "medium", "high"].map((priority) => /* @__PURE__ */ jsx26(
          pressable_default,
          {
            onPress: () => handleChange("priority", priority),
            className: `py-3 px-4 rounded-xl font-medium transition-all duration-300 ${formData.priority === priority ? priority === "high" ? "bg-red-500 shadow-lg" : priority === "medium" ? "bg-yellow-500 shadow-lg" : "bg-green-500 shadow-lg" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsx26(text_default, { className: `text-center ${formData.priority === priority ? "text-white font-medium" : "text-gray-600"}`, children: priority.charAt(0).toUpperCase() + priority.slice(1) })
          },
          priority
        )) })
      ] }),
      /* @__PURE__ */ jsxs4(view_default, { children: [
        /* @__PURE__ */ jsx26(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Category" }),
        /* @__PURE__ */ jsx26(view_default, { className: "relative", children: /* @__PURE__ */ jsxs4(
          "select",
          {
            value: formData.category,
            onChange: (e) => handleChange("category", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300 bg-white",
            children: [
              /* @__PURE__ */ jsx26("option", { value: "", children: "Select category..." }),
              /* @__PURE__ */ jsx26("option", { value: "Work", children: "Work" }),
              /* @__PURE__ */ jsx26("option", { value: "Personal", children: "Personal" }),
              /* @__PURE__ */ jsx26("option", { value: "Shopping", children: "Shopping" }),
              /* @__PURE__ */ jsx26("option", { value: "Health", children: "Health" }),
              /* @__PURE__ */ jsx26("option", { value: "Study", children: "Study" }),
              /* @__PURE__ */ jsx26("option", { value: "Other", children: "Other" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs4(view_default, { children: [
        /* @__PURE__ */ jsx26(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Due Date" }),
        /* @__PURE__ */ jsx26(
          "input",
          {
            type: "date",
            value: formData.dueDate,
            onChange: (e) => handleChange("dueDate", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4(view_default, { className: "flex gap-3 pt-4", children: [
        /* @__PURE__ */ jsx26(
          pressable_default,
          {
            onPress: onClose,
            className: "flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300",
            children: /* @__PURE__ */ jsx26(text_default, { className: "text-gray-700 font-semibold text-center", children: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx26(
          pressable_default,
          {
            onPress: handleSubmit,
            className: "flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all",
            children: /* @__PURE__ */ jsx26(text_default, { className: "text-white font-semibold text-center", children: "Add Task" })
          }
        )
      ] })
    ] }) })
  ] }) }) });
}

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

// pages/index.jsx
import { jsx as jsx27, jsxs as jsxs5 } from "react/jsx-runtime";
function Home() {
  const [showModal, setShowModal] = useState2(false);
  const [filter, setFilter] = useState2("all");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length
  };
  const handleAddTask = (taskData) => {
    dispatch(addTask({
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }));
    setShowModal(false);
  };
  return /* @__PURE__ */ jsx27(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs5(view_default, { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs5(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Task Manager" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-600 text-lg", children: "Organize your day, achieve your goals" })
    ] }),
    /* @__PURE__ */ jsxs5(view_default, { className: "grid grid-cols-3 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx27(text_default, { className: "text-3xl font-bold text-violet-600", children: stats.total }),
        /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600 mt-1", children: "Total" })
      ] }),
      /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx27(text_default, { className: "text-3xl font-bold text-blue-600", children: stats.active }),
        /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600 mt-1", children: "Active" })
      ] }),
      /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx27(text_default, { className: "text-3xl font-bold text-green-600", children: stats.completed }),
        /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600 mt-1", children: "Done" })
      ] })
    ] }),
    /* @__PURE__ */ jsx27(view_default, { className: "flex flex-row gap-2 mb-6 bg-white rounded-2xl p-2 shadow-md", children: ["all", "active", "completed"].map((f) => /* @__PURE__ */ jsx27(
      pressable_default,
      {
        onPress: () => setFilter(f),
        className: `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${filter === f ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsx27(text_default, { className: `text-center font-medium ${filter === f ? "text-white" : "text-gray-600"}`, children: f.charAt(0).toUpperCase() + f.slice(1) })
      },
      f
    )) }),
    /* @__PURE__ */ jsx27(view_default, { className: "space-y-4", children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-12 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-6xl mb-4", children: "\u{1F4DD}" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-semibold text-gray-700 mb-2", children: "No tasks yet" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-500", children: filter === "all" ? "Start by adding your first task!" : `No ${filter} tasks found` })
    ] }) : filteredTasks.map((task) => /* @__PURE__ */ jsx27(
      TaskCard,
      {
        task,
        onToggle: () => dispatch(toggleTask(task.id)),
        onDelete: () => dispatch(deleteTask(task.id))
      },
      task.id
    )) }),
    /* @__PURE__ */ jsx27(
      pressable_default,
      {
        onPress: () => setShowModal(true),
        className: "fixed bottom-24 right-8 w-16 h-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40",
        children: /* @__PURE__ */ jsx27(text_default, { className: "text-white text-3xl font-light", children: "+" })
      }
    ),
    showModal && /* @__PURE__ */ jsx27(
      AddTaskModal,
      {
        onClose: () => setShowModal(false),
        onAdd: handleAddTask
      }
    )
  ] }) });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcm91dGluZy9yb3V0ZXIubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyIsICIuLi8uLi9jb21wb25lbnRzL1Rhc2tDYXJkLmpzeCIsICIuLi8uLi9jb21wb25lbnRzL0FkZFRhc2tNb2RhbC5qc3giLCAiLi4vLi4vdXRpbHMvdGFza1NsaWNlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XG5pbXBvcnQgVGFza0NhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9UYXNrQ2FyZCc7XG5pbXBvcnQgQWRkVGFza01vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvQWRkVGFza01vZGFsJztcbmltcG9ydCB7IGFkZFRhc2ssIHRvZ2dsZVRhc2ssIGRlbGV0ZVRhc2sgfSBmcm9tICcuLi91dGlscy90YXNrU2xpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZmlsdGVyLCBzZXRGaWx0ZXJdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCB0YXNrcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudGFza3MudGFza3MpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgZmlsdGVyZWRUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICBpZiAoZmlsdGVyID09PSAnYWN0aXZlJykgcmV0dXJuICF0YXNrLmNvbXBsZXRlZDtcbiAgICBpZiAoZmlsdGVyID09PSAnY29tcGxldGVkJykgcmV0dXJuIHRhc2suY29tcGxldGVkO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICB0b3RhbDogdGFza3MubGVuZ3RoLFxuICAgIGFjdGl2ZTogdGFza3MuZmlsdGVyKHQgPT4gIXQuY29tcGxldGVkKS5sZW5ndGgsXG4gICAgY29tcGxldGVkOiB0YXNrcy5maWx0ZXIodCA9PiB0LmNvbXBsZXRlZCkubGVuZ3RoXG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkVGFzayA9ICh0YXNrRGF0YSkgPT4ge1xuICAgIGRpc3BhdGNoKGFkZFRhc2soe1xuICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgIC4uLnRhc2tEYXRhLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfSkpO1xuICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1heC13LTR4bCBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50IG1iLTJcIj5cbiAgICAgICAgICAgIFRhc2sgTWFuYWdlclxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtbGdcIj5Pcmdhbml6ZSB5b3VyIGRheSwgYWNoaWV2ZSB5b3VyIGdvYWxzPC9UZXh0PlxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtNCBtYi04XCI+XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMFwiPntzdGF0cy50b3RhbH08L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtMVwiPlRvdGFsPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiPntzdGF0cy5hY3RpdmV9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5BY3RpdmU8L1RleHQ+XG4gICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiPntzdGF0cy5jb21wbGV0ZWR9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5Eb25lPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgZ2FwLTIgbWItNiBiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTIgc2hhZG93LW1kXCI+XG4gICAgICAgICAge1snYWxsJywgJ2FjdGl2ZScsICdjb21wbGV0ZWQnXS5tYXAoKGYpID0+IChcbiAgICAgICAgICAgIDxQcmVzc2FibGVcbiAgICAgICAgICAgICAga2V5PXtmfVxuICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRGaWx0ZXIoZil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtmaWx0ZXIgPT09IGYgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgc2hhZG93LWxnJyA6ICdiZy10cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgZm9udC1tZWRpdW0gJHtmaWx0ZXIgPT09IGYgPyAndGV4dC13aGl0ZScgOiAndGV4dC1ncmF5LTYwMCd9YH0+XG4gICAgICAgICAgICAgICAge2YuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBmLnNsaWNlKDEpfVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIHtmaWx0ZXJlZFRhc2tzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtMTIgdGV4dC1jZW50ZXIgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNnhsIG1iLTRcIj5cdUQ4M0RcdURDREQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5ObyB0YXNrcyB5ZXQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyID09PSAnYWxsJyA/ICdTdGFydCBieSBhZGRpbmcgeW91ciBmaXJzdCB0YXNrIScgOiBgTm8gJHtmaWx0ZXJ9IHRhc2tzIGZvdW5kYH1cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBmaWx0ZXJlZFRhc2tzLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICA8VGFza0NhcmRcbiAgICAgICAgICAgICAgICBrZXk9e3Rhc2suaWR9XG4gICAgICAgICAgICAgICAgdGFzaz17dGFza31cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gZGlzcGF0Y2godG9nZ2xlVGFzayh0YXNrLmlkKSl9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICApfVxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFByZXNzYWJsZVxuICAgICAgICAgIG9uUHJlc3M9eygpID0+IHNldFNob3dNb2RhbCh0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMjQgcmlnaHQtOCB3LTE2IGgtMTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgc2hhZG93LTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTQwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC0zeGwgZm9udC1saWdodFwiPis8L1RleHQ+XG4gICAgICAgIDwvUHJlc3NhYmxlPlxuXG4gICAgICAgIHtzaG93TW9kYWwgJiYgKFxuICAgICAgICAgIDxBZGRUYXNrTW9kYWxcbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICBvbkFkZD17aGFuZGxlQWRkVGFza31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn0iLCAiLyoqXG4gKiB1c2VSb3V0ZXIoKVxuICpcbiAqIE1pbmltYWwgcm91dGVyIGhvb2sgaW5zcGlyZWQgYnkgTmV4dC5qcy5cbiAqIFByb3ZpZGVzIHBhdGhuYW1lLCBxdWVyeSwgYXNQYXRoIGFuZCBuYXZpZ2F0aW9uIGhlbHBlcnMuXG4gKlxuICogQVBJOlxuICogLSBwYXRobmFtZTogc3RyaW5nXG4gKiAtIHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT5cbiAqIC0gYXNQYXRoOiBzdHJpbmdcbiAqIC0gcHVzaCh1cmw6IHN0cmluZyk6IHZvaWRcbiAqIC0gcmVwbGFjZSh1cmw6IHN0cmluZyk6IHZvaWRcbiAqIC0gYmFjaygpOiB2b2lkXG4gKiAtIHJlbG9hZCgpOiB2b2lkXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gTWluaW1hbCBSb3V0ZXIgdXRpbGl0aWVzIGluc3BpcmVkIGJ5IE5leHQuanMgdXNlUm91dGVyXG4vLyBQcm92aWRlczogdXNlUm91dGVyKCkgd2l0aCBwdXNoLCByZXBsYWNlLCBwYXRobmFtZSwgc2VhcmNoLCBoYXNoIGFuZCBxdWVyeVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICBjb25zdCBxID0ge307XG4gIGNvbnN0IHVzcCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc2VhcmNoIHx8IFwiXCIpO1xuICBmb3IgKGNvbnN0IFtrLCB2XSBvZiB1c3AuZW50cmllcygpKSB7XG4gICAgaWYgKHFba10gPT09IHVuZGVmaW5lZCkgcVtrXSA9IHY7XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxW2tdKSkgcVtrXS5wdXNoKHYpO1xuICAgIGVsc2UgcVtrXSA9IFtxW2tdLCB2XTtcbiAgfVxuICByZXR1cm4gcTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiAoe1xuICAgIHBhdGhuYW1lOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIDogXCIvXCIsXG4gICAgc2VhcmNoOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmxvY2F0aW9uLnNlYXJjaCA6IFwiXCIsXG4gICAgaGFzaDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5sb2NhdGlvbi5oYXNoIDogXCJcIixcbiAgfSkpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZnVuY3Rpb24gb25Qb3AoKSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHBhdGhuYW1lOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHNlYXJjaDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgaGFzaDogd2luZG93LmxvY2F0aW9uLmhhc2gsXG4gICAgICB9KTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBvblBvcCk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgb25Qb3ApO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaHJlZkZyb20gPSAodXJsKSA9PiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIiA/IHVybCA6IFN0cmluZyh1cmwgfHwgXCJcIikpO1xuXG4gIGNvbnN0IG5hdmlnYXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKHVybCwgeyByZXBsYWNlID0gZmFsc2UgfSA9IHt9KSA9PiB7XG4gICAgY29uc3QgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgbGV0IHU7XG4gICAgdHJ5IHtcbiAgICAgIHUgPSBuZXcgVVJMKGhyZWZGcm9tKHVybCksIGJhc2UpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0ID0gdS5wYXRobmFtZSArIHUuc2VhcmNoICsgdS5oYXNoO1xuICAgIGlmIChyZXBsYWNlKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICBzZXRTdGF0ZSh7IHBhdGhuYW1lOiB1LnBhdGhuYW1lLCBzZWFyY2g6IHUuc2VhcmNoLCBoYXNoOiB1Lmhhc2ggfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwdXNoID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKHVybCkgPT4gbmF2aWdhdGUodXJsLCB7IHJlcGxhY2U6IGZhbHNlIH0pLFxuICAgIFtuYXZpZ2F0ZV0sXG4gICk7XG4gIGNvbnN0IHJlcCA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICh1cmwpID0+IG5hdmlnYXRlKHVybCwgeyByZXBsYWNlOiB0cnVlIH0pLFxuICAgIFtuYXZpZ2F0ZV0sXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogc3RhdGUucGF0aG5hbWUsXG4gICAgcXVlcnk6IHBhcnNlUXVlcnkoc3RhdGUuc2VhcmNoKSxcbiAgICBhc1BhdGg6IHN0YXRlLnBhdGhuYW1lICsgc3RhdGUuc2VhcmNoICsgc3RhdGUuaGFzaCxcbiAgICBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcCxcbiAgICBiYWNrOiAoKSA9PiB3aW5kb3cuaGlzdG9yeS5iYWNrKCksXG4gICAgcmVsb2FkOiAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCksXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBSb3V0ZXIgPSB7IHVzZVJvdXRlciB9O1xuIiwgIi8qKlxuICogUGxhdGZvcm0gZGV0ZWN0aW9uIHV0aWxpdGllcyBmb3IgSU5ESlNcbiAqXG4gKiBVc2FnZTpcbiAqIGltcG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9IGZyb20gJ2luZGpzJztcbiAqXG4gKiBpZiAoaXNNb2JpbGUpIHsgLi4uIH1cbiAqL1xuXG4vLyBDaGVjayBpZiBydW5uaW5nIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudFxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLy8gRWxlY3Ryb24gZGV0ZWN0aW9uIChyZW5kZXJlciBwcm9jZXNzKVxuZXhwb3J0IGNvbnN0IGlzRGVza3RvcCA9XG4gIGlzQnJvd3NlciAmJlxuICAod2luZG93LnByb2Nlc3M/LnR5cGUgPT09IFwicmVuZGVyZXJcIiB8fFxuICAgICEhd2luZG93LmVsZWN0cm9uIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVsZWN0cm9uXCIpKTtcblxuLy8gQ2FwYWNpdG9yIGRldGVjdGlvblxuZXhwb3J0IGNvbnN0IGlzTW9iaWxlID1cbiAgaXNCcm93c2VyICYmXG4gICghIXdpbmRvdy5DYXBhY2l0b3IgfHxcbiAgICAhIXdpbmRvdy5hbmRyb2lkQnJpZGdlIHx8XG4gICAgISF3aW5kb3cud2Via2l0Py5tZXNzYWdlSGFuZGxlcnM/LmJyaWRnZSB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDYXBhY2l0b3JcIikpO1xuXG4vLyBTcGVjaWZpYyBtb2JpbGUgcGxhdGZvcm1zXG5leHBvcnQgY29uc3QgaXNBbmRyb2lkID0gaXNNb2JpbGUgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuZXhwb3J0IGNvbnN0IGlzSU9TID0gaXNNb2JpbGUgJiYgL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vLyBXZWIgZmFsbGJhY2sgKGlmIG5vdCBkZXNrdG9wIG9yIG1vYmlsZSBhcHApXG5leHBvcnQgY29uc3QgaXNXZWIgPSAhaXNEZXNrdG9wICYmICFpc01vYmlsZTtcblxuLy8gR2V0IGN1cnJlbnQgcGxhdGZvcm0gbmFtZVxuZXhwb3J0IGNvbnN0IHBsYXRmb3JtID0gKCgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCkgcmV0dXJuIFwiZGVza3RvcFwiO1xuICBpZiAoaXNBbmRyb2lkKSByZXR1cm4gXCJhbmRyb2lkXCI7XG4gIGlmIChpc0lPUykgcmV0dXJuIFwiaW9zXCI7XG4gIGlmIChpc01vYmlsZSkgcmV0dXJuIFwibW9iaWxlXCI7IC8vIGZhbGxiYWNrXG4gIHJldHVybiBcIndlYlwiO1xufSkoKTtcblxuLy8gUmVhY3QgTmF0aXZlIGNvbXBhdGlibGUgQVBJXG5leHBvcnQgY29uc3QgT1MgPSBwbGF0Zm9ybTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChvYmopID0+IHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShPUykpIHJldHVybiBvYmpbT1NdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwibmF0aXZlXCIpICYmIGlzTW9iaWxlKSByZXR1cm4gb2JqW1wibmF0aXZlXCJdO1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KFwiZGVmYXVsdFwiKSkgcmV0dXJuIG9ialtcImRlZmF1bHRcIl07XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbiAgT1MsXG4gIHNlbGVjdCxcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2UgPSBmb3J3YXJkUmVmKCh7IHN0eWxlLCBzb3VyY2UsIHNyYywgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZVwiKTtcblxuICAvLyBSZWFjdCBOYXRpdmUgdXNlcyAnc291cmNlJywgV2ViIHVzZXMgJ3NyYycuXG4gIC8vIFdlIHN1cHBvcnQgYm90aCBwcm9wcyBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4ucmVzdCxcbiAgICBzcmM6IGltYWdlU291cmNlLFxuICAgIHJlZixcbiAgfTtcblxuICBpZiAoQ29tcG9uZW50ICE9PSBcImltZ1wiICYmIENvbXBvbmVudCAhPT0gXCJpbWFnZVwiKSB7XG4gICAgLy8gSWYgaXQgcmVmZXJzIHRvIFJlYWN0IE5hdGl2ZSBJbWFnZSwgaXQgZXhwZWN0cyAnc291cmNlJ1xuICAgIHByb3BzLnNvdXJjZSA9IHNvdXJjZSB8fCB7IHVyaTogc3JjIH07XG4gICAgZGVsZXRlIHByb3BzLnNyYztcbiAgfVxuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gPENvbXBvbmVudCBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucHJvcHN9IC8+O1xufSk7XG5cbkltYWdlLmRpc3BsYXlOYW1lID0gXCJJbWFnZVwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2U7XG4iLCAiZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSB0eXBlb2YgUExBVEZPUk0gIT09IFwidW5kZWZpbmVkXCIgPyBQTEFURk9STSA6IFwid2ViXCI7XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIndlYlwiKSB7XG4gICAgY29uc3Qgd2ViTWFwID0ge1xuICAgICAgdmlldzogXCJkaXZcIixcbiAgICAgIHRleHQ6IFwic3BhblwiLFxuICAgICAgaW1hZ2U6IFwiaW1nXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiZGl2XCIsIC8vIG1hcCBpbWFnZS1iYWNrZ3JvdW5kIHRvIGRpdiB3aXRoIHN0eWxlXG4gICAgICBzY3JvbGx2aWV3OiBcImRpdlwiLFxuICAgICAgZmxhdGxpc3Q6IFwiZGl2XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJkaXZcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcImRpdlwiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcImRpdlwiLFxuICAgICAgcHJlc3NhYmxlOiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJidXR0b25cIixcbiAgICAgIHN3aXRjaDogXCJpbnB1dFwiLCAvLyB0eXBlPSdjaGVja2JveCdcbiAgICAgIHRleHRhcmVhOiBcInRleHRhcmVhXCIsXG4gICAgICBidXR0b246IFwiYnV0dG9uXCIsXG4gICAgICBtb2RhbDogXCJkaXZcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcImRpdlwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiZGl2XCIsXG4gICAgfTtcbiAgICByZXR1cm4gd2ViTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBcImRpdlwiO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSBcIm1vYmlsZVwiKSB7XG4gICAgLy8gSW4gUmVhY3QgTmF0aXZlLCBjb21wb25lbnRzIGFyZSBDYW1lbENhc2VcbiAgICAvLyBXZSBuZWVkIHRvIG1hcCBnZW5lcmljIG5hbWVzIHRvIFJOIG5hbWVzXG4gICAgY29uc3QgbW9iaWxlTWFwID0ge1xuICAgICAgdmlldzogXCJWaWV3XCIsXG4gICAgICB0ZXh0OiBcIlRleHRcIixcbiAgICAgIGltYWdlOiBcIkltYWdlXCIsXG4gICAgICBpbWFnZWJhY2tncm91bmQ6IFwiSW1hZ2VCYWNrZ3JvdW5kXCIsXG4gICAgICBzY3JvbGx2aWV3OiBcIlNjcm9sbFZpZXdcIixcbiAgICAgIGZsYXRsaXN0OiBcIkZsYXRMaXN0XCIsXG4gICAgICBzZWN0aW9ubGlzdDogXCJTZWN0aW9uTGlzdFwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJTYWZlQXJlYVZpZXdcIixcbiAgICAgIHByZXNzYWJsZTogXCJQcmVzc2FibGVcIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiVG91Y2hhYmxlT3BhY2l0eVwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiLFxuICAgICAgc3dpdGNoOiBcIlN3aXRjaFwiLFxuICAgICAgbW9kYWw6IFwiTW9kYWxcIixcbiAgICAgIGFjdGl2aXR5aW5kaWNhdG9yOiBcIkFjdGl2aXR5SW5kaWNhdG9yXCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJSZWZyZXNoQ29udHJvbFwiLFxuICAgICAgYnV0dG9uOiBcIkJ1dHRvblwiLFxuICAgIH07XG4gICAgY29uc3Qgcm5OYW1lID1cbiAgICAgIG1vYmlsZU1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgY2FwaXRhbGl6ZSh0eXBlKTtcblxuICAgIC8vIFNhZmV0eSBjaGVjayBmb3IgUmVhY3QgTmF0aXZlIGVudmlyb25tZW50XG4gICAgLy8gcmVhY3QtbmF0aXZlLXdlYiBtaWdodCBiZSBhbGlhc2VkLCBvciB3ZSBtaWdodCBiZSBpbiBhIHJlYWwgUk4gZW52aXJvbm1lbnRcbiAgICB0cnkge1xuICAgICAgLy8gVXNpbmcgZ2xvYmFsIGNoZWNrIG9yIHNhZmUgcmVxdWlyZVxuICAgICAgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKFwicmVhY3QtbmF0aXZlXCIpW3JuTmFtZV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdCAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QuTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5SZWFjdC5OYXRpdmVbcm5OYW1lXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFJlYWN0IE5hdGl2ZSBjb21wb25lbnQgJHtybk5hbWV9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byBWaWV3IG9yIGRpdiBkZXBlbmRpbmcgb24gY29udGV4dCwgYnV0IFZpZXcgaXMgc2FmZSBlbm91Z2ggZm9yIGxvZ2ljYWwgcmV0dXJuIGlmIG1vY2tlZFxuICAgIHJldHVybiBcIlZpZXdcIjtcbiAgfVxuXG4gIHJldHVybiBcImRpdlwiO1xufVxuIiwgIi8vIE1vY2sgU3R5bGVTaGVldCBmb3IgY29tcGF0aWJpbGl0eS5cbi8vIEluIElOREpTIHdlYiwgd2UgdXN1YWxseSB1c2Ugc3RhbmRhcmQgc3R5bGUgb2JqZWN0cyBvciBDU1MuXG4vLyBUaGlzIGFsbG93cyBTdHlsZVNoZWV0LmNyZWF0ZSh7fSkgdG8gcmV0dXJuIHRoZSBvYmplY3RzIGFzLWlzLlxuXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiAoc3R5bGVzKSA9PiBzdHlsZXMsXG4gIGZsYXR0ZW46IChzdHlsZXMpID0+IHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuIHt9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gKGl0ZW0gPyB7IC4uLmFjYywgLi4uaXRlbSB9IDogYWNjKSwge30pO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBoYWlybGluZVdpZHRoOiAxLFxuICBhYnNvbHV0ZUZpbGw6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbiAgYWJzb2x1dGVGaWxsT2JqZWN0OiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdHlsZVNoZWV0O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuLy8gSU5ESlMgTGluayBjb21wb25lbnQgLSBsaWdodHdlaWdodCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uIGhlbHBlclxuLy8gUGVyZm9ybXMgU1BBLWxpa2UgbmF2aWdhdGlvbiBmb3Igc2FtZS1vcmlnaW4gaW50ZXJuYWwgbGlua3MuXG4vLyBQcm9wczogaHJlZiwgcHJlZmV0Y2gsIHJlcGxhY2UsIHNjcm9sbCAoZGVmYXVsdCB0cnVlKSwgb25DbGljaywgdGFyZ2V0LCByZWwsIGNsYXNzTmFtZSwgc3R5bGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoe1xuICBocmVmLFxuICBjaGlsZHJlbixcbiAgcHJlZmV0Y2ggPSBmYWxzZSxcbiAgcmVwbGFjZSA9IGZhbHNlLFxuICBzY3JvbGwgPSB0cnVlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIHN0eWxlLFxuICB0YXJnZXQsXG4gIHJlbCxcbiAgLi4ucmVzdFxufSkge1xuICAvLyBCYXNpYyBwcmVmZXRjaDogaGludCB0aGUgYnJvd3NlciB2aWEgPGxpbmsgcmVsPVwicHJlZmV0Y2hcIj5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXByZWZldGNoIHx8ICFocmVmKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgIGwucmVsID0gXCJwcmVmZXRjaFwiO1xuICAgICAgbC5ocmVmID0gaHJlZjtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobCk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH07XG4gICAgfSBjYXRjaCB7fVxuICB9LCBbaHJlZiwgcHJlZmV0Y2hdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZSk7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIC8vIE9ubHkgaW50ZXJjZXB0IHNpbXBsZSBsZWZ0LWNsaWNrcyB3aXRob3V0IG1vZGlmaWVyIGtleXNcbiAgICBpZiAoZS5idXR0b24gIT09IDAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICghaHJlZikgcmV0dXJuO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBcIl9zZWxmXCIpIHJldHVybjtcbiAgICBsZXQgdXJsO1xuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSW52YWxpZCBVUkwsIGxldCBicm93c2VyIGhhbmRsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBTa2lwIG5vbi1odHRwKHMpIHByb3RvY29scyBhbmQgc3BlY2lhbCBzY2hlbWVzXG4gICAgY29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG4gICAgaWYgKHByb3RvICYmIHByb3RvICE9PSBcImh0dHA6XCIgJiYgcHJvdG8gIT09IFwiaHR0cHM6XCIpIHJldHVybjtcbiAgICAvLyBFeHRlcm5hbFxuICAgIGlmICh1cmwub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSByZXR1cm47XG4gICAgLy8gUmVzcGVjdCBkb3dubG9hZCBsaW5rc1xuICAgIGlmIChyZXN0LmRvd25sb2FkKSByZXR1cm47XG4gICAgLy8gSGFzaC1vbmx5IG5hdmlnYXRpb24gb3B0aW1pemF0aW9uXG4gICAgY29uc3QgY3VycmVudCA9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgbmV4dCA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaDtcbiAgICBpZiAobmV4dCA9PT0gY3VycmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBEbyBwdXNoL3JlcGxhY2Ugc3RhdGVcbiAgICBpZiAocmVwbGFjZSkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgLy8gRW1pdCBhIGN1c3RvbSBuYXZpZ2F0aW9uIGV2ZW50IHNvIHRoZSBhcHAgY2FuIGxvYWQgdGhlIHRhcmdldCBtb2R1bGVcbiAgICB0cnkge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImluZDpuYXZpZ2F0ZVwiLCB7IGRldGFpbDogeyBocmVmOiBuZXh0IH0gfSksXG4gICAgICApO1xuICAgIH0gY2F0Y2gge31cbiAgICAvLyBTY3JvbGwgYmVoYXZpb3JcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBpZiAodXJsLmhhc2gpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgZWxzZSB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbEZpbmFsID1cbiAgICB0YXJnZXQgPT09IFwiX2JsYW5rXCJcbiAgICAgID8gW3JlbCwgXCJub29wZW5lclwiLCBcIm5vcmVmZXJyZXJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpXG4gICAgICA6IHJlbDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJhXCIsXG4gICAge1xuICAgICAgaHJlZixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcmVsOiByZWxGaW5hbCxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgLi4ucmVzdCxcbiAgICB9LFxuICAgIGNoaWxkcmVuLFxuICApO1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInZpZXdcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5WaWV3LmRpc3BsYXlOYW1lID0gXCJWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRleHQgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInRleHRcIik7XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5UZXh0LmRpc3BsYXlOYW1lID0gXCJUZXh0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNjcm9sbFZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzY3JvbGx2aWV3XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICBvdmVyZmxvd1g6IGhvcml6b250YWwgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCIsXG4gICAgICAgIG92ZXJmbG93WTogaG9yaXpvbnRhbCA/IFwiaGlkZGVuXCIgOiBcImF1dG9cIixcbiAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICBtc092ZXJmbG93U3R5bGU6IChcbiAgICAgICAgICBob3Jpem9udGFsXG4gICAgICAgICAgICA/ICFzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgICAgIDogIXNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3JcbiAgICAgICAgKVxuICAgICAgICAgID8gXCJub25lXCJcbiAgICAgICAgICA6IFwiYXV0b1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17Y29udGFpbmVyU3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3J9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblNjcm9sbFZpZXcuZGlzcGxheU5hbWUgPSBcIlNjcm9sbFZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0SW5wdXQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgdmFsdWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICBvbkNoYW5nZVRleHQsXG4gICAgICBvbkZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzZWN1cmVUZXh0RW50cnkgPSBmYWxzZSxcbiAgICAgIG11bHRpbGluZSA9IGZhbHNlLFxuICAgICAgbnVtYmVyT2ZMaW5lcyA9IDQsXG4gICAgICBlZGl0YWJsZSA9IHRydWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGlmIChvbkNoYW5nZVRleHQpIG9uQ2hhbmdlVGV4dChlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1vblN0eWxlID0ge1xuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgIH07XG5cbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICAgIHJvd3M9e251bWJlck9mTGluZXN9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3R5bGUsIHJlc2l6ZTogXCJub25lXCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblRleHRJbnB1dC5kaXNwbGF5TmFtZSA9IFwiVGV4dElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBUZXh0SW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQnV0dG9uID0gZm9yd2FyZFJlZihcbiAgKHsgdGl0bGUsIG9uUHJlc3MsIGNvbG9yLCBkaXNhYmxlZCwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgIHtcbiAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIG9wYWNpdHk6IGRpc2FibGVkID8gMC41IDogMVxuICAgICAgICB9LFxuICAgICAgICByZXN0LnN0eWxlXG4gICAgICBdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiQnV0dG9uXCI7XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQWN0aXZpdHlJbmRpY2F0b3IgPSBmb3J3YXJkUmVmKFxuICAoeyBzaXplID0gXCJzbWFsbFwiLCBjb2xvciA9IFwiIzk5OVwiLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNpemUgPT09IFwic21hbGxcIiA/IDIwIDogNDA7XG4gICAgICBjb25zdCBzcGlubmVyU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkaW1lbnNpb24sXG4gICAgICAgIGhlaWdodDogZGltZW5zaW9uLFxuICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtjb2xvcn0zM2AsXG4gICAgICAgIGJvcmRlclRvcDogYDJweCBzb2xpZCAke2NvbG9yfWAsXG4gICAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMC44cyBsaW5lYXIgaW5maW5pdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEluamVjdCBrZXlmcmFtZXMgaWYgbm90IHByZXNlbnRcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZGpzLXNwaW4tc3R5bGVcIilcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZUVsLmlkID0gXCJpbmRqcy1zcGluLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYEBrZXlmcmFtZXMgaW5kanMtc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWA7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17c3Bpbm5lclN0eWxlfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzaXplPXtzaXplfVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5BY3Rpdml0eUluZGljYXRvci5kaXNwbGF5TmFtZSA9IFwiQWN0aXZpdHlJbmRpY2F0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5SW5kaWNhdG9yO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFN3aXRjaCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IHZhbHVlLCBvblZhbHVlQ2hhbmdlLCBkaXNhYmxlZCwgdHJhY2tDb2xvciwgdGh1bWJDb2xvciwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uVmFsdWVDaGFuZ2U9e29uVmFsdWVDaGFuZ2V9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgdHJhY2tDb2xvcj17dHJhY2tDb2xvcn1cbiAgICAgICAgdGh1bWJDb2xvcj17dGh1bWJDb2xvcn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblN3aXRjaC5kaXNwbGF5TmFtZSA9IFwiU3dpdGNoXCI7XG5leHBvcnQgZGVmYXVsdCBTd2l0Y2g7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBGbGF0TGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEVtcHR5Q29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgbnVtQ29sdW1ucyA9IDEsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiZmxhdGxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChMaXN0RW1wdHlDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBFbXB0eSA9IFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RFbXB0eUNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICBMaXN0RW1wdHlDb21wb25lbnRcbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExpc3RFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7RW1wdHl9XG4gICAgICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBkYXRhIHx8IFtdO1xuICAgICAgY29uc3QgcmVuZGVyTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGluZGV4KVxuICAgICAgICAgICAgOiBpbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4IH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZsYXRDb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17ZmxhdENvbnRlbnRTdHlsZX1cbiAgICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJMaXN0KCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50PXtMaXN0RW1wdHlDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBudW1Db2x1bW5zPXtudW1Db2x1bW5zfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkZsYXRMaXN0LmRpc3BsYXlOYW1lID0gXCJGbGF0TGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgRmxhdExpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVG91Y2hhYmxlT3BhY2l0eSA9IGZvcndhcmRSZWYoXG4gICh7IGNoaWxkcmVuLCBzdHlsZSwgb25QcmVzcywgYWN0aXZlT3BhY2l0eSA9IDAuMiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlb3BhY2l0eVwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgICAgICB7IGN1cnNvcjogXCJwb2ludGVyXCIsIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6IDAsIHRleHRBbGlnbjogJ2xlZnQnLCBmb250OiAnaW5oZXJpdCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzIGVhc2UnIH0sXG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICAgIF0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHkpfVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVPcGFjaXR5LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVPcGFjaXR5XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVPcGFjaXR5O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFByZXNzYWJsZSA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiwgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogMCwgdGV4dEFsaWduOiAnbGVmdCcsIGZvbnQ6ICdpbmhlcml0JywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e2ZsYXRTdHlsZX1cbiAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgXCJcIn1cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNhZmVhcmVhdmlld1wiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW1xuICAgICAge1xuICAgICAgICBwYWRkaW5nVG9wOiAnZW52KHNhZmUtYXJlYS1pbnNldC10b3ApJyxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogJ2VudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKScsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAnZW52KHNhZmUtYXJlYS1pbnNldC1sZWZ0KScsXG4gICAgICAgIHBhZGRpbmdSaWdodDogJ2VudihzYWZlLWFyZWEtaW5zZXQtcmlnaHQpJyxcbiAgICAgICAgZmxleDogMVxuICAgICAgfSxcbiAgICAgIHN0eWxlXG4gICAgXSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9IHsuLi5yZXN0fT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuU2FmZUFyZWFWaWV3LmRpc3BsYXlOYW1lID0gXCJTYWZlQXJlYVZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFNhZmVBcmVhVmlldztcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuXG4vLyBXZWIgbW9jayBvZiBTdGF0dXNCYXIuIEluIG5hdGl2ZSBpdCB3b3VsZCBjaGFuZ2UgdGhlIGJhciBzdHlsZS5cbi8vIEluIHdlYiwgbWF5YmUgaXQgY2hhbmdlcyB0aGUgbWV0YSB0aGVtZS1jb2xvciB0YWcuXG5cbmZ1bmN0aW9uIFN0YXR1c0Jhcih7IGJhclN0eWxlID0gXCJkZWZhdWx0XCIsIGJhY2tncm91bmRDb2xvciwgaGlkZGVuID0gZmFsc2UgfSkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIC8vIEF0dGVtcHQgdG8gc2V0IHRoZW1lLWNvbG9yIG1ldGEgdGFnIGlmIGJhY2tncm91bmRDb2xvciBwcm92aWRlZFxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIGxldCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKTtcbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIik7XG4gICAgICAgIG1ldGEubmFtZSA9IFwidGhlbWUtY29sb3JcIjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cbiAgICAgIG1ldGEuY29udGVudCA9IGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gIH0sIFtiYWNrZ3JvdW5kQ29sb3JdKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQmFyO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dC5qc3hcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTZWN0aW9uTGlzdCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBzZWN0aW9ucyxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICByZW5kZXJTZWN0aW9uSGVhZGVyLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQgPSB0cnVlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNlY3Rpb25saXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2tcbiAgICAgIGNvbnN0IHJlbmRlclNlY3Rpb25zID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHNlY3Rpb25zIHx8IFtdKS5tYXAoKHNlY3Rpb24sIHNlY3Rpb25JbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZWN0aW9uLmRhdGEgfHwgW107XG4gICAgICAgICAgY29uc3Qga2V5ID0gc2VjdGlvbi5rZXkgfHwgc2VjdGlvbkluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJTZWN0aW9uSGVhZGVyICYmIHJlbmRlclNlY3Rpb25IZWFkZXIoeyBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGl0ZW1JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlFeHRyYWN0b3JcbiAgICAgICAgICAgICAgICAgID8ga2V5RXh0cmFjdG9yKGl0ZW0sIGl0ZW1JbmRleClcbiAgICAgICAgICAgICAgICAgIDogaXRlbS5rZXkgfHwgaXRlbS5pZCB8fCBrZXkgKyBcIi1cIiArIGl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aXRlbUtleX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXg6IGl0ZW1JbmRleCwgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHNlY3Rpb25zPXtzZWN0aW9uc31cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcj17cmVuZGVyU2VjdGlvbkhlYWRlcn1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWQ9e3N0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5TZWN0aW9uTGlzdC5kaXNwbGF5TmFtZSA9IFwiU2VjdGlvbkxpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25MaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEtleWJvYXJkQXZvaWRpbmdWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBiZWhhdmlvcixcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIGtleWJvYXJkVmVydGljYWxPZmZzZXQsXG4gICAgICBlbmFibGVkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImtleWJvYXJkYXZvaWRpbmd2aWV3XCIpO1xuXG4gICAgLy8gT24gd2ViLCBrZXlib2FyZCBhdm9pZGluZyBpcyB1c3VhbGx5IGhhbmRsZWQgYnkgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvclxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oW3sgZmxleDogMSB9LCBzdHlsZV0pfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IFwiXCJ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgY2xhc3NOYW1lLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInJlZnJlc2hjb250cm9sXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtyZWZ9XG4gICAgICByZWZyZXNoaW5nPXtyZWZyZXNoaW5nfVxuICAgICAgb25SZWZyZXNoPXtvblJlZnJlc2h9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB8fCBcIlwifVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVmlldywgVGV4dCwgUHJlc3NhYmxlIH0gZnJvbSAnaW5kanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGFza0NhcmQoeyB0YXNrLCBvblRvZ2dsZSwgb25EZWxldGUgfSkge1xyXG4gICAgY29uc3QgcHJpb3JpdHlDb2xvcnMgPSB7XHJcbiAgICAgICAgaGlnaDogJ2JvcmRlci1yZWQtNDAwIGJnLXJlZC01MCcsXHJcbiAgICAgICAgbWVkaXVtOiAnYm9yZGVyLXllbGxvdy00MDAgYmcteWVsbG93LTUwJyxcclxuICAgICAgICBsb3c6ICdib3JkZXItZ3JlZW4tNDAwIGJnLWdyZWVuLTUwJ1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmlvcml0eUJhZGdlQ29sb3JzID0ge1xyXG4gICAgICAgIGhpZ2g6ICdiZy1yZWQtNTAwIHRleHQtd2hpdGUnLFxyXG4gICAgICAgIG1lZGl1bTogJ2JnLXllbGxvdy01MDAgdGV4dC13aGl0ZScsXHJcbiAgICAgICAgbG93OiAnYmctZ3JlZW4tNTAwIHRleHQtd2hpdGUnXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXdcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IHNoYWRvdy1sZyBob3ZlcjpzaGFkb3cteGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGJvcmRlci1sLTQgJHt0YXNrLmNvbXBsZXRlZCA/ICdvcGFjaXR5LTYwIGJvcmRlci1ncmF5LTMwMCcgOiBwcmlvcml0eUNvbG9yc1t0YXNrLnByaW9yaXR5XVxyXG4gICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00XCI+XHJcbiAgICAgICAgICAgICAgICB7LyogQ2hlY2tib3ggKi99XHJcbiAgICAgICAgICAgICAgICA8UHJlc3NhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgb25QcmVzcz17b25Ub2dnbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC1zaHJpbmstMCB3LTcgaC03IHJvdW5kZWQtbGcgYm9yZGVyLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7dGFzay5jb21wbGV0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJvcmRlci10cmFuc3BhcmVudCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1ncmF5LTMwMCBob3Zlcjpib3JkZXItdmlvbGV0LTQwMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3Rhc2suY29tcGxldGVkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtd2hpdGVcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17M30gZD1cIk01IDEzbDQgNEwxOSA3XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBUYXNrIENvbnRlbnQgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtbGcgZm9udC1zZW1pYm9sZCBtYi0xICR7dGFzay5jb21wbGV0ZWQgPyAnbGluZS10aHJvdWdoIHRleHQtZ3JheS01MDAnIDogJ3RleHQtZ3JheS04MDAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICB7dGFzay5kZXNjcmlwdGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17YHRleHQtc20gbWItMyAke3Rhc2suY29tcGxldGVkID8gJ3RleHQtZ3JheS00MDAnIDogJ3RleHQtZ3JheS02MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBmbGV4LXdyYXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFByaW9yaXR5IEJhZGdlICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC1mdWxsICR7cHJpb3JpdHlCYWRnZUNvbG9yc1t0YXNrLnByaW9yaXR5XX1gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC13aGl0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLnByaW9yaXR5LnRvVXBwZXJDYXNlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDYXRlZ29yeSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suY2F0ZWdvcnkgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXB1cnBsZS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIERhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmR1ZURhdGUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ncmF5LTUwMFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNOCA3VjNtOCA0VjNtLTkgOGgxME01IDIxaDE0YTIgMiAwIDAwMi0yVjdhMiAyIDAgMDAtMi0ySDVhMiAyIDAgMDAtMiAydjEyYTIgMiAwIDAwMiAyelwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIERlbGV0ZSBCdXR0b24gKi99XHJcbiAgICAgICAgICAgICAgICA8UHJlc3NhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgb25QcmVzcz17b25EZWxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC14bCBiZy1yZWQtNTAgaG92ZXI6YmctcmVkLTEwMCB0ZXh0LXJlZC02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOnNjYWxlLTExMFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcmVkLTYwMFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNMTkgN2wtLjg2NyAxMi4xNDJBMiAyIDAgMDExNi4xMzggMjFINy44NjJhMiAyIDAgMDEtMS45OTUtMS44NThMNSA3bTUgNHY2bTQtNnY2bTEtMTBWNGExIDEgMCAwMC0xLTFoLTRhMSAxIDAgMDAtMSAxdjNNNCA3aDE2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufVxyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBUZXh0SW5wdXQsIFByZXNzYWJsZSwgTW9kYWwsIFNjcm9sbFZpZXcgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZGRUYXNrTW9kYWwoeyBvbkNsb3NlLCBvbkFkZCB9KSB7XHJcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgICAgIHByaW9yaXR5OiAnbWVkaXVtJyxcclxuICAgICAgICBjYXRlZ29yeTogJycsXHJcbiAgICAgICAgZHVlRGF0ZTogJydcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWZvcm1EYXRhLnRpdGxlLnRyaW0oKSkgcmV0dXJuO1xyXG4gICAgICAgIG9uQWRkKGZvcm1EYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGZpZWxkLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNldEZvcm1EYXRhKHtcclxuICAgICAgICAgICAgLi4uZm9ybURhdGEsXHJcbiAgICAgICAgICAgIFtmaWVsZF06IHZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE1vZGFsIHZpc2libGU9e3RydWV9IHRyYW5zcGFyZW50PXt0cnVlfSBhbmltYXRpb25UeXBlPVwic2xpZGVcIiBvblJlcXVlc3RDbG9zZT17b25DbG9zZX0+XHJcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgei01MCBiYWNrZHJvcC1ibHVyLXNtXCI+XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBzaGFkb3cteGwgbWF4LXctbGcgdy1mdWxsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7LyogSGVhZGVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcHgtNiBweS00IHJvdW5kZWQtdC0yeGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPkFkZCBOZXcgVGFzazwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXdoaXRlIGJnLW9wYWNpdHktMjAgaG92ZXI6Ymctb3BhY2l0eS0zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtd2hpdGVcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTYgMThMMTggNk02IDZsMTIgMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBGb3JtICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxTY3JvbGxWaWV3IGNsYXNzTmFtZT1cInAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJzcGFjZS15LTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUaXRsZSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGFzayBUaXRsZSAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVRleHQ9eyh2YWx1ZSkgPT4gaGFuZGxlQ2hhbmdlKCd0aXRsZScsIHZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0YXNrIHRpdGxlLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlVGV4dD17KHZhbHVlKSA9PiBoYW5kbGVDaGFuZ2UoJ2Rlc2NyaXB0aW9uJywgdmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFkZCBkZXRhaWxzIGFib3V0IHlvdXIgdGFzay4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpbGluZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZMaW5lcz17M31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQcmlvcml0eSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Wydsb3cnLCAnbWVkaXVtJywgJ2hpZ2gnXS5tYXAoKHByaW9yaXR5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UHJlc3NhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtwcmlvcml0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBoYW5kbGVDaGFuZ2UoJ3ByaW9yaXR5JywgcHJpb3JpdHkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTMgcHgtNCByb3VuZGVkLXhsIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke2Zvcm1EYXRhLnByaW9yaXR5ID09PSBwcmlvcml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByaW9yaXR5ID09PSAnaGlnaCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC01MDAgc2hhZG93LWxnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcmlvcml0eSA9PT0gJ21lZGl1bSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy15ZWxsb3ctNTAwIHNoYWRvdy1sZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmVlbi01MDAgc2hhZG93LWxnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmF5LTEwMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgJHtmb3JtRGF0YS5wcmlvcml0eSA9PT0gcHJpb3JpdHkgPyAndGV4dC13aGl0ZSBmb250LW1lZGl1bScgOiAndGV4dC1ncmF5LTYwMCd9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmlvcml0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByaW9yaXR5LnNsaWNlKDEpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIENhdGVnb3J5ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZ3JheS03MDAgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnY2F0ZWdvcnknLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNCBweS0zIHJvdW5kZWQteGwgYm9yZGVyLTIgYm9yZGVyLWdyYXktMjAwIGZvY3VzOmJvcmRlci12aW9sZXQtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0zMDAgYmctd2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGNhdGVnb3J5Li4uPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiV29ya1wiPldvcms8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQZXJzb25hbFwiPlBlcnNvbmFsPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2hvcHBpbmdcIj5TaG9wcGluZzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhlYWx0aFwiPkhlYWx0aDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0dWR5XCI+U3R1ZHk8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJPdGhlclwiPk90aGVyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogRHVlIERhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1ZSBEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5kdWVEYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnZHVlRGF0ZScsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBCdXR0b25zICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBnYXAtMyBwdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMyBweC02IHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIGJnLWdyYXktMTAwIGhvdmVyOmJnLWdyYXktMjAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtc2VtaWJvbGQgdGV4dC1jZW50ZXJcIj5DYW5jZWw8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtoYW5kbGVTdWJtaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0zIHB4LTYgcm91bmRlZC14bCBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctYmx1ZS01MDAgaG92ZXI6YmctYmx1ZS02MDAgYWN0aXZlOmJnLWJsdWUtNzAwIHRyYW5zaXRpb24tYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LWNlbnRlclwiPkFkZCBUYXNrPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgICk7XHJcbn1cclxuIiwgImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICB0YXNrczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWxjb21lIHRvIFRhc2sgTWFuYWdlciEnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBzYW1wbGUgdGFzay4gQ2xpY2sgdGhlIGNoZWNrYm94IHRvIG1hcmsgaXQgYXMgY29tcGxldGUsIG9yIGRlbGV0ZSBpdC4nLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogJ2hpZ2gnLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogJ1BlcnNvbmFsJyxcclxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGR1ZURhdGU6IG5ldyBEYXRlKERhdGUubm93KCkgKyA4NjQwMDAwMCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnVHJ5IGFkZGluZyBhIG5ldyB0YXNrJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDbGljayB0aGUgKyBidXR0b24gdG8gY3JlYXRlIHlvdXIgb3duIHRhc2tzJyxcclxuICAgICAgICAgICAgcHJpb3JpdHk6ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogJ1dvcmsnLFxyXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmNvbnN0IHRhc2tTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICAgIG5hbWU6ICd0YXNrcycsXHJcbiAgICBpbml0aWFsU3RhdGUsXHJcbiAgICByZWR1Y2Vyczoge1xyXG4gICAgICAgIGFkZFRhc2s6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRhc2tzLnVuc2hpZnQoYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFzayA9IHN0YXRlLnRhc2tzLmZpbmQodCA9PiB0LmlkID09PSBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9ICF0YXNrLmNvbXBsZXRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsZXRlVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3RhdGUudGFza3MgPSBzdGF0ZS50YXNrcy5maWx0ZXIodCA9PiB0LmlkICE9PSBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVUYXNrOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN0YXRlLnRhc2tzLmZpbmRJbmRleCh0ID0+IHQuaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudGFza3NbaW5kZXhdID0geyAuLi5zdGF0ZS50YXNrc1tpbmRleF0sIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHsgYWRkVGFzaywgdG9nZ2xlVGFzaywgZGVsZXRlVGFzaywgdXBkYXRlVGFzayB9ID0gdGFza1NsaWNlLmFjdGlvbnM7XHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tTbGljZS5yZWR1Y2VyO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFBLE9BQU9BLFdBQVMsWUFBQUMsaUJBQWdCO0FBQ2hDLFNBQVMsYUFBYSxtQkFBbUI7OztBQ2N6QyxPQUFPLFdBQVc7OztBQ0xsQixJQUFNLFlBQVksT0FBTyxXQUFXO0FBRzdCLElBQU0sWUFDWCxjQUNDLE9BQU8sU0FBUyxTQUFTLGNBQ3hCLENBQUMsQ0FBQyxPQUFPLFlBQ1QsVUFBVSxVQUFVLFNBQVMsVUFBVTtBQUdwQyxJQUFNLFdBQ1gsY0FDQyxDQUFDLENBQUMsT0FBTyxhQUNSLENBQUMsQ0FBQyxPQUFPLGlCQUNULENBQUMsQ0FBQyxPQUFPLFFBQVEsaUJBQWlCLFVBQ2xDLFVBQVUsVUFBVSxTQUFTLFdBQVc7QUFHckMsSUFBTSxZQUFZLFlBQVksV0FBVyxLQUFLLFVBQVUsU0FBUztBQUNqRSxJQUFNLFFBQVEsWUFBWSxvQkFBb0IsS0FBSyxVQUFVLFNBQVM7QUFNdEUsSUFBTSxZQUFZLE1BQU07QUFDN0IsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxNQUFPLFFBQU87QUFDbEIsTUFBSSxTQUFVLFFBQU87QUFDckIsU0FBTztBQUNULEdBQUc7OztBQ3pDSCxPQUFPQyxVQUFTLGtCQUFrQjs7O0FDQWxDLFNBQVMsV0FBVyxLQUFLO0FBQ3ZCLFNBQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksSUFBSSxNQUFNLENBQUM7QUFDbEQ7QUFFTyxTQUFTLGVBQWUsTUFBTTtBQUNuQyxRQUFNQyxZQUFXLE9BQU8sYUFBYSxjQUFjLFdBQVc7QUFFOUQs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QUEsT0FDRixJQUVBLGNBQWMsSUFBSSxDQUFDLFNBQ2pCLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBRUM7QUFBQSxRQUNBLFVBQVUsTUFBTSxTQUFTLFdBQVcsS0FBSyxFQUFFLENBQUM7QUFBQSxRQUM1QyxVQUFVLE1BQU0sU0FBUyxXQUFXLEtBQUssRUFBRSxDQUFDO0FBQUE7QUFBQSxNQUh2QyxLQUFLO0FBQUEsSUFJWixDQUNELEdBRUw7QUFBQSxJQUVBLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUyxNQUFNLGFBQWEsSUFBSTtBQUFBLFFBQ2hDLFdBQVU7QUFBQSxRQUVWLDBCQUFBQSxNQUFDLGdCQUFLLFdBQVUsa0NBQWlDLGVBQUM7QUFBQTtBQUFBLElBQ3BEO0FBQUEsSUFFQyxhQUNDLGdCQUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUyxNQUFNLGFBQWEsS0FBSztBQUFBLFFBQ2pDLE9BQU87QUFBQTtBQUFBLElBQ1Q7QUFBQSxLQUVKLEdBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAidXNlU3RhdGUiLCAiUmVhY3QiLCAicGxhdGZvcm0iLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIiwgInVzZVN0YXRlIl0KfQo=

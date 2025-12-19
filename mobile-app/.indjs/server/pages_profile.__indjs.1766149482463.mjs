var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/profile.jsx
import React28 from "react";

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
import React, { forwardRef } from "react";

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
var StyleSheet2 = {
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
var style_sheet_default = StyleSheet2;

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
import React2 from "react";

// node_modules/indjs/src/components/view.jsx
import React3, { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var View = forwardRef2(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("view");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx2(Component, { ref, style: flatStyle, className, ...rest, children });
});
View.displayName = "View";
var view_default = View;

// node_modules/indjs/src/components/text.jsx
import React4, { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Text = forwardRef3(({ children, style, className, ...rest }, ref) => {
  const Component = resolveElement("text");
  const flatStyle = style_sheet_default.flatten([style]);
  return /* @__PURE__ */ jsx3(Component, { ref, style: flatStyle, className, ...rest, children });
});
Text.displayName = "Text";
var text_default = Text;

// node_modules/indjs/src/components/scroll-view.jsx
import React5, { forwardRef as forwardRef4 } from "react";
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
import React6, { forwardRef as forwardRef5 } from "react";
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
      ...StyleSheet.flatten(style)
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
          className,
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
        className,
        ...rest
      }
    );
  }
);
TextInput.displayName = "TextInput";

// node_modules/indjs/src/components/button.jsx
import React7, { forwardRef as forwardRef6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button = forwardRef6(
  ({ title, onPress, color, disabled, ...rest }, ref) => {
    const Component = resolveElement("button");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx6(
        "button",
        {
          ref,
          onClick: onPress,
          disabled,
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
        ...rest
      }
    );
  }
);
Button.displayName = "Button";

// node_modules/indjs/src/components/activity-indicator.jsx
import React8, { forwardRef as forwardRef7 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ActivityIndicator = forwardRef7(
  ({ size = "small", color = "#999", style, ...rest }, ref) => {
    const Component = resolveElement("activityindicator");
    if (Component === "div" || Component === "view") {
      const spinnerStyle = {
        animation: "indjs-spin 1s linear infinite",
        display: "inline-block",
        ...style_sheet_default.flatten(style)
      };
      if (typeof document !== "undefined" && !document.getElementById("indjs-spin-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "indjs-spin-style";
        styleEl.innerHTML = `@keyframes indjs-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(styleEl);
      }
      return /* @__PURE__ */ jsx7("div", { ref, style: spinnerStyle, ...rest });
    }
    return /* @__PURE__ */ jsx7(Component, { ref, size, color, style, ...rest });
  }
);
ActivityIndicator.displayName = "ActivityIndicator";

// node_modules/indjs/src/components/switch.jsx
import React9, { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch = forwardRef8(
  ({ value, onValueChange, disabled, trackColor, thumbColor, style, ...rest }, ref) => {
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
        ...rest
      }
    );
  }
);
Switch.displayName = "Switch";

// node_modules/indjs/src/components/flat-list.jsx
import React10, { forwardRef as forwardRef9 } from "react";
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
          const Empty = React10.isValidElement(ListEmptyComponent) ? ListEmptyComponent : /* @__PURE__ */ jsx9(ListEmptyComponent, {});
          return /* @__PURE__ */ jsxs(
            scroll_view_default,
            {
              contentContainerStyle,
              horizontal,
              ref,
              ...rest,
              children: [
                ListHeaderComponent && (React10.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
                Empty,
                ListFooterComponent && (React10.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
              ]
            }
          );
        }
      }
      const items = data || [];
      const renderList = () => {
        return items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index.toString();
          return /* @__PURE__ */ jsx9(React10.Fragment, { children: renderItem({ item, index }) }, key);
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
            ListHeaderComponent && (React10.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx9(ListHeaderComponent, {})),
            renderList(),
            ListFooterComponent && (React10.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx9(ListFooterComponent, {}))
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
import React11, { forwardRef as forwardRef10 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var TouchableOpacity = forwardRef10(
  ({ children, style, onPress, activeOpacity = 0.2, ...rest }, ref) => {
    const Component = resolveElement("touchableopacity");
    if (Component === "button" || Component === "div") {
      return /* @__PURE__ */ jsx10(
        "button",
        {
          ref,
          style: style_sheet_default.flatten([{ cursor: "pointer" }, style]),
          onClick: onPress,
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
        ...rest,
        children
      }
    );
  }
);
TouchableOpacity.displayName = "TouchableOpacity";

// node_modules/indjs/src/components/pressable.jsx
import React12, { forwardRef as forwardRef11 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Pressable = forwardRef11(({ children, style, onPress, ...rest }, ref) => {
  const Component = resolveElement("pressable");
  if (Component === "button" || Component === "div") {
    const flatStyle = style_sheet_default.flatten([
      { cursor: "pointer" },
      typeof style === "function" ? style({ pressed: false }) : style
    ]);
    return /* @__PURE__ */ jsx11("button", { ref, style: flatStyle, onClick: onPress, ...rest, children: typeof children === "function" ? children({ pressed: false }) : children });
  }
  return /* @__PURE__ */ jsx11(Component, { ref, style, onPress, ...rest, children });
});
Pressable.displayName = "Pressable";
var pressable_default = Pressable;

// node_modules/indjs/src/components/image-background.jsx
import React13, { forwardRef as forwardRef12 } from "react";
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
import React14, { forwardRef as forwardRef13 } from "react";
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
import React15, { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var SafeAreaView = forwardRef14(({ children, style, ...rest }, ref) => {
  const Component = resolveElement("safeareaview");
  if (Component === "div" || Component === "view") {
    const flatStyle = style_sheet_default.flatten([style]);
    return /* @__PURE__ */ jsx14("div", { ref, style: flatStyle, ...rest, children });
  }
  return /* @__PURE__ */ jsx14(Component, { ref, style, ...rest, children });
});
SafeAreaView.displayName = "SafeAreaView";

// node_modules/indjs/src/components/status-bar.jsx
import React16 from "react";

// node_modules/indjs/src/components/section-list.jsx
import React17, { forwardRef as forwardRef15 } from "react";
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
          return /* @__PURE__ */ jsxs2(React17.Fragment, { children: [
            renderSectionHeader && renderSectionHeader({ section }),
            data.map((item, itemIndex) => {
              const itemKey = keyExtractor ? keyExtractor(item, itemIndex) : item.key || item.id || key + "-" + itemIndex;
              return /* @__PURE__ */ jsx15(React17.Fragment, { children: renderItem({ item, index: itemIndex, section }) }, itemKey);
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
            ListHeaderComponent && (React17.isValidElement(ListHeaderComponent) ? ListHeaderComponent : /* @__PURE__ */ jsx15(ListHeaderComponent, {})),
            renderSections(),
            ListFooterComponent && (React17.isValidElement(ListFooterComponent) ? ListFooterComponent : /* @__PURE__ */ jsx15(ListFooterComponent, {}))
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
import React18, { forwardRef as forwardRef16 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var KeyboardAvoidingView = forwardRef16(
  ({
    children,
    style,
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    enabled,
    ...rest
  }, ref) => {
    const Component = resolveElement("keyboardavoidingview");
    if (Component === "div" || Component === "view") {
      return /* @__PURE__ */ jsx16("div", { ref, style: style_sheet_default.flatten(style), ...rest, children });
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
        ...rest,
        children
      }
    );
  }
);
KeyboardAvoidingView.displayName = "KeyboardAvoidingView";

// node_modules/indjs/src/components/refresh-control.jsx
import React19, { forwardRef as forwardRef17 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var RefreshControl = forwardRef17(({ refreshing, onRefresh, ...rest }, ref) => {
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
      ...rest
    }
  );
});
RefreshControl.displayName = "RefreshControl";

// node_modules/indjs/src/components/touchable-highlight.jsx
import React20, { forwardRef as forwardRef18 } from "react";
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
import React21, { cloneElement, Children } from "react";

// node_modules/indjs/src/components/screen.jsx
import React22, { forwardRef as forwardRef19 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Screen = forwardRef19(({ children, background = "light", className = "", style, ...props }, ref) => {
  const finalClass = className.trim();
  return /* @__PURE__ */ jsx19(view_default, { ref, className: finalClass, style, ...props, children });
});
Screen.displayName = "Screen";

// node_modules/indjs/src/components/container.jsx
import React23, { forwardRef as forwardRef20 } from "react";
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
import React24, { forwardRef as forwardRef21 } from "react";
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
import React25, { forwardRef as forwardRef22 } from "react";
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
import React26, { forwardRef as forwardRef23 } from "react";
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
import React27, { forwardRef as forwardRef24 } from "react";
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

// pages/profile.jsx
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function Profile() {
  const userStats = [
    { label: "Tasks Completed", value: "127", icon: "\u2705" },
    { label: "Active Tasks", value: "12", icon: "\u{1F4DD}" },
    { label: "Streak Days", value: "7", icon: "\u{1F525}" },
    { label: "Total Points", value: "1,250", icon: "\u2B50" }
  ];
  const achievements = [
    { title: "Early Bird", description: "Complete 5 tasks before 9 AM", earned: true, icon: "\u{1F305}" },
    { title: "Productivity Master", description: "Complete 50 tasks", earned: true, icon: "\u{1F3C6}" },
    { title: "Week Warrior", description: "7 day streak", earned: true, icon: "\u{1F4AA}" },
    { title: "Task Champion", description: "Complete 100 tasks", earned: false, icon: "\u{1F451}" }
  ];
  return /* @__PURE__ */ jsx25(scroll_view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: /* @__PURE__ */ jsxs3(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs3(view_default, { className: "items-center mb-8", children: [
      /* @__PURE__ */ jsx25(view_default, { className: "w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx25(text_default, { className: "text-4xl text-white", children: "\u{1F464}" }) }),
      /* @__PURE__ */ jsx25(text_default, { className: "text-2xl font-bold text-gray-800 mb-1", children: "John Doe" }),
      /* @__PURE__ */ jsx25(text_default, { className: "text-gray-600", children: "john.doe@example.com" }),
      /* @__PURE__ */ jsx25(view_default, { className: "mt-4 px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full", children: /* @__PURE__ */ jsx25(text_default, { className: "text-white font-semibold", children: "Pro Member" }) })
    ] }),
    /* @__PURE__ */ jsxs3(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx25(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Your Stats" }),
      /* @__PURE__ */ jsx25(view_default, { className: "grid grid-cols-2 gap-4", children: userStats.map((stat, index) => /* @__PURE__ */ jsxs3(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx25(text_default, { className: "text-3xl mb-2", children: stat.icon }),
        /* @__PURE__ */ jsx25(text_default, { className: "text-2xl font-bold text-violet-600 mb-1", children: stat.value }),
        /* @__PURE__ */ jsx25(text_default, { className: "text-sm text-gray-600", children: stat.label })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs3(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx25(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Achievements" }),
      /* @__PURE__ */ jsx25(view_default, { className: "space-y-4", children: achievements.map((achievement, index) => /* @__PURE__ */ jsx25(
        view_default,
        {
          className: `bg-white rounded-2xl p-4 shadow-lg ${achievement.earned ? "" : "opacity-50"}`,
          children: /* @__PURE__ */ jsxs3(view_default, { className: "flex flex-row items-center gap-4", children: [
            /* @__PURE__ */ jsx25(view_default, { className: `w-14 h-14 rounded-full flex items-center justify-center ${achievement.earned ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-gray-200"}`, children: /* @__PURE__ */ jsx25(text_default, { className: "text-2xl", children: achievement.icon }) }),
            /* @__PURE__ */ jsxs3(view_default, { className: "flex-1", children: [
              /* @__PURE__ */ jsx25(text_default, { className: "text-lg font-bold text-gray-800 mb-1", children: achievement.title }),
              /* @__PURE__ */ jsx25(text_default, { className: "text-sm text-gray-600", children: achievement.description })
            ] }),
            achievement.earned && /* @__PURE__ */ jsx25(view_default, { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx25(text_default, { className: "text-white text-xl", children: "\u2713" }) })
          ] })
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs3(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx25(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Settings" }),
      /* @__PURE__ */ jsx25(view_default, { className: "bg-white rounded-2xl shadow-lg overflow-hidden", children: ["Notifications", "Theme", "Language", "Privacy", "Help & Support", "Logout"].map((item, index) => /* @__PURE__ */ jsxs3(
        pressable_default,
        {
          className: `px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? "border-b border-gray-100" : ""}`,
          children: [
            /* @__PURE__ */ jsx25(text_default, { className: "text-gray-800 font-medium", children: item }),
            /* @__PURE__ */ jsx25(text_default, { className: "text-gray-400", children: "\u203A" })
          ]
        },
        index
      )) })
    ] })
  ] }) });
}
export {
  Profile as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvcHJvZmlsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9wbGF0Zm9ybS5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL3VuaXZlcnNhbC9yZXNvbHZlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9zdHlsZS1zaGVldC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2xpbmsuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy92aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3Njcm9sbC12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdGV4dC1pbnB1dC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2J1dHRvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N3aXRjaC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ZsYXQtbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvcHJlc3NhYmxlLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UtYmFja2dyb3VuZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL21vZGFsLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zdGF0dXMtYmFyLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc2VjdGlvbi1saXN0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQtYXZvaWRpbmctdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3JlZnJlc2gtY29udHJvbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RvdWNoYWJsZS1oaWdobGlnaHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NjcmVlbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2NhcmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9ncmlkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pY29uLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2xpbmtpbmcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9maWxlKCkge1xyXG4gICAgY29uc3QgdXNlclN0YXRzID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdUYXNrcyBDb21wbGV0ZWQnLCB2YWx1ZTogJzEyNycsIGljb246ICdcdTI3MDUnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0FjdGl2ZSBUYXNrcycsIHZhbHVlOiAnMTInLCBpY29uOiAnXHVEODNEXHVEQ0REJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdTdHJlYWsgRGF5cycsIHZhbHVlOiAnNycsIGljb246ICdcdUQ4M0RcdUREMjUnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1RvdGFsIFBvaW50cycsIHZhbHVlOiAnMSwyNTAnLCBpY29uOiAnXHUyQjUwJyB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGFjaGlldmVtZW50cyA9IFtcclxuICAgICAgICB7IHRpdGxlOiAnRWFybHkgQmlyZCcsIGRlc2NyaXB0aW9uOiAnQ29tcGxldGUgNSB0YXNrcyBiZWZvcmUgOSBBTScsIGVhcm5lZDogdHJ1ZSwgaWNvbjogJ1x1RDgzQ1x1REYwNScgfSxcclxuICAgICAgICB7IHRpdGxlOiAnUHJvZHVjdGl2aXR5IE1hc3RlcicsIGRlc2NyaXB0aW9uOiAnQ29tcGxldGUgNTAgdGFza3MnLCBlYXJuZWQ6IHRydWUsIGljb246ICdcdUQ4M0NcdURGQzYnIH0sXHJcbiAgICAgICAgeyB0aXRsZTogJ1dlZWsgV2FycmlvcicsIGRlc2NyaXB0aW9uOiAnNyBkYXkgc3RyZWFrJywgZWFybmVkOiB0cnVlLCBpY29uOiAnXHVEODNEXHVEQ0FBJyB9LFxyXG4gICAgICAgIHsgdGl0bGU6ICdUYXNrIENoYW1waW9uJywgZGVzY3JpcHRpb246ICdDb21wbGV0ZSAxMDAgdGFza3MnLCBlYXJuZWQ6IGZhbHNlLCBpY29uOiAnXHVEODNEXHVEQzUxJyB9XHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHZpYS1wdXJwbGUtNTAgdG8tZnVjaHNpYS01MFwiPlxyXG4gICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cclxuICAgICAgICAgICAgICAgIHsvKiBQcm9maWxlIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIml0ZW1zLWNlbnRlciBtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwidy0yNCBoLTI0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIHRleHQtd2hpdGVcIj5cdUQ4M0RcdURDNjQ8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj5Kb2huIERvZTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+am9obi5kb2VAZXhhbXBsZS5jb208L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibXQtNCBweC02IHB5LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgcm91bmRlZC1mdWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1zZW1pYm9sZFwiPlBybyBNZW1iZXI8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBTdGF0cyBHcmlkICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWItOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS04MDAgbWItNFwiPllvdXIgU3RhdHM8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dXNlclN0YXRzLm1hcCgoc3RhdCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtYi0yXCI+e3N0YXQuaWNvbn08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMCBtYi0xXCI+e3N0YXQudmFsdWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPntzdGF0LmxhYmVsfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBBY2hpZXZlbWVudHMgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtYi00XCI+QWNoaWV2ZW1lbnRzPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWNoaWV2ZW1lbnRzLm1hcCgoYWNoaWV2ZW1lbnQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IHNoYWRvdy1sZyAke2FjaGlldmVtZW50LmVhcm5lZCA/ICcnIDogJ29wYWNpdHktNTAnfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgdy0xNCBoLTE0IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciAke2FjaGlldmVtZW50LmVhcm5lZCA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCcgOiAnYmctZ3JheS0yMDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj57YWNoaWV2ZW1lbnQuaWNvbn08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj57YWNoaWV2ZW1lbnQudGl0bGV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+e2FjaGlldmVtZW50LmRlc2NyaXB0aW9ufTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWNoaWV2ZW1lbnQuZWFybmVkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInctOCBoLTggYmctZ3JlZW4tNTAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC14bFwiPlx1MjcxMzwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogU2V0dGluZ3MgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtYi00XCI+U2V0dGluZ3M8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgc2hhZG93LWxnIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7WydOb3RpZmljYXRpb25zJywgJ1RoZW1lJywgJ0xhbmd1YWdlJywgJ1ByaXZhY3knLCAnSGVscCAmIFN1cHBvcnQnLCAnTG9nb3V0J10ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS00IGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiAke2luZGV4ICE9PSA1ID8gJ2JvcmRlci1iIGJvcmRlci1ncmF5LTEwMCcgOiAnJ31gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDAgZm9udC1tZWRpdW1cIj57aXRlbX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiPlx1MjAzQTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1Njcm9sbFZpZXc+XHJcbiAgICApO1xyXG59XHJcbiIsICIvKipcbiAqIFBsYXRmb3JtIGRldGVjdGlvbiB1dGlsaXRpZXMgZm9yIElOREpTXG4gKlxuICogVXNhZ2U6XG4gKiBpbXBvcnQgeyBpc1dlYiwgaXNEZXNrdG9wLCBpc01vYmlsZSwgaXNBbmRyb2lkLCBpc0lPUywgcGxhdGZvcm0gfSBmcm9tICdpbmRqcyc7XG4gKlxuICogaWYgKGlzTW9iaWxlKSB7IC4uLiB9XG4gKi9cblxuLy8gQ2hlY2sgaWYgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG5cbi8vIEVsZWN0cm9uIGRldGVjdGlvbiAocmVuZGVyZXIgcHJvY2VzcylcbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3AgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKHdpbmRvdy5wcm9jZXNzPy50eXBlID09PSBcInJlbmRlcmVyXCIgfHxcbiAgICAhIXdpbmRvdy5lbGVjdHJvbiB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJFbGVjdHJvblwiKSk7XG5cbi8vIENhcGFjaXRvciBkZXRlY3Rpb25cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9XG4gIGlzQnJvd3NlciAmJlxuICAoISF3aW5kb3cuQ2FwYWNpdG9yIHx8XG4gICAgISF3aW5kb3cuYW5kcm9pZEJyaWRnZSB8fFxuICAgICEhd2luZG93LndlYmtpdD8ubWVzc2FnZUhhbmRsZXJzPy5icmlkZ2UgfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2FwYWNpdG9yXCIpKTtcblxuLy8gU3BlY2lmaWMgbW9iaWxlIHBsYXRmb3Jtc1xuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IGlzTW9iaWxlICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmV4cG9ydCBjb25zdCBpc0lPUyA9IGlzTW9iaWxlICYmIC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gV2ViIGZhbGxiYWNrIChpZiBub3QgZGVza3RvcCBvciBtb2JpbGUgYXBwKVxuZXhwb3J0IGNvbnN0IGlzV2ViID0gIWlzRGVza3RvcCAmJiAhaXNNb2JpbGU7XG5cbi8vIEdldCBjdXJyZW50IHBsYXRmb3JtIG5hbWVcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybSA9ICgoKSA9PiB7XG4gIGlmIChpc0Rlc2t0b3ApIHJldHVybiBcImRlc2t0b3BcIjtcbiAgaWYgKGlzQW5kcm9pZCkgcmV0dXJuIFwiYW5kcm9pZFwiO1xuICBpZiAoaXNJT1MpIHJldHVybiBcImlvc1wiO1xuICBpZiAoaXNNb2JpbGUpIHJldHVybiBcIm1vYmlsZVwiOyAvLyBmYWxsYmFja1xuICByZXR1cm4gXCJ3ZWJcIjtcbn0pKCk7XG5cbi8vIFJlYWN0IE5hdGl2ZSBjb21wYXRpYmxlIEFQSVxuZXhwb3J0IGNvbnN0IE9TID0gcGxhdGZvcm07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSAob2JqKSA9PiB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoT1MpKSByZXR1cm4gb2JqW09TXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIm5hdGl2ZVwiKSAmJiBpc01vYmlsZSkgcmV0dXJuIG9ialtcIm5hdGl2ZVwiXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRcIikpIHJldHVybiBvYmpbXCJkZWZhdWx0XCJdO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1dlYixcbiAgaXNEZXNrdG9wLFxuICBpc01vYmlsZSxcbiAgaXNBbmRyb2lkLFxuICBpc0lPUyxcbiAgcGxhdGZvcm0sXG4gIE9TLFxuICBzZWxlY3QsXG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEltYWdlID0gZm9yd2FyZFJlZigoeyBzdHlsZSwgc291cmNlLCBzcmMsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiaW1hZ2VcIik7XG5cbiAgLy8gUmVhY3QgTmF0aXZlIHVzZXMgJ3NvdXJjZScsIFdlYiB1c2VzICdzcmMnLlxuICAvLyBXZSBzdXBwb3J0IGJvdGggcHJvcHMgZm9yIHVuaXZlcnNhbCB1c2FnZS5cbiAgY29uc3QgaW1hZ2VTb3VyY2UgPSBzcmMgfHwgKHNvdXJjZSAmJiBzb3VyY2UudXJpKSB8fCBcIlwiO1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLnJlc3QsXG4gICAgc3JjOiBpbWFnZVNvdXJjZSxcbiAgICByZWYsXG4gIH07XG5cbiAgaWYgKENvbXBvbmVudCAhPT0gXCJpbWdcIiAmJiBDb21wb25lbnQgIT09IFwiaW1hZ2VcIikge1xuICAgIC8vIElmIGl0IHJlZmVycyB0byBSZWFjdCBOYXRpdmUgSW1hZ2UsIGl0IGV4cGVjdHMgJ3NvdXJjZSdcbiAgICBwcm9wcy5zb3VyY2UgPSBzb3VyY2UgfHwgeyB1cmk6IHNyYyB9O1xuICAgIGRlbGV0ZSBwcm9wcy5zcmM7XG4gIH1cblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIDxDb21wb25lbnQgc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnByb3BzfSAvPjtcbn0pO1xuXG5JbWFnZS5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VcIjtcbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIiwgImZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gdHlwZW9mIFBMQVRGT1JNICE9PSBcInVuZGVmaW5lZFwiID8gUExBVEZPUk0gOiBcIndlYlwiO1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3ZWJcIikge1xuICAgIGNvbnN0IHdlYk1hcCA9IHtcbiAgICAgIHZpZXc6IFwiZGl2XCIsXG4gICAgICB0ZXh0OiBcInNwYW5cIixcbiAgICAgIGltYWdlOiBcImltZ1wiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcImRpdlwiLCAvLyBtYXAgaW1hZ2UtYmFja2dyb3VuZCB0byBkaXYgd2l0aCBzdHlsZVxuICAgICAgc2Nyb2xsdmlldzogXCJkaXZcIixcbiAgICAgIGZsYXRsaXN0OiBcImRpdlwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiZGl2XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJkaXZcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJkaXZcIixcbiAgICAgIHByZXNzYWJsZTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiYnV0dG9uXCIsXG4gICAgICBzd2l0Y2g6IFwiaW5wdXRcIiwgLy8gdHlwZT0nY2hlY2tib3gnXG4gICAgICB0ZXh0YXJlYTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgYnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgbW9kYWw6IFwiZGl2XCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJkaXZcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcImRpdlwiLFxuICAgIH07XG4gICAgcmV0dXJuIHdlYk1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgXCJkaXZcIjtcbiAgfVxuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJtb2JpbGVcIikge1xuICAgIC8vIEluIFJlYWN0IE5hdGl2ZSwgY29tcG9uZW50cyBhcmUgQ2FtZWxDYXNlXG4gICAgLy8gV2UgbmVlZCB0byBtYXAgZ2VuZXJpYyBuYW1lcyB0byBSTiBuYW1lc1xuICAgIGNvbnN0IG1vYmlsZU1hcCA9IHtcbiAgICAgIHZpZXc6IFwiVmlld1wiLFxuICAgICAgdGV4dDogXCJUZXh0XCIsXG4gICAgICBpbWFnZTogXCJJbWFnZVwiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcIkltYWdlQmFja2dyb3VuZFwiLFxuICAgICAgc2Nyb2xsdmlldzogXCJTY3JvbGxWaWV3XCIsXG4gICAgICBmbGF0bGlzdDogXCJGbGF0TGlzdFwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiU2VjdGlvbkxpc3RcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiU2FmZUFyZWFWaWV3XCIsXG4gICAgICBwcmVzc2FibGU6IFwiUHJlc3NhYmxlXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcIlRvdWNoYWJsZU9wYWNpdHlcIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJUb3VjaGFibGVIaWdobGlnaHRcIixcbiAgICAgIHN3aXRjaDogXCJTd2l0Y2hcIixcbiAgICAgIG1vZGFsOiBcIk1vZGFsXCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJBY3Rpdml0eUluZGljYXRvclwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiUmVmcmVzaENvbnRyb2xcIixcbiAgICAgIGJ1dHRvbjogXCJCdXR0b25cIixcbiAgICB9O1xuICAgIGNvbnN0IHJuTmFtZSA9XG4gICAgICBtb2JpbGVNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IGNhcGl0YWxpemUodHlwZSk7XG5cbiAgICAvLyBTYWZldHkgY2hlY2sgZm9yIFJlYWN0IE5hdGl2ZSBlbnZpcm9ubWVudFxuICAgIC8vIHJlYWN0LW5hdGl2ZS13ZWIgbWlnaHQgYmUgYWxpYXNlZCwgb3Igd2UgbWlnaHQgYmUgaW4gYSByZWFsIFJOIGVudmlyb25tZW50XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVzaW5nIGdsb2JhbCBjaGVjayBvciBzYWZlIHJlcXVpcmVcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcInJlYWN0LW5hdGl2ZVwiKVtybk5hbWVdO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QgJiZcbiAgICAgICAgd2luZG93LlJlYWN0Lk5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuUmVhY3QuTmF0aXZlW3JuTmFtZV07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdCBOYXRpdmUgY29tcG9uZW50ICR7cm5OYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gVmlldyBvciBkaXYgZGVwZW5kaW5nIG9uIGNvbnRleHQsIGJ1dCBWaWV3IGlzIHNhZmUgZW5vdWdoIGZvciBsb2dpY2FsIHJldHVybiBpZiBtb2NrZWRcbiAgICByZXR1cm4gXCJWaWV3XCI7XG4gIH1cblxuICByZXR1cm4gXCJkaXZcIjtcbn1cbiIsICIvLyBNb2NrIFN0eWxlU2hlZXQgZm9yIGNvbXBhdGliaWxpdHkuXG4vLyBJbiBJTkRKUyB3ZWIsIHdlIHVzdWFsbHkgdXNlIHN0YW5kYXJkIHN0eWxlIG9iamVjdHMgb3IgQ1NTLlxuLy8gVGhpcyBhbGxvd3MgU3R5bGVTaGVldC5jcmVhdGUoe30pIHRvIHJldHVybiB0aGUgb2JqZWN0cyBhcy1pcy5cblxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXQgPSB7XG4gIGNyZWF0ZTogKHN0eWxlcykgPT4gc3R5bGVzLFxuICBmbGF0dGVuOiAoc3R5bGVzKSA9PiB7XG4gICAgaWYgKCFzdHlsZXMpIHJldHVybiB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IChpdGVtID8geyAuLi5hY2MsIC4uLml0ZW0gfSA6IGFjYyksIHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgaGFpcmxpbmVXaWR0aDogMSxcbiAgYWJzb2x1dGVGaWxsOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG4gIGFic29sdXRlRmlsbE9iamVjdDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVTaGVldDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIElOREpTIExpbmsgY29tcG9uZW50IC0gbGlnaHR3ZWlnaHQgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBoZWxwZXJcbi8vIFBlcmZvcm1zIFNQQS1saWtlIG5hdmlnYXRpb24gZm9yIHNhbWUtb3JpZ2luIGludGVybmFsIGxpbmtzLlxuLy8gUHJvcHM6IGhyZWYsIHByZWZldGNoLCByZXBsYWNlLCBzY3JvbGwgKGRlZmF1bHQgdHJ1ZSksIG9uQ2xpY2ssIHRhcmdldCwgcmVsLCBjbGFzc05hbWUsIHN0eWxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIHByZWZldGNoID0gZmFsc2UsXG4gIHJlcGxhY2UgPSBmYWxzZSxcbiAgc2Nyb2xsID0gdHJ1ZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgdGFyZ2V0LFxuICByZWwsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgLy8gQmFzaWMgcHJlZmV0Y2g6IGhpbnQgdGhlIGJyb3dzZXIgdmlhIDxsaW5rIHJlbD1cInByZWZldGNoXCI+XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmVmZXRjaCB8fCAhaHJlZikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICBsLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiAgICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGwpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGwpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuICAgIH0gY2F0Y2gge31cbiAgfSwgW2hyZWYsIHByZWZldGNoXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGUpO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAvLyBPbmx5IGludGVyY2VwdCBzaW1wbGUgbGVmdC1jbGlja3Mgd2l0aG91dCBtb2RpZmllciBrZXlzXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAoIWhyZWYpIHJldHVybjtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gXCJfc2VsZlwiKSByZXR1cm47XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEludmFsaWQgVVJMLCBsZXQgYnJvd3NlciBoYW5kbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2tpcCBub24taHR0cChzKSBwcm90b2NvbHMgYW5kIHNwZWNpYWwgc2NoZW1lc1xuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmIChwcm90byAmJiBwcm90byAhPT0gXCJodHRwOlwiICYmIHByb3RvICE9PSBcImh0dHBzOlwiKSByZXR1cm47XG4gICAgLy8gRXh0ZXJuYWxcbiAgICBpZiAodXJsLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgIC8vIFJlc3BlY3QgZG93bmxvYWQgbGlua3NcbiAgICBpZiAocmVzdC5kb3dubG9hZCkgcmV0dXJuO1xuICAgIC8vIEhhc2gtb25seSBuYXZpZ2F0aW9uIG9wdGltaXphdGlvblxuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGNvbnN0IG5leHQgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG4gICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gRG8gcHVzaC9yZXBsYWNlIHN0YXRlXG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIC8vIEVtaXQgYSBjdXN0b20gbmF2aWdhdGlvbiBldmVudCBzbyB0aGUgYXBwIGNhbiBsb2FkIHRoZSB0YXJnZXQgbW9kdWxlXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJpbmQ6bmF2aWdhdGVcIiwgeyBkZXRhaWw6IHsgaHJlZjogbmV4dCB9IH0pLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgLy8gU2Nyb2xsIGJlaGF2aW9yXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWxGaW5hbCA9XG4gICAgdGFyZ2V0ID09PSBcIl9ibGFua1wiXG4gICAgICA/IFtyZWwsIFwibm9vcGVuZXJcIiwgXCJub3JlZmVycmVyXCJdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKVxuICAgICAgOiByZWw7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiYVwiLFxuICAgIHtcbiAgICAgIGhyZWYsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIHRhcmdldCxcbiAgICAgIHJlbDogcmVsRmluYWwsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ2aWV3XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVmlldy5kaXNwbGF5TmFtZSA9IFwiVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0ZXh0XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVGV4dC5kaXNwbGF5TmFtZSA9IFwiVGV4dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTY3JvbGxWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2Nyb2xsdmlld1wiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiBob3Jpem9udGFsID8gXCJhdXRvXCIgOiBcImhpZGRlblwiLFxuICAgICAgICBvdmVyZmxvd1k6IGhvcml6b250YWwgPyBcImhpZGRlblwiIDogXCJhdXRvXCIsXG4gICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2NvbnRhaW5lclN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbnRlbnRTdHlsZX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17c2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5TY3JvbGxWaWV3LmRpc3BsYXlOYW1lID0gXCJTY3JvbGxWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTY3JvbGxWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5UZXh0SW5wdXQuZGlzcGxheU5hbWUgPSBcIlRleHRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEJ1dHRvbiA9IGZvcndhcmRSZWYoXG4gICh7IHRpdGxlLCBvblByZXNzLCBjb2xvciwgZGlzYWJsZWQsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMXMgbGluZWFyIGluZmluaXRlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbmplY3Qga2V5ZnJhbWVzIGlmIG5vdCBwcmVzZW50XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRqcy1zcGluLXN0eWxlXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGVFbC5pZCA9IFwiaW5kanMtc3Bpbi1zdHlsZVwiO1xuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGBAa2V5ZnJhbWVzIGluZGpzLXNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPGRpdiByZWY9e3JlZn0gc3R5bGU9e3NwaW5uZXJTdHlsZX0gey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzaXplPXtzaXplfSBjb2xvcj17Y29sb3J9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9IC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvblZhbHVlQ2hhbmdlPXtvblZhbHVlQ2hhbmdlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHRyYWNrQ29sb3I9e3RyYWNrQ29sb3J9XG4gICAgICAgIHRodW1iQ29sb3I9e3RodW1iQ29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5Td2l0Y2guZGlzcGxheU5hbWUgPSBcIlN3aXRjaFwiO1xuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgRmxhdExpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgZGF0YSxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIExpc3RFbXB0eUNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIG51bUNvbHVtbnMgPSAxLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImZsYXRsaXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoTGlzdEVtcHR5Q29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgRW1wdHkgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0RW1wdHlDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMaXN0RW1wdHlDb21wb25lbnQgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0VtcHR5fVxuICAgICAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YSB8fCBbXTtcbiAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpbmRleClcbiAgICAgICAgICAgIDogaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleCB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmbGF0Q29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2ZsYXRDb250ZW50U3R5bGV9XG4gICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyTGlzdCgpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RFbXB0eUNvbXBvbmVudD17TGlzdEVtcHR5Q29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgbnVtQ29sdW1ucz17bnVtQ29sdW1uc31cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5GbGF0TGlzdC5kaXNwbGF5TmFtZSA9IFwiRmxhdExpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IEZsYXRMaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZU9wYWNpdHkgPSBmb3J3YXJkUmVmKFxuICAoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGFjdGl2ZU9wYWNpdHkgPSAwLjIsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gb25DbGljaz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzYWZlYXJlYXZpZXdcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblNhZmVBcmVhVmlldy5kaXNwbGF5TmFtZSA9IFwiU2FmZUFyZWFWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTYWZlQXJlYVZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcblxuLy8gV2ViIG1vY2sgb2YgU3RhdHVzQmFyLiBJbiBuYXRpdmUgaXQgd291bGQgY2hhbmdlIHRoZSBiYXIgc3R5bGUuXG4vLyBJbiB3ZWIsIG1heWJlIGl0IGNoYW5nZXMgdGhlIG1ldGEgdGhlbWUtY29sb3IgdGFnLlxuXG5mdW5jdGlvbiBTdGF0dXNCYXIoeyBiYXJTdHlsZSA9IFwiZGVmYXVsdFwiLCBiYWNrZ3JvdW5kQ29sb3IsIGhpZGRlbiA9IGZhbHNlIH0pIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNldCB0aGVtZS1jb2xvciBtZXRhIHRhZyBpZiBiYWNrZ3JvdW5kQ29sb3IgcHJvdmlkZWRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJyk7XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICBtZXRhLm5hbWUgPSBcInRoZW1lLWNvbG9yXCI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgICB9XG4gICAgICBtZXRhLmNvbnRlbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICB9LCBbYmFja2dyb3VuZENvbG9yXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2VjdGlvbkxpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgc2VjdGlvbnMsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcixcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkID0gdHJ1ZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzZWN0aW9ubGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCByZW5kZXJTZWN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChzZWN0aW9ucyB8fCBbXSkubWFwKChzZWN0aW9uLCBzZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc2VjdGlvbi5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHNlY3Rpb24ua2V5IHx8IHNlY3Rpb25JbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVyU2VjdGlvbkhlYWRlciAmJiByZW5kZXJTZWN0aW9uSGVhZGVyKHsgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAge2RhdGEubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtS2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IGl0ZW0ua2V5IHx8IGl0ZW0uaWQgfHwga2V5ICsgXCItXCIgKyBpdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l0ZW1LZXl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4OiBpdGVtSW5kZXgsIHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlclNlY3Rpb25zKCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzZWN0aW9ucz17c2VjdGlvbnN9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXI9e3JlbmRlclNlY3Rpb25IZWFkZXJ9XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU2VjdGlvbkxpc3QuZGlzcGxheU5hbWUgPSBcIlNlY3Rpb25MaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uTGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBLZXlib2FyZEF2b2lkaW5nVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgYmVoYXZpb3IsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0LFxuICAgICAgZW5hYmxlZCxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJrZXlib2FyZGF2b2lkaW5ndmlld1wiKTtcblxuICAgIC8vIE9uIHdlYiwga2V5Ym9hcmQgYXZvaWRpbmcgaXMgdXN1YWxseSBoYW5kbGVkIGJ5IHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3Igb3IgaXMgaXJyZWxldmFudFxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSl9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJyZWZyZXNoY29udHJvbFwiKTtcblxuICAvLyBPbiB3ZWIsIHBhc3MtdGhyb3VnaCBvciBpbXBsZW1lbnQgYmFzaWMgdmlzdWFsP1xuICAvLyBVc3VhbGx5IFJlZnJlc2hDb250cm9sIGlzIHBhc3NlZCBhcyBwcm9wIHRvIFNjcm9sbFZpZXcuXG4gIC8vIElmIHVzZWQgYXMgY29tcG9uZW50LCBpdCBtaWdodCB3cmFwIGNvbnRlbnQuXG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIC8vIE5vLW9wIGZvciB3ZWIgdmlzdWFsIHVzdWFsbHksIHVubGVzcyB3ZSBpbXBsZW1lbnQgcHVsbC10by1yZWZyZXNoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgcmVmcmVzaGluZz17cmVmcmVzaGluZ31cbiAgICAgIG9uUmVmcmVzaD17b25SZWZyZXNofVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIERpbWVuc2lvbnMgQVBJIGZvciBXZWJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgbGlzdGVuZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgbGlzdGVuZXJzLmVtaXQoXCJjaGFuZ2VcIiwgeyB3aW5kb3c6IGdldFdpbmRvdygpLCBzY3JlZW46IGdldFNjcmVlbigpIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NyZWVuKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBzY2FsZTogMSwgZm9udFNjYWxlOiAxIH07XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBEaW1lbnNpb25zID0ge1xuICBnZXQ6IChkaW0pID0+IHtcbiAgICBpZiAoZGltID09PSBcIndpbmRvd1wiKSByZXR1cm4gZ2V0V2luZG93KCk7XG4gICAgaWYgKGRpbSA9PT0gXCJzY3JlZW5cIikgcmV0dXJuIGdldFNjcmVlbigpO1xuICAgIHJldHVybiBnZXRXaW5kb3coKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9uKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub2ZmKFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpbWVuc2lvbnM7XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmV4cG9ydCBjb25zdCBMaW5raW5nID0ge1xuICBvcGVuVVJMOiAodXJsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgXCJfYmxhbmtcIiwgXCJub29wZW5lcixub3JlZmVycmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH0sXG4gIGNhbk9wZW5VUkw6ICh1cmwpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgZ2V0SW5pdGlhbFVSTDogKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJ1cmxcIikge1xuICAgICAgLy8gSW4gYSByZWFsIHdlYiBhcHAsIHdlIG1pZ2h0IGxpc3RlbiB0byBwb3BzdGF0ZSBvciBoYXNoY2hhbmdlXG4gICAgICAvLyBlbnN1cmluZyB3ZSByZXR1cm4gYSBzdWJzY3JpcHRpb24tbGlrZSBvYmplY3RcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGUpID0+IGhhbmRsZXIoeyB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVtb3ZlOiAoKSA9PiB7fSB9O1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIC8vIERlcHJlY2F0ZWQgaW4gUk4gYnV0IGdvb2QgdG8gaGF2ZSBzaWduYXR1cmVcbiAgfSxcbiAgc2VuZEludGVudDogKGFjdGlvbiwgZXh0cmFzKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtpbmc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFBLE9BQU9BLGFBQVc7OztBQ1VsQixJQUFNLFlBQVksT0FBTyxXQUFXO0FBRzdCLElBQU0sWUFDWCxjQUNDLE9BQU8sU0FBUyxTQUFTLGNBQ3hCLENBQUMsQ0FBQyxPQUFPLFlBQ1QsVUFBVSxVQUFVLFNBQVMsVUFBVTtBQUdwQyxJQUFNLFdBQ1gsY0FDQyxDQUFDLENBQUMsT0FBTyxhQUNSLENBQUMsQ0FBQyxPQUFPLGlCQUNULENBQUMsQ0FBQyxPQUFPLFFBQVEsaUJBQWlCLFVBQ2xDLFVBQVUsVUFBVSxTQUFTLFdBQVc7QUFHckMsSUFBTSxZQUFZLFlBQVksV0FBVyxLQUFLLFVBQVUsU0FBUztBQUNqRSxJQUFNLFFBQVEsWUFBWSxvQkFBb0IsS0FBSyxVQUFVLFNBQVM7QUFNdEUsSUFBTSxZQUFZLE1BQU07QUFDN0IsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxVQUFXLFFBQU87QUFDdEIsTUFBSSxNQUFPLFFBQU87QUFDbEIsTUFBSSxTQUFVLFFBQU87QUFDckIsU0FBTztBQUNULEdBQUc7OztBQ3pDSCxPQUFPLFNBQVMsa0JBQWtCOzs7QUNBbEMsU0FBUyxXQUFXLEtBQUs7QUFDdkIsU0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUNsRDtBQUVPLFNBQVMsZUFBZSxNQUFNO0FBQ25DLFFBQU1DLFlBQVcsT0FBTyxhQUFhLGNBQWMsV0FBVztBQUU5RCxNQUFJQSxjQUFhLE9BQU87QUFDdEIsVUFBTSxTQUFTO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQTtBQUFBLE1BQ2pCLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLHNCQUFzQjtBQUFBLE1BQ3RCLGNBQWM7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QVUsUUFDWjtBQUFBLHNCQUFBRCxNQUFDLGdCQUFLLFdBQVUsd0NBQXVDLHNCQUFRO0FBQUEsTUFDL0QsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSxrREFDWCxXQUFDLGlCQUFpQixTQUFTLFlBQVksV0FBVyxrQkFBa0IsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLFVBQ3RGLGdCQUFBQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUcsV0FBVyx3REFBd0QsVUFBVSxJQUFJLDZCQUE2QixFQUFFO0FBQUEsVUFFaEg7QUFBQSw0QkFBQUQsTUFBQyxnQkFBSyxXQUFVLDZCQUE2QixnQkFBSztBQUFBLFlBQ2xELGdCQUFBQSxNQUFDLGdCQUFLLFdBQVUsaUJBQWdCLG9CQUFDO0FBQUE7QUFBQTtBQUFBLFFBSjVCO0FBQUEsTUFLVCxDQUNILEdBQ0w7QUFBQSxPQUNKO0FBQUEsS0FDSixHQUNKO0FBRVI7IiwKICAibmFtZXMiOiBbIlJlYWN0IiwgInBsYXRmb3JtIiwgIlN0eWxlU2hlZXQiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAianN4cyIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIkV2ZW50RW1pdHRlciIsICJqc3giLCAianN4cyJdCn0K

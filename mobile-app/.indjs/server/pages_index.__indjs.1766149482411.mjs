var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// pages/index.jsx
import React30, { useState as useState2 } from "react";
import { useSelector, useDispatch } from "react-redux";

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
var text_input_default = TextInput;

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
var modal_default = Modal;

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

// components/TaskCard.jsx
import React28 from "react";
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
import React29, { useState } from "react";
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
  return /* @__PURE__ */ jsx26(modal_default, { visible: true, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx26(view_default, { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs4(view_default, { className: "bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden", children: [
    /* @__PURE__ */ jsx26(view_default, { className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-5 rounded-t-3xl", children: /* @__PURE__ */ jsxs4(view_default, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx26(text_default, { className: "text-2xl font-bold text-white", children: "Add New Task" }),
      /* @__PURE__ */ jsx26(
        pressable_default,
        {
          onPress: onClose,
          className: "w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300",
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
            className: "flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300",
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
function TasksPage() {
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
    /* @__PURE__ */ jsx27(view_default, { className: "flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-md", children: ["all", "active", "completed"].map((f) => /* @__PURE__ */ jsx27(
      pressable_default,
      {
        onPress: () => setFilter(f),
        className: `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${filter === f ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsx27(text_default, { className: `text-center font-medium ${filter === f ? "text-white" : "text-gray-600"}`, children: f.charAt(0).toUpperCase() + f.slice(1) })
      },
      f
    )) }),
    /* @__PURE__ */ jsx27(view_default, { className: "space-y-4 mb-24", children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-12 text-center shadow-lg", children: [
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
function CategoriesPage() {
  const categories = [
    { name: "Work", count: 8, color: "from-blue-500 to-blue-600", icon: "\u{1F4BC}" },
    { name: "Personal", count: 5, color: "from-purple-500 to-purple-600", icon: "\u{1F3E0}" },
    { name: "Shopping", count: 3, color: "from-pink-500 to-pink-600", icon: "\u{1F6CD}\uFE0F" },
    { name: "Health", count: 4, color: "from-green-500 to-green-600", icon: "\u{1F4AA}" },
    { name: "Study", count: 6, color: "from-yellow-500 to-yellow-600", icon: "\u{1F4DA}" },
    { name: "Finance", count: 2, color: "from-emerald-500 to-emerald-600", icon: "\u{1F4B0}" },
    { name: "Travel", count: 1, color: "from-cyan-500 to-cyan-600", icon: "\u2708\uFE0F" },
    { name: "Other", count: 3, color: "from-gray-500 to-gray-600", icon: "\u{1F4CC}" }
  ];
  return /* @__PURE__ */ jsx27(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs5(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs5(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Categories" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-600 text-lg", children: "Organize tasks by category" })
    ] }),
    /* @__PURE__ */ jsx27(view_default, { className: "grid grid-cols-2 gap-4 mb-24", children: categories.map((category, index) => /* @__PURE__ */ jsxs5(pressable_default, { className: "bg-white rounded-2xl p-5 shadow-lg", children: [
      /* @__PURE__ */ jsx27(view_default, { className: `w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx27(text_default, { className: "text-3xl", children: category.icon }) }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-lg font-bold text-gray-800 mb-1", children: category.name }),
      /* @__PURE__ */ jsxs5(text_default, { className: "text-sm text-gray-600", children: [
        category.count,
        " tasks"
      ] })
    ] }, index)) })
  ] }) });
}
function StatisticsPage() {
  return /* @__PURE__ */ jsx27(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs5(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs5(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Statistics" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-600 text-lg", children: "Track your productivity" })
    ] }),
    /* @__PURE__ */ jsx27(view_default, { className: "grid grid-cols-2 gap-4 mb-24", children: [
      { title: "Most Productive", value: "Wednesday", icon: "\u{1F4C8}", color: "from-green-500 to-green-600" },
      { title: "Completion Rate", value: "82%", icon: "\u{1F3AF}", color: "from-blue-500 to-blue-600" },
      { title: "Time Saved", value: "12 hours", icon: "\u23F1\uFE0F", color: "from-purple-500 to-purple-600" },
      { title: "Streak Record", value: "14 days", icon: "\u{1F525}", color: "from-orange-500 to-orange-600" }
    ].map((insight, index) => /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
      /* @__PURE__ */ jsx27(view_default, { className: `w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx27(text_default, { className: "text-2xl", children: insight.icon }) }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600 mb-1", children: insight.title }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800", children: insight.value })
    ] }, index)) })
  ] }) });
}
function ProfilePage() {
  return /* @__PURE__ */ jsx27(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs5(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs5(view_default, { className: "items-center mb-8", children: [
      /* @__PURE__ */ jsx27(view_default, { className: "w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx27(text_default, { className: "text-4xl text-white", children: "\u{1F464}" }) }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-gray-800 mb-1", children: "John Doe" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-600", children: "john.doe@example.com" })
    ] }),
    /* @__PURE__ */ jsx27(view_default, { className: "grid grid-cols-2 gap-4 mb-8", children: [
      { label: "Completed", value: "127", icon: "\u2705" },
      { label: "Active", value: "12", icon: "\u{1F4DD}" },
      { label: "Streak", value: "7", icon: "\u{1F525}" },
      { label: "Points", value: "1,250", icon: "\u2B50" }
    ].map((stat, index) => /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-3xl mb-2", children: stat.icon }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-violet-600 mb-1", children: stat.value }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600", children: stat.label })
    ] }, index)) }),
    /* @__PURE__ */ jsx27(view_default, { className: "bg-white rounded-2xl shadow-lg overflow-hidden mb-24", children: ["Notifications", "Theme", "Language", "Privacy", "Help", "Logout"].map((item, index) => /* @__PURE__ */ jsxs5(pressable_default, { className: `px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? "border-b border-gray-100" : ""}`, children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-800 font-medium", children: item }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-400", children: "\u203A" })
    ] }, index)) })
  ] }) });
}
function Home() {
  const [activeTab, setActiveTab] = useState2("tasks");
  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return /* @__PURE__ */ jsx27(TasksPage, {});
      case "categories":
        return /* @__PURE__ */ jsx27(CategoriesPage, {});
      case "statistics":
        return /* @__PURE__ */ jsx27(StatisticsPage, {});
      case "profile":
        return /* @__PURE__ */ jsx27(ProfilePage, {});
      default:
        return /* @__PURE__ */ jsx27(TasksPage, {});
    }
  };
  const navItems = [
    { id: "tasks", label: "Tasks", icon: "\u{1F4DD}", activeIcon: "\u2705" },
    { id: "categories", label: "Categories", icon: "\u{1F4C1}", activeIcon: "\u{1F4C2}" },
    { id: "statistics", label: "Stats", icon: "\u{1F4CA}", activeIcon: "\u{1F4C8}" },
    { id: "profile", label: "Profile", icon: "\u{1F464}", activeIcon: "\u{1F468}" }
  ];
  return /* @__PURE__ */ jsxs5(view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: [
    /* @__PURE__ */ jsx27(view_default, { className: "flex-1", children: renderContent() }),
    /* @__PURE__ */ jsx27(view_default, { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50", children: /* @__PURE__ */ jsx27(view_default, { className: "flex flex-row items-center justify-around px-2 py-3", children: navItems.map((item) => {
      const isActive = activeTab === item.id;
      return /* @__PURE__ */ jsx27(
        pressable_default,
        {
          onPress: () => setActiveTab(item.id),
          className: "flex-1 flex items-center justify-center py-2",
          children: /* @__PURE__ */ jsxs5(view_default, { className: `flex items-center justify-center transition-all duration-300 ${isActive ? "transform scale-110" : ""}`, children: [
            /* @__PURE__ */ jsx27(view_default, { className: `w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-transparent"}`, children: /* @__PURE__ */ jsx27(text_default, { className: "text-2xl", children: isActive ? item.activeIcon : item.icon }) }),
            /* @__PURE__ */ jsx27(text_default, { className: `text-xs font-medium ${isActive ? "text-violet-600" : "text-gray-600"}`, children: item.label })
          ] })
        },
        item.id
      );
    }) }) })
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvaW5kZXguanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9pbWFnZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy91bml2ZXJzYWwvcmVzb2x2ZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvc3R5bGUtc2hlZXQubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2RpbWVuc2lvbnMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvYXBpcy9saW5raW5nLm1qcyIsICIuLi8uLi9jb21wb25lbnRzL1Rhc2tDYXJkLmpzeCIsICIuLi8uLi9jb21wb25lbnRzL0FkZFRhc2tNb2RhbC5qc3giLCAiLi4vLi4vdXRpbHMvdGFza1NsaWNlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XG5pbXBvcnQgVGFza0NhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9UYXNrQ2FyZCc7XG5pbXBvcnQgQWRkVGFza01vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvQWRkVGFza01vZGFsJztcbmltcG9ydCB7IGFkZFRhc2ssIHRvZ2dsZVRhc2ssIGRlbGV0ZVRhc2sgfSBmcm9tICcuLi91dGlscy90YXNrU2xpY2UnO1xuXG4vLyBUYXNrcyBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gVGFza3NQYWdlKCkge1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZmlsdGVyLCBzZXRGaWx0ZXJdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCB0YXNrcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudGFza3MudGFza3MpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgZmlsdGVyZWRUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICBpZiAoZmlsdGVyID09PSAnYWN0aXZlJykgcmV0dXJuICF0YXNrLmNvbXBsZXRlZDtcbiAgICBpZiAoZmlsdGVyID09PSAnY29tcGxldGVkJykgcmV0dXJuIHRhc2suY29tcGxldGVkO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICB0b3RhbDogdGFza3MubGVuZ3RoLFxuICAgIGFjdGl2ZTogdGFza3MuZmlsdGVyKHQgPT4gIXQuY29tcGxldGVkKS5sZW5ndGgsXG4gICAgY29tcGxldGVkOiB0YXNrcy5maWx0ZXIodCA9PiB0LmNvbXBsZXRlZCkubGVuZ3RoXG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkVGFzayA9ICh0YXNrRGF0YSkgPT4ge1xuICAgIGRpc3BhdGNoKGFkZFRhc2soe1xuICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgIC4uLnRhc2tEYXRhLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfSkpO1xuICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1heC13LTR4bCBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50IG1iLTJcIj5cbiAgICAgICAgICAgIFRhc2sgTWFuYWdlclxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtbGdcIj5Pcmdhbml6ZSB5b3VyIGRheSwgYWNoaWV2ZSB5b3VyIGdvYWxzPC9UZXh0PlxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtNCBtYi04XCI+XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMFwiPntzdGF0cy50b3RhbH08L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtMVwiPlRvdGFsPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiPntzdGF0cy5hY3RpdmV9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5BY3RpdmU8L1RleHQ+XG4gICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiPntzdGF0cy5jb21wbGV0ZWR9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5Eb25lPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbWItNiBiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTIgc2hhZG93LW1kXCI+XG4gICAgICAgICAge1snYWxsJywgJ2FjdGl2ZScsICdjb21wbGV0ZWQnXS5tYXAoKGYpID0+IChcbiAgICAgICAgICAgIDxQcmVzc2FibGVcbiAgICAgICAgICAgICAga2V5PXtmfVxuICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRGaWx0ZXIoZil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtmaWx0ZXIgPT09IGYgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgc2hhZG93LWxnJyA6ICdiZy10cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgZm9udC1tZWRpdW0gJHtmaWx0ZXIgPT09IGYgPyAndGV4dC13aGl0ZScgOiAndGV4dC1ncmF5LTYwMCd9YH0+XG4gICAgICAgICAgICAgICAge2YuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBmLnNsaWNlKDEpfVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNCBtYi0yNFwiPlxuICAgICAgICAgIHtmaWx0ZXJlZFRhc2tzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtMTIgdGV4dC1jZW50ZXIgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNnhsIG1iLTRcIj5cdUQ4M0RcdURDREQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5ObyB0YXNrcyB5ZXQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyID09PSAnYWxsJyA/ICdTdGFydCBieSBhZGRpbmcgeW91ciBmaXJzdCB0YXNrIScgOiBgTm8gJHtmaWx0ZXJ9IHRhc2tzIGZvdW5kYH1cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBmaWx0ZXJlZFRhc2tzLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICA8VGFza0NhcmRcbiAgICAgICAgICAgICAgICBrZXk9e3Rhc2suaWR9XG4gICAgICAgICAgICAgICAgdGFzaz17dGFza31cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gZGlzcGF0Y2godG9nZ2xlVGFzayh0YXNrLmlkKSl9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICApfVxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFByZXNzYWJsZVxuICAgICAgICAgIG9uUHJlc3M9eygpID0+IHNldFNob3dNb2RhbCh0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMjQgcmlnaHQtOCB3LTE2IGgtMTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgc2hhZG93LTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTQwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC0zeGwgZm9udC1saWdodFwiPis8L1RleHQ+XG4gICAgICAgIDwvUHJlc3NhYmxlPlxuXG4gICAgICAgIHtzaG93TW9kYWwgJiYgKFxuICAgICAgICAgIDxBZGRUYXNrTW9kYWxcbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICBvbkFkZD17aGFuZGxlQWRkVGFza31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gQ2F0ZWdvcmllcyBQYWdlIENvbXBvbmVudCAgXG5mdW5jdGlvbiBDYXRlZ29yaWVzUGFnZSgpIHtcbiAgY29uc3QgY2F0ZWdvcmllcyA9IFtcbiAgICB7IG5hbWU6ICdXb3JrJywgY291bnQ6IDgsIGNvbG9yOiAnZnJvbS1ibHVlLTUwMCB0by1ibHVlLTYwMCcsIGljb246ICdcdUQ4M0RcdURDQkMnIH0sXG4gICAgeyBuYW1lOiAnUGVyc29uYWwnLCBjb3VudDogNSwgY29sb3I6ICdmcm9tLXB1cnBsZS01MDAgdG8tcHVycGxlLTYwMCcsIGljb246ICdcdUQ4M0NcdURGRTAnIH0sXG4gICAgeyBuYW1lOiAnU2hvcHBpbmcnLCBjb3VudDogMywgY29sb3I6ICdmcm9tLXBpbmstNTAwIHRvLXBpbmstNjAwJywgaWNvbjogJ1x1RDgzRFx1REVDRFx1RkUwRicgfSxcbiAgICB7IG5hbWU6ICdIZWFsdGgnLCBjb3VudDogNCwgY29sb3I6ICdmcm9tLWdyZWVuLTUwMCB0by1ncmVlbi02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0FBJyB9LFxuICAgIHsgbmFtZTogJ1N0dWR5JywgY291bnQ6IDYsIGNvbG9yOiAnZnJvbS15ZWxsb3ctNTAwIHRvLXllbGxvdy02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0RBJyB9LFxuICAgIHsgbmFtZTogJ0ZpbmFuY2UnLCBjb3VudDogMiwgY29sb3I6ICdmcm9tLWVtZXJhbGQtNTAwIHRvLWVtZXJhbGQtNjAwJywgaWNvbjogJ1x1RDgzRFx1RENCMCcgfSxcbiAgICB7IG5hbWU6ICdUcmF2ZWwnLCBjb3VudDogMSwgY29sb3I6ICdmcm9tLWN5YW4tNTAwIHRvLWN5YW4tNjAwJywgaWNvbjogJ1x1MjcwOFx1RkUwRicgfSxcbiAgICB7IG5hbWU6ICdPdGhlcicsIGNvdW50OiAzLCBjb2xvcjogJ2Zyb20tZ3JheS01MDAgdG8tZ3JheS02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0NDJyB9XG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInB4LTQgcHktOFwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50IG1iLTJcIj5cbiAgICAgICAgICAgIENhdGVnb3JpZXNcbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCB0ZXh0LWxnXCI+T3JnYW5pemUgdGFza3MgYnkgY2F0ZWdvcnk8L1RleHQ+XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1iLTI0XCI+XG4gICAgICAgICAge2NhdGVnb3JpZXMubWFwKChjYXRlZ29yeSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxQcmVzc2FibGUga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9e2B3LTE0IGgtMTQgYmctZ3JhZGllbnQtdG8tciAke2NhdGVnb3J5LmNvbG9yfSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTNgfT5cbiAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPntjYXRlZ29yeS5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj57Y2F0ZWdvcnkubmFtZX08L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPntjYXRlZ29yeS5jb3VudH0gdGFza3M8L1RleHQ+XG4gICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gU3RhdGlzdGljcyBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gU3RhdGlzdGljc1BhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWItOFwiPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBtYi0yXCI+XG4gICAgICAgICAgICBTdGF0aXN0aWNzXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1sZ1wiPlRyYWNrIHlvdXIgcHJvZHVjdGl2aXR5PC9UZXh0PlxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNCBtYi0yNFwiPlxuICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IHRpdGxlOiAnTW9zdCBQcm9kdWN0aXZlJywgdmFsdWU6ICdXZWRuZXNkYXknLCBpY29uOiAnXHVEODNEXHVEQ0M4JywgY29sb3I6ICdmcm9tLWdyZWVuLTUwMCB0by1ncmVlbi02MDAnIH0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnQ29tcGxldGlvbiBSYXRlJywgdmFsdWU6ICc4MiUnLCBpY29uOiAnXHVEODNDXHVERkFGJywgY29sb3I6ICdmcm9tLWJsdWUtNTAwIHRvLWJsdWUtNjAwJyB9LFxuICAgICAgICAgICAgeyB0aXRsZTogJ1RpbWUgU2F2ZWQnLCB2YWx1ZTogJzEyIGhvdXJzJywgaWNvbjogJ1x1MjNGMVx1RkUwRicsIGNvbG9yOiAnZnJvbS1wdXJwbGUtNTAwIHRvLXB1cnBsZS02MDAnIH0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnU3RyZWFrIFJlY29yZCcsIHZhbHVlOiAnMTQgZGF5cycsIGljb246ICdcdUQ4M0RcdUREMjUnLCBjb2xvcjogJ2Zyb20tb3JhbmdlLTUwMCB0by1vcmFuZ2UtNjAwJyB9XG4gICAgICAgICAgXS5tYXAoKGluc2lnaHQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8VmlldyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1yICR7aW5zaWdodC5jb2xvcn0gcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0zYH0+XG4gICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj57aW5zaWdodC5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbWItMVwiPntpbnNpZ2h0LnRpdGxlfTwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMFwiPntpbnNpZ2h0LnZhbHVlfTwvVGV4dD5cbiAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gUHJvZmlsZSBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gUHJvZmlsZVBhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaXRlbXMtY2VudGVyIG1iLThcIj5cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ3LTI0IGgtMjQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIHRleHQtd2hpdGVcIj5cdUQ4M0RcdURDNjQ8L1RleHQ+XG4gICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj5Kb2huIERvZTwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+am9obi5kb2VAZXhhbXBsZS5jb208L1RleHQ+XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1iLThcIj5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBsYWJlbDogJ0NvbXBsZXRlZCcsIHZhbHVlOiAnMTI3JywgaWNvbjogJ1x1MjcwNScgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdBY3RpdmUnLCB2YWx1ZTogJzEyJywgaWNvbjogJ1x1RDgzRFx1RENERCcgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdTdHJlYWsnLCB2YWx1ZTogJzcnLCBpY29uOiAnXHVEODNEXHVERDI1JyB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ1BvaW50cycsIHZhbHVlOiAnMSwyNTAnLCBpY29uOiAnXHUyQjUwJyB9XG4gICAgICAgICAgXS5tYXAoKHN0YXQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8VmlldyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIG1iLTJcIj57c3RhdC5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMCBtYi0xXCI+e3N0YXQudmFsdWV9PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj57c3RhdC5sYWJlbH08L1RleHQ+XG4gICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIG1iLTI0XCI+XG4gICAgICAgICAge1snTm90aWZpY2F0aW9ucycsICdUaGVtZScsICdMYW5ndWFnZScsICdQcml2YWN5JywgJ0hlbHAnLCAnTG9nb3V0J10ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPFByZXNzYWJsZSBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2BweC00IHB5LTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7aW5kZXggIT09IDUgPyAnYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwJyA6ICcnfWB9PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktODAwIGZvbnQtbWVkaXVtXCI+e2l0ZW19PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+XHUyMDNBPC9UZXh0PlxuICAgICAgICAgICAgPC9QcmVzc2FibGU+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvVmlldz5cbiAgICAgIDwvVmlldz5cbiAgICA8L1Njcm9sbFZpZXc+XG4gICk7XG59XG5cbi8vIE1haW4gSG9tZSBDb21wb25lbnQgd2l0aCBUYWIgTmF2aWdhdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCd0YXNrcycpO1xuXG4gIGNvbnN0IHJlbmRlckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgIGNhc2UgJ3Rhc2tzJzpcbiAgICAgICAgcmV0dXJuIDxUYXNrc1BhZ2UgLz47XG4gICAgICBjYXNlICdjYXRlZ29yaWVzJzpcbiAgICAgICAgcmV0dXJuIDxDYXRlZ29yaWVzUGFnZSAvPjtcbiAgICAgIGNhc2UgJ3N0YXRpc3RpY3MnOlxuICAgICAgICByZXR1cm4gPFN0YXRpc3RpY3NQYWdlIC8+O1xuICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgIHJldHVybiA8UHJvZmlsZVBhZ2UgLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPFRhc2tzUGFnZSAvPjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbmF2SXRlbXMgPSBbXG4gICAgeyBpZDogJ3Rhc2tzJywgbGFiZWw6ICdUYXNrcycsIGljb246ICdcdUQ4M0RcdURDREQnLCBhY3RpdmVJY29uOiAnXHUyNzA1JyB9LFxuICAgIHsgaWQ6ICdjYXRlZ29yaWVzJywgbGFiZWw6ICdDYXRlZ29yaWVzJywgaWNvbjogJ1x1RDgzRFx1RENDMScsIGFjdGl2ZUljb246ICdcdUQ4M0RcdURDQzInIH0sXG4gICAgeyBpZDogJ3N0YXRpc3RpY3MnLCBsYWJlbDogJ1N0YXRzJywgaWNvbjogJ1x1RDgzRFx1RENDQScsIGFjdGl2ZUljb246ICdcdUQ4M0RcdURDQzgnIH0sXG4gICAgeyBpZDogJ3Byb2ZpbGUnLCBsYWJlbDogJ1Byb2ZpbGUnLCBpY29uOiAnXHVEODNEXHVEQzY0JywgYWN0aXZlSWNvbjogJ1x1RDgzRFx1REM2OCcgfVxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHZpYS1wdXJwbGUtNTAgdG8tZnVjaHNpYS01MFwiPlxuICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAge3JlbmRlckNvbnRlbnQoKX1cbiAgICAgIDwvVmlldz5cblxuICAgICAgey8qIEJvdHRvbSBOYXZpZ2F0aW9uICovfVxuICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgYmctd2hpdGUgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHNoYWRvdy1sZyB6LTUwXCI+XG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYXJvdW5kIHB4LTIgcHktM1wiPlxuICAgICAgICAgIHtuYXZJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFByZXNzYWJsZVxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7aXNBY3RpdmUgPyAndHJhbnNmb3JtIHNjYWxlLTExMCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTIgaC0xMiByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0xICR7aXNBY3RpdmUgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAnIDogJ2JnLXRyYW5zcGFyZW50J31gfT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNBY3RpdmUgPyBpdGVtLmFjdGl2ZUljb24gOiBpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1tZWRpdW0gJHtpc0FjdGl2ZSA/ICd0ZXh0LXZpb2xldC02MDAnIDogJ3RleHQtZ3JheS02MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvVmlldz5cbiAgKTtcbn0iLCAiLyoqXG4gKiBQbGF0Zm9ybSBkZXRlY3Rpb24gdXRpbGl0aWVzIGZvciBJTkRKU1xuICpcbiAqIFVzYWdlOlxuICogaW1wb3J0IHsgaXNXZWIsIGlzRGVza3RvcCwgaXNNb2JpbGUsIGlzQW5kcm9pZCwgaXNJT1MsIHBsYXRmb3JtIH0gZnJvbSAnaW5kanMnO1xuICpcbiAqIGlmIChpc01vYmlsZSkgeyAuLi4gfVxuICovXG5cbi8vIENoZWNrIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyIGVudmlyb25tZW50XG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xuXG4vLyBFbGVjdHJvbiBkZXRlY3Rpb24gKHJlbmRlcmVyIHByb2Nlc3MpXG5leHBvcnQgY29uc3QgaXNEZXNrdG9wID1cbiAgaXNCcm93c2VyICYmXG4gICh3aW5kb3cucHJvY2Vzcz8udHlwZSA9PT0gXCJyZW5kZXJlclwiIHx8XG4gICAgISF3aW5kb3cuZWxlY3Ryb24gfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiRWxlY3Ryb25cIikpO1xuXG4vLyBDYXBhY2l0b3IgZGV0ZWN0aW9uXG5leHBvcnQgY29uc3QgaXNNb2JpbGUgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKCEhd2luZG93LkNhcGFjaXRvciB8fFxuICAgICEhd2luZG93LmFuZHJvaWRCcmlkZ2UgfHxcbiAgICAhIXdpbmRvdy53ZWJraXQ/Lm1lc3NhZ2VIYW5kbGVycz8uYnJpZGdlIHx8XG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkNhcGFjaXRvclwiKSk7XG5cbi8vIFNwZWNpZmljIG1vYmlsZSBwbGF0Zm9ybXNcbmV4cG9ydCBjb25zdCBpc0FuZHJvaWQgPSBpc01vYmlsZSAmJiAvYW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5leHBvcnQgY29uc3QgaXNJT1MgPSBpc01vYmlsZSAmJiAvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8vIFdlYiBmYWxsYmFjayAoaWYgbm90IGRlc2t0b3Agb3IgbW9iaWxlIGFwcClcbmV4cG9ydCBjb25zdCBpc1dlYiA9ICFpc0Rlc2t0b3AgJiYgIWlzTW9iaWxlO1xuXG4vLyBHZXQgY3VycmVudCBwbGF0Zm9ybSBuYW1lXG5leHBvcnQgY29uc3QgcGxhdGZvcm0gPSAoKCkgPT4ge1xuICBpZiAoaXNEZXNrdG9wKSByZXR1cm4gXCJkZXNrdG9wXCI7XG4gIGlmIChpc0FuZHJvaWQpIHJldHVybiBcImFuZHJvaWRcIjtcbiAgaWYgKGlzSU9TKSByZXR1cm4gXCJpb3NcIjtcbiAgaWYgKGlzTW9iaWxlKSByZXR1cm4gXCJtb2JpbGVcIjsgLy8gZmFsbGJhY2tcbiAgcmV0dXJuIFwid2ViXCI7XG59KSgpO1xuXG4vLyBSZWFjdCBOYXRpdmUgY29tcGF0aWJsZSBBUElcbmV4cG9ydCBjb25zdCBPUyA9IHBsYXRmb3JtO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gKG9iaikgPT4ge1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KE9TKSkgcmV0dXJuIG9ialtPU107XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJuYXRpdmVcIikgJiYgaXNNb2JpbGUpIHJldHVybiBvYmpbXCJuYXRpdmVcIl07XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0XCIpKSByZXR1cm4gb2JqW1wiZGVmYXVsdFwiXTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNXZWIsXG4gIGlzRGVza3RvcCxcbiAgaXNNb2JpbGUsXG4gIGlzQW5kcm9pZCxcbiAgaXNJT1MsXG4gIHBsYXRmb3JtLFxuICBPUyxcbiAgc2VsZWN0LFxufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZSA9IGZvcndhcmRSZWYoKHsgc3R5bGUsIHNvdXJjZSwgc3JjLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlXCIpO1xuXG4gIC8vIFJlYWN0IE5hdGl2ZSB1c2VzICdzb3VyY2UnLCBXZWIgdXNlcyAnc3JjJy5cbiAgLy8gV2Ugc3VwcG9ydCBib3RoIHByb3BzIGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICAuLi5yZXN0LFxuICAgIHNyYzogaW1hZ2VTb3VyY2UsXG4gICAgcmVmLFxuICB9O1xuXG4gIGlmIChDb21wb25lbnQgIT09IFwiaW1nXCIgJiYgQ29tcG9uZW50ICE9PSBcImltYWdlXCIpIHtcbiAgICAvLyBJZiBpdCByZWZlcnMgdG8gUmVhY3QgTmF0aXZlIEltYWdlLCBpdCBleHBlY3RzICdzb3VyY2UnXG4gICAgcHJvcHMuc291cmNlID0gc291cmNlIHx8IHsgdXJpOiBzcmMgfTtcbiAgICBkZWxldGUgcHJvcHMuc3JjO1xuICB9XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiA8Q29tcG9uZW50IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5wcm9wc30gLz47XG59KTtcblxuSW1hZ2UuZGlzcGxheU5hbWUgPSBcIkltYWdlXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZTtcbiIsICJmdW5jdGlvbiBjYXBpdGFsaXplKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnQodHlwZSkge1xuICBjb25zdCBwbGF0Zm9ybSA9IHR5cGVvZiBQTEFURk9STSAhPT0gXCJ1bmRlZmluZWRcIiA/IFBMQVRGT1JNIDogXCJ3ZWJcIjtcblxuICBpZiAocGxhdGZvcm0gPT09IFwid2ViXCIpIHtcbiAgICBjb25zdCB3ZWJNYXAgPSB7XG4gICAgICB2aWV3OiBcImRpdlwiLFxuICAgICAgdGV4dDogXCJzcGFuXCIsXG4gICAgICBpbWFnZTogXCJpbWdcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJkaXZcIiwgLy8gbWFwIGltYWdlLWJhY2tncm91bmQgdG8gZGl2IHdpdGggc3R5bGVcbiAgICAgIHNjcm9sbHZpZXc6IFwiZGl2XCIsXG4gICAgICBmbGF0bGlzdDogXCJkaXZcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcImRpdlwiLFxuICAgICAga2V5Ym9hcmRhdm9pZGluZ3ZpZXc6IFwiZGl2XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiZGl2XCIsXG4gICAgICBwcmVzc2FibGU6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcImJ1dHRvblwiLFxuICAgICAgdG91Y2hhYmxlaGlnaGxpZ2h0OiBcImJ1dHRvblwiLFxuICAgICAgc3dpdGNoOiBcImlucHV0XCIsIC8vIHR5cGU9J2NoZWNrYm94J1xuICAgICAgdGV4dGFyZWE6IFwidGV4dGFyZWFcIixcbiAgICAgIGJ1dHRvbjogXCJidXR0b25cIixcbiAgICAgIG1vZGFsOiBcImRpdlwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiZGl2XCIsXG4gICAgICByZWZyZXNoY29udHJvbDogXCJkaXZcIixcbiAgICB9O1xuICAgIHJldHVybiB3ZWJNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IFwiZGl2XCI7XG4gIH1cblxuICBpZiAocGxhdGZvcm0gPT09IFwibW9iaWxlXCIpIHtcbiAgICAvLyBJbiBSZWFjdCBOYXRpdmUsIGNvbXBvbmVudHMgYXJlIENhbWVsQ2FzZVxuICAgIC8vIFdlIG5lZWQgdG8gbWFwIGdlbmVyaWMgbmFtZXMgdG8gUk4gbmFtZXNcbiAgICBjb25zdCBtb2JpbGVNYXAgPSB7XG4gICAgICB2aWV3OiBcIlZpZXdcIixcbiAgICAgIHRleHQ6IFwiVGV4dFwiLFxuICAgICAgaW1hZ2U6IFwiSW1hZ2VcIixcbiAgICAgIGltYWdlYmFja2dyb3VuZDogXCJJbWFnZUJhY2tncm91bmRcIixcbiAgICAgIHNjcm9sbHZpZXc6IFwiU2Nyb2xsVmlld1wiLFxuICAgICAgZmxhdGxpc3Q6IFwiRmxhdExpc3RcIixcbiAgICAgIHNlY3Rpb25saXN0OiBcIlNlY3Rpb25MaXN0XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiLFxuICAgICAgc2FmZWFyZWF2aWV3OiBcIlNhZmVBcmVhVmlld1wiLFxuICAgICAgcHJlc3NhYmxlOiBcIlByZXNzYWJsZVwiLFxuICAgICAgdG91Y2hhYmxlb3BhY2l0eTogXCJUb3VjaGFibGVPcGFjaXR5XCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCIsXG4gICAgICBzd2l0Y2g6IFwiU3dpdGNoXCIsXG4gICAgICBtb2RhbDogXCJNb2RhbFwiLFxuICAgICAgYWN0aXZpdHlpbmRpY2F0b3I6IFwiQWN0aXZpdHlJbmRpY2F0b3JcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcIlJlZnJlc2hDb250cm9sXCIsXG4gICAgICBidXR0b246IFwiQnV0dG9uXCIsXG4gICAgfTtcbiAgICBjb25zdCBybk5hbWUgPVxuICAgICAgbW9iaWxlTWFwW3R5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csIFwiXCIpXSB8fCBjYXBpdGFsaXplKHR5cGUpO1xuXG4gICAgLy8gU2FmZXR5IGNoZWNrIGZvciBSZWFjdCBOYXRpdmUgZW52aXJvbm1lbnRcbiAgICAvLyByZWFjdC1uYXRpdmUtd2ViIG1pZ2h0IGJlIGFsaWFzZWQsIG9yIHdlIG1pZ2h0IGJlIGluIGEgcmVhbCBSTiBlbnZpcm9ubWVudFxuICAgIHRyeSB7XG4gICAgICAvLyBVc2luZyBnbG9iYWwgY2hlY2sgb3Igc2FmZSByZXF1aXJlXG4gICAgICBpZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCJyZWFjdC1uYXRpdmVcIilbcm5OYW1lXTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgd2luZG93LlJlYWN0ICYmXG4gICAgICAgIHdpbmRvdy5SZWFjdC5OYXRpdmVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gd2luZG93LlJlYWN0Lk5hdGl2ZVtybk5hbWVdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgUmVhY3QgTmF0aXZlIGNvbXBvbmVudCAke3JuTmFtZX0gbm90IGZvdW5kYCk7XG4gICAgfVxuICAgIC8vIEZhbGxiYWNrIHRvIFZpZXcgb3IgZGl2IGRlcGVuZGluZyBvbiBjb250ZXh0LCBidXQgVmlldyBpcyBzYWZlIGVub3VnaCBmb3IgbG9naWNhbCByZXR1cm4gaWYgbW9ja2VkXG4gICAgcmV0dXJuIFwiVmlld1wiO1xuICB9XG5cbiAgcmV0dXJuIFwiZGl2XCI7XG59XG4iLCAiLy8gTW9jayBTdHlsZVNoZWV0IGZvciBjb21wYXRpYmlsaXR5LlxuLy8gSW4gSU5ESlMgd2ViLCB3ZSB1c3VhbGx5IHVzZSBzdGFuZGFyZCBzdHlsZSBvYmplY3RzIG9yIENTUy5cbi8vIFRoaXMgYWxsb3dzIFN0eWxlU2hlZXQuY3JlYXRlKHt9KSB0byByZXR1cm4gdGhlIG9iamVjdHMgYXMtaXMuXG5cbmV4cG9ydCBjb25zdCBTdHlsZVNoZWV0ID0ge1xuICBjcmVhdGU6IChzdHlsZXMpID0+IHN0eWxlcyxcbiAgZmxhdHRlbjogKHN0eWxlcykgPT4ge1xuICAgIGlmICghc3R5bGVzKSByZXR1cm4ge307XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuICAgICAgcmV0dXJuIHN0eWxlc1xuICAgICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiAoaXRlbSA/IHsgLi4uYWNjLCAuLi5pdGVtIH0gOiBhY2MpLCB7fSk7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH0sXG4gIGhhaXJsaW5lV2lkdGg6IDEsXG4gIGFic29sdXRlRmlsbDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxuICBhYnNvbHV0ZUZpbGxPYmplY3Q6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0eWxlU2hlZXQ7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBJTkRKUyBMaW5rIGNvbXBvbmVudCAtIGxpZ2h0d2VpZ2h0IGNsaWVudC1zaWRlIG5hdmlnYXRpb24gaGVscGVyXG4vLyBQZXJmb3JtcyBTUEEtbGlrZSBuYXZpZ2F0aW9uIGZvciBzYW1lLW9yaWdpbiBpbnRlcm5hbCBsaW5rcy5cbi8vIFByb3BzOiBocmVmLCBwcmVmZXRjaCwgcmVwbGFjZSwgc2Nyb2xsIChkZWZhdWx0IHRydWUpLCBvbkNsaWNrLCB0YXJnZXQsIHJlbCwgY2xhc3NOYW1lLCBzdHlsZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7XG4gIGhyZWYsXG4gIGNoaWxkcmVuLFxuICBwcmVmZXRjaCA9IGZhbHNlLFxuICByZXBsYWNlID0gZmFsc2UsXG4gIHNjcm9sbCA9IHRydWUsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgc3R5bGUsXG4gIHRhcmdldCxcbiAgcmVsLFxuICAuLi5yZXN0XG59KSB7XG4gIC8vIEJhc2ljIHByZWZldGNoOiBoaW50IHRoZSBicm93c2VyIHZpYSA8bGluayByZWw9XCJwcmVmZXRjaFwiPlxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcHJlZmV0Y2ggfHwgIWhyZWYpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgbC5yZWwgPSBcInByZWZldGNoXCI7XG4gICAgICBsLmhyZWYgPSBocmVmO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChsKTtcbiAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgfTtcbiAgICB9IGNhdGNoIHt9XG4gIH0sIFtocmVmLCBwcmVmZXRjaF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG4gICAgLy8gT25seSBpbnRlcmNlcHQgc2ltcGxlIGxlZnQtY2xpY2tzIHdpdGhvdXQgbW9kaWZpZXIga2V5c1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkpXG4gICAgICByZXR1cm47XG4gICAgaWYgKCFocmVmKSByZXR1cm47XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IFwiX3NlbGZcIikgcmV0dXJuO1xuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgIHVybCA9IG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJbnZhbGlkIFVSTCwgbGV0IGJyb3dzZXIgaGFuZGxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNraXAgbm9uLWh0dHAocykgcHJvdG9jb2xzIGFuZCBzcGVjaWFsIHNjaGVtZXNcbiAgICBjb25zdCBwcm90byA9IHVybC5wcm90b2NvbDtcbiAgICBpZiAocHJvdG8gJiYgcHJvdG8gIT09IFwiaHR0cDpcIiAmJiBwcm90byAhPT0gXCJodHRwczpcIikgcmV0dXJuO1xuICAgIC8vIEV4dGVybmFsXG4gICAgaWYgKHVybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHJldHVybjtcbiAgICAvLyBSZXNwZWN0IGRvd25sb2FkIGxpbmtzXG4gICAgaWYgKHJlc3QuZG93bmxvYWQpIHJldHVybjtcbiAgICAvLyBIYXNoLW9ubHkgbmF2aWdhdGlvbiBvcHRpbWl6YXRpb25cbiAgICBjb25zdCBjdXJyZW50ID1cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBjb25zdCBuZXh0ID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCArIHVybC5oYXNoO1xuICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIERvIHB1c2gvcmVwbGFjZSBzdGF0ZVxuICAgIGlmIChyZXBsYWNlKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBuZXh0KTtcbiAgICAvLyBFbWl0IGEgY3VzdG9tIG5hdmlnYXRpb24gZXZlbnQgc28gdGhlIGFwcCBjYW4gbG9hZCB0aGUgdGFyZ2V0IG1vZHVsZVxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiaW5kOm5hdmlnYXRlXCIsIHsgZGV0YWlsOiB7IGhyZWY6IG5leHQgfSB9KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7fVxuICAgIC8vIFNjcm9sbCBiZWhhdmlvclxuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIGlmICh1cmwuaGFzaCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHVybC5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICBlbHNlIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVsRmluYWwgPVxuICAgIHRhcmdldCA9PT0gXCJfYmxhbmtcIlxuICAgICAgPyBbcmVsLCBcIm5vb3BlbmVyXCIsIFwibm9yZWZlcnJlclwiXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIilcbiAgICAgIDogcmVsO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBcImFcIixcbiAgICB7XG4gICAgICBocmVmLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgc3R5bGUsXG4gICAgICB0YXJnZXQsXG4gICAgICByZWw6IHJlbEZpbmFsLFxuICAgICAgb25DbGljazogaGFuZGxlQ2xpY2ssXG4gICAgICAuLi5yZXN0LFxuICAgIH0sXG4gICAgY2hpbGRyZW4sXG4gICk7XG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVmlldyA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidmlld1wiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblZpZXcuZGlzcGxheU5hbWUgPSBcIlZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgVGV4dCA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBjbGFzc05hbWUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidGV4dFwiKTtcblxuICBjb25zdCBmbGF0U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW3N0eWxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblRleHQuZGlzcGxheU5hbWUgPSBcIlRleHRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2Nyb2xsVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yID0gdHJ1ZSxcbiAgICAgIHNob3dzVmVydGljYWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInNjcm9sbHZpZXdcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gICAgICAgIG92ZXJmbG93WDogaG9yaXpvbnRhbCA/IFwiYXV0b1wiIDogXCJoaWRkZW5cIixcbiAgICAgICAgb3ZlcmZsb3dZOiBob3Jpem9udGFsID8gXCJoaWRkZW5cIiA6IFwiYXV0b1wiLFxuICAgICAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiLFxuICAgICAgICBzY3JvbGxiYXJXaWR0aDogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIG1zT3ZlcmZsb3dTdHlsZTogKFxuICAgICAgICAgIGhvcml6b250YWxcbiAgICAgICAgICAgID8gIXNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvclxuICAgICAgICAgICAgOiAhc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvclxuICAgICAgICApXG4gICAgICAgICAgPyBcIm5vbmVcIlxuICAgICAgICAgIDogXCJhdXRvXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuICAgICAgY29uc3QgY29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtjb250YWluZXJTdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5yZXN0fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtjb250ZW50U3R5bGV9PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBob3Jpem9udGFsPXtob3Jpem9udGFsfVxuICAgICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3I9e3Nob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcj17c2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvcn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuU2Nyb2xsVmlldy5kaXNwbGF5TmFtZSA9IFwiU2Nyb2xsVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUZXh0SW5wdXQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgdmFsdWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICBvbkNoYW5nZVRleHQsXG4gICAgICBvbkZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzZWN1cmVUZXh0RW50cnkgPSBmYWxzZSxcbiAgICAgIG11bHRpbGluZSA9IGZhbHNlLFxuICAgICAgbnVtYmVyT2ZMaW5lcyA9IDQsXG4gICAgICBlZGl0YWJsZSA9IHRydWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGlmIChvbkNoYW5nZVRleHQpIG9uQ2hhbmdlVGV4dChlLnRhcmdldC52YWx1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1vblN0eWxlID0ge1xuICAgICAgYXBwZWFyYW5jZTogXCJub25lXCIsXG4gICAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgIH07XG5cbiAgICBpZiAobXVsdGlsaW5lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWFkT25seT17IWVkaXRhYmxlfVxuICAgICAgICAgIHJvd3M9e251bWJlck9mTGluZXN9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3R5bGUsIHJlc2l6ZTogXCJub25lXCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdHlwZT17c2VjdXJlVGV4dEVudHJ5ID8gXCJwYXNzd29yZFwiIDogXCJ0ZXh0XCJ9XG4gICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgIHN0eWxlPXtjb21tb25TdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuVGV4dElucHV0LmRpc3BsYXlOYW1lID0gXCJUZXh0SW5wdXRcIjtcbmV4cG9ydCBkZWZhdWx0IFRleHRJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBCdXR0b24gPSBmb3J3YXJkUmVmKFxuICAoeyB0aXRsZSwgb25QcmVzcywgY29sb3IsIGRpc2FibGVkLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiQnV0dG9uXCI7XG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgQWN0aXZpdHlJbmRpY2F0b3IgPSBmb3J3YXJkUmVmKFxuICAoeyBzaXplID0gXCJzbWFsbFwiLCBjb2xvciA9IFwiIzk5OVwiLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImFjdGl2aXR5aW5kaWNhdG9yXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBjb25zdCBzcGlubmVyU3R5bGUgPSB7XG4gICAgICAgIGFuaW1hdGlvbjogXCJpbmRqcy1zcGluIDFzIGxpbmVhciBpbmZpbml0ZVwiLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcblxuICAgICAgLy8gSW5qZWN0IGtleWZyYW1lcyBpZiBub3QgcHJlc2VudFxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kanMtc3Bpbi1zdHlsZVwiKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlRWwuaWQgPSBcImluZGpzLXNwaW4tc3R5bGVcIjtcbiAgICAgICAgc3R5bGVFbC5pbm5lckhUTUwgPSBgQGtleWZyYW1lcyBpbmRqcy1zcGluIHsgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfSAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9YDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtzcGlubmVyU3R5bGV9IHsuLi5yZXN0fSAvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudCByZWY9e3JlZn0gc2l6ZT17c2l6ZX0gY29sb3I9e2NvbG9yfSBzdHlsZT17c3R5bGV9IHsuLi5yZXN0fSAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5BY3Rpdml0eUluZGljYXRvci5kaXNwbGF5TmFtZSA9IFwiQWN0aXZpdHlJbmRpY2F0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5SW5kaWNhdG9yO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFN3aXRjaCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7IHZhbHVlLCBvblZhbHVlQ2hhbmdlLCBkaXNhYmxlZCwgdHJhY2tDb2xvciwgdGh1bWJDb2xvciwgc3R5bGUsIC4uLnJlc3QgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic3dpdGNoXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJpbnB1dFwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjaGVja2VkPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVmFsdWVDaGFuZ2UgJiYgb25WYWx1ZUNoYW5nZShlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25WYWx1ZUNoYW5nZT17b25WYWx1ZUNoYW5nZX1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB0cmFja0NvbG9yPXt0cmFja0NvbG9yfVxuICAgICAgICB0aHVtYkNvbG9yPXt0aHVtYkNvbG9yfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU3dpdGNoLmRpc3BsYXlOYW1lID0gXCJTd2l0Y2hcIjtcbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEZsYXRMaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAga2V5RXh0cmFjdG9yLFxuICAgICAgTGlzdEhlYWRlckNvbXBvbmVudCxcbiAgICAgIExpc3RGb290ZXJDb21wb25lbnQsXG4gICAgICBMaXN0RW1wdHlDb21wb25lbnQsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBudW1Db2x1bW5zID0gMSxcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJmbGF0bGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uXG4gICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKExpc3RFbXB0eUNvbXBvbmVudCkge1xuICAgICAgICAgIGNvbnN0IEVtcHR5ID0gUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEVtcHR5Q29tcG9uZW50KSA/IChcbiAgICAgICAgICAgIExpc3RFbXB0eUNvbXBvbmVudFxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGlzdEVtcHR5Q29tcG9uZW50IC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHtFbXB0eX1cbiAgICAgICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IGRhdGEgfHwgW107XG4gICAgICBjb25zdCByZW5kZXJMaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaW5kZXgpXG4gICAgICAgICAgICA6IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICAgICAgICAgIHtyZW5kZXJJdGVtKHsgaXRlbSwgaW5kZXggfSl9XG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZmxhdENvbnRlbnRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbY29udGVudENvbnRhaW5lclN0eWxlXSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtmbGF0Q29udGVudFN0eWxlfVxuICAgICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlckxpc3QoKX1cbiAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RGb290ZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEZvb3RlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0RW1wdHlDb21wb25lbnQ9e0xpc3RFbXB0eUNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIG51bUNvbHVtbnM9e251bUNvbHVtbnN9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuRmxhdExpc3QuZGlzcGxheU5hbWUgPSBcIkZsYXRMaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBGbGF0TGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUb3VjaGFibGVPcGFjaXR5ID0gZm9yd2FyZFJlZihcbiAgKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCBhY3RpdmVPcGFjaXR5ID0gMC4yLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlb3BhY2l0eVwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihbeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sIHN0eWxlXSl9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IGFjdGl2ZU9wYWNpdHkpfVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IChlLmN1cnJlbnRUYXJnZXQuc3R5bGUub3BhY2l0eSA9IDEpfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVPcGFjaXR5LmRpc3BsYXlOYW1lID0gXCJUb3VjaGFibGVPcGFjaXR5XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVPcGFjaXR5O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFByZXNzYWJsZSA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIHN0eWxlLCBvblByZXNzLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcInByZXNzYWJsZVwiKTtcblxuICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICB7IGN1cnNvcjogXCJwb2ludGVyXCIgfSxcbiAgICAgIHR5cGVvZiBzdHlsZSA9PT0gXCJmdW5jdGlvblwiID8gc3R5bGUoeyBwcmVzc2VkOiBmYWxzZSB9KSA6IHN0eWxlLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IG9uQ2xpY2s9e29uUHJlc3N9IHsuLi5yZXN0fT5cbiAgICAgICAge3R5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBjaGlsZHJlbih7IHByZXNzZWQ6IGZhbHNlIH0pXG4gICAgICAgICAgOiBjaGlsZHJlbn1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gb25QcmVzcz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblByZXNzYWJsZS5kaXNwbGF5TmFtZSA9IFwiUHJlc3NhYmxlXCI7XG5leHBvcnQgZGVmYXVsdCBQcmVzc2FibGU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgSW1hZ2VCYWNrZ3JvdW5kID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgY2hpbGRyZW4sIHN0eWxlLCBpbWFnZVN0eWxlLCBzb3VyY2UsIHNyYywgcmVzaXplTW9kZSA9IFwiY292ZXJcIiwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJpbWFnZWJhY2tncm91bmRcIik7XG5cbiAgICBjb25zdCBpbWFnZVNvdXJjZSA9IHNyYyB8fCAoc291cmNlICYmIHNvdXJjZS51cmkpIHx8IFwiXCI7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbXG4gICAgICAgIHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlU291cmNlfSlgLFxuICAgICAgICAgIGJhY2tncm91bmRTaXplOiByZXNpemVNb2RlID09PSBcInN0cmV0Y2hcIiA/IFwiMTAwJSAxMDAlXCIgOiByZXNpemVNb2RlLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiBcIm5vLXJlcGVhdFwiLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZSxcbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIGltYWdlU3R5bGU9e2ltYWdlU3R5bGV9XG4gICAgICAgIHNvdXJjZT17c291cmNlIHx8IHsgdXJpOiBzcmMgfX1cbiAgICAgICAgcmVzaXplTW9kZT17cmVzaXplTW9kZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5JbWFnZUJhY2tncm91bmQuZGlzcGxheU5hbWUgPSBcIkltYWdlQmFja2dyb3VuZFwiO1xuZXhwb3J0IGRlZmF1bHQgSW1hZ2VCYWNrZ3JvdW5kO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5jb25zdCBNb2RhbCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHZpc2libGUsXG4gICAgICB0cmFuc3BhcmVudCxcbiAgICAgIGFuaW1hdGlvblR5cGUsXG4gICAgICBvblJlcXVlc3RDbG9zZSxcbiAgICAgIHN0eWxlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcIm1vZGFsXCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICBpZiAoIXZpc2libGUpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBtb2RhbFN0eWxlID0ge1xuICAgICAgICAuLi5TdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpLFxuICAgICAgfTtcblxuICAgICAgLy8gUmVuZGVyIGFzIHBvcnRhbCBpZiBwb3NzaWJsZVxuICAgICAgY29uc3QgY29udGVudCA9IChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e21vZGFsU3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcblxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gUmVhY3RET00uY3JlYXRlUG9ydGFsKGNvbnRlbnQsIGRvY3VtZW50LmJvZHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHZpc2libGU9e3Zpc2libGV9XG4gICAgICAgIHRyYW5zcGFyZW50PXt0cmFuc3BhcmVudH1cbiAgICAgICAgYW5pbWF0aW9uVHlwZT17YW5pbWF0aW9uVHlwZX1cbiAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uUmVxdWVzdENsb3NlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbk1vZGFsLmRpc3BsYXlOYW1lID0gXCJNb2RhbFwiO1xuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2FmZUFyZWFWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2FmZWFyZWF2aWV3XCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzdHlsZT17c3R5bGV9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn0pO1xuXG5TYWZlQXJlYVZpZXcuZGlzcGxheU5hbWUgPSBcIlNhZmVBcmVhVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgU2FmZUFyZWFWaWV3O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5cbi8vIFdlYiBtb2NrIG9mIFN0YXR1c0Jhci4gSW4gbmF0aXZlIGl0IHdvdWxkIGNoYW5nZSB0aGUgYmFyIHN0eWxlLlxuLy8gSW4gd2ViLCBtYXliZSBpdCBjaGFuZ2VzIHRoZSBtZXRhIHRoZW1lLWNvbG9yIHRhZy5cblxuZnVuY3Rpb24gU3RhdHVzQmFyKHsgYmFyU3R5bGUgPSBcImRlZmF1bHRcIiwgYmFja2dyb3VuZENvbG9yLCBoaWRkZW4gPSBmYWxzZSB9KSB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgLy8gQXR0ZW1wdCB0byBzZXQgdGhlbWUtY29sb3IgbWV0YSB0YWcgaWYgYmFja2dyb3VuZENvbG9yIHByb3ZpZGVkXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgbGV0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0aGVtZS1jb2xvclwiXScpO1xuICAgICAgaWYgKCFtZXRhKSB7XG4gICAgICAgIG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWV0YVwiKTtcbiAgICAgICAgbWV0YS5uYW1lID0gXCJ0aGVtZS1jb2xvclwiO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuICAgICAgfVxuICAgICAgbWV0YS5jb250ZW50ID0gYmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgfSwgW2JhY2tncm91bmRDb2xvcl0pO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNCYXI7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU2Nyb2xsVmlldyBmcm9tIFwiLi9zY3JvbGwtdmlldy5qc3hcIjtcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0LmpzeFwiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFNlY3Rpb25MaXN0ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIHNlY3Rpb25zLFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXIsXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZCA9IHRydWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2VjdGlvbmxpc3RcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIC8vIFdlYiBmYWxsYmFja1xuICAgICAgY29uc3QgcmVuZGVyU2VjdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoc2VjdGlvbnMgfHwgW10pLm1hcCgoc2VjdGlvbiwgc2VjdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHNlY3Rpb24uZGF0YSB8fCBbXTtcbiAgICAgICAgICBjb25zdCBrZXkgPSBzZWN0aW9uLmtleSB8fCBzZWN0aW9uSW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlclNlY3Rpb25IZWFkZXIgJiYgcmVuZGVyU2VjdGlvbkhlYWRlcih7IHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaXRlbUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUtleSA9IGtleUV4dHJhY3RvclxuICAgICAgICAgICAgICAgICAgPyBrZXlFeHRyYWN0b3IoaXRlbSwgaXRlbUluZGV4KVxuICAgICAgICAgICAgICAgICAgOiBpdGVtLmtleSB8fCBpdGVtLmlkIHx8IGtleSArIFwiLVwiICsgaXRlbUluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpdGVtS2V5fT5cbiAgICAgICAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleDogaXRlbUluZGV4LCBzZWN0aW9uIH0pfVxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge0xpc3RIZWFkZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIHtyZW5kZXJTZWN0aW9ucygpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc2VjdGlvbnM9e3NlY3Rpb25zfVxuICAgICAgICByZW5kZXJJdGVtPXtyZW5kZXJJdGVtfVxuICAgICAgICByZW5kZXJTZWN0aW9uSGVhZGVyPXtyZW5kZXJTZWN0aW9uSGVhZGVyfVxuICAgICAgICBrZXlFeHRyYWN0b3I9e2tleUV4dHJhY3Rvcn1cbiAgICAgICAgTGlzdEhlYWRlckNvbXBvbmVudD17TGlzdEhlYWRlckNvbXBvbmVudH1cbiAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudD17TGlzdEZvb3RlckNvbXBvbmVudH1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIHN0aWNreVNlY3Rpb25IZWFkZXJzRW5hYmxlZD17c3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbik7XG5cblNlY3Rpb25MaXN0LmRpc3BsYXlOYW1lID0gXCJTZWN0aW9uTGlzdFwiO1xuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbkxpc3Q7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgS2V5Ym9hcmRBdm9pZGluZ1ZpZXcgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIGJlaGF2aW9yLFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAga2V5Ym9hcmRWZXJ0aWNhbE9mZnNldCxcbiAgICAgIGVuYWJsZWQsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwia2V5Ym9hcmRhdm9pZGluZ3ZpZXdcIik7XG5cbiAgICAvLyBPbiB3ZWIsIGtleWJvYXJkIGF2b2lkaW5nIGlzIHVzdWFsbHkgaGFuZGxlZCBieSB0aGUgYnJvd3NlciBkZWZhdWx0IGJlaGF2aW9yIG9yIGlzIGlycmVsZXZhbnRcbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgcmVmPXtyZWZ9IHN0eWxlPXtTdHlsZVNoZWV0LmZsYXR0ZW4oc3R5bGUpfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgYmVoYXZpb3I9e2JlaGF2aW9yfVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAga2V5Ym9hcmRWZXJ0aWNhbE9mZnNldD17a2V5Ym9hcmRWZXJ0aWNhbE9mZnNldH1cbiAgICAgICAgZW5hYmxlZD17ZW5hYmxlZH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5LZXlib2FyZEF2b2lkaW5nVmlldy5kaXNwbGF5TmFtZSA9IFwiS2V5Ym9hcmRBdm9pZGluZ1ZpZXdcIjtcbmV4cG9ydCBkZWZhdWx0IEtleWJvYXJkQXZvaWRpbmdWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFJlZnJlc2hDb250cm9sID0gZm9yd2FyZFJlZigoeyByZWZyZXNoaW5nLCBvblJlZnJlc2gsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicmVmcmVzaGNvbnRyb2xcIik7XG5cbiAgLy8gT24gd2ViLCBwYXNzLXRocm91Z2ggb3IgaW1wbGVtZW50IGJhc2ljIHZpc3VhbD9cbiAgLy8gVXN1YWxseSBSZWZyZXNoQ29udHJvbCBpcyBwYXNzZWQgYXMgcHJvcCB0byBTY3JvbGxWaWV3LlxuICAvLyBJZiB1c2VkIGFzIGNvbXBvbmVudCwgaXQgbWlnaHQgd3JhcCBjb250ZW50LlxuXG4gIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAvLyBOby1vcCBmb3Igd2ViIHZpc3VhbCB1c3VhbGx5LCB1bmxlc3Mgd2UgaW1wbGVtZW50IHB1bGwtdG8tcmVmcmVzaFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29tcG9uZW50XG4gICAgICByZWY9e3JlZn1cbiAgICAgIHJlZnJlc2hpbmc9e3JlZnJlc2hpbmd9XG4gICAgICBvblJlZnJlc2g9e29uUmVmcmVzaH1cbiAgICAgIHsuLi5yZXN0fVxuICAgIC8+XG4gICk7XG59KTtcblxuUmVmcmVzaENvbnRyb2wuZGlzcGxheU5hbWUgPSBcIlJlZnJlc2hDb250cm9sXCI7XG5leHBvcnQgZGVmYXVsdCBSZWZyZXNoQ29udHJvbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUb3VjaGFibGVIaWdobGlnaHQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIG9uUHJlc3MsXG4gICAgICB1bmRlcmxheUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgYWN0aXZlT3BhY2l0eSA9IDAuODUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwidG91Y2hhYmxlaGlnaGxpZ2h0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbeyBjdXJzb3I6IFwicG9pbnRlclwiIH0sIHN0eWxlXSk7XG5cbiAgICAgIC8vIFNpbXBsZSB3ZWIgaW1wbGVtZW50YXRpb246IGp1c3Qgb3BhY2l0eSwgbWltaWNraW5nIG92ZXJsYXkgaXMgaGFyZGVyIHdpdGhvdXQgc3RhdGVcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17ZmxhdFN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdW5kZXJsYXlDb2xvcjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uTW91c2VVcD17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgICAgICBmbGF0U3R5bGUuYmFja2dyb3VuZENvbG9yIHx8IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgICAgICBmbGF0U3R5bGUuYmFja2dyb3VuZENvbG9yIHx8IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgdW5kZXJsYXlDb2xvcj17dW5kZXJsYXlDb2xvcn1cbiAgICAgICAgYWN0aXZlT3BhY2l0eT17YWN0aXZlT3BhY2l0eX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5Ub3VjaGFibGVIaWdobGlnaHQuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZUhpZ2hsaWdodFwiO1xuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlSGlnaGxpZ2h0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBjbG9uZUVsZW1lbnQsIENoaWxkcmVuIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayBqdXN0IGFjY2VwdHMgb25QcmVzcyBhbmQgcGFzc2VzIGl0IHRvIHRoZSBjaGlsZFxuLy8gSXQgZG9lcyBub3QgYWRkIGFueSB2aXN1YWwgZmVlZGJhY2suXG5jb25zdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2sgPSAoe1xuICBjaGlsZHJlbixcbiAgb25QcmVzcyxcbiAgb25QcmVzc0luLFxuICBvblByZXNzT3V0LFxuICBkaXNhYmxlZCxcbiAgLi4ucmVzdFxufSkgPT4ge1xuICBjb25zdCBjaGlsZCA9IENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuXG4gIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICBvbkNsaWNrOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzKSBvblByZXNzKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uQ2xpY2spIGNoaWxkLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlRG93bjogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc0luKSBvblByZXNzSW4oZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZURvd24pIGNoaWxkLnByb3BzLm9uTW91c2VEb3duKGUpO1xuICAgIH0sXG4gICAgb25Nb3VzZVVwOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzT3V0KSBvblByZXNzT3V0KGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uTW91c2VVcCkgY2hpbGQucHJvcHMub25Nb3VzZVVwKGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaFN0YXJ0OiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoU3RhcnQpIGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydChlKTtcbiAgICB9LFxuICAgIG9uVG91Y2hFbmQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Ub3VjaEVuZCkgY2hpbGQucHJvcHMub25Ub3VjaEVuZChlKTtcbiAgICB9LFxuICAgIHN0eWxlOiB7XG4gICAgICBjdXJzb3I6IGRpc2FibGVkID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXG4gICAgICAuLi5jaGlsZC5wcm9wcy5zdHlsZSxcbiAgICB9LFxuICAgIC4uLnJlc3QsXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIFNjcmVlbiBDb21wb25lbnRcclxuICogRnVsbC1oZWlnaHQgc2NyZWVuIGNvbnRhaW5lciB3aXRoIGJhY2tncm91bmRcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IFNjcmVlbiA9IGZvcndhcmRSZWYoKHsgY2hpbGRyZW4sIGJhY2tncm91bmQgPSAnbGlnaHQnLCBjbGFzc05hbWUgPSAnJywgc3R5bGUsIC4uLnByb3BzIH0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblNjcmVlbi5kaXNwbGF5TmFtZSA9IFwiU2NyZWVuXCI7XHJcbmV4cG9ydCBkZWZhdWx0IFNjcmVlbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIENvbnRhaW5lciBDb21wb25lbnRcclxuICogUmVzcG9uc2l2ZSBjb250YWluZXIgd2l0aCBtYXgtd2lkdGggYW5kIGNlbnRlcmluZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ29udGFpbmVyID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuQ29udGFpbmVyLmRpc3BsYXlOYW1lID0gXCJDb250YWluZXJcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ2FyZCBDb21wb25lbnRcclxuICogU3R5bGVkIGNhcmQgY29udGFpbmVyIHdpdGggc2hhZG93IGFuZCByb3VuZGVkIGNvcm5lcnNcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IENhcmQgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5DYXJkLmRpc3BsYXlOYW1lID0gXCJDYXJkXCI7XHJcbmV4cG9ydCBkZWZhdWx0IENhcmQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBHcmlkIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGdyaWQgbGF5b3V0IHN5c3RlbVxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgR3JpZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkdyaWQuZGlzcGxheU5hbWUgPSBcIkdyaWRcIjtcclxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIFN0YWNrIENvbXBvbmVudFxyXG4gKiBWZXJ0aWNhbCBvciBob3Jpem9udGFsIGxheW91dCB3aXRoIHNwYWNpbmdcclxuICogV29ya3Mgb24gV2ViLCBEZXNrdG9wIChFbGVjdHJvbiksIGFuZCBNb2JpbGUgKENhcGFjaXRvcilcclxuICovXHJcbmNvbnN0IFN0YWNrID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBkaXJlY3Rpb24gPSAndmVydGljYWwnLFxyXG4gICAgc3BhY2luZyA9IDQsXHJcbiAgICBhbGlnbiA9ICdzdGFydCcsXHJcbiAgICBqdXN0aWZ5ID0gJ3N0YXJ0JyxcclxuICAgIGNsYXNzTmFtZSA9ICcnLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5TdGFjay5kaXNwbGF5TmFtZSA9IFwiU3RhY2tcIjtcclxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBJY29uIENvbXBvbmVudFxyXG4gKiBEaXNwbGF5cyBlbW9qaSBpY29ucyBjb25zaXN0ZW50bHkgYWNyb3NzIHBsYXRmb3Jtc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgSWNvbiA9IGZvcndhcmRSZWYoKHtcclxuICAgIG5hbWUsXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRleHQgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7bmFtZX1cclxuICAgICAgICA8L1RleHQgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5JY29uLmRpc3BsYXlOYW1lID0gXCJJY29uXCI7XHJcbmV4cG9ydCBkZWZhdWx0IEljb247XHJcbiIsICIvLyBEaW1lbnNpb25zIEFQSSBmb3IgV2ViXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGxpc3RlbmVycyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgIGxpc3RlbmVycy5lbWl0KFwiY2hhbmdlXCIsIHsgd2luZG93OiBnZXRXaW5kb3coKSwgc2NyZWVuOiBnZXRTY3JlZW4oKSB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIHsgd2lkdGg6IDAsIGhlaWdodDogMCwgc2NhbGU6IDEsIGZvbnRTY2FsZTogMSB9O1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBzY2FsZTogd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSxcbiAgICBmb250U2NhbGU6IDEsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNjcmVlbigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgcmV0dXJuIHsgd2lkdGg6IDAsIGhlaWdodDogMCwgc2NhbGU6IDEsIGZvbnRTY2FsZTogMSB9O1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aW5kb3cuc2NyZWVuLndpZHRoLFxuICAgIGhlaWdodDogd2luZG93LnNjcmVlbi5oZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgRGltZW5zaW9ucyA9IHtcbiAgZ2V0OiAoZGltKSA9PiB7XG4gICAgaWYgKGRpbSA9PT0gXCJ3aW5kb3dcIikgcmV0dXJuIGdldFdpbmRvdygpO1xuICAgIGlmIChkaW0gPT09IFwic2NyZWVuXCIpIHJldHVybiBnZXRTY3JlZW4oKTtcbiAgICByZXR1cm4gZ2V0V2luZG93KCk7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vbihcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gbGlzdGVuZXJzLm9mZihcImNoYW5nZVwiLCBoYW5kbGVyKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHJlbW92ZTogKCkgPT4ge30gfTtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaGFuZ2VcIikge1xuICAgICAgbGlzdGVuZXJzLm9mZihcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEaW1lbnNpb25zO1xuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxuY29uc3QgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgY29uc3QgTGlua2luZyA9IHtcbiAgb3BlblVSTDogKHVybCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3cub3Blbih1cmwsIFwiX2JsYW5rXCIsIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9LFxuICBjYW5PcGVuVVJMOiAodXJsKSA9PiBQcm9taXNlLnJlc29sdmUodHJ1ZSksXG4gIGdldEluaXRpYWxVUkw6ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwidXJsXCIpIHtcbiAgICAgIC8vIEluIGEgcmVhbCB3ZWIgYXBwLCB3ZSBtaWdodCBsaXN0ZW4gdG8gcG9wc3RhdGUgb3IgaGFzaGNoYW5nZVxuICAgICAgLy8gZW5zdXJpbmcgd2UgcmV0dXJuIGEgc3Vic2NyaXB0aW9uLWxpa2Ugb2JqZWN0XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IChlKSA9PiBoYW5kbGVyKHsgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZiB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgbGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHJlbW92ZTogKCkgPT4ge30gfTtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAvLyBEZXByZWNhdGVkIGluIFJOIGJ1dCBnb29kIHRvIGhhdmUgc2lnbmF0dXJlXG4gIH0sXG4gIHNlbmRJbnRlbnQ6IChhY3Rpb24sIGV4dHJhcykgPT4gUHJvbWlzZS5yZXNvbHZlKCksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5raW5nO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZpZXcsIFRleHQsIFByZXNzYWJsZSB9IGZyb20gJ2luZGpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRhc2tDYXJkKHsgdGFzaywgb25Ub2dnbGUsIG9uRGVsZXRlIH0pIHtcclxuICAgIGNvbnN0IHByaW9yaXR5Q29sb3JzID0ge1xyXG4gICAgICAgIGhpZ2g6ICdib3JkZXItcmVkLTQwMCBiZy1yZWQtNTAnLFxyXG4gICAgICAgIG1lZGl1bTogJ2JvcmRlci15ZWxsb3ctNDAwIGJnLXllbGxvdy01MCcsXHJcbiAgICAgICAgbG93OiAnYm9yZGVyLWdyZWVuLTQwMCBiZy1ncmVlbi01MCdcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHJpb3JpdHlCYWRnZUNvbG9ycyA9IHtcclxuICAgICAgICBoaWdoOiAnYmctcmVkLTUwMCB0ZXh0LXdoaXRlJyxcclxuICAgICAgICBtZWRpdW06ICdiZy15ZWxsb3ctNTAwIHRleHQtd2hpdGUnLFxyXG4gICAgICAgIGxvdzogJ2JnLWdyZWVuLTUwMCB0ZXh0LXdoaXRlJ1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXItbC00ICR7dGFzay5jb21wbGV0ZWQgPyAnb3BhY2l0eS02MCBib3JkZXItZ3JheS0zMDAnIDogcHJpb3JpdHlDb2xvcnNbdGFzay5wcmlvcml0eV1cclxuICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgey8qIENoZWNrYm94ICovfVxyXG4gICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3M9e29uVG9nZ2xlfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtc2hyaW5rLTAgdy03IGgtNyByb3VuZGVkLWxnIGJvcmRlci0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke3Rhc2suY29tcGxldGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCBib3JkZXItdHJhbnNwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItZ3JheS0zMDAgaG92ZXI6Ym9yZGVyLXZpb2xldC00MDAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0YXNrLmNvbXBsZXRlZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXdoaXRlXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezN9IGQ9XCJNNSAxM2w0IDRMMTkgN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogVGFzayBDb250ZW50ICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbWItMSAke3Rhc2suY29tcGxldGVkID8gJ2xpbmUtdGhyb3VnaCB0ZXh0LWdyYXktNTAwJyA6ICd0ZXh0LWdyYXktODAwJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFzay50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAge3Rhc2suZGVzY3JpcHRpb24gJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9e2B0ZXh0LXNtIG1iLTMgJHt0YXNrLmNvbXBsZXRlZCA/ICd0ZXh0LWdyYXktNDAwJyA6ICd0ZXh0LWdyYXktNjAwJ31gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgZmxleC13cmFwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQcmlvcml0eSBCYWRnZSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCAke3ByaW9yaXR5QmFkZ2VDb2xvcnNbdGFzay5wcmlvcml0eV19YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtd2hpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5wcmlvcml0eS50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ2F0ZWdvcnkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmNhdGVnb3J5ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1wdXJwbGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmNhdGVnb3J5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEYXRlICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5kdWVEYXRlICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZ3JheS01MDBcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTggN1YzbTggNFYzbS05IDhoMTBNNSAyMWgxNGEyIDIgMCAwMDItMlY3YTIgMiAwIDAwLTItMkg1YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMnpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3IERhdGUodGFzay5kdWVEYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBEZWxldGUgQnV0dG9uICovfVxyXG4gICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUHJlc3M9e29uRGVsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy0xMCBoLTEwIHJvdW5kZWQteGwgYmctcmVkLTUwIGhvdmVyOmJnLXJlZC0xMDAgdGV4dC1yZWQtNjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMTBcIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXJlZC02MDBcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTE5IDdsLS44NjcgMTIuMTQyQTIgMiAwIDAxMTYuMTM4IDIxSDcuODYyYTIgMiAwIDAxLTEuOTk1LTEuODU4TDUgN201IDR2Nm00LTZ2Nm0xLTEwVjRhMSAxIDAgMDAtMS0xaC00YTEgMSAwIDAwLTEgMXYzTTQgN2gxNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cclxuICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn1cclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVmlldywgVGV4dCwgVGV4dElucHV0LCBQcmVzc2FibGUsIE1vZGFsLCBTY3JvbGxWaWV3IH0gZnJvbSAnaW5kanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWRkVGFza01vZGFsKHsgb25DbG9zZSwgb25BZGQgfSkge1xyXG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgICBwcmlvcml0eTogJ21lZGl1bScsXHJcbiAgICAgICAgY2F0ZWdvcnk6ICcnLFxyXG4gICAgICAgIGR1ZURhdGU6ICcnXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFmb3JtRGF0YS50aXRsZS50cmltKCkpIHJldHVybjtcclxuICAgICAgICBvbkFkZChmb3JtRGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChmaWVsZCwgdmFsdWUpID0+IHtcclxuICAgICAgICBzZXRGb3JtRGF0YSh7XHJcbiAgICAgICAgICAgIC4uLmZvcm1EYXRhLFxyXG4gICAgICAgICAgICBbZmllbGRdOiB2YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxNb2RhbCB2aXNpYmxlPXt0cnVlfSB0cmFuc3BhcmVudD17dHJ1ZX0gYW5pbWF0aW9uVHlwZT1cInNsaWRlXCIgb25SZXF1ZXN0Q2xvc2U9e29uQ2xvc2V9PlxyXG4gICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHotNTAgYmFja2Ryb3AtYmx1ci1zbVwiPlxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0zeGwgc2hhZG93LTJ4bCBtYXgtdy1sZyB3LWZ1bGwgbWF4LWgtWzkwdmhdIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBIZWFkZXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgdGV4dC13aGl0ZSBweC02IHB5LTUgcm91bmRlZC10LTN4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+QWRkIE5ldyBUYXNrPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3M9e29uQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgYmctd2hpdGUgYmctb3BhY2l0eS0yMCBob3ZlcjpiZy1vcGFjaXR5LTMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtd2hpdGVcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTYgMThMMTggNk02IDZsMTIgMTJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBGb3JtICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxTY3JvbGxWaWV3IGNsYXNzTmFtZT1cInAtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJzcGFjZS15LTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUaXRsZSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGFzayBUaXRsZSAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVRleHQ9eyh2YWx1ZSkgPT4gaGFuZGxlQ2hhbmdlKCd0aXRsZScsIHZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0YXNrIHRpdGxlLi4uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlVGV4dD17KHZhbHVlKSA9PiBoYW5kbGVDaGFuZ2UoJ2Rlc2NyaXB0aW9uJywgdmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFkZCBkZXRhaWxzIGFib3V0IHlvdXIgdGFzay4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpbGluZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZMaW5lcz17M31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQcmlvcml0eSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Wydsb3cnLCAnbWVkaXVtJywgJ2hpZ2gnXS5tYXAoKHByaW9yaXR5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UHJlc3NhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtwcmlvcml0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBoYW5kbGVDaGFuZ2UoJ3ByaW9yaXR5JywgcHJpb3JpdHkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTMgcHgtNCByb3VuZGVkLXhsIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke2Zvcm1EYXRhLnByaW9yaXR5ID09PSBwcmlvcml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmlvcml0eSA9PT0gJ2hpZ2gnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTUwMCBzaGFkb3ctbGcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcmlvcml0eSA9PT0gJ21lZGl1bSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTUwMCBzaGFkb3ctbGcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyZWVuLTUwMCBzaGFkb3ctbGcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmF5LTEwMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgJHtmb3JtRGF0YS5wcmlvcml0eSA9PT0gcHJpb3JpdHkgPyAndGV4dC13aGl0ZSBmb250LW1lZGl1bScgOiAndGV4dC1ncmF5LTYwMCd9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmlvcml0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByaW9yaXR5LnNsaWNlKDEpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIENhdGVnb3J5ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZ3JheS03MDAgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnY2F0ZWdvcnknLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNCBweS0zIHJvdW5kZWQteGwgYm9yZGVyLTIgYm9yZGVyLWdyYXktMjAwIGZvY3VzOmJvcmRlci12aW9sZXQtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0zMDAgYmctd2hpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGNhdGVnb3J5Li4uPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiV29ya1wiPldvcms8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQZXJzb25hbFwiPlBlcnNvbmFsPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2hvcHBpbmdcIj5TaG9wcGluZzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhlYWx0aFwiPkhlYWx0aDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0dWR5XCI+U3R1ZHk8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJPdGhlclwiPk90aGVyPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogRHVlIERhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1ZSBEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5kdWVEYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZSgnZHVlRGF0ZScsIGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBCdXR0b25zICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBnYXAtMyBwdC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMyBweC02IHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIGJnLWdyYXktMTAwIGhvdmVyOmJnLWdyYXktMjAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtc2VtaWJvbGQgdGV4dC1jZW50ZXJcIj5DYW5jZWw8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtoYW5kbGVTdWJtaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0zIHB4LTYgcm91bmRlZC14bCBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgaG92ZXI6c2hhZG93LWxnIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LWNlbnRlclwiPkFkZCBUYXNrPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TY3JvbGxWaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgICk7XHJcbn1cclxuIiwgImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICB0YXNrczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWxjb21lIHRvIFRhc2sgTWFuYWdlciEnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSBzYW1wbGUgdGFzay4gQ2xpY2sgdGhlIGNoZWNrYm94IHRvIG1hcmsgaXQgYXMgY29tcGxldGUsIG9yIGRlbGV0ZSBpdC4nLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogJ2hpZ2gnLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogJ1BlcnNvbmFsJyxcclxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGR1ZURhdGU6IG5ldyBEYXRlKERhdGUubm93KCkgKyA4NjQwMDAwMCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnVHJ5IGFkZGluZyBhIG5ldyB0YXNrJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDbGljayB0aGUgKyBidXR0b24gdG8gY3JlYXRlIHlvdXIgb3duIHRhc2tzJyxcclxuICAgICAgICAgICAgcHJpb3JpdHk6ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogJ1dvcmsnLFxyXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmNvbnN0IHRhc2tTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICAgIG5hbWU6ICd0YXNrcycsXHJcbiAgICBpbml0aWFsU3RhdGUsXHJcbiAgICByZWR1Y2Vyczoge1xyXG4gICAgICAgIGFkZFRhc2s6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRhc2tzLnVuc2hpZnQoYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFzayA9IHN0YXRlLnRhc2tzLmZpbmQodCA9PiB0LmlkID09PSBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9ICF0YXNrLmNvbXBsZXRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsZXRlVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3RhdGUudGFza3MgPSBzdGF0ZS50YXNrcy5maWx0ZXIodCA9PiB0LmlkICE9PSBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVUYXNrOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN0YXRlLnRhc2tzLmZpbmRJbmRleCh0ID0+IHQuaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudGFza3NbaW5kZXhdID0geyAuLi5zdGF0ZS50YXNrc1tpbmRleF0sIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHsgYWRkVGFzaywgdG9nZ2xlVGFzaywgZGVsZXRlVGFzaywgdXBkYXRlVGFzayB9ID0gdGFza1NsaWNlLmFjdGlvbnM7XHJcbmV4cG9ydCBkZWZhdWx0IHRh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QyxhQUNFLGdCQUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsU0FBUyxNQUFNLGFBQWEsS0FBSyxFQUFFO0FBQUEsVUFDbkMsV0FBVTtBQUFBLFVBRVYsMEJBQUFDLE1BQUMsZ0JBQUssV0FBVyxnRUFBZ0UsV0FBVyx3QkFBd0IsRUFBRSxJQUNwSDtBQUFBLDRCQUFBRCxNQUFDLGdCQUFLLFdBQVcsK0RBQStELFdBQVcsb0RBQW9ELGdCQUFnQixJQUM3SiwwQkFBQUEsTUFBQyxnQkFBSyxXQUFVLFlBQ2IscUJBQVcsS0FBSyxhQUFhLEtBQUssTUFDckMsR0FDRjtBQUFBLFlBQ0EsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVyx1QkFBdUIsV0FBVyxvQkFBb0IsZUFBZSxJQUNuRixlQUFLLE9BQ1I7QUFBQSxhQUNGO0FBQUE7QUFBQSxRQWJLLEtBQUs7QUFBQSxNQWNaO0FBQUEsSUFFSixDQUFDLEdBQ0gsR0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAidXNlU3RhdGUiLCAicGxhdGZvcm0iLCAiU3R5bGVTaGVldCIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJqc3hzIiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiZm9yd2FyZFJlZiIsICJSZWFjdCIsICJmb3J3YXJkUmVmIiwgImpzeCIsICJmb3J3YXJkUmVmIiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImZvcndhcmRSZWYiLCAiRXZlbnRFbWl0dGVyIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIiwgInVzZVN0YXRlIl0KfQo=

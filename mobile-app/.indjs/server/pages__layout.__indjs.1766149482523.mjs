var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/indjs/src/routing/matcher.mjs
var init_matcher = __esm({
  "node_modules/indjs/src/routing/matcher.mjs"() {
  }
});

// node_modules/indjs/src/routing/routes.mjs
var init_routes = __esm({
  "node_modules/indjs/src/routing/routes.mjs"() {
    init_matcher();
  }
});

// node_modules/indjs/src/platform.mjs
var isBrowser, isDesktop, isMobile, isAndroid, isIOS, platform;
var init_platform = __esm({
  "node_modules/indjs/src/platform.mjs"() {
    isBrowser = typeof window !== "undefined";
    isDesktop = isBrowser && (window.process?.type === "renderer" || !!window.electron || navigator.userAgent.includes("Electron"));
    isMobile = isBrowser && (!!window.Capacitor || !!window.androidBridge || !!window.webkit?.messageHandlers?.bridge || navigator.userAgent.includes("Capacitor"));
    isAndroid = isMobile && /android/i.test(navigator.userAgent);
    isIOS = isMobile && /iphone|ipad|ipod/i.test(navigator.userAgent);
    platform = (() => {
      if (isDesktop) return "desktop";
      if (isAndroid) return "android";
      if (isIOS) return "ios";
      if (isMobile) return "mobile";
      return "web";
    })();
  }
});

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
var init_resolve = __esm({
  "node_modules/indjs/src/universal/resolve.js"() {
  }
});

// node_modules/indjs/src/apis/style-sheet.mjs
var StyleSheet2, style_sheet_default;
var init_style_sheet = __esm({
  "node_modules/indjs/src/apis/style-sheet.mjs"() {
    StyleSheet2 = {
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
    style_sheet_default = StyleSheet2;
  }
});

// node_modules/indjs/src/components/image.jsx
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Image;
var init_image = __esm({
  "node_modules/indjs/src/components/image.jsx"() {
    init_resolve();
    init_style_sheet();
    Image = forwardRef(({ style, source, src, ...rest }, ref) => {
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
  }
});

// node_modules/indjs/src/components/link.jsx
import React2 from "react";
var init_link = __esm({
  "node_modules/indjs/src/components/link.jsx"() {
  }
});

// node_modules/indjs/src/components/view.jsx
import React3, { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var View, view_default;
var init_view = __esm({
  "node_modules/indjs/src/components/view.jsx"() {
    init_resolve();
    init_style_sheet();
    View = forwardRef2(({ children, style, className, ...rest }, ref) => {
      const Component = resolveElement("view");
      const flatStyle = style_sheet_default.flatten([style]);
      return /* @__PURE__ */ jsx2(Component, { ref, style: flatStyle, className, ...rest, children });
    });
    View.displayName = "View";
    view_default = View;
  }
});

// node_modules/indjs/src/components/text.jsx
import React4, { forwardRef as forwardRef3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Text, text_default;
var init_text = __esm({
  "node_modules/indjs/src/components/text.jsx"() {
    init_resolve();
    init_style_sheet();
    Text = forwardRef3(({ children, style, className, ...rest }, ref) => {
      const Component = resolveElement("text");
      const flatStyle = style_sheet_default.flatten([style]);
      return /* @__PURE__ */ jsx3(Component, { ref, style: flatStyle, className, ...rest, children });
    });
    Text.displayName = "Text";
    text_default = Text;
  }
});

// node_modules/indjs/src/components/scroll-view.jsx
import React5, { forwardRef as forwardRef4 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var ScrollView, scroll_view_default;
var init_scroll_view = __esm({
  "node_modules/indjs/src/components/scroll-view.jsx"() {
    init_resolve();
    init_style_sheet();
    ScrollView = forwardRef4(
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
    scroll_view_default = ScrollView;
  }
});

// node_modules/indjs/src/components/text-input.jsx
import React6, { forwardRef as forwardRef5 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var TextInput, text_input_default;
var init_text_input = __esm({
  "node_modules/indjs/src/components/text-input.jsx"() {
    TextInput = forwardRef5(
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
    text_input_default = TextInput;
  }
});

// node_modules/indjs/src/components/button.jsx
import React7, { forwardRef as forwardRef6 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button;
var init_button = __esm({
  "node_modules/indjs/src/components/button.jsx"() {
    init_resolve();
    init_style_sheet();
    Button = forwardRef6(
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
  }
});

// node_modules/indjs/src/components/activity-indicator.jsx
import React8, { forwardRef as forwardRef7 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ActivityIndicator;
var init_activity_indicator = __esm({
  "node_modules/indjs/src/components/activity-indicator.jsx"() {
    init_resolve();
    init_style_sheet();
    ActivityIndicator = forwardRef7(
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
  }
});

// node_modules/indjs/src/components/switch.jsx
import React9, { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Switch;
var init_switch = __esm({
  "node_modules/indjs/src/components/switch.jsx"() {
    init_resolve();
    init_style_sheet();
    Switch = forwardRef8(
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
  }
});

// node_modules/indjs/src/components/flat-list.jsx
import React10, { forwardRef as forwardRef9 } from "react";
import { jsx as jsx9, jsxs } from "react/jsx-runtime";
var FlatList;
var init_flat_list = __esm({
  "node_modules/indjs/src/components/flat-list.jsx"() {
    init_resolve();
    init_scroll_view();
    init_style_sheet();
    FlatList = forwardRef9(
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
  }
});

// node_modules/indjs/src/components/touchable-opacity.jsx
import React11, { forwardRef as forwardRef10 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var TouchableOpacity;
var init_touchable_opacity = __esm({
  "node_modules/indjs/src/components/touchable-opacity.jsx"() {
    init_resolve();
    init_style_sheet();
    TouchableOpacity = forwardRef10(
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
  }
});

// node_modules/indjs/src/components/pressable.jsx
import React12, { forwardRef as forwardRef11 } from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Pressable, pressable_default;
var init_pressable = __esm({
  "node_modules/indjs/src/components/pressable.jsx"() {
    init_resolve();
    init_style_sheet();
    Pressable = forwardRef11(({ children, style, onPress, ...rest }, ref) => {
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
    pressable_default = Pressable;
  }
});

// node_modules/indjs/src/components/image-background.jsx
import React13, { forwardRef as forwardRef12 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var ImageBackground;
var init_image_background = __esm({
  "node_modules/indjs/src/components/image-background.jsx"() {
    init_resolve();
    init_style_sheet();
    ImageBackground = forwardRef12(
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
  }
});

// node_modules/indjs/src/components/modal.jsx
import React14, { forwardRef as forwardRef13 } from "react";
import ReactDOM from "react-dom";
import { jsx as jsx13 } from "react/jsx-runtime";
var Modal, modal_default;
var init_modal = __esm({
  "node_modules/indjs/src/components/modal.jsx"() {
    init_resolve();
    init_style_sheet();
    Modal = forwardRef13(
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
    modal_default = Modal;
  }
});

// node_modules/indjs/src/components/safe-area-view.jsx
import React15, { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var SafeAreaView, safe_area_view_default;
var init_safe_area_view = __esm({
  "node_modules/indjs/src/components/safe-area-view.jsx"() {
    init_resolve();
    init_style_sheet();
    SafeAreaView = forwardRef14(({ children, style, ...rest }, ref) => {
      const Component = resolveElement("safeareaview");
      if (Component === "div" || Component === "view") {
        const flatStyle = style_sheet_default.flatten([style]);
        return /* @__PURE__ */ jsx14("div", { ref, style: flatStyle, ...rest, children });
      }
      return /* @__PURE__ */ jsx14(Component, { ref, style, ...rest, children });
    });
    SafeAreaView.displayName = "SafeAreaView";
    safe_area_view_default = SafeAreaView;
  }
});

// node_modules/indjs/src/components/status-bar.jsx
import React16 from "react";
var init_status_bar = __esm({
  "node_modules/indjs/src/components/status-bar.jsx"() {
    init_view();
  }
});

// node_modules/indjs/src/components/section-list.jsx
import React17, { forwardRef as forwardRef15 } from "react";
import { jsx as jsx15, jsxs as jsxs2 } from "react/jsx-runtime";
var SectionList;
var init_section_list = __esm({
  "node_modules/indjs/src/components/section-list.jsx"() {
    init_resolve();
    init_scroll_view();
    init_view();
    init_text();
    init_style_sheet();
    SectionList = forwardRef15(
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
  }
});

// node_modules/indjs/src/components/keyboard-avoiding-view.jsx
import React18, { forwardRef as forwardRef16 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var KeyboardAvoidingView;
var init_keyboard_avoiding_view = __esm({
  "node_modules/indjs/src/components/keyboard-avoiding-view.jsx"() {
    init_resolve();
    init_style_sheet();
    KeyboardAvoidingView = forwardRef16(
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
  }
});

// node_modules/indjs/src/components/refresh-control.jsx
import React19, { forwardRef as forwardRef17 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var RefreshControl;
var init_refresh_control = __esm({
  "node_modules/indjs/src/components/refresh-control.jsx"() {
    init_resolve();
    init_style_sheet();
    RefreshControl = forwardRef17(({ refreshing, onRefresh, ...rest }, ref) => {
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
  }
});

// node_modules/indjs/src/components/touchable-highlight.jsx
import React20, { forwardRef as forwardRef18 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var TouchableHighlight;
var init_touchable_highlight = __esm({
  "node_modules/indjs/src/components/touchable-highlight.jsx"() {
    init_resolve();
    init_style_sheet();
    TouchableHighlight = forwardRef18(
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
  }
});

// node_modules/indjs/src/components/touchable-without-feedback.jsx
import React21, { cloneElement, Children } from "react";
var init_touchable_without_feedback = __esm({
  "node_modules/indjs/src/components/touchable-without-feedback.jsx"() {
  }
});

// node_modules/indjs/src/components/screen.jsx
import React22, { forwardRef as forwardRef19 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Screen;
var init_screen = __esm({
  "node_modules/indjs/src/components/screen.jsx"() {
    init_view();
    Screen = forwardRef19(({ children, background = "light", className = "", style, ...props }, ref) => {
      const finalClass = className.trim();
      return /* @__PURE__ */ jsx19(view_default, { ref, className: finalClass, style, ...props, children });
    });
    Screen.displayName = "Screen";
  }
});

// node_modules/indjs/src/components/container.jsx
import React23, { forwardRef as forwardRef20 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Container;
var init_container = __esm({
  "node_modules/indjs/src/components/container.jsx"() {
    init_view();
    Container = forwardRef20(({
      children,
      className = "",
      style,
      ...props
    }, ref) => {
      const finalClass = className.trim();
      return /* @__PURE__ */ jsx20(view_default, { ref, className: finalClass, style, ...props, children });
    });
    Container.displayName = "Container";
  }
});

// node_modules/indjs/src/components/card.jsx
import React24, { forwardRef as forwardRef21 } from "react";
import { jsx as jsx21 } from "react/jsx-runtime";
var Card;
var init_card = __esm({
  "node_modules/indjs/src/components/card.jsx"() {
    init_view();
    Card = forwardRef21(({
      children,
      className = "",
      style,
      ...props
    }, ref) => {
      const finalClass = className.trim();
      return /* @__PURE__ */ jsx21(view_default, { ref, className: finalClass, style, ...props, children });
    });
    Card.displayName = "Card";
  }
});

// node_modules/indjs/src/components/grid.jsx
import React25, { forwardRef as forwardRef22 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var Grid;
var init_grid = __esm({
  "node_modules/indjs/src/components/grid.jsx"() {
    init_view();
    Grid = forwardRef22(({
      children,
      className = "",
      style,
      ...props
    }, ref) => {
      const finalClass = className.trim();
      return /* @__PURE__ */ jsx22(view_default, { ref, className: finalClass, style, ...props, children });
    });
    Grid.displayName = "Grid";
  }
});

// node_modules/indjs/src/components/stack.jsx
import React26, { forwardRef as forwardRef23 } from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var Stack;
var init_stack = __esm({
  "node_modules/indjs/src/components/stack.jsx"() {
    init_view();
    Stack = forwardRef23(({
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
  }
});

// node_modules/indjs/src/components/icon.jsx
import React27, { forwardRef as forwardRef24 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var Icon;
var init_icon = __esm({
  "node_modules/indjs/src/components/icon.jsx"() {
    init_text();
    Icon = forwardRef24(({
      name,
      className = "",
      style,
      ...props
    }, ref) => {
      const finalClass = className.trim();
      return /* @__PURE__ */ jsx24(text_default, { ref, className: finalClass, style, ...props, children: name });
    });
    Icon.displayName = "Icon";
  }
});

// node_modules/indjs/src/apis/alert.mjs
var init_alert = __esm({
  "node_modules/indjs/src/apis/alert.mjs"() {
  }
});

// node_modules/indjs/src/apis/dimensions.mjs
import { EventEmitter } from "events";
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
var listeners;
var init_dimensions = __esm({
  "node_modules/indjs/src/apis/dimensions.mjs"() {
    listeners = new EventEmitter();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        listeners.emit("change", { window: getWindow(), screen: getScreen() });
      });
    }
  }
});

// node_modules/indjs/src/apis/pixel-ratio.mjs
var init_pixel_ratio = __esm({
  "node_modules/indjs/src/apis/pixel-ratio.mjs"() {
  }
});

// node_modules/indjs/src/apis/linking.mjs
import { EventEmitter as EventEmitter2 } from "events";
var eventEmitter;
var init_linking = __esm({
  "node_modules/indjs/src/apis/linking.mjs"() {
    eventEmitter = new EventEmitter2();
  }
});

// node_modules/indjs/src/index.mjs
var init_src = __esm({
  "node_modules/indjs/src/index.mjs"() {
    init_routes();
    init_platform();
    init_platform();
    init_image();
    init_link();
    init_view();
    init_text();
    init_scroll_view();
    init_text_input();
    init_button();
    init_activity_indicator();
    init_switch();
    init_flat_list();
    init_touchable_opacity();
    init_pressable();
    init_image_background();
    init_modal();
    init_safe_area_view();
    init_status_bar();
    init_section_list();
    init_keyboard_avoiding_view();
    init_refresh_control();
    init_touchable_highlight();
    init_touchable_without_feedback();
    init_screen();
    init_container();
    init_card();
    init_grid();
    init_stack();
    init_icon();
    init_style_sheet();
    init_alert();
    init_dimensions();
    init_pixel_ratio();
    init_linking();
  }
});

// utils/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";
var initialState, taskSlice, addTask, toggleTask, deleteTask, updateTask, taskSlice_default;
var init_taskSlice = __esm({
  "utils/taskSlice.js"() {
    initialState = {
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
    taskSlice = createSlice({
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
    ({ addTask, toggleTask, deleteTask, updateTask } = taskSlice.actions);
    taskSlice_default = taskSlice.reducer;
  }
});

// pages/categories.jsx
var categories_exports = {};
__export(categories_exports, {
  default: () => Categories
});
import React29 from "react";
import { jsx as jsx26, jsxs as jsxs4 } from "react/jsx-runtime";
function Categories() {
  const categories = [
    { name: "Work", count: 8, color: "from-blue-500 to-blue-600", icon: "\u{1F4BC}", tasks: ["Team Meeting", "Project Review", "Email Clients"] },
    { name: "Personal", count: 5, color: "from-purple-500 to-purple-600", icon: "\u{1F3E0}", tasks: ["Grocery Shopping", "Call Mom", "Read Book"] },
    { name: "Shopping", count: 3, color: "from-pink-500 to-pink-600", icon: "\u{1F6CD}\uFE0F", tasks: ["Buy Groceries", "New Shoes", "Gift for Friend"] },
    { name: "Health", count: 4, color: "from-green-500 to-green-600", icon: "\u{1F4AA}", tasks: ["Gym Workout", "Yoga Session", "Meal Prep"] },
    { name: "Study", count: 6, color: "from-yellow-500 to-yellow-600", icon: "\u{1F4DA}", tasks: ["Read Chapter 5", "Complete Assignment", "Practice Coding"] },
    { name: "Finance", count: 2, color: "from-emerald-500 to-emerald-600", icon: "\u{1F4B0}", tasks: ["Pay Bills", "Budget Review"] },
    { name: "Travel", count: 1, color: "from-cyan-500 to-cyan-600", icon: "\u2708\uFE0F", tasks: ["Book Flight"] },
    { name: "Other", count: 3, color: "from-gray-500 to-gray-600", icon: "\u{1F4CC}", tasks: ["Miscellaneous Tasks"] }
  ];
  return /* @__PURE__ */ jsx26(scroll_view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: /* @__PURE__ */ jsxs4(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs4(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx26(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Categories" }),
      /* @__PURE__ */ jsx26(text_default, { className: "text-gray-600 text-lg", children: "Organize tasks by category" })
    ] }),
    /* @__PURE__ */ jsx26(view_default, { className: "grid grid-cols-2 gap-4 mb-8", children: categories.map((category, index) => /* @__PURE__ */ jsxs4(
      pressable_default,
      {
        className: "bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300",
        children: [
          /* @__PURE__ */ jsx26(view_default, { className: `w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx26(text_default, { className: "text-3xl", children: category.icon }) }),
          /* @__PURE__ */ jsx26(text_default, { className: "text-lg font-bold text-gray-800 mb-1", children: category.name }),
          /* @__PURE__ */ jsxs4(text_default, { className: "text-sm text-gray-600", children: [
            category.count,
            " tasks"
          ] })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsxs4(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx26(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Recent Tasks by Category" }),
      categories.slice(0, 4).map((category, index) => /* @__PURE__ */ jsxs4(view_default, { className: "bg-white rounded-2xl p-5 shadow-lg mb-4", children: [
        /* @__PURE__ */ jsxs4(view_default, { className: "flex flex-row items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsx26(view_default, { className: `w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`, children: /* @__PURE__ */ jsx26(text_default, { className: "text-xl", children: category.icon }) }),
          /* @__PURE__ */ jsx26(text_default, { className: "text-lg font-bold text-gray-800", children: category.name })
        ] }),
        /* @__PURE__ */ jsx26(view_default, { className: "space-y-2", children: category.tasks.map((task, taskIndex) => /* @__PURE__ */ jsxs4(view_default, { className: "flex flex-row items-center gap-2 py-2", children: [
          /* @__PURE__ */ jsx26(view_default, { className: "w-5 h-5 rounded border-2 border-gray-300" }),
          /* @__PURE__ */ jsx26(text_default, { className: "text-gray-700", children: task })
        ] }, taskIndex)) })
      ] }, index))
    ] })
  ] }) });
}
var init_categories = __esm({
  "pages/categories.jsx"() {
    init_src();
  }
});

// pages/statistics.jsx
var statistics_exports = {};
__export(statistics_exports, {
  default: () => Statistics
});
import React30 from "react";
import { jsx as jsx27, jsxs as jsxs5 } from "react/jsx-runtime";
function Statistics() {
  const weekData = [
    { day: "Mon", completed: 8, total: 10 },
    { day: "Tue", completed: 6, total: 8 },
    { day: "Wed", completed: 10, total: 12 },
    { day: "Thu", completed: 7, total: 9 },
    { day: "Fri", completed: 9, total: 11 },
    { day: "Sat", completed: 5, total: 6 },
    { day: "Sun", completed: 4, total: 5 }
  ];
  const insights = [
    { title: "Most Productive Day", value: "Wednesday", icon: "\u{1F4C8}", color: "from-green-500 to-green-600" },
    { title: "Average Completion Rate", value: "82%", icon: "\u{1F3AF}", color: "from-blue-500 to-blue-600" },
    { title: "Total Time Saved", value: "12 hours", icon: "\u23F1\uFE0F", color: "from-purple-500 to-purple-600" },
    { title: "Streak Record", value: "14 days", icon: "\u{1F525}", color: "from-orange-500 to-orange-600" }
  ];
  return /* @__PURE__ */ jsx27(scroll_view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: /* @__PURE__ */ jsxs5(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs5(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Statistics" }),
      /* @__PURE__ */ jsx27(text_default, { className: "text-gray-600 text-lg", children: "Track your productivity" })
    ] }),
    /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-5 shadow-lg mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "This Week" }),
      /* @__PURE__ */ jsx27(view_default, { className: "flex flex-row items-end justify-between h-48 mb-4", children: weekData.map((day, index) => {
        const percentage = day.completed / day.total * 100;
        const height = `${percentage}%`;
        return /* @__PURE__ */ jsxs5(view_default, { className: "flex-1 items-center gap-2", children: [
          /* @__PURE__ */ jsx27(view_default, { className: "w-full px-1", children: /* @__PURE__ */ jsx27(
            view_default,
            {
              className: "bg-gradient-to-t from-violet-600 to-fuchsia-600 rounded-t-lg",
              style: { height }
            }
          ) }),
          /* @__PURE__ */ jsx27(text_default, { className: "text-xs text-gray-600 font-medium", children: day.day }),
          /* @__PURE__ */ jsxs5(text_default, { className: "text-xs text-gray-500", children: [
            day.completed,
            "/",
            day.total
          ] })
        ] }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsxs5(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Insights" }),
      /* @__PURE__ */ jsx27(view_default, { className: "grid grid-cols-2 gap-4", children: insights.map((insight, index) => /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx27(view_default, { className: `w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx27(text_default, { className: "text-2xl", children: insight.icon }) }),
        /* @__PURE__ */ jsx27(text_default, { className: "text-sm text-gray-600 mb-1", children: insight.title }),
        /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800", children: insight.value })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-5 shadow-lg mb-8", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Monthly Overview" }),
      /* @__PURE__ */ jsxs5(view_default, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs5(view_default, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsx27(text_default, { className: "text-gray-700", children: "Tasks Completed" }),
          /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-green-600", children: "127" })
        ] }),
        /* @__PURE__ */ jsxs5(view_default, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsx27(text_default, { className: "text-gray-700", children: "Tasks Created" }),
          /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-blue-600", children: "145" })
        ] }),
        /* @__PURE__ */ jsxs5(view_default, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsx27(text_default, { className: "text-gray-700", children: "Completion Rate" }),
          /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-violet-600", children: "87.6%" })
        ] }),
        /* @__PURE__ */ jsxs5(view_default, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsx27(text_default, { className: "text-gray-700", children: "Active Streak" }),
          /* @__PURE__ */ jsx27(text_default, { className: "text-2xl font-bold text-orange-600", children: "7 days" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5(view_default, { className: "bg-white rounded-2xl p-5 shadow-lg", children: [
      /* @__PURE__ */ jsx27(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Category Breakdown" }),
      [
        { name: "Work", percentage: 35, color: "bg-blue-500" },
        { name: "Personal", percentage: 25, color: "bg-purple-500" },
        { name: "Shopping", percentage: 15, color: "bg-pink-500" },
        { name: "Health", percentage: 15, color: "bg-green-500" },
        { name: "Other", percentage: 10, color: "bg-gray-500" }
      ].map((category, index) => /* @__PURE__ */ jsxs5(view_default, { className: "mb-4", children: [
        /* @__PURE__ */ jsxs5(view_default, { className: "flex flex-row items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx27(text_default, { className: "text-gray-700 font-medium", children: category.name }),
          /* @__PURE__ */ jsxs5(text_default, { className: "text-gray-600", children: [
            category.percentage,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx27(view_default, { className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx27(
          view_default,
          {
            className: `h-full ${category.color} rounded-full`,
            style: { width: `${category.percentage}%` }
          }
        ) })
      ] }, index))
    ] })
  ] }) });
}
var init_statistics = __esm({
  "pages/statistics.jsx"() {
    init_src();
  }
});

// pages/profile.jsx
var profile_exports = {};
__export(profile_exports, {
  default: () => Profile
});
import React31 from "react";
import { jsx as jsx28, jsxs as jsxs6 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx28(scroll_view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: /* @__PURE__ */ jsxs6(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs6(view_default, { className: "items-center mb-8", children: [
      /* @__PURE__ */ jsx28(view_default, { className: "w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx28(text_default, { className: "text-4xl text-white", children: "\u{1F464}" }) }),
      /* @__PURE__ */ jsx28(text_default, { className: "text-2xl font-bold text-gray-800 mb-1", children: "John Doe" }),
      /* @__PURE__ */ jsx28(text_default, { className: "text-gray-600", children: "john.doe@example.com" }),
      /* @__PURE__ */ jsx28(view_default, { className: "mt-4 px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full", children: /* @__PURE__ */ jsx28(text_default, { className: "text-white font-semibold", children: "Pro Member" }) })
    ] }),
    /* @__PURE__ */ jsxs6(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx28(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Your Stats" }),
      /* @__PURE__ */ jsx28(view_default, { className: "grid grid-cols-2 gap-4", children: userStats.map((stat, index) => /* @__PURE__ */ jsxs6(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx28(text_default, { className: "text-3xl mb-2", children: stat.icon }),
        /* @__PURE__ */ jsx28(text_default, { className: "text-2xl font-bold text-violet-600 mb-1", children: stat.value }),
        /* @__PURE__ */ jsx28(text_default, { className: "text-sm text-gray-600", children: stat.label })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs6(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx28(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Achievements" }),
      /* @__PURE__ */ jsx28(view_default, { className: "space-y-4", children: achievements.map((achievement, index) => /* @__PURE__ */ jsx28(
        view_default,
        {
          className: `bg-white rounded-2xl p-4 shadow-lg ${achievement.earned ? "" : "opacity-50"}`,
          children: /* @__PURE__ */ jsxs6(view_default, { className: "flex flex-row items-center gap-4", children: [
            /* @__PURE__ */ jsx28(view_default, { className: `w-14 h-14 rounded-full flex items-center justify-center ${achievement.earned ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-gray-200"}`, children: /* @__PURE__ */ jsx28(text_default, { className: "text-2xl", children: achievement.icon }) }),
            /* @__PURE__ */ jsxs6(view_default, { className: "flex-1", children: [
              /* @__PURE__ */ jsx28(text_default, { className: "text-lg font-bold text-gray-800 mb-1", children: achievement.title }),
              /* @__PURE__ */ jsx28(text_default, { className: "text-sm text-gray-600", children: achievement.description })
            ] }),
            achievement.earned && /* @__PURE__ */ jsx28(view_default, { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx28(text_default, { className: "text-white text-xl", children: "\u2713" }) })
          ] })
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs6(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx28(text_default, { className: "text-xl font-bold text-gray-800 mb-4", children: "Settings" }),
      /* @__PURE__ */ jsx28(view_default, { className: "bg-white rounded-2xl shadow-lg overflow-hidden", children: ["Notifications", "Theme", "Language", "Privacy", "Help & Support", "Logout"].map((item, index) => /* @__PURE__ */ jsxs6(
        pressable_default,
        {
          className: `px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? "border-b border-gray-100" : ""}`,
          children: [
            /* @__PURE__ */ jsx28(text_default, { className: "text-gray-800 font-medium", children: item }),
            /* @__PURE__ */ jsx28(text_default, { className: "text-gray-400", children: "\u203A" })
          ]
        },
        index
      )) })
    ] })
  ] }) });
}
var init_profile = __esm({
  "pages/profile.jsx"() {
    init_src();
  }
});

// components/TaskCard.jsx
import React32 from "react";
import { jsx as jsx29, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx29(
    view_default,
    {
      className: `bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${task.completed ? "opacity-60 border-gray-300" : priorityColors[task.priority]}`,
      children: /* @__PURE__ */ jsxs7(view_default, { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx29(
          pressable_default,
          {
            onPress: onToggle,
            className: `flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent" : "border-gray-300 hover:border-violet-400"}`,
            children: task.completed && /* @__PURE__ */ jsx29("svg", { className: "w-4 h-4 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx29("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) })
          }
        ),
        /* @__PURE__ */ jsxs7(view_default, { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx29(
            text_default,
            {
              className: `text-lg font-semibold mb-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`,
              children: task.title
            }
          ),
          task.description && /* @__PURE__ */ jsx29(text_default, { className: `text-sm mb-3 ${task.completed ? "text-gray-400" : "text-gray-600"}`, children: task.description }),
          /* @__PURE__ */ jsxs7(view_default, { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx29(view_default, { className: `px-3 py-1 rounded-full ${priorityBadgeColors[task.priority]}`, children: /* @__PURE__ */ jsx29(text_default, { className: "text-xs font-medium text-white", children: task.priority.toUpperCase() }) }),
            task.category && /* @__PURE__ */ jsx29(view_default, { className: "px-3 py-1 rounded-full bg-purple-100", children: /* @__PURE__ */ jsx29(text_default, { className: "text-xs font-medium text-purple-700", children: task.category }) }),
            task.dueDate && /* @__PURE__ */ jsxs7(view_default, { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx29("svg", { className: "w-4 h-4 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx29("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx29(text_default, { className: "text-xs text-gray-500", children: new Date(task.dueDate).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx29(
          pressable_default,
          {
            onPress: onDelete,
            className: "flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110",
            children: /* @__PURE__ */ jsx29("svg", { className: "w-5 h-5 text-red-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx29("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
          }
        )
      ] })
    }
  );
}
var init_TaskCard = __esm({
  "components/TaskCard.jsx"() {
    init_src();
  }
});

// components/AddTaskModal.jsx
import React33, { useState } from "react";
import { jsx as jsx30, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx30(modal_default, { visible: true, transparent: true, animationType: "slide", onRequestClose: onClose, children: /* @__PURE__ */ jsx30(view_default, { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs8(view_default, { className: "bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden", children: [
    /* @__PURE__ */ jsx30(view_default, { className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-5 rounded-t-3xl", children: /* @__PURE__ */ jsxs8(view_default, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx30(text_default, { className: "text-2xl font-bold text-white", children: "Add New Task" }),
      /* @__PURE__ */ jsx30(
        pressable_default,
        {
          onPress: onClose,
          className: "w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300",
          children: /* @__PURE__ */ jsx30("svg", { className: "w-5 h-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx30("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx30(scroll_view_default, { className: "p-6", children: /* @__PURE__ */ jsxs8(view_default, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs8(view_default, { children: [
        /* @__PURE__ */ jsx30(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Task Title *" }),
        /* @__PURE__ */ jsx30(
          text_input_default,
          {
            value: formData.title,
            onChangeText: (value) => handleChange("title", value),
            placeholder: "Enter task title...",
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs8(view_default, { children: [
        /* @__PURE__ */ jsx30(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Description" }),
        /* @__PURE__ */ jsx30(
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
      /* @__PURE__ */ jsxs8(view_default, { children: [
        /* @__PURE__ */ jsx30(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Priority" }),
        /* @__PURE__ */ jsx30(view_default, { className: "grid grid-cols-3 gap-3", children: ["low", "medium", "high"].map((priority) => /* @__PURE__ */ jsx30(
          pressable_default,
          {
            onPress: () => handleChange("priority", priority),
            className: `py-3 px-4 rounded-xl font-medium transition-all duration-300 ${formData.priority === priority ? priority === "high" ? "bg-red-500 shadow-lg" : priority === "medium" ? "bg-yellow-500 shadow-lg" : "bg-green-500 shadow-lg" : "bg-gray-100"}`,
            children: /* @__PURE__ */ jsx30(text_default, { className: `text-center ${formData.priority === priority ? "text-white font-medium" : "text-gray-600"}`, children: priority.charAt(0).toUpperCase() + priority.slice(1) })
          },
          priority
        )) })
      ] }),
      /* @__PURE__ */ jsxs8(view_default, { children: [
        /* @__PURE__ */ jsx30(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Category" }),
        /* @__PURE__ */ jsx30(view_default, { className: "relative", children: /* @__PURE__ */ jsxs8(
          "select",
          {
            value: formData.category,
            onChange: (e) => handleChange("category", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300 bg-white",
            children: [
              /* @__PURE__ */ jsx30("option", { value: "", children: "Select category..." }),
              /* @__PURE__ */ jsx30("option", { value: "Work", children: "Work" }),
              /* @__PURE__ */ jsx30("option", { value: "Personal", children: "Personal" }),
              /* @__PURE__ */ jsx30("option", { value: "Shopping", children: "Shopping" }),
              /* @__PURE__ */ jsx30("option", { value: "Health", children: "Health" }),
              /* @__PURE__ */ jsx30("option", { value: "Study", children: "Study" }),
              /* @__PURE__ */ jsx30("option", { value: "Other", children: "Other" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs8(view_default, { children: [
        /* @__PURE__ */ jsx30(text_default, { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Due Date" }),
        /* @__PURE__ */ jsx30(
          "input",
          {
            type: "date",
            value: formData.dueDate,
            onChange: (e) => handleChange("dueDate", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs8(view_default, { className: "flex gap-3 pt-4", children: [
        /* @__PURE__ */ jsx30(
          pressable_default,
          {
            onPress: onClose,
            className: "flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300",
            children: /* @__PURE__ */ jsx30(text_default, { className: "text-gray-700 font-semibold text-center", children: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx30(
          pressable_default,
          {
            onPress: handleSubmit,
            className: "flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300",
            children: /* @__PURE__ */ jsx30(text_default, { className: "text-white font-semibold text-center", children: "Add Task" })
          }
        )
      ] })
    ] }) })
  ] }) }) });
}
var init_AddTaskModal = __esm({
  "components/AddTaskModal.jsx"() {
    init_src();
  }
});

// pages/index.jsx
var pages_exports = {};
__export(pages_exports, {
  default: () => Home
});
import React34, { useState as useState2 } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx as jsx31, jsxs as jsxs9 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx31(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs9(view_default, { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs9(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Task Manager" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-600 text-lg", children: "Organize your day, achieve your goals" })
    ] }),
    /* @__PURE__ */ jsxs9(view_default, { className: "grid grid-cols-3 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx31(text_default, { className: "text-3xl font-bold text-violet-600", children: stats.total }),
        /* @__PURE__ */ jsx31(text_default, { className: "text-sm text-gray-600 mt-1", children: "Total" })
      ] }),
      /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx31(text_default, { className: "text-3xl font-bold text-blue-600", children: stats.active }),
        /* @__PURE__ */ jsx31(text_default, { className: "text-sm text-gray-600 mt-1", children: "Active" })
      ] }),
      /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
        /* @__PURE__ */ jsx31(text_default, { className: "text-3xl font-bold text-green-600", children: stats.completed }),
        /* @__PURE__ */ jsx31(text_default, { className: "text-sm text-gray-600 mt-1", children: "Done" })
      ] })
    ] }),
    /* @__PURE__ */ jsx31(view_default, { className: "flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-md", children: ["all", "active", "completed"].map((f) => /* @__PURE__ */ jsx31(
      pressable_default,
      {
        onPress: () => setFilter(f),
        className: `flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${filter === f ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsx31(text_default, { className: `text-center font-medium ${filter === f ? "text-white" : "text-gray-600"}`, children: f.charAt(0).toUpperCase() + f.slice(1) })
      },
      f
    )) }),
    /* @__PURE__ */ jsx31(view_default, { className: "space-y-4 mb-24", children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-12 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-6xl mb-4", children: "\u{1F4DD}" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-xl font-semibold text-gray-700 mb-2", children: "No tasks yet" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-500", children: filter === "all" ? "Start by adding your first task!" : `No ${filter} tasks found` })
    ] }) : filteredTasks.map((task) => /* @__PURE__ */ jsx31(
      TaskCard,
      {
        task,
        onToggle: () => dispatch(toggleTask(task.id)),
        onDelete: () => dispatch(deleteTask(task.id))
      },
      task.id
    )) }),
    /* @__PURE__ */ jsx31(
      pressable_default,
      {
        onPress: () => setShowModal(true),
        className: "fixed bottom-24 right-8 w-16 h-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40",
        children: /* @__PURE__ */ jsx31(text_default, { className: "text-white text-3xl font-light", children: "+" })
      }
    ),
    showModal && /* @__PURE__ */ jsx31(
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
  return /* @__PURE__ */ jsx31(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs9(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs9(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Categories" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-600 text-lg", children: "Organize tasks by category" })
    ] }),
    /* @__PURE__ */ jsx31(view_default, { className: "grid grid-cols-2 gap-4 mb-24", children: categories.map((category, index) => /* @__PURE__ */ jsxs9(pressable_default, { className: "bg-white rounded-2xl p-5 shadow-lg", children: [
      /* @__PURE__ */ jsx31(view_default, { className: `w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx31(text_default, { className: "text-3xl", children: category.icon }) }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-lg font-bold text-gray-800 mb-1", children: category.name }),
      /* @__PURE__ */ jsxs9(text_default, { className: "text-sm text-gray-600", children: [
        category.count,
        " tasks"
      ] })
    ] }, index)) })
  ] }) });
}
function StatisticsPage() {
  return /* @__PURE__ */ jsx31(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs9(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs9(view_default, { className: "mb-8", children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2", children: "Statistics" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-600 text-lg", children: "Track your productivity" })
    ] }),
    /* @__PURE__ */ jsx31(view_default, { className: "grid grid-cols-2 gap-4 mb-24", children: [
      { title: "Most Productive", value: "Wednesday", icon: "\u{1F4C8}", color: "from-green-500 to-green-600" },
      { title: "Completion Rate", value: "82%", icon: "\u{1F3AF}", color: "from-blue-500 to-blue-600" },
      { title: "Time Saved", value: "12 hours", icon: "\u23F1\uFE0F", color: "from-purple-500 to-purple-600" },
      { title: "Streak Record", value: "14 days", icon: "\u{1F525}", color: "from-orange-500 to-orange-600" }
    ].map((insight, index) => /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
      /* @__PURE__ */ jsx31(view_default, { className: `w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center mb-3`, children: /* @__PURE__ */ jsx31(text_default, { className: "text-2xl", children: insight.icon }) }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-sm text-gray-600 mb-1", children: insight.title }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-xl font-bold text-gray-800", children: insight.value })
    ] }, index)) })
  ] }) });
}
function ProfilePage() {
  return /* @__PURE__ */ jsx31(scroll_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs9(view_default, { className: "px-4 py-8", children: [
    /* @__PURE__ */ jsxs9(view_default, { className: "items-center mb-8", children: [
      /* @__PURE__ */ jsx31(view_default, { className: "w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx31(text_default, { className: "text-4xl text-white", children: "\u{1F464}" }) }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-2xl font-bold text-gray-800 mb-1", children: "John Doe" }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-600", children: "john.doe@example.com" })
    ] }),
    /* @__PURE__ */ jsx31(view_default, { className: "grid grid-cols-2 gap-4 mb-8", children: [
      { label: "Completed", value: "127", icon: "\u2705" },
      { label: "Active", value: "12", icon: "\u{1F4DD}" },
      { label: "Streak", value: "7", icon: "\u{1F525}" },
      { label: "Points", value: "1,250", icon: "\u2B50" }
    ].map((stat, index) => /* @__PURE__ */ jsxs9(view_default, { className: "bg-white rounded-2xl p-4 shadow-lg", children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-3xl mb-2", children: stat.icon }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-2xl font-bold text-violet-600 mb-1", children: stat.value }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-sm text-gray-600", children: stat.label })
    ] }, index)) }),
    /* @__PURE__ */ jsx31(view_default, { className: "bg-white rounded-2xl shadow-lg overflow-hidden mb-24", children: ["Notifications", "Theme", "Language", "Privacy", "Help", "Logout"].map((item, index) => /* @__PURE__ */ jsxs9(pressable_default, { className: `px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? "border-b border-gray-100" : ""}`, children: [
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-800 font-medium", children: item }),
      /* @__PURE__ */ jsx31(text_default, { className: "text-gray-400", children: "\u203A" })
    ] }, index)) })
  ] }) });
}
function Home() {
  const [activeTab, setActiveTab] = useState2("tasks");
  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return /* @__PURE__ */ jsx31(TasksPage, {});
      case "categories":
        return /* @__PURE__ */ jsx31(CategoriesPage, {});
      case "statistics":
        return /* @__PURE__ */ jsx31(StatisticsPage, {});
      case "profile":
        return /* @__PURE__ */ jsx31(ProfilePage, {});
      default:
        return /* @__PURE__ */ jsx31(TasksPage, {});
    }
  };
  const navItems = [
    { id: "tasks", label: "Tasks", icon: "\u{1F4DD}", activeIcon: "\u2705" },
    { id: "categories", label: "Categories", icon: "\u{1F4C1}", activeIcon: "\u{1F4C2}" },
    { id: "statistics", label: "Stats", icon: "\u{1F4CA}", activeIcon: "\u{1F4C8}" },
    { id: "profile", label: "Profile", icon: "\u{1F464}", activeIcon: "\u{1F468}" }
  ];
  return /* @__PURE__ */ jsxs9(view_default, { className: "flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: [
    /* @__PURE__ */ jsx31(view_default, { className: "flex-1", children: renderContent() }),
    /* @__PURE__ */ jsx31(view_default, { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50", children: /* @__PURE__ */ jsx31(view_default, { className: "flex flex-row items-center justify-around px-2 py-3", children: navItems.map((item) => {
      const isActive = activeTab === item.id;
      return /* @__PURE__ */ jsx31(
        pressable_default,
        {
          onPress: () => setActiveTab(item.id),
          className: "flex-1 flex items-center justify-center py-2",
          children: /* @__PURE__ */ jsxs9(view_default, { className: `flex items-center justify-center transition-all duration-300 ${isActive ? "transform scale-110" : ""}`, children: [
            /* @__PURE__ */ jsx31(view_default, { className: `w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isActive ? "bg-gradient-to-r from-violet-600 to-fuchsia-600" : "bg-transparent"}`, children: /* @__PURE__ */ jsx31(text_default, { className: "text-2xl", children: isActive ? item.activeIcon : item.icon }) }),
            /* @__PURE__ */ jsx31(text_default, { className: `text-xs font-medium ${isActive ? "text-violet-600" : "text-gray-600"}`, children: item.label })
          ] })
        },
        item.id
      );
    }) }) })
  ] });
}
var init_pages = __esm({
  "pages/index.jsx"() {
    init_src();
    init_TaskCard();
    init_AddTaskModal();
    init_taskSlice();
  }
});

// pages/_layout.jsx
init_src();
import React35, { useState as useState3, useEffect } from "react";
import { Provider } from "react-redux";

// utils/store.js
init_taskSlice();
import { configureStore } from "@reduxjs/toolkit";
var store = configureStore({
  reducer: {
    tasks: taskSlice_default
  }
});

// components/BottomNav.jsx
init_src();
import React28 from "react";
import { jsx as jsx25, jsxs as jsxs3 } from "react/jsx-runtime";
function BottomNav({ currentPage = "tasks", onNavigate }) {
  const navItems = [
    { id: "tasks", label: "Tasks", icon: "\u{1F4DD}", activeIcon: "\u2705" },
    { id: "categories", label: "Categories", icon: "\u{1F4C1}", activeIcon: "\u{1F4C2}" },
    { id: "statistics", label: "Stats", icon: "\u{1F4CA}", activeIcon: "\u{1F4C8}" },
    { id: "profile", label: "Profile", icon: "\u{1F464}", activeIcon: "\u{1F468}" }
  ];
  return /* @__PURE__ */ jsx25(view_default, { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50", children: /* @__PURE__ */ jsx25(view_default, { className: "flex flex-row items-center justify-around px-2 py-3 pb-safe", children: navItems.map((item, index) => {
    const isActive = currentPage === item.id;
    return /* @__PURE__ */ jsx25(
      pressable_default,
      {
        onPress: () => onNavigate(item.id),
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
import { jsx as jsx32, jsxs as jsxs10 } from "react/jsx-runtime";
function Layout({ children, path }) {
  const [currentPage, setCurrentPage] = useState3("tasks");
  const [pageContent, setPageContent] = useState3(null);
  useEffect(() => {
    const loadPage = async () => {
      try {
        let PageComponent;
        switch (currentPage) {
          case "categories":
            PageComponent = (await Promise.resolve().then(() => (init_categories(), categories_exports))).default;
            break;
          case "statistics":
            PageComponent = (await Promise.resolve().then(() => (init_statistics(), statistics_exports))).default;
            break;
          case "profile":
            PageComponent = (await Promise.resolve().then(() => (init_profile(), profile_exports))).default;
            break;
          case "tasks":
          default:
            PageComponent = (await Promise.resolve().then(() => (init_pages(), pages_exports))).default;
            break;
        }
        setPageContent(/* @__PURE__ */ jsx32(PageComponent, {}));
      } catch (error) {
        console.error("Error loading page:", error);
        setPageContent(children);
      }
    };
    loadPage();
  }, [currentPage, children]);
  return /* @__PURE__ */ jsx32(Provider, { store, children: /* @__PURE__ */ jsx32(safe_area_view_default, { className: "flex-1", children: /* @__PURE__ */ jsxs10(view_default, { className: "min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50", children: [
    /* @__PURE__ */ jsx32(view_default, { className: "bg-white shadow-md sticky top-0 z-40 backdrop-blur-lg bg-opacity-90", children: /* @__PURE__ */ jsx32(view_default, { className: "max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxs10(view_default, { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs10(view_default, { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx32(view_default, { className: "w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx32("svg", { className: "w-6 h-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx32("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
        /* @__PURE__ */ jsx32(text_default, { className: "text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent", children: "TaskFlow" })
      ] }),
      /* @__PURE__ */ jsx32(pressable_default, { className: "w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300", children: /* @__PURE__ */ jsx32(text_default, { className: "text-xl", children: "\u{1F514}" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx32(view_default, { className: "pb-24", children: pageContent || children }),
    /* @__PURE__ */ jsx32(BottomNav, { currentPage, onNavigate: setCurrentPage })
  ] }) }) });
}
export {
  Layout as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9yb3V0aW5nL21hdGNoZXIubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcm91dGluZy9yb3V0ZXMubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvcGxhdGZvcm0ubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvdW5pdmVyc2FsL3Jlc29sdmUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL3N0eWxlLXNoZWV0Lm1qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaW1hZ2UuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9saW5rLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3RleHQtaW5wdXQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9idXR0b24uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9hY3Rpdml0eS1pbmRpY2F0b3IuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zd2l0Y2guanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9mbGF0LWxpc3QuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtb3BhY2l0eS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2ltYWdlLWJhY2tncm91bmQuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9tb2RhbC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NhZmUtYXJlYS12aWV3LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy90b3VjaGFibGUtaGlnaGxpZ2h0LmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvdG91Y2hhYmxlLXdpdGhvdXQtZmVlZGJhY2suanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9zY3JlZW4uanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jb250YWluZXIuanN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9pbmRqcy9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvZ3JpZC5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9jb21wb25lbnRzL3N0YWNrLmpzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2NvbXBvbmVudHMvaWNvbi5qc3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL2FsZXJ0Lm1qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvZGltZW5zaW9ucy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9hcGlzL3BpeGVsLXJhdGlvLm1qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaW5kanMvc3JjL2FwaXMvbGlua2luZy5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2luZGpzL3NyYy9pbmRleC5tanMiLCAiLi4vLi4vdXRpbHMvdGFza1NsaWNlLmpzIiwgIi4uLy4uL3BhZ2VzL2NhdGVnb3JpZXMuanN4IiwgIi4uLy4uL3BhZ2VzL3N0YXRpc3RpY3MuanN4IiwgIi4uLy4uL3BhZ2VzL3Byb2ZpbGUuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvVGFza0NhcmQuanN4IiwgIi4uLy4uL2NvbXBvbmVudHMvQWRkVGFza01vZGFsLmpzeCIsICIuLi8uLi9wYWdlcy9pbmRleC5qc3giLCAiLi4vLi4vcGFnZXMvX2xheW91dC5qc3giLCAiLi4vLi4vdXRpbHMvc3RvcmUuanMiLCAiLi4vLi4vY29tcG9uZW50cy9Cb3R0b21OYXYuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZnVuY3Rpb24gbWF0Y2hEeW5hbWljKHBhdGhuYW1lLCByb3V0ZXMpIHtcclxuICAgIGZvciAoY29uc3QgciBvZiByb3V0ZXMpIHtcclxuICAgICAgICBjb25zdCBtID0gci5wYXR0ZXJuLmV4ZWMocGF0aG5hbWUpO1xyXG4gICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICByLm5hbWVzLmZvckVhY2goKG4sIGkpID0+IChwYXJhbXNbbl0gPSBkZWNvZGVVUklDb21wb25lbnQobVtpICsgMV0pKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHJvdXRlOiByLCBwYXJhbXMgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRHluYW1pY1JvdXRlKHJvdXRlUGF0aCkge1xyXG4gICAgcmV0dXJuIC9cXFtbXi9dK1xcXS8udGVzdChyb3V0ZVBhdGgpO1xyXG59XHJcbiIsICJpbXBvcnQgZnMgZnJvbSBcImZzL3Byb21pc2VzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5jb25zdCBQQUdFX0VYVFMgPSBbXCIuanN4XCIsIFwiLmpzXCIsIFwiLm1qc1wiLCBcIi50c3hcIiwgXCIudHNcIl07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxlVG9Sb3V0ZShwYWdlc0RpciwgZmlsZSkge1xuICBjb25zdCByZWwgPSBwYXRoLnJlbGF0aXZlKHBhZ2VzRGlyLCBmaWxlKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcbiAgLy8gc3RyaXAgZXh0ZW5zaW9ucyBhbmQgcm91dGUgZ3JvdXBzIGxpa2UgKG1hcmtldGluZylcbiAgY29uc3Qgbm9FeHQgPSByZWxcbiAgICAucmVwbGFjZSgvXFwuKGpzeHxqc3xtanN8dHN4fHRzKSQvaSwgXCJcIilcbiAgICAuc3BsaXQoXCIvXCIpXG4gICAgLmZpbHRlcigocykgPT4gIS9eXFwoLitcXCkkLy50ZXN0KHMpKVxuICAgIC5qb2luKFwiL1wiKTtcbiAgaWYgKG5vRXh0LnRvTG93ZXJDYXNlKCkgPT09IFwiaW5kZXhcIikgcmV0dXJuIFwiL1wiO1xuICBpZiAobm9FeHQuZW5kc1dpdGgoXCIvaW5kZXhcIikpIHJldHVybiBcIi9cIiArIG5vRXh0LnNsaWNlKDAsIC1cIi9pbmRleFwiLmxlbmd0aCk7XG4gIHJldHVybiBcIi9cIiArIG5vRXh0O1xufVxuXG5hc3luYyBmdW5jdGlvbiB3YWxrKGRpcikge1xuICBjb25zdCBvdXQgPSBbXTtcbiAgY29uc3QgZW50cmllcyA9IGF3YWl0IGZzLnJlYWRkaXIoZGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XG4gIGZvciAoY29uc3QgZSBvZiBlbnRyaWVzKSB7XG4gICAgY29uc3QgZnVsbCA9IHBhdGguam9pbihkaXIsIGUubmFtZSk7XG4gICAgaWYgKGUuaXNEaXJlY3RvcnkoKSkgb3V0LnB1c2goLi4uKGF3YWl0IHdhbGsoZnVsbCkpKTtcbiAgICBlbHNlIG91dC5wdXNoKGZ1bGwpO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHRvUmVnZXgocm91dGVQYXRoKSB7XG4gIC8vIENvbnZlcnQgL2Jsb2cvW3NsdWddL1tpZF0gdG8gcmVnZXggYW5kIGV4dHJhY3QgcGFyYW0gbmFtZXNcbiAgY29uc3QgcGFydHMgPSByb3V0ZVBhdGguc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgY29uc3QgcmUgPSBwYXJ0c1xuICAgIC5tYXAoKHApID0+IHtcbiAgICAgIGNvbnN0IG0gPSBwLm1hdGNoKC9eXFxbKC4rKVxcXSQvKTtcbiAgICAgIGlmIChtKSB7XG4gICAgICAgIG5hbWVzLnB1c2gobVsxXSk7XG4gICAgICAgIHJldHVybiBcIihbXi9dKylcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAocikgPT4gYFxcXFwke3J9YCk7XG4gICAgfSlcbiAgICAuam9pbihcIi9cIik7XG4gIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKGBeLyR7cmV9JGApO1xuICByZXR1cm4geyBwYXR0ZXJuLCBuYW1lcyB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzY292ZXJSb3V0ZXMocm9vdCkge1xuICBjb25zdCBwYWdlc0RpciA9IHBhdGguam9pbihyb290LCBcInBhZ2VzXCIpO1xuICB0cnkge1xuICAgIGF3YWl0IGZzLmFjY2VzcyhwYWdlc0Rpcik7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB7IHBhZ2VzOiBbXSwgYXBpOiBbXSB9O1xuICB9XG4gIGNvbnN0IGZpbGVzID0gKGF3YWl0IHdhbGsocGFnZXNEaXIpKVxuICAgIC5maWx0ZXIoKGYpID0+IFBBR0VfRVhUUy5pbmNsdWRlcyhwYXRoLmV4dG5hbWUoZikpKVxuICAgIC5maWx0ZXIoKGYpID0+ICFwYXRoLmJhc2VuYW1lKGYpLmluY2x1ZGVzKFwiX19pbmRqcy5cIikpO1xuICBjb25zdCBwYWdlRmlsZXMgPSBmaWxlcy5maWx0ZXIoXG4gICAgKGYpID0+ICFmaWxlVG9Sb3V0ZShwYWdlc0RpciwgZikuc3RhcnRzV2l0aChcIi9hcGkvXCIpLFxuICApO1xuICBjb25zdCBhcGlGaWxlcyA9IGZpbGVzLmZpbHRlcigoZikgPT5cbiAgICBmaWxlVG9Sb3V0ZShwYWdlc0RpciwgZikuc3RhcnRzV2l0aChcIi9hcGkvXCIpLFxuICApO1xuXG4gIGNvbnN0IHBhZ2VzID0gcGFnZUZpbGVzLm1hcCgoZikgPT4ge1xuICAgIGNvbnN0IHJvdXRlID0gZmlsZVRvUm91dGUocGFnZXNEaXIsIGYpO1xuICAgIGNvbnN0IHsgcGF0dGVybiwgbmFtZXMgfSA9IHRvUmVnZXgocm91dGUpO1xuICAgIHJldHVybiB7IHR5cGU6IFwicGFnZVwiLCByb3V0ZSwgZmlsZTogZiwgcGF0dGVybiwgbmFtZXMgfTtcbiAgfSk7XG5cbiAgY29uc3QgYXBpID0gYXBpRmlsZXMubWFwKChmKSA9PiB7XG4gICAgY29uc3Qgcm91dGUgPSBmaWxlVG9Sb3V0ZShwYWdlc0RpciwgZik7XG4gICAgY29uc3QgeyBwYXR0ZXJuLCBuYW1lcyB9ID0gdG9SZWdleChyb3V0ZSk7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJhcGlcIiwgcm91dGUsIGZpbGU6IGYsIHBhdHRlcm4sIG5hbWVzIH07XG4gIH0pO1xuXG4gIHJldHVybiB7IHBhZ2VzLCBhcGkgfTtcbn1cblxuZXhwb3J0ICogZnJvbSBcIi4vbWF0Y2hlci5tanNcIjtcbiIsICIvKipcbiAqIFBsYXRmb3JtIGRldGVjdGlvbiB1dGlsaXRpZXMgZm9yIElOREpTXG4gKlxuICogVXNhZ2U6XG4gKiBpbXBvcnQgeyBpc1dlYiwgaXNEZXNrdG9wLCBpc01vYmlsZSwgaXNBbmRyb2lkLCBpc0lPUywgcGxhdGZvcm0gfSBmcm9tICdpbmRqcyc7XG4gKlxuICogaWYgKGlzTW9iaWxlKSB7IC4uLiB9XG4gKi9cblxuLy8gQ2hlY2sgaWYgcnVubmluZyBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnRcbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG5cbi8vIEVsZWN0cm9uIGRldGVjdGlvbiAocmVuZGVyZXIgcHJvY2VzcylcbmV4cG9ydCBjb25zdCBpc0Rlc2t0b3AgPVxuICBpc0Jyb3dzZXIgJiZcbiAgKHdpbmRvdy5wcm9jZXNzPy50eXBlID09PSBcInJlbmRlcmVyXCIgfHxcbiAgICAhIXdpbmRvdy5lbGVjdHJvbiB8fFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJFbGVjdHJvblwiKSk7XG5cbi8vIENhcGFjaXRvciBkZXRlY3Rpb25cbmV4cG9ydCBjb25zdCBpc01vYmlsZSA9XG4gIGlzQnJvd3NlciAmJlxuICAoISF3aW5kb3cuQ2FwYWNpdG9yIHx8XG4gICAgISF3aW5kb3cuYW5kcm9pZEJyaWRnZSB8fFxuICAgICEhd2luZG93LndlYmtpdD8ubWVzc2FnZUhhbmRsZXJzPy5icmlkZ2UgfHxcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiQ2FwYWNpdG9yXCIpKTtcblxuLy8gU3BlY2lmaWMgbW9iaWxlIHBsYXRmb3Jtc1xuZXhwb3J0IGNvbnN0IGlzQW5kcm9pZCA9IGlzTW9iaWxlICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbmV4cG9ydCBjb25zdCBpc0lPUyA9IGlzTW9iaWxlICYmIC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLy8gV2ViIGZhbGxiYWNrIChpZiBub3QgZGVza3RvcCBvciBtb2JpbGUgYXBwKVxuZXhwb3J0IGNvbnN0IGlzV2ViID0gIWlzRGVza3RvcCAmJiAhaXNNb2JpbGU7XG5cbi8vIEdldCBjdXJyZW50IHBsYXRmb3JtIG5hbWVcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybSA9ICgoKSA9PiB7XG4gIGlmIChpc0Rlc2t0b3ApIHJldHVybiBcImRlc2t0b3BcIjtcbiAgaWYgKGlzQW5kcm9pZCkgcmV0dXJuIFwiYW5kcm9pZFwiO1xuICBpZiAoaXNJT1MpIHJldHVybiBcImlvc1wiO1xuICBpZiAoaXNNb2JpbGUpIHJldHVybiBcIm1vYmlsZVwiOyAvLyBmYWxsYmFja1xuICByZXR1cm4gXCJ3ZWJcIjtcbn0pKCk7XG5cbi8vIFJlYWN0IE5hdGl2ZSBjb21wYXRpYmxlIEFQSVxuZXhwb3J0IGNvbnN0IE9TID0gcGxhdGZvcm07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSAob2JqKSA9PiB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoT1MpKSByZXR1cm4gb2JqW09TXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcIm5hdGl2ZVwiKSAmJiBpc01vYmlsZSkgcmV0dXJuIG9ialtcIm5hdGl2ZVwiXTtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRcIikpIHJldHVybiBvYmpbXCJkZWZhdWx0XCJdO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1dlYixcbiAgaXNEZXNrdG9wLFxuICBpc01vYmlsZSxcbiAgaXNBbmRyb2lkLFxuICBpc0lPUyxcbiAgcGxhdGZvcm0sXG4gIE9TLFxuICBzZWxlY3QsXG59O1xuIiwgImZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IHBsYXRmb3JtID0gdHlwZW9mIFBMQVRGT1JNICE9PSBcInVuZGVmaW5lZFwiID8gUExBVEZPUk0gOiBcIndlYlwiO1xuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3ZWJcIikge1xuICAgIGNvbnN0IHdlYk1hcCA9IHtcbiAgICAgIHZpZXc6IFwiZGl2XCIsXG4gICAgICB0ZXh0OiBcInNwYW5cIixcbiAgICAgIGltYWdlOiBcImltZ1wiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcImRpdlwiLCAvLyBtYXAgaW1hZ2UtYmFja2dyb3VuZCB0byBkaXYgd2l0aCBzdHlsZVxuICAgICAgc2Nyb2xsdmlldzogXCJkaXZcIixcbiAgICAgIGZsYXRsaXN0OiBcImRpdlwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiZGl2XCIsXG4gICAgICBrZXlib2FyZGF2b2lkaW5ndmlldzogXCJkaXZcIixcbiAgICAgIHNhZmVhcmVhdmlldzogXCJkaXZcIixcbiAgICAgIHByZXNzYWJsZTogXCJidXR0b25cIixcbiAgICAgIHRvdWNoYWJsZW9wYWNpdHk6IFwiYnV0dG9uXCIsXG4gICAgICB0b3VjaGFibGVoaWdobGlnaHQ6IFwiYnV0dG9uXCIsXG4gICAgICBzd2l0Y2g6IFwiaW5wdXRcIiwgLy8gdHlwZT0nY2hlY2tib3gnXG4gICAgICB0ZXh0YXJlYTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgYnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgbW9kYWw6IFwiZGl2XCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJkaXZcIixcbiAgICAgIHJlZnJlc2hjb250cm9sOiBcImRpdlwiLFxuICAgIH07XG4gICAgcmV0dXJuIHdlYk1hcFt0eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIlwiKV0gfHwgXCJkaXZcIjtcbiAgfVxuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJtb2JpbGVcIikge1xuICAgIC8vIEluIFJlYWN0IE5hdGl2ZSwgY29tcG9uZW50cyBhcmUgQ2FtZWxDYXNlXG4gICAgLy8gV2UgbmVlZCB0byBtYXAgZ2VuZXJpYyBuYW1lcyB0byBSTiBuYW1lc1xuICAgIGNvbnN0IG1vYmlsZU1hcCA9IHtcbiAgICAgIHZpZXc6IFwiVmlld1wiLFxuICAgICAgdGV4dDogXCJUZXh0XCIsXG4gICAgICBpbWFnZTogXCJJbWFnZVwiLFxuICAgICAgaW1hZ2ViYWNrZ3JvdW5kOiBcIkltYWdlQmFja2dyb3VuZFwiLFxuICAgICAgc2Nyb2xsdmlldzogXCJTY3JvbGxWaWV3XCIsXG4gICAgICBmbGF0bGlzdDogXCJGbGF0TGlzdFwiLFxuICAgICAgc2VjdGlvbmxpc3Q6IFwiU2VjdGlvbkxpc3RcIixcbiAgICAgIGtleWJvYXJkYXZvaWRpbmd2aWV3OiBcIktleWJvYXJkQXZvaWRpbmdWaWV3XCIsXG4gICAgICBzYWZlYXJlYXZpZXc6IFwiU2FmZUFyZWFWaWV3XCIsXG4gICAgICBwcmVzc2FibGU6IFwiUHJlc3NhYmxlXCIsXG4gICAgICB0b3VjaGFibGVvcGFjaXR5OiBcIlRvdWNoYWJsZU9wYWNpdHlcIixcbiAgICAgIHRvdWNoYWJsZWhpZ2hsaWdodDogXCJUb3VjaGFibGVIaWdobGlnaHRcIixcbiAgICAgIHN3aXRjaDogXCJTd2l0Y2hcIixcbiAgICAgIG1vZGFsOiBcIk1vZGFsXCIsXG4gICAgICBhY3Rpdml0eWluZGljYXRvcjogXCJBY3Rpdml0eUluZGljYXRvclwiLFxuICAgICAgcmVmcmVzaGNvbnRyb2w6IFwiUmVmcmVzaENvbnRyb2xcIixcbiAgICAgIGJ1dHRvbjogXCJCdXR0b25cIixcbiAgICB9O1xuICAgIGNvbnN0IHJuTmFtZSA9XG4gICAgICBtb2JpbGVNYXBbdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJcIildIHx8IGNhcGl0YWxpemUodHlwZSk7XG5cbiAgICAvLyBTYWZldHkgY2hlY2sgZm9yIFJlYWN0IE5hdGl2ZSBlbnZpcm9ubWVudFxuICAgIC8vIHJlYWN0LW5hdGl2ZS13ZWIgbWlnaHQgYmUgYWxpYXNlZCwgb3Igd2UgbWlnaHQgYmUgaW4gYSByZWFsIFJOIGVudmlyb25tZW50XG4gICAgdHJ5IHtcbiAgICAgIC8vIFVzaW5nIGdsb2JhbCBjaGVjayBvciBzYWZlIHJlcXVpcmVcbiAgICAgIGlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcInJlYWN0LW5hdGl2ZVwiKVtybk5hbWVdO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB3aW5kb3cuUmVhY3QgJiZcbiAgICAgICAgd2luZG93LlJlYWN0Lk5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuUmVhY3QuTmF0aXZlW3JuTmFtZV07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdCBOYXRpdmUgY29tcG9uZW50ICR7cm5OYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gVmlldyBvciBkaXYgZGVwZW5kaW5nIG9uIGNvbnRleHQsIGJ1dCBWaWV3IGlzIHNhZmUgZW5vdWdoIGZvciBsb2dpY2FsIHJldHVybiBpZiBtb2NrZWRcbiAgICByZXR1cm4gXCJWaWV3XCI7XG4gIH1cblxuICByZXR1cm4gXCJkaXZcIjtcbn1cbiIsICIvLyBNb2NrIFN0eWxlU2hlZXQgZm9yIGNvbXBhdGliaWxpdHkuXG4vLyBJbiBJTkRKUyB3ZWIsIHdlIHVzdWFsbHkgdXNlIHN0YW5kYXJkIHN0eWxlIG9iamVjdHMgb3IgQ1NTLlxuLy8gVGhpcyBhbGxvd3MgU3R5bGVTaGVldC5jcmVhdGUoe30pIHRvIHJldHVybiB0aGUgb2JqZWN0cyBhcy1pcy5cblxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXQgPSB7XG4gIGNyZWF0ZTogKHN0eWxlcykgPT4gc3R5bGVzLFxuICBmbGF0dGVuOiAoc3R5bGVzKSA9PiB7XG4gICAgaWYgKCFzdHlsZXMpIHJldHVybiB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICByZXR1cm4gc3R5bGVzXG4gICAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IChpdGVtID8geyAuLi5hY2MsIC4uLml0ZW0gfSA6IGFjYyksIHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgaGFpcmxpbmVXaWR0aDogMSxcbiAgYWJzb2x1dGVGaWxsOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gIH0sXG4gIGFic29sdXRlRmlsbE9iamVjdDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMCxcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVTaGVldDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZSA9IGZvcndhcmRSZWYoKHsgc3R5bGUsIHNvdXJjZSwgc3JjLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlXCIpO1xuXG4gIC8vIFJlYWN0IE5hdGl2ZSB1c2VzICdzb3VyY2UnLCBXZWIgdXNlcyAnc3JjJy5cbiAgLy8gV2Ugc3VwcG9ydCBib3RoIHByb3BzIGZvciB1bml2ZXJzYWwgdXNhZ2UuXG4gIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICAuLi5yZXN0LFxuICAgIHNyYzogaW1hZ2VTb3VyY2UsXG4gICAgcmVmLFxuICB9O1xuXG4gIGlmIChDb21wb25lbnQgIT09IFwiaW1nXCIgJiYgQ29tcG9uZW50ICE9PSBcImltYWdlXCIpIHtcbiAgICAvLyBJZiBpdCByZWZlcnMgdG8gUmVhY3QgTmF0aXZlIEltYWdlLCBpdCBleHBlY3RzICdzb3VyY2UnXG4gICAgcHJvcHMuc291cmNlID0gc291cmNlIHx8IHsgdXJpOiBzcmMgfTtcbiAgICBkZWxldGUgcHJvcHMuc3JjO1xuICB9XG5cbiAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuXG4gIHJldHVybiA8Q29tcG9uZW50IHN0eWxlPXtmbGF0U3R5bGV9IHsuLi5wcm9wc30gLz47XG59KTtcblxuSW1hZ2UuZGlzcGxheU5hbWUgPSBcIkltYWdlXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8vIElOREpTIExpbmsgY29tcG9uZW50IC0gbGlnaHR3ZWlnaHQgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiBoZWxwZXJcbi8vIFBlcmZvcm1zIFNQQS1saWtlIG5hdmlnYXRpb24gZm9yIHNhbWUtb3JpZ2luIGludGVybmFsIGxpbmtzLlxuLy8gUHJvcHM6IGhyZWYsIHByZWZldGNoLCByZXBsYWNlLCBzY3JvbGwgKGRlZmF1bHQgdHJ1ZSksIG9uQ2xpY2ssIHRhcmdldCwgcmVsLCBjbGFzc05hbWUsIHN0eWxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIHByZWZldGNoID0gZmFsc2UsXG4gIHJlcGxhY2UgPSBmYWxzZSxcbiAgc2Nyb2xsID0gdHJ1ZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgdGFyZ2V0LFxuICByZWwsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgLy8gQmFzaWMgcHJlZmV0Y2g6IGhpbnQgdGhlIGJyb3dzZXIgdmlhIDxsaW5rIHJlbD1cInByZWZldGNoXCI+XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmVmZXRjaCB8fCAhaHJlZikgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgICBsLnJlbCA9IFwicHJlZmV0Y2hcIjtcbiAgICAgIGwuaHJlZiA9IGhyZWY7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGwpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGwpO1xuICAgICAgICB9IGNhdGNoIHt9XG4gICAgICB9O1xuICAgIH0gY2F0Y2gge31cbiAgfSwgW2hyZWYsIHByZWZldGNoXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSBvbkNsaWNrKGUpO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAvLyBPbmx5IGludGVyY2VwdCBzaW1wbGUgbGVmdC1jbGlja3Mgd2l0aG91dCBtb2RpZmllciBrZXlzXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAoIWhyZWYpIHJldHVybjtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gXCJfc2VsZlwiKSByZXR1cm47XG4gICAgbGV0IHVybDtcbiAgICB0cnkge1xuICAgICAgdXJsID0gbmV3IFVSTChocmVmLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEludmFsaWQgVVJMLCBsZXQgYnJvd3NlciBoYW5kbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU2tpcCBub24taHR0cChzKSBwcm90b2NvbHMgYW5kIHNwZWNpYWwgc2NoZW1lc1xuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmIChwcm90byAmJiBwcm90byAhPT0gXCJodHRwOlwiICYmIHByb3RvICE9PSBcImh0dHBzOlwiKSByZXR1cm47XG4gICAgLy8gRXh0ZXJuYWxcbiAgICBpZiAodXJsLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuO1xuICAgIC8vIFJlc3BlY3QgZG93bmxvYWQgbGlua3NcbiAgICBpZiAocmVzdC5kb3dubG9hZCkgcmV0dXJuO1xuICAgIC8vIEhhc2gtb25seSBuYXZpZ2F0aW9uIG9wdGltaXphdGlvblxuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIGNvbnN0IG5leHQgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoICsgdXJsLmhhc2g7XG4gICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh1cmwuaGFzaC5zbGljZSgxKSk7XG4gICAgICAgICAgaWYgKGVsKSBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gRG8gcHVzaC9yZXBsYWNlIHN0YXRlXG4gICAgaWYgKHJlcGxhY2UpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgXCJcIiwgbmV4dCk7XG4gICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIG5leHQpO1xuICAgIC8vIEVtaXQgYSBjdXN0b20gbmF2aWdhdGlvbiBldmVudCBzbyB0aGUgYXBwIGNhbiBsb2FkIHRoZSB0YXJnZXQgbW9kdWxlXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJpbmQ6bmF2aWdhdGVcIiwgeyBkZXRhaWw6IHsgaHJlZjogbmV4dCB9IH0pLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHt9XG4gICAgLy8gU2Nyb2xsIGJlaGF2aW9yXG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgaWYgKHVybC5oYXNoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsLmhhc2guc2xpY2UoMSkpO1xuICAgICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWxGaW5hbCA9XG4gICAgdGFyZ2V0ID09PSBcIl9ibGFua1wiXG4gICAgICA/IFtyZWwsIFwibm9vcGVuZXJcIiwgXCJub3JlZmVycmVyXCJdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKVxuICAgICAgOiByZWw7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiYVwiLFxuICAgIHtcbiAgICAgIGhyZWYsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIHRhcmdldCxcbiAgICAgIHJlbDogcmVsRmluYWwsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVDbGljayxcbiAgICAgIC4uLnJlc3QsXG4gICAgfSxcbiAgICBjaGlsZHJlbixcbiAgKTtcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBWaWV3ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ2aWV3XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVmlldy5kaXNwbGF5TmFtZSA9IFwiVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBUZXh0ID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIGNsYXNzTmFtZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0ZXh0XCIpO1xuXG4gIGNvbnN0IGZsYXRTdHlsZSA9IFN0eWxlU2hlZXQuZmxhdHRlbihbc3R5bGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtmbGF0U3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuVGV4dC5kaXNwbGF5TmFtZSA9IFwiVGV4dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTY3JvbGxWaWV3ID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3R5bGUsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gZmFsc2UsXG4gICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3IgPSB0cnVlLFxuICAgICAgc2hvd3NWZXJ0aWNhbFNjcm9sbEluZGljYXRvciA9IHRydWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwic2Nyb2xsdmlld1wiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgICAgICAgb3ZlcmZsb3dYOiBob3Jpem9udGFsID8gXCJhdXRvXCIgOiBcImhpZGRlblwiLFxuICAgICAgICBvdmVyZmxvd1k6IGhvcml6b250YWwgPyBcImhpZGRlblwiIDogXCJhdXRvXCIsXG4gICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgICAgIHNjcm9sbGJhcldpZHRoOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgbXNPdmVyZmxvd1N0eWxlOiAoXG4gICAgICAgICAgaG9yaXpvbnRhbFxuICAgICAgICAgICAgPyAhc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgICAgICA6ICFzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yXG4gICAgICAgIClcbiAgICAgICAgICA/IFwibm9uZVwiXG4gICAgICAgICAgOiBcImF1dG9cIixcbiAgICAgICAgLi4uU3R5bGVTaGVldC5mbGF0dGVuKHN0eWxlKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSBTdHlsZVNoZWV0LmZsYXR0ZW4oW2NvbnRlbnRDb250YWluZXJTdHlsZV0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e2NvbnRhaW5lclN0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gey4uLnJlc3R9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbnRlbnRTdHlsZX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgIGhvcml6b250YWw9e2hvcml6b250YWx9XG4gICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17c2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yPXtzaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29tcG9uZW50PlxuICAgICk7XG4gIH0sXG4pO1xuXG5TY3JvbGxWaWV3LmRpc3BsYXlOYW1lID0gXCJTY3JvbGxWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTY3JvbGxWaWV3O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFRleHRJbnB1dCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIG9uQ2hhbmdlVGV4dCxcbiAgICAgIG9uRm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlY3VyZVRleHRFbnRyeSA9IGZhbHNlLFxuICAgICAgbXVsdGlsaW5lID0gZmFsc2UsXG4gICAgICBudW1iZXJPZkxpbmVzID0gNCxcbiAgICAgIGVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgIHN0eWxlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKG9uQ2hhbmdlVGV4dCkgb25DaGFuZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbW9uU3R5bGUgPSB7XG4gICAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgfTtcblxuICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlYWRPbmx5PXshZWRpdGFibGV9XG4gICAgICAgICAgcm93cz17bnVtYmVyT2ZMaW5lc31cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdHlsZSwgcmVzaXplOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICB0eXBlPXtzZWN1cmVUZXh0RW50cnkgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIn1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgcmVhZE9ubHk9eyFlZGl0YWJsZX1cbiAgICAgICAgc3R5bGU9e2NvbW1vblN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5UZXh0SW5wdXQuZGlzcGxheU5hbWUgPSBcIlRleHRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgVGV4dElucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IEJ1dHRvbiA9IGZvcndhcmRSZWYoXG4gICh7IHRpdGxlLCBvblByZXNzLCBjb2xvciwgZGlzYWJsZWQsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIG9uQ2xpY2s9e29uUHJlc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJCdXR0b25cIjtcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBBY3Rpdml0eUluZGljYXRvciA9IGZvcndhcmRSZWYoXG4gICh7IHNpemUgPSBcInNtYWxsXCIsIGNvbG9yID0gXCIjOTk5XCIsIHN0eWxlLCAuLi5yZXN0IH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwiYWN0aXZpdHlpbmRpY2F0b3JcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGNvbnN0IHNwaW5uZXJTdHlsZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uOiBcImluZGpzLXNwaW4gMXMgbGluZWFyIGluZmluaXRlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBJbmplY3Qga2V5ZnJhbWVzIGlmIG5vdCBwcmVzZW50XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRqcy1zcGluLXN0eWxlXCIpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGVFbC5pZCA9IFwiaW5kanMtc3Bpbi1zdHlsZVwiO1xuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGBAa2V5ZnJhbWVzIGluZGpzLXNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gPGRpdiByZWY9e3JlZn0gc3R5bGU9e3NwaW5uZXJTdHlsZX0gey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50IHJlZj17cmVmfSBzaXplPXtzaXplfSBjb2xvcj17Y29sb3J9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9IC8+XG4gICAgKTtcbiAgfSxcbik7XG5cbkFjdGl2aXR5SW5kaWNhdG9yLmRpc3BsYXlOYW1lID0gXCJBY3Rpdml0eUluZGljYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgQWN0aXZpdHlJbmRpY2F0b3I7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU3dpdGNoID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHsgdmFsdWUsIG9uVmFsdWVDaGFuZ2UsIGRpc2FibGVkLCB0cmFja0NvbG9yLCB0aHVtYkNvbG9yLCBzdHlsZSwgLi4ucmVzdCB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzd2l0Y2hcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImlucHV0XCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25WYWx1ZUNoYW5nZSAmJiBvblZhbHVlQ2hhbmdlKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pfVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBvblZhbHVlQ2hhbmdlPXtvblZhbHVlQ2hhbmdlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHRyYWNrQ29sb3I9e3RyYWNrQ29sb3J9XG4gICAgICAgIHRodW1iQ29sb3I9e3RodW1iQ29sb3J9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5Td2l0Y2guZGlzcGxheU5hbWUgPSBcIlN3aXRjaFwiO1xuZXhwb3J0IGRlZmF1bHQgU3dpdGNoO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFNjcm9sbFZpZXcgZnJvbSBcIi4vc2Nyb2xsLXZpZXcuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgRmxhdExpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgZGF0YSxcbiAgICAgIHJlbmRlckl0ZW0sXG4gICAgICBrZXlFeHRyYWN0b3IsXG4gICAgICBMaXN0SGVhZGVyQ29tcG9uZW50LFxuICAgICAgTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICAgIExpc3RFbXB0eUNvbXBvbmVudCxcbiAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZSxcbiAgICAgIG51bUNvbHVtbnMgPSAxLFxuICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlLFxuICAgICAgLi4ucmVzdFxuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImZsYXRsaXN0XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgICAvLyBXZWIgZmFsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAoTGlzdEVtcHR5Q29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgRW1wdHkgPSBSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0RW1wdHlDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgTGlzdEVtcHR5Q29tcG9uZW50XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMaXN0RW1wdHlDb21wb25lbnQgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2Nyb2xsVmlld1xuICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0SGVhZGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RIZWFkZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge0VtcHR5fVxuICAgICAgICAgICAgICB7TGlzdEZvb3RlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gZGF0YSB8fCBbXTtcbiAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpbmRleClcbiAgICAgICAgICAgIDogaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17a2V5fT5cbiAgICAgICAgICAgICAge3JlbmRlckl0ZW0oeyBpdGVtLCBpbmRleCB9KX1cbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmbGF0Q29udGVudFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtjb250ZW50Q29udGFpbmVyU3R5bGVdKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFNjcm9sbFZpZXdcbiAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2ZsYXRDb250ZW50U3R5bGV9XG4gICAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtMaXN0SGVhZGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEhlYWRlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RIZWFkZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICB7cmVuZGVyTGlzdCgpfVxuICAgICAgICAgIHtMaXN0Rm9vdGVyQ29tcG9uZW50ICYmXG4gICAgICAgICAgICAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoTGlzdEZvb3RlckNvbXBvbmVudCkgPyAoXG4gICAgICAgICAgICAgIExpc3RGb290ZXJDb21wb25lbnRcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxMaXN0Rm9vdGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZWFjdCBOYXRpdmVcbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgcmVuZGVySXRlbT17cmVuZGVySXRlbX1cbiAgICAgICAga2V5RXh0cmFjdG9yPXtrZXlFeHRyYWN0b3J9XG4gICAgICAgIExpc3RIZWFkZXJDb21wb25lbnQ9e0xpc3RIZWFkZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RGb290ZXJDb21wb25lbnQ9e0xpc3RGb290ZXJDb21wb25lbnR9XG4gICAgICAgIExpc3RFbXB0eUNvbXBvbmVudD17TGlzdEVtcHR5Q29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgbnVtQ29sdW1ucz17bnVtQ29sdW1uc31cbiAgICAgICAgaG9yaXpvbnRhbD17aG9yaXpvbnRhbH1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4pO1xuXG5GbGF0TGlzdC5kaXNwbGF5TmFtZSA9IFwiRmxhdExpc3RcIjtcbmV4cG9ydCBkZWZhdWx0IEZsYXRMaXN0O1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZU9wYWNpdHkgPSBmb3J3YXJkUmVmKFxuICAoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIGFjdGl2ZU9wYWNpdHkgPSAwLjIsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVvcGFjaXR5XCIpO1xuXG4gICAgaWYgKENvbXBvbmVudCA9PT0gXCJidXR0b25cIiB8fCBDb21wb25lbnQgPT09IFwiZGl2XCIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKX1cbiAgICAgICAgICBvbkNsaWNrPXtvblByZXNzfVxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gYWN0aXZlT3BhY2l0eSl9XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4gKGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMSl9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZU9wYWNpdHkuZGlzcGxheU5hbWUgPSBcIlRvdWNoYWJsZU9wYWNpdHlcIjtcbmV4cG9ydCBkZWZhdWx0IFRvdWNoYWJsZU9wYWNpdHk7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUHJlc3NhYmxlID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgc3R5bGUsIG9uUHJlc3MsIC4uLnJlc3QgfSwgcmVmKSA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwicHJlc3NhYmxlXCIpO1xuXG4gIGlmIChDb21wb25lbnQgPT09IFwiYnV0dG9uXCIgfHwgQ29tcG9uZW50ID09PSBcImRpdlwiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgIHsgY3Vyc29yOiBcInBvaW50ZXJcIiB9LFxuICAgICAgdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSh7IHByZXNzZWQ6IGZhbHNlIH0pIDogc3R5bGUsXG4gICAgXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiByZWY9e3JlZn0gc3R5bGU9e2ZsYXRTdHlsZX0gb25DbGljaz17b25QcmVzc30gey4uLnJlc3R9PlxuICAgICAgICB7dHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGNoaWxkcmVuKHsgcHJlc3NlZDogZmFsc2UgfSlcbiAgICAgICAgICA6IGNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCByZWY9e3JlZn0gc3R5bGU9e3N0eWxlfSBvblByZXNzPXtvblByZXNzfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db21wb25lbnQ+XG4gICk7XG59KTtcblxuUHJlc3NhYmxlLmRpc3BsYXlOYW1lID0gXCJQcmVzc2FibGVcIjtcbmV4cG9ydCBkZWZhdWx0IFByZXNzYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBJbWFnZUJhY2tncm91bmQgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAgeyBjaGlsZHJlbiwgc3R5bGUsIGltYWdlU3R5bGUsIHNvdXJjZSwgc3JjLCByZXNpemVNb2RlID0gXCJjb3ZlclwiLCAuLi5yZXN0IH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCBDb21wb25lbnQgPSByZXNvbHZlRWxlbWVudChcImltYWdlYmFja2dyb3VuZFwiKTtcblxuICAgIGNvbnN0IGltYWdlU291cmNlID0gc3JjIHx8IChzb3VyY2UgJiYgc291cmNlLnVyaSkgfHwgXCJcIjtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aW1hZ2VTb3VyY2V9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IHJlc2l6ZU1vZGUgPT09IFwic3RyZXRjaFwiID8gXCIxMDAlIDEwMCVcIiA6IHJlc2l6ZU1vZGUsXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6IFwibm8tcmVwZWF0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVhY3QgTmF0aXZlXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb21wb25lbnRcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgaW1hZ2VTdHlsZT17aW1hZ2VTdHlsZX1cbiAgICAgICAgc291cmNlPXtzb3VyY2UgfHwgeyB1cmk6IHNyYyB9fVxuICAgICAgICByZXNpemVNb2RlPXtyZXNpemVNb2RlfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbkltYWdlQmFja2dyb3VuZC5kaXNwbGF5TmFtZSA9IFwiSW1hZ2VCYWNrZ3JvdW5kXCI7XG5leHBvcnQgZGVmYXVsdCBJbWFnZUJhY2tncm91bmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmNvbnN0IE1vZGFsID0gZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdmlzaWJsZSxcbiAgICAgIHRyYW5zcGFyZW50LFxuICAgICAgYW5pbWF0aW9uVHlwZSxcbiAgICAgIG9uUmVxdWVzdENsb3NlLFxuICAgICAgc3R5bGUsXG4gICAgICAuLi5yZXN0XG4gICAgfSxcbiAgICByZWYsXG4gICkgPT4ge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IHJlc29sdmVFbGVtZW50KFwibW9kYWxcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImRpdlwiIHx8IENvbXBvbmVudCA9PT0gXCJ2aWV3XCIpIHtcbiAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IG1vZGFsU3R5bGUgPSB7XG4gICAgICAgIC4uLlN0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSksXG4gICAgICB9O1xuXG4gICAgICAvLyBSZW5kZXIgYXMgcG9ydGFsIGlmIHBvc3NpYmxlXG4gICAgICBjb25zdCBjb250ZW50ID0gKFxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17bW9kYWxTdHlsZX0gey4uLnJlc3R9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwoY29udGVudCwgZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgdHJhbnNwYXJlbnQ9e3RyYW5zcGFyZW50fVxuICAgICAgICBhbmltYXRpb25UeXBlPXthbmltYXRpb25UeXBlfVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17b25SZXF1ZXN0Q2xvc2V9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0NvbXBvbmVudD5cbiAgICApO1xuICB9LFxuKTtcblxuTW9kYWwuZGlzcGxheU5hbWUgPSBcIk1vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBTYWZlQXJlYVZpZXcgPSBmb3J3YXJkUmVmKCh7IGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzYWZlYXJlYXZpZXdcIik7XG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIiB8fCBDb21wb25lbnQgPT09IFwidmlld1wiKSB7XG4gICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFtzdHlsZV0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfSBzdHlsZT17ZmxhdFN0eWxlfSB7Li4ucmVzdH0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufSk7XG5cblNhZmVBcmVhVmlldy5kaXNwbGF5TmFtZSA9IFwiU2FmZUFyZWFWaWV3XCI7XG5leHBvcnQgZGVmYXVsdCBTYWZlQXJlYVZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcblxuLy8gV2ViIG1vY2sgb2YgU3RhdHVzQmFyLiBJbiBuYXRpdmUgaXQgd291bGQgY2hhbmdlIHRoZSBiYXIgc3R5bGUuXG4vLyBJbiB3ZWIsIG1heWJlIGl0IGNoYW5nZXMgdGhlIG1ldGEgdGhlbWUtY29sb3IgdGFnLlxuXG5mdW5jdGlvbiBTdGF0dXNCYXIoeyBiYXJTdHlsZSA9IFwiZGVmYXVsdFwiLCBiYWNrZ3JvdW5kQ29sb3IsIGhpZGRlbiA9IGZhbHNlIH0pIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICAvLyBBdHRlbXB0IHRvIHNldCB0aGVtZS1jb2xvciBtZXRhIHRhZyBpZiBiYWNrZ3JvdW5kQ29sb3IgcHJvdmlkZWRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRoZW1lLWNvbG9yXCJdJyk7XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICBtZXRhLm5hbWUgPSBcInRoZW1lLWNvbG9yXCI7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgICB9XG4gICAgICBtZXRhLmNvbnRlbnQgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICB9LCBbYmFja2dyb3VuZENvbG9yXSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhcjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTY3JvbGxWaWV3IGZyb20gXCIuL3Njcm9sbC12aWV3LmpzeFwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgU2VjdGlvbkxpc3QgPSBmb3J3YXJkUmVmKFxuICAoXG4gICAge1xuICAgICAgc2VjdGlvbnMsXG4gICAgICByZW5kZXJJdGVtLFxuICAgICAgcmVuZGVyU2VjdGlvbkhlYWRlcixcbiAgICAgIGtleUV4dHJhY3RvcixcbiAgICAgIExpc3RIZWFkZXJDb21wb25lbnQsXG4gICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgICAgY29udGVudENvbnRhaW5lclN0eWxlLFxuICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkID0gdHJ1ZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJzZWN0aW9ubGlzdFwiKTtcblxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgLy8gV2ViIGZhbGxiYWNrXG4gICAgICBjb25zdCByZW5kZXJTZWN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChzZWN0aW9ucyB8fCBbXSkubWFwKChzZWN0aW9uLCBzZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc2VjdGlvbi5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNvbnN0IGtleSA9IHNlY3Rpb24ua2V5IHx8IHNlY3Rpb25JbmRleC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9PlxuICAgICAgICAgICAgICB7cmVuZGVyU2VjdGlvbkhlYWRlciAmJiByZW5kZXJTZWN0aW9uSGVhZGVyKHsgc2VjdGlvbiB9KX1cbiAgICAgICAgICAgICAge2RhdGEubWFwKChpdGVtLCBpdGVtSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtS2V5ID0ga2V5RXh0cmFjdG9yXG4gICAgICAgICAgICAgICAgICA/IGtleUV4dHJhY3RvcihpdGVtLCBpdGVtSW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IGl0ZW0ua2V5IHx8IGl0ZW0uaWQgfHwga2V5ICsgXCItXCIgKyBpdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l0ZW1LZXl9PlxuICAgICAgICAgICAgICAgICAgICB7cmVuZGVySXRlbSh7IGl0ZW0sIGluZGV4OiBpdGVtSW5kZXgsIHNlY3Rpb24gfSl9XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTY3JvbGxWaWV3XG4gICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXtjb250ZW50Q29udGFpbmVyU3R5bGV9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7TGlzdEhlYWRlckNvbXBvbmVudCAmJlxuICAgICAgICAgICAgKFJlYWN0LmlzVmFsaWRFbGVtZW50KExpc3RIZWFkZXJDb21wb25lbnQpID8gKFxuICAgICAgICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAge3JlbmRlclNlY3Rpb25zKCl9XG4gICAgICAgICAge0xpc3RGb290ZXJDb21wb25lbnQgJiZcbiAgICAgICAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChMaXN0Rm9vdGVyQ29tcG9uZW50KSA/IChcbiAgICAgICAgICAgICAgTGlzdEZvb3RlckNvbXBvbmVudFxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpc3RGb290ZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFJlYWN0IE5hdGl2ZVxuICAgIHJldHVybiAoXG4gICAgICA8Q29tcG9uZW50XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBzZWN0aW9ucz17c2VjdGlvbnN9XG4gICAgICAgIHJlbmRlckl0ZW09e3JlbmRlckl0ZW19XG4gICAgICAgIHJlbmRlclNlY3Rpb25IZWFkZXI9e3JlbmRlclNlY3Rpb25IZWFkZXJ9XG4gICAgICAgIGtleUV4dHJhY3Rvcj17a2V5RXh0cmFjdG9yfVxuICAgICAgICBMaXN0SGVhZGVyQ29tcG9uZW50PXtMaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBMaXN0Rm9vdGVyQ29tcG9uZW50PXtMaXN0Rm9vdGVyQ29tcG9uZW50fVxuICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e2NvbnRlbnRDb250YWluZXJTdHlsZX1cbiAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtzdGlja3lTZWN0aW9uSGVhZGVyc0VuYWJsZWR9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuKTtcblxuU2VjdGlvbkxpc3QuZGlzcGxheU5hbWUgPSBcIlNlY3Rpb25MaXN0XCI7XG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uTGlzdDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZUVsZW1lbnQgfSBmcm9tIFwiLi4vdW5pdmVyc2FsL3Jlc29sdmUuanNcIjtcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gXCIuLi9hcGlzL3N0eWxlLXNoZWV0Lm1qc1wiO1xuXG5jb25zdCBLZXlib2FyZEF2b2lkaW5nVmlldyA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgYmVoYXZpb3IsXG4gICAgICBjb250ZW50Q29udGFpbmVyU3R5bGUsXG4gICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0LFxuICAgICAgZW5hYmxlZCxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJrZXlib2FyZGF2b2lkaW5ndmlld1wiKTtcblxuICAgIC8vIE9uIHdlYiwga2V5Ym9hcmQgYXZvaWRpbmcgaXMgdXN1YWxseSBoYW5kbGVkIGJ5IHRoZSBicm93c2VyIGRlZmF1bHQgYmVoYXZpb3Igb3IgaXMgaXJyZWxldmFudFxuICAgIGlmIChDb21wb25lbnQgPT09IFwiZGl2XCIgfHwgQ29tcG9uZW50ID09PSBcInZpZXdcIikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e1N0eWxlU2hlZXQuZmxhdHRlbihzdHlsZSl9IHsuLi5yZXN0fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBiZWhhdmlvcj17YmVoYXZpb3J9XG4gICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17Y29udGVudENvbnRhaW5lclN0eWxlfVxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZFZlcnRpY2FsT2Zmc2V0fVxuICAgICAgICBlbmFibGVkPXtlbmFibGVkfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cbktleWJvYXJkQXZvaWRpbmdWaWV3LmRpc3BsYXlOYW1lID0gXCJLZXlib2FyZEF2b2lkaW5nVmlld1wiO1xuZXhwb3J0IGRlZmF1bHQgS2V5Ym9hcmRBdm9pZGluZ1ZpZXc7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmVFbGVtZW50IH0gZnJvbSBcIi4uL3VuaXZlcnNhbC9yZXNvbHZlLmpzXCI7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tIFwiLi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcblxuY29uc3QgUmVmcmVzaENvbnRyb2wgPSBmb3J3YXJkUmVmKCh7IHJlZnJlc2hpbmcsIG9uUmVmcmVzaCwgLi4ucmVzdCB9LCByZWYpID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJyZWZyZXNoY29udHJvbFwiKTtcblxuICAvLyBPbiB3ZWIsIHBhc3MtdGhyb3VnaCBvciBpbXBsZW1lbnQgYmFzaWMgdmlzdWFsP1xuICAvLyBVc3VhbGx5IFJlZnJlc2hDb250cm9sIGlzIHBhc3NlZCBhcyBwcm9wIHRvIFNjcm9sbFZpZXcuXG4gIC8vIElmIHVzZWQgYXMgY29tcG9uZW50LCBpdCBtaWdodCB3cmFwIGNvbnRlbnQuXG5cbiAgaWYgKENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgIC8vIE5vLW9wIGZvciB3ZWIgdmlzdWFsIHVzdWFsbHksIHVubGVzcyB3ZSBpbXBsZW1lbnQgcHVsbC10by1yZWZyZXNoXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHJlZj17cmVmfVxuICAgICAgcmVmcmVzaGluZz17cmVmcmVzaGluZ31cbiAgICAgIG9uUmVmcmVzaD17b25SZWZyZXNofVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn0pO1xuXG5SZWZyZXNoQ29udHJvbC5kaXNwbGF5TmFtZSA9IFwiUmVmcmVzaENvbnRyb2xcIjtcbmV4cG9ydCBkZWZhdWx0IFJlZnJlc2hDb250cm9sO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlRWxlbWVudCB9IGZyb20gXCIuLi91bml2ZXJzYWwvcmVzb2x2ZS5qc1wiO1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSBcIi4uL2FwaXMvc3R5bGUtc2hlZXQubWpzXCI7XG5cbmNvbnN0IFRvdWNoYWJsZUhpZ2hsaWdodCA9IGZvcndhcmRSZWYoXG4gIChcbiAgICB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgb25QcmVzcyxcbiAgICAgIHVuZGVybGF5Q29sb3IgPSBcImJsYWNrXCIsXG4gICAgICBhY3RpdmVPcGFjaXR5ID0gMC44NSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PiB7XG4gICAgY29uc3QgQ29tcG9uZW50ID0gcmVzb2x2ZUVsZW1lbnQoXCJ0b3VjaGFibGVoaWdobGlnaHRcIik7XG5cbiAgICBpZiAoQ29tcG9uZW50ID09PSBcImJ1dHRvblwiIHx8IENvbXBvbmVudCA9PT0gXCJkaXZcIikge1xuICAgICAgY29uc3QgZmxhdFN0eWxlID0gU3R5bGVTaGVldC5mbGF0dGVuKFt7IGN1cnNvcjogXCJwb2ludGVyXCIgfSwgc3R5bGVdKTtcblxuICAgICAgLy8gU2ltcGxlIHdlYiBpbXBsZW1lbnRhdGlvbjoganVzdCBvcGFjaXR5LCBtaW1pY2tpbmcgb3ZlcmxheSBpcyBoYXJkZXIgd2l0aG91dCBzdGF0ZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIHN0eWxlPXtmbGF0U3R5bGV9XG4gICAgICAgICAgb25DbGljaz17b25QcmVzc31cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IHtcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB1bmRlcmxheUNvbG9yO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBhY3RpdmVPcGFjaXR5O1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZVVwPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgIGZsYXRTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBvblByZXNzPXtvblByZXNzfVxuICAgICAgICB1bmRlcmxheUNvbG9yPXt1bmRlcmxheUNvbG9yfVxuICAgICAgICBhY3RpdmVPcGFjaXR5PXthY3RpdmVPcGFjaXR5fVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Db21wb25lbnQ+XG4gICAgKTtcbiAgfSxcbik7XG5cblRvdWNoYWJsZUhpZ2hsaWdodC5kaXNwbGF5TmFtZSA9IFwiVG91Y2hhYmxlSGlnaGxpZ2h0XCI7XG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVIaWdobGlnaHQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNsb25lRWxlbWVudCwgQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIGp1c3QgYWNjZXB0cyBvblByZXNzIGFuZCBwYXNzZXMgaXQgdG8gdGhlIGNoaWxkXG4vLyBJdCBkb2VzIG5vdCBhZGQgYW55IHZpc3VhbCBmZWVkYmFjay5cbmNvbnN0IFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayA9ICh7XG4gIGNoaWxkcmVuLFxuICBvblByZXNzLFxuICBvblByZXNzSW4sXG4gIG9uUHJlc3NPdXQsXG4gIGRpc2FibGVkLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IGNoaWxkID0gQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xuICAgIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3MpIG9uUHJlc3MoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25DbGljaykgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duOiAoZSkgPT4ge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiBvblByZXNzSW4pIG9uUHJlc3NJbihlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vbk1vdXNlRG93bikgY2hpbGQucHJvcHMub25Nb3VzZURvd24oZSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXA6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NPdXQpIG9uUHJlc3NPdXQoZSk7XG4gICAgICBpZiAoY2hpbGQucHJvcHMub25Nb3VzZVVwKSBjaGlsZC5wcm9wcy5vbk1vdXNlVXAoZSk7XG4gICAgfSxcbiAgICBvblRvdWNoU3RhcnQ6IChlKSA9PiB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG9uUHJlc3NJbikgb25QcmVzc0luKGUpO1xuICAgICAgaWYgKGNoaWxkLnByb3BzLm9uVG91Y2hTdGFydCkgY2hpbGQucHJvcHMub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgb25Ub3VjaEVuZDogKGUpID0+IHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgb25QcmVzc091dCkgb25QcmVzc091dChlKTtcbiAgICAgIGlmIChjaGlsZC5wcm9wcy5vblRvdWNoRW5kKSBjaGlsZC5wcm9wcy5vblRvdWNoRW5kKGUpO1xuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGN1cnNvcjogZGlzYWJsZWQgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcbiAgICAgIC4uLmNoaWxkLnByb3BzLnN0eWxlLFxuICAgIH0sXG4gICAgLi4ucmVzdCxcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU2NyZWVuIENvbXBvbmVudFxyXG4gKiBGdWxsLWhlaWdodCBzY3JlZW4gY29udGFpbmVyIHdpdGggYmFja2dyb3VuZFxyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU2NyZWVuID0gZm9yd2FyZFJlZigoeyBjaGlsZHJlbiwgYmFja2dyb3VuZCA9ICdsaWdodCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuU2NyZWVuLmRpc3BsYXlOYW1lID0gXCJTY3JlZW5cIjtcclxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgQ29udGFpbmVyIENvbXBvbmVudFxyXG4gKiBSZXNwb25zaXZlIGNvbnRhaW5lciB3aXRoIG1heC13aWR0aCBhbmQgY2VudGVyaW5nXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBDb250YWluZXIgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXcgPlxyXG4gICAgKTtcclxufSk7XHJcblxyXG5Db250YWluZXIuZGlzcGxheU5hbWUgPSBcIkNvbnRhaW5lclwiO1xyXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmpzeFwiO1xyXG5cclxuLyoqXHJcbiAqIFVuaXZlcnNhbCBDYXJkIENvbXBvbmVudFxyXG4gKiBTdHlsZWQgY2FyZCBjb250YWluZXIgd2l0aCBzaGFkb3cgYW5kIHJvdW5kZWQgY29ybmVyc1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgQ2FyZCA9IGZvcndhcmRSZWYoKHtcclxuICAgIGNoaWxkcmVuLFxyXG4gICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgIHN0eWxlLFxyXG4gICAgLi4ucHJvcHNcclxufSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBmaW5hbENsYXNzID0gY2xhc3NOYW1lLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxWaWV3IHJlZj17cmVmfSBjbGFzc05hbWU9e2ZpbmFsQ2xhc3N9IHN0eWxlPXtzdHlsZX0gey4uLnByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvVmlldyA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkNhcmQuZGlzcGxheU5hbWUgPSBcIkNhcmRcIjtcclxuZXhwb3J0IGRlZmF1bHQgQ2FyZDtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXcuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEdyaWQgQ29tcG9uZW50XHJcbiAqIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXQgc3lzdGVtXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBHcmlkID0gZm9yd2FyZFJlZigoe1xyXG4gICAgY2hpbGRyZW4sXHJcbiAgICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gICAgc3R5bGUsXHJcbiAgICAuLi5wcm9wc1xyXG59LCByZWYpID0+IHtcclxuICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBjbGFzc05hbWUudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgcmVmPXtyZWZ9IGNsYXNzTmFtZT17ZmluYWxDbGFzc30gc3R5bGU9e3N0eWxlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9WaWV3ID5cclxuICAgICk7XHJcbn0pO1xyXG5cclxuR3JpZC5kaXNwbGF5TmFtZSA9IFwiR3JpZFwiO1xyXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlldy5qc3hcIjtcclxuXHJcbi8qKlxyXG4gKiBVbml2ZXJzYWwgU3RhY2sgQ29tcG9uZW50XHJcbiAqIFZlcnRpY2FsIG9yIGhvcml6b250YWwgbGF5b3V0IHdpdGggc3BhY2luZ1xyXG4gKiBXb3JrcyBvbiBXZWIsIERlc2t0b3AgKEVsZWN0cm9uKSwgYW5kIE1vYmlsZSAoQ2FwYWNpdG9yKVxyXG4gKi9cclxuY29uc3QgU3RhY2sgPSBmb3J3YXJkUmVmKCh7XHJcbiAgICBjaGlsZHJlbixcclxuICAgIGRpcmVjdGlvbiA9ICd2ZXJ0aWNhbCcsXHJcbiAgICBzcGFjaW5nID0gNCxcclxuICAgIGFsaWduID0gJ3N0YXJ0JyxcclxuICAgIGp1c3RpZnkgPSAnc3RhcnQnLFxyXG4gICAgY2xhc3NOYW1lID0gJycsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VmlldyByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59KTtcclxuXHJcblN0YWNrLmRpc3BsYXlOYW1lID0gXCJTdGFja1wiO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHQuanN4XCI7XHJcblxyXG4vKipcclxuICogVW5pdmVyc2FsIEljb24gQ29tcG9uZW50XHJcbiAqIERpc3BsYXlzIGVtb2ppIGljb25zIGNvbnNpc3RlbnRseSBhY3Jvc3MgcGxhdGZvcm1zXHJcbiAqIFdvcmtzIG9uIFdlYiwgRGVza3RvcCAoRWxlY3Ryb24pLCBhbmQgTW9iaWxlIChDYXBhY2l0b3IpXHJcbiAqL1xyXG5jb25zdCBJY29uID0gZm9yd2FyZFJlZigoe1xyXG4gICAgbmFtZSxcclxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICBzdHlsZSxcclxuICAgIC4uLnByb3BzXHJcbn0sIHJlZikgPT4ge1xyXG4gICAgY29uc3QgZmluYWxDbGFzcyA9IGNsYXNzTmFtZS50cmltKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dCByZWY9e3JlZn0gY2xhc3NOYW1lPXtmaW5hbENsYXNzfSBzdHlsZT17c3R5bGV9IHsuLi5wcm9wc30+XHJcbiAgICAgICAgICAgIHtuYW1lfVxyXG4gICAgICAgIDwvVGV4dCA+XHJcbiAgICApO1xyXG59KTtcclxuXHJcbkljb24uZGlzcGxheU5hbWUgPSBcIkljb25cIjtcclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIiwgIi8vIEFsZXJ0IEFQSSBmb3IgV2ViXG5cbmV4cG9ydCBjb25zdCBBbGVydCA9IHtcbiAgYWxlcnQ6ICh0aXRsZSwgbWVzc2FnZSwgYnV0dG9ucywgb3B0aW9ucykgPT4ge1xuICAgIC8vIEJhc2ljIHdlYiBhbGVydCBsaW1pdGF0aW9uOiBzdXBwb3J0cyBvbmx5IG9uZSBtZXNzYWdlXG4gICAgLy8gSWYgYnV0dG9ucyBhcmUgcHJvdmlkZWQsIHdlIGNhbid0IGZ1bGx5IG1pbWljIHdpdGhvdXQgYSBjdXN0b20gbW9kYWwgVUkuXG4gICAgLy8gRm9yIG5vdyB3ZSB1c2Ugd2luZG93LmFsZXJ0IGFuZCB3aW5kb3cuY29uZmlybVxuXG4gICAgLy8gU2ltcGxlIHRleHQtb25seSBjYXNlXG4gICAgY29uc3QgdGV4dCA9IFt0aXRsZSwgbWVzc2FnZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cIik7XG5cbiAgICBpZiAoIWJ1dHRvbnMgfHwgYnV0dG9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB3aW5kb3cuYWxlcnQodGV4dCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHdvIGJ1dHRvbiBjYXNlIChDYW5jZWwvT0spIC0+IGNvbmZpcm0oKVxuICAgIGlmIChidXR0b25zLmxlbmd0aCA+PSAyKSB7XG4gICAgICAvLyBGaW5kIHRoZSBcImNhbmNlbFwiIHN0eWxlIGJ1dHRvbiBvciBmaXJzdCBidXR0b25cbiAgICAgIC8vIFRoaXMgaXMgYSByb3VnaCBhcHByb3hpbWF0aW9uXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB3aW5kb3cuY29uZmlybSh0ZXh0KTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIE9LIHByZXNzZWQgLSBmaW5kIG5vbi1jYW5jZWwgYnV0dG9uXG4gICAgICAgICAgY29uc3Qgb2tCdG4gPSBidXR0b25zLmZpbmQoKGIpID0+IGIuc3R5bGUgIT09IFwiY2FuY2VsXCIpO1xuICAgICAgICAgIGlmIChva0J0biAmJiBva0J0bi5vblByZXNzKSBva0J0bi5vblByZXNzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ2FuY2VsIHByZXNzZWRcbiAgICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBidXR0b25zLmZpbmQoKGIpID0+IGIuc3R5bGUgPT09IFwiY2FuY2VsXCIpO1xuICAgICAgICAgIGlmIChjYW5jZWxCdG4gJiYgY2FuY2VsQnRuLm9uUHJlc3MpIGNhbmNlbEJ0bi5vblByZXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT25lIGJ1dHRvblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHdpbmRvdy5hbGVydCh0ZXh0KTtcbiAgICAgIGlmIChidXR0b25zWzBdLm9uUHJlc3MpIGJ1dHRvbnNbMF0ub25QcmVzcygpO1xuICAgIH1cbiAgfSxcbiAgcHJvbXB0OiAoXG4gICAgdGl0bGUsXG4gICAgbWVzc2FnZSxcbiAgICBjYWxsYmFja09yQnV0dG9ucyxcbiAgICB0eXBlLFxuICAgIGRlZmF1bHRWYWx1ZSxcbiAgICBrZXlib2FyZFR5cGUsXG4gICkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB3aW5kb3cucHJvbXB0KHRpdGxlLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja09yQnV0dG9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrT3JCdXR0b25zKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWxlcnQ7XG4iLCAiLy8gRGltZW5zaW9ucyBBUEkgZm9yIFdlYlxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBsaXN0ZW5lcnMuZW1pdChcImNoYW5nZVwiLCB7IHdpbmRvdzogZ2V0V2luZG93KCksIHNjcmVlbjogZ2V0U2NyZWVuKCkgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgc2NhbGU6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsXG4gICAgZm9udFNjYWxlOiAxLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgIHJldHVybiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHNjYWxlOiAxLCBmb250U2NhbGU6IDEgfTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgIHNjYWxlOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLFxuICAgIGZvbnRTY2FsZTogMSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IERpbWVuc2lvbnMgPSB7XG4gIGdldDogKGRpbSkgPT4ge1xuICAgIGlmIChkaW0gPT09IFwid2luZG93XCIpIHJldHVybiBnZXRXaW5kb3coKTtcbiAgICBpZiAoZGltID09PSBcInNjcmVlblwiKSByZXR1cm4gZ2V0U2NyZWVuKCk7XG4gICAgcmV0dXJuIGdldFdpbmRvdygpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcImNoYW5nZVwiKSB7XG4gICAgICBsaXN0ZW5lcnMub24oXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6ICgpID0+IGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwiY2hhbmdlXCIpIHtcbiAgICAgIGxpc3RlbmVycy5vZmYoXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGltZW5zaW9ucztcbiIsICIvLyBQaXhlbFJhdGlvIEFQSVxuXG5leHBvcnQgY29uc3QgUGl4ZWxSYXRpbyA9IHtcbiAgZ2V0OiAoKSA9PiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDogMSksXG4gIGdldEZvbnRTY2FsZTogKCkgPT4gMSxcbiAgZ2V0UGl4ZWxTaXplRm9yTGF5b3V0U2l6ZTogKGxheW91dFNpemUpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobGF5b3V0U2l6ZSAqIHJhdGlvKTtcbiAgfSxcbiAgcm91bmRUb05lYXJlc3RQaXhlbDogKGxheW91dFNpemUpID0+IHtcbiAgICBjb25zdCByYXRpbyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobGF5b3V0U2l6ZSAqIHJhdGlvKSAvIHJhdGlvO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGl4ZWxSYXRpbztcbiIsICJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IExpbmtpbmcgPSB7XG4gIG9wZW5VUkw6ICh1cmwpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfSxcbiAgY2FuT3BlblVSTDogKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICBnZXRJbml0aWFsVVJMOiAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgIGlmICh0eXBlID09PSBcInVybFwiKSB7XG4gICAgICAvLyBJbiBhIHJlYWwgd2ViIGFwcCwgd2UgbWlnaHQgbGlzdGVuIHRvIHBvcHN0YXRlIG9yIGhhc2hjaGFuZ2VcbiAgICAgIC8vIGVuc3VyaW5nIHdlIHJldHVybiBhIHN1YnNjcmlwdGlvbi1saWtlIG9iamVjdFxuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZSkgPT4gaGFuZGxlcih7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBsaXN0ZW5lciksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyByZW1vdmU6ICgpID0+IHt9IH07XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgLy8gRGVwcmVjYXRlZCBpbiBSTiBidXQgZ29vZCB0byBoYXZlIHNpZ25hdHVyZVxuICB9LFxuICBzZW5kSW50ZW50OiAoYWN0aW9uLCBleHRyYXMpID0+IFByb21pc2UucmVzb2x2ZSgpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua2luZztcbiIsICIvLyBDb3JlIGZyYW1ld29yayBmdW5jdGlvbnNcbi8vIFJlbW92ZWQgQ0xJL0RldiB0b29scyB0byBwcmV2ZW50IGJ1bmRsaW5nIGluIGFwcHNcbi8vIGltcG9ydCB7IGRldiB9IGZyb20gXCIuL2Rldi5tanNcIjtcbi8vIGltcG9ydCB7IHN0YXJ0IH0gZnJvbSBcIi4vc3RhcnQubWpzXCI7XG4vLyBpbXBvcnQgeyBidWlsZCB9IGZyb20gXCIuL2J1aWxkL2luZGV4Lm1qc1wiO1xuXG4vLyBSb3V0aW5nIHV0aWxpdGllc1xuaW1wb3J0IHtcbiAgZGlzY292ZXJSb3V0ZXMsXG4gIG1hdGNoRHluYW1pYyxcbiAgaXNEeW5hbWljUm91dGUsXG4gIGZpbGVUb1JvdXRlLFxufSBmcm9tIFwiLi9yb3V0aW5nL3JvdXRlcy5tanNcIjtcblxuLy8gU1NSIHV0aWxpdGllc1xuLy8gaW1wb3J0IHsgcmVuZGVyUGFnZU1vZHVsZSB9IGZyb20gXCIuL3Nzci5tanNcIjtcblxuLy8gQnVpbGQgdXRpbGl0aWVzXG4vLyBpbXBvcnQgeyBidWlsZENsaWVudEJ1bmRsZXMsIHJvdXRlVG9DbGllbnRQYXRoIH0gZnJvbSBcIi4vYnVpbGQvY2xpZW50Lm1qc1wiO1xuXG4vLyBDU1MgdXRpbGl0aWVzXG4vLyBpbXBvcnQgeyBidWlsZENzcywgd2F0Y2hDc3MsIGNzc0hyZWYgfSBmcm9tIFwiLi9jc3MubWpzXCI7XG5cbi8vIE1vZHVsZSBsb2FkaW5nXG4vLyBpbXBvcnQgeyBsb2FkTW9kdWxlIH0gZnJvbSBcIi4vbG9hZC5tanNcIjtcblxuLy8gUGxhdGZvcm0gZGV0ZWN0aW9uXG5pbXBvcnQgKiBhcyBQbGF0Zm9ybSBmcm9tIFwiLi9wbGF0Zm9ybS5tanNcIjtcbmltcG9ydCB7XG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbn0gZnJvbSBcIi4vcGxhdGZvcm0ubWpzXCI7XG5cbi8vIENMSSBydW5uZXJcbi8vIGltcG9ydCB7IHJ1biBhcyBydW5DTEkgfSBmcm9tIFwiLi9jbGkubWpzXCI7XG5cbi8vIFJlLWV4cG9ydCBzcGVjaWZpYyBuYW1lZCBleHBvcnRzXG5leHBvcnQgeyBkaXNjb3ZlclJvdXRlcywgbWF0Y2hEeW5hbWljLCBpc0R5bmFtaWNSb3V0ZSwgZmlsZVRvUm91dGUgfTtcbi8vIGV4cG9ydCB7IHJlbmRlclBhZ2VNb2R1bGUgfTtcbi8vIGV4cG9ydCB7IGJ1aWxkQ2xpZW50QnVuZGxlcywgcm91dGVUb0NsaWVudFBhdGggfTtcbi8vIGV4cG9ydCB7IGJ1aWxkQ3NzLCB3YXRjaENzcywgY3NzSHJlZiB9O1xuLy8gZXhwb3J0IHsgbG9hZE1vZHVsZSB9O1xuZXhwb3J0IHsgUGxhdGZvcm0gfTtcbmV4cG9ydCB7IGlzV2ViLCBpc0Rlc2t0b3AsIGlzTW9iaWxlLCBpc0FuZHJvaWQsIGlzSU9TLCBwbGF0Zm9ybSB9O1xuLy8gZXhwb3J0IHsgcnVuQ0xJIH07XG5cbi8vIENvbXBvbmVudHNcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL2ltYWdlLmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaW5rIH0gZnJvbSBcIi4vY29tcG9uZW50cy9saW5rLmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBWaWV3IH0gZnJvbSBcIi4vY29tcG9uZW50cy92aWV3LmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0IH0gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTY3JvbGxWaWV3IH0gZnJvbSBcIi4vY29tcG9uZW50cy9zY3JvbGwtdmlldy5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWlucHV0LmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCdXR0b24gfSBmcm9tIFwiLi9jb21wb25lbnRzL2J1dHRvbi5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwiLi9jb21wb25lbnRzL2FjdGl2aXR5LWluZGljYXRvci5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3dpdGNoIH0gZnJvbSBcIi4vY29tcG9uZW50cy9zd2l0Y2guanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZsYXRMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9mbGF0LWxpc3QuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvdWNoYWJsZU9wYWNpdHkgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RvdWNoYWJsZS1vcGFjaXR5LmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQcmVzc2FibGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL3ByZXNzYWJsZS5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2VCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbWFnZS1iYWNrZ3JvdW5kLmpzeFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNb2RhbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbW9kYWwuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNhZmVBcmVhVmlldyB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2FmZS1hcmVhLXZpZXcuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0YXR1c0JhciB9IGZyb20gXCIuL2NvbXBvbmVudHMvc3RhdHVzLWJhci5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VjdGlvbkxpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL3NlY3Rpb24tbGlzdC5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgS2V5Ym9hcmRBdm9pZGluZ1ZpZXcgfSBmcm9tIFwiLi9jb21wb25lbnRzL2tleWJvYXJkLWF2b2lkaW5nLXZpZXcuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFJlZnJlc2hDb250cm9sIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZWZyZXNoLWNvbnRyb2wuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvdWNoYWJsZUhpZ2hsaWdodCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdG91Y2hhYmxlLWhpZ2hsaWdodC5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrIH0gZnJvbSBcIi4vY29tcG9uZW50cy90b3VjaGFibGUtd2l0aG91dC1mZWVkYmFjay5qc3hcIjtcblxuLy8gVUkgQ29tcG9uZW50c1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTY3JlZW4gfSBmcm9tIFwiLi9jb21wb25lbnRzL3NjcmVlbi5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29udGFpbmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9jb250YWluZXIuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhcmQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NhcmQuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyaWQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2dyaWQuanN4XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0YWNrIH0gZnJvbSBcIi4vY29tcG9uZW50cy9zdGFjay5qc3hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSWNvbiB9IGZyb20gXCIuL2NvbXBvbmVudHMvaWNvbi5qc3hcIjtcblxuLy8gQVBJc1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdHlsZVNoZWV0IH0gZnJvbSBcIi4vYXBpcy9zdHlsZS1zaGVldC5tanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWxlcnQgfSBmcm9tIFwiLi9hcGlzL2FsZXJ0Lm1qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEaW1lbnNpb25zIH0gZnJvbSBcIi4vYXBpcy9kaW1lbnNpb25zLm1qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQaXhlbFJhdGlvIH0gZnJvbSBcIi4vYXBpcy9waXhlbC1yYXRpby5tanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlua2luZyB9IGZyb20gXCIuL2FwaXMvbGlua2luZy5tanNcIjtcblxuLy8gUmUtZXhwb3J0IGFsbCBtb2R1bGVzIGZvciBjb252ZW5pZW5jZVxuLy8gZXhwb3J0ICogYXMgQXV0aCBmcm9tIFwiLi9hdXRoL2luZGV4Lm1qc1wiO1xuLy8gZXhwb3J0ICogYXMgRGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2UvaW5kZXgubWpzXCI7XG4vLyBleHBvcnQgKiBhcyBUZXN0aW5nIGZyb20gXCIuL3Rlc3RpbmcvaW5kZXgubWpzXCI7XG4vLyBleHBvcnQgKiBhcyBEZXBsb3ltZW50IGZyb20gXCIuL2RlcGxveW1lbnQvaW5kZXgubWpzXCI7XG5cbi8vIERlZmF1bHQgZXhwb3J0IHdpdGggYWxsIHV0aWxpdGllc1xuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBSb3V0aW5nXG4gIGRpc2NvdmVyUm91dGVzLFxuICBtYXRjaER5bmFtaWMsXG4gIGlzRHluYW1pY1JvdXRlLFxuICBmaWxlVG9Sb3V0ZSxcblxuICAvLyBTU1JcbiAgLy8gcmVuZGVyUGFnZU1vZHVsZSxcblxuICAvLyBNb2R1bGUgbG9hZGluZ1xuICAvLyBsb2FkTW9kdWxlLFxuXG4gIC8vIFBsYXRmb3JtXG4gIGlzV2ViLFxuICBpc0Rlc2t0b3AsXG4gIGlzTW9iaWxlLFxuICBpc0FuZHJvaWQsXG4gIGlzSU9TLFxuICBwbGF0Zm9ybSxcbn07XG4iLCAiaW1wb3J0IHsgY3JlYXRlU2xpY2UgfSBmcm9tICdAcmVkdXhqcy90b29sa2l0JztcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIHRhc2tzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ1dlbGNvbWUgdG8gVGFzayBNYW5hZ2VyIScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBhIHNhbXBsZSB0YXNrLiBDbGljayB0aGUgY2hlY2tib3ggdG8gbWFyayBpdCBhcyBjb21wbGV0ZSwgb3IgZGVsZXRlIGl0LicsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiAnaGlnaCcsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiAnUGVyc29uYWwnLFxyXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgICAgZHVlRGF0ZTogbmV3IERhdGUoRGF0ZS5ub3coKSArIDg2NDAwMDAwKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICAgICAgdGl0bGU6ICdUcnkgYWRkaW5nIGEgbmV3IHRhc2snLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NsaWNrIHRoZSArIGJ1dHRvbiB0byBjcmVhdGUgeW91ciBvd24gdGFza3MnLFxyXG4gICAgICAgICAgICBwcmlvcml0eTogJ21lZGl1bScsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiAnV29yaycsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59O1xyXG5cclxuY29uc3QgdGFza1NsaWNlID0gY3JlYXRlU2xpY2Uoe1xyXG4gICAgbmFtZTogJ3Rhc2tzJyxcclxuICAgIGluaXRpYWxTdGF0ZSxcclxuICAgIHJlZHVjZXJzOiB7XHJcbiAgICAgICAgYWRkVGFzazogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3RhdGUudGFza3MudW5zaGlmdChhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVUYXNrOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gc3RhdGUudGFza3MuZmluZCh0ID0+IHQuaWQgPT09IGFjdGlvbi5wYXlsb2FkKTtcclxuICAgICAgICAgICAgaWYgKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVUYXNrOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS50YXNrcyA9IHN0YXRlLnRhc2tzLmZpbHRlcih0ID0+IHQuaWQgIT09IGFjdGlvbi5wYXlsb2FkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZVRhc2s6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3RhdGUudGFza3MuZmluZEluZGV4KHQgPT4gdC5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS50YXNrc1tpbmRleF0gPSB7IC4uLnN0YXRlLnRhc2tzW2luZGV4XSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgeyBhZGRUYXNrLCB0b2dnbGVUYXNrLCBkZWxldGVUYXNrLCB1cGRhdGVUYXNrIH0gPSB0YXNrU2xpY2UuYWN0aW9ucztcclxuZXhwb3J0IGRlZmF1bHQgdGFza1NsaWNlLnJlZHVjZXI7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYXRlZ29yaWVzKCkge1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IFtcclxuICAgICAgICB7IG5hbWU6ICdXb3JrJywgY291bnQ6IDgsIGNvbG9yOiAnZnJvbS1ibHVlLTUwMCB0by1ibHVlLTYwMCcsIGljb246ICdcdUQ4M0RcdURDQkMnLCB0YXNrczogWydUZWFtIE1lZXRpbmcnLCAnUHJvamVjdCBSZXZpZXcnLCAnRW1haWwgQ2xpZW50cyddIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnUGVyc29uYWwnLCBjb3VudDogNSwgY29sb3I6ICdmcm9tLXB1cnBsZS01MDAgdG8tcHVycGxlLTYwMCcsIGljb246ICdcdUQ4M0NcdURGRTAnLCB0YXNrczogWydHcm9jZXJ5IFNob3BwaW5nJywgJ0NhbGwgTW9tJywgJ1JlYWQgQm9vayddIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnU2hvcHBpbmcnLCBjb3VudDogMywgY29sb3I6ICdmcm9tLXBpbmstNTAwIHRvLXBpbmstNjAwJywgaWNvbjogJ1x1RDgzRFx1REVDRFx1RkUwRicsIHRhc2tzOiBbJ0J1eSBHcm9jZXJpZXMnLCAnTmV3IFNob2VzJywgJ0dpZnQgZm9yIEZyaWVuZCddIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnSGVhbHRoJywgY291bnQ6IDQsIGNvbG9yOiAnZnJvbS1ncmVlbi01MDAgdG8tZ3JlZW4tNjAwJywgaWNvbjogJ1x1RDgzRFx1RENBQScsIHRhc2tzOiBbJ0d5bSBXb3Jrb3V0JywgJ1lvZ2EgU2Vzc2lvbicsICdNZWFsIFByZXAnXSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ1N0dWR5JywgY291bnQ6IDYsIGNvbG9yOiAnZnJvbS15ZWxsb3ctNTAwIHRvLXllbGxvdy02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0RBJywgdGFza3M6IFsnUmVhZCBDaGFwdGVyIDUnLCAnQ29tcGxldGUgQXNzaWdubWVudCcsICdQcmFjdGljZSBDb2RpbmcnXSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ0ZpbmFuY2UnLCBjb3VudDogMiwgY29sb3I6ICdmcm9tLWVtZXJhbGQtNTAwIHRvLWVtZXJhbGQtNjAwJywgaWNvbjogJ1x1RDgzRFx1RENCMCcsIHRhc2tzOiBbJ1BheSBCaWxscycsICdCdWRnZXQgUmV2aWV3J10gfSxcclxuICAgICAgICB7IG5hbWU6ICdUcmF2ZWwnLCBjb3VudDogMSwgY29sb3I6ICdmcm9tLWN5YW4tNTAwIHRvLWN5YW4tNjAwJywgaWNvbjogJ1x1MjcwOFx1RkUwRicsIHRhc2tzOiBbJ0Jvb2sgRmxpZ2h0J10gfSxcclxuICAgICAgICB7IG5hbWU6ICdPdGhlcicsIGNvdW50OiAzLCBjb2xvcjogJ2Zyb20tZ3JheS01MDAgdG8tZ3JheS02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0NDJywgdGFza3M6IFsnTWlzY2VsbGFuZW91cyBUYXNrcyddIH1cclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTEgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS12aW9sZXQtNTAgdmlhLXB1cnBsZS01MCB0by1mdWNoc2lhLTUwXCI+XHJcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInB4LTQgcHktOFwiPlxyXG4gICAgICAgICAgICAgICAgey8qIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnQgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYXRlZ29yaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1sZ1wiPk9yZ2FuaXplIHRhc2tzIGJ5IGNhdGVnb3J5PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBDYXRlZ29yeSBHcmlkICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNCBtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge2NhdGVnb3JpZXMubWFwKChjYXRlZ29yeSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNSBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTQgaC0xNCBiZy1ncmFkaWVudC10by1yICR7Y2F0ZWdvcnkuY29sb3J9IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItM2B9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsXCI+e2NhdGVnb3J5Lmljb259PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtYi0xXCI+e2NhdGVnb3J5Lm5hbWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+e2NhdGVnb3J5LmNvdW50fSB0YXNrczwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIFJlY2VudCBieSBDYXRlZ29yeSAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTRcIj5SZWNlbnQgVGFza3MgYnkgQ2F0ZWdvcnk8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAge2NhdGVnb3JpZXMuc2xpY2UoMCwgNCkubWFwKChjYXRlZ29yeSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IHNoYWRvdy1sZyBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgdy0xMCBoLTEwIGJnLWdyYWRpZW50LXRvLXIgJHtjYXRlZ29yeS5jb2xvcn0gcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcmB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsXCI+e2NhdGVnb3J5Lmljb259PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwXCI+e2NhdGVnb3J5Lm5hbWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhdGVnb3J5LnRhc2tzLm1hcCgodGFzaywgdGFza0luZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGtleT17dGFza0luZGV4fSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBnYXAtMiBweS0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ3LTUgaC01IHJvdW5kZWQgYm9yZGVyLTIgYm9yZGVyLWdyYXktMzAwXCI+PC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMFwiPnt0YXNrfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1Njcm9sbFZpZXc+XHJcbiAgICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGF0aXN0aWNzKCkge1xyXG4gICAgY29uc3Qgd2Vla0RhdGEgPSBbXHJcbiAgICAgICAgeyBkYXk6ICdNb24nLCBjb21wbGV0ZWQ6IDgsIHRvdGFsOiAxMCB9LFxyXG4gICAgICAgIHsgZGF5OiAnVHVlJywgY29tcGxldGVkOiA2LCB0b3RhbDogOCB9LFxyXG4gICAgICAgIHsgZGF5OiAnV2VkJywgY29tcGxldGVkOiAxMCwgdG90YWw6IDEyIH0sXHJcbiAgICAgICAgeyBkYXk6ICdUaHUnLCBjb21wbGV0ZWQ6IDcsIHRvdGFsOiA5IH0sXHJcbiAgICAgICAgeyBkYXk6ICdGcmknLCBjb21wbGV0ZWQ6IDksIHRvdGFsOiAxMSB9LFxyXG4gICAgICAgIHsgZGF5OiAnU2F0JywgY29tcGxldGVkOiA1LCB0b3RhbDogNiB9LFxyXG4gICAgICAgIHsgZGF5OiAnU3VuJywgY29tcGxldGVkOiA0LCB0b3RhbDogNSB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGluc2lnaHRzID0gW1xyXG4gICAgICAgIHsgdGl0bGU6ICdNb3N0IFByb2R1Y3RpdmUgRGF5JywgdmFsdWU6ICdXZWRuZXNkYXknLCBpY29uOiAnXHVEODNEXHVEQ0M4JywgY29sb3I6ICdmcm9tLWdyZWVuLTUwMCB0by1ncmVlbi02MDAnIH0sXHJcbiAgICAgICAgeyB0aXRsZTogJ0F2ZXJhZ2UgQ29tcGxldGlvbiBSYXRlJywgdmFsdWU6ICc4MiUnLCBpY29uOiAnXHVEODNDXHVERkFGJywgY29sb3I6ICdmcm9tLWJsdWUtNTAwIHRvLWJsdWUtNjAwJyB9LFxyXG4gICAgICAgIHsgdGl0bGU6ICdUb3RhbCBUaW1lIFNhdmVkJywgdmFsdWU6ICcxMiBob3VycycsIGljb246ICdcdTIzRjFcdUZFMEYnLCBjb2xvcjogJ2Zyb20tcHVycGxlLTUwMCB0by1wdXJwbGUtNjAwJyB9LFxyXG4gICAgICAgIHsgdGl0bGU6ICdTdHJlYWsgUmVjb3JkJywgdmFsdWU6ICcxNCBkYXlzJywgaWNvbjogJ1x1RDgzRFx1REQyNScsIGNvbG9yOiAnZnJvbS1vcmFuZ2UtNTAwIHRvLW9yYW5nZS02MDAnIH1cclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTEgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS12aW9sZXQtNTAgdmlhLXB1cnBsZS01MCB0by1mdWNoc2lhLTUwXCI+XHJcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInB4LTQgcHktOFwiPlxyXG4gICAgICAgICAgICAgICAgey8qIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTR4bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnQgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdGF0aXN0aWNzXHJcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1sZ1wiPlRyYWNrIHlvdXIgcHJvZHVjdGl2aXR5PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBXZWVrbHkgQ2hhcnQgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgc2hhZG93LWxnIG1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTRcIj5UaGlzIFdlZWs8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGgtNDggbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7d2Vla0RhdGEubWFwKChkYXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKGRheS5jb21wbGV0ZWQgLyBkYXkudG90YWwpICogMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gYCR7cGVyY2VudGFnZX0lYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiZmxleC0xIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by10IGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCByb3VuZGVkLXQtbGdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS02MDAgZm9udC1tZWRpdW1cIj57ZGF5LmRheX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPntkYXkuY29tcGxldGVkfS97ZGF5LnRvdGFsfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIEluc2lnaHRzICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWItOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS04MDAgbWItNFwiPkluc2lnaHRzPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2luc2lnaHRzLm1hcCgoaW5zaWdodCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9e2B3LTEyIGgtMTIgYmctZ3JhZGllbnQtdG8tciAke2luc2lnaHQuY29sb3J9IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItM2B9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPntpbnNpZ2h0Lmljb259PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbWItMVwiPntpbnNpZ2h0LnRpdGxlfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwXCI+e2luc2lnaHQudmFsdWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIE1vbnRobHkgT3ZlcnZpZXcgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgc2hhZG93LWxnIG1iLThcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTRcIj5Nb250aGx5IE92ZXJ2aWV3PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDBcIj5UYXNrcyBDb21wbGV0ZWQ8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmVlbi02MDBcIj4xMjc8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwXCI+VGFza3MgQ3JlYXRlZDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWJsdWUtNjAwXCI+MTQ1PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMFwiPkNvbXBsZXRpb24gUmF0ZTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXZpb2xldC02MDBcIj44Ny42JTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDBcIj5BY3RpdmUgU3RyZWFrPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtb3JhbmdlLTYwMFwiPjcgZGF5czwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogQ2F0ZWdvcnkgQnJlYWtkb3duICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IHNoYWRvdy1sZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS04MDAgbWItNFwiPkNhdGVnb3J5IEJyZWFrZG93bjwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdXb3JrJywgcGVyY2VudGFnZTogMzUsIGNvbG9yOiAnYmctYmx1ZS01MDAnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1BlcnNvbmFsJywgcGVyY2VudGFnZTogMjUsIGNvbG9yOiAnYmctcHVycGxlLTUwMCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnU2hvcHBpbmcnLCBwZXJjZW50YWdlOiAxNSwgY29sb3I6ICdiZy1waW5rLTUwMCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnSGVhbHRoJywgcGVyY2VudGFnZTogMTUsIGNvbG9yOiAnYmctZ3JlZW4tNTAwJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6ICdPdGhlcicsIHBlcmNlbnRhZ2U6IDEwLCBjb2xvcjogJ2JnLWdyYXktNTAwJyB9XHJcbiAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGNhdGVnb3J5LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW1cIj57Y2F0ZWdvcnkubmFtZX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPntjYXRlZ29yeS5wZXJjZW50YWdlfSU8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yIGJnLWdyYXktMjAwIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoLWZ1bGwgJHtjYXRlZ29yeS5jb2xvcn0gcm91bmRlZC1mdWxsYH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2NhdGVnb3J5LnBlcmNlbnRhZ2V9JWAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1Njcm9sbFZpZXc+XHJcbiAgICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9maWxlKCkge1xyXG4gICAgY29uc3QgdXNlclN0YXRzID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdUYXNrcyBDb21wbGV0ZWQnLCB2YWx1ZTogJzEyNycsIGljb246ICdcdTI3MDUnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0FjdGl2ZSBUYXNrcycsIHZhbHVlOiAnMTInLCBpY29uOiAnXHVEODNEXHVEQ0REJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdTdHJlYWsgRGF5cycsIHZhbHVlOiAnNycsIGljb246ICdcdUQ4M0RcdUREMjUnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1RvdGFsIFBvaW50cycsIHZhbHVlOiAnMSwyNTAnLCBpY29uOiAnXHUyQjUwJyB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGFjaGlldmVtZW50cyA9IFtcclxuICAgICAgICB7IHRpdGxlOiAnRWFybHkgQmlyZCcsIGRlc2NyaXB0aW9uOiAnQ29tcGxldGUgNSB0YXNrcyBiZWZvcmUgOSBBTScsIGVhcm5lZDogdHJ1ZSwgaWNvbjogJ1x1RDgzQ1x1REYwNScgfSxcclxuICAgICAgICB7IHRpdGxlOiAnUHJvZHVjdGl2aXR5IE1hc3RlcicsIGRlc2NyaXB0aW9uOiAnQ29tcGxldGUgNTAgdGFza3MnLCBlYXJuZWQ6IHRydWUsIGljb246ICdcdUQ4M0NcdURGQzYnIH0sXHJcbiAgICAgICAgeyB0aXRsZTogJ1dlZWsgV2FycmlvcicsIGRlc2NyaXB0aW9uOiAnNyBkYXkgc3RyZWFrJywgZWFybmVkOiB0cnVlLCBpY29uOiAnXHVEODNEXHVEQ0FBJyB9LFxyXG4gICAgICAgIHsgdGl0bGU6ICdUYXNrIENoYW1waW9uJywgZGVzY3JpcHRpb246ICdDb21wbGV0ZSAxMDAgdGFza3MnLCBlYXJuZWQ6IGZhbHNlLCBpY29uOiAnXHVEODNEXHVEQzUxJyB9XHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHZpYS1wdXJwbGUtNTAgdG8tZnVjaHNpYS01MFwiPlxyXG4gICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cclxuICAgICAgICAgICAgICAgIHsvKiBQcm9maWxlIEhlYWRlciAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIml0ZW1zLWNlbnRlciBtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwidy0yNCBoLTI0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIHRleHQtd2hpdGVcIj5cdUQ4M0RcdURDNjQ8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj5Kb2huIERvZTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+am9obi5kb2VAZXhhbXBsZS5jb208L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibXQtNCBweC02IHB5LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgcm91bmRlZC1mdWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1zZW1pYm9sZFwiPlBybyBNZW1iZXI8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBTdGF0cyBHcmlkICovfVxyXG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWItOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS04MDAgbWItNFwiPllvdXIgU3RhdHM8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dXNlclN0YXRzLm1hcCgoc3RhdCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtYi0yXCI+e3N0YXQuaWNvbn08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMCBtYi0xXCI+e3N0YXQudmFsdWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPntzdGF0LmxhYmVsfTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBBY2hpZXZlbWVudHMgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtYi00XCI+QWNoaWV2ZW1lbnRzPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWNoaWV2ZW1lbnRzLm1hcCgoYWNoaWV2ZW1lbnQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IHNoYWRvdy1sZyAke2FjaGlldmVtZW50LmVhcm5lZCA/ICcnIDogJ29wYWNpdHktNTAnfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgdy0xNCBoLTE0IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciAke2FjaGlldmVtZW50LmVhcm5lZCA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCcgOiAnYmctZ3JheS0yMDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj57YWNoaWV2ZW1lbnQuaWNvbn08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj57YWNoaWV2ZW1lbnQudGl0bGV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+e2FjaGlldmVtZW50LmRlc2NyaXB0aW9ufTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWNoaWV2ZW1lbnQuZWFybmVkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInctOCBoLTggYmctZ3JlZW4tNTAwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC14bFwiPlx1MjcxMzwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogU2V0dGluZ3MgKi99XHJcbiAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtYi00XCI+U2V0dGluZ3M8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgc2hhZG93LWxnIG92ZXJmbG93LWhpZGRlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7WydOb3RpZmljYXRpb25zJywgJ1RoZW1lJywgJ0xhbmd1YWdlJywgJ1ByaXZhY3knLCAnSGVscCAmIFN1cHBvcnQnLCAnTG9nb3V0J10ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS00IGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiAke2luZGV4ICE9PSA1ID8gJ2JvcmRlci1iIGJvcmRlci1ncmF5LTEwMCcgOiAnJ31gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS04MDAgZm9udC1tZWRpdW1cIj57aXRlbX08L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiPlx1MjAzQTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1Njcm9sbFZpZXc+XHJcbiAgICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUYXNrQ2FyZCh7IHRhc2ssIG9uVG9nZ2xlLCBvbkRlbGV0ZSB9KSB7XHJcbiAgICBjb25zdCBwcmlvcml0eUNvbG9ycyA9IHtcclxuICAgICAgICBoaWdoOiAnYm9yZGVyLXJlZC00MDAgYmctcmVkLTUwJyxcclxuICAgICAgICBtZWRpdW06ICdib3JkZXIteWVsbG93LTQwMCBiZy15ZWxsb3ctNTAnLFxyXG4gICAgICAgIGxvdzogJ2JvcmRlci1ncmVlbi00MDAgYmctZ3JlZW4tNTAnXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByaW9yaXR5QmFkZ2VDb2xvcnMgPSB7XHJcbiAgICAgICAgaGlnaDogJ2JnLXJlZC01MDAgdGV4dC13aGl0ZScsXHJcbiAgICAgICAgbWVkaXVtOiAnYmcteWVsbG93LTUwMCB0ZXh0LXdoaXRlJyxcclxuICAgICAgICBsb3c6ICdiZy1ncmVlbi01MDAgdGV4dC13aGl0ZSdcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Vmlld1xyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTUgc2hhZG93LWxnIGhvdmVyOnNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgYm9yZGVyLWwtNCAke3Rhc2suY29tcGxldGVkID8gJ29wYWNpdHktNjAgYm9yZGVyLWdyYXktMzAwJyA6IHByaW9yaXR5Q29sb3JzW3Rhc2sucHJpb3JpdHldXHJcbiAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICAgIHsvKiBDaGVja2JveCAqL31cclxuICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvblRvZ2dsZX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LXNocmluay0wIHctNyBoLTcgcm91bmRlZC1sZyBib3JkZXItMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHt0YXNrLmNvbXBsZXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgYm9yZGVyLXRyYW5zcGFyZW50J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLWdyYXktMzAwIGhvdmVyOmJvcmRlci12aW9sZXQtNDAwJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dGFzay5jb21wbGV0ZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC13aGl0ZVwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXszfSBkPVwiTTUgMTNsNCA0TDE5IDdcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcblxyXG4gICAgICAgICAgICAgICAgey8qIFRhc2sgQ29udGVudCAqL31cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTEgJHt0YXNrLmNvbXBsZXRlZCA/ICdsaW5lLXRocm91Z2ggdGV4dC1ncmF5LTUwMCcgOiAndGV4dC1ncmF5LTgwMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2sudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0YXNrLmRlc2NyaXB0aW9uICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1zbSBtYi0zICR7dGFzay5jb21wbGV0ZWQgPyAndGV4dC1ncmF5LTQwMCcgOiAndGV4dC1ncmF5LTYwMCd9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5kZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGZsZXgtd3JhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogUHJpb3JpdHkgQmFkZ2UgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgJHtwcmlvcml0eUJhZGdlQ29sb3JzW3Rhc2sucHJpb3JpdHldfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2sucHJpb3JpdHkudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIENhdGVnb3J5ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5jYXRlZ29yeSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtcHVycGxlLTcwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5jYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRGF0ZSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZHVlRGF0ZSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWdyYXktNTAwXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk04IDdWM204IDRWM20tOSA4aDEwTTUgMjFoMTRhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJINWEyIDIgMCAwMC0yIDJ2MTJhMiAyIDAgMDAyIDJ6XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25ldyBEYXRlKHRhc2suZHVlRGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICB7LyogRGVsZXRlIEJ1dHRvbiAqL31cclxuICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvbkRlbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctMTAgaC0xMCByb3VuZGVkLXhsIGJnLXJlZC01MCBob3ZlcjpiZy1yZWQtMTAwIHRleHQtcmVkLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTEwXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1yZWQtNjAwXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk0xOSA3bC0uODY3IDEyLjE0MkEyIDIgMCAwMTE2LjEzOCAyMUg3Ljg2MmEyIDIgMCAwMS0xLjk5NS0xLjg1OEw1IDdtNSA0djZtNC02djZtMS0xMFY0YTEgMSAwIDAwLTEtMWgtNGExIDEgMCAwMC0xIDF2M000IDdoMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9QcmVzc2FibGU+XHJcbiAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZpZXcsIFRleHQsIFRleHRJbnB1dCwgUHJlc3NhYmxlLCBNb2RhbCwgU2Nyb2xsVmlldyB9IGZyb20gJ2luZGpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFkZFRhc2tNb2RhbCh7IG9uQ2xvc2UsIG9uQWRkIH0pIHtcclxuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgcHJpb3JpdHk6ICdtZWRpdW0nLFxyXG4gICAgICAgIGNhdGVnb3J5OiAnJyxcclxuICAgICAgICBkdWVEYXRlOiAnJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghZm9ybURhdGEudGl0bGUudHJpbSgpKSByZXR1cm47XHJcbiAgICAgICAgb25BZGQoZm9ybURhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZmllbGQsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgc2V0Rm9ybURhdGEoe1xyXG4gICAgICAgICAgICAuLi5mb3JtRGF0YSxcclxuICAgICAgICAgICAgW2ZpZWxkXTogdmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8TW9kYWwgdmlzaWJsZT17dHJ1ZX0gdHJhbnNwYXJlbnQ9e3RydWV9IGFuaW1hdGlvblR5cGU9XCJzbGlkZVwiIG9uUmVxdWVzdENsb3NlPXtvbkNsb3NlfT5cclxuICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjayBiZy1vcGFjaXR5LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCB6LTUwIGJhY2tkcm9wLWJsdXItc21cIj5cclxuICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtM3hsIHNoYWRvdy0yeGwgbWF4LXctbGcgdy1mdWxsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy1oaWRkZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7LyogSGVhZGVyICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIHRleHQtd2hpdGUgcHgtNiBweS01IHJvdW5kZWQtdC0zeGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPkFkZCBOZXcgVGFzazwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblByZXNzPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXdoaXRlIGJnLW9wYWNpdHktMjAgaG92ZXI6Ymctb3BhY2l0eS0zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXdoaXRlXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD17Mn0gZD1cIk02IDE4TDE4IDZNNiA2bDEyIDEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRm9ybSAqL31cclxuICAgICAgICAgICAgICAgICAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJwLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwic3BhY2UteS01XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVGl0bGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRhc2sgVGl0bGUgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VUZXh0PXsodmFsdWUpID0+IGhhbmRsZUNoYW5nZSgndGl0bGUnLCB2YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGFzayB0aXRsZS4uLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTMgcm91bmRlZC14bCBib3JkZXItMiBib3JkZXItZ3JheS0yMDAgZm9jdXM6Ym9yZGVyLXZpb2xldC01MDAgZm9jdXM6b3V0bGluZS1ub25lIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZVRleHQ9eyh2YWx1ZSkgPT4gaGFuZGxlQ2hhbmdlKCdkZXNjcmlwdGlvbicsIHZhbHVlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBZGQgZGV0YWlscyBhYm91dCB5b3VyIHRhc2suLi5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aWxpbmU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlck9mTGluZXM9ezN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTMgcm91bmRlZC14bCBib3JkZXItMiBib3JkZXItZ3JheS0yMDAgZm9jdXM6Ym9yZGVyLXZpb2xldC01MDAgZm9jdXM6b3V0bGluZS1ub25lIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUHJpb3JpdHkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Vmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaW9yaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1snbG93JywgJ21lZGl1bScsICdoaWdoJ10ubWFwKChwcmlvcml0eSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cHJpb3JpdHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gaGFuZGxlQ2hhbmdlKCdwcmlvcml0eScsIHByaW9yaXR5KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtmb3JtRGF0YS5wcmlvcml0eSA9PT0gcHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJpb3JpdHkgPT09ICdoaWdoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC01MDAgc2hhZG93LWxnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJpb3JpdHkgPT09ICdtZWRpdW0nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXllbGxvdy01MDAgc2hhZG93LWxnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmVlbi01MDAgc2hhZG93LWxnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JheS0xMDAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17YHRleHQtY2VudGVyICR7Zm9ybURhdGEucHJpb3JpdHkgPT09IHByaW9yaXR5ID8gJ3RleHQtd2hpdGUgZm9udC1tZWRpdW0nIDogJ3RleHQtZ3JheS02MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJpb3JpdHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcmlvcml0eS5zbGljZSgxKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDYXRlZ29yeSAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2F0ZWdvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmNhdGVnb3J5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ2NhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBmb2N1czpib3JkZXItdmlvbGV0LTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwIGJnLXdoaXRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBjYXRlZ29yeS4uLjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIldvcmtcIj5Xb3JrPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUGVyc29uYWxcIj5QZXJzb25hbDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNob3BwaW5nXCI+U2hvcHBpbmc8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIZWFsdGhcIj5IZWFsdGg8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdHVkeVwiPlN0dWR5PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiT3RoZXJcIj5PdGhlcjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIER1ZSBEYXRlICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZ3JheS03MDAgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdWUgRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEuZHVlRGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVDaGFuZ2UoJ2R1ZURhdGUnLCBlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTMgcm91bmRlZC14bCBib3JkZXItMiBib3JkZXItZ3JheS0yMDAgZm9jdXM6Ym9yZGVyLXZpb2xldC01MDAgZm9jdXM6b3V0bGluZS1ub25lIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQnV0dG9ucyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgcHQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzcz17b25DbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTMgcHgtNiByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBiZy1ncmF5LTEwMCBob3ZlcjpiZy1ncmF5LTIwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBmb250LXNlbWlib2xkIHRleHQtY2VudGVyXCI+Q2FuY2VsPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcmVzc2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QcmVzcz17aGFuZGxlU3VibWl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMyBweC02IHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGhvdmVyOnNoYWRvdy1sZyB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC1jZW50ZXJcIj5BZGQgVGFzazwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvU2Nyb2xsVmlldz5cclxuICAgICAgICAgICAgICAgIDwvVmlldz5cclxuICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG59XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBWaWV3LCBUZXh0LCBTY3JvbGxWaWV3LCBQcmVzc2FibGUgfSBmcm9tICdpbmRqcyc7XG5pbXBvcnQgVGFza0NhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9UYXNrQ2FyZCc7XG5pbXBvcnQgQWRkVGFza01vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvQWRkVGFza01vZGFsJztcbmltcG9ydCB7IGFkZFRhc2ssIHRvZ2dsZVRhc2ssIGRlbGV0ZVRhc2sgfSBmcm9tICcuLi91dGlscy90YXNrU2xpY2UnO1xuXG4vLyBUYXNrcyBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gVGFza3NQYWdlKCkge1xuICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZmlsdGVyLCBzZXRGaWx0ZXJdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCB0YXNrcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudGFza3MudGFza3MpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgZmlsdGVyZWRUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICBpZiAoZmlsdGVyID09PSAnYWN0aXZlJykgcmV0dXJuICF0YXNrLmNvbXBsZXRlZDtcbiAgICBpZiAoZmlsdGVyID09PSAnY29tcGxldGVkJykgcmV0dXJuIHRhc2suY29tcGxldGVkO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICB0b3RhbDogdGFza3MubGVuZ3RoLFxuICAgIGFjdGl2ZTogdGFza3MuZmlsdGVyKHQgPT4gIXQuY29tcGxldGVkKS5sZW5ndGgsXG4gICAgY29tcGxldGVkOiB0YXNrcy5maWx0ZXIodCA9PiB0LmNvbXBsZXRlZCkubGVuZ3RoXG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkVGFzayA9ICh0YXNrRGF0YSkgPT4ge1xuICAgIGRpc3BhdGNoKGFkZFRhc2soe1xuICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgIC4uLnRhc2tEYXRhLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgfSkpO1xuICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cIm1heC13LTR4bCBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50IG1iLTJcIj5cbiAgICAgICAgICAgIFRhc2sgTWFuYWdlclxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtbGdcIj5Pcmdhbml6ZSB5b3VyIGRheSwgYWNoaWV2ZSB5b3VyIGdvYWxzPC9UZXh0PlxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtNCBtYi04XCI+XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC00IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMFwiPntzdGF0cy50b3RhbH08L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtMVwiPlRvdGFsPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiPntzdGF0cy5hY3RpdmV9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5BY3RpdmU8L1RleHQ+XG4gICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiPntzdGF0cy5jb21wbGV0ZWR9PC9UZXh0PlxuICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIj5Eb25lPC9UZXh0PlxuICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIgbWItNiBiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTIgc2hhZG93LW1kXCI+XG4gICAgICAgICAge1snYWxsJywgJ2FjdGl2ZScsICdjb21wbGV0ZWQnXS5tYXAoKGYpID0+IChcbiAgICAgICAgICAgIDxQcmVzc2FibGVcbiAgICAgICAgICAgICAga2V5PXtmfVxuICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRGaWx0ZXIoZil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtmaWx0ZXIgPT09IGYgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgc2hhZG93LWxnJyA6ICdiZy10cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPXtgdGV4dC1jZW50ZXIgZm9udC1tZWRpdW0gJHtmaWx0ZXIgPT09IGYgPyAndGV4dC13aGl0ZScgOiAndGV4dC1ncmF5LTYwMCd9YH0+XG4gICAgICAgICAgICAgICAge2YuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBmLnNsaWNlKDEpfVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuXG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInNwYWNlLXktNCBtYi0yNFwiPlxuICAgICAgICAgIHtmaWx0ZXJlZFRhc2tzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHAtMTIgdGV4dC1jZW50ZXIgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNnhsIG1iLTRcIj5cdUQ4M0RcdURDREQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIG1iLTJcIj5ObyB0YXNrcyB5ZXQ8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyID09PSAnYWxsJyA/ICdTdGFydCBieSBhZGRpbmcgeW91ciBmaXJzdCB0YXNrIScgOiBgTm8gJHtmaWx0ZXJ9IHRhc2tzIGZvdW5kYH1cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBmaWx0ZXJlZFRhc2tzLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICA8VGFza0NhcmRcbiAgICAgICAgICAgICAgICBrZXk9e3Rhc2suaWR9XG4gICAgICAgICAgICAgICAgdGFzaz17dGFza31cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gZGlzcGF0Y2godG9nZ2xlVGFzayh0YXNrLmlkKSl9XG4gICAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IGRpc3BhdGNoKGRlbGV0ZVRhc2sodGFzay5pZCkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICApfVxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFByZXNzYWJsZVxuICAgICAgICAgIG9uUHJlc3M9eygpID0+IHNldFNob3dNb2RhbCh0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMjQgcmlnaHQtOCB3LTE2IGgtMTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgc2hhZG93LTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTQwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC0zeGwgZm9udC1saWdodFwiPis8L1RleHQ+XG4gICAgICAgIDwvUHJlc3NhYmxlPlxuXG4gICAgICAgIHtzaG93TW9kYWwgJiYgKFxuICAgICAgICAgIDxBZGRUYXNrTW9kYWxcbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICBvbkFkZD17aGFuZGxlQWRkVGFza31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gQ2F0ZWdvcmllcyBQYWdlIENvbXBvbmVudCAgXG5mdW5jdGlvbiBDYXRlZ29yaWVzUGFnZSgpIHtcbiAgY29uc3QgY2F0ZWdvcmllcyA9IFtcbiAgICB7IG5hbWU6ICdXb3JrJywgY291bnQ6IDgsIGNvbG9yOiAnZnJvbS1ibHVlLTUwMCB0by1ibHVlLTYwMCcsIGljb246ICdcdUQ4M0RcdURDQkMnIH0sXG4gICAgeyBuYW1lOiAnUGVyc29uYWwnLCBjb3VudDogNSwgY29sb3I6ICdmcm9tLXB1cnBsZS01MDAgdG8tcHVycGxlLTYwMCcsIGljb246ICdcdUQ4M0NcdURGRTAnIH0sXG4gICAgeyBuYW1lOiAnU2hvcHBpbmcnLCBjb3VudDogMywgY29sb3I6ICdmcm9tLXBpbmstNTAwIHRvLXBpbmstNjAwJywgaWNvbjogJ1x1RDgzRFx1REVDRFx1RkUwRicgfSxcbiAgICB7IG5hbWU6ICdIZWFsdGgnLCBjb3VudDogNCwgY29sb3I6ICdmcm9tLWdyZWVuLTUwMCB0by1ncmVlbi02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0FBJyB9LFxuICAgIHsgbmFtZTogJ1N0dWR5JywgY291bnQ6IDYsIGNvbG9yOiAnZnJvbS15ZWxsb3ctNTAwIHRvLXllbGxvdy02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0RBJyB9LFxuICAgIHsgbmFtZTogJ0ZpbmFuY2UnLCBjb3VudDogMiwgY29sb3I6ICdmcm9tLWVtZXJhbGQtNTAwIHRvLWVtZXJhbGQtNjAwJywgaWNvbjogJ1x1RDgzRFx1RENCMCcgfSxcbiAgICB7IG5hbWU6ICdUcmF2ZWwnLCBjb3VudDogMSwgY29sb3I6ICdmcm9tLWN5YW4tNTAwIHRvLWN5YW4tNjAwJywgaWNvbjogJ1x1MjcwOFx1RkUwRicgfSxcbiAgICB7IG5hbWU6ICdPdGhlcicsIGNvdW50OiAzLCBjb2xvcjogJ2Zyb20tZ3JheS01MDAgdG8tZ3JheS02MDAnLCBpY29uOiAnXHVEODNEXHVEQ0NDJyB9XG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8U2Nyb2xsVmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInB4LTQgcHktOFwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS12aW9sZXQtNjAwIHRvLWZ1Y2hzaWEtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50IG1iLTJcIj5cbiAgICAgICAgICAgIENhdGVnb3JpZXNcbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCB0ZXh0LWxnXCI+T3JnYW5pemUgdGFza3MgYnkgY2F0ZWdvcnk8L1RleHQ+XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1iLTI0XCI+XG4gICAgICAgICAge2NhdGVnb3JpZXMubWFwKChjYXRlZ29yeSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxQcmVzc2FibGUga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgcC01IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9e2B3LTE0IGgtMTQgYmctZ3JhZGllbnQtdG8tciAke2NhdGVnb3J5LmNvbG9yfSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTNgfT5cbiAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPntjYXRlZ29yeS5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj57Y2F0ZWdvcnkubmFtZX08L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPntjYXRlZ29yeS5jb3VudH0gdGFza3M8L1RleHQ+XG4gICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gU3RhdGlzdGljcyBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gU3RhdGlzdGljc1BhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwibWItOFwiPlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBtYi0yXCI+XG4gICAgICAgICAgICBTdGF0aXN0aWNzXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1sZ1wiPlRyYWNrIHlvdXIgcHJvZHVjdGl2aXR5PC9UZXh0PlxuICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNCBtYi0yNFwiPlxuICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IHRpdGxlOiAnTW9zdCBQcm9kdWN0aXZlJywgdmFsdWU6ICdXZWRuZXNkYXknLCBpY29uOiAnXHVEODNEXHVEQ0M4JywgY29sb3I6ICdmcm9tLWdyZWVuLTUwMCB0by1ncmVlbi02MDAnIH0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnQ29tcGxldGlvbiBSYXRlJywgdmFsdWU6ICc4MiUnLCBpY29uOiAnXHVEODNDXHVERkFGJywgY29sb3I6ICdmcm9tLWJsdWUtNTAwIHRvLWJsdWUtNjAwJyB9LFxuICAgICAgICAgICAgeyB0aXRsZTogJ1RpbWUgU2F2ZWQnLCB2YWx1ZTogJzEyIGhvdXJzJywgaWNvbjogJ1x1MjNGMVx1RkUwRicsIGNvbG9yOiAnZnJvbS1wdXJwbGUtNTAwIHRvLXB1cnBsZS02MDAnIH0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnU3RyZWFrIFJlY29yZCcsIHZhbHVlOiAnMTQgZGF5cycsIGljb246ICdcdUQ4M0RcdUREMjUnLCBjb2xvcjogJ2Zyb20tb3JhbmdlLTUwMCB0by1vcmFuZ2UtNjAwJyB9XG4gICAgICAgICAgXS5tYXAoKGluc2lnaHQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8VmlldyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTIgaC0xMiBiZy1ncmFkaWVudC10by1yICR7aW5zaWdodC5jb2xvcn0gcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0zYH0+XG4gICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj57aW5zaWdodC5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbWItMVwiPntpbnNpZ2h0LnRpdGxlfTwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTgwMFwiPntpbnNpZ2h0LnZhbHVlfTwvVGV4dD5cbiAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvU2Nyb2xsVmlldz5cbiAgKTtcbn1cblxuLy8gUHJvZmlsZSBQYWdlIENvbXBvbmVudFxuZnVuY3Rpb24gUHJvZmlsZVBhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPFNjcm9sbFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJweC00IHB5LThcIj5cbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiaXRlbXMtY2VudGVyIG1iLThcIj5cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJ3LTI0IGgtMjQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtNHhsIHRleHQtd2hpdGVcIj5cdUQ4M0RcdURDNjQ8L1RleHQ+XG4gICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTFcIj5Kb2huIERvZTwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+am9obi5kb2VAZXhhbXBsZS5jb208L1RleHQ+XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1iLThcIj5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBsYWJlbDogJ0NvbXBsZXRlZCcsIHZhbHVlOiAnMTI3JywgaWNvbjogJ1x1MjcwNScgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdBY3RpdmUnLCB2YWx1ZTogJzEyJywgaWNvbjogJ1x1RDgzRFx1RENERCcgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdTdHJlYWsnLCB2YWx1ZTogJzcnLCBpY29uOiAnXHVEODNEXHVERDI1JyB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ1BvaW50cycsIHZhbHVlOiAnMSwyNTAnLCBpY29uOiAnXHUyQjUwJyB9XG4gICAgICAgICAgXS5tYXAoKHN0YXQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8VmlldyBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT1cInRleHQtM3hsIG1iLTJcIj57c3RhdC5pY29ufTwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtdmlvbGV0LTYwMCBtYi0xXCI+e3N0YXQudmFsdWV9PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj57c3RhdC5sYWJlbH08L1RleHQ+XG4gICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvVmlldz5cblxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIG1iLTI0XCI+XG4gICAgICAgICAge1snTm90aWZpY2F0aW9ucycsICdUaGVtZScsICdMYW5ndWFnZScsICdQcml2YWN5JywgJ0hlbHAnLCAnTG9nb3V0J10ubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPFByZXNzYWJsZSBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2BweC00IHB5LTQgZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7aW5kZXggIT09IDUgPyAnYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwJyA6ICcnfWB9PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktODAwIGZvbnQtbWVkaXVtXCI+e2l0ZW19PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+XHUyMDNBPC9UZXh0PlxuICAgICAgICAgICAgPC9QcmVzc2FibGU+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvVmlldz5cbiAgICAgIDwvVmlldz5cbiAgICA8L1Njcm9sbFZpZXc+XG4gICk7XG59XG5cbi8vIE1haW4gSG9tZSBDb21wb25lbnQgd2l0aCBUYWIgTmF2aWdhdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCd0YXNrcycpO1xuXG4gIGNvbnN0IHJlbmRlckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgIGNhc2UgJ3Rhc2tzJzpcbiAgICAgICAgcmV0dXJuIDxUYXNrc1BhZ2UgLz47XG4gICAgICBjYXNlICdjYXRlZ29yaWVzJzpcbiAgICAgICAgcmV0dXJuIDxDYXRlZ29yaWVzUGFnZSAvPjtcbiAgICAgIGNhc2UgJ3N0YXRpc3RpY3MnOlxuICAgICAgICByZXR1cm4gPFN0YXRpc3RpY3NQYWdlIC8+O1xuICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgIHJldHVybiA8UHJvZmlsZVBhZ2UgLz47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPFRhc2tzUGFnZSAvPjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbmF2SXRlbXMgPSBbXG4gICAgeyBpZDogJ3Rhc2tzJywgbGFiZWw6ICdUYXNrcycsIGljb246ICdcdUQ4M0RcdURDREQnLCBhY3RpdmVJY29uOiAnXHUyNzA1JyB9LFxuICAgIHsgaWQ6ICdjYXRlZ29yaWVzJywgbGFiZWw6ICdDYXRlZ29yaWVzJywgaWNvbjogJ1x1RDgzRFx1RENDMScsIGFjdGl2ZUljb246ICdcdUQ4M0RcdURDQzInIH0sXG4gICAgeyBpZDogJ3N0YXRpc3RpY3MnLCBsYWJlbDogJ1N0YXRzJywgaWNvbjogJ1x1RDgzRFx1RENDQScsIGFjdGl2ZUljb246ICdcdUQ4M0RcdURDQzgnIH0sXG4gICAgeyBpZDogJ3Byb2ZpbGUnLCBsYWJlbDogJ1Byb2ZpbGUnLCBpY29uOiAnXHVEODNEXHVEQzY0JywgYWN0aXZlSWNvbjogJ1x1RDgzRFx1REM2OCcgfVxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tdmlvbGV0LTUwIHZpYS1wdXJwbGUtNTAgdG8tZnVjaHNpYS01MFwiPlxuICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICA8VmlldyBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAge3JlbmRlckNvbnRlbnQoKX1cbiAgICAgIDwvVmlldz5cblxuICAgICAgey8qIEJvdHRvbSBOYXZpZ2F0aW9uICovfVxuICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgYmctd2hpdGUgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHNoYWRvdy1sZyB6LTUwXCI+XG4gICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYXJvdW5kIHB4LTIgcHktM1wiPlxuICAgICAgICAgIHtuYXZJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFByZXNzYWJsZVxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICBvblByZXNzPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7aXNBY3RpdmUgPyAndHJhbnNmb3JtIHNjYWxlLTExMCcgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YHctMTIgaC0xMiByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0xICR7aXNBY3RpdmUgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAnIDogJ2JnLXRyYW5zcGFyZW50J31gfT5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNBY3RpdmUgPyBpdGVtLmFjdGl2ZUljb24gOiBpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIDwvVmlldz5cbiAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1tZWRpdW0gJHtpc0FjdGl2ZSA/ICd0ZXh0LXZpb2xldC02MDAnIDogJ3RleHQtZ3JheS02MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvVmlldz5cbiAgKTtcbn0iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFZpZXcsIFRleHQsIFNhZmVBcmVhVmlldywgUHJlc3NhYmxlIH0gZnJvbSAnaW5kanMnO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuLi91dGlscy9zdG9yZSc7XG5pbXBvcnQgQm90dG9tTmF2IGZyb20gJy4uL2NvbXBvbmVudHMvQm90dG9tTmF2JztcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF5b3V0KHsgY2hpbGRyZW4sIHBhdGggfSkge1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKCd0YXNrcycpO1xuICBjb25zdCBbcGFnZUNvbnRlbnQsIHNldFBhZ2VDb250ZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIC8vIExvYWQgcGFnZSBjb250ZW50IGR5bmFtaWNhbGx5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZFBhZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgUGFnZUNvbXBvbmVudDtcbiAgICAgICAgc3dpdGNoIChjdXJyZW50UGFnZSkge1xuICAgICAgICAgIGNhc2UgJ2NhdGVnb3JpZXMnOlxuICAgICAgICAgICAgUGFnZUNvbXBvbmVudCA9IChhd2FpdCBpbXBvcnQoJy4vY2F0ZWdvcmllcycpKS5kZWZhdWx0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3RhdGlzdGljcyc6XG4gICAgICAgICAgICBQYWdlQ29tcG9uZW50ID0gKGF3YWl0IGltcG9ydCgnLi9zdGF0aXN0aWNzJykpLmRlZmF1bHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgICAgIFBhZ2VDb21wb25lbnQgPSAoYXdhaXQgaW1wb3J0KCcuL3Byb2ZpbGUnKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Rhc2tzJzpcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgUGFnZUNvbXBvbmVudCA9IChhd2FpdCBpbXBvcnQoJy4vaW5kZXgnKSkuZGVmYXVsdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHNldFBhZ2VDb250ZW50KDxQYWdlQ29tcG9uZW50IC8+KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgcGFnZTonLCBlcnJvcik7XG4gICAgICAgIHNldFBhZ2VDb250ZW50KGNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZFBhZ2UoKTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBjaGlsZHJlbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8U2FmZUFyZWFWaWV3IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JhZGllbnQtdG8tYnIgZnJvbS12aW9sZXQtNTAgdmlhLXB1cnBsZS01MCB0by1mdWNoc2lhLTUwXCI+XG4gICAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJiZy13aGl0ZSBzaGFkb3ctbWQgc3RpY2t5IHRvcC0wIHotNDAgYmFja2Ryb3AtYmx1ci1sZyBiZy1vcGFjaXR5LTkwXCI+XG4gICAgICAgICAgICA8VmlldyBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHB5LTRcIj5cbiAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cInctMTAgaC0xMCBiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXdoaXRlXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPXsyfSBkPVwiTTkgNUg3YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMmgxMGEyIDIgMCAwMDItMlY3YTIgMiAwIDAwLTItMmgtMk05IDVhMiAyIDAgMDAyIDJoMmEyIDIgMCAwMDItMk05IDVhMiAyIDAgMDEyLTJoMmEyIDIgMCAwMTIgMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXZpb2xldC02MDAgdG8tZnVjaHNpYS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgVGFza0Zsb3dcbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgICAgICAgICA8UHJlc3NhYmxlIGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIGJnLWdyYXktMTAwIGhvdmVyOmJnLWdyYXktMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwidGV4dC14bFwiPlx1RDgzRFx1REQxNDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8L1ByZXNzYWJsZT5cbiAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgIDwvVmlldz5cblxuICAgICAgICAgIHsvKiBNYWluIENvbnRlbnQgKi99XG4gICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwicGItMjRcIj5cbiAgICAgICAgICAgIHtwYWdlQ29udGVudCB8fCBjaGlsZHJlbn1cbiAgICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgICB7LyogQm90dG9tIE5hdmlnYXRpb24gKi99XG4gICAgICAgICAgPEJvdHRvbU5hdiBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9IG9uTmF2aWdhdGU9e3NldEN1cnJlbnRQYWdlfSAvPlxuICAgICAgICA8L1ZpZXc+XG4gICAgICA8L1NhZmVBcmVhVmlldz5cbiAgICA8L1Byb3ZpZGVyPlxuICApO1xufSIsICJpbXBvcnQgeyBjb25maWd1cmVTdG9yZSB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xyXG5pbXBvcnQgdGFza1JlZHVjZXIgZnJvbSAnLi90YXNrU2xpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xyXG4gICAgcmVkdWNlcjoge1xyXG4gICAgICAgIHRhc2tzOiB0YXNrUmVkdWNlclxyXG4gICAgfVxyXG59KTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFZpZXcsIFByZXNzYWJsZSwgVGV4dCB9IGZyb20gJ2luZGpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJvdHRvbU5hdih7IGN1cnJlbnRQYWdlID0gJ3Rhc2tzJywgb25OYXZpZ2F0ZSB9KSB7XHJcbiAgICBjb25zdCBuYXZJdGVtcyA9IFtcclxuICAgICAgICB7IGlkOiAndGFza3MnLCBsYWJlbDogJ1Rhc2tzJywgaWNvbjogJ1x1RDgzRFx1RENERCcsIGFjdGl2ZUljb246ICdcdTI3MDUnIH0sXHJcbiAgICAgICAgeyBpZDogJ2NhdGVnb3JpZXMnLCBsYWJlbDogJ0NhdGVnb3JpZXMnLCBpY29uOiAnXHVEODNEXHVEQ0MxJywgYWN0aXZlSWNvbjogJ1x1RDgzRFx1RENDMicgfSxcclxuICAgICAgICB7IGlkOiAnc3RhdGlzdGljcycsIGxhYmVsOiAnU3RhdHMnLCBpY29uOiAnXHVEODNEXHVEQ0NBJywgYWN0aXZlSWNvbjogJ1x1RDgzRFx1RENDOCcgfSxcclxuICAgICAgICB7IGlkOiAncHJvZmlsZScsIGxhYmVsOiAnUHJvZmlsZScsIGljb246ICdcdUQ4M0RcdURDNjQnLCBhY3RpdmVJY29uOiAnXHVEODNEXHVEQzY4JyB9XHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFZpZXcgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgYmctd2hpdGUgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHNoYWRvdy1sZyB6LTUwXCI+XHJcbiAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYXJvdW5kIHB4LTIgcHktMyBwYi1zYWZlXCI+XHJcbiAgICAgICAgICAgICAgICB7bmF2SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gY3VycmVudFBhZ2UgPT09IGl0ZW0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFByZXNzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uTmF2aWdhdGUoaXRlbS5pZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke2lzQWN0aXZlID8gJ3RyYW5zZm9ybSBzY2FsZS0xMTAnIDogJyd9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZpZXcgY2xhc3NOYW1lPXtgdy0xMiBoLTEyIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1iLTEgJHtpc0FjdGl2ZSA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tdmlvbGV0LTYwMCB0by1mdWNoc2lhLTYwMCcgOiAnYmctdHJhbnNwYXJlbnQnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aXZlID8gaXRlbS5hY3RpdmVJY29uIDogaXRlbS5pY29ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1tZWRpdW0gJHtpc0FjdGl2ZSA/ICd0ZXh0LXZpb2xldC02MDAnIDogJ3RleHQtZ3JheS02MDAnfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUHJlc3NhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9WaWV3PlxyXG4gICAg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QSxNQUN6QjtBQUFBLElBQ0Y7QUFFQSxhQUFTO0FBQUEsRUFDWCxHQUFHLENBQUMsYUFBYSxRQUFRLENBQUM7QUFFMUIsU0FDRSxnQkFBQUEsTUFBQyxZQUFTLE9BQ1IsMEJBQUFBLE1BQUMsMEJBQWEsV0FBVSxVQUN0QiwwQkFBQUMsT0FBQyxnQkFBSyxXQUFVLDZFQUVkO0FBQUEsb0JBQUFELE1BQUMsZ0JBQUssV0FBVSx1RUFDZCwwQkFBQUEsTUFBQyxnQkFBSyxXQUFVLCtCQUNkLDBCQUFBQyxPQUFDLGdCQUFLLFdBQVUscUNBQ2Q7QUFBQSxzQkFBQUEsT0FBQyxnQkFBSyxXQUFVLDJCQUNkO0FBQUEsd0JBQUFELE1BQUMsZ0JBQUssV0FBVSx5R0FDZCwwQkFBQUEsTUFBQyxTQUFJLFdBQVUsc0JBQXFCLE1BQUssUUFBTyxTQUFRLGFBQVksUUFBTyxnQkFDekUsMEJBQUFBLE1BQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxhQUFhLEdBQUcsR0FBRSxtSUFBa0ksR0FDek0sR0FDRjtBQUFBLFFBQ0EsZ0JBQUFBLE1BQUMsZ0JBQUssV0FBVSxtR0FBa0csc0JBRWxIO0FBQUEsU0FDRjtBQUFBLE1BRUEsZ0JBQUFBLE1BQUMscUJBQVUsV0FBVSxzSEFDbkIsMEJBQUFBLE1BQUMsZ0JBQUssV0FBVSxXQUFVLHVCQUFFLEdBQzlCO0FBQUEsT0FDRixHQUNGLEdBQ0Y7QUFBQSxJQUdBLGdCQUFBQSxNQUFDLGdCQUFLLFdBQVUsU0FDYix5QkFBZSxVQUNsQjtBQUFBLElBR0EsZ0JBQUFBLE1BQUMsYUFBVSxhQUEwQixZQUFZLGdCQUFnQjtBQUFBLEtBQ25FLEdBQ0YsR0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogWyJwbGF0Zm9ybSIsICJTdHlsZVNoZWV0IiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgIlJlYWN0IiwgIlJlYWN0IiwgImZvcndhcmRSZWYiLCAianN4IiwgImpzeHMiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiUmVhY3QiLCAiZm9yd2FyZFJlZiIsICJqc3giLCAiRXZlbnRFbWl0dGVyIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgInVzZVN0YXRlIiwgImpzeCIsICJqc3hzIiwgIlJlYWN0IiwgInVzZVN0YXRlIiwgIlJlYWN0IiwgImpzeCIsICJqc3hzIiwgImpzeCIsICJqc3hzIiwgInVzZVN0YXRlIl0KfQo=

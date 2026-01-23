import React, { forwardRef } from "react";
import { resolveElement } from "../universal/resolve.js";
import StyleSheet from "../apis/style-sheet.mjs";

const Image = forwardRef(({ style, source, src, className, ...rest }, ref) => {
  const Component = resolveElement("image");

  // React Native uses 'source', Web uses 'src'.
  // We support both props for universal usage.
  const imageSource = src || (source && source.uri) || "";

  const props = {
    ...rest,
    src: imageSource,
    className: className || "",
    ref,
  };

  if (Component !== "img" && Component !== "image") {
    // If it refers to React Native Image, it expects 'source'
    props.source = source || { uri: src };
    delete props.src;
  }

  const flatStyle = StyleSheet.flatten([style]);

  return <Component style={flatStyle} {...props} />;
});

Image.displayName = "Image";
export default Image;

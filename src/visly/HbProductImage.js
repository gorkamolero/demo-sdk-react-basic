// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import "./textstyles/fonts.css";
import "./reset.css";
import "./HbProductImage.css";
import React, { createContext, useContext } from "react";
import {
  exists,
  findSetVariantProps,
  makeCompositeDefaultProps,
} from "./_internal_utils";
import { RootPrimitive, ImagePrimitive } from "./_internal_primitives";

const styles = [
  {
    type: "default",
    layers: {},
  },
];

const defaultPropValues = [
  {
    type: "default",
    layers: {},
  },
];

const variantPropTypes = [];

export const HbProductImageContext = createContext(null);

function HbProductImage(_props) {
  const defaults = useContext(HbProductImageContext);
  const props = { ...defaults, ..._props };
  const activeVariants = findSetVariantProps(variantPropTypes, props);
  const getCompositeDefaultProps = makeCompositeDefaultProps(
    defaultPropValues,
    activeVariants
  );
  return (
    <RootPrimitive
      {...props}
      key="QVF4nDf297"
      addSpacing={false}
      internal={{
        projectId: "WDRq65T88Q",
        styles: styles,
        layerId: "QVF4nDf297",
        scope: "13VgZzAk6w",
        activeVariants: activeVariants,
      }}
    >
      {(getStyle) => (
        <ImagePrimitive
          id={"Image_SLVLpMy2sC"}
          className={
            "__visly_reset_WDRq65T88Q __visly_scope_13VgZzAk6w_SLVLpMy2sC"
          }
          key={"SLVLpMy2sC"}
          src={
            exists(props.imageSrc)
              ? props.imageSrc
              : getStyle("SLVLpMy2sC", "src")
          }
          alt={getStyle("SLVLpMy2sC", "alternateText")}
        />
      )}
    </RootPrimitive>
  );
}

HbProductImage.__variants = [];

export default HbProductImage;
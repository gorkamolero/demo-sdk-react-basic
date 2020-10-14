// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import "./textstyles/fonts.css";
import "./reset.css";
import "./HbContainer.css";
import React, { createContext, useContext } from "react";
import {
  findSetVariantProps,
  makeCompositeDefaultProps,
} from "./_internal_utils";
import { RootPrimitive, ContainerPrimitive } from "./_internal_primitives";

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

export const HbContainerContext = createContext(null);

function HbContainer(_props) {
  const defaults = useContext(HbContainerContext);
  const props = { ...defaults, ..._props };
  const activeVariants = findSetVariantProps(variantPropTypes, props);
  const getCompositeDefaultProps = makeCompositeDefaultProps(
    defaultPropValues,
    activeVariants
  );
  return (
    <RootPrimitive
      {...props}
      key="GWx7RTdU26"
      addSpacing={false}
      internal={{
        styles: styles,
        layerId: "GWx7RTdU26",
        scope: "CxRUtrqf5J",
        activeVariants: activeVariants,
      }}
    >
      <ContainerPrimitive
        key={"863xCtrSQi"}
        className={"__visly_reset __visly_scope_CxRUtrqf5J_863xCtrSQi"}
        addSpacing={false}
      >
        {props.children}
      </ContainerPrimitive>
    </RootPrimitive>
  );
}

HbContainer.__variants = [];

export default HbContainer;
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import "../textstyles/fonts.css";
import "./reset.css";
import "./HbProgressStep.css";
import React, { createContext, useContext } from "react";
import {
  exists,
  findSetVariantProps,
  makeCompositeDefaultProps,
} from "./_internal_utils";
import { RootPrimitive, TextPrimitive } from "./_internal_primitives";
import HbProgressButtonComposite, {
  HbProgressButtonContext,
} from "./HbProgressButton";

const styles = [
  {
    type: "default",
    layers: {
      LBFyBTbXXd: {
        none: {
          text: "Step",
        },
      },
    },
  },
];

const defaultPropValues = [
  {
    type: "default",
    layers: {
      "7PiDDbURMp": {},
    },
  },
];

const variantPropTypes = [];

export const HbProgressStepContext = createContext(null);

function HbProgressStep(_props) {
  const defaults = useContext(HbProgressStepContext);
  const props = { ...defaults, ..._props };
  const activeVariants = findSetVariantProps(variantPropTypes, props);
  const getCompositeDefaultProps = makeCompositeDefaultProps(
    defaultPropValues,
    activeVariants
  );
  return (
    <RootPrimitive
      {...props}
      key="E1DeTUQrkS"
      addSpacing={false}
      internal={{
        styles: styles,
        layerId: "E1DeTUQrkS",
        scope: "7Sa8f1s9gz",
        activeVariants: activeVariants,
      }}
    >
      {(getStyle) => [
        <TextPrimitive
          className={"__visly_reset __visly_scope_7Sa8f1s9gz_LBFyBTbXXd"}
          key={"LBFyBTbXXd"}
          text={
            exists(props.stepTitle)
              ? props.stepTitle
              : getStyle("LBFyBTbXXd", "text")
          }
        />,
        props.HbProgressButton === undefined ? (
          <HbProgressButtonComposite
            key={"7PiDDbURMp"}
            {...getCompositeDefaultProps("7PiDDbURMp")}
            className="__visly_reset __visly_scope_7Sa8f1s9gz_7PiDDbURMp"
          />
        ) : (
          <HbProgressButtonContext.Provider
            key="7PiDDbURMp-provider"
            value={{
              key: "7PiDDbURMp",
              className: "__visly_reset __visly_scope_7Sa8f1s9gz_7PiDDbURMp",
              ...getCompositeDefaultProps("7PiDDbURMp"),
            }}
          >
            {props.HbProgressButton}
          </HbProgressButtonContext.Provider>
        ),
      ]}
    </RootPrimitive>
  );
}

HbProgressStep.HbProgressButton = HbProgressButtonComposite;
HbProgressStep.__variants = [];

export default HbProgressStep;
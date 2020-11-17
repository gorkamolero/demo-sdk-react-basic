import * as colors from './colors';
import * as textstyles from './textstyles';
import * as icons from './icons';
import * as sizes from './sizes';
import * as shadows from './shadows';
import * as __refs__ from './__refs__';
export { icons, textstyles, colors, sizes, shadows, __refs__ };
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
export function setBreakpoints(rule: 'min-width' | 'max-width', breaks: string[]);
export function useBreakpoint<T extends string, R extends ReadonlyArray<string>>(def: T, variants: R): T | ElementType<R>;
import React from "react";
export interface CommonProps<T extends HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
  innerRef?: React.MutableElementRef<T> | React.RefCallback<T>;
  tabIndex?: number;
  role?: string;
  testId?: string;
  disabled?: boolean;
  onAuxClick?: React.MouseEventHandler<T>;
  onAuxClickCapture?: React.MouseEventHandler<T>;
  onClick?: React.MouseEventHandler<T>;
  onClickCapture?: React.MouseEventHandler<T>;
  onContextMenu?: React.MouseEventHandler<T>;
  onContextMenuCapture?: React.MouseEventHandler<T>;
  onDoubleClick?: React.MouseEventHandler<T>;
  onDoubleClickCapture?: React.MouseEventHandler<T>;
  onDrag?: React.DragEventHandler<T>;
  onDragCapture?: React.DragEventHandler<T>;
  onDragEnd?: React.DragEventHandler<T>;
  onDragEndCapture?: React.DragEventHandler<T>;
  onDragEnter?: React.DragEventHandler<T>;
  onDragEnterCapture?: React.DragEventHandler<T>;
  onDragExit?: React.DragEventHandler<T>;
  onDragExitCapture?: React.DragEventHandler<T>;
  onDragLeave?: React.DragEventHandler<T>;
  onDragLeaveCapture?: React.DragEventHandler<T>;
  onDragOver?: React.DragEventHandler<T>;
  onDragOverCapture?: React.DragEventHandler<T>;
  onDragStart?: React.DragEventHandler<T>;
  onDragStartCapture?: React.DragEventHandler<T>;
  onDrop?: React.DragEventHandler<T>;
  onDropCapture?: React.DragEventHandler<T>;
  onMouseDown?: React.MouseEventHandler<T>;
  onMouseDownCapture?: React.MouseEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
  onMouseMove?: React.MouseEventHandler<T>;
  onMouseMoveCapture?: React.MouseEventHandler<T>;
  onMouseOut?: React.MouseEventHandler<T>;
  onMouseOutCapture?: React.MouseEventHandler<T>;
  onMouseOver?: React.MouseEventHandler<T>;
  onMouseOverCapture?: React.MouseEventHandler<T>;
  onMouseUp?: React.MouseEventHandler<T>;
  onMouseUpCapture?: React.MouseEventHandler<T>;
  onTouchCancel?: React.TouchEventHandler<T>;
  onTouchCancelCapture?: React.TouchEventHandler<T>;
  onTouchEnd?: React.TouchEventHandler<T>;
  onTouchEndCapture?: React.TouchEventHandler<T>;
  onTouchMove?: React.TouchEventHandler<T>;
  onTouchMoveCapture?: React.TouchEventHandler<T>;
  onTouchStart?: React.TouchEventHandler<T>;
  onTouchStartCapture?: React.TouchEventHandler<T>;
  onPointerDown?: React.PointerEventHandler<T>;
  onPointerDownCapture?: React.PointerEventHandler<T>;
  onPointerMove?: React.PointerEventHandler<T>;
  onPointerMoveCapture?: React.PointerEventHandler<T>;
  onPointerUp?: React.PointerEventHandler<T>;
  onPointerUpCapture?: React.PointerEventHandler<T>;
  onPointerCancel?: React.PointerEventHandler<T>;
  onPointerCancelCapture?: React.PointerEventHandler<T>;
  onPointerEnter?: React.PointerEventHandler<T>;
  onPointerLeave?: React.PointerEventHandler<T>;
  onPointerOver?: React.PointerEventHandler<T>;
  onPointerOverCapture?: React.PointerEventHandler<T>;
  onPointerOut?: React.PointerEventHandler<T>;
  onPointerOutCapture?: React.PointerEventHandler<T>;
  onGotPointerCapture?: React.PointerEventHandler<T>;
  onGotPointerCaptureCapture?: React.PointerEventHandler<T>;
  onLostPointerCapture?: React.PointerEventHandler<T>;
  onLostPointerCaptureCapture?: React.PointerEventHandler<T>;
  onScroll?: React.UIEventHandler<T>;
  onScrollCapture?: React.UIEventHandler<T>;
  onWheel?: React.WheelEventHandler<T>;
  onWheelCapture?: React.WheelEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyDownCapture?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onKeyPressCapture?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onKeyUpCapture?: React.KeyboardEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  onFocusCapture?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  onBlurCapture?: React.FocusEventHandler<T>;
}
export const Avatar: {
  (props: {
    src?: string;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const CommentButton: {
  (props: {
    text?: string;
    icon?: string;
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbButton: {
  (props: {
    text?: string;
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
    variant?: "contained";
    withProgress?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbButtonGroup: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbButtonWithIcon: {
  (props: {
    text?: string;
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
    variant?: "contained";
    noIcon?: boolean;
    withProgress?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbCheckbox: {
  (props: {
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbCheckbox2: {
  (props: {
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbCheckboxGroup: {
  (props: {
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
    column?: boolean;
    HbIconButton?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbIconButton: typeof HbIconButton;
};
export const HbCircleIcon: {
  (props: {
    icon?: string;
    HbYellowIcon?: boolean;
    size?: "small";
    justEmoji?: boolean;
    HbGoldIcon?: boolean;
    down?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbCloseModal: {
  (props: {
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbContainer: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbContent: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
    size?: "small";
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbFirstSlideFooter: {
  (props: {
    size?: "medium" | "large" | "small";
    HbFooterRectangle?: React.ReactNode;
    HbFooterRectangle1?: React.ReactNode;
    HbFooterRectangle2?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbFooterRectangle: typeof HbFooterRectangle;
  HbFooterRectangle1: typeof HbFooterRectangle;
  HbFooterRectangle2: typeof HbFooterRectangle;
};
export const HbFooterRectangle: {
  (props: {
    icon?: string;
    title?: string;
    subtitle?: string;
    size?: "medium" | "large";
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbFormElement: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbHeader: {
  (props: {
    bg?: string;
    discount?: string;
    extraImage?: string;
    extraImageT?: string;
    TitleSlot?: React.ReactNode | React.ReactNode[];
    SubtitleSlot?: React.ReactNode | React.ReactNode[];
    ExtraChildren?: React.ReactNode | React.ReactNode[];
    discount2?: string;
    NoWave?: boolean;
    withVideo?: boolean;
    size?: "small" | "medium" | "super";
    ShowImage?: boolean;
    noTitleNoSubtitle?: boolean;
    HbCircleIcon?: React.ReactNode;
    HbProgress?: React.ReactNode;
    HbLogo?: React.ReactNode;
    HbProgressMobile?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbCircleIcon: typeof HbCircleIcon;
  HbProgress: typeof HbProgress;
  HbLogo: typeof HbLogo;
  HbProgressMobile: typeof HbProgress;
};
export const HbHelper: {
  (props: {
    selected?: string | string[] | Set<string>;
    onSelect: (values: Set<string>) => void;
    selectionMode?: 'none' | 'single' | 'multiple';
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Item: {
    (props: {
      label?: string;
      value: string;
      selected?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const HbIconButton: {
  (props: {
    text?: string;
    icon?: string;
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
    column?: boolean;
    noIcon?: boolean;
    size?: "small";
    HbIconButtonSelected?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbInput: {
  (props: {
    placeholder?: string;
    children?: React.ReactNode | React.ReactNode[];
    value?: string;
    onChange?: (value: string) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    inputProps?: CommonProps<HTMLInputElement>;
    type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number';
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    size?: "small" | "medium" | "large" | "super";
    notValid?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbKibblePlan: {
  (props: {
    stack?: boolean;
    HbKibblePlanElement?: React.ReactNode;
    HbKibblePlanElement1?: React.ReactNode;
    HbKibblePlanElement2?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbKibblePlanElement: typeof HbKibblePlanElement;
  HbKibblePlanElement1: typeof HbKibblePlanElement;
  HbKibblePlanElement2: typeof HbKibblePlanElement;
};
export const HbKibblePlanElement: {
  (props: {
    icon?: string;
    slot1?: string;
    slot2?: string;
    vertical?: boolean;
    NoNext?: boolean;
    HbCircleIcon?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbCircleIcon: typeof HbCircleIcon;
};
export const HbLinkButton: {
  (props: {
    text?: string;
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbLogo: {
  (props: {
    size?: "small";
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbOnlyIconButton: {
  (props: {
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbPopover: {
  (props: {
    triggerRef: React.RefObject<any>;
    placement?: 'bottom start' | 'bottom right' | 'bottom start' | 'bottom end' | 'top' | 'top left' | 'top right' | 'top start' | 'top end' | 'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' | 'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom';
    offset?: number;
    crossOffset?: number;
    autoFocusFirst?: boolean;
    containFocus?: boolean;
    isOpen: boolean;
    onShouldClose?: () => void;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbProductImage: {
  (props: {
    imageSrc?: string;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbProgress: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
    HbProgressBar?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbProgressBar: typeof HbProgressBar;
};
export const HbProgressBar: {
  (props: {
    value?: number;
    golden?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbProgressButton: {
  (props: {
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
    HbProgressButtonActive?: boolean;
    HbProgressButtonEmpty?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbProgressStep: {
  (props: {
    stepTitle?: string;
    HbActiveStep?: boolean;
    HbFutureStep?: boolean;
    HbPastStep?: boolean;
    size?: "small" | "medium" | "large" | "super";
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbRadio: {
  (props: {
    value?: string;
    onChange: (value: string) => void;
    ariaLabel?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    HbRadioColumn?: boolean;
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Button: {
    (props: {
      title?: string;
      icon?: string;
      value?: string;
      selected?: boolean;
      fullWidth?: boolean;
      size?: "small" | "medium" | "large" | "super";
      column?: boolean;
      noIcon?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const HbResultsSwitch: {
  (props: {
    handlelabel?: string;
    rightLabel?: string;
    leftLabel?: string;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbSelect: {
  (props: {
    label?: string;
    selected?: string;
    onSelect: (value: string) => void;
    gap?: number;
    HbUnselected?: boolean;
    size?: "small" | "medium" | "large" | "super";
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Option: {
    (props: {
      label?: string;
      value: string;
      selected?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const HbSliderArrow: {
  (props: {
    reverse?: boolean;
    Component?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Component: {
    (props: {} & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const HbSliderArrowButton: {
  (props: {
    onPress?: (event: PressEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-expanded'?: boolean | string;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
    'aria-controls'?: string;
    reverse?: boolean;
    HbSliderArrow?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbSliderArrow: typeof HbSliderArrow;
};
export const HbTabs: {
  (props: {
    selected?: string;
    onSelect: (value: string) => void;
    ariaLabel?: string;
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Button: {
    (props: {
      text?: string;
      value?: string;
      selected?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const HbTag: {
  (props: {
    tagText?: string;
    size?: "small";
    HbOnlyIconButton?: React.ReactNode;
  } & CommonProps<HTMLDivElement>): JSX.Element;
  HbOnlyIconButton: typeof HbOnlyIconButton;
};
export const HbTitle: {
  (props: {
    children?: React.ReactNode | React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const HbWave: {
  (props: {
    double?: boolean;
    invert?: boolean;
    dark?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const Input: {
  (props: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    inputProps?: CommonProps<HTMLInputElement>;
    type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number';
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const LikeButton: {
  (props: {
    text?: string;
    icon?: string;
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
export const Segmented: {
  (props: {
    selected?: string;
    onSelect: (value: string) => void;
    ariaLabel?: string;
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Button: {
    (props: {
      text?: string;
      value?: string;
      selected?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const Select: {
  (props: {
    label?: string;
    selected?: string;
    onSelect: (value: string) => void;
    gap?: number;
    children?: React.ReactNode[];
  } & CommonProps<HTMLDivElement>): JSX.Element;
  Option: {
    (props: {
      label?: string;
      value: string;
      selected?: boolean;
    } & CommonProps<HTMLDivElement>): JSX.Element;
  };
};
export const Toggle: {
  (props: {
    onChange?: (checked: boolean) => void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-details'?: string;
    'aria-controls'?: string;
    checked?: boolean;
  } & CommonProps<HTMLDivElement>): JSX.Element;
};
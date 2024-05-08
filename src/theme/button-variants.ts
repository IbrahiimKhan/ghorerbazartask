export const buttonVariantsBase = {
  defaults: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'rounded-md',
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
  secondary: {
    backgroundColor: 'secondary',
    borderColor: 'secondary',
  },
  success: {
    backgroundColor: 'success',
    borderColor: 'success',
  },
  warning: {
    backgroundColor: 'warning',
    borderColor: 'warning',
  },
  danger: {
    backgroundColor: 'danger',
    borderColor: 'danger',
  },
  white: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  black: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
};

export type ButtonBaseType = Exclude<
  keyof typeof buttonVariantsBase,
  'defaults'
>;

export const buttonVariantsType = {
  defaults: {},
  contained: {
    borderWidth: 1,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  text: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

export type ButtonType = Exclude<keyof typeof buttonVariantsType, 'defaults'>;

export const buttonVariantsDisabled = {
  defaults: {},
  containedDisabled: {
    backgroundColor: 'secondary200',
    borderWidth: 0,
  },
  outlinedDisabled: {
    borderColor: 'secondary200',
  },
  textDisabled: {},
};

export type ButtonDisabledType = Exclude<
  keyof typeof buttonVariantsDisabled,
  'defaults'
>;

export const buttonTextVariants = {
  defaults: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    color: 'black',
  },
  primaryContained: {
    color: 'white',
  },
  primaryOutlined: {
    color: 'primary',
  },
  primaryText: {
    color: 'primary',
  },
  secondaryContained: {
    color: 'white',
  },
  secondaryOutlined: {
    color: 'secondary',
  },
  secondaryText: {
    color: 'secondary',
  },
  successContained: {
    color: 'white',
  },
  successOutlined: {
    color: 'success',
  },
  successText: {
    color: 'success',
  },
  dangerContained: {
    color: 'white',
  },
  dangerOutlined: {
    color: 'danger',
  },
  dangerText: {
    color: 'danger',
  },
  warningContained: {
    color: 'white',
  },
  warningOutlined: {
    color: 'warning',
  },
  warningText: {
    color: 'warning',
  },
  whiteContained: {
    color: 'black',
  },
  whiteOutlined: {
    color: 'white',
  },
  whiteText: {
    color: 'white',
  },
  blackContained: {
    color: 'white',
  },
  blackOutlined: {
    color: 'black',
  },
  blackText: {
    color: 'black',
  },
  disabledText: {
    color: 'secondary300',
  },
};

export type ButtonTextType = Exclude<
  keyof typeof buttonTextVariants,
  'defaults'
>;

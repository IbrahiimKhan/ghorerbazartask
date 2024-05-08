export const inputVariantsBase = {
  defaults: {
    backgroundColor: 'white',
    borderColor: 'secondary200',
    paddingHorizontal: 2,
  },
  outline: {
    borderWidth: 1,
    borderRadius: 'rounded-sm',
  },
  underlined: {
    borderBottomWidth: 1,
  },
};

export const inputVariantDisabledState = {
  defaults: {},
  outlineDisabled: {
    opacity: 0.3,
  },
  underlinedDisabled: {
    opacity: 0.3,
  },
};

export const inputVariantFocusedState = {
  defaults: {},
  outlineFocused: {
    borderColor: 'primary',
  },
  underlinedFocused: {
    borderColor: 'primary',
  },
};

export const inputVariantErrorState = {
  defaults: {},
  outlineError: {
    borderColor: 'danger',
  },
  underlinedError: {
    borderColor: 'danger',
  },
};
export const inputVariantSuccessState = {
  defaults: {},
  outlineSuccess: {
    borderColor: 'success',
  },
  underlinedSuccess: {
    borderColor: 'success',
  },
};

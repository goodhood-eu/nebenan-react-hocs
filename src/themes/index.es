import { useMemo } from 'react';
import { mergeThemes } from 'nebenan-helpers/lib/themes';

export const useMergedTheme = (baseTheme, passedTheme) => (
  useMemo(() => mergeThemes(baseTheme, passedTheme), [baseTheme, passedTheme])
);

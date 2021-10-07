import { useMemo } from 'react';
import { mergeThemes } from 'nebenan-helpers/lib/themes';

/**
 * @function
 * @param baseTheme
 * @param passedTheme
 * @return {*}
 */
export const useMergedTheme = (baseTheme, passedTheme) => (
  useMemo(() => mergeThemes(baseTheme, passedTheme), [baseTheme, passedTheme])
);

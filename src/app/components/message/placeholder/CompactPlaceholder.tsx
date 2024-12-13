import React from 'react';
import { as, ContainerColor, toRem } from 'folds';
import { randomNumberBetween } from '../../../utils/common';
import { LinePlaceholder } from './LinePlaceholder';
import { CompactLayout } from '../layout';

export const CompactPlaceholder = as<'div', { variant?: ContainerColor }>(
  ({ variant, ...props }, ref) => (
    <CompactLayout
      {...props}
      ref={ref}
      before={
        <>
          <LinePlaceholder variant={variant} style={{ maxWidth: toRem(50) }} />
          <LinePlaceholder
            variant={variant}
            style={{ maxWidth: toRem(randomNumberBetween(40, 100)) }}
          />
        </>
      }
    >
      <LinePlaceholder
        variant={variant}
        style={{ maxWidth: toRem(randomNumberBetween(120, 500)) }}
      />
    </CompactLayout>
  )
);

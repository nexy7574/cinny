import React, { CSSProperties } from 'react';
import { Avatar, Box, ContainerColor, as, color, toRem } from 'folds';
import { randomNumberBetween } from '../../../utils/common';
import { LinePlaceholder } from './LinePlaceholder';
import { ModernLayout } from '../layout';

const contentMargin: CSSProperties = { marginTop: toRem(3) };

export const DefaultPlaceholder = as<'div', { variant?: ContainerColor }>(
  ({ variant, ...props }, ref) => (
    <ModernLayout
      {...props}
      ref={ref}
      before={
        <Avatar
          style={{ backgroundColor: color[variant ?? 'SurfaceVariant'].Container }}
          size="300"
        />
      }
    >
      <Box style={contentMargin} grow="Yes" direction="Column" gap="200">
        <Box grow="Yes" gap="200" alignItems="Center" justifyContent="SpaceBetween">
          <LinePlaceholder
            variant={variant}
            style={{ maxWidth: toRem(randomNumberBetween(40, 100)) }}
          />
          <LinePlaceholder variant={variant} style={{ maxWidth: toRem(50) }} />
        </Box>
        <Box grow="Yes" gap="200" wrap="Wrap">
          <LinePlaceholder
            variant={variant}
            style={{ maxWidth: toRem(randomNumberBetween(80, 200)) }}
          />
          <LinePlaceholder
            variant={variant}
            style={{ maxWidth: toRem(randomNumberBetween(80, 200)) }}
          />
        </Box>
      </Box>
    </ModernLayout>
  )
);

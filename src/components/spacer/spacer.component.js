import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
};

const getVariant = (pos, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[pos];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

export const Spacer = ({ pos, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(pos, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
}

Spacer.defaultProps = {
  pos: 'top',
  size:'small'
};
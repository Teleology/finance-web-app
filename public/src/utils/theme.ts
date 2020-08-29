import { StyledProps } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pickPrimaryColor = (props: StyledProps<any>): string => props.theme.palette.primary;

export { pickPrimaryColor };

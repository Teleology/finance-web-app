declare module '@vx/shape' {
  export declare type LinePathProps<Datum> = {
    /** Array of data for which to generate a line shape. */
    data?: Array<Datum>;
    /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
    curve?: CurveFactory | CurveFactoryLineOnly;
    /** React RefObject passed to the path element. */
    innerRef?: React.Ref<SVGPathElement>;
    /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
    defined?: (datum: Datum, index: number, data: Array<Datum>) => boolean;
    /** Given a datum, returns the x value. Defaults to d[0]. */
    x?: (datum: Datum, index: number, data: Array<Datum>) => number;
    /** Given a datum, returns the y value. Defaults to d[1]. */
    y?: (datum: Datum, index: number, data: Array<Datum>) => number;
    /** Override render function which is passed the configured path generator as input. */
    children?: (args: { path: LineType<Datum> }) => React.ReactNode;
    /** Fill color of the path element. */
    fill?: string;
    /** className applied to path element. */
    className?: string;
  };
  export function LinePath<Datum>({
    children,
    data,
    x,
    y,
    fill,
    className,
    curve,
    innerRef,
    defined,
    ...restProps
  }: LinePathProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof LinePathProps<Datum>>): JSX.Element;
}

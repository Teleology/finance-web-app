import { ClassNameMap } from '@material-ui/styles/withStyles';

type TUseStyle<Props, ClassKey extends string> = (props: Props) => ClassNameMap<ClassKey>;

export { TUseStyle };

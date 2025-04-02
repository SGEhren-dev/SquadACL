import { SyntheticEvent, memo } from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type FlipTypes = "horizontal" | "vertical";
type SortDirections = "up" | "down";

export enum IconSize {
	BIGGEST = "5x",
	BIGGER = "4x",
	BIG = "3x",
	SMALL = "2x",
	SMALLER = "lg",
	SMALLEST = "sm"
}

export enum IconWeight {
	SOLID = "fas",
	BRAND = "fab"
}

interface IIconProps {
	sortDirection?: SortDirections;
	flip?: FlipTypes;
	name: string;
	rotate?: number;
	size?: IconSize;
	spin?: boolean;
	fixedWidth?: boolean;
	onClick?: (e?: SyntheticEvent<HTMLSpanElement>) => void;
	className?: string;
	weight?: IconWeight;
}

export default memo(function Icon(props: IIconProps) {
	const { name, className, size, spin, flip, rotate, fixedWidth, onClick, weight = IconWeight.SOLID } = props;

	return(
		<span
			onClick={ onClick }
			className={ className }
		>
			<FontAwesomeIcon
				icon={ [ weight, name as IconName ] }
				spin={ spin }
				flip={ flip }
				size={ size }
				transform={ { rotate: rotate ?? 0 } }
				fixedWidth={ fixedWidth }
			/>
		</span>
	);
});

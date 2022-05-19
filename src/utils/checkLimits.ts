import { Point } from '../types/Point';

export const checkLimits = (position: Point) => {
	if (position.x < 1920 && position.x > 0 && position.y > 67 && position.y < 1013) {
		return true;
	}
	return false;
};

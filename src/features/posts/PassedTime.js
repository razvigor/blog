import { parseISO, formatDistanceToNow } from 'date-fns';

const PassedTime = ({ timestamp }) => {
	let passedTime = '';
	if (timestamp) {
		const date = parseISO(timestamp);
		const period = formatDistanceToNow(date);
		passedTime = `${period} ago`;
	}
	return (
		<span title={timestamp}>
			&nbsp; <i>{passedTime}</i>
		</span>
	);
};

export default PassedTime;

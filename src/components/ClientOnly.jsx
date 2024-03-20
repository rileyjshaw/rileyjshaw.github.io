import {useState, useEffect} from 'react';

export function clientOnly(WrappedComponent) {
	return React.forwardRef((props, ref) => {
		return (
			<ClientOnly>
				<WrappedComponent ref={ref} {...props} />
			</ClientOnly>
		);
	});
}

export default function ClientOnly({children}) {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted ? children : null;
}

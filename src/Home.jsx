import { user } from "@forgerock/login-widget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [ userInfo, setUserInfo ] = useState(null);

	useEffect(() => {
		const unsubscribe = user.info().subscribe((event) => {
			setUserInfo(event.response);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div>
			{ !userInfo ?
				<>
					<Link to='/login'>Sign In</Link>
					{' - or - '}
					<Link to='/register'>Register</Link>
				</> :
				<>
					<p>Email: <code>{ userInfo.email }</code></p>
					<button onClick={ user.logout }>Logout</button>
				</>
			}
		</div>
	)
}

export default Home;
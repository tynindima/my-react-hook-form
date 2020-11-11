import { h } from 'preact';

import Form from './form';
import FormHook from './formHook';

// Code-splitting is automated for `routes` directory


const App = () => (
	<div id="app">
		<h1>Test form</h1>
		<Form />
		{/* <FormHook /> */}
	</div>
)

export default App;

import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
const test = addAssertions(tape, {jsxEquals});

// Component to test
import {Notification, Toast} from '../components/message-list.js';

test('----- React Component Tests: Notification -----', (t) => {

  // Shallow rendering: Render React element
  const component = createComponent.shallow(<Notification />);

  // Test component props and content
  t.equal(component.props.className, '', 'ClassName props of component should equal ""');
  t.equal(component.text, 'Toast msg', 'Label props of component should be rendered as Button text "Toast msg"');

  // Test rendered output
  const renderer = createRenderer();
  renderer.render(<Toast message={
  	id:	"1234abc"
	message:"Notification msg"
	priority: 3} 
	/>);
  const result = renderer.getRenderOutput();
  t.jsxEquals(result, <div className="toast-notification priority-3">Notification msg</div>);

  t.end();
});


test('----- React Component Tests: Toast -----', (t) => {

  // Shallow rendering: Render React element
  const component = createComponent.shallow(<Toast />);

  // Test component props and content
  t.equal(component.props.className, '', 'ClassName props of component should equal ""');
  t.equal(component.text, 'Toast msg', 'Label props of component should be rendered as Button text "Toast msg"');

  // Test rendered output
  const renderer = createRenderer();
  renderer.render(<Toast message={
  	id:	"1234abc"
	message:"Toast msg"
	priority: 1} 
	/>);
  const result = renderer.getRenderOutput();
  t.jsxEquals(result, <div className="toast-notification priority-1">Toast msg</div>);

  t.end();
});


//Stop button
	//should render
	//should contain text
	//should fire function api.start() or api.stop()

//Clear button
	//should render
	//should contain text
	//should fire function clearMessages()

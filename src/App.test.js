import React from 'react';
// import { render } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from './App';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from "react-redux";
import configureStore from "./store";
import ToJson from 'enzyme-to-json'

import Detail from './components/Detail'

const store = configureStore({});


test('renders learn react link', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(wrapper.find(Provider)).toBeTruthy()
  expect(wrapper.find(Router)).toBeTruthy()
  expect(ToJson(wrapper).children.length).toBeGreaterThan(0)
});



test('renders learn react link', () => {
  const wrapper = shallow(
    <Detail selectedContact={{
      id: 'testid',
      first_name: 'test first name',
      last_name: 'test last name',
      email: 'test@test.com',
      country: {
        iso: '112222'
      }
    }} />
  );

  let renderedItems = ['ID', 'First Name', 'Last Name', 'Email', 'Country']
  expect(ToJson(wrapper).node.rendered.length).toBeGreaterThan(0)
  ToJson(wrapper.find('thead')).node.rendered.rendered.map(item => {
    expect(renderedItems.includes(item.rendered)).toBeTruthy()
  })

  renderedItems = ['testid', 'test first name', 'test last name', 'test@test.com', '112222']
  expect(ToJson(wrapper).node.rendered.length).toBeGreaterThan(0)
  ToJson(wrapper.find('tbody')).node.rendered.rendered.map(item => {
    expect(renderedItems.includes(item.rendered)).toBeTruthy()
  })
});

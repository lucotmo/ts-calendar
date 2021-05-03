import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../../../ts-webpack-react-pwa/src/components/calendar/CalendarScreen';
import { messages } from '../../../../../ts-webpack-react-pwa/src/helpers/calendar-messages-es';
import { types } from '../../../../../ts-webpack-react-pwa/src/types/types';
import { eventSetActive } from '../../../../../ts-webpack-react-pwa/src/actions/events';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}))
Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: '123',
    name: 'Fernando'
  },
  ui: {
    openModal: false
  }
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store } >
    <CalendarScreen />
  </Provider>
)

describe('Pruebas en <CalendarScreen />', () => {
  test('debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect( calendarMessages ).toEqual( messages )
    // @ts-ignore
    calendar.prop('onDoubleClickEvent')();
    expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal })
    
    // @ts-ignore
    calendar.prop('onSelectEvent')({ start: 'Hola' });
    expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hola' })

    act(() => {
      // @ts-ignore
      calendar.prop('onView')('week');
      expect( localStorage.setItem ).toHaveBeenCalledWith('lastView','week');
    })
  })
})


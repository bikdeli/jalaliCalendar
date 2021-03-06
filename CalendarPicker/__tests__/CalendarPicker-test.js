/* eslint-env jasmine */

import React from 'react';
import renderer from 'react-test-renderer';
import CalenderPicker from '../index';


describe('CalendarPicker', function() {
  it('It renders calendar picker', () => {
    const CalendarPicker = renderer.create(
      <CalenderPicker />
    ).toJSON();
    expect(CalendarPicker).toMatchSnapshot();
  });

  it('It renders calendar picker with props', () => {
    const minDate = new Date(); // Today
    const maxDate = new Date(2017, 6, 3);
    const CalendarPicker = renderer.create(
      <CalenderPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={() => {}}
      />
    ).toJSON();
    expect(CalendarPicker).toMatchSnapshot();
  });

});

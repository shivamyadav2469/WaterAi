// src/__tests__/TimeSeriesChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import { BookingData } from '../utils/dataParser';

const mockData: BookingData[] = [
  {
    arrival_date_year: '2022',
    arrival_date_month: 'January',
    arrival_date_day_of_month: '1',
    adults: 1,
    children: 0,
    babies: 0,
    country: 'USA',
  },
  {
    arrival_date_year: '2022',
    arrival_date_month: 'February',
    arrival_date_day_of_month: '1',
    adults: 2,
    children: 1,
    babies: 0,
    country: 'Canada',
  },
];

test('renders TimeSeriesChart component', () => {
  render(<TimeSeriesChart data={mockData} />);
  const title = screen.getByText(/Total Visitors Over Time/i);
  expect(title).toBeInTheDocument();
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeView from '../../views/homeView';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

// Mock useAuth with a mock implementation that returns authData
jest.mock('../../contexts/authContext', () => ({
  useAuth: jest.fn(() => ({
    authData: { username: 'JohnDoe', account_type: 'student' }, // Mock authData
    setAuthData: jest.fn(),
  })),
}));

console.error = jest.fn();

describe('HomeView component', () => {
  it('check that expected elements are in the view', () => {
    const mockSetOptions = jest.fn();
    const mockNavigation = { setOptions: mockSetOptions };
    useNavigation.mockReturnValue(mockNavigation);

    const { queryByTestId } = render(<HomeView />);
    expect(queryByTestId('studyGuides-button')).toBeTruthy();
    expect(queryByTestId('manageAccount-button')).toBeTruthy();
  });

  it('navigates to Study Guides screen when "Study Guides" button is pressed', () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate, setOptions: jest.fn() }; // Mock setOptions as well
    useNavigation.mockReturnValue(mockNavigation);
    const { getByTestId } = render(<HomeView />);
    fireEvent.press(getByTestId('studyGuides-button'));
    expect(mockNavigate).toHaveBeenCalledWith('Study Guides');
  });

  it('navigates to Manage Account screen when "Manage Account" button is pressed', () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate, setOptions: jest.fn() }; // Mock setOptions as well
    useNavigation.mockReturnValue(mockNavigation);
    const { getByText } = render(<HomeView />);
    fireEvent.press(getByText('Manage Account'));
    expect(mockNavigate).toHaveBeenCalledWith('Manage Account');
  });
});

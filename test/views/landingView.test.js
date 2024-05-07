/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Tests relating to `landingView.js`
*/

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LandingView from '../../views/landingView';
import { fetchDataFromAPI} from "../../helpers/helpers";
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');
jest.mock('../../contexts/authContext');
jest.mock("../../helpers/helpers", () => ({
  fetchDataFromAPI: jest.fn(),
}));
console.error = jest.fn();

describe('LandingView component', () => {
  it('check that expected elements are in the view', () => {
    const { queryByTestId } = render(<LandingView />);
    expect(queryByTestId('header')).toBeTruthy();
    expect(queryByTestId('login-button')).toBeTruthy();
    expect(queryByTestId('create-button')).toBeTruthy();
  });

  it('navigates to Login screen when "Login" button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    useNavigation.mockReturnValue(mockNavigation);
    const { getByTestId } = render(<LandingView />);
    fireEvent.press(getByTestId('login-button'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to Create Account screen when "Create Account" button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    useNavigation.mockReturnValue(mockNavigation);
    const { getByText } = render(<LandingView />);
    fireEvent.press(getByText('Create New Account'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create Account');
  });

  it('displays "Checking connection..." message while connection status is null', () => {
    const { getByText } = render(<LandingView />);
    expect(getByText('Checking connection...')).toBeTruthy();
  });

  it('displays "Connection failed..." message when connection status is false', async () => {
    fetchDataFromAPI.mockResolvedValueOnce([]);
    const { getByText } = render(<LandingView />);
    await waitFor(() => expect(getByText('Connection failed. Please check your internet connection and try again.')).toBeTruthy());
  });
});

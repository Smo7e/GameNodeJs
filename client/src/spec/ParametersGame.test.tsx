import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ParametersGame from '../component/Interface/component/ParametersGame/ParametersGame';

describe('ParametersGame Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders correctly with default values', () => {
    const { asFragment } = render(<ParametersGame />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('updates volume state and localStorage on volume change', () => {
    render(<ParametersGame />);
    const volumeSlider = screen.getByRole('slider', { name: 'Громкость звуков' }) as HTMLInputElement;

    fireEvent.change(volumeSlider, { target: { value: '80' } });

    expect(volumeSlider.value).toBe('80');
    expect(localStorage.getItem('volume')).toBe('80');
  });

  it('updates music volume state and localStorage on music volume change', () => {
    render(<ParametersGame />);
    const musicVolumeSlider = screen.getByRole('slider', { name: 'Громкость музыки' }) as HTMLInputElement;

    fireEvent.change(musicVolumeSlider, { target: { value: '50' } });

    expect(musicVolumeSlider.value).toBe('50');
    expect(localStorage.getItem('musicVolume')).toBe('50');
  });

  it('toggles fullscreen mode on button click', () => {
    render(<ParametersGame />);
    const fullscreenToggleButton = screen.getByText('Вкл');

    document.documentElement.requestFullscreen = jest.fn();
    document.exitFullscreen = jest.fn();

    fireEvent.click(fullscreenToggleButton);
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();

    fireEvent.click(fullscreenToggleButton);
    expect(document.exitFullscreen).toHaveBeenCalled();
  });
});


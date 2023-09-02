export enum ThemeKeys {
  Light = 'Light',
  Dark = 'Dark',
  Violet = 'Violet',
}

export const THEMES = {
  [ThemeKeys.Light]: {
    'primary-cl': '#BEDBB0',
    'accent-cl': '#9DC888',
    // background
    'primary-bg-cl': '#FCFCFC',
    'secondary-bg-cl': '#F6F6F7',
    'third-bg-cl': '#F6F6F7',
    // text
    'text-primary-cl': '#161616',
    'text-secondary-cl': 'rgba(16,16,16,0.8)',
    'text-third-cl': 'rgba(16,16,16,0.5)',
    'text-forth-cl': '#161616',
    // linear
    linear:
      'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(190,219,176,1) 100%)',
    // scroll
    'scroll-color': '#E8E8E8',
    // button
    'button-text-cl': '#161616',
    // logo
    'logo-bg': '#1F1F1F',
    'logo-icon': '#fff',
    // sidebar
    'sidebar-bg-cl': '#FCFCFC',
    'sidebar-create-board-border-cl': 'rgba(16,16,16,0.1)',
    'sidebar-create-board-icon-cl': 'rgba(16,16,16, 0.5)',
    'sidebar-board-item-after-cl': '#BEDBB0',
    // square button
    'square-button-colored-bg-cl': '#BEDBB0',
    'square-button-colored-bg-hover-cl': '#9DC888',
    'square-button-colored-after-cl': '#121212',
    'square-button-bg-cl': '#161616',
    'square-button-after-cl': '#FFF',
    'square-button-reversed-bg-cl': '#161616',
    'square-button-reversed-after-cl': '#fff',
    // empty placeholder
    'empty-placeholder-text-cl': 'rgba(16,16,16,0.7)',
    // tasks
    'task-text-primary-cl': 'rgba(16,16,16,0.7)',
    'task-text-secondary-cl': 'rgba(16,16,16, 0.5)',
    'task-decor-cl': 'rgba(16,16,16, 0.1)',
    // auth
    'auth-input-cl': '#fff',
    // backdrop
    'backdrop-bg-cl': 'rgba(16,16,16,0.5)',
  },
  [ThemeKeys.Dark]: {
    'primary-cl': '#BEDBB0',
    'accent-cl': '#9DC888',
    'primary-bg-cl': '#161616',
    'secondary-bg-cl': '#1F1F1F',
    'third-bg-cl': '#1F1F1F',
    // text
    'text-primary-cl': '#fff',
    'text-secondary-cl': 'rgba(255,255,255,0.8)',
    'text-third-cl': 'rgba(255,255,255,0.5)',
    'text-forth-cl': '#FFFFFF',
    // linear
    linear: 'linear-gradient(315deg, #63d471 0%, #233329 74%)',
    // scroll
    'scroll-color': 'rgba(255, 255, 255, 0.5)',
    // button
    'button-text-cl': '#161616',
    // logo
    'logo-bg': '#1F1F1F',
    'logo-icon': '#fff',
    // sidebar
    'sidebar-bg-cl': '#161616',
    'sidebar-create-board-border-cl': 'rgba(255,255,255,0.1)',
    'sidebar-create-board-icon-cl': 'rgba(255,255,255, 0.5)',
    'sidebar-board-item-after-cl': '#BEDBB0',
    // square button
    'square-button-colored-bg-cl': '#BEDBB0',
    'square-button-colored-bg-hover-cl': '#9DC888',
    'square-button-colored-after-cl': '#121212',
    'square-button-bg-cl': '#161616',
    'square-button-after-cl': '#fff',
    'square-button-reversed-bg-cl': '#fff',
    'square-button-reversed-after-cl': '#161616',
    // empty placeholder
    'empty-placeholder-text-cl': 'rgba(255,255,255,0.5)',
    // tasks
    'task-text-primary-cl': 'rgba(255,255,255,0.7)',
    'task-text-secondary-cl': 'rgba(255,255,255, 0.5)',
    'task-decor-cl': 'rgba(255,255,255, 0.1)',
    // auth
    'auth-input-cl': '#161616',
    // backdrop
    'backdrop-bg-cl': 'rgba(255,255,255,0.5)',
  },
  [ThemeKeys.Violet]: {
    'primary-cl': '#5255BC',
    'accent-cl': '#7B7EDE',
    // background
    'primary-bg-cl': '#FCFCFC',
    'secondary-bg-cl': '#ECEDFD',
    'third-bg-cl': 'rgba(236, 237, 253, 0.5)',
    // text
    'text-primary-cl': '#FFF',
    'text-secondary-cl': 'rgba(16,16,16,0.8)',
    'text-third-cl': 'rgba(255,255,255,0.5)',
    'text-forth-cl': '#161616',
    // linear
    linear: 'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
    // scroll
    'scroll-color': '#B8BCFD',
    // button
    'button-text-cl': '#fff',
    // logo
    'logo-bg': '#ECEDFD',
    'logo-icon': '#5255BC',
    // sidebar
    'sidebar-bg-cl': '#5255BC',
    'sidebar-create-board-border-cl': 'rgba(255,255,255,0.1)',
    'sidebar-create-board-icon-cl': 'rgba(16,16,16, 0.5)',
    'sidebar-board-item-after-cl': '#FFFFFF',
    // square button
    'square-button-colored-bg-cl': '#B8BCFD',
    'square-button-colored-bg-hover-cl': '#979CEA',
    'square-button-colored-after-cl': '#FFFFFF',
    'square-button-bg-cl': '#FFF',
    'square-button-after-cl': '#161616',
    'square-button-reversed-bg-cl': '#5255BC',
    'square-button-reversed-after-cl': '#fff',
    // empty placeholder
    'empty-placeholder-text-cl': 'rgba(16,16,16,0.7)',
    // tasks
    'task-text-primary-cl': 'rgba(16,16,16,0.7)',
    'task-text-secondary-cl': 'rgba(16,16,16, 0.5)',
    'task-decor-cl': 'rgba(16,16,16, 0.1)',
    // auth
    'auth-input-cl': '#fff',
    // backdrop
    'backdrop-bg-cl': 'rgba(15,15,15,0.3)',
  },
};

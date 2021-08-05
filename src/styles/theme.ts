import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "64em",
  xl: "90em",
});

export const theme = extendTheme({
  colors: {
    card: {
      'background-light': '#FDFDFD',
      'background-dark': '#353431',
      'color-light': '#353431',
      'color-dark': '#FDFDFD',
    },
    inputs: {
      'background-light': '#EEEEEE',
      'background-dark': '#353431',
      'color-light': '#3B3835',
      'color-dark': '#F3F2F2',
      'placeholder-light': '#ADA8A3',
      'placeholder-dark': '#C7C5C2',
    },
    errors: {
      'light': '#EB4748',
      'dark': '#FF5F52',
    },
    progress: {
      'circular-progress-dark': '#DD6B20',
      'circular-progress-light': '#FFA164',
      'track-dark': '#C7C5C2',
      'track-light': '#ADA8A3'
    },
    button: {
      'border-dark': '#DD6B20',
      'border-light': '#FFA164'
    },
    header: {
      'background-light': '#FDFDFD',
      'background-dark': '#353431'
    },
    modal: {
      'background-light': '#FDFDFD',
      'background-dark': '#1B1A18',
      'color-light': '#353431',
      'color-dark': '#FDFDFD',
    },
    loading: {
      'circular-progress-dark': '#DD6B20',
      'circular-progress-light': '#FFA164',
      'track-dark': '#FDFDFD',
      'track-light': '#353431'
    },
    body: {
      'bg-light': '#F3F3F3',
      'color-light': '#353431',
      'bg-dark': '#1B1A18',
      'color-dark': '#FDFDFD',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: 'lg',
        fontWeight: 'normal',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "0.25rem",
      },
      variants: {
        'orange-dark/light': ({ colorMode }) => ({
          transition: 'all 0.2s',
          bgColor: colorMode === 'dark' ? '#DD6B20' : '#FFA164',
          color: colorMode === 'dark' ? '#FDFDFD' : '#3B3835',
          _hover: {
            bgColor: colorMode === 'dark' ? '#BC5B1B' : '#FFB973',
            _disabled: {
              bgColor: colorMode === 'dark' ? '#DD6B20' : '#FFA164',
              opacity: 0.4,
            }
          },
          _active: {
            bgColor: colorMode === 'dark' ? '#A65018' : '#FFC97D'
          }
        }),
        'toogleIcon-dark/light': ({ colorMode }) => ({
          bgColor: 'transparent',
          color: colorMode === 'dark' ? '#FDFDFD' : '#3B3835',
          _hover: {
            bgColor: colorMode === 'dark' ? '#2b2926' : '#F8F8F8'
          },
          _active: {
            bgColor: colorMode === 'dark' ? '#1B1A18' : '#F5F5F5'
          }
        })
      }
    },
  },
  styles: {
    global: (props) => ({
      'body': {
        bg: mode('body.bg-light', 'body.bg-dark')(props),
        color: mode('body.color-light', 'body.color-dark')(props),
        overflow: 'hidden',
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  },
  breakpoints,
});

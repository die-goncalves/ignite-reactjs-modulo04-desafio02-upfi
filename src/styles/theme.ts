import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
  colors: {
    card: {
      'background-light': '#FBFBFB',
      'background-dark': '#353431',
      'color-light': '#353431',
      'color-dark': '#FBFBFB',
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
      'background-light': '#FBFBFB',
      'background-dark': '#353431'
    },
    modalAddImage: {
      'background-light': '#FBFBFB',
      'background-dark': '#1B1A18'
    },
    modalViewImage: {
      'background-light': '#FBFBFB',
      'background-dark': '#353431',
      'color-light': '#353431',
      'color-dark': '#FBFBFB',
    },
    modalDeleteImage: {
      'background-light': '#FBFBFB',
      'background-dark': '#353431',
      'color-light': '#353431',
      'color-dark': '#FBFBFB',
    },
    loading: {
      'circular-progress-dark': '#DD6B20',
      'circular-progress-light': '#FFA164',
      'track-dark': '#FBFBFB',
      'track-light': '#353431'
    }
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
      variants: {
        'orange-dark/light': ({ colorMode }) => ({
          transition: 'all 0.2s',
          bgColor: colorMode === 'dark' ? '#DD6B20' : '#FFA164',
          color: colorMode === 'dark' ? '#FBFBFB' : '#3B3835',
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
          color: colorMode === 'dark' ? '#FBFBFB' : '#3B3835',
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
        bg: mode('#F5F5F5', '#1B1A18')(props),
        color: mode('#3B3835', '#F3F2F2')(props),
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  }
});

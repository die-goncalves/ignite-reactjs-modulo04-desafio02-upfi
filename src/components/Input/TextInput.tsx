import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl
      display="flex"
      flexDirection="row"
      alignItems="center"
      isInvalid={!!error}
    >
      <ChakraInput
        borderRadius="0.25rem"
        aria-label={name}
        name={name}
        ref={ref}
        bgColor={colorMode === "dark" ? "inputs.background-dark" : "inputs.background-light"}
        color={colorMode === "dark" ? "inputs.color-dark" : "inputs.color-light"}
        errorBorderColor={colorMode === "dark" ? "errors.dark" : "errors.light"}
        _placeholder={{
          color: colorMode === "dark" ? "inputs.placeholder-dark" : "inputs.placeholder-light",
          fontSize: "1rem",
        }}
        _hover={{
          borderColor: colorMode === "dark" ? "button.border-dark" : "button.border-light"
        }}
        pr={8}
        {...rest}
      />

      {!!error && (
        <Tooltip
          label={error.message}
          bg={colorMode === "dark" ? "errors.dark" : "errors.light"}
        >
          <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
            <Icon
              as={FiAlertCircle}
              color={colorMode === "dark" ? "errors.dark" : "errors.light"}
              w={4}
              h={4}
            />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  );
};

export const TextInput = forwardRef(TextInputBase);

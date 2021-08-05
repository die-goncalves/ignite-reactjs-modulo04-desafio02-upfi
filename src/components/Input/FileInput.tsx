import {
  Box,
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Image,
  Text,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { api } from '../../services/api';

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setImageUrl: Dispatch<SetStateAction<string>>;
  localImageUrl: string;
  setLocalImageUrl: Dispatch<SetStateAction<string>>;
  setError: UseFormSetError<FieldValues>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setImageUrl,
    localImageUrl,
    setLocalImageUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [progress, setProgress] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
      {} as CancelTokenSource
    );

    const handleImageUpload = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (!event.target.files?.length) {
          return;
        }

        setImageUrl('');
        setLocalImageUrl('');
        setError('image', null);
        setIsSending(true);

        await onChange(event);
        trigger('image');

        const formData = new FormData();

        formData.append(event.target.name, event.target.files[0]);
        formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY);

        const { CancelToken } = axios;
        const source = CancelToken.source();
        setCancelToken(source);

        const config = {
          headers: { 'content-type': 'multipart/form-data' },
          onUploadProgress: (e: ProgressEvent) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
          cancelToken: source.token,
        } as AxiosRequestConfig;

        try {
          const response = await api.post(
            'https://api.imgbb.com/1/upload',
            formData,
            config
          );

          setImageUrl(response.data.data.url);
          setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
        } catch (err) {
          if (err?.message === 'Cancelled image upload.') return;

          toast({
            title: 'Falha no envio',
            description: 'Ocorreu um erro ao realizar o upload da sua imagem.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsSending(false);
          setProgress(0);
        }
      },
      [onChange, setError, setImageUrl, setLocalImageUrl, trigger, toast]
    );

    useEffect(() => {
      if (error?.message && isSending && cancelToken?.cancel) {
        cancelToken.cancel('Cancelled image upload.');
        setCancelToken(null);
      }
    }, [cancelToken, error, isSending]);

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel
          mx="auto"
          w={["8rem", "8.5rem", "9rem", "9.5rem", "11rem"]}
          h={["8rem", "8.5rem", "9rem", "9.5rem", "11rem"]}
          htmlFor={name}
          cursor={isSending ? 'progress' : 'pointer'}
          opacity={isSending ? 0.5 : 1}
        >
          {localImageUrl && !isSending ? (
            <Image
              w="full"
              h="full"
              src={localImageUrl}
              alt="Uploaded photo"
              borderRadius="0.25rem"
              objectFit="cover"
            />
          ) : (
            <Flex
              w="full"
              h="full"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.25rem"
              bgColor={colorMode === "dark" ? "inputs.background-dark" : "inputs.background-light"}
              color={colorMode === "dark" ? "inputs.placeholder-dark" : "inputs.placeholder-light"}
              borderWidth={error?.message && 2}
              borderColor={error?.message && (colorMode === "dark" ? "errors.dark" : "errors.light")}
            >
              {isSending ? (
                <>
                  <CircularProgress
                    trackColor={colorMode === "dark" ? "progress.track-dark" : "progress.track-light"}
                    value={progress}
                    color={colorMode === "dark" ? "progress.circular-progress-dark" : "progress.circular-progress-light"}
                  >
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                  </CircularProgress>
                  <Text
                    as="span"
                    pt={2}
                    textAlign="center"
                  >
                    Enviando...
                  </Text>
                </>
              ) : (
                <Box pos="relative" h="full">
                  {!!error && (
                    <Tooltip
                      label={error.message}
                      bg={colorMode === "dark" ? "errors.dark" : "errors.light"}
                    >
                      <FormErrorMessage
                        pos="absolute"
                        right={2}
                        top={2}
                        mt={0}
                        zIndex="tooltip"
                      >
                        <Icon
                          as={FiAlertCircle}
                          color={colorMode === "dark" ? "errors.dark" : "errors.light"}
                          w={4}
                          h={4}
                        />
                      </FormErrorMessage>
                    </Tooltip>
                  )}

                  <Flex
                    h="full"
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                  >
                    <Icon
                      as={FiPlus}
                      w={["2.5rem", "2.75rem", "3rem", "3.25rem", "3.5rem"]}
                      h={["2.5rem", "2.75rem", "3rem", "3.25rem", "3.5rem"]}
                    />
                    <Text
                      fontSize="1rem"
                      as="span"
                      pt={2}
                      textAlign="center"
                    >
                      Adicione sua imagem
                    </Text>
                  </Flex>
                </Box>
              )}
            </Flex>
          )}
          <input
            data-testid={name}
            disabled={isSending}
            id={name}
            name={name}
            onChange={handleImageUpload}
            ref={ref}
            type="file"
            style={{
              display: 'none',
            }}
            {...rest}
          />
        </FormLabel>
      </FormControl>
    );
  };

export const FileInput = forwardRef(FileInputBase);

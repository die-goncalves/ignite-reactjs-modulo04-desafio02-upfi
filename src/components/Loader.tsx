import { Box, CircularProgress, useColorMode } from "@chakra-ui/react";
import { forwardRef } from "react";

interface LoaderProps {
  hasNextPage: boolean;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ hasNextPage }, ref) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {hasNextPage &&
        <Box
          marginTop="40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          ref={ref}
        >
          <CircularProgress
            isIndeterminate
            size="3.25rem"
            thickness="0.75rem"
            color={colorMode === "dark" ? "loading.circular-progress-dark" : "loading.circular-progress-light"}
            trackColor={colorMode === "dark" ? "loading.track-dark" : "loading.track-light"}
          />
        </Box >
      }
    </>
  )
});
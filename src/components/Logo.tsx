import { useColorMode } from "@chakra-ui/react";

export function Logo(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <>
      <svg
        width="153"
        height="52"
        viewBox="0 0 153 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>{colorMode === "dark" ? "Upfi Dark Mode" : "Upfi Light Mode"}</title>
        <g clipPath="url(#clip0)">
          <path d="M21.2274 51.9628C9.58127 51.9628 0.108398 42.7726 0.108398 31.4758C0.108398 20.179 9.58266 10.9888 21.2274 10.9888H21.2326C23.1942 7.70213 25.9764 4.9819 29.3063 3.09505C32.6363 1.20821 36.3994 0.219569 40.2267 0.226137C50.8174 0.226137 59.9967 7.88154 61.9746 18.1892C67.0451 21.6431 70.0445 27.2841 70.0445 33.4689C70.0445 43.6668 61.749 51.9628 51.5523 51.9628C51.5523 51.9628 37.4254 53.3883 37.6668 38.4287H35.527C35.527 38.4287 37.0328 52.1108 21.5024 51.9996L21.2274 51.9628Z" fill={colorMode === "dark" ? "#FBFBFB" : "#353431"} />
          <path d="M40.5463 35.4824C40.1914 36.1063 39.3806 37.3117 39.3406 37.3522C39.2437 37.4491 39.1287 37.5258 39.0021 37.5781C38.8755 37.6304 38.7398 37.6572 38.6028 37.6569L34.599 37.6602C34.432 37.6587 34.2676 37.6177 34.1195 37.5405C33.9714 37.4633 33.8437 37.352 33.7468 37.2159C33.3784 36.6915 33.0132 36.1063 32.6555 35.4838C31.4754 35.7853 28.0349 36.0933 28.0349 36.0933C28.0349 36.0933 28.3819 30.8496 30.1105 28.8947C29.7165 26.9789 29.6216 25.0026 30.0175 23.1258C30.7702 19.5714 33.2137 16.8992 35.8652 14.2459C36.0609 14.0505 36.3262 13.9407 36.6028 13.9407C36.8793 13.9407 37.1446 14.0505 37.3403 14.2459C39.8848 16.7903 42.4345 19.5766 43.1829 23.1319C43.5816 25.0044 43.4881 26.9807 43.0932 28.9008C44.8227 30.8547 45.1702 36.0974 45.1702 36.0974C45.1702 36.0974 41.7265 35.7853 40.5463 35.4824Z" fill={colorMode === "dark" ? "#353431" : "#FBFBFB"} />
          <path d="M38.4585 24.3633C38.4585 24.0045 38.3521 23.6537 38.1527 23.3553C37.9534 23.0569 37.67 22.8244 37.3385 22.687C37.007 22.5497 36.6423 22.5138 36.2903 22.5838C35.9384 22.6538 35.6152 22.8266 35.3614 23.0803C35.1077 23.3341 34.9349 23.6574 34.8649 24.0094C34.7949 24.3613 34.8309 24.7261 34.9682 25.0577C35.1055 25.3892 35.338 25.6726 35.6364 25.8719C35.9347 26.0713 36.2855 26.1777 36.6443 26.1777C37.1254 26.1777 37.5869 25.9866 37.9271 25.6463C38.2673 25.306 38.4585 24.8445 38.4585 24.3633V24.3633Z" fill={colorMode === "dark" ? "#FBFBFB" : "#353431"} />
          <path d="M95.1861 38.5376C95.124 38.6306 95.0327 38.7564 94.9121 38.9149C94.7914 39.0734 94.5057 39.3553 94.0548 39.7607C93.6059 40.164 93.1198 40.5239 92.6029 40.8354C92.0847 41.1477 91.4025 41.4257 90.5562 41.6695C89.7054 41.9144 88.8243 42.0377 87.9391 42.0357C85.3177 42.0357 83.1422 41.1249 81.4127 39.3034C79.6831 37.4818 78.8184 35.1158 78.8184 32.2053V19.1057H82.0872V32.2053C82.0872 34.1714 82.6967 35.7944 83.9158 37.0744C85.1348 38.3544 86.6284 38.9946 88.3964 38.9949C90.3014 38.9949 91.9091 38.2938 93.2193 36.8916C94.5295 35.4894 95.1848 33.6985 95.1851 31.5191V19.1057H98.4781V41.5765H95.1865L95.1861 38.5376Z" fill={colorMode === "dark" ? "#FBFBFB" : "#353431"} />
          <path d="M109.472 51.4083H106.204V19.1058H109.472V22.6262C109.534 22.535 109.645 22.394 109.804 22.2033C109.963 22.0125 110.291 21.6887 110.787 21.2319C111.284 20.7735 111.823 20.3639 112.398 20.0088C112.977 19.6506 113.72 19.3305 114.627 19.0486C115.534 18.7667 116.478 18.6241 117.427 18.6257C120.292 18.6257 122.803 19.7763 124.959 22.0777C127.115 24.379 128.194 27.1338 128.194 30.3421C128.194 33.5503 127.12 36.3012 124.971 38.5948C122.822 40.8884 120.307 42.036 117.427 42.0376C116.486 42.0403 115.55 41.9015 114.65 41.6258C113.759 41.3513 113.008 41.0237 112.398 40.6428C111.84 40.2992 111.309 39.9133 110.81 39.4885C110.36 39.0996 110.021 38.7681 109.792 38.4939L109.472 38.0594V51.4083ZM111.93 36.3999C113.568 38.1296 115.401 38.9945 117.427 38.9945C119.363 38.9945 121.096 38.1524 122.628 36.4683C124.159 34.7841 124.925 32.7419 124.925 30.3416C124.925 27.941 124.159 25.8986 122.628 24.2145C121.096 22.5304 119.363 21.6886 117.427 21.6892C115.4 21.6892 113.568 22.5541 111.93 24.2838C110.292 26.0135 109.473 28.033 109.472 30.3421C109.472 32.6512 110.292 34.6706 111.93 36.4003V36.3999Z" fill={colorMode === "dark" ? "#FBFBFB" : "#353431"} />
          <path d="M143.875 22.1451H138.479V41.5784H135.21V22.1451H131.692V19.1058H135.212V14.8991C135.212 12.8112 135.749 11.1956 136.823 10.0523C137.898 8.9091 139.387 8.33764 141.292 8.33795C141.854 8.33766 142.413 8.39897 142.961 8.52079C143.509 8.64268 143.921 8.76457 144.195 8.88646L144.561 9.0465V12.0873C143.631 11.6146 142.617 11.3784 141.521 11.3787C139.494 11.3787 138.481 12.5522 138.481 14.8991V19.1058H143.877L143.875 22.1451Z" fill="#DD6B20" />
          <path d="M149.144 10.1096C149.547 9.70636 150.046 9.50476 150.641 9.50476C151.236 9.50476 151.735 9.70636 152.138 10.1096C152.541 10.5128 152.743 11.012 152.743 11.6071C152.743 12.2023 152.541 12.7015 152.138 13.1047C151.735 13.5079 151.236 13.7095 150.641 13.7095C150.046 13.7095 149.547 13.5079 149.144 13.1047C148.74 12.7015 148.539 12.2023 148.539 11.6071C148.539 11.012 148.74 10.5128 149.144 10.1096ZM149.018 19.1058H152.287V41.5765H149.018V19.1058Z" fill="#DD6B20" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="153" height="52" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}

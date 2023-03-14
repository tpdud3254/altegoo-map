export const loadScript = () => {
  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=46c306b69d86ff0129f2ce0a9992a3df";
  script.async = true;
};

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useScript } from "./hooks";

function App() {
  const status = useScript(
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=46c306b69d86ff0129f2ce0a9992a3df"
  );
  // useEffect(() => {
  //   if (status === "ready") {
  //     // sdk 초기화하기
  //     window.SomeThingSDK();
  //   }
  // });

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `         
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options)
   `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      {/* <Helmet>
        <div id="map" style="width:500px;height:400px;"></div>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=46c306b69d86ff0129f2ce0a9992a3df"
        ></script>
        <script>
          {() => {
            var container = document.getElementById("map");
            var options = {
              center: new kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };

            var map = new kakao.maps.Map(container, options);
          }}
        </script>
      </Helmet> */}
      <div id="map" style="width:500px;height:400px;"></div>
    </div>
  );
}

export default App;

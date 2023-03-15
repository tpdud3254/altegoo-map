import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useScript } from "./hooks";
import Payment from "./Payment";

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


    var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

var position = new kakao.maps.LatLng(33.450701, 126.570667);

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
roadviewClient.getNearestPanoId(position, 50, function(panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
});
   `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
    }, []);

    Payment();
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

            <div
                id="roadview"
                style={{
                    width: 250,
                    height: 250,
                    marginTop: -8,
                    marginLeft: -8,
                }}
            ></div>
        </div>
    );
}

export default App;

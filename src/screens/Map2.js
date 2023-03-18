import axios from "axios";
import { useEffect, useState } from "react";

function Map2() {
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    useEffect(() => {
        document.addEventListener("message", async (event) => {
            const parsed = JSON.parse(event.data);

            try {
                const response = await axios.get(
                    "https://dapi.kakao.com/v2/local/search/address.json",
                    {
                        params: {
                            query: parsed.address,
                        },
                        headers: {
                            Authorization:
                                "KakaoAK 86e0df46fbae745bb4c658276b280088",
                        },
                    }
                );

                setLng(response.data.documents[0].x);
                setLat(response.data.documents[0].y);
            } catch (error) {}
        });
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `         
            var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            var position = new kakao.maps.LatLng(${lat}, ${lng});
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
   `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
    }, [lat, lng]);

    return (
        <div
            id="roadview"
            style={{
                width: 350,
                height: 350,
                marginTop: -8,
                marginLeft: -8,
            }}
        ></div>
    );
}

export default Map2;

import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

function KakaoNavi() {
    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `         
        Kakao.Navi.start({
            name: '현대백화점 판교점',
            x: 127.11205203011632,
            y: 37.39279717586919,
            coordType: 'wgs84',
          });
   `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 300,
            }}
        >
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
}

export default KakaoNavi;

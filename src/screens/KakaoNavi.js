import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import queryString from "query-string";

function KakaoNavi() {
    useEffect(() => {
        const parsed = queryString.parse(window.location.search);

        if (!parsed) return;

        const { x, y } = parsed;

        const script = document.createElement("script");
        script.innerHTML = `         
        Kakao.Navi.start({
            x: ${x},
            y: ${y},
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
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
}

export default KakaoNavi;

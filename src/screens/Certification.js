import axios from "axios";
import { useEffect, useState } from "react";

const SERVER = "https://altegoo.shop";

function Certification() {
    useEffect(() => {
        document.addEventListener("message", request);
        getTest();
    }, []);

    const getTest = async () => {
        try {
            const response = await axios.get(SERVER + "/users/certification");

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const request = async (event) => {
        const parsed = JSON.parse(event.data);
        console.log("parsed : ", parsed);
        alert(parsed);
    };

    // useEffect(() => {
    //     document.addEventListener("message", async (event) => {
    //         const parsed = JSON.parse(event.data);

    //         try {
    //             const response = await axios.get(
    //                 "https://dapi.kakao.com/v2/local/search/address.json",
    //                 {
    //                     params: {
    //                         query: parsed.address,
    //                     },
    //                     headers: {
    //                         Authorization:
    //                             "KakaoAK 86e0df46fbae745bb4c658276b280088",
    //                     },
    //                 }
    //             );

    //             console.log(response);

    //             setLng(response.data.documents[0].x);
    //             setLat(response.data.documents[0].y);
    //         } catch (error) {}
    //     });
    // }, []);

    return <div>안녕~</div>;
}

export default Certification;
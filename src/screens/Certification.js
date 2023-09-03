import axios from "axios";
import { useEffect, useRef, useState } from "react";
import queryString from "query-string";

const SERVER = "https://altegoo.shop";

function Certification() {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [tokenVersionId, setTokenVersionId] = useState(null);
    const [encData, setEncData] = useState(null);
    const [integrityValue, setIntegrityValue] = useState(null);

    const formRef = useRef(null);

    useEffect(() => {
        if (window.location.search) {
            const qs = queryString.parse(window.location.search);
            const key = localStorage.getItem("key");
            const iv = localStorage.getItem("iv");
            decoding(qs.enc_data, key, iv);
        } else {
            getTest();
        }
        // document.addEventListener("message", request);

        // sendMessage("dasdf");
    }, []);

    const decoding = async (enc_data, key, iv) => {
        try {
            const response = await axios.post(SERVER + "/users/certification", {
                enc_data,
                key,
                iv,
            });

            const {
                data: { result },
            } = response;

            console.log("decoding : ", response);
            if (result === "VALID") {
                const {
                    data: {
                        data: { data },
                    },
                } = response;

                console.log(data);
                setValue(data.name);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTest = async () => {
        try {
            const response = await axios.get(SERVER + "/users/certification");

            const {
                data: { result },
            } = response;

            if (result === "VALID") {
                const {
                    data: {
                        data: { data },
                    },
                } = response;

                console.log(data);

                setTokenVersionId(data.token_version_id);
                setEncData(data.enc_data);
                setIntegrityValue(data.integrity_value);
                localStorage.setItem("key", data.key);
                localStorage.setItem("iv", data.iv);
                setLoading(false);

                formRef.current.submit();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const request = async (event) => {
        const parsed = JSON.parse(event.data);
        console.log("parsed : ", parsed);
        // alert(parsed);
    };

    const sendMessage = (str) => {
        window.ReactNativeWebView.postMessage(str);
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

    return (
        <>
            {loading ? null : (
                <form
                    ref={formRef}
                    name="form"
                    id="form"
                    action="https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb"
                >
                    <input type="hidden" id="m" name="m" value="service" />
                    <input
                        type="hidden"
                        id="token_version_id"
                        name="token_version_id"
                        value={tokenVersionId}
                    />
                    <input
                        type="hidden"
                        id="enc_data"
                        name="enc_data"
                        value={encData}
                    />
                    <input
                        type="hidden"
                        id="integrity_value"
                        name="integrity_value"
                        value={integrityValue}
                    />
                    <button type="submit">본인 인증</button>
                </form>
            )}
        </>
    );
}

export default Certification;

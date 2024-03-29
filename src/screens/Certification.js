import axios from "axios";
import { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { ThreeDots } from "react-loader-spinner";

const SERVER = "https://altegoo.shop";

function Certification() {
    const [loading, setLoading] = useState(true);

    const [tokenVersionId, setTokenVersionId] = useState(null);
    const [encData, setEncData] = useState(null);
    const [integrityValue, setIntegrityValue] = useState(null);

    const formRef = useRef(null);

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.backgroundColor =
            "#00000055";

        if (window.location.search) {
            setLoading(true);
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

            if (result === "VALID") {
                const {
                    data: {
                        data: { data },
                    },
                } = response;

                const parsed = JSON.parse(data);

                console.log("decoding : ", parsed);

                const sendData = {
                    result: "ok",
                    data: {
                        birth: parsed.birthdate,
                        phone: parsed.mobileno,
                        name: decodeURI(parsed.utf8_name),
                        gender: parsed.gender === "0" ? "여" : "남",
                    },
                };

                sendMessage(JSON.stringify(sendData));
                console.log(sendData);
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

    const cancel = () => {
        const sendData = {
            result: "cancel",
        };
        sendMessage(JSON.stringify(sendData));
        return;
    };

    return (
        <>
            {loading ? (
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
            ) : (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "30vh",
                    }}
                >
                    <form
                        ref={formRef}
                        name="form"
                        id="form"
                        action="https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            paddingTop: 35,
                            borderRadius: 10,
                            width: "80vw",
                        }}
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
                        <div
                            style={{
                                marginLeft: 30,
                                marginRight: 30,
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            휴대폰 본인인증이
                            <br />
                            필요합니다.
                        </div>
                        <div style={{ marginTop: 7, fontSize: 20 }}>
                            진행하시겠습니까?
                        </div>
                        <div
                            style={{
                                marginTop: 30,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            <button
                                type="button"
                                onClick={cancel}
                                style={{
                                    width: "50%",
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: 0,
                                    borderBottomLeftRadius: 10,
                                    backgroundColor: "#E6E6E6",
                                    color: "#08252E",
                                    fontSize: 20,
                                }}
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                style={{
                                    width: "50%",
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: 0,
                                    borderBottomRightRadius: 10,
                                    backgroundColor: "#FC5F00",
                                    color: "white",
                                    fontSize: 20,
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Certification;

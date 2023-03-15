import { Bootpay } from "@bootpay/client-js";

async function Payment() {
    const response = await Bootpay.requestPayment({
        application_id: "641080ba755e27001c692292",
        price: 1000,
        order_name: "테스트결제",
        order_id: "TEST_ORDER_ID",
        pg: "나이스페이",
        method: "가상계좌",
        tax_free: 0,
        user: {
            id: "회원아이디",
            username: "회원이름",
            phone: "01000000000",
            email: "test@test.com",
        },
        items: [
            {
                id: "item_id",
                name: "테스트아이템",
                qty: 1,
                price: 1000,
            },
        ],
        extra: {
            open_type: "iframe",
            card_quota: "0,2,3",
            escrow: false,
        },
    });

    console.log(response);
}

export default Payment;

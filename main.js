window.onload = function () {
  const script = document.createElement("script");

  // 스크립트 소스 설정
  script.src = "https://cdn.portone.io/v2/browser-sdk.js";

  script.onload = () => {
    // 스크립트 로드 완료 시 Flutter에 알림
    window.successLoad.postMessage("successLoad");
  };
  document.head.appendChild(script);
};

async function requestPortOnePayment(paymentData) {
  try {
    const result = await PortOne.requestPayment({
      storeId: paymentData.storeId,
      channelKey: paymentData.channelKey,
      paymentId: paymentData.paymentId,
      orderName: paymentData.orderName,
      totalAmount: paymentData.totalAmount,
      currency: paymentData.currency,
      payMethod: paymentData.payMethod,
      customData: paymentData.customData,
      // redirectUrl: paymentData.redirectUrl,
    });

    // 결제 성공 시 Flutter에 결과 전송
    window.paymentResult.postMessage(
      JSON.stringify({
        paymentId: result.paymentId,
        txId: result.txId,
      })
    );
  } catch (error) {
    // 에러 발생 시 Flutter에 전송
    window.paymentError.postMessage(error.message);
  }
}

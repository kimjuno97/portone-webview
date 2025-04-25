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
      redirectUrl: paymentData.redirectUrl,
    });

    return {
      paymentId: result.paymentId,
      transactionType: result.transactionType,
      txId: result.txId,
    };
  } catch (error) {
    // 에러 발생 시 Flutter로 전송
    throw new Error(error.message);
  }
}

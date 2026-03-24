type InterswitchPaymentParams = {
   amount: string;
   customerEmail: string;
   customerName: string;
   customerId: string;
   onComplete: (response: any) => void;
};

export const initiateInterswitchPayment = ({
   amount,
   customerEmail,
   customerName,
   customerId,
   onComplete,
}: InterswitchPaymentParams) => {
   const paymentParameters = {
      merchant_code: "MX6072",
      pay_item_id: "9405967",
      amount: amount,
      txn_ref: `RIDEVEST_${Date.now()}`,
      callback_url: `${window.location.origin}/delivery-status`,
      customer_id: customerId,
      customer_email: customerEmail,
      site_redirect_url: `${window.location.origin}/delivery-status`,
      customer_name: customerName,
      currency: "566",
      mode: "TEST",
      onComplete: onComplete,
   };

   if ((window as any).webpayCheckout) {
      (window as any).webpayCheckout(paymentParameters);
   } else {
      console.error("Interswitch script not loaded");
   }
};

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

interface DonationFormCardProps {
  amount: number;
}

const DonationFormCard: React.FC<DonationFormCardProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      element: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment successful:', paymentMethod);
      // Here you would typically make an API call to your server to process the payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Donate ${amount}
      </Button>
    </form>
  );
};

export default DonationFormCard;
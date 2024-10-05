// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import DonationFormCard from "@/app/modules/cards/DonationsFormCard";
// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "pk_test_51PwdX8C7ElQ0OD0aEmXFiW8EXpV4gSS4BQf2OVzcvM3Vr3AX14pVCUEoFI9Wc637JsOPjt02Mf7dXr9eW4T7p6Ir00bzrvmV31");

// export const DonationsModal: React.FC = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [donationAmount, setDonationAmount] = useState(3);

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           Help support Clearvote!
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             Clearvote is run by a small team with very limited resources. You can help us empower more communities to vote locally by donating
//           </DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           <Elements stripe={stripePromise}>
//             <div>
//               <input
//                 type="number"
//                 value={donationAmount}
//                 onChange={(e) => setDonationAmount(Number(e.target.value))}
//                 min="1"
//               />
//               <DonationFormCard amount={donationAmount} />
//             </div>
//           </Elements>
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// };
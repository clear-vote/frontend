"use client";
// import { DonationsModal } from "@/app/modules/modals/DonationsModal";
import { useMasterContext } from "@/context/MasterContext";

const ResultsPage = () => {
  const { email } = useMasterContext();

  return (
    <div>
      <p>We&apos;ve sent an email to {email} with your picks. Be sure to fill out your ballot and mail it in before the specified date! Voter turnout in local elections is around 15-27%. You do the math --you&apos;re vote really does matter!</p>
      <br />
      <p>Clearvote is run by a small team with very limited resources. You can help us empower more communities to vote locally by donating</p>
      {/* <DonationsModal/> */}
      {/* TODO: add donations link! */}
    </div>
  );
};

export default ResultsPage;
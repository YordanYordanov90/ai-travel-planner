import Plan from "@/components/features/plan";
import React from "react";
import { getPlans } from "@/server/plans";

const Page = async ({ params }: { params: { id: string } }) => {    
  const plan = await getPlans(params.id);

  if (!plan) {
    return <div>Plan not found</div>;
  }
  return (
    <div className="  p-10">
      <Plan plan={plan} />
    </div>
  );
};

export default Page;

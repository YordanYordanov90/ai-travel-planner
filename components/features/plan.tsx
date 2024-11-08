import Link from "next/link";
import { Button } from "../ui/button";
import { PlanProps } from '../shared/types';

type Props = {
  plan: PlanProps
};

const Plan = ({ plan }: Props) => {
  return (
    <div className="max-w-7xl w-full p-24 flex justify-center items-center flex-col mx-auto">
      <h1 className="text-4xl text-center p-10">Your Trip Plan</h1>
      <div dangerouslySetInnerHTML={{ __html: plan.text }} />
      <Link href={"/travel-planner"}>
        <Button variant="default" className="mt-10">Create A New Plan</Button>
      </Link>
    </div>
  );
};

export default Plan;

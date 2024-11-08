import Link from "next/link";
import { PlanProps } from "../shared/types";
import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { format } from 'date-fns';

type Props = {
  plans: PlanProps[];
};

const PlansList = ({ plans }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {plans.map((plan) => (
      <Link key={plan.id} href={`/plan/${plan.id}`}>
        <Card className="cursor-pointer hover:bg-primary/10 transition ease-in-out duration-300 hover:-translate-y-2">
          <CardHeader>
            <CardTitle>
              Plan created on{" "}
              {plan.createdAt && format(plan.createdAt, "PPP")}
            </CardTitle>
            <CardDescription>Budget: {plan.budget}$</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Start Date: {format(plan.startDate, "PPP")}</p>
            <p>End Date: {format(plan.endDate, "PPP")}</p>
          </CardContent>
        </Card>
      </Link>
    ))}
    <Link href="/travel-planner">
      <Card className="w-max cursor-pointer hover:bg-primary/10 transition ease-in-out duration-300 hover:-translate-y-2">
        <CardHeader>
          <Plus className="size-28" />
        </CardHeader>
      </Card>
    </Link>
  </div>
  );
};

export default PlansList;

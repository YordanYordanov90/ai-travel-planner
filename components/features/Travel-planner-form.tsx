"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formSchema } from "@/server/schemas";
import { generateTrip } from "@/server/ai";
import { useRouter } from "next/navigation";

import { Skeleton } from "../ui/skeleton";


const activities = [
  {
    value: "food",
    label: "food",
  },
  {
    value: "hikking",
    label: "hikking",
  },
  {
    value: "nature",
    label: "nature",
  },

  {
    value: "culture",
    label: "culture",
  },
  {
    value: "shopping",
    label: "shopping",
  },

  { value: "sightseeing", label: "sightseeing" },
];

const TravelPlannerForm = () => {
  const router = useRouter();
  const [currentlySelectedActivieties, setCurrentlySelectedActivieties] =
    useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true); // Set loading to true when the form is submitting
    try {
      const planId = await generateTrip(values);
      console.log("Successfully generated plan ID:", planId);
      if (planId) {
        router.push(`/plan/${planId}`);
       
      } else {
        console.error("No plan ID returned from generateTrip");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      
    } finally {
      setLoading(false); // Set loading to false once done
    }
  }
  return (
    <Form {...form}>
      {loading ? (
        <div className='space-y-4'>
          <Skeleton className="h-[300px] w-[400px]" />
          <Skeleton className="h-5 w-[400px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex space-x-10">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          form.getValues("startDate")
                            ? addDays(form.getValues("startDate"), 1)
                            : field.value
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          form.setValue(
                            "endDate",
                            addDays(date ?? new Date(), 1)
                          );
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date you leave for a trip
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() ||
                          date < addDays(form.getValues("startDate"), 1)
                        }
                        initialFocus
                        defaultMonth={form.getValues("endDate")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date you return from a trip
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                    placeholder="$0.00"
                  />
                </FormControl>
                <FormDescription>
                  The estimated cost of your trip
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Activaties</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        Select Activities
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No activities found.</CommandEmpty>
                        <CommandGroup>
                          {activities.map((activity) => (
                            <CommandItem
                              value={activity.label}
                              key={activity.value}
                              onSelect={() => {
                                if (
                                  currentlySelectedActivieties.includes(
                                    activity.value
                                  )
                                ) {
                                  setCurrentlySelectedActivieties(
                                    currentlySelectedActivieties.filter(
                                      (a) => a !== activity.value
                                    )
                                  );
                                  form.setValue(
                                    "activity",
                                    currentlySelectedActivieties
                                  );
                                } else {
                                  setCurrentlySelectedActivieties([
                                    ...currentlySelectedActivieties,
                                    activity.value,
                                  ]);
                                  form.setValue("activity", [
                                    ...currentlySelectedActivieties,
                                    activity.value,
                                  ]);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currentlySelectedActivieties.includes(
                                    activity.value
                                  )
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {activity.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the activities you would like to take
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination - Optional</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your destination" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This is the destination of your trip.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button className={``} type="submit">
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
};

export default TravelPlannerForm;

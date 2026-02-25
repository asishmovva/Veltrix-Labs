"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { type DefaultValues, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/client/track-event";
import {
  budgetOptions,
  contactLeadSchema,
  planLabels,
  planOptions,
  projectTypeLabels,
  projectTypeOptions,
  timelineOptions,
  type ContactLeadFormInput,
  type ContactPlan,
} from "@/lib/validators/contact";

const fieldClassName =
  "h-11 w-full rounded-lg border border-white/15 bg-graphite-2/70 px-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";

function getDefaultValues(prefilledPlan?: ContactPlan): DefaultValues<ContactLeadFormInput> {
  return {
    name: "",
    email: "",
    company: "",
    plan: prefilledPlan,
    projectType: undefined,
    budget: undefined,
    timeline: undefined,
    message: "",
    website: "",
    pageUrl: "",
  };
}

function parsePlanParam(value: string | null): ContactPlan | undefined {
  if (!value) {
    return undefined;
  }

  return (planOptions as readonly string[]).includes(value) ? (value as ContactPlan) : undefined;
}

function getClientPath() {
  if (typeof window === "undefined") {
    return "/contact";
  }
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedViewRef = useRef(false);

  const prefilledPlan = useMemo(
    () => parsePlanParam(searchParams.get("plan")),
    [searchParams],
  );

  const form = useForm<ContactLeadFormInput>({
    resolver: zodResolver(contactLeadSchema),
    defaultValues: getDefaultValues(prefilledPlan),
  });

  useEffect(() => {
    if (!prefilledPlan) {
      return;
    }

    form.setValue("plan", prefilledPlan, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [form, prefilledPlan]);

  useEffect(() => {
    const node = formSectionRef.current;
    if (!node || hasTrackedViewRef.current) {
      return;
    }

    const trackView = () => {
      if (hasTrackedViewRef.current) {
        return;
      }

      hasTrackedViewRef.current = true;
      trackEvent({
        event: "contact_form_view",
        label: "contact_form",
        location: "contact-form",
        path: getClientPath(),
        meta: prefilledPlan ? { plan: prefilledPlan } : undefined,
      });
    };

    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      trackView();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          trackView();
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefilledPlan]);

  async function onSubmit(values: ContactLeadFormInput) {
    setServerError("");

    const payload = contactLeadSchema.parse({
      ...values,
      pageUrl: typeof window !== "undefined" ? window.location.href : values.pageUrl,
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        const errorMessage = result.error ?? "Unable to submit. Please try again.";
        setServerError(errorMessage);
        trackEvent({
          event: "lead_submit_error",
          label: errorMessage.slice(0, 100),
          location: "contact-form",
          path: "/contact",
          meta: {
            plan: payload.plan,
            projectType: payload.projectType,
          },
        });
        return;
      }

      setIsSuccess(true);
      form.reset(getDefaultValues(prefilledPlan));
      trackEvent({
        event: "lead_submit_success",
        label: `${payload.plan}:${payload.projectType}`,
        location: "contact-form",
        path: "/contact",
        meta: {
          plan: payload.plan,
          projectType: payload.projectType,
          budget: payload.budget,
          timeline: payload.timeline,
        },
      });
    } catch {
      setServerError("Network error. Please try again in a moment.");
      trackEvent({
        event: "lead_submit_error",
        label: "network_error",
        location: "contact-form",
        path: "/contact",
      });
    }
  }

  function onInvalid() {
    trackEvent({
      event: "lead_submit_error",
      label: "client_validation",
      location: "contact-form",
      path: "/contact",
    });
  }

  const selectedPlan = useWatch({ control: form.control, name: "plan" });
  const selectedBudget = useWatch({ control: form.control, name: "budget" });
  const showCustomBudgetHint =
    selectedPlan === "custom" && selectedBudget === "Under $1,000";

  if (isSuccess) {
    return (
      <section ref={formSectionRef} className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-text-primary">Received.</h2>
          <p className="mt-3 text-sm text-text-secondary sm:text-base">
            We&apos;ll reply within 24-48 hours.
          </p>
          <Button type="button" className="mt-5 h-12" onClick={() => setIsSuccess(false)}>
            Submit Another Inquiry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section ref={formSectionRef} className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="rounded-2xl border border-white/10 bg-graphite-2/70 p-5 sm:p-8">
        <h2 className="text-2xl font-semibold text-text-primary">Project Inquiry</h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Share a few details and we&apos;ll follow up with scope and timeline guidance.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="mt-6 space-y-4"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Name *
              </label>
              <input id="name" className={fieldClassName} {...form.register("name")} />
              {form.formState.errors.name ? (
                <p className="text-xs text-red-300">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                className={fieldClassName}
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-xs text-red-300">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Company
              </label>
              <input id="company" className={fieldClassName} {...form.register("company")} />
              {form.formState.errors.company ? (
                <p className="text-xs text-red-300">{form.formState.errors.company.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="plan"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Plan *
              </label>
              <select
                id="plan"
                className={fieldClassName}
                defaultValue=""
                {...form.register("plan")}
              >
                <option value="" disabled>
                  Select a plan
                </option>
                {planOptions.map((option) => (
                  <option key={option} value={option}>
                    {planLabels[option]}
                  </option>
                ))}
              </select>
              {form.formState.errors.plan ? (
                <p className="text-xs text-red-300">{form.formState.errors.plan.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="projectType"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Project Type *
              </label>
              <select
                id="projectType"
                className={fieldClassName}
                defaultValue=""
                {...form.register("projectType")}
              >
                <option value="" disabled>
                  Select project type
                </option>
                {projectTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {projectTypeLabels[option]}
                  </option>
                ))}
              </select>
              {form.formState.errors.projectType ? (
                <p className="text-xs text-red-300">{form.formState.errors.projectType.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="budget"
                className="text-xs uppercase tracking-[0.14em] text-text-secondary"
              >
                Budget *
              </label>
              <select
                id="budget"
                className={fieldClassName}
                defaultValue=""
                {...form.register("budget")}
              >
                <option value="" disabled>
                  Select budget
                </option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {form.formState.errors.budget ? (
                <p className="text-xs text-red-300">{form.formState.errors.budget.message}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="timeline"
              className="text-xs uppercase tracking-[0.14em] text-text-secondary"
            >
              Timeline *
            </label>
            <select
              id="timeline"
              className={fieldClassName}
              defaultValue=""
              {...form.register("timeline")}
            >
              <option value="" disabled>
                Select timeline
              </option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {form.formState.errors.timeline ? (
              <p className="text-xs text-red-300">{form.formState.errors.timeline.message}</p>
            ) : null}
          </div>

          {showCustomBudgetHint ? (
            <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              Custom builds typically start at $5,000. You can still submit this inquiry and we&apos;ll
              suggest the best-fit path.
            </p>
          ) : null}

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-xs uppercase tracking-[0.14em] text-text-secondary"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full rounded-lg border border-white/15 bg-graphite-2/70 px-3 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Tell us about the build you need, key pages/features, and what success looks like."
              {...form.register("message")}
            />
            {form.formState.errors.message ? (
              <p className="text-xs text-red-300">{form.formState.errors.message.message}</p>
            ) : null}
          </div>

          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" autoComplete="off" tabIndex={-1} {...form.register("website")} />
          </div>

          <input type="hidden" {...form.register("pageUrl")} />

          {serverError ? (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {serverError}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full sm:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Send Inquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
}

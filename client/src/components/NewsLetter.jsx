import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-wide text-gray-900 dark:text-white leading-tight">
          🎉 Never Miss a Drop!
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground font-medium">
          Be the first to hear about exclusive offers, new arrivals, and
          members-only discounts. Subscribe to our newsletter today.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle submission logic
          }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:overflow-hidden sm:rounded-md max-w-2xl mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="rounded-md sm:rounded-none sm:rounded-l-md h-14 flex-1 text-lg placeholder:text-gray-400"
          />
          <Button
            type="submit"
            className="h-14 px-8 sm:rounded-none sm:rounded-r-md text-lg hover:bg-black"
          >
            Subscribe
          </Button>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          No spam. Just updates. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;

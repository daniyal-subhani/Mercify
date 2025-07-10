import { Card } from "@/components/ui/card";
import { signupSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { RouteIndex, RouteSignIn } from "@/helpers/routesName";
import { showToast } from "@/components/shared/showToast";
import appUtils from "@/lib/appUtils";
import { signUpThunk } from "@/store/thunks/authThunk";

const SignUp = () => {
  const { dispatch, navigate } = appUtils();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

   async function onSubmit(formData) {
  try {
    const resultAction = await dispatch(signUpThunk(formData));

    if (signUpThunk.fulfilled.match(resultAction)) {
      navigate(RouteIndex);
      showToast({
        message: "Account created successfully",
        type: "success",
        actionLabel: "Profile",
        onActionClick: () => {
          // Navigate to profile
        },
      });
    } else {
      const errorMessage =
        resultAction.payload || "Signup failed. Please try again.";
      showToast({
        message: errorMessage,
        type: "error",
      });
    }
  } catch (error) {
    console.error(error);
    showToast({
      message: "Something went wrong",
      type: "error",
    });
  }
}


  function onError(error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create Your Account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      {...field}
                      className="dark:bg-gray-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="dark:bg-gray-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      {...field}
                      className="dark:bg-gray-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to={RouteSignIn}
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign in here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;

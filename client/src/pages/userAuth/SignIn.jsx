import { Card } from "@/components/ui/card";
import { loginSchema } from "@/schemas/userSchema";
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
import { RouteIndex, RouteSignUp } from "@/helpers/routesName"; 
import appUtils from "@/lib/appUtils";
import { signInThunk } from "@/store/thunks/authThunk";
import { showToast } from "@/components/shared/showToast";

const SignIn = () => {
  const { dispatch, navigate } = appUtils();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    try {
      const result =await dispatch(signInThunk(formData));
      if (result.type === signInThunk.fulfilled.type) {
        navigate(RouteIndex);
        showToast({
          message: "User Logged in successfully",
          type: "success",
          actionLabel: "Profile",
          onActionClick: () => {
            //  profile route...
          },
        });
      } else {
        const errorMessage = result.payload.message || "Invalid Credentials";
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
          Sign In to Your Account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-5"
          >
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
                      placeholder="Enter your password"
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
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to={RouteSignUp}
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign up here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignIn;

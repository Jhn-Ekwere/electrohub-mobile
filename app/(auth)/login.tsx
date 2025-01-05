import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginEP, registerEP } from "@/api/auth";
import { z } from "zod";
import { ActivityIndicator } from "react-native";
import { Center } from "@/components/ui/center";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { useAuth } from "@/store/authStore";
import { Redirect } from "expo-router";

// Define Zod schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const loginSuccess = useAuth((state: any) => state.loginSuccess);
    const isLoggedIn = useAuth((state:any) => state.token);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: login, isPending: loginPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginEP(email, password),
    onSuccess: (data) => {
      if (data) {
        loginSuccess(data);
      }
      reset();
    },
    onError: (error) => {
      console.log("Login error", error);
      toast.show({
        placement: "top",
        duration: 1500,
        render: () => (
          <Toast action="error" variant="outline">
            <ToastTitle>Log in error</ToastTitle>
            <ToastDescription>{error.message}</ToastDescription>
          </Toast>
        ),
      });
    },
  });
  const { mutateAsync: signup, isPending: signupPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => registerEP(email, password),
    onSuccess: (data) => {
      if (data) {
        loginSuccess(data);
      }
      reset();
    },
    onError: (error) => {
      console.log("Sign up error", error);
      toast.show({
        placement: "top",
        duration: 1500,
        render: () => (
          <Toast action="error" variant="outline">
            <ToastTitle>Sign up error</ToastTitle>
            <ToastDescription>{error.message}</ToastDescription>
          </Toast>
        ),
      });
    },
  });

  const onLogin = (data: { email: string; password: string }) => login(data);
  const onSignup = (data: { email: string; password: string }) => signup(data);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }
  return (
    <FormControl className="p-4 border rounded-lg border-outline-300 bg-white m-4 max-w-[400px]">
      <VStack space="xl">
        <Heading className="text-typography-900 leading-1 pt-3 ">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1 ">Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value } }) => (
              <Input className="min-w-[250px]">
                <InputField type="text" value={value} onChangeText={onChange} placeholder="Enter your username" />
              </Input>
            )}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
            }}
            render={({ field: { onChange, value } }) => (
              <Input className="text-center">
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
        </VStack>
        <HStack space="xs">
          <Button className=" flex-1 " variant="outline" onPress={handleSubmit(onSignup)} disabled={signupPending}>
            <ButtonText>
              {signupPending ? (
                <Center className="flex-1 justify-center items-center">
                  <ActivityIndicator />
                </Center>
              ) : (
                "Sign up"
              )}
            </ButtonText>
          </Button>
          <Button className=" flex-1 " onPress={handleSubmit(onLogin)} disabled={loginPending}>
            <ButtonText>
              {loginPending ? (
                <Center className="flex-1 justify-center items-center">
                  <ActivityIndicator />
                </Center>
              ) : (
                "Sign in"
              )}
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}

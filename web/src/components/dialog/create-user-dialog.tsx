import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { Loader2, Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { api } from "@/lib/api";
import { userFormSchema } from "@/utils/models/user-zod-model";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useToast } from "../ui/use-toast";

export function CreateUserDialog() {
	const [loading, setLoading] = useState<boolean>();
	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof userFormSchema>>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			role: "MEMBER",
		},
	});

	async function onSubmit(values: z.infer<typeof userFormSchema>) {
		setLoading(true);

		try {
			await api.post("/users", values);
		} catch {
			setLoading(false);
			return toast({
				variant: "destructive",
				title: "An error occurred during your transaction",
				description:
					"If you are trying to create a user, probably another user already exists with the provided email",
			});
		}

		setLoading(false);
		setOpen(false);
		window.location.reload();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button className="flex gap-1">
					<Plus className="w-5 h-5" />
					Create new user
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Creating new user</DialogTitle>
				<DialogDescription>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												placeholder="Guilherme"
												{...field}
												className="dark:text-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												placeholder="Brasil"
												{...field}
												className="dark:text-primary"
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
										<FormLabel>E-mail</FormLabel>
										<FormControl>
											<Input
												placeholder="dev.guilhermebrasil@gmail.com"
												{...field}
												className="dark:text-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="telephone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telephone</FormLabel>
										<FormControl>
											<Input
												placeholder="77777777777"
												{...field}
												className="dark:text-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="User role" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="MEMBER">MEMBER</SelectItem>
													<SelectItem value="SUBSCRIBER">SUBSCRIBER</SelectItem>
													<SelectItem value="MODERATOR">MODERATOR</SelectItem>
													<SelectItem value="ADMIN">ADMIN</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{loading ? (
								<Button type="submit" disabled className="w-full">
									<Loader2 className="mr-2 h-6 w-6 animate-spin" />
								</Button>
							) : (
								<Button className="w-full" type="submit">
									Submit
								</Button>
							)}
						</form>
					</Form>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}

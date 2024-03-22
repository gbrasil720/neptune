'use client'

import type { NeptuneUtils } from '@/@types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { getSessionInfos } from '@/utils/getSessionInfos'
import { createClient } from '@/utils/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SettingsDisplayPage() {
	const [sessionInfos, setSessionInfos] = useState<NeptuneUtils.SessionInfos>()
	const form = useForm()
	const router = useRouter()
	const supabase = createClient()

	useEffect(() => {
		async function loadData() {
			const session = await getSessionInfos()

			setSessionInfos(session)
		}

		loadData()
	})

	async function handleSignOut() {
		await supabase.auth.signOut()

		router.push('/sign-in')
	}

	return (
		<div className="container mx-auto py-10 space-y-10">
			<div>
				<h3 className="text-lg font-medium">Account</h3>
				<p className="text-sm text-muted-foreground">
					All this information is from the Google account that you are logged
					in.
				</p>
			</div>
			<Separator />
			<Avatar className="size-40">
				<AvatarImage src={sessionInfos?.avatar} />
				<AvatarFallback>User</AvatarFallback>
			</Avatar>
			<Form {...form}>
				<form className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input value={sessionInfos?.name} disabled />
								</FormControl>
								<FormDescription>
									Thats the registered name at your account
								</FormDescription>
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
									<Input value={sessionInfos?.email} disabled />
								</FormControl>
								<FormDescription>
									Thats the account email that you are logged in
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{sessionInfos?.phone ? (
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telephone</FormLabel>
									<FormControl>
										<Input value={sessionInfos?.phone} disabled />
									</FormControl>
									<FormDescription>
										Thats the phone number associeted to your account
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<></>
					)}
					<FormField
						control={form.control}
						name="logout"
						render={({ field }) => (
							<FormItem className="py-8">
								<FormControl>
									<Button
										onClick={handleSignOut}
										className="bg-transparent border text-destructive hover:bg-destructive hover:text-white border-solid border-destructive gap-2 w-28"
									>
										<LogOut className="size-4" />
										Logout
									</Button>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}

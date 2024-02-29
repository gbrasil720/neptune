import { editUserFormSchema, userFormSchema } from '@/services/user-zod-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import { api } from '@/lib/api'
import { Spinner } from '@material-tailwind/react'
import { Loader2 } from 'lucide-react'

export function EditUserForm({ user }: any) {
  const [loading, setLoading] = useState<boolean>()
  const [deletingLoading, setDeletingLoading] = useState<boolean>()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
  })

  async function onSubmit(values: z.infer<typeof editUserFormSchema>) {
    setLoading(true)

    try {
      await api.patch(`/users/${user.id}`, { role: values.role })
    } catch (err) {
      return toast({
        variant: 'destructive',
        title: 'Oops! An error occurred!',
        description: `The user you are trying to edit, probably already has the inserted role`,
      })
    }

    setLoading(false)
    window.location.reload()
  }

  async function deleteUser() {
    console.log('DELETING')

    setDeletingLoading(true)

    try {
      await api.delete(`/users/${user.id}`)
    } catch {
      return toast({
        variant: 'destructive',
        title: 'Oops! An error occurred!',
        description:
          'An error occurred trying to delete this user, try again later',
      })
    }

    setDeletingLoading(false)
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} value={user.firstName} disabled />
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
                <Input {...field} value={user.lastName} disabled />
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
                <Input {...field} value={user.email} disabled />
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
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} value={user.telephone} disabled />
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
                <Select onValueChange={field.onChange} defaultValue={user.role}>
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
        <div className="flex justify-between">
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </Button>
          ) : (
            <Button disabled={deletingLoading}>Update user</Button>
          )}
          {deletingLoading ? (
            <Button disabled variant="destructive">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </Button>
          ) : (
            <Button
              type="button"
              disabled={loading}
              variant="destructive"
              onClick={deleteUser}
            >
              Delete user
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

import type { ColumnDef } from '@tanstack/react-table'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { appearanceFormSchema } from '@/utils/schemas/appearance-zod-model'
import type { languageSelectSchema } from '@/utils/schemas/language-zod-model'

export namespace NeptuneMain {
	export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
		items: {
			href: string
			title: string
		}[]
	}

	export interface AvatarDropdownProps {
		avatarSrc: string
		avatarFallback: string
	}

	export namespace UsersTable {
		export interface DataTable {
			table: {
				previousPage: () => void
				nextPage: () => void
				getCanPreviousPage: () => boolean
				getCanNextPage: () => boolean
				getAllColumns: () => any[]
			}
		}
		export interface DataTableProps<TData, TValue> {
			columns: ColumnDef<TData, TValue>[]
			data: TData[]
			teamId: string
		}
	}

	interface LinkProps extends NextLinkProps {
		children: ReactNode
	}

	export namespace Forms {
		export interface CreateUserFormProps {
			onSubmit: (values: z.infer<typeof userFormSchema>) => void
			loading: boolean | undefined
		}
		export interface CreateTeamFormProps {
			onSubmit: (values: z.infer<typeof teamFormSchema>) => void
			loading: boolean | undefined
		}

		export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
		export type AppearanceFormDefaultValues = Partial<AppearanceFormValues>

		export type LanguageFormValues = z.infer<typeof languageFormSchema>
		export type LanguageFormDefaultValues = Partial<LanguageFormValues>
	}

	export namespace Dialogs {
		export interface DeleteTeamDialogProps {
			teamId: string
			teamName: string
			teamUsersLength: number
		}
	}

	export interface SettingsLayoutProps {
		children: JSX.Element
	}
}

export namespace NeptuneUtils {
	export namespace Sidebar {
		export interface SidebarItem {
			title: string
			href: string
		}
		export type SidebarItemsProps = SidebarItem[]
	}

	export namespace APIRequests {
		export interface UserProps {
			id: string
			name: string
			email: string
			telephone: string
			birthDate: Date
			role: Role
			teamId: string
		}

		enum Role {
			MANAGER = 0,
			MODERATOR = 1,
			SUBSCRIBER = 2,
			MEMBER = 3,
		}

		export interface TeamProps {
			id: string
			name: string
			teamManagerId: string
			createdAt: string
			users: UserProps[]
		}

		export interface SingleTeamProps {
			teamId: string
		}

		export interface LoadingTeamsReturnProps {
			manager: {
				teams: TeamProps[]
			}
		}
	}

	export interface SessionInfos {
		id: string
		name: string
		email: string
		phone: string
		avatar: string
		session: Session | null
	}
}

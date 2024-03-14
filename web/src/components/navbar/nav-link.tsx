import Link, { type LinkProps as NextLinkProps } from "next/link";
import type { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
	children: ReactNode;
}

export function NavLink(props: LinkProps) {
	return (
		<Link
			{...props}
			className="flex h-14 items-center border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border data-[current=true]:border-teal-400 data-[current=true]:text-accent-foreground"
		>
			{props.children}
		</Link>
	);
}

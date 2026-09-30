import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitter,
	IconBrandYoutube,
} from '@tabler/icons-react';

/* ==========================================================================
   MINIMAL FOOTER — the shared site footer (rendered by SiteFooter).
   Self-contained: link data mirrors src/siteData.js (routes + footer data),
   so this ui/ primitive needs no cross-folder imports and carries no
   invented copy.

   Two adaptations from the pasted source:
   - lucide-react v1 removed brand icons (Facebook/Github/Instagram/Linkedin/
     Twitter/Youtube no longer exist as exports), so the socials come from
     @tabler/icons-react, already a project dependency.
   - The radial-glow arbitrary value used Tailwind v4 `--theme()` syntax;
     it is rewritten with hsl(var(--foreground)) for Tailwind v3.
   ========================================================================== */

export function MinimalFooter() {
	const year = new Date().getFullYear();

	const company = [
		{
			title: 'Solutions',
			href: '/solutions/',
		},
		{
			title: 'Work',
			href: '/work/',
		},
		{
			title: 'Approach',
			href: '/approach/',
		},
		{
			title: 'About',
			href: '/about/',
		},
		{
			title: 'Contact',
			href: '/contact/',
		},
	];

	const resources = [
		{
			title: 'Web Development',
			href: '/solutions/',
		},
		{
			title: 'SEO & Digital Growth',
			href: '/solutions/',
		},
		{
			title: 'IT Services',
			href: '/solutions/',
		},
		{
			title: 'Cybersecurity',
			href: '/solutions/',
		},
		{
			title: 'Business Technology',
			href: '/solutions/',
		},
		{
			title: 'HEXCYRA Academy',
			href: '/solutions/',
		},
	];

	const socialLinks = [
		{
			label: 'Facebook',
			icon: <IconBrandFacebook className="size-4" />,
			link: '#',
		},
		{
			label: 'GitHub',
			icon: <IconBrandGithub className="size-4" />,
			link: '#',
		},
		{
			label: 'Instagram',
			icon: <IconBrandInstagram className="size-4" />,
			link: '#',
		},
		{
			label: 'LinkedIn',
			icon: <IconBrandLinkedin className="size-4" />,
			link: '#',
		},
		{
			label: 'Twitter',
			icon: <IconBrandTwitter className="size-4" />,
			link: '#',
		},
		{
			label: 'YouTube',
			icon: <IconBrandYoutube className="size-4" />,
			link: '#',
		},
	];
	return (
		<footer className="relative">
			<div className="bg-[radial-gradient(35%_80%_at_30%_0%,hsl(var(--foreground)_/_0.08),transparent)] mx-auto max-w-4xl md:border-x">
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="/" className="w-max opacity-25" aria-label="HEXCYRA home">
							<span className="grid size-8 place-items-center rounded-full bg-foreground font-display text-sm font-bold text-background">
								H
							</span>
						</a>
						<p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
							Technology that moves business forward.
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item) => (
								<a
									key={item.label}
									className="hover:bg-accent rounded-md border p-1.5"
									target="_blank"
									rel="noreferrer"
									href={item.link}
									aria-label={item.label}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">
							Solutions
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">Company</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
					<p className="text-muted-foreground text-center font-thin">
						© <a href="/" className="hover:underline">HEXCYRA</a>. All rights
						reserved {year}
					</p>
				</div>
			</div>
		</footer>
	);
}

export default MinimalFooter;

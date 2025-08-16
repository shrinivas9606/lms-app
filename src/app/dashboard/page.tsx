"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function DashboardPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const supabase = supabaseBrowser();
				const { data: { session } } = await supabase.auth.getSession();
				if (!isMounted) return;
				if (!session) {
					router.replace("/login");
					return;
				}
				setEmail(session.user.email ?? null);
				setLoading(false);
			} catch (e) {
				router.replace("/login");
			}
		})();
		return () => { isMounted = false; };
	}, [router]);

	async function signOut() {
		const supabase = supabaseBrowser();
		await supabase.auth.signOut();
		router.replace("/login");
	}

	if (loading) {
		return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
	}

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-2xl mx-auto space-y-4">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<p className="text-sm text-gray-600">Signed in as {email}</p>
				<button onClick={signOut} className="border rounded px-3 py-2">Sign out</button>
			</div>
		</div>
	);
}
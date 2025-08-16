"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function signIn() {
		setLoading(true);
		setError(null);
		const supabase = supabaseBrowser();
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) {
			setError(error.message);
			return;
		}
		router.push("/dashboard");
	}

	async function signUp() {
		setLoading(true);
		setError(null);
		const supabase = supabaseBrowser();
		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (error) {
			setError(error.message);
			return;
		}
		// Email confirmation may be required depending on Supabase settings
		router.push("/dashboard");
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-4">
				<h1 className="text-2xl font-semibold">Login</h1>
				<div className="space-y-2">
					<label className="block text-sm">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full border rounded px-3 py-2"
						placeholder="you@example.com"
					/>
				</div>
				<div className="space-y-2">
					<label className="block text-sm">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border rounded px-3 py-2"
						placeholder="••••••••"
					/>
				</div>
				{error && <p className="text-sm text-red-600">{error}</p>}
				<div className="flex gap-2">
					<button onClick={signIn} disabled={loading} className="flex-1 bg-black text-white rounded px-3 py-2">
						{loading ? "Loading..." : "Sign In"}
					</button>
					<button onClick={signUp} disabled={loading} className="flex-1 border rounded px-3 py-2">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
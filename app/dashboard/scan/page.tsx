// ============================================
// FILE: app/dashboard/scan/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Scan } from "lucide-react";
import { wasteTypes } from "@/lib/data";

interface ValuationResult {
	plastic_name: string;
	unit_price: number;
	quantity: number;
	total_price: number;
}

export default function ScanPage() {
	const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
	const [quantity, setQuantity] = useState("");
	const [showCamera, setShowCamera] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		return () => {
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop());
				streamRef.current = null;
			}
		};
	}, []);

	const stopStream = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		}
		if (videoRef.current) videoRef.current.srcObject = null;
	};

	const handleScan = async () => {
		setCapturedImage(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" },
				audio: false,
			});
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
			setShowCamera(true);
		} catch (err) {
			console.error("Could not access camera:", err);
			alert("Unable to access camera. Check permissions and try again.");
		}
	};

	const handleCapture = async () => {
		if (!videoRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current || document.createElement("canvas");
		canvas.width = video.videoWidth || 640;
		canvas.height = video.videoHeight || 480;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataUrl = canvas.toDataURL("image/png");
		setCapturedImage(dataUrl);
		stopStream();
		setShowCamera(false);
	};

	const handleEstimate = async () => {
		if (!capturedImage || !quantity) return;
		setIsLoading(true);

		try {
			const userId = 1; // Get from localStorage or auth context
			const imageBase64 = capturedImage.split(',')[1]; // Remove data:image/png;base64, prefix

			const response = await fetch("https://hydralink.onrender.com/valuation/estimate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					image: imageBase64,
					quantity: parseInt(quantity),
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setValuationResult(data);
			} else {
				alert("Failed to estimate plastic value. Please try again.");
			}
		} catch (error) {
			alert("Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancelCamera = () => {
		stopStream();
		setShowCamera(false);
	};



	return (
		<div className="h-full bg-slate-900 overflow-y-auto">
			<div className="p-6">
				<h1 className="text-2xl font-bold text-white mb-2">Scan Waste</h1>
				<p className="text-slate-400 mb-6">
					Scan plastic waste to see its value
				</p>

				{/* Scanner */}
				<div className="mb-6">
					{showCamera ? (
						<div className="relative aspect-square bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
							<video
								ref={videoRef}
								className="w-full h-full object-cover rounded-2xl"
								playsInline
							/>
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
								<button
									onClick={handleCapture}
									className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold">
										Capture
									</button>
								<button
									onClick={handleCancelCamera}
									className="px-4 py-2 bg-slate-700 text-white rounded-xl">
										Cancel
									</button>
							</div>
						</div>
					) : (
						<button
							onClick={handleScan}
							className="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border-2 border-dashed border-slate-600 hover:border-blue-500 transition-all flex flex-col items-center justify-center group">
							<Scan className="w-16 h-16 text-slate-500 group-hover:text-blue-400 transition-colors mb-3" />
							<span className="text-slate-400 group-hover:text-white transition-colors">
								Tap to scan waste
							</span>
						</button>
					)}

					{/* Captured image and quantity input */}
					{capturedImage && (
						<div className="mt-4 bg-slate-800/50 rounded-2xl p-4">
							<img src={capturedImage} alt="captured plastic" className="w-full h-48 object-cover rounded-xl mb-4" />
							<div className="space-y-3">
								<div>
									<label className="block text-sm text-slate-400 mb-2">
										Quantity (pieces)
									</label>
									<input
										type="number"
										value={quantity}
										onChange={(e) => setQuantity(e.target.value)}
										placeholder="Enter quantity"
										className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<button
									onClick={handleEstimate}
									disabled={!quantity || isLoading}
									className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50">
									{isLoading ? "Estimating..." : "Get Estimate"}
								</button>
							</div>
						</div>
					)}

					<canvas ref={canvasRef} className="hidden" />
				</div>

				{/* Valuation Result */}
				{valuationResult && (
					<div className="bg-slate-800/50 rounded-2xl p-5 mb-6 border border-green-500/30">
						<div className="flex items-start justify-between mb-4">
							<div>
								<h3 className="text-lg font-bold text-white mb-1">
									{valuationResult.plastic_name}
								</h3>
								<p className="text-sm text-slate-400">
									Quantity: {valuationResult.quantity} pieces
								</p>
							</div>
							<div className="text-right">
								<div className="text-2xl font-bold text-green-400">
									₦{valuationResult.unit_price}
								</div>
								<div className="text-xs text-slate-400">per piece</div>
							</div>
						</div>

						<div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 mb-4">
							<div className="text-sm text-slate-400 mb-1">
								Total Value
							</div>
							<div className="text-3xl font-bold text-green-400">
								₦{valuationResult.total_price}
							</div>
						</div>

						<button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all">
							Submit for Collection
						</button>
					</div>
				)}

				{!capturedImage && (
					<div>
						<h2 className="text-lg font-bold text-white mb-4">
							Accepted Waste Types
						</h2>
						<div className="space-y-2">
							{wasteTypes.map((item, index) => (
								<div
									key={index}
									className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between">
									<div>
										<div className="font-medium text-white">{item.type}</div>
										<div className="text-sm text-slate-400">
											{item.description}
										</div>
									</div>
									<div className="text-right">
										<div className="font-bold text-green-400">
											₦{item.pricePerKg}
										</div>
										<div className="text-xs text-slate-400">per kg</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

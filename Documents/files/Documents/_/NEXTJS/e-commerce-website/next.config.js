/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"pexels.com",
			"images.unsplash.com",
			"duyt4h9nfnj50.cloudfront.net",
		],
	},
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: "https",
	// 			hostname: "pexels.com",
	// 			// port: "",
	// 			pathname: "/account123/**",
	// 		},
	// 	],
	// },
};

module.exports = nextConfig;

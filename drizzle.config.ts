import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'drizzle-kit'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const migrationUrl =
	process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (!migrationUrl) {
	throw new Error('DATABASE_URL is not set in .env.local')
}

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: migrationUrl,
	},
	casing: 'snake_case',
	verbose: true,
	strict: true,
})

import {
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

export const workflows = pgTable(
	'workflows',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: text('org_id').notNull(),
		name: text('name').notNull(),
		graph: jsonb('graph'),
		createdAt: timestamp('created_at', { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index('workflows_org_id_idx').on(table.orgId)]
)

export type Workflow = typeof workflows.$inferSelect

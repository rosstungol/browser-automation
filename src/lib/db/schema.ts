import type { Edge } from '@xyflow/react'
import {
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

import type { StepNodeType } from '@/features/workflows/nodes/node-registry'

export type WorkflowGraph = { nodes: StepNodeType[]; edges: Edge[] }

export const workflows = pgTable(
	'workflows',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: text('org_id').notNull(),
		name: text('name').notNull(),
		graph: jsonb('graph').$type<WorkflowGraph>(),
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

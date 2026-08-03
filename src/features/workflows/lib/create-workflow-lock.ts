'use client'

import { useSyncExternalStore } from 'react'

let inFlight = false
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

function emit() {
	for (const listener of listeners) listener()
}

export function useCreateWorkflowInFlight() {
	return useSyncExternalStore(subscribe, () => inFlight)
}

export function tryAcquireCreateWorkflowLock() {
	if (inFlight) return false
	inFlight = true
	emit()
	return true
}

export function releaseCreateWorkflowLock() {
	inFlight = false
	emit()
}

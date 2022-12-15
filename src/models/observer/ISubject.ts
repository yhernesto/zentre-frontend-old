import type { IObserver } from "./IObserver";

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
export interface ISubject {
	// Attach an observer to the subject.
	attach(observer: IObserver): void;

	// Detach an observer from the subject.
	detach(observer: IObserver): void;

	// Notify all observers about an event.
	notify(): void;
}
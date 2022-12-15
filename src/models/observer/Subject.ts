// https://refactoring.guru/design-patterns/observer/typescript/example

import type { ISubject } from "./ISubject";
import type { IObserver } from "./IObserver";

/**
* The Subject owns some important state and notifies observers when the state
* changes.
*/
export class ConcreteSubject implements ISubject {
	/**
	 * @type {number} For the sake of simplicity, the Subject's state, essential
	 * to all subscribers, is stored in this variable.
	 */
	public state: number = 0;

	/**
	 * @type {IObserver[]} List of subscribers. In real life, the list of
	 * subscribers can be stored more comprehensively (categorized by event
	 * type, etc.).
	 */
	private observers: IObserver[] = [];

	/**
	 * The subscription management methods.
	 */
	public attach(observer: IObserver): void {
			const isExist = this.observers.includes(observer);
			if (isExist) {
					return // console.log('Subject: Observer has been attached already.');
			}
			// console.log('Subject: Attached an observer.');
			this.observers.push(observer);
	}

	public detach(observer: IObserver): void {
			const observerIndex = this.observers.indexOf(observer);
			if (observerIndex === -1) {
					return //console.log('Subject: Nonexistent observer.');
			}

			this.observers.splice(observerIndex, 1);
			// console.log('Subject: Detached an observer.');
	}

	/**
	 * Trigger an update in each subscriber.
	 */
	public notify(): void {
			// console.log('Subject: Notifying observers...');
			for (const observer of this.observers) {
					observer.update(this);
			}
	}

	/**
	 * Usually, the subscription logic is only a fraction of what a Subject can
	 * really do. Subjects commonly hold some important business logic, that
	 * triggers a notification method whenever something important is about to
	 * happen (or after it).
	 */
	public someBusinessLogic(): void {
			// console.log('\nSubject: I\'m doing something important.');
			this.state = Math.floor(Math.random() * (10 + 1));

			// console.log(`Subject: My state has just changed to: ${this.state}`);
			this.notify();
	}
}

// ***********************
// *** Example of Observer
// ***********************

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
// class ConcreteObserverA implements Observer {
//   public update(subject: Subject): void {
//       if (subject instanceof ConcreteSubject) {
//           console.log('ConcreteObserverA: Reacted to the event.');
//       }
//   }
// }
import { Notify } from "quasar";

/**
 * This function creates a notification with the given parameters.
 * @param {string} p_message - The message you want to display
 * @param {string} [p_type] - success, info, warning, error
 * @param {string} [p_color] - background color of the notification
 * @param {string} [p_textcolor] - The color of the text
 * @param {string} [p_icon] - the icon to display on the left of the message
 */
export function createMessageNotification(
  p_message: string,
  p_type?: string,
  p_color?: string,
  p_textcolor?: string,
  p_icon?: string
) {
  Notify.create({
    message: p_message,
    color: p_color,
    type: p_type,
    textColor: p_textcolor,
    icon: p_icon,
  });
}

/**
 * This function creates a positive notification with the message passed in as a parameter.
 * @param {string} p_message - string - The message to display in the notification
 */
export function createPositiveNotification(
  p_message: string,
) {
  Notify.create({
    message: p_message,
    type: 'positive',
  });
}

/**
 * This function creates a notification with a negative type and a message that is passed in as a
 * parameter.
 * @param {string} p_message - The message to display in the notification
 */
export function createErrorNotification(p_message: string) {
  Notify.create({
    message: p_message,
    type: 'negative',
  });
}

/**
 * This function creates a warning notification with the message passed in as a parameter.
 * @param {string} p_message - The message to display in the notification
 */
export function createWarnNotification(p_message: string) {
  Notify.create({
    message: p_message,
    type: 'warning',
  });
}

/**
 * This function creates a notification with the message passed in as a parameter and sets the type to
 * info.
 * @param {string} p_message - The message to display in the notification.
 */
export function createInfoNotification(p_message: string) {
  Notify.create({
    message: p_message,
    type: 'info',
  });
}

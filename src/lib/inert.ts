/**
 * React 18 does not type the `inert` attribute yet. Spread the result onto an element
 * to make it (and its children) unfocusable and hidden from assistive tech.
 */
export const inertProps = (on: boolean | undefined): Record<string, string> => (on ? { inert: '' } : {});

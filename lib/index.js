/**
 * dsh-skin — host half.
 *
 * The host side is intentionally a no-op loader entry: the whole feature
 * lives in the browser half (`./client`), which DSH's dsh-client-modules
 * picks up through the package's `dsh.client` declaration — the same shape
 * as the shipped ui-* packages. The skin choice is persisted in
 * localStorage, because the Host settings wire only exposes an allowlisted
 * set of namespaces to browser clients (dsh-host-apiproxy's
 * WEB_SETTINGS_NAMESPACES), so a third-party namespace would answer
 * `settings-not-exposed`; the product itself keeps remote browser
 * preferences process-local.
 */

/** Host loader entry for the browser implementation exported from `./client`. */
export function apply() {}

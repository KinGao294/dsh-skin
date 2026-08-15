/**
 * dsh-skin client half types: curated skins, wallpaper row, and the
 * client plugin body.
 */
import type { Context } from "@deepseek-ai/cordis";
import type { ThemeDefinition } from "@deepseek-ai/dsh-client-ui-theme/client";
/** One selectable skin (a registered third-party theme). Extra `labelKey` is for i18n. */
export declare const SKINS: readonly (ThemeDefinition & { labelKey: string })[];
/** The settings row's locale namespace. */
export declare const SETTINGS_NS: "settings.skin";
/** Sentinel meaning "no custom skin". */
export declare const DEFAULT_SKIN: "system";
/** Required services (cordis fiber inject). */
export declare const inject: string[];
/** Register skins, restore saved skin once, mount skin + wallpaper rows. */
export declare function apply(ctx: Context): void;

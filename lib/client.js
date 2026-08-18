// dsh-skin — browser half (client plugin bundle).
//
// Loaded by dsh-client-modules at /plugins/dsh-skin/client.js and executed
// through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
//
// Persistence note: the skin choice and wallpaper settings are stored in
// localStorage. DSH's Host settings wire only exposes an allowlisted set of
// namespaces to browser clients (dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES),
// so a third-party namespace would answer `settings-not-exposed`; the product
// itself keeps remote browser preferences process-local, and localStorage
// matches that boundary for visual preferences while surviving reloads on the
// same origin.
window.__ModuleLoader__.load({
	id: "dsh-skin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _react = require("react");
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region dsh-skin: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.skin";
		/** localStorage key holding the selected skin id. */
		const STORAGE_KEY = "dsh-skin:skin";
		/** localStorage key holding the wallpaper image (data URL). */
		const WALLPAPER_KEY = "dsh-skin:wallpaper";
		/** localStorage key holding the wallpaper wash opacity (0..1). */
		const WALLPAPER_OPACITY_KEY = "dsh-skin:wallpaper-opacity";
		/** localStorage key holding the wallpaper blur radius (px). */
		const WALLPAPER_BLUR_KEY = "dsh-skin:wallpaper-blur";
		/** localStorage key holding the wallpaper display mode. */
		const WALLPAPER_FIT_KEY = "dsh-skin:wallpaper-fit";
		/** Sentinel meaning "no custom skin — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";
		/** Default wash opacity (0..1) applied to the translucent surfaces. */
		const DEFAULT_WALLPAPER_OPACITY = 0.8;
		/** Default wallpaper blur radius in px. */
		const DEFAULT_WALLPAPER_BLUR = 0;
		/** Default wallpaper display mode. */
		const DEFAULT_WALLPAPER_FIT = "cover";
		/** Accepted wallpaper display modes. */
		const WALLPAPER_FITS = ["cover", "contain", "stretch", "tile"];
		/** Soft cap for persisted data: URLs (localStorage quota). */
		const MAX_DATA_URL = 1800000;
		/** Source identity for the wallpaper's token override layer. */
		const OVERRIDE_SOURCE = "dsh-skin:wallpaper";
		/** Built-in base colors used when no skin token overrides the scheme. */
		const BUILTIN_BASE = {
			light: "rgb(255, 255, 255)",
			dark: "rgb(21, 21, 23)"
		};

		/**
		 * The curated skin catalog. Every skin is a third-party theme for the
		 * built-in ThemeRuntime: an id, the base palette it builds on
		 * (colorScheme drives body[data-ds-dark-theme]), and --dsw-alias-*
		 * overrides applied as inline custom properties on <body> by ui-layout's
		 * ThemePresenter. Values are concrete CSS colors (no var() indirection),
		 * tuned per skin for contrast on both surface and text roles.
		 */
		const SKINS = [
			{
				id: "skin-ocean",
				labelKey: "ocean",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0a101f",
					"--dsw-alias-bg-layer-1": "#101a30",
					"--dsw-alias-bg-layer-2": "#16233e",
					"--dsw-alias-bg-layer-3": "#1c2c4d",
					"--dsw-alias-bg-overlay": "#1e2c49",
					"--dsw-alias-border-l1": "rgba(148, 163, 184, 0.14)",
					"--dsw-alias-border-l2": "rgba(148, 163, 184, 0.26)",
					"--dsw-alias-label-primary": "#e9eef9",
					"--dsw-alias-label-secondary": "#a5b3cc",
					"--dsw-alias-label-tertiary": "#7e8da8",
					"--dsw-alias-brand-primary": "#4d86f8",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#6d9dfa",
					"--dsw-alias-button-primary-dimmed": "#16233e",
					"--dsw-alias-state-business-primary": "#4d86f8",
					"--dsw-alias-state-business-tertiary": "#16233e",
					"--dsw-alias-interactive-bg-hover": "rgba(77, 134, 248, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(77, 134, 248, 0.2)",
					"--dsw-alias-markdown-code-block": "#0d1426",
					"--dsw-alias-markdown-inline-code": "#16233e",
					"--dsw-specific-sidebar-fill": "#0d1426",
					"--dsw-specific-sidebar-nav-item-active": "#16233e",
					"--dsw-specific-sidebar-nav-item-hover": "#121c31",
					"--dsw-alias-scrollbar-bg-l1": "#1c2c4d",
					"--dsw-alias-scrollbar-bg-l2": "#23365e",
					"--dsw-alias-scrollbar-hover-l1": "#2a3f6d",
					"--dsw-alias-scrollbar-hover-l2": "#2a3f6d"
				}
			},
			{
				id: "skin-graphite",
				labelKey: "graphite",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0f0f11",
					"--dsw-alias-bg-layer-1": "#17171a",
					"--dsw-alias-bg-layer-2": "#1e1e22",
					"--dsw-alias-bg-layer-3": "#26262b",
					"--dsw-alias-bg-overlay": "#27272c",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.07)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.14)",
					"--dsw-alias-label-primary": "#ededf0",
					"--dsw-alias-label-secondary": "#a2a2ab",
					"--dsw-alias-label-tertiary": "#82828c",
					"--dsw-alias-brand-primary": "#b9bdc8",
					"--dsw-alias-brand-text": "#101012",
					"--dsw-alias-button-primary-hover": "#d2d5de",
					"--dsw-alias-button-primary-dimmed": "#26262b",
					"--dsw-alias-state-business-primary": "#b9bdc8",
					"--dsw-alias-state-business-tertiary": "#26262b",
					"--dsw-alias-interactive-bg-hover": "rgba(255, 255, 255, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(255, 255, 255, 0.14)",
					"--dsw-alias-markdown-code-block": "#141417",
					"--dsw-alias-markdown-inline-code": "#1e1e22",
					"--dsw-specific-sidebar-fill": "#141417",
					"--dsw-specific-sidebar-nav-item-active": "#1e1e22",
					"--dsw-specific-sidebar-nav-item-hover": "#1a1a1e",
					"--dsw-alias-scrollbar-bg-l1": "#2e2e34",
					"--dsw-alias-scrollbar-bg-l2": "#383840",
					"--dsw-alias-scrollbar-hover-l1": "#45454e",
					"--dsw-alias-scrollbar-hover-l2": "#45454e"
				}
			},
			{
				id: "skin-forest",
				labelKey: "forest",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0a120d",
					"--dsw-alias-bg-layer-1": "#101a13",
					"--dsw-alias-bg-layer-2": "#17241a",
					"--dsw-alias-bg-layer-3": "#1e2e22",
					"--dsw-alias-bg-overlay": "#203024",
					"--dsw-alias-border-l1": "rgba(134, 239, 172, 0.1)",
					"--dsw-alias-border-l2": "rgba(134, 239, 172, 0.2)",
					"--dsw-alias-label-primary": "#e7f5eb",
					"--dsw-alias-label-secondary": "#9dc4a9",
					"--dsw-alias-label-tertiary": "#7ba68a",
					"--dsw-alias-brand-primary": "#34d37b",
					"--dsw-alias-brand-text": "#04120a",
					"--dsw-alias-button-primary-hover": "#5ae295",
					"--dsw-alias-button-primary-dimmed": "#17241a",
					"--dsw-alias-state-business-primary": "#34d37b",
					"--dsw-alias-state-business-tertiary": "#17241a",
					"--dsw-alias-interactive-bg-hover": "rgba(52, 211, 123, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(52, 211, 123, 0.2)",
					"--dsw-alias-markdown-code-block": "#0c1510",
					"--dsw-alias-markdown-inline-code": "#17241a",
					"--dsw-specific-sidebar-fill": "#0c1510",
					"--dsw-specific-sidebar-nav-item-active": "#17241a",
					"--dsw-specific-sidebar-nav-item-hover": "#111d15",
					"--dsw-alias-scrollbar-bg-l1": "#1e2e22",
					"--dsw-alias-scrollbar-bg-l2": "#26402e",
					"--dsw-alias-scrollbar-hover-l1": "#2f5038",
					"--dsw-alias-scrollbar-hover-l2": "#2f5038"
				}
			},
			{
				id: "skin-sunset",
				labelKey: "sunset",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#150f1f",
					"--dsw-alias-bg-layer-1": "#1d152b",
					"--dsw-alias-bg-layer-2": "#261c38",
					"--dsw-alias-bg-layer-3": "#302346",
					"--dsw-alias-bg-overlay": "#312548",
					"--dsw-alias-border-l1": "rgba(233, 213, 255, 0.1)",
					"--dsw-alias-border-l2": "rgba(233, 213, 255, 0.2)",
					"--dsw-alias-label-primary": "#f4edfc",
					"--dsw-alias-label-secondary": "#c2aee0",
					"--dsw-alias-label-tertiary": "#9f8cc2",
					"--dsw-alias-brand-primary": "#c084fc",
					"--dsw-alias-brand-text": "#1a0f26",
					"--dsw-alias-button-primary-hover": "#d4a4fd",
					"--dsw-alias-button-primary-dimmed": "#261c38",
					"--dsw-alias-state-business-primary": "#c084fc",
					"--dsw-alias-state-business-tertiary": "#261c38",
					"--dsw-alias-interactive-bg-hover": "rgba(192, 132, 252, 0.14)",
					"--dsw-alias-interactive-bg-active": "rgba(192, 132, 252, 0.24)",
					"--dsw-alias-markdown-code-block": "#181022",
					"--dsw-alias-markdown-inline-code": "#261c38",
					"--dsw-specific-sidebar-fill": "#181022",
					"--dsw-specific-sidebar-nav-item-active": "#261c38",
					"--dsw-specific-sidebar-nav-item-hover": "#1d1429",
					"--dsw-alias-scrollbar-bg-l1": "#302346",
					"--dsw-alias-scrollbar-bg-l2": "#3d2d5a",
					"--dsw-alias-scrollbar-hover-l1": "#4a3770",
					"--dsw-alias-scrollbar-hover-l2": "#4a3770"
				}
			},
			{
				id: "skin-midnight",
				labelKey: "midnight",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#000000",
					"--dsw-alias-bg-layer-1": "#0b0b0f",
					"--dsw-alias-bg-layer-2": "#141419",
					"--dsw-alias-bg-layer-3": "#1c1c23",
					"--dsw-alias-bg-overlay": "#1d1d24",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.06)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.12)",
					"--dsw-alias-label-primary": "#e8e8ee",
					"--dsw-alias-label-secondary": "#9d9daa",
					"--dsw-alias-label-tertiary": "#7c7c88",
					"--dsw-alias-brand-primary": "#7c8cff",
					"--dsw-alias-brand-text": "#05050a",
					"--dsw-alias-button-primary-hover": "#9aa7ff",
					"--dsw-alias-button-primary-dimmed": "#141419",
					"--dsw-alias-state-business-primary": "#7c8cff",
					"--dsw-alias-state-business-tertiary": "#141419",
					"--dsw-alias-interactive-bg-hover": "rgba(124, 140, 255, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(124, 140, 255, 0.2)",
					"--dsw-alias-markdown-code-block": "#08080b",
					"--dsw-alias-markdown-inline-code": "#141419",
					"--dsw-specific-sidebar-fill": "#08080b",
					"--dsw-specific-sidebar-nav-item-active": "#141419",
					"--dsw-specific-sidebar-nav-item-hover": "#0e0e13",
					"--dsw-alias-scrollbar-bg-l1": "#1c1c23",
					"--dsw-alias-scrollbar-bg-l2": "#26262f",
					"--dsw-alias-scrollbar-hover-l1": "#31313c",
					"--dsw-alias-scrollbar-hover-l2": "#31313c"
				}
			},
			{
				id: "skin-paper",
				labelKey: "paper",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#faf7f1",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f4efe5",
					"--dsw-alias-bg-layer-3": "#ebe3d4",
					"--dsw-alias-bg-overlay": "#fffdf8",
					"--dsw-alias-border-l1": "rgba(120, 96, 48, 0.1)",
					"--dsw-alias-border-l2": "rgba(120, 96, 48, 0.18)",
					"--dsw-alias-label-primary": "#2e2a22",
					"--dsw-alias-label-secondary": "#6f675a",
					"--dsw-alias-label-tertiary": "#8e8578",
					"--dsw-alias-brand-primary": "#b45309",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#d97706",
					"--dsw-alias-button-primary-dimmed": "#f4efe5",
					"--dsw-alias-state-business-primary": "#b45309",
					"--dsw-alias-state-business-tertiary": "#f4efe5",
					"--dsw-alias-interactive-bg-hover": "rgba(180, 83, 9, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(180, 83, 9, 0.14)",
					"--dsw-alias-markdown-code-block": "#f4efe5",
					"--dsw-alias-markdown-inline-code": "#f0e9da",
					"--dsw-specific-sidebar-fill": "#f4efe5",
					"--dsw-specific-sidebar-nav-item-active": "#ebe3d4",
					"--dsw-specific-sidebar-nav-item-hover": "#eee7d8",
					"--dsw-alias-scrollbar-bg-l1": "#e0d6c2",
					"--dsw-alias-scrollbar-bg-l2": "#d8ccb4",
					"--dsw-alias-scrollbar-hover-l1": "#cdbfa3",
					"--dsw-alias-scrollbar-hover-l2": "#cdbfa3"
				}
			},
			{
				id: "skin-sakura",
				labelKey: "sakura",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#fdf5f7",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f9e8ee",
					"--dsw-alias-bg-layer-3": "#f2dae3",
					"--dsw-alias-bg-overlay": "#fffbfc",
					"--dsw-alias-border-l1": "rgba(190, 80, 120, 0.1)",
					"--dsw-alias-border-l2": "rgba(190, 80, 120, 0.18)",
					"--dsw-alias-label-primary": "#3b2530",
					"--dsw-alias-label-secondary": "#8b6576",
					"--dsw-alias-label-tertiary": "#a27f8f",
					"--dsw-alias-brand-primary": "#db2777",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#ec4899",
					"--dsw-alias-button-primary-dimmed": "#f9e8ee",
					"--dsw-alias-state-business-primary": "#db2777",
					"--dsw-alias-state-business-tertiary": "#f9e8ee",
					"--dsw-alias-interactive-bg-hover": "rgba(219, 39, 119, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(219, 39, 119, 0.14)",
					"--dsw-alias-markdown-code-block": "#f9e8ee",
					"--dsw-alias-markdown-inline-code": "#f2dae3",
					"--dsw-specific-sidebar-fill": "#f9e8ee",
					"--dsw-specific-sidebar-nav-item-active": "#f2dae3",
					"--dsw-specific-sidebar-nav-item-hover": "#f6e0e8",
					"--dsw-alias-scrollbar-bg-l1": "#eccfda",
					"--dsw-alias-scrollbar-bg-l2": "#e4c0cf",
					"--dsw-alias-scrollbar-hover-l1": "#d9afc1",
					"--dsw-alias-scrollbar-hover-l2": "#d9afc1"
				}
			}
		];

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "皮肤",
			"skin.default": "默认",
			"skin.ocean": "深海蓝",
			"skin.graphite": "石墨灰",
			"skin.forest": "森林绿",
			"skin.sunset": "落日紫",
			"skin.midnight": "午夜黑",
			"skin.paper": "纸感暖",
			"skin.sakura": "樱花粉",
			"background.title": "背景图片",
			"background.choose": "选择图片",
			"background.remove": "移除",
			"background.opacity": "界面遮罩",
			"background.blur": "模糊",
			"background.fit": "显示方式",
			"background.fit.cover": "铺满",
			"background.fit.contain": "完整显示",
			"background.fit.stretch": "拉伸",
			"background.fit.tile": "平铺",
			"background.urlPlaceholder": "或粘贴图片/视频网址",
			"background.urlApply": "应用",
			"background.urlInvalid": "请使用 http(s) 或 data 地址（不要用 blob）",
			"background.videoHint": "本地视频请改用网址（不会上传到本机服务）",
			"background.errorTooLarge": "图片太大，存不下",
			"background.errorRead": "无法读取这张图片",
			"background.errorSave": "存盘失败（空间不够或浏览器限制了）",
			"background.errorBlob": "blob 地址刷新后会失效，请用 http(s) 或选择本地图片",
			"background.errorDead": "壁纸地址已失效，已清除",
			"background.hint": "数字越高，界面越实、壁纸越弱。图片或视频透在主内容区和侧栏上，消息气泡保持不透明",
			"pet.title": "奶龙桌宠",
			"pet.enable": "显示奶龙桌宠",
			"pet.size": "大小",
			"pet.resetPos": "重置位置",
			"pet.hint": "小恐龙会跟着对话状态变表情（思考 / 干活 / 完成 / 睡觉），点它或打开 🎨 表情包手动换表情",
			"pet.mood.idle": "待机",
			"pet.mood.happy": "开心",
			"pet.mood.thinking": "思考",
			"pet.mood.working": "干活",
			"pet.mood.done": "完成",
			"pet.mood.sad": "委屈",
			"pet.mood.surprised": "惊讶",
			"pet.mood.sleeping": "睡觉"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Skins",
			"skin.default": "Default",
			"skin.ocean": "Ocean",
			"skin.graphite": "Graphite",
			"skin.forest": "Forest",
			"skin.sunset": "Sunset",
			"skin.midnight": "Midnight",
			"skin.paper": "Paper",
			"skin.sakura": "Sakura",
			"background.title": "Wallpaper",
			"background.choose": "Choose image",
			"background.remove": "Remove",
			"background.opacity": "UI wash",
			"background.blur": "Blur",
			"background.fit": "Fit",
			"background.fit.cover": "Cover",
			"background.fit.contain": "Contain",
			"background.fit.stretch": "Stretch",
			"background.fit.tile": "Tile",
			"background.urlPlaceholder": "Or paste an image/video URL",
			"background.urlApply": "Apply",
			"background.urlInvalid": "Use an http(s) or data URL (not blob)",
			"background.videoHint": "For local video, paste a URL (nothing is uploaded)",
			"background.errorTooLarge": "Image is too large to save",
			"background.errorRead": "Could not read that image",
			"background.errorSave": "Could not save (storage full or blocked)",
			"background.errorBlob": "blob URLs die on reload — use http(s) or pick a local image",
			"background.errorDead": "Wallpaper URL was invalid and was cleared",
			"background.hint": "Higher wash = more solid UI, weaker wallpaper. The image or video shows through the main canvas and sidebar; bubbles stay opaque",
			"pet.title": "Nai Long pet",
			"pet.enable": "Show the pet",
			"pet.size": "Size",
			"pet.resetPos": "Reset position",
			"pet.hint": "The dragon reacts to the conversation state (thinking / working / done / sleeping). Click it or open the 🎨 sticker pack to pick a mood.",
			"pet.mood.idle": "Idle",
			"pet.mood.happy": "Happy",
			"pet.mood.thinking": "Thinking",
			"pet.mood.working": "Working",
			"pet.mood.done": "Done",
			"pet.mood.sad": "Sad",
			"pet.mood.surprised": "Surprised",
			"pet.mood.sleeping": "Sleeping"
		};
		//#endregion

		//#region dsh-skin: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
				return true;
			} catch {
				return false;
			}
		}

		/** Map legacy unprefixed ids (sakura, graphite, ...) to skin-* */
		function normalizeSkinId(id) {
			if (typeof id !== "string") return id;
			if (SKINS.some((s) => s.id === id)) return id;
			const prefixed = id.startsWith("skin-") ? id : `skin-${id}`;
			return SKINS.some((s) => s.id === prefixed) ? prefixed : id;
		}

		/** Saved skin id (may be unknown/absent). */
		function readSavedSkin() {
			const raw = readStorage(STORAGE_KEY);
			return raw === null ? null : normalizeSkinId(raw);
		}

		/** Persist a skin choice; DEFAULT_SKIN clears the stored value. */
		function writeSavedSkin(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_SKIN ? null : id);
		}

		/** Wallpaper URL (null when unset, invalid, or too large to persist). */
		function readWallpaper() {
			const value = readStorage(WALLPAPER_KEY);
			if (value === null || value.length === 0) return null;
			const sanitized = sanitizeWallpaperUrl(value);
			if (sanitized === null || dataUrlTooLarge(sanitized)) {
				writeStorage(WALLPAPER_KEY, null);
				if (wallpaperError === null) wallpaperError = "dead";
				return null;
			}
			return sanitized;
		}

		/** Wash opacity 0..1 (clamped; default when unset). */
		function readWallpaperOpacity() {
			const raw = readStorage(WALLPAPER_OPACITY_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_OPACITY;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_WALLPAPER_OPACITY;
		}

		/** Blur radius in px (clamped to 0..60; default when unset). */
		function readWallpaperBlur() {
			const raw = readStorage(WALLPAPER_BLUR_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_BLUR;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(60, Math.max(0, value)) : DEFAULT_WALLPAPER_BLUR;
		}

		/** Wallpaper display mode (cover/contain/stretch/tile). */
		function readWallpaperFit() {
			const raw = readStorage(WALLPAPER_FIT_KEY);
			return WALLPAPER_FITS.includes(raw) ? raw : DEFAULT_WALLPAPER_FIT;
		}

		/** Allowlisted wallpaper URL (http(s) / data:image|video). blob: is rejected (dies on reload). */
		function sanitizeWallpaperUrl(raw) {
			if (typeof raw !== "string") return null;
			const value = raw.trim();
			if (value === "" || /["'\n\r]/.test(value)) return null;
			if (/javascript:/i.test(value) || /^data:text\/html/i.test(value)) return null;
			if (/^blob:/i.test(value)) return null;
			if (/^data:image\/svg/i.test(value)) return null;
			if (/^(https?:|data:image\/|data:video\/)/i.test(value)) return value;
			return null;
		}

		function dataUrlTooLarge(url) {
			return typeof url === "string" && url.indexOf("data:") === 0 && url.length > MAX_DATA_URL;
		}

		function isVideoUrl(url) {
			if (typeof url !== "string" || url === "") return false;
			if (/^data:video\//i.test(url)) return true;
			if (/^data:image\//i.test(url)) return false;
			return /\.(mp4|webm|ogv|mov)(\?|#|$)/i.test(url);
		}

		function videoObjectFit(fit) {
			if (fit === "contain") return "contain";
			if (fit === "stretch") return "fill";
			return "cover";
		}

		function wallpaperErrorKey(code) {
			if (code === "invalid") return "background.urlInvalid";
			if (code === "videoHint") return "background.videoHint";
			if (code === "read") return "background.errorRead";
			if (code === "save") return "background.errorSave";
			if (code === "blob") return "background.errorBlob";
			if (code === "dead") return "background.errorDead";
			if (code === "tooLarge") return "background.errorTooLarge";
			return "background.urlInvalid";
		}


		//#endregion

		//#region dsh-skin: wallpaper layer + token shading
		/** Inline error code for the wallpaper row (i18n key suffix), or null. */
		let wallpaperError = null;
		/** The fixed backdrop layer (z-index -1), created lazily. */
		let wallpaperEl = null;
		/** Disposer for the current token-override layer. */
		let wallpaperOverrideDispose = null;

		/** Parse a hex or rgb()/rgba() color into rgba() with the given alpha. */
		function toRgba(color, alpha) {
			const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
			if (hex !== null) {
				let digits = hex[1];
				if (digits.length === 3) digits = digits.split("").map((char) => char + char).join("");
				const n = parseInt(digits, 16);
				return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
			}
			const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(color.trim());
			if (rgb !== null) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
			return color.trim();
		}

		/**
		 * The base color for one scheme: the active skin's `--dsw-alias-bg-base`
		 * when it owns that scheme, otherwise the built-in base. The wash always
		 * carries the active skin's tint (and re-shades on theme/change).
		 */
		function resolveBase(scheme, active) {
			if (active && active.colorScheme === scheme && active.tokens && typeof active.tokens["--dsw-alias-bg-base"] === "string") {
				return active.tokens["--dsw-alias-bg-base"];
			}
			return BUILTIN_BASE[scheme];
		}

		/**
		 * Stack the wallpaper's token override layer: the main canvas
		 * (--dsw-alias-bg-base) and the sidebar (--dsw-specific-sidebar-fill)
		 * become translucent at the configured opacity, so the fixed backdrop
		 * shows through while inner surfaces (cards, inputs, bubbles) stay
		 * opaque and readable. Re-calling with the same source replaces the
		 * whole layer (per the ThemeRuntime contract).
		 */
		function shadeTokens(ctx) {
			const snapshot = ctx.theme.getTheme();
			const alpha = readWallpaperOpacity();
			const sidebarAlpha = Math.min(1, alpha + 0.1);
			const overrides = {
				"--dsw-alias-bg-base": {
					light: toRgba(resolveBase("light", snapshot.active), alpha),
					dark: toRgba(resolveBase("dark", snapshot.active), alpha)
				},
				"--dsw-specific-sidebar-fill": {
					light: toRgba(resolveBase("light", snapshot.active), sidebarAlpha),
					dark: toRgba(resolveBase("dark", snapshot.active), sidebarAlpha)
				}
			};
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, overrides);
		}

		/** Last applied wallpaper snapshot (avoid re-decoding on slider ticks). */
		let lastWallpaperApply = null;
		/** Pending rAF id for coalesced wallpaper application. */
		let wallpaperApplyRaf = null;
		/** Apply (or clear) the wallpaper layer and its token shading. */
		let applyingWallpaper = false;
		function applyWallpaper(ctx) {
			if (applyingWallpaper) return;
			if (!document.body) return;
			applyingWallpaper = true;
			try {
				const url = readWallpaper();
				if (url === null) {
					if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
						wallpaperEl.pause();
						wallpaperEl.removeAttribute("src");
						wallpaperEl.load();
					}
					wallpaperEl?.remove();
					wallpaperEl = null;
					wallpaperOverrideDispose?.();
					wallpaperOverrideDispose = null;
					lastWallpaperApply = null;
					return;
				}
				const video = isVideoUrl(url);
				const needSwap = wallpaperEl === null || !document.body.contains(wallpaperEl) || (video && wallpaperEl.tagName !== "VIDEO") || (!video && wallpaperEl.tagName === "VIDEO");
				if (needSwap) {
					if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
						wallpaperEl.pause();
						wallpaperEl.removeAttribute("src");
						wallpaperEl.load();
					}
					wallpaperEl?.remove();
					if (video) {
						wallpaperEl = document.createElement("video");
						wallpaperEl.autoplay = true;
						wallpaperEl.muted = true;
						wallpaperEl.loop = true;
						wallpaperEl.playsInline = true;
						wallpaperEl.referrerPolicy = "no-referrer";
						wallpaperEl.setAttribute("referrerpolicy", "no-referrer");
						wallpaperEl.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;width:100%;height:100%;object-fit:cover;";
					} else {
						wallpaperEl = document.createElement("div");
						wallpaperEl.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat;";
					}
					document.body.prepend(wallpaperEl);
					lastWallpaperApply = null;
				}
				const blur = readWallpaperBlur();
				const fit = readWallpaperFit();
				const nextFilter = blur > 0 ? ("blur(" + blur + "px)") : "none";
				const signature = url + "|" + fit + "|" + nextFilter + "|" + (video ? "v" : "i");
				if (lastWallpaperApply !== signature) {
					if (video) {
						if (wallpaperEl.src !== url) wallpaperEl.src = url;
						wallpaperEl.style.filter = nextFilter;
						wallpaperEl.style.objectFit = videoObjectFit(fit);
						if (!document.hidden) {
							const playPromise = wallpaperEl.play();
							if (playPromise && typeof playPromise.catch === "function") playPromise.catch(function () {});
						}
					} else {
						const nextSize = fit === "contain" ? "contain" : fit === "stretch" ? "100% 100%" : fit === "tile" ? "auto" : "cover";
						const nextRepeat = fit === "tile" ? "repeat" : "no-repeat";
						const nextPosition = fit === "tile" ? "left top" : "center";
						wallpaperEl.style.backgroundImage = 'url("' + url + '")';
						wallpaperEl.style.filter = nextFilter;
						wallpaperEl.style.backgroundSize = nextSize;
						wallpaperEl.style.backgroundRepeat = nextRepeat;
						wallpaperEl.style.backgroundPosition = nextPosition;
					}
					lastWallpaperApply = signature;
				}
				shadeTokens(ctx);
			} finally {
				applyingWallpaper = false;
			}
		}

		function scheduleWallpaperApply(ctx) {
			if (wallpaperApplyRaf !== null) return;
			wallpaperApplyRaf = requestAnimationFrame(function () {
				wallpaperApplyRaf = null;
				applyWallpaper(ctx);
			});
		}

		function cancelWallpaperApply() {
			if (wallpaperApplyRaf !== null) {
				cancelAnimationFrame(wallpaperApplyRaf);
				wallpaperApplyRaf = null;
			}
		}

		function onWallpaperVisibility() {
			if (!wallpaperEl || wallpaperEl.tagName !== "VIDEO") return;
			if (document.hidden) {
				wallpaperEl.pause();
				return;
			}
			const playPromise = wallpaperEl.play();
			if (playPromise && typeof playPromise.catch === "function") playPromise.catch(function () {});
		}

		/** Remove the wallpaper layer and its token overrides (fiber unload). */
		function teardownWallpaper() {
			cancelWallpaperApply();
			document.removeEventListener("visibilitychange", onWallpaperVisibility);
			if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
				wallpaperEl.pause();
				wallpaperEl.removeAttribute("src");
				wallpaperEl.load();
			}
			wallpaperEl?.remove();
			wallpaperEl = null;
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = null;
			lastWallpaperApply = null;
		}
		//#endregion

		//#region dsh-skin: image compression
		/**
		 * Downscale an image onto a canvas and return a JPEG data URL, so a
		 * wallpaper stays well inside the localStorage quota (≤ ~2MB).
		 */
		function compressImage(image, maxSide, quality) {
			const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(image.width * scale));
			canvas.height = Math.max(1, Math.round(image.height * scale));
			const context = canvas.getContext("2d");
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL("image/jpeg", quality);
		}

		/** Read a picked file into a compressed data URL (null on failure). */
		function readImageAsDataUrl(file, onDone) {
			const reader = new FileReader();
			reader.onerror = () => onDone(null);
			reader.onload = () => {
				const image = new Image();
				image.onerror = () => onDone(null);
				image.onload = () => {
					try {
						let dataUrl = compressImage(image, 1600, 0.75);
						if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 1000, 0.6);
						if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 800, 0.5);
						if (dataUrl.length > MAX_DATA_URL) onDone(null);
						else onDone(dataUrl);
					} catch {
						onDone(null);
					}
				};
				image.src = reader.result;
			};
			reader.readAsDataURL(file);
		}
		//#endregion

		//#region dsh-skin: settings row stores
		/**
		 * Skin row slot store: a mirror of the theme service snapshot. The
		 * plugin's apply-world change listener is the only writer; the row
		 * component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					skin: "system",
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
					}
				}
			});
		}

		/** Wallpaper row store: url + opacity + blur + fit. */
		function createWallpaperStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					url: null,
					opacity: DEFAULT_WALLPAPER_OPACITY,
					blur: DEFAULT_WALLPAPER_BLUR,
					fit: DEFAULT_WALLPAPER_FIT,
					error: null,
					revision: -1
				}),
				actions: {
					sync: (d, url, opacity, blur, fit, error, revision) => {
						if (revision <= d.revision) return;
						d.url = url;
						d.opacity = opacity;
						d.blur = blur;
						d.fit = fit;
						d.error = error;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion

		//#region dsh-skin: settings rows
		/** Inline style sheet for the rows (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			hint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			error: {
				color: "var(--dsw-alias-state-error-primary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				border: "2px solid transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			button: {
				height: "32px",
				padding: "0 14px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-button-elevated-fill)",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				fontSize: "13px",
				font: "inherit",
				boxSizing: "border-box"
			},
			buttonDanger: {
				color: "var(--dsw-alias-state-error-primary)"
			},
			preview: {
				width: "72px",
				height: "44px",
				objectFit: "cover",
				borderRadius: "6px",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			actionRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			sliderRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				minWidth: "240px"
			},
			sliderLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "13px",
				whiteSpace: "nowrap",
				width: "72px"
			},
			slider: {
				flex: 1,
				accentColor: "var(--dsw-alias-brand-primary)"
			},
			sliderValue: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				whiteSpace: "nowrap",
				width: "44px",
				textAlign: "right"
			},
			fitRow: {
				display: "flex",
				flexWrap: "wrap",
				gap: "8px"
			},
			fitButton: {
				height: "30px",
				padding: "0 14px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				cursor: "pointer",
				fontSize: "13px",
				font: "inherit",
				boxSizing: "border-box"
			},
			fitButtonSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)",
				color: "var(--dsw-alias-label-primary)"
			},
			fitButtonDisabled: {
				opacity: 0.4,
				cursor: "not-allowed"
			},
			urlRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px"
			},
			urlInput: {
				flex: "1 1 180px",
				height: "32px",
				padding: "0 10px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				boxSizing: "border-box"
			}
		};

		/** Mini palette preview driven by one skin's token table. */
		function Swatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: `1px solid ${tokens["--dsw-alias-border-l2"]}`
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable skin card. */
		function SkinCard({ skin, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSelect,
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(Swatch, { tokens: skin.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t(`skin.${skin.labelKey}`)
					})
				]
			});
		}

		/**
		 * Skin picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per curated skin.
		 */
		function SkinRow({ t, setSkin, useStore }) {
			const skin = useStore((s) => s.skin);
			const selected = SKINS.some((candidate) => candidate.id === skin) ? skin : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSkin(DEFAULT_SKIN),
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("skin.default")
									})
								]
							}),
							SKINS.map((skinDefinition) => (0, react_jsx_runtime.jsx)(SkinCard, {
								skin: skinDefinition,
								selected: selected === skinDefinition.id,
								onSelect: () => setSkin(skinDefinition.id),
								t
							}, skinDefinition.id))
						]
					})
				]
			});
		}

		/** One labeled slider (opacity or blur). */
		function Slider({ label, value, min, max, step, format, onChange }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.sliderRow,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderLabel,
						children: label
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						style: styles.slider,
						onChange: (event) => onChange(Number(event.target.value))
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderValue,
						children: format(value)
					})
				]
			});
		}

		/**
		 * Wallpaper row: choose (compressed to a data URL), preview, tune the
		 * wash opacity and blur, and remove the wallpaper.
		 */
		function WallpaperRow({ t, setWallpaper, setOpacity, setBlur, setFit, setError, useStore }) {
			const url = useStore((s) => s.url);
			const opacity = useStore((s) => s.opacity);
			const blur = useStore((s) => s.blur);
			const fit = useStore((s) => s.fit);
			const error = useStore((s) => s.error);
			const inputRef = (0, _react.useRef)(null);
			const [urlInput, setUrlInput] = (0, _react.useState)("");
			const video = url !== null && isVideoUrl(url);
			const onPick = () => inputRef.current?.click();
			const onFile = (event) => {
				const file = event.target.files?.[0];
				if (file === void 0) return;
				event.target.value = "";
				if ((file.type && file.type.startsWith("video/")) || /\.(mp4|webm|ogv|mov)$/i.test(file.name)) {
					setError("videoHint");
					return;
				}
				readImageAsDataUrl(file, (dataUrl) => {
					if (dataUrl === null) setError("read");
					else setWallpaper(dataUrl);
				});
			};
			const applyUrl = () => {
				const trimmed = urlInput.trim();
				if (/^blob:/i.test(trimmed)) {
					setError("blob");
					return;
				}
				const sanitized = sanitizeWallpaperUrl(urlInput);
				if (sanitized === null) {
					setError("invalid");
					return;
				}
				if (dataUrlTooLarge(sanitized)) {
					setError("tooLarge");
					return;
				}
				setWallpaper(sanitized);
				setUrlInput("");
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("background.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							url !== null ? (video ? (0, react_jsx_runtime.jsx)("video", {
								src: url,
								muted: true,
								loop: true,
								autoPlay: !document.hidden,
								playsInline: true,
								referrerPolicy: "no-referrer",
								style: styles.preview
							}) : (0, react_jsx_runtime.jsx)("img", {
								src: url,
								alt: "",
								referrerPolicy: "no-referrer",
								style: styles.preview
							})) : null,
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: onPick,
								children: t("background.choose")
							}),
							url !== null ? (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: {
									...styles.button,
									...styles.buttonDanger
								},
								onClick: () => setWallpaper(null),
								children: t("background.remove")
							}) : null,
							(0, react_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: "image/*",
								style: { display: "none" },
								onChange: onFile
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.urlRow,
						children: [
							(0, react_jsx_runtime.jsx)("input", {
								type: "text",
								value: urlInput,
								placeholder: t("background.urlPlaceholder"),
								style: styles.urlInput,
								onChange: (event) => setUrlInput(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") applyUrl();
								}
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: applyUrl,
								children: t("background.urlApply")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.sliderRow,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								style: styles.sliderLabel,
								children: t("background.fit")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.fitRow,
								children: WALLPAPER_FITS.map((value) => {
									const disabled = video && value === "tile";
									return (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": fit === value,
										disabled: disabled,
										onClick: () => {
											if (!disabled) setFit(value);
										},
										style: {
											...styles.fitButton,
											...(fit === value ? styles.fitButtonSelected : {}),
											...(disabled ? styles.fitButtonDisabled : {})
										},
										children: t("background.fit." + value)
									}, value);
								})
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.opacity"),
						value: Math.round(opacity * 100),
						min: 0,
						max: 100,
						step: 1,
						format: (v) => `${v}%`,
						onChange: setOpacity
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.blur"),
						value: blur,
						min: 0,
						max: 60,
						step: 1,
						format: (v) => `${v}px`,
						onChange: setBlur
					}),
					error ? (0, react_jsx_runtime.jsx)("div", {
						style: styles.error,
						children: t(wallpaperErrorKey(error))
					}) : null,
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("background.hint")
					})
				]
			});
		}
		//#endregion

		//#region dsh-skin: nai long pet (奶龙桌宠 · 表情包)
		/**
		 * 奶龙桌宠 —— an original, hand-drawn yellow dragon (奶龙-style) desktop
		 * pet with a sticker pack (表情包). It floats on the web UI, follows the
		 * agent's running state (idle → thinking → working → done → sleeping),
		 * can be dragged around, and shows a sticker picker panel. All art is
		 * inline SVG (original work, not the licensed character), so the bundle
		 * stays dependency-free and crisp at any size.
		 */

		/** localStorage keys for the pet (independent from skins/wallpaper). */
		const PET_STORAGE = {
			enabled: "dsh-skin:pet-enabled",
			size: "dsh-skin:pet-size",
			pos: "dsh-skin:pet-pos"
		};
		/** Default pet size in px. */
		const PET_DEFAULT_SIZE = 120;
		/** Size range in px. */
		const PET_MIN_SIZE = 64;
		const PET_MAX_SIZE = 180;
		/** Custom event dispatched by the settings row after writing config. */
		const PET_CFG_EVENT = "dsh-skin:pet-config";
		/** How long a manually picked sticker stays (ms) before status wins again. */
		const PET_STICKER_HOLD = 4000;
		/** Idle (ms) before the pet falls asleep. */
		const PET_SLEEP_AFTER = 45000;
		/** Status watch poll interval (ms). */
		const PET_POLL_MS = 500;

		/**
		 * The sticker pack. Each mood is a face variant: which eyes, which mouth
		 * and an optional extra (bubble, tear, sweat, Zzz, …). `idle` is the
		 * default and blinks on a timer; `idle-blink` is internal.
		 */
		const NAILONG_MOODS = {
			idle: { labelKey: "pet.mood.idle", eyes: "round", mouth: "smile", blinkable: true },
			happy: { labelKey: "pet.mood.happy", eyes: "happy", mouth: "bigSmile", extra: "sparkle" },
			thinking: { labelKey: "pet.mood.thinking", eyes: "up", mouth: "flat", extra: "dots" },
			working: { labelKey: "pet.mood.working", eyes: "round", mouth: "flat", extra: "sweat" },
			done: { labelKey: "pet.mood.done", eyes: "happy", mouth: "bigSmile", extra: "stars" },
			sad: { labelKey: "pet.mood.sad", eyes: "sad", mouth: "wavy", extra: "tear" },
			surprised: { labelKey: "pet.mood.surprised", eyes: "wide", mouth: "o", extra: "bang" },
			sleeping: { labelKey: "pet.mood.sleeping", eyes: "sleep", mouth: "smile", extra: "zzz" }
		};
		/** Face variants used in the sticker picker (idle-blink is internal). */
		const NAILONG_PACK = ["idle", "happy", "thinking", "working", "done", "sad", "surprised", "sleeping"];

		/** Ink color for strokes and pupils. */
		const DRAGON_INK = "#3a2a12";
		/** Main body yellow. */
		const DRAGON_BODY = "#ffd84d";
		/** Body stroke. */
		const DRAGON_LINE = "#e8b72c";
		/** Belly / horn cream. */
		const DRAGON_CREAM = "#fff3c4";
		/** Wing tint. */
		const DRAGON_WING = "#ffe38a";
		/** Cheek pink. */
		const DRAGON_BLUSH = "#ffa8b8";
		/** Mouth fill. */
		const DRAGON_MOUTH = "#7c3a2d";

		/**
		 * Render one dragon face as an SVG string (200×200 viewBox, square).
		 * @param {string} mood - one of NAILONG_MOODS (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function dragonSvg(mood) {
			const blink = mood === "idle-blink";
			const m = blink ? null : NAILONG_MOODS[mood];
			const eyes = blink ? "blink" : m ? m.eyes : "round";
			const mouth = m ? m.mouth : "smile";
			const extra = m ? m.extra : null;

			let eyeMarkup = "";
			if (eyes === "round") {
				eyeMarkup =
					`<circle cx="80" cy="76" r="7" fill="${DRAGON_INK}"/><circle cx="120" cy="76" r="7" fill="${DRAGON_INK}"/>` +
					`<circle cx="82.5" cy="73.5" r="2.2" fill="#fff"/><circle cx="122.5" cy="73.5" r="2.2" fill="#fff"/>`;
			} else if (eyes === "blink") {
				eyeMarkup =
					`<path d="M70 78 q10 5 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M110 78 q10 5 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "happy") {
				eyeMarkup =
					`<path d="M70 78 q10 10 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M110 78 q10 10 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "sleep") {
				eyeMarkup =
					`<path d="M72 78 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M112 78 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "wide") {
				eyeMarkup =
					`<ellipse cx="80" cy="76" rx="10" ry="12" fill="#fff" stroke="${DRAGON_INK}" stroke-width="3"/>` +
					`<ellipse cx="120" cy="76" rx="10" ry="12" fill="#fff" stroke="${DRAGON_INK}" stroke-width="3"/>` +
					`<circle cx="80" cy="78" r="3.2" fill="${DRAGON_INK}"/><circle cx="120" cy="78" r="3.2" fill="${DRAGON_INK}"/>`;
			} else if (eyes === "up") {
				eyeMarkup =
					`<circle cx="82" cy="72" r="6.5" fill="${DRAGON_INK}"/><circle cx="122" cy="72" r="6.5" fill="${DRAGON_INK}"/>` +
					`<circle cx="84" cy="70" r="2" fill="#fff"/><circle cx="124" cy="70" r="2" fill="#fff"/>` +
					`<path d="M70 62 q6 -8 14 -8" stroke="${DRAGON_INK}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
					`<path d="M118 62 q6 -8 14 -8" stroke="${DRAGON_INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "sad") {
				eyeMarkup =
					`<path d="M68 82 q12 -12 24 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M108 82 q12 -12 24 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			}

			let mouthMarkup = "";
			if (mouth === "smile") {
				mouthMarkup = `<path d="M86 92 q14 10 28 0" stroke="${DRAGON_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
			} else if (mouth === "bigSmile") {
				mouthMarkup =
					`<path d="M80 90 q20 18 40 0 q-20 12 -40 0 z" fill="${DRAGON_MOUTH}" stroke="${DRAGON_INK}" stroke-width="4"/>` +
					`<path d="M90 96 q10 8 20 0 q-10 6 -20 0 z" fill="#ff9d9d"/>`;
			} else if (mouth === "flat") {
				mouthMarkup = `<path d="M86 94 h28" stroke="${DRAGON_INK}" stroke-width="4.5" stroke-linecap="round"/>`;
			} else if (mouth === "o") {
				mouthMarkup = `<ellipse cx="100" cy="96" rx="7" ry="10" fill="${DRAGON_MOUTH}" stroke="${DRAGON_INK}" stroke-width="4"/>`;
			} else if (mouth === "wavy") {
				mouthMarkup = `<path d="M84 94 q8 -6 16 0 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
			}

			let extraMarkup = "";
			if (extra === "dots") {
				extraMarkup = `<text x="146" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="${DRAGON_INK}">···</text>`;
			} else if (extra === "sweat") {
				extraMarkup = `<path d="M60 58 q6 12 0 16 q-6 -4 0 -16 z" fill="#8fd0ff" stroke="#4aa3e8" stroke-width="2"/>`;
			} else if (extra === "tear") {
				extraMarkup = `<path d="M146 84 q7 12 0 18 q-7 -6 0 -18 z" fill="#8fd0ff" stroke="#4aa3e8" stroke-width="2"/>`;
			} else if (extra === "zzz") {
				extraMarkup = `<text x="146" y="52" font-family="sans-serif" font-size="17" font-weight="bold" fill="#7aa7ff">Z</text>` +
					`<text x="160" y="36" font-family="sans-serif" font-size="13" font-weight="bold" fill="#7aa7ff">z</text>`;
			} else if (extra === "sparkle") {
				extraMarkup = `<path d="M34 56 l4 -10 4 10 -10 -4 z" fill="#ffd84d"/><path d="M168 40 l3 -8 3 8 -8 -3 z" fill="#ffd84d"/>`;
			} else if (extra === "stars") {
				extraMarkup = `<path d="M30 52 l4 -10 4 10 -10 -4 z" fill="#ffb84d"/><path d="M170 48 l4 -10 4 10 -10 -4 z" fill="#ffb84d"/>` +
					`<path d="M100 24 l4 -10 4 10 -10 -4 z" fill="#ffd84d"/>`;
			} else if (extra === "bang") {
				extraMarkup = `<text x="148" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="${DRAGON_INK}">!</text>`;
			}

			return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
				`<ellipse cx="100" cy="120" rx="56" ry="50" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<ellipse cx="100" cy="130" rx="32" ry="28" fill="${DRAGON_CREAM}"/>` +
				`<path d="M46 92 q-18 -8 -10 -22 q14 6 12 18 z" fill="${DRAGON_WING}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<path d="M154 92 q18 -8 10 -22 q-14 6 -12 18 z" fill="${DRAGON_WING}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="100" cy="80" rx="46" ry="40" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<path d="M64 52 q-10 -22 4 -26 q6 14 -2 24 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<path d="M136 52 q10 -22 -4 -26 q-6 14 2 24 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<circle cx="70" cy="94" r="8" fill="${DRAGON_BLUSH}" opacity="0.75"/>` +
				`<circle cx="130" cy="94" r="8" fill="${DRAGON_BLUSH}" opacity="0.75"/>` +
				eyeMarkup + mouthMarkup + extraMarkup +
				`<ellipse cx="50" cy="134" rx="12" ry="16" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(22 50 134)"/>` +
				`<ellipse cx="150" cy="134" rx="12" ry="16" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(-22 150 134)"/>` +
				`<ellipse cx="76" cy="168" rx="17" ry="9" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="124" cy="168" rx="17" ry="9" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`</svg>`;
		}

		/** Encode an SVG string as a data: URL for an <img> src. */
		function svgDataUrl(svg) {
			return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
		}

		/** Read one pet config value from localStorage with a fallback. */
		function readPetStorage(key, fallback) {
			try {
				const raw = window.localStorage.getItem(key);
				return raw === null ? fallback : raw;
			} catch {
				return fallback;
			}
		}

		/** Write one pet config value (null removes it). */
		function writePetStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
				return true;
			} catch {
				return false;
			}
		}

		/** Pet config snapshot read from localStorage (always valid values). */
		function readPetConfig() {
			const size = Number(readPetStorage(PET_STORAGE.size, String(PET_DEFAULT_SIZE)));
			return {
				enabled: readPetStorage(PET_STORAGE.enabled, "1") === "1",
				size: Number.isFinite(size) ? Math.min(PET_MAX_SIZE, Math.max(PET_MIN_SIZE, size)) : PET_DEFAULT_SIZE
			};
		}

		/** Tell the mounted pet to re-read its config (enabled/size/position). */
		function dispatchPetConfig() {
			try {
				window.dispatchEvent(new CustomEvent(PET_CFG_EVENT));
			} catch {
				/* noop */
			}
		}

		/**
		 * Mount the pet once the DOM is ready (idempotent): a fixed, draggable
		 * dragon with a sticker panel, driven by the agent's running state.
		 * @param {object} ctx - client cordis context.
		 * @returns {() => void} teardown.
		 */
		function mountNailongPet(ctx) {
			if (document.body) return mountNailongPetNow(ctx);
			let disposed = false;
			let disposeNow = null;
			const onReady = () => {
				if (disposed) return;
				disposeNow = mountNailongPetNow(ctx);
			};
			document.addEventListener("DOMContentLoaded", onReady);
			return () => {
				disposed = true;
				document.removeEventListener("DOMContentLoaded", onReady);
				if (disposeNow) disposeNow();
			};
		}

		/** The actual mount; see mountNailongPet. */
		function mountNailongPetNow(ctx) {
			if (!document.body) return () => {};
			const styleEl = document.createElement("style");
			styleEl.textContent =
				"@keyframes dshPetBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}" +
				"@keyframes dshPetWiggle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}";
			document.head.appendChild(styleEl);

			const cfg = readPetConfig();
			let current = "idle";
			let override = null;
			let overrideTimer = null;
			let thinkTimer = null;
			let idleSince = Date.now();
			let prevRunning = null;
			let blinkTimer = null;
			let pos = null;
			try {
				const raw = readPetStorage(PET_STORAGE.pos, null);
				if (raw) pos = JSON.parse(raw);
			} catch {
				pos = null;
			}

			// ---- DOM ----
			const root = document.createElement("div");
			root.id = "dsh-skin-pet";
			root.setAttribute("aria-label", "奶龙桌宠");
			root.style.cssText =
				"position:fixed;z-index:2147483000;user-select:none;-webkit-user-select:none;touch-action:none;" +
				"cursor:grab;line-height:0;filter:drop-shadow(0 6px 14px rgba(0,0,0,0.28));";
			const img = document.createElement("img");
			img.alt = "";
			img.draggable = false;
			img.style.cssText = "width:100%;height:100%;pointer-events:none;animation:dshPetBob 2.6s ease-in-out infinite;";
			root.appendChild(img);

			const panel = document.createElement("div");
			panel.id = "dsh-skin-pet-panel";
			panel.style.cssText =
				"position:absolute;bottom:calc(100% + 10px);right:0;display:none;flex-direction:column;gap:8px;" +
				"padding:10px;border-radius:14px;border:1px solid var(--dsw-alias-border-l2);" +
				"background:var(--dsw-alias-bg-overlay);box-shadow:0 10px 30px rgba(0,0,0,0.25);z-index:1;";
			const panelTitle = document.createElement("div");
			panelTitle.textContent = "表情包";
			panelTitle.style.cssText = "color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;";
			panel.appendChild(panelTitle);
			const panelGrid = document.createElement("div");
			panelGrid.style.cssText = "display:grid;grid-template-columns:repeat(4,56px);gap:6px;";
			panel.appendChild(panelGrid);
			NAILONG_PACK.forEach((mood) => {
				const btn = document.createElement("button");
				btn.type = "button";
				btn.title = mood;
				btn.style.cssText =
					"width:56px;height:56px;padding:4px;border-radius:10px;border:1px solid transparent;" +
					"background:var(--dsw-alias-bg-layer-2);cursor:pointer;";
				const thumb = document.createElement("img");
				thumb.alt = "";
				thumb.draggable = false;
				thumb.src = svgDataUrl(dragonSvg(mood));
				thumb.style.cssText = "width:100%;height:100%;pointer-events:none;";
				btn.appendChild(thumb);
				btn.addEventListener("click", () => {
					override = mood;
					current = mood;
					renderFace();
					clearTimeout(overrideTimer);
					overrideTimer = setTimeout(() => {
						override = null;
						renderFace();
					}, PET_STICKER_HOLD);
					panel.style.display = "none";
				});
				panelGrid.appendChild(btn);
			});
			root.appendChild(panel);

			const btnBar = document.createElement("div");
			btnBar.style.cssText =
				"position:absolute;top:-10px;right:-6px;display:flex;gap:4px;opacity:0;transition:opacity .15s;";
			const packBtn = document.createElement("button");
			packBtn.type = "button";
			packBtn.textContent = "🎨";
			const closeBtn = document.createElement("button");
			closeBtn.type = "button";
			closeBtn.textContent = "✕";
			for (const b of [packBtn, closeBtn]) {
				b.style.cssText =
					"width:24px;height:24px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);" +
					"background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);" +
					"font-size:12px;line-height:1;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;";
			}
			packBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				panel.style.display = panel.style.display === "flex" ? "none" : "flex";
			});
			closeBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				override = null;
				clearTimeout(overrideTimer);
				renderFace();
				root.remove();
				writePetStorage(PET_STORAGE.enabled, "0");
				dispatchPetConfig();
			});
			btnBar.appendChild(packBtn);
			btnBar.appendChild(closeBtn);
			root.appendChild(btnBar);
			root.addEventListener("mouseenter", () => { btnBar.style.opacity = "1"; });
			root.addEventListener("mouseleave", () => { btnBar.style.opacity = "0"; panel.style.display = "none"; });

			// ---- face rendering ----
			const renderFace = () => {
				const mood = override || current;
				const src = svgDataUrl(dragonSvg(mood));
				if (img.src !== src) img.src = src;
				img.style.animation = mood === "done" || mood === "happy"
					? "dshPetWiggle 0.7s ease-in-out infinite"
					: "dshPetBob 2.6s ease-in-out infinite";
			};

			// ---- drag ----
			let dragging = false;
			let startX = 0, startY = 0, baseLeft = 0, baseTop = 0;
			const applyPos = () => {
				if (pos) {
					root.style.left = pos.x + "px";
					root.style.top = pos.y + "px";
					root.style.right = "auto";
					root.style.bottom = "auto";
				} else {
					root.style.left = "auto";
					root.style.top = "auto";
					root.style.right = "24px";
					root.style.bottom = "24px";
				}
			};
			applyPos();
			root.addEventListener("pointerdown", (e) => {
				if (e.target !== img && e.target !== root) return;
				dragging = true;
				startX = e.clientX; startY = e.clientY;
				baseLeft = pos ? pos.x : window.innerWidth - cfg.size - 24;
				baseTop = pos ? pos.y : window.innerHeight - cfg.size - 24;
				root.style.cursor = "grabbing";
				root.setPointerCapture(e.pointerId);
				e.preventDefault();
			});
			root.addEventListener("pointermove", (e) => {
				if (!dragging) return;
				const x = Math.min(window.innerWidth - 40, Math.max(0, baseLeft + (e.clientX - startX)));
				const y = Math.min(window.innerHeight - 40, Math.max(0, baseTop + (e.clientY - startY)));
				pos = { x, y };
				applyPos();
			});
			const endDrag = (e) => {
				if (!dragging) return;
				dragging = false;
				root.style.cursor = "grab";
				writePetStorage(PET_STORAGE.pos, JSON.stringify(pos));
			};
			root.addEventListener("pointerup", endDrag);
			root.addEventListener("pointercancel", endDrag);

			// Click the pet itself: cycle to a random sticker briefly.
			root.addEventListener("click", () => {
				if (dragging) return;
				const pool = NAILONG_PACK.filter((mood) => mood !== "sleeping" && mood !== current);
				if (pool.length === 0) return;
				const mood = pool[Math.floor(Math.random() * pool.length)];
				override = mood;
				renderFace();
				clearTimeout(overrideTimer);
				overrideTimer = setTimeout(() => { override = null; renderFace(); }, PET_STICKER_HOLD);
			});

			// ---- blink while idle ----
			const scheduleBlink = () => {
				clearTimeout(blinkTimer);
				blinkTimer = setTimeout(() => {
					if (!override && current === "idle") {
						const src = svgDataUrl(dragonSvg("idle-blink"));
						img.src = src;
						setTimeout(() => { if (!override && current === "idle") renderFace(); }, 160);
					}
					scheduleBlink();
				}, 2600 + Math.random() * 2600);
			};
			scheduleBlink();

			// ---- status watch (agent running state) ----
			const setMood = (mood) => {
				if (current === mood) return;
				current = mood;
				if (override === null) renderFace();
			};
			const poll = setInterval(() => {
				let running = false;
				try {
					const sessions = ctx.get("sessions");
					if (sessions && typeof sessions.list === "function") {
						const list = sessions.list();
						running = Array.isArray(list) && list.some((s) => !!s.running);
					}
				} catch { /* noop */ }
				const now = Date.now();
				if (prevRunning === null) {
					prevRunning = running;
					idleSince = now;
					return;
				}
				if (running && !prevRunning) {
					override = null;
					clearTimeout(overrideTimer);
					clearTimeout(thinkTimer);
					setMood("thinking");
					idleSince = now;
					thinkTimer = setTimeout(() => {
						if (current === "thinking" && override === null) setMood("working");
					}, 1800);
				} else if (!running && prevRunning) {
					override = null;
					clearTimeout(overrideTimer);
					clearTimeout(thinkTimer);
					setMood("done");
					idleSince = now;
					setTimeout(() => { if (current === "done" && override === null) setMood("idle"); }, 2500);
				} else if (running && current !== "working" && current !== "thinking" && override === null) {
					override = null;
					clearTimeout(overrideTimer);
					setMood("working");
					idleSince = now;
				} else if (!running && current !== "sleeping" && override === null && now - idleSince > PET_SLEEP_AFTER) {
					setMood("sleeping");
				}
				prevRunning = running;
			}, PET_POLL_MS);

			// ---- config events (settings row) ----
			let appliedSize = cfg.size;
			const onConfig = () => {
				const next = readPetConfig();
				if (!next.enabled) {
					root.remove();
					return;
				}
				if (!document.body.contains(root)) document.body.appendChild(root);
				root.style.width = next.size + "px";
				root.style.height = next.size + "px";
				if (next.size !== appliedSize && pos) {
					appliedSize = next.size;
					pos = null;
					applyPos();
					writePetStorage(PET_STORAGE.pos, null);
				}
			};
			window.addEventListener(PET_CFG_EVENT, onConfig);

			// ---- apply initial ----
			root.style.width = cfg.size + "px";
			root.style.height = cfg.size + "px";
			renderFace();
			if (cfg.enabled) document.body.appendChild(root);

			const teardown = () => {
				clearInterval(poll);
				clearTimeout(thinkTimer);
				clearTimeout(overrideTimer);
				clearTimeout(blinkTimer);
				window.removeEventListener(PET_CFG_EVENT, onConfig);
				root.remove();
				styleEl.remove();
			};
			ctx.effect(() => teardown, "dsh-skin: nai long pet cleanup");
			return teardown;
		}

		/** Pet settings row store (enabled + size). */
		function createPetStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({ enabled: true, size: PET_DEFAULT_SIZE, revision: -1 }),
				actions: {
					sync: (d, enabled, size, revision) => {
						if (revision <= d.revision) return;
						d.enabled = enabled;
						d.size = size;
						d.revision = revision;
					}
				}
			});
		}

		/**
		 * Settings → General row for the pet: enable switch, size slider and a
		 * reset-position button. Writes localStorage and notifies the pet.
		 */
		function NailongPetRow({ t, setEnabled, setSize, resetPosition, useStore }) {
			const enabled = useStore((s) => s.enabled);
			const size = useStore((s) => s.size);
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("pet.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--dsw-alias-label-primary)", fontSize: "13px", cursor: "pointer" },
								children: [
									(0, react_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: enabled,
										onChange: (e) => setEnabled(e.target.checked),
										style: { accentColor: "var(--dsw-alias-brand-primary)" }
									}),
									t("pet.enable")
								]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: resetPosition,
								children: t("pet.resetPos")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("pet.size"),
						value: size,
						min: PET_MIN_SIZE,
						max: PET_MAX_SIZE,
						step: 4,
						format: (v) => `${v}px`,
						onChange: setSize
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("pet.hint")
					})
				]
			});
		}
		//#endregion

		//#region dsh-skin: client plugin body
		/**
		 * Required services: theme runtime (skins, switching, token override
		 * layers), slots/locale (the settings rows). Persistence is
		 * localStorage, so no settings transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme",
			"sessions"
		];

		/**
		 * Client plugin body: register the curated skins into the theme runtime,
		 * restore the saved skin and wallpaper, keep the rows' stores in sync
		 * with theme/change, and register both rows into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = SKINS.map((skinDefinition) => {
				try {
					return ctx.theme.register(skinDefinition);
				} catch (error) {
					console.warn(`[dsh-skin] skip theme "${skinDefinition.id}":`, error);
					return () => {};
				}
			});
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "dsh-skin: theme registration");

			// Restore the saved skin once. Host settings may adopt system/light/dark
			// after we register; re-assert on the next tick only (not on every theme/change).
			const reassertSavedSkin = () => {
				const saved = readSavedSkin();
				if (saved === null || saved === DEFAULT_SKIN || !SKINS.some((skinDefinition) => skinDefinition.id === saved)) return;
				const current = ctx.theme.getTheme().preference;
				if (current !== saved) ctx.theme.setTheme(saved);
			};
			reassertSavedSkin();
			const reassertTimers = [setTimeout(reassertSavedSkin, 0), setTimeout(reassertSavedSkin, 80)];
			ctx.effect(() => () => {
				for (const timer of reassertTimers) clearTimeout(timer);
			}, "dsh-skin: reassert cleanup");

			// Wallpaper bookkeeping.
			let wallpaperRevision = 0;
			const wallpaperStore = createWallpaperStore();
			let wallpaperBound;
			const syncWallpaper = () => {
				wallpaperRevision += 1;
				wallpaperBound?.sync(readWallpaper(), readWallpaperOpacity(), readWallpaperBlur(), readWallpaperFit(), wallpaperError, wallpaperRevision);
			};
			document.addEventListener("visibilitychange", onWallpaperVisibility);
			applyWallpaper(ctx);
			syncWallpaper();
			ctx.effect(() => () => {
				teardownWallpaper();
			}, "dsh-skin: wallpaper cleanup");

			const skinStore = createSkinStore();
			let skinBound;
			let lastShadedKey = null;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
				// A skin/scheme switch changes the base color; re-shade the wash.
				const key = `${snapshot.active?.id ?? ""}:${snapshot.active?.colorScheme ?? ""}`;
				if (readWallpaper() !== null && key !== lastShadedKey) {
					lastShadedKey = key;
					applyWallpaper(ctx);
				}
			};
			ctx.on("theme/change", syncSkin);

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-skin: settings row dictionaries");

			const skinInjected = (actions) => {
				skinBound = actions;
				syncSkin(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						ctx.theme.setTheme(id);
						writeSavedSkin(id);
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin",
				order: 20,
				store: skinStore,
				locale: SETTINGS_NS,
				inject: skinInjected
			}, SkinRow));

			const wallpaperInjected = (actions) => {
				wallpaperBound = actions;
				syncWallpaper();
				return {
					setWallpaper: (url) => {
						if (url === null) {
							writeStorage(WALLPAPER_KEY, null);
							wallpaperError = null;
							syncWallpaper();
							scheduleWallpaperApply(ctx);
							return;
						}
						const sanitized = sanitizeWallpaperUrl(url);
						if (sanitized === null) {
							wallpaperError = /^blob:/i.test(String(url).trim()) ? "blob" : "invalid";
							syncWallpaper();
							return;
						}
						if (dataUrlTooLarge(sanitized)) {
							wallpaperError = "tooLarge";
							syncWallpaper();
							return;
						}
						if (!writeStorage(WALLPAPER_KEY, sanitized)) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						wallpaperError = null;
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setOpacity: (percent) => {
						const value = Math.min(1, Math.max(0, percent / 100));
						if (!writeStorage(WALLPAPER_OPACITY_KEY, String(value))) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setBlur: (px) => {
						const value = Math.min(60, Math.max(0, px));
						if (!writeStorage(WALLPAPER_BLUR_KEY, String(value))) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setFit: (fit) => {
						const value = WALLPAPER_FITS.includes(fit) ? fit : DEFAULT_WALLPAPER_FIT;
						if (!writeStorage(WALLPAPER_FIT_KEY, value)) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setError: (code) => {
						wallpaperError = code;
						syncWallpaper();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin-wallpaper",
				order: 30,
				store: wallpaperStore,
				locale: SETTINGS_NS,
				inject: wallpaperInjected
			}, WallpaperRow));

			// ---- 奶龙桌宠 (desktop pet + sticker pack) ----
			mountNailongPet(ctx);
			const petStore = createPetStore();
			let petBound;
			let petRevision = 0;
			const syncPet = () => {
				petRevision += 1;
				const config = readPetConfig();
				petBound?.sync(config.enabled, config.size, petRevision);
			};
			syncPet();
			const petInjected = (actions) => {
				petBound = actions;
				syncPet();
				return {
					setEnabled: (enabled) => {
						writePetStorage(PET_STORAGE.enabled, enabled ? "1" : "0");
						dispatchPetConfig();
						syncPet();
					},
					setSize: (px) => {
						const value = Math.min(PET_MAX_SIZE, Math.max(PET_MIN_SIZE, Math.round(px)));
						if (!writePetStorage(PET_STORAGE.size, String(value))) return;
						dispatchPetConfig();
						syncPet();
					},
					resetPosition: () => {
						writePetStorage(PET_STORAGE.pos, null);
						dispatchPetConfig();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin-nailong-pet",
				order: 40,
				store: petStore,
				locale: SETTINGS_NS,
				inject: petInjected
			}, NailongPetRow));
		}
		//#endregion

		exports.SETTINGS_NS = SETTINGS_NS;
		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.NAILONG_MOODS = NAILONG_MOODS;
		exports.NAILONG_PACK = NAILONG_PACK;
		exports.dragonSvg = dragonSvg;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
